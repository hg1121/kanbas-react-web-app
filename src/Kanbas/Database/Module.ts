export interface Lesson {
    "_id": string;
    "name": string;
    "description": string;
    "module":string;
  }

export interface Module{
    "_id": string;
      "name": string;
      "description": string;
      "course": string;
      "lessons": Lesson[];
}