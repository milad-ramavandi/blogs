'use client'
import { TextField, Typography } from "@mui/material";
import NoteItem from "../note-item";
import { ChangeEvent, useState } from "react";
import useDebounce from "@/app/hooks/useDebounce";
import { INoteList } from "@/app/types";



export default function NoteList({ notes, deleteNote }: INoteList) {
  const [search, setSearch] = useState("");
  const {debouncedValue} = useDebounce(search);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(debouncedValue.toLowerCase())
  );
  return (
    <div className={"space-y-2"}>
      {notes?.length === 0 ? (
        <Typography
          variant="h6"
          className="h-full flex justify-center items-center text-black dark:text-white"
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
