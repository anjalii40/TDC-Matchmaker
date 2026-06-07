import React from 'react';

export default function MatchmakerNotes({ 
  customer, 
  noteText, 
  setNoteText, 
  submittingNote, 
  onAddNote 
}) {
  if (!customer) return null;

  return (
    <div className="notes-section">
      <div className="notes-header">
        <h3>Matchmaker Notes</h3>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          {customer.notes?.length || 0} Saved
        </span>
      </div>
      
      <form onSubmit={onAddNote} className="note-input-row">
        <textarea
          className="note-textarea"
          placeholder="Record summary of call or review..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          disabled={submittingNote}
          required
        />
        <button
          type="submit"
          className="note-add-btn"
          disabled={submittingNote}
        >
          Save
        </button>
      </form>

      <div className="notes-list">
        {(!customer.notes || customer.notes.length === 0) ? (
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', padding: '12px 0' }}>
            No meeting notes recorded yet.
          </p>
        ) : (
          customer.notes.map(note => (
            <div key={note.id} className="note-item">
              <p style={{ lineHeight: '1.4' }}>{note.text}</p>
              <div className="note-meta">{note.date}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
