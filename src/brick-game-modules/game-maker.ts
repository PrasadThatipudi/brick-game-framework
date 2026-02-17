import Shape from "./shape";
import { DirectionHandlers, Screen, ScreenRow } from "./types";

const debug = <T>(arg: T): T => console.log(arg)! || arg;
const uniqueId = (start: number) => () => start++;

class GameMaker {
  private initialScreen: Screen;
  private shapes: { [N in number]: Shape } = {};
  private uniqueShapeId = uniqueId(0);

  private constructor(initialScreen: Screen) {
    this.initialScreen = initialScreen;
  }

  static initialize(width: number, height: number) {
    const ones: 1[] = Array.from({ length: width }, () => 1);
    const initialScreen: Screen = Array.from({ length: height }, () => [
      ...ones,
    ]);

    return new GameMaker(initialScreen);
  }

  getArrows(): DirectionHandlers {
    const shape = this.shapes[0];
    const directionHandlers: DirectionHandlers = {
      up: null,
      down: null,
      left: null,
      right: null,
    };

    return Object.entries(shape.getArrows()).reduce(
      (directionHandlers, [direction, handler]): DirectionHandlers => {
        if (handler === null) return directionHandlers;

        const newHandler = () => {
          handler();
          return this.render();
        };

        return { ...directionHandlers, [direction]: newHandler };
      },
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
    return Object.values(this.shapes).reduce(
      (newScreen, shape) => GameMaker.insertShapeInScreen(shape, newScreen),
      this.initialScreen,
    );
  }

  addShapeToScreen(shape: Shape) {
    this.shapes[this.uniqueShapeId()] = shape;
  }
}

export default GameMaker;
