import React from 'react';

export default function SuggestedMatchCard({ 
  match, 
  isExpanded, 
  onToggleExpand, 
  proposal, 
  onUpdateProposalStatus, 
  onSendMatch 
}) {
  const getMatchCardClass = (label) => {
    switch (label) {
      case 'High Potential': return 'match-card high-potential';
      case 'Good Fit': return 'match-card good-fit';
      case 'Maybe': return 'match-card maybe';
      default: return 'match-card';
    }
  };

  const generateSummary = () => {
    if (!match.breakdown || match.breakdown.length === 0) return '';
    const activeBreakdown = match.breakdown.filter(item => item.max > 0);
    if (activeBreakdown.length < 2) return '';
    
    // Sort by percentage (score / max) descending
    const sorted = [...activeBreakdown].sort((a, b) => {
      const pctA = a.score / a.max;
      const pctB = b.score / b.max;
      return pctB - pctA;
    });

    const top1 = sorted[0].label;
    const top2 = sorted[1].label;
    const low1 = sorted[sorted.length - 1].label;

    return `${top1} and ${top2} are strong alignments. ${low1} may need discussion.`;
  };

  const summaryText = generateSummary();

  return (
    <div className={getMatchCardClass(match.label)} style={{ position: 'relative' }}>
      {/* Top-Right Badge */}
      <span 
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          fontSize: '11px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          padding: '4px 10px',
          borderRadius: '20px',
          backgroundColor: match.label === 'High Potential' ? 'var(--accent-gold-light)' : match.label === 'Good Fit' ? 'var(--status-active-bg)' : 'var(--status-hold-bg)',
          color: match.label === 'High Potential' ? 'var(--accent-gold)' : match.label === 'Good Fit' ? 'var(--status-active)' : 'var(--status-hold)',
          border: `1px solid ${match.label === 'High Potential' ? 'var(--accent-gold)' : match.label === 'Good Fit' ? 'var(--status-active)' : 'var(--status-hold)'}33`,
          zIndex: 2
        }}
      >
        {match.label}
      </span>

      {/* Card Top: Basic Info & Compat Score */}
      <div className="card-top">
        <div className="match-profile-info">
          <div className="match-avatar">
            {match.profile.firstName.charAt(0)}
          </div>
          <div>
            <h3 className="match-name" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              {match.profile.firstName} {match.profile.lastName}
              {match.prioritiesApplied && (
                <span 
                  style={{
                    fontSize: '9px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    backgroundColor: 'var(--primary-teal)',
                    color: 'var(--bg-cream)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    marginLeft: '8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}
                  title="Custom priorities (weightings) configured by matchmaker are active for this calculation"
                >
                  ⚡ Prioritized
                </span>
              )}
            </h3>
            <div className="match-sub" style={{ marginBottom: '6px' }}>
              <span>{match.profile.age} yrs</span>
              <span>•</span>
              <span>{match.profile.height} cm</span>
              <span>•</span>
              <span>{match.profile.city}</span>
            </div>
            {summaryText && (
              <div style={{ fontStyle: 'italic', fontWeight: '700', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                {summaryText}
              </div>
            )}
          </div>
        </div>
        
        <div className="score-badge" style={{ marginRight: '110px' }}>
          <span className="score-num">{match.score}%</span>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="quick-stats-grid">
        <div className="stat-item">
          <span className="stat-lbl">Profession</span>
          <span className="stat-val" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {match.profile.designation}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-lbl">Company</span>
          <span className="stat-val">{match.profile.currentCompany}</span>
        </div>
        <div className="stat-item">
          <span className="stat-lbl">Income</span>
          <span className="stat-val">{match.profile.income / 100000} LPA</span>
        </div>
        <div className="stat-item">
          <span className="stat-lbl">Relocation Pref</span>
          <span className="stat-val">{match.profile.openToRelocate}</span>
        </div>
      </div>

      {/* AI Intro insight box */}
      <div className="ai-intro-box">
        <p>{match.intro}</p>
      </div>

      {/* Compatibility Narratives Breakdown */}
      <div className="match-breakdown-section" style={{ borderTop: '1px dashed var(--border-light)', paddingTop: '16px' }}>
        <button
          className="action-btn btn-secondary"
          style={{ 
            width: '100%', 
            padding: '8px 12px', 
            fontSize: '12px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            backgroundColor: 'var(--bg-cream)',
            border: '1px solid var(--border-light)',
            color: 'var(--text-dark)',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
          onClick={onToggleExpand}
        >
          <span style={{ fontWeight: '600' }}>
            {isExpanded ? 'Hide Alignment Details' : 'View Alignment Details'}
          </span>
          <span>{isExpanded ? '▲' : '▼'}</span>
        </button>
        
        {isExpanded && (
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px', borderLeft: '3px solid var(--accent-rose)', paddingLeft: '16px' }}>
            
            {/* Progress Bars Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ fontSize: '11px', fontWeight: 500, color: 'var(--color-text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '4px' }}>
                Score Alignment Breakdown
              </h4>
              {match.breakdown && match.breakdown.map((item) => {
                const pct = item.max > 0 ? Math.round((item.score / item.max) * 100) : 0;
                
                // Find corresponding narrative text based on search keywords
                const relatedNarrative = match.narratives && match.narratives.find(n => 
                  (item.key === 'caste' && (n.includes('religion') || n.includes('religious') || n.includes('caste') || n.includes('lineage') || n.includes('traditions'))) ||
                  (item.key === 'motherTongue' && (n.includes('mother tongue') || n.includes('tongues'))) ||
                  (item.key === 'location' && (n.includes('live') || n.includes('reside') || n.includes('cities') || n.includes('reloc'))) ||
                  (item.key === 'familyValues' && (n.includes('values') || n.includes('lifestyle') || n.includes('upbringing') || n.includes('family environment'))) ||
                  (item.key === 'salary' && (n.includes('salary') || n.includes('income') || n.includes('earn') || n.includes('LPA') || n.includes('professional') || n.includes('mismatch'))) ||
                  (item.key === 'dietaryPreference' && (n.includes('diet') || n.includes('food') || n.includes('kitchen') || n.includes('preferences'))) ||
                  (item.key === 'education' && (n.includes('education') || n.includes('degree') || n.includes('educational'))) ||
                  (item.key === 'horoscope' && (n.includes('horoscope') || n.includes('astrological'))) ||
                  (item.key === 'age' && (n.includes('age') || n.includes('yrs') || n.includes('years') || n.includes('older') || n.includes('younger')))
                );
                
                return (
                  <div 
                    key={item.key} 
                    className="category-row" 
                    style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '4px',
                      padding: '6px 8px',
                      margin: '0 -8px',
                      borderRadius: '6px'
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '12px' }}>
                      <span style={{ color: 'var(--text-dark)', fontSize: '12px', fontWeight: '500' }}>{item.label}</span>
                      {item.max > 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 500,
                            padding: '1px 7px',
                            borderRadius: '4px',
                            background: pct >= 80 ? 'var(--color-background-success)' : pct >= 40 ? 'var(--color-background-warning)' : 'var(--color-background-danger)',
                            color: pct >= 80 ? 'var(--color-text-success)' : pct >= 40 ? 'var(--color-text-warning)' : 'var(--color-text-danger)'
                          }}>
                            {pct}%
                          </span>
                          <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', minWidth: '48px', textAlign: 'right' }}>
                            {item.score.toFixed(1)} / {item.max.toFixed(1)}
                          </span>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic', fontSize: '11px' }}>
                          Ignored (0% Weight)
                        </span>
                      )}
                    </div>
                    {item.max > 0 && (
                      <div className="bar-track" style={{ height: '3px', backgroundColor: 'var(--bg-cream)', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
                        <div className="bar-fill" style={{ height: '3px', width: `${pct}%`, backgroundColor: pct >= 80 ? 'var(--color-text-success)' : pct >= 40 ? 'var(--color-text-warning)' : 'var(--color-text-danger)', borderRadius: '2px' }}></div>
                      </div>
                    )}
                    {relatedNarrative && (
                      <p className="tooltip-text">
                        {relatedNarrative}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="card-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {proposal ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '10px' }}>
            <span className="match-sent-stamp" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              ✓ Sent ({proposal.status})
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {proposal.status !== 'Accepted' && (
                <button
                  onClick={() => onUpdateProposalStatus(match.profile.id, 'Accepted')}
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
                  onClick={() => onUpdateProposalStatus(match.profile.id, 'Rejected')}
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
            </div>
          </div>
        ) : (
          <button
            className="action-btn btn-primary"
            style={{ marginLeft: 'auto' }}
            onClick={() => onSendMatch(match)}
          >
            Send Match
          </button>
        )}
      </div>
    </div>
  );
}
