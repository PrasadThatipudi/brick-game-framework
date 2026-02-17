import { DirectionHandlers, Position, Screen } from "./types";
class Shape {
  private shape: Screen;
  private position: Position;
  private arrows: DirectionHandlers = {
    up: null,
    down: null,
    left: null,
    right: null,
  };

  private constructor(shape: Screen, position: Position) {
    this.shape = shape;
    this.position = position;
  }

  setPosition(position: Position) {
    this.position = position;
  }

  getShape() {
    return {
      shape: this.shape,
      height: this.shape.length,
      width: this.shape[0].length,
      position: this.position,
    };
  }

  static rectangle(height: number, width: number, position: Position): Shape {
    const ones: 1[] = Array.from({ length: width }, () => 1);
    const shape: Screen = Array.from({ length: height }, () => [...ones]);

    return new Shape(shape, position);
  }

  static customShape(shape: Screen, position: Position): Shape {
    return new Shape(shape, position);
  }
}

export default Shape;
