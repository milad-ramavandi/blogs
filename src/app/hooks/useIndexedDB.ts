import { useEffect, useState } from "react";
import { INote } from "../types";

const DB_NAME = "notesDB";
const STORE_NAME = "notes";

export function useIndexedDB() {
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => fetchNotes();
  }, []);

  const fetchNotes = () => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const getAllRequest = store.getAll();
      getAllRequest.onsuccess = () => setNotes(getAllRequest.result);
    };
  };

  const addNote = (note: INote) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      store.add(note).onsuccess = fetchNotes;
    };
  };

  const deleteNote = (id: number) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      store.delete(id).onsuccess = fetchNotes;
    };
  };

  return { notes, addNote, deleteNote };
}
