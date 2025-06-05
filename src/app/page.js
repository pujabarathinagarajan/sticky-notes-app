"use client";

import { useState, useEffect } from "react";

export default function StickyNotesApp() {
    const [notes, setNotes] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        setNotes(savedNotes);
    }, []);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const createNote = () => {
        const newNote = { id: Date.now(), content: "" };
        setNotes([newNote, ...notes]);
    };

    const updateNote = (id, content) => {
        setNotes(notes.map(note => note.id === id ? { ...note, content } : note));
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const handleBlur = (id, content) => {
        updateNote(id, content);
        setEditingId(null);
    };

    const editingNote = notes.find(note => note.id === editingId);

    return (
        <div className="relative min-h-screen p-4 bg-yellow-50">
            {editingNote && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center">
                    <div className="w-full max-w-xl h-96 bg-yellow-100 p-4 rounded-lg shadow-lg overflow-auto relative">
            <textarea
                autoFocus
                defaultValue={editingNote.content}
                onBlur={(e) => handleBlur(editingNote.id, e.target.value)}
                className="w-full h-full p-2 border border-yellow-300 rounded resize-none bg-yellow-50 text-gray-800"
            />
                        <button
                            onClick={() => deleteNote(editingNote.id)}
                            className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            <h1 className="text-2xl font-bold mb-4 text-gray-700">Sticky Notes</h1>
            <button
                onClick={createNote}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
            >
                Add Note
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {notes.map(note => (
                    <div
                        key={note.id}
                        className="relative bg-yellow-100 p-4 rounded-lg shadow min-h-[120px] max-h-[120px] overflow-hidden"
                    >
                        <p
                            onClick={() => setEditingId(note.id)}
                            className="cursor-text whitespace-pre-wrap overflow-hidden overflow-ellipsis text-gray-700"
                            style={{ minHeight: "88px" }}
                        >
                            {note.content}
                        </p>
                        <button
                            onClick={() => deleteNote(note.id)}
                            className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
