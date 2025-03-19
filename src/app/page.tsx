"use client";
import { Container, Typography } from "@mui/material";
import NoteForm from "./components/note-form";
import NoteList from "./components/note-list";
import ThemeToggle from "./components/theme-toggle";
import { useIndexedDB } from "./hooks/useIndexedDB";
import { ThemeProviderCustom } from "./context/ThemeContext";

export default function Home() {
  const { notes, addNote, deleteNote } = useIndexedDB();
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ThemeProviderCustom>
        <div
          className={`w-[500px] mx-auto p-4 shadow-lg rounded-md border-2 bg-white dark:bg-black`}
        >
          <ThemeToggle />
          <Typography variant={"h5"} sx={{ textAlign: "center" }} className="text-black dark:text-white">
            مدیریت یادداشت‌ها
          </Typography>

          <Container sx={{ width: "100%", mt: 4 }} className={"space-y-4"}>
            <NoteForm addNote={addNote} />
            <NoteList notes={notes} deleteNote={deleteNote} />
          </Container>
        </div>
      </ThemeProviderCustom>
    </div>
  );
}
