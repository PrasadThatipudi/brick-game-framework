class Shape {
  private shape: (0 | 1)[][];

  private constructor(shape: (0 | 1)[][]) {
    this.shape = shape;
  }

  getShape() {
    return {
      shape: this.shape,
      height: this.shape.length,
      width: this.shape[0].length,
    };
  }

  static rectangle(height: number, width: number) {
    const ones: 1[] = Array.from({ length: width }, () => 1);
    const shape: (0 | 1)[][] = Array.from({ length: height }, () => [...ones]);

    return new Shape(shape);
  }
}

export default Shape;
