import { Screen } from "./types";
class Shape {
  private shape: Screen;

  private constructor(shape: Screen) {
    this.shape = shape;
  }

  getShape() {
    return {
      shape: this.shape,
      height: this.shape.length,
      width: this.shape[0].length,
    };
  }

  static rectangle(height: number, width: number): Shape {
    const ones: 1[] = Array.from({ length: width }, () => 1);
    const shape: Screen = Array.from({ length: height }, () => [...ones]);

    return new Shape(shape);
  }

  static customShape(shape: Screen): Shape {
    return new Shape(shape);
  }
}

export default Shape;
