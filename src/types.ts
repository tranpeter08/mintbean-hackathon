export interface RequestMethodHandler {
  [key: string]: Function;
}

export interface OptionsPayload {
  [key: string]: {
    [key: string]: string;
  };
}

export interface PollPayload {
  [key: string]: string;
}

export interface DrawingData {
  _id: string;
  url: string;
  penDataJSON: string;
}

export interface PenData {
  lines: [LineData];
  width: string;
  height: string;
}

export interface LineData {
  points: [PointCoords];
  brushRadius: number;
  brushColor: string;
}

export interface PointCoords {
  x: string;
  y: string;
}
