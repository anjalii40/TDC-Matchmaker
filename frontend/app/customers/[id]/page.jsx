'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import useMatches from '../../../hooks/useMatches';
import useNotes from '../../../hooks/useNotes';

// Reusable components
import ToastContainer from '../../../components/ui/ToastContainer';
import CustomerBiodata from '../../../components/customers/CustomerBiodata';
import CrmClientControls from '../../../components/customers/CrmClientControls';
import MatchmakerNotes from '../../../components/notes/MatchmakerNotes';
import ActiveProposalsPanel from '../../../components/matches/ActiveProposalsPanel';
import SuggestedMatchCard from '../../../components/matches/SuggestedMatchCard';
import EmailPreviewModal from '../../../components/matches/EmailPreviewModal';

// Utilities
import { getStageColor, getStageBgColor } from '../../../lib/utils/helpers';

export default function CustomerDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const customerId = params.id;

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const addToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Hooks state management
  const {
    customer,
    setCustomer,
    matches,
    loadingCustomer,
    loadingMatches,
    handleTogglePaused,
    handleToggleClosed,
    handleUpdateProposalStatus,
    proposeMatch,
    fetchMatches
  } = useMatches(customerId, addToast);

  const {
    noteText,
    setNoteText,
    submittingNote,
    handleAddNote
  } = useNotes(customerId, addToast);

  // Accordion open/close states
  const [openSections, setOpenSections] = useState({
    personal: true,
    career: true,
    religious: false,
    lifestyle: false,
    priorities: false,
    crmControls: true
  });

  // Toggle Accordion Panels
  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Email modal state
  const [activeMatchForEmail, setActiveMatchForEmail] = useState(null);
  const [sendingEmail, setSendingEmail] = useState(false);

  // Match breakdown accordion state
  const [expandedMatchId, setExpandedMatchId] = useState(null);
  
  const toggleMatchBreakdown = (id) => {
    setExpandedMatchId(prev => prev === id ? null : id);
  };

  // Auth check on mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('matchmaker_logged_in');
    if (isLoggedIn !== 'true') {
      router.push('/login');
    }
  }, [router]);

  const handleSendEmail = async () => {
    if (!activeMatchForEmail) return;
    setSendingEmail(true);
    const success = await proposeMatch(activeMatchForEmail);
    if (success) {
      setActiveMatchForEmail(null);
    }
    setSendingEmail(false);
  };

  const getProposalForCandidate = (candidateId) => {
    if (!customer || !customer.sentMatches) return null;
    return customer.sentMatches.find(m => m.profileId === candidateId);
  };

  if (loadingCustomer) {
    return (
      <div className="dashboard-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div className="skeleton-card" style={{ width: '400px', height: '500px', marginRight: '30px' }}></div>
        <div className="skeleton-card" style={{ width: '600px', height: '500px' }}></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="dashboard-container" style={{ textAlign: 'center', padding: '100px' }}>
        <h2>Customer not found</h2>
        <button className="auth-btn" onClick={() => router.push('/dashboard')} style={{ width: '200px', margin: '20px auto' }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} />

      {/* Header */}
      <header className="dashboard-header">
        <div className="header-brand" style={{ cursor: 'pointer' }} onClick={() => router.push('/dashboard')}>
          TDC Matchmaker<span>.</span>
        </div>
        <div className="header-actions">
          <button className="logout-btn" onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* Main Workspace Container */}
      <div className="dashboard-container">
        <div className="back-link" onClick={() => router.push('/dashboard')}>
          ← Back to Portfolio List
        </div>

        <div className="detail-layout">
          {/* Left Column: Customer Biodata Panel */}
          <aside className="detail-sidebar">
            <div className="sidebar-header">
              <div className="sidebar-avatar">
                {customer.firstName.charAt(0)}
              </div>
              <h2 className="sidebar-name">
                {customer.firstName} {customer.lastName}
              </h2>
              <p className="section-subtitle" style={{ fontSize: '13px' }}>
                {customer.gender} • {customer.age} yrs • {customer.city}
              </p>

              {/* Status Badge */}
              <div className="status-dropdown-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span className="form-label" style={{ fontSize: '10px', marginBottom: '4px', textAlign: 'center' }}>
                  Journey Stage
                </span>
                <span style={{
                  backgroundColor: getStageBgColor(customer.statusTag),
                  color: getStageColor(customer.statusTag),
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '700',
                  border: `1px solid ${getStageColor(customer.statusTag)}33`,
                  display: 'inline-block',
                  textAlign: 'center',
                  width: '100%',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  {customer.statusTag}
                </span>
              </div>
            </div>

            {/* Accordions Container */}
            <div className="sidebar-accordions">
              {/* CRM Client Controls Accordion */}
              <CrmClientControls
                customer={customer}
                openSections={openSections}
                toggleSection={toggleSection}
                onTogglePaused={handleTogglePaused}
                onToggleClosed={handleToggleClosed}
              />

              {/* Biodata Fields Accordion (Personal, Career, religion, etc) */}
              <CustomerBiodata
                customer={customer}
                partnerPriorities={customer.partnerPriorities}
                openSections={openSections}
                toggleSection={toggleSection}
              />
            </div>

            {/* Notes Persistence Component */}
            <MatchmakerNotes
              customer={customer}
              noteText={noteText}
              setNoteText={setNoteText}
              submittingNote={submittingNote}
              onAddNote={(e) => handleAddNote(e, setCustomer)}
            />
          </aside>

          {/* Right Column: AI suggested Matches */}
          <section className="matches-panel">
            <div className="panel-header-row">
              <div>
                <h2>Suggested Matches</h2>
                <p className="section-subtitle">
                  AI-ranked candidates from opposite gender matchmaking pool ({customer.gender === 'Male' ? 'Females' : 'Males'})
                </p>
              </div>
              <span className="badge badge-active" style={{ backgroundColor: 'var(--accent-gold-light)', color: 'var(--accent-gold)' }}>
                Top 5 Algorithm Matches
              </span>
            </div>

            {/* Active Proposals Panel */}
            <ActiveProposalsPanel
              sentMatches={customer.sentMatches}
              onUpdateProposalStatus={handleUpdateProposalStatus}
            />

            {/* Suggested Matches Cards stack */}
            {loadingMatches ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="skeleton-card"></div>
                <div className="skeleton-card"></div>
                <div className="skeleton-card"></div>
              </div>
            ) : !customer.matchesGenerated ? (
              <div className="match-card" style={{ textAlign: 'center', padding: '60px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent-rose)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 16px', display: 'block' }}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--primary-teal)', marginBottom: '8px' }}>No matches generated yet</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px', maxWidth: '320px', margin: '0 auto 24px' }}>Run the matching engine to see compatibility scores</p>
                <button 
                  className="action-btn btn-primary" 
                  onClick={fetchMatches}
                  style={{ padding: '12px 32px', fontSize: '14px', borderRadius: '10px', fontWeight: '600' }}
                >
                  Find Matches
                </button>
              </div>
            ) : matches.length === 0 ? (
              <div className="match-card" style={{ textAlign: 'center', padding: '40px' }}>
                <h3>No compatible matches found</h3>
                <p style={{ color: 'var(--text-muted)' }}>Adjust client parameters or refresh pool.</p>
              </div>
            ) : (
              matches.map((match) => (
                <SuggestedMatchCard
                  key={match.profile.id}
                  match={match}
                  isExpanded={expandedMatchId === match.profile.id}
                  onToggleExpand={() => toggleMatchBreakdown(match.profile.id)}
                  proposal={getProposalForCandidate(match.profile.id)}
                  onUpdateProposalStatus={handleUpdateProposalStatus}
                  onSendMatch={setActiveMatchForEmail}
                />
              ))
            )}
          </section>
        </div>
      </div>

      {/* Email Preview Modal Overlay */}
      <EmailPreviewModal
        customer={customer}
        activeMatchForEmail={activeMatchForEmail}
        onClose={() => setActiveMatchForEmail(null)}
        onSend={handleSendEmail}
        sendingEmail={sendingEmail}
      />
    </div>
  );
}
