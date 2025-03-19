'use client';

import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { INoteItem } from "@/app/types";



export default function NoteItem({ note, deleteNote }: INoteItem) {
  return (
    <Card sx={{ mb: 2 }} variant={"outlined"} className={"group"}>
      <CardContent>
        <Stack className={"space-y-3"}>
          <div className="flex justify-between items-center">
            <div className="flex flex-col space-y-1">
              <Typography variant="subtitle1">{note.title}</Typography>
              <Typography variant="caption">{note?.createdAt?.toLocaleString("fa-IR")}</Typography>
            </div>

            <IconButton
              color="error"
              onClick={() => confirm("حذف شود؟") && deleteNote(note.id!)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <DeleteIcon />
            </IconButton>
          </div>
          <Typography variant="body1" color="text.secondary">
            {note.description}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
