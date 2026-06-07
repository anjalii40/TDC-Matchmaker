import React from 'react';
import { formatSalary } from '../../lib/utils/helpers';

export default function CustomerBiodata({ customer, partnerPriorities, openSections, toggleSection }) {
  return (
    <div className="sidebar-accordions">
      {/* SECTION 1: PERSONAL DETAILS */}
      <div className="section-accordion">
        <button className="accordion-trigger" onClick={() => toggleSection('personal')}>
          <span className="accordion-title">Personal Details</span>
          <span className="accordion-icon">{openSections.personal ? '▲' : '▼'}</span>
        </button>
        {openSections.personal && (
          <div className="accordion-content">
            <div className="bio-field">
              <span className="bio-label">Full Name</span>
              <span className="bio-value">{customer.firstName} {customer.lastName}</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Date of Birth</span>
              <span className="bio-value">{customer.dob}</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Height</span>
              <span className="bio-value">{customer.height} cm</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Marital Status</span>
              <span className="bio-value">{customer.maritalStatus}</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Email Address</span>
              <span className="bio-value" style={{ fontSize: '12px' }}>{customer.email}</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Contact Number</span>
              <span className="bio-value">{customer.phone}</span>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: EDUCATION & CAREER */}
      <div className="section-accordion">
        <button className="accordion-trigger" onClick={() => toggleSection('career')}>
          <span className="accordion-title">Education & Career</span>
          <span className="accordion-icon">{openSections.career ? '▲' : '▼'}</span>
        </button>
        {openSections.career && (
          <div className="accordion-content">
            <div className="bio-field">
              <span className="bio-label">Designation</span>
              <span className="bio-value">{customer.designation}</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Current Company</span>
              <span className="bio-value">{customer.currentCompany}</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Annual Income</span>
              <span className="bio-value" style={{ fontSize: '13px' }}>{formatSalary(customer.income)}</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Degree</span>
              <span className="bio-value">{customer.degree}</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">College</span>
              <span className="bio-value">{customer.undergraduateCollege}</span>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: RELIGIOUS & ASTROLOGICAL */}
      <div className="section-accordion">
        <button className="accordion-trigger" onClick={() => toggleSection('religious')}>
          <span className="accordion-title">Astrological & Religion</span>
          <span className="accordion-icon">{openSections.religious ? '▲' : '▼'}</span>
        </button>
        {openSections.religious && (
          <div className="accordion-content">
            <div className="bio-field">
              <span className="bio-label">Religion</span>
              <span className="bio-value">{customer.religion}</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Caste</span>
              <span className="bio-value">{customer.caste}</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Gotra</span>
              <span className="bio-value">{customer.gotra}</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Mother Tongue</span>
              <span className="bio-value">{customer.motherTongue}</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Manglik Status</span>
              <span className="bio-value">{customer.manglikStatus}</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Horoscope Match Pref.</span>
              <span className="bio-value">{customer.horoscopeMatchPreference}</span>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 4: LIFESTYLE & PREFERENCES */}
      <div className="section-accordion">
        <button className="accordion-trigger" onClick={() => toggleSection('lifestyle')}>
          <span className="accordion-title">Lifestyle & Family</span>
          <span className="accordion-icon">{openSections.lifestyle ? '▲' : '▼'}</span>
        </button>
        {openSections.lifestyle && (
          <div className="accordion-content">
            <div className="bio-field">
              <span className="bio-label">Dietary Preference</span>
              <span className="bio-value" style={{ textTransform: 'capitalize' }}>{customer.dietaryPreference}</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Family Type</span>
              <span className="bio-value" style={{ textTransform: 'capitalize' }}>{customer.familyType}</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Family Values</span>
              <span className="bio-value" style={{ textTransform: 'capitalize' }}>{customer.familyValues}</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Complexion</span>
              <span className="bio-value">{customer.complexion || 'Wheatish'}</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Languages Known</span>
              <span className="bio-value" style={{ fontSize: '12px' }}>
                {Array.isArray(customer.languagesKnown) ? customer.languagesKnown.join(', ') : customer.languagesKnown}
              </span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Siblings</span>
              <span className="bio-value">{customer.siblings}</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Want Children?</span>
              <span className="bio-value">{customer.wantKids}</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Open to Relocate?</span>
              <span className="bio-value">{customer.openToRelocate}</span>
            </div>
            <div className="bio-field">
              <span className="bio-label">Open to Pets?</span>
              <span className="bio-value">{customer.openToPets}</span>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 5: PARTNER PRIORITIES TAB */}
      <div className="section-accordion">
        <button className="accordion-trigger" onClick={() => toggleSection('priorities')}>
          <span className="accordion-title" style={{ color: 'var(--accent-rose)', fontWeight: '700' }}>
            Partner Priorities
          </span>
          <span className="accordion-icon">{openSections.priorities ? '▲' : '▼'}</span>
        </button>
        {openSections.priorities && (
          <div className="accordion-content" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Warning notice */}
            <div style={{ 
              backgroundColor: 'var(--bg-cream)',
              borderLeft: '4px solid var(--accent-gold)',
              padding: '10px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              lineHeight: '1.4',
              color: 'var(--text-dark)',
              fontStyle: 'italic'
            }}>
              ⚠️ <strong>Read-Only Notice:</strong> Partner priorities are defined directly by the client in their profile settings and cannot be altered by matchmaker staff.
            </div>

            {/* Section A: Ranked priorities */}
            <div>
              <span className="form-label" style={{ fontSize: '10px', marginBottom: '8px' }}>
                Client Ranked Priorities
              </span>
              {(!partnerPriorities || !partnerPriorities.ranked || partnerPriorities.ranked.length === 0) ? (
                <div style={{ padding: '16px', border: '1px dashed var(--border-light)', borderRadius: '8px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
                  No ranked criteria. Defaulting all to 0.6× weight.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {partnerPriorities.ranked.map((item, index) => (
                    <div
                      key={item.key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'var(--bg-cream)',
                        border: '1px solid var(--border-light)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        userSelect: 'none',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      {/* Rank number */}
                      <span style={{ color: 'var(--text-muted)', fontSize: '12px', marginRight: '8px', width: '20px', fontWeight: 'bold' }}>
                        #{index + 1}
                      </span>

                      {/* Priority label */}
                      <span style={{ fontSize: '13px', color: 'var(--primary-teal)', fontWeight: '600', flex: 1 }}>
                        {item.label}
                      </span>

                      {/* Weight Badge */}
                      <span 
                        style={{ 
                          backgroundColor: '#C59B27', 
                          color: 'var(--bg-white)', 
                          fontSize: '11px', 
                          fontWeight: '700', 
                          padding: '2px 6px', 
                          borderRadius: '6px'
                        }}
                      >
                        {item.weight}×
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notes block */}
            <div style={{ marginTop: '4px' }}>
              <span className="form-label" style={{ fontSize: '10px', marginBottom: '4px' }}>
                Client Preference Notes
              </span>
              <blockquote style={{ 
                margin: 0,
                padding: '8px 12px',
                backgroundColor: 'var(--bg-cream)',
                borderLeft: '3px solid var(--primary-teal)',
                fontSize: '12px',
                color: (partnerPriorities && partnerPriorities.notes) ? 'var(--text-dark)' : 'var(--text-muted)',
                borderRadius: '0 8px 8px 0',
                lineHeight: '1.4',
                fontStyle: (partnerPriorities && partnerPriorities.notes) ? 'normal' : 'italic'
              }}>
                {(partnerPriorities && partnerPriorities.notes) ? `"${partnerPriorities.notes}"` : "No additional priority notes provided by the client."}
              </blockquote>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
