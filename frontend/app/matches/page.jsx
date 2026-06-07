'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function MatchesPage() {
  const router = useRouter();
  return (
    <div className="dashboard-container" style={{ textAlign: 'center', padding: '100px' }}>
      <h2>Matches Manager</h2>
      <p style={{ color: 'var(--text-muted)', margin: '10px 0 30px' }}>This section is currently under development.</p>
      <button className="auth-btn" onClick={() => router.push('/dashboard')} style={{ width: '200px', margin: '0 auto' }}>
        Back to Dashboard
      </button>
    </div>
  );
}
