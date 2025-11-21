export enum AppState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface PaintingResult {
  imageUrl: string;
  poem: string;
}

export interface ServiceError {
  message: string;
}