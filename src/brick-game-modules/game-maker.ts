import Shape from "./shape";
import { Position, Screen } from "./types";

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

  private static insertShapeInScreen(
    shapeWithPosition: ShapeWithPosition,
    screen: Screen,
  ): Screen {
    const { shape, position } = shapeWithPosition;
    const { top, left } = position;
    const { height, width, shape: shapeMatrix } = shape.getShape();

    const copyScreen = [...screen];

    for (let index = 0; index < height; index++) {
      copyScreen[index + top] = copyScreen[index + top].toSpliced(
        left,
        width,
        ...shapeMatrix[index],
      );
    }

    return copyScreen;
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
