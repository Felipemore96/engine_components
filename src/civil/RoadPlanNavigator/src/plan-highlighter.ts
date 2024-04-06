import * as THREE from "three";
import * as FRAGS from "bim-fragment";
import { CurveHighlighter } from "../../RoadNavigator/src/curve-highlighter";

export class PlanHighlighter extends CurveHighlighter {
  private readonly markupMaterial: THREE.LineBasicMaterial;
  private readonly offset: number = 10;
  private markupLines: THREE.Line[] = [];

  constructor(scene: THREE.Group | THREE.Scene) {
    super(scene, "horizontal");
    this.markupMaterial = new THREE.LineBasicMaterial({
      color: 0x686868,
    });
  }

  showCurveInfo(curveMesh: FRAGS.CurveMesh): void {
    this.clearMarkups();

    // eslint-disable-next-line default-case
    switch (curveMesh.curve.data.TYPE) {
      case "LINE":
        this.showLineInfo(curveMesh);
        break;
      case "CIRCULARARC":
        this.showCircularArcInfo(curveMesh);
        break;
      case "CLOTHOID":
        this.showClothoidInfo(curveMesh);
        break;
    }
  }

  private calculateTangent(
    positions: THREE.TypedArray,
    index: number
  ): THREE.Vector3 {
    const numComponents = 3;
    const pointIndex = index * numComponents;
    const prevPointIndex = Math.max(0, pointIndex - numComponents);
    const nextPointIndex = Math.min(
      positions.length - numComponents,
      pointIndex + numComponents
    );
    const prevPoint = new THREE.Vector3().fromArray(positions, prevPointIndex);
    const nextPoint = new THREE.Vector3().fromArray(positions, nextPointIndex);
    const tangent = nextPoint.clone().sub(prevPoint).normalize();
    return tangent;
  }

  private calculateTangentFromVectors(
    vectors: THREE.Vector3[],
    index: number
  ): THREE.Vector3 {
    const prevIndex = Math.max(index - 1, 0);
    const nextIndex = Math.min(index + 1, vectors.length - 1);

    const prevVector = vectors[prevIndex];
    const nextVector = vectors[nextIndex];

    const tangent = nextVector.clone().sub(prevVector).normalize();
    return tangent;
  }

  private calculateParallelCurve(
    positions: THREE.TypedArray,
    count: number,
    offset: number
  ): THREE.Vector3[] {
    const parallelCurvePoints = [];
    console.log(offset);
    for (let i = 0; i < count; i++) {
      const tangentVector = this.calculateTangent(positions, i);
      const perpendicularVector = tangentVector
        .clone()
        .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
      perpendicularVector.normalize();
      const offsetVector = perpendicularVector.clone().multiplyScalar(offset);
      const pointIndex = i * 3;
      const parallelPoint = new THREE.Vector3()
        .fromArray(positions, pointIndex)
        .add(offsetVector);
      parallelCurvePoints.push(parallelPoint);
    }
    return parallelCurvePoints;
  }

  private calculateDimensionLines(
    parallelCurvePoints: THREE.Vector3[],
    dimensionLength: number
  ): {
    startDimensionPoints: THREE.Vector3[];
    endDimensionPoints: THREE.Vector3[];
  } {
    const startDimensionPoints = [];
    const endDimensionPoints = [];

    // Calculate start dimension line
    const startTangentVector = this.calculateTangentFromVectors(
      parallelCurvePoints,
      0
    ); // Assuming parallelCurvePoints start at index 0
    const startPerpendicularVector = startTangentVector
      .clone()
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
    startPerpendicularVector.normalize();
    const startPoint = parallelCurvePoints[0].clone();
    const startLineVector = startPerpendicularVector
      .clone()
      .multiplyScalar(dimensionLength / 2);
    const startLineStart = startPoint.clone().add(startLineVector);
    const startLineEnd = startPoint.clone().sub(startLineVector);
    startDimensionPoints.push(startLineStart, startLineEnd);

    // Calculate end dimension line
    const lastIndex = parallelCurvePoints.length - 1;
    const endTangentVector = this.calculateTangentFromVectors(
      parallelCurvePoints,
      lastIndex
    ); // Assuming parallelCurvePoints end at index lastIndex
    const endPerpendicularVector = endTangentVector
      .clone()
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
    endPerpendicularVector.normalize();
    const endPoint = parallelCurvePoints[lastIndex].clone();
    const endLineVector = endPerpendicularVector
      .clone()
      .multiplyScalar(dimensionLength / 2);
    const endLineStart = endPoint.clone().add(endLineVector);
    const endLineEnd = endPoint.clone().sub(endLineVector);
    endDimensionPoints.push(endLineStart, endLineEnd);

    return { startDimensionPoints, endDimensionPoints };
  }

  private clearMarkups(): void {
    for (const line of this.markupLines) {
      this.scene.remove(line);
    }
    this.markupLines = [];
  }

