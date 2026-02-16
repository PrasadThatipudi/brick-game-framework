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

  getScreen() {
    return this.currentScreen;
  }

  getArrows() {
    return this.arrows;
  }
}

export default ScreenManager;
