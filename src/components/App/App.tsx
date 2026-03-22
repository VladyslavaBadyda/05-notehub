import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import css from "./App.module.css";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

export default function App() {
    // 🔹 state сторінки
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 🔹 запит нотаток
    const { data, isLoading, isError } = useQuery({
        queryKey: ["notes", page],
        queryFn: () => fetchNotes(page, ""),
    });

    // 🔹 безпечне отримання даних
    const notes = data?.notes ?? [];
    const totalPages = data?.totalPages ?? 0;

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                {/* SearchBox буде тут */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                )}

                <button className={css.button} onClick={() => setIsModalOpen(true)}>
                    Create note +
                </button>
            </header>

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <NoteForm onClose={() => setIsModalOpen(false)} />
                </Modal>
            )}

            {/* Стани */}
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading notes</p>}

            {/* Список нотаток */}
            {notes.length > 0 && <NoteList notes={notes} />}
        </div>
    );
}