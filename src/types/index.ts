// src/types/index.ts

export interface Note {
    id: string;
    title: string;
    content: string;
    codeSample?: string; // Optional field for code samples
    createdAt: Date;
    updatedAt: Date;
  }
  