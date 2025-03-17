import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

interface NoteItemProps {
  note: { id: number; title: string; description: string };
  deleteNote: (id: number) => void;
}

export default function NoteItem({ note, deleteNote }: NoteItemProps) {
  return (
    <Card sx={{ mb: 2 }} variant={"outlined"}>
      <CardContent>
        <Stack>
          <div className="flex justify-between items-center">
            <Typography variant="subtitle1">{note.title}</Typography>

            <IconButton
              color="error"
              onClick={() => confirm("حذف شود؟") && deleteNote(note.id!)}
            >
              حذف
            </IconButton>
          </div>
          <Typography variant="body2" color="text.secondary">
            {note.description}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
