import Shape from "./shape";
import { Position, Screen, ScreenRow } from "./types";

type ShapeWithPosition = {
  shape: Shape;
  position: Position;
};

class GameMaker {
  private currentScreen: Screen;
  private shapes: ShapeWithPosition[] = [];
  private arrows: {
    up: (() => Screen) | null;
    down: (() => Screen) | null;
    left: (() => Screen) | null;
    right: (() => Screen) | null;
  } = {
    up: null,
    down: null,
    left: null,
    right: null,
  };

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
      top + height,
      ...cloneScreen
        .slice(top, top + height)
        .map((row, index) =>
          GameMaker.updateScreenRow(row, shapeMatrix[index], left),
        ),
    );
  }

  private updateScreenWithShapes() {
    for (const shape of this.shapes) {
      const newScreen = GameMaker.insertShapeInScreen(
        shape,
        this.currentScreen,
      );

      this.setScreen(newScreen);
    }
  }

  addShapeToScreen(shape: Shape, position: { top: number; left: number }) {
    this.shapes.push({ shape, position });
    this.updateScreenWithShapes();
  }
}

export default GameMaker;
