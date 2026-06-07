import React from 'react';

export default function EmailPreviewModal({ 
  customer, 
  activeMatchForEmail, 
  onClose, 
  onSend, 
  sendingEmail 
}) {
  if (!activeMatchForEmail || !customer) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Matchmaker Email Preview</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="modal-body">
          <div className="email-preview-card">
            <div className="email-header">
              <div className="email-header-field">
                <span className="email-header-label">From:</span>
                <span className="email-header-value">matches@thedatingclub.in</span>
              </div>
              <div className="email-header-field">
                <span className="email-header-label">To:</span>
                <span className="email-header-value">{customer.email}</span>
              </div>
              <div className="email-header-field">
                <span className="email-header-label">Subject:</span>
                <span className="email-header-value">
                  Handpicked Match for You: {activeMatchForEmail.profile.firstName}
                </span>
              </div>
            </div>

            <div className="email-body">
              <p className="email-salutation">Dear {customer.firstName},</p>
              
              <p className="email-paragraph">
                We hope you are doing well on your matchmaking journey. Our team has reviewed candidate profiles this week and hand-selected a highly compatible profile for you.
              </p>

              {/* AI Generated Introduction */}
              <p className="email-paragraph" style={{ fontWeight: '500', fontStyle: 'italic', borderLeft: '3px solid var(--accent-rose)', paddingLeft: '12px' }}>
                "{activeMatchForEmail.intro}"
              </p>

              <p className="email-paragraph">
                Here is an overview of {activeMatchForEmail.profile.firstName}'s professional and family profile details:
              </p>

              {/* Partner Detail Summary Box */}
              <div className="email-profile-box">
                <div className="email-profile-field">
                  <span className="email-profile-label">Name:</span>
                  <span className="email-profile-value">
                    {activeMatchForEmail.profile.firstName} {activeMatchForEmail.profile.lastName.charAt(0)}.
                  </span>
                </div>
                <div className="email-profile-field">
                  <span className="email-profile-label">Age & Height:</span>
                  <span className="email-profile-value">
                    {activeMatchForEmail.profile.age} yrs, {activeMatchForEmail.profile.height} cm
                  </span>
                </div>
                <div className="email-profile-field">
                  <span className="email-profile-label">Location:</span>
                  <span className="email-profile-value">
                    {activeMatchForEmail.profile.city}
                  </span>
                </div>
                <div className="email-profile-field">
                  <span className="email-profile-label">Diet:</span>
                  <span className="email-profile-value" style={{ textTransform: 'capitalize' }}>
                    {activeMatchForEmail.profile.dietaryPreference}
                  </span>
                </div>
                <div className="email-profile-field">
                  <span className="email-profile-label">Profession:</span>
                  <span className="email-profile-value">
                    {activeMatchForEmail.profile.designation}
                  </span>
                </div>
                <div className="email-profile-field">
                  <span className="email-profile-label">Company:</span>
                  <span className="email-profile-value">
                    {activeMatchForEmail.profile.currentCompany}
                  </span>
                </div>
                <div className="email-profile-field">
                  <span className="email-profile-label">Religion:</span>
                  <span className="email-profile-value">
                    {activeMatchForEmail.profile.religion}
                  </span>
                </div>
                <div className="email-profile-field">
                  <span className="email-profile-label">Mother Tongue:</span>
                  <span className="email-profile-value">
                    {activeMatchForEmail.profile.motherTongue}
                  </span>
                </div>
              </div>

              <p className="email-paragraph">
                Please let us know if you would like to initiate an introduction or coordinate a quick introductory audio/video call.
              </p>

              <div className="email-signoff">
                <p>Warm regards,</p>
                <p style={{ fontWeight: '600', color: 'var(--primary-teal)', marginTop: '4px' }}>
                  The TDC Matchmaking Team
                </p>
                <p style={{ fontSize: '11px' }}>The Dating Club India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="action-btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="action-btn btn-primary"
            onClick={onSend}
            disabled={sendingEmail}
          >
            {sendingEmail ? "Sending..." : "Send Profile Email"}
          </button>
        </div>
      </div>
    </div>
  );
}
