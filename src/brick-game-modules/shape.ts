import {
  Position,
  PositionUpdater,
  Screen,
  ShapeDirectionHandlers,
  ShapeUpdaterWithPosition,
} from "./types";

const debug = <T>(arg: T): T => console.log(arg)! || arg;
class Shape {
  private shape: Screen;
  private position: Position;
  private onChangeCallback: (() => void) | null = null;
  private arrows: ShapeDirectionHandlers = {
    up: null,
    down: null,
    left: null,
    right: null,
  };
  onMountHandler: (() => void) | null = null;

  private constructor(shape: Screen, position: Position) {
    this.shape = shape;
    this.position = position;
  }

  setPosition(positionSetter: ((p: Position) => Position) | Position) {
    if (typeof positionSetter === "function") {
      this.position = positionSetter(this.position);
    } else {
      this.position = positionSetter;
    }

    if (this.onChangeCallback) this.onChangeCallback();
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

  setOnChange(onChangeCallback: () => void) {
    this.onChangeCallback = onChangeCallback;
  }

  static rectangle(height: number, width: number, position: Position): Shape {
    const zeros: 0[] = Array.from({ length: width }, () => 0);
    const shape: Screen = Array.from({ length: height }, () => [...zeros]);

    return new Shape(shape, position);
  }

  static customShape(shape: Screen, position: Position): Shape {
    return new Shape(shape, position);
  }

  onMount(onMountHandler: () => void) {
    this.onMountHandler = onMountHandler;
  }
}

export default Shape;
