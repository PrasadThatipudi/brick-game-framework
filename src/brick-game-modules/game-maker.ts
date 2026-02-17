import Shape from "./shape";
import { DirectionHandlers, Screen, ScreenRow } from "./types";

const uniqueId = (start: number) => () => start++;

class GameMaker {
  private initialScreen: Screen;
  private shapes: { [N in number]: Shape } = {};
  private uniqueShapeId = uniqueId(0);

  private constructor(initialScreen: Screen) {
    this.initialScreen = initialScreen;
  }

  static initialize(width: number, height: number) {
    const zeros: 0[] = Array.from({ length: width }, () => 0);
    const initialScreen: Screen = Array.from({ length: height }, () => [
      ...zeros,
    ]);

    return new GameMaker(initialScreen);
  }

  private setScreen(newScreen: Screen) {
    this.initialScreen = newScreen;
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

  private static updateScreenRow(
    screenRow: ScreenRow,
    shapeRow: ScreenRow,
    left: number,
  ): ScreenRow {
    return screenRow.toSpliced(
      left,
      shapeRow.length,
      ...screenRow
        .slice(left, shapeRow.length)
        .map((value, index) => shapeRow[index] || value),
    );
  }

  private static insertShapeInScreen(shape: Shape, screen: Screen): Screen {
    const { height, shape: shapeMatrix, position } = shape.getShape();
    const { top, left } = position;

    const cloneScreen = screen.map((row) => row.slice());

    return cloneScreen.toSpliced(
      top,
      height,
      ...cloneScreen
        .slice(top, top + height)
        .map((row, index) =>
          GameMaker.updateScreenRow(row, shapeMatrix[index], left),
        ),
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
