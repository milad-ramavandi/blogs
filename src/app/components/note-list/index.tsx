import { TextField, Typography } from "@mui/material";
import NoteItem from "../note-item";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

interface NoteListProps {
  notes: any[];
  deleteNote: (id: number) => void;
}

export default function NoteList({ notes, deleteNote }: NoteListProps) {
  const [search, setSearch] = useState("");
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className={"space-y-2"}>
      {notes?.length === 0 ? (
        <Typography
          variant="h6"
          className="h-full flex justify-center items-center"
        >
          هنوز هیچ یادداشتی ندارید.
        </Typography>
      ) : (
        <>
          {notes?.length > 1 && (
            <TextField
              label={"جستجو در یادداشت ها"}
              value={search}
              onChange={handleSearch}
              fullWidth
            />
          )}
          <div className="mt-4 h-40 overflow-auto">
            {filteredNotes.map((note) => (
              <NoteItem key={note.id} note={note} deleteNote={deleteNote} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
