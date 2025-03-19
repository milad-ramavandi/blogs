'use client'
import { INoteForm } from "@/app/types";
import { Paper, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";



export default function NoteForm({ addNote }: INoteForm) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addNote({ title, description, createdAt: new Date() });
    setTitle("");
    setDescription("");
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Stack spacing={2}>
          <TextField
            label="عنوان"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="توضیحات"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
          />
          <Button type="submit" variant="contained">
            افزودن یادداشت
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
