import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export const fetchNotes = async (
    page: number,
    search: string,
): Promise<FetchNotesResponse> => {
    const response = await instance.get("/notes", {
        params: {
            page,
            perPage: 12,
            search,
        },
    });

    return response.data;
};

interface CreateNotePayload {
    title: string;
    content: string;
    tag: string;
}

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
    const response = await instance.post("/notes", payload);
    return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await instance.delete(`/notes/${id}`);
    return response.data;
};