import Shape from "./shape";
import {
  DirectionHandlers,
  Screen,
  ScreenRow,
  Direction,
  DirectionHandler,
  ShapeUpdaterWithPosition,
} from "./types";

const debug = <T>(arg: T): T => console.log(arg)! || arg;
const uniqueId = (start: number) => () => start++;

class GameMaker {
  private initialScreen: Screen;
  private currentScreen: Screen;
  private listeners: Array<(screen: Screen) => void> = [];
  private shapes: Shape[] = [];
  private uniqueShapeId = uniqueId(0);

  private constructor(initialScreen: Screen) {
    this.initialScreen = initialScreen;
    this.currentScreen = initialScreen;
  }

  static initialize(width: number, height: number) {
    const ones: 1[] = Array.from({ length: width }, () => 1);
    const initialScreen: Screen = Array.from({ length: height }, () => [
      ...ones,
    ]);

    return new GameMaker(initialScreen);
  }

  getCurrentScreen() {
    return this.currentScreen.slice().map((row) => row.slice());
  }

  subscribe(listener: (screen: Screen) => void) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.currentScreen));
  }

  private combineShapeHandlers(
    existingHandlers: DirectionHandlers,
    shape: Shape,
  ): DirectionHandlers {
    const shapeHandlers = shape.getArrows();
    const directions: Direction[] = ["up", "down", "left", "right"];

    return directions.reduce((handlers, direction) => {
      const shapeHandler = shapeHandlers[direction];

      if (shapeHandler === null) return handlers;

      const chainedHandler = this.createChainedHandler(
        handlers[direction],
        shapeHandler,
      );

      return { ...handlers, [direction]: chainedHandler };
    }, existingHandlers);
  }

  private createChainedHandler(
    previousHandler: DirectionHandler | null,
    currentHandler: ShapeUpdaterWithPosition,
  ): DirectionHandler {
    return () => {
      if (previousHandler) previousHandler();
      currentHandler();

      return this.render();
    };
  }

  getArrows(): DirectionHandlers {
    const directionHandlers: DirectionHandlers = {
      up: null,
      down: null,
      left: null,
      right: null,
    };

    return this.shapes.reduce(
      (combinedShapeHandlers, shape) =>
        this.combineShapeHandlers(combinedShapeHandlers, shape),
      directionHandlers,
    );
  }

  private static spliceMapping<T>(
    start: number,
    deleteCount: number,
    items: T[],
    mapper: (value: T, index: number) => T,
  ) {
    return items.toSpliced(
      start,
      deleteCount,
      ...items.slice(start, start + deleteCount).map(mapper),
    );
  }

  private static updateScreenRow(
    screenRow: ScreenRow,
    shapeRow: ScreenRow,
    left: number,
    shapeWidth: number,
  ): ScreenRow {
    const start = left < 0 ? 0 : left;
    const deleteCount = left < 0 ? left + shapeWidth : shapeWidth;
    const slicedShapeRow = shapeRow.slice(start - left);

    if (slicedShapeRow.length === 0) return screenRow;

    const insertPixel = (value: 0 | 1, index: number) =>
      slicedShapeRow[index] && value;

    return GameMaker.spliceMapping(start, deleteCount, screenRow, insertPixel);
  }

  private static insertShapeInScreen(shape: Shape, screen: Screen): Screen {
    const { height, width, shape: shapeMatrix, position } = shape.getShape();
    const { top, left } = position;

    const cloneScreen = screen.map((row) => row.slice());

    const start = (Math.abs(top) + top) / 2;
    const deleteCount = top < 0 ? top + height : height;
    const slicedShapeMatrix = shapeMatrix.slice(start - top);

    if (slicedShapeMatrix.length === 0) return cloneScreen;

    const insertShapeRow = (row: (0 | 1)[], index: number): ScreenRow =>
      GameMaker.updateScreenRow(row, slicedShapeMatrix[index], left, width);

    return GameMaker.spliceMapping(
      start,
      deleteCount,
      cloneScreen,
      insertShapeRow,
    );
  }

  render() {
    this.currentScreen = Object.values(this.shapes).reduce(
      (newScreen, shape) => GameMaker.insertShapeInScreen(shape, newScreen),
      this.initialScreen,
    );

    this.notifyListeners();

    return this.currentScreen;
  }

  removeShape(targetShape: Shape) {
    this.shapes = this.shapes.filter((shape) => targetShape !== shape);
  }

  addShapeToScreen(shape: Shape) {
    this.shapes[this.uniqueShapeId()] = shape;

    const onChangeCallback = () => {
      this.render();
    };

    this.render();

    shape.setOnChange(onChangeCallback.bind(this));
    if (shape.onMountHandler) shape.onMountHandler();
  }
}

export default GameMaker;
