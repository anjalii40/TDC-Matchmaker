import React from 'react';

export default function CrmClientControls({ customer, openSections, toggleSection, onTogglePaused, onToggleClosed }) {
  if (!customer) return null;

  return (
    <div className="section-accordion">
      <button className="accordion-trigger" onClick={() => toggleSection('crmControls')}>
        <span className="accordion-title" style={{ color: 'var(--primary-teal)', fontWeight: '700' }}>
          CRM Client Controls
        </span>
        <span className="accordion-icon">{openSections.crmControls ? '▲' : '▼'}</span>
      </button>
      {openSections.crmControls && (
        <div className="accordion-content" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-dark)' }}>Pause Search</span>
            <button
              onClick={onTogglePaused}
              className={`action-btn ${customer.searchPaused ? 'btn-primary' : 'btn-secondary'}`}
              style={{ 
                padding: '6px 12px', 
                fontSize: '12px',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: customer.searchPaused ? 'var(--accent-gold)' : 'var(--bg-cream)',
                borderColor: customer.searchPaused ? 'var(--accent-gold)' : 'var(--border-light)',
                color: customer.searchPaused ? 'white' : 'var(--text-dark)',
                fontWeight: '600'
              }}
            >
              {customer.searchPaused ? 'Resume' : 'Pause'}
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-dark)' }}>Close Account</span>
            <button
              onClick={onToggleClosed}
              className={`action-btn ${customer.accountClosed ? 'btn-primary' : 'btn-secondary'}`}
              style={{ 
                padding: '6px 12px', 
                fontSize: '12px',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: customer.accountClosed ? 'var(--accent-rose)' : 'var(--bg-cream)',
                borderColor: customer.accountClosed ? 'var(--accent-rose)' : 'var(--border-light)',
                color: customer.accountClosed ? 'white' : 'var(--text-dark)',
                fontWeight: '600'
              }}
            >
              {customer.accountClosed ? 'Reopen' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
