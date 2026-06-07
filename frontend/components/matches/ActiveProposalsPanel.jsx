import React from 'react';

export default function ActiveProposalsPanel({ sentMatches, onUpdateProposalStatus }) {
  if (!sentMatches || sentMatches.length === 0) return null;

  return (
    <div style={{
      backgroundColor: 'var(--bg-cream)',
      border: '1px solid var(--border-light)',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '30px',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary-teal)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        📋 Active CRM Proposals ({sentMatches.length})
      </h3>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
        Track and update the status of match recommendations sent to this client.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {sentMatches.map((proposal) => (
          <div key={proposal.profileId} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-white)',
            border: '1px solid var(--border-light)',
            borderRadius: '12px',
            padding: '12px 16px',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '200px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-gold-light)',
                color: 'var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '14px'
              }}>
                {proposal.firstName.charAt(0)}
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-dark)', margin: 0 }}>
                  {proposal.firstName} {proposal.lastName}
                </h4>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                  {proposal.designation} • {proposal.city}
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {/* Compatibility Score */}
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary-teal)' }}>{proposal.score}%</span>
                <span style={{ display: 'block', fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Match</span>
              </div>

              {/* Status Badge */}
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '20px',
                backgroundColor: proposal.status === 'Accepted' ? '#EAF5ED' : proposal.status === 'Rejected' ? '#FCEBEA' : '#FFF9E6',
                color: proposal.status === 'Accepted' ? '#2E6830' : proposal.status === 'Rejected' ? '#A83232' : '#B8860B',
                border: `1px solid ${proposal.status === 'Accepted' ? '#2E6830' : proposal.status === 'Rejected' ? '#A83232' : '#B8860B'}33`
              }}>
                {proposal.status}
              </span>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {proposal.status !== 'Accepted' && (
                  <button
                    onClick={() => onUpdateProposalStatus(proposal.profileId, 'Accepted')}
                    className="action-btn"
                    style={{
                      padding: '6px 10px',
                      fontSize: '11px',
                      borderRadius: '6px',
                      backgroundColor: 'var(--color-background-success)',
                      color: 'var(--color-text-success)',
                      border: '1px solid var(--color-text-success)33',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Accept
                  </button>
                )}
                {proposal.status !== 'Rejected' && (
                  <button
                    onClick={() => onUpdateProposalStatus(proposal.profileId, 'Rejected')}
                    className="action-btn"
                    style={{
                      padding: '6px 10px',
                      fontSize: '11px',
                      borderRadius: '6px',
                      backgroundColor: 'var(--color-background-danger)',
                      color: 'var(--color-text-danger)',
                      border: '1px solid var(--color-text-danger)33',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Reject
                  </button>
                )}
                {proposal.status !== 'Proposed' && (
                  <button
                    onClick={() => onUpdateProposalStatus(proposal.profileId, 'Proposed')}
                    className="action-btn"
                    style={{
                      padding: '6px 10px',
                      fontSize: '11px',
                      borderRadius: '6px',
                      backgroundColor: 'var(--bg-cream)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border-light)',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
