export interface WSMessage {
  message: string;
  type: 'code' | 'exec';
}