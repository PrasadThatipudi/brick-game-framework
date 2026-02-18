import { useEffect } from "react";

const useShape = (screen, createShape) => {
  useEffect(() => {
    const shape = createShape();

    screen.addShapeToScreen(shape);
    return () => screen.removeShape(shape);
  }, []);
};

export { useShape };
