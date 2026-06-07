import { useState } from 'react';
import { getApiUrl } from '../lib/utils/helpers';

export default function useNotes(customerId, addToast) {
  const [noteText, setNoteText] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);

  const handleAddNote = async (e, setCustomer) => {
    if (e) e.preventDefault();
    if (!noteText.trim()) return;

    setSubmittingNote(true);
    try {
      const res = await fetch(getApiUrl(`/api/customers/${customerId}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: noteText })
      });
      if (res.ok) {
        const updated = await res.json();
        if (setCustomer) {
          setCustomer(prev => {
            if (!prev) return updated;
            return {
              ...prev,
              notes: updated.notes
            };
          });
        }
        setNoteText('');
        if (addToast) addToast("Staff note added and saved.");
        return updated.notes;
      } else {
        if (addToast) addToast("Failed to save note.");
        return null;
      }
    } catch (err) {
      console.error("Error saving note:", err);
      if (addToast) addToast("Failed to save note.");
      return null;
    } finally {
      setSubmittingNote(false);
    }
  };

  return {
    noteText,
    setNoteText,
    submittingNote,
    handleAddNote
  };
}
