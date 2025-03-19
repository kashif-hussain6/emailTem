"use client";

import { useState } from "react";
import { FiEdit2, FiSave, FiX, FiPlus, FiTrash2 } from "react-icons/fi";

interface SummaryItem {
  id: number;
  text: string;
  isEditing: boolean;
}

const Summary = () => {
  const [summaries, setSummaries] = useState<SummaryItem[]>([]);
  const [editing, setEditing] = useState(false); // Controls dark overlay

  // Function to add a new summary
  const addNewEntry = () => {
    const newEntry = { id: Date.now(), text: "", isEditing: true };
    setSummaries([...summaries, newEntry]);
    setEditing(true);
  };

  // Function to delete a summary
  const deleteEntry = (id: number) => {
    setSummaries(summaries.filter((summary) => summary.id !== id));
  };

  // Function to update summary text
  const updateSummaryText = (id: number, newText: string) => {
    setSummaries(
      summaries.map((summary) =>
        summary.id === id ? { ...summary, text: newText } : summary
      )
    );
  };

  // Function to toggle editing mode
  const toggleEditing = (id: number, state: boolean) => {
    setSummaries(
      summaries.map((summary) =>
        summary.id === id ? { ...summary, isEditing: state } : summary
      )
    );
    setEditing(state);
  };

  return (
    <div className={`relative w-full max-w-2xl ${editing ? "bg-black/30 fixed inset-0" : ""}`}>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        onClick={addNewEntry}
      >
        + New Entry
      </button>

      {summaries.map((summary) => (
        <div
          key={summary.id}
          className={`relative p-3 rounded-lg transition-all mt-4 bg-white shadow-md ${
            summary.isEditing ? "border border-gray-300" : "border-none"
          }`}
          onClick={() => toggleEditing(summary.id, true)}
        >
          <h2 className="text-[16px] text-[#384347] font-normal mb-[5px]">
            SUMMARY
          </h2>

          {summary.isEditing ? (
            <textarea
              className="w-full h-auto p-2 border border-gray-300 rounded text-gray-700 text-[12px] focus:outline-none resize-none"
              value={summary.text}
              onChange={(e) => updateSummaryText(summary.id, e.target.value)}
              autoFocus
            />
          ) : (
            <p className="text-skills text-[12px]">{summary.text || "Click to edit..."}</p>
          )}

          {/* Floating Toolbar (Appears only when editing) */}
          {summary.isEditing && (
            <div className="absolute top-[-50px] left-0 flex items-center space-x-2 bg-white p-2 shadow-md rounded-full">
              <button
                className="text-gray-500 p-1 hover:bg-gray-200 rounded"
                onClick={(e) => e.stopPropagation()}
              >
                <FiEdit2 size={14} />
              </button>
              <button
                className="text-red-500 p-1 hover:bg-gray-200 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteEntry(summary.id);
                }}
              >
                <FiTrash2 size={14} />
              </button>
              <button
                className="text-green-500 p-1 hover:bg-gray-200 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEditing(summary.id, false);
                }}
              >
                <FiSave size={14} />
              </button>
              <button
                className="text-red-500 p-1 hover:bg-gray-200 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEditing(summary.id, false);
                }}
              >
                <FiX size={14} />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Summary;
