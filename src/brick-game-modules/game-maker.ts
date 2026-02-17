type Screen = (0 | 1)[][];

class ScreenManager {
  private currentScreen: Screen;
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

    return new ScreenManager(initialScreen);
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

  addShapeToScreen(shape: Shape, position: { top: number; left: number }) {
    const { top, left } = position;
    const { height, width, shape: shapeMatrix } = shape.getShape();

    const copyScreen = [...this.currentScreen];

    for (let index = 0; index < height; index++) {
      copyScreen[index + top] = copyScreen[index + top].toSpliced(
        left,
        width,
        ...shapeMatrix[index],
      );
    }

    this.setScreen(copyScreen);
  }
}

export default ScreenManager;
