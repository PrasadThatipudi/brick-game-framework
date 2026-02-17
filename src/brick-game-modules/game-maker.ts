import Shape from "./shape";
import {
  Direction,
  DirectionHandler,
  DirectionHandlers,
  Screen,
  ScreenRow,
  ShapeWithPosition,
} from "./types";

const uniqueId = (start: number) => () => start++;

class GameMaker {
  private currentScreen: Screen;
  private shapes: { [N in number]: ShapeWithPosition } = {};
  private arrows: DirectionHandlers = {
    up: null,
    down: null,
    left: null,
    right: null,
  };
  private uniqueShapeId = uniqueId(0);

  private constructor(initialScreen: Screen) {
    this.currentScreen = initialScreen;
  }

  static initialize(width: number, height: number) {
    const zeros: 0[] = Array.from({ length: width }, () => 0);
    const initialScreen: Screen = Array.from({ length: height }, () => [
      ...zeros,
    ]);

    return new GameMaker(initialScreen);
  }

  private setScreen(newScreen: Screen) {
    this.currentScreen = newScreen;
  }

  getScreen() {
    this.render();
    return this.currentScreen;
  }

  getArrows() {
    return this.arrows;
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

  private static insertShapeInScreen(
    shapeWithPosition: ShapeWithPosition,
    screen: Screen,
  ): Screen {
    const { shape, position } = shapeWithPosition;
    const { top, left } = position;
    const { height, shape: shapeMatrix } = shape.getShape();

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
    for (const shapeWithPosition of Object.values(this.shapes)) {
      const newScreen = GameMaker.insertShapeInScreen(
        shapeWithPosition,
        this.currentScreen,
      );

      this.setScreen(newScreen);
    }
  }

  setArrows(arrows: DirectionHandlers) {
    Object.entries(
      ([direction, handler]: [Direction, DirectionHandler]) =>
        (this.arrows[direction] = arrows[direction] || handler),
    );
  }

  makeDirectionHandlers(arrows: DirectionHandlers): DirectionHandlers {
    const updatedArrows = Object.entries(arrows).map(([direction, handler]) => {
      if (handler === null) return [direction, handler];

      const controlledHandler = () => handler();

      return [direction, controlledHandler];
    });

    return Object.fromEntries(updatedArrows);
  }

  addShapeToScreen(
    shape: Shape,
    position: { top: number; left: number },
    arrows: DirectionHandlers,
  ) {
    this.shapes[this.uniqueShapeId()] = { shape, position };
    this.setArrows(this.makeDirectionHandlers(arrows));
  }
}

export default GameMaker;
