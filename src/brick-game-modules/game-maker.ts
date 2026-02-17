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

  private static spliceWithMapping<T>(
    start: number,
    deleteCount: number,
    array: T[],
    mapper: (value: T, index: number) => T,
  ) {
    return array.toSpliced(
      start,
      deleteCount,
      ...array.slice(start, start + deleteCount).map(mapper),
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

    const insertPixel = (value: 0 | 1, index: number) =>
      shapeRow[left < 0 ? Math.abs(left) + index : index] && value;

    return GameMaker.spliceWithMapping(
      start,
      deleteCount,
      screenRow,
      insertPixel,
    );
  }

  private static insertShapeInScreen(shape: Shape, screen: Screen): Screen {
    const { height, width, shape: shapeMatrix, position } = shape.getShape();
    const { top, left } = position;

    const cloneScreen = screen.map((row) => row.slice());

    const start = top < 0 ? 0 : top;
    const deleteCount = top < 0 ? top + height : height;
    const absIndex = (index: number) =>
      top < 0 ? index + Math.abs(top) : index;

    const insertShapeRow = (row: (0 | 1)[], index: number): ScreenRow =>
      GameMaker.updateScreenRow(row, shapeMatrix[absIndex(index)], left, width);

    return GameMaker.spliceWithMapping(
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
