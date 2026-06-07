import React from 'react';
import { getInitials } from '../../lib/utils/helpers';

export default function CustomerCard({ customer, onClick }) {
  const isMale = customer.gender === 'Male';
  const avatarBg = isMale ? '#163B4015' : '#C36B7E15';
  const avatarText = isMale ? '#163B40' : '#C36B7E';

  const getStatusBadgeStyle = (status) => {
    const base = {
      fontSize: '10px',
      fontWeight: '500',
      padding: '2px 7px',
      borderRadius: '3px',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      lineHeight: '1.4'
    };
    switch (status) {
      case 'New':
        return { ...base, backgroundColor: '#185FA512', color: '#185FA5' };
      case 'Active':
        return { ...base, backgroundColor: '#0F6E5612', color: '#0F6E56' };
      case 'Matched':
        return { ...base, backgroundColor: '#C36B7E18', color: '#993556' };
      case 'Closed':
        return { ...base, backgroundColor: '#f0ebe3', color: '#8a8070' };
      default:
        return base;
    }
  };

  const hasProfession = customer.designation && customer.currentCompany;
  const professionText = hasProfession ? `${customer.designation} · ${customer.currentCompany}` : '—';

  const getDietLabel = (pref) => {
    if (!pref) return '🍽️ Diet';
    const lower = pref.toLowerCase();
    if (lower === 'veg') return '🌿 Veg';
    if (lower === 'non-veg') return '🍖 Non-Veg';
    if (lower === 'jain') return '🟡 Jain';
    if (lower === 'eggetarian') return '🥚 Eggetarian';
    return `🍽️ ${pref}`;
  };

  const latestNote = customer.notes && customer.notes.length > 0 ? customer.notes[0].text : null;
  const noteText = latestNote || 'No notes yet';
  const truncatedNote = noteText.length > 40 ? noteText.substring(0, 40) + '...' : noteText;
  const notePreview = `📝 ${truncatedNote}`;

  return (
    <div
      onClick={onClick}
      style={{
        background: '#fff',
        border: '0.5px solid #e8e2da',
        borderRadius: '10px',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        minHeight: '148px',
        cursor: 'pointer',
        transition: 'box-shadow 0.15s, transform 0.15s',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.07)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Row 1 — TOP */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Avatar Circle */}
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: avatarBg,
              color: avatarText,
              fontSize: '13px',
              fontWeight: '600'
            }}
          >
            {getInitials(customer.firstName, customer.lastName)}
          </div>
          {/* Identity Block */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--primary-teal)' }}>
              {customer.firstName} {customer.lastName}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {customer.gender} · {customer.age} yrs · {customer.city}
            </div>
          </div>
        </div>
        {/* Status Badge */}
        <span style={getStatusBadgeStyle(customer.statusTag)}>
          {customer.statusTag}
        </span>
      </div>

      {/* Row 2 — PROFESSION */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5a5048" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
        <span style={{ fontSize: '12px', color: '#5a5048' }}>
          {professionText}
        </span>
      </div>

      {/* Row 3 — DIVIDER */}
      <div style={{ height: '0.5px', backgroundColor: '#f0ebe3', width: '100%' }} />

      {/* Row 4 — CHIPS */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {/* Diet Chip */}
        <span style={{
          fontSize: '11px',
          padding: '3px 8px',
          borderRadius: '5px',
          backgroundColor: '#f7f3ee',
          border: '0.5px solid #e8e2da',
          color: '#5a5048',
          display: 'inline-flex',
          alignItems: 'center'
        }}>
          {getDietLabel(customer.dietaryPreference)}
        </span>
        {/* Religion Chip */}
        <span style={{
          fontSize: '11px',
          padding: '3px 8px',
          borderRadius: '5px',
          backgroundColor: '#C59B2712',
          border: '0.5px solid #C59B2728',
          color: '#7a5c10',
          display: 'inline-flex',
          alignItems: 'center'
        }}>
          {customer.religion}
        </span>
      </div>

      {/* Row 5 — NOTE PREVIEW */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontSize: '11px',
            color: '#aaa098',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            maxWidth: '100%',
            display: 'inline-block'
          }}
        >
          {notePreview}
        </span>
      </div>
    </div>
  );
}
