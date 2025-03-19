export interface INote {
  id?: number;
  title: string;
  description: string;
  createdAt: Date;
}

export interface INoteItem {
  note: INote;
  deleteNote: (id: number) => void;
}

export interface INoteList {
  notes: INote[];
  deleteNote: (id: number) => void;
}


export interface INoteForm {
  addNote: (note: INote) => void;
}