  private addMarkupLine(geometry: THREE.BufferGeometry): void {
    const markupLine = new THREE.Line(geometry, this.markupMaterial);
    this.scene.add(markupLine);
    this.markupLines.push(markupLine);
  }

  private showLineInfo(curveMesh: FRAGS.CurveMesh) {
    // console.log("ES LINE");
    // console.log(curveMesh);

    const positions = curveMesh.geometry.attributes.position.array;
    const parallelCurvePoints = this.calculateParallelCurve(
      positions,
      positions.length / 3,
      this.offset
    );
    const lengthGeometry = new THREE.BufferGeometry().setFromPoints(
      parallelCurvePoints
    );
    this.addMarkupLine(lengthGeometry);

    const { startDimensionPoints, endDimensionPoints } =
      this.calculateDimensionLines(parallelCurvePoints, this.offset);
    const startDimensionGeometry = new THREE.BufferGeometry().setFromPoints(
      startDimensionPoints
    );
    const endDimensionGeometry = new THREE.BufferGeometry().setFromPoints(
      endDimensionPoints
    );
    this.addMarkupLine(startDimensionGeometry);
    this.addMarkupLine(endDimensionGeometry);
  }

  private showCircularArcInfo(curveMesh: FRAGS.CurveMesh) {
    // console.log("ES CIRCULARARC");
    // console.log(curveMesh);

    const radius = curveMesh.curve.data.RADIUS;
    const positions = curveMesh.geometry.attributes.position.array;
    const count = curveMesh.geometry.attributes.position.count;
    const linePoints = [];
    const firstPoint = new THREE.Vector3(
      positions[0],
      positions[1],
      positions[2]
    );
    const lastPointIndex = (count - 1) * 3;
    const lastPoint = new THREE.Vector3(
      positions[lastPointIndex],
      positions[lastPointIndex + 1],
      positions[lastPointIndex + 2]
    );
    const middlePointIndex = (count / 2) * 3;
    const middlePoint = new THREE.Vector3(
      positions[middlePointIndex],
      positions[middlePointIndex + 1],
      positions[middlePointIndex + 2]
    );
    const tangentVector = lastPoint.clone().sub(firstPoint).normalize();
    const perpendicularVector = new THREE.Vector3(
      -tangentVector.y,
      tangentVector.x,
      0
    );
    perpendicularVector.multiplyScalar(radius);
    const arcCenterPoint = middlePoint.clone().add(perpendicularVector);
    linePoints.push(middlePoint);
    linePoints.push(arcCenterPoint);
    const radiusGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    this.addMarkupLine(radiusGeometry);

    const parallelCurvePoints = [];
    for (let i = 0; i < count; i++) {
      const tangentVector = this.calculateTangent(positions, i);
      const radius = curveMesh.curve.data.RADIUS;
      const perpendicularVector = new THREE.Vector3(
        tangentVector.y,
        -tangentVector.x,
        0
      );
      perpendicularVector.normalize();
      if (radius < 0) {
        perpendicularVector.negate();
      }
      const offsetVector = perpendicularVector
        .clone()
        .multiplyScalar(this.offset);
      const pointIndex = i * 3;
      const parallelPoint = new THREE.Vector3(
        positions[pointIndex] + offsetVector.x,
        positions[pointIndex + 1] + offsetVector.y,
        positions[pointIndex + 2] + offsetVector.z
      );
      parallelCurvePoints.push(parallelPoint);
    }
    const lengthGeometry = new THREE.BufferGeometry().setFromPoints(
      parallelCurvePoints
    );
    this.addMarkupLine(lengthGeometry);
    const { startDimensionPoints, endDimensionPoints } =
      this.calculateDimensionLines(parallelCurvePoints, this.offset);
    const startDimensionGeometry = new THREE.BufferGeometry().setFromPoints(
      startDimensionPoints
    );
    const endDimensionGeometry = new THREE.BufferGeometry().setFromPoints(
      endDimensionPoints
    );
    this.addMarkupLine(startDimensionGeometry);
    this.addMarkupLine(endDimensionGeometry);
  }

  private showClothoidInfo(curveMesh: FRAGS.CurveMesh) {
    // console.log("ES CLOTHOID");
    // console.log(curveMesh);
    const positions = curveMesh.geometry.attributes.position.array;
    const parallelCurvePoints = this.calculateParallelCurve(
      positions,
      positions.length / 3,
      this.offset
    );
    const lengthGeometry = new THREE.BufferGeometry().setFromPoints(
      parallelCurvePoints
    );
    this.addMarkupLine(lengthGeometry);
    const { startDimensionPoints, endDimensionPoints } =
      this.calculateDimensionLines(parallelCurvePoints, this.offset);
    const startDimensionGeometry = new THREE.BufferGeometry().setFromPoints(
      startDimensionPoints
    );
    const endDimensionGeometry = new THREE.BufferGeometry().setFromPoints(
      endDimensionPoints
    );
    this.addMarkupLine(startDimensionGeometry);
    this.addMarkupLine(endDimensionGeometry);
  }
}
