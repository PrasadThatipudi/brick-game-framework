import {
  Position,
  PositionUpdater,
  Screen,
  ShapeDirectionHandlers,
  ShapeUpdaterWithPosition,
} from "./types";
class Shape {
  private shape: Screen;
  private position: Position;
  private arrows: ShapeDirectionHandlers = {
    up: null,
    down: null,
    left: null,
    right: null,
  };

  private constructor(shape: Screen, position: Position) {
    this.shape = shape;
    this.position = position;
  }

  private setPosition(position: Position) {
    this.position = position;
  }

  private createDirectionHandler(
    handler: (position: Position) => Position,
    shape: Shape,
  ): ShapeUpdaterWithPosition {
    return () => {
      this.setPosition(handler(shape.position));
      return shape;
    };
  }

  onArrowDown(handler: PositionUpdater) {
    this.arrows.down = this.createDirectionHandler(handler, this);
  }

  onArrowUp(handler: PositionUpdater) {
    this.arrows.up = this.createDirectionHandler(handler, this);
  }

  onArrowLeft(handler: PositionUpdater) {
    this.arrows.left = this.createDirectionHandler(handler, this);
  }

  onArrowRight(handler: PositionUpdater) {
    this.arrows.right = this.createDirectionHandler(handler, this);
  }

  getShape() {
    return {
      shape: this.shape,
      height: this.shape.length,
      width: this.shape[0].length,
      position: this.position,
    };
  }

  getArrows() {
    return this.arrows;
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
