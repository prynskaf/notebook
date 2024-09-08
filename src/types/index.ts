export interface Note {
  _id: string;
  title: string;
  language?: string;
  content: string;
  codeSample: string; // Include codeSample here
  createdAt: string;
}
