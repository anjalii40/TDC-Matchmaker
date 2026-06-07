'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('matchmaker_logged_in');
    if (isLoggedIn === 'true') {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="dashboard-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading Matchmaker Workspace...</div>
    </div>
  );
}
