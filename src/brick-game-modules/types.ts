import Shape from "./shape";

type ScreenRow = (0 | 1)[];
type Screen = ScreenRow[];
type Position = { top: number; left: number };
type Direction = "up" | "down" | "left" | "right";
type DirectionHandler = () => Screen;

type DirectionHandlers = {
  [D in Direction]: DirectionHandler | null;
};

type PositionUpdater = (position: Position) => Position;
type ShapeUpdaterWithPosition = () => Shape;

type ShapeDirectionHandlers = {
  [D in Direction]: ShapeUpdaterWithPosition | null;
};

type ShapeWithPosition = {
  shape: Shape;
  position: Position;
};

export type {
  Screen,
  Position,
  ScreenRow,
  DirectionHandlers,
  Direction,
  DirectionHandler,
  ShapeWithPosition,
  PositionUpdater,
  ShapeUpdaterWithPosition,
  ShapeDirectionHandlers,
};
