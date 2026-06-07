import React from 'react';
import { getInitials, getStageColor, getStageBgColor } from '../../lib/utils/helpers';

export default function CustomerKanbanColumn({ stage, stageCustomers, onClickCard }) {
  const headerColor = getStageColor(stage);
  const headerBg = getStageBgColor(stage);

  return (
    <div 
      style={{ 
        background: 'var(--bg-white)', 
        borderRadius: '16px', 
        border: '1px solid var(--border-light)', 
        padding: '20px 16px',
        boxShadow: 'var(--shadow-sm)',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}
    >
      {/* Stage Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: `2px solid ${headerColor}` }}>
        <h3 style={{ fontSize: '16px', color: 'var(--primary-teal)', fontWeight: '700' }}>
          {stage}
        </h3>
        <span 
          style={{ 
            fontSize: '12px', 
            fontWeight: '700', 
            backgroundColor: headerBg, 
            color: headerColor, 
            padding: '3px 9px', 
            borderRadius: '12px' 
          }}
        >
          {stageCustomers.length}
        </span>
      </div>

      {/* Cards stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: '600px', paddingRight: '2px' }}>
        {stageCustomers.length === 0 ? (
          <div style={{ padding: '30px 10px', textAlign: 'center', border: '1px dashed var(--border-light)', borderRadius: '12px', color: 'var(--text-muted)', fontSize: '13px' }}>
            No clients in {stage}
          </div>
        ) : (
          stageCustomers.map(customer => (
            <div
              key={customer.id}
              onClick={() => onClickCard(customer.id)}
              style={{
                background: 'var(--bg-cream)',
                border: '1px solid var(--border-light)',
                borderRadius: '12px',
                padding: '16px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(22, 59, 64, 0.02)',
                transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(22, 59, 64, 0.02)';
              }}
            >
              {/* Card Header info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div 
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: 'var(--bg-white)',
                    border: '1px solid var(--border-light)',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--primary-teal)'
                  }}
                >
                  {getInitials(customer.firstName, customer.lastName)}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary-teal)' }}>
                    {customer.firstName} {customer.lastName}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {customer.gender}
                  </div>
                </div>
              </div>

              {/* Quick details */}
              <div style={{ fontSize: '12px', color: 'var(--text-dark)', marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px dashed var(--border-light)' }}>
                Age {customer.age} • {customer.city}
              </div>

              {/* Notes Preview */}
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.3' }}>
                {customer.notes && customer.notes.length > 0 ? (
                  <span style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    📝 {customer.notes[0].text}
                  </span>
                ) : (
                  <span>No coordinator notes recorded.</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
