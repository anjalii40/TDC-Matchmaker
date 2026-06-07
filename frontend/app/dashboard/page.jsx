'use client';

import { useRouter } from 'next/navigation';
import useCustomers from '../../hooks/useCustomers';
import CustomerCard from '../../components/customers/CustomerCard';
import CustomerKanbanColumn from '../../components/customers/CustomerKanbanColumn';
import { getStageColor, getStageBgColor, getProfileCompleteness, getInitials } from '../../lib/utils/helpers';

export default function DashboardPage() {
  const router = useRouter();
  const {
    filteredCustomers,
    loading,
    filters,
    setFilters,
    uniqueReligions,
    viewMode,
    handleViewModeChange,
    kpis,
    mounted
  } = useCustomers();

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'New': return 'badge badge-new';
      case 'Active': return 'badge badge-active';
      case 'Matched': return 'badge badge-matched';
      case 'Closed': return 'badge badge-closed';
      default: return 'badge';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('matchmaker_logged_in');
    router.push('/login');
  };

  const handleCardClick = (id) => {
    // Re-routing to /customers/[id] as part of the clean folder structure refactor
    router.push(`/customers/${id}`);
  };

  if (loading) {
    return (
      <div className="dashboard-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div className="skeleton-card" style={{ width: '100%', maxWidth: '800px', height: '400px' }}></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-brand">
          TDC Matchmaker<span>.</span>
        </div>
        <div className="header-actions">
          <div className="matchmaker-badge">
            <div className="avatar">M</div>
            <span>Matchmaker Staff</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="dashboard-container">
        {/* KPI Grid */}
        <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          <div className="kpi-card">
            <span className="kpi-title">Total Portfolio</span>
            <span className="kpi-value">{kpis.total}</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-title">New Inflow</span>
            <span className="kpi-value">{kpis.new}</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-title">Active Search</span>
            <span className="kpi-value">{kpis.active}</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-title">Matched Clients</span>
            <span className="kpi-value">{kpis.matched}</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-title">Closed Profiles</span>
            <span className="kpi-value">{kpis.closed}</span>
          </div>
        </div>

        {/* Filter Bar with List / Kanban Toggle */}
        <div className="filter-bar">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search customers by name..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>

          <div className="filter-group">
            <select
              className="filter-select"
              value={filters.gender}
              onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <select
              className="filter-select"
              value={filters.religion}
              onChange={(e) => setFilters(prev => ({ ...prev, religion: e.target.value }))}
            >
              <option value="">Religion</option>
              {uniqueReligions.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <select
              className="filter-select"
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="">Stages</option>
              <option value="New">New</option>
              <option value="Active">Active</option>
              <option value="Matched">Matched</option>
              <option value="Closed">Closed</option>
            </select>

            {/* View Mode Toggle Switch */}
            {mounted ? (
              <div style={{ display: 'flex', border: '1px solid var(--border-light)', borderRadius: '10px', overflow: 'hidden', background: 'var(--bg-white)' }}>
                // Table view is currently disabled as part of the MVP scope, but can be easily re-enabled by uncommenting the button below and ensuring the corresponding CSS styles are in place
                {/* <button
                  onClick={() => handleViewModeChange('list')}
                  style={{
                    padding: '10px 16px',
                    border: 'none',
                    background: viewMode === 'list' ? 'var(--primary-teal)' : 'transparent',
                    color: viewMode === 'list' ? 'var(--bg-cream)' : 'var(--text-muted)',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  Table View
                </button> */}
                <button
                  onClick={() => handleViewModeChange('grid')}
                  style={{
                    padding: '10px 16px',
                    border: 'none',
                    background: viewMode === 'grid' ? 'var(--primary-teal)' : 'transparent',
                    color: viewMode === 'grid' ? 'var(--bg-cream)' : 'var(--text-muted)',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  Card Grid
                </button>
                <button
                  onClick={() => handleViewModeChange('kanban')}
                  style={{
                    padding: '10px 16px',
                    border: 'none',
                    background: viewMode === 'kanban' ? 'var(--primary-teal)' : 'transparent',
                    color: viewMode === 'kanban' ? 'var(--bg-cream)' : 'var(--text-muted)',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  Kanban View
                </button>
              </div>
            ) : (
              <div style={{ width: '280px', height: '38px', backgroundColor: 'var(--bg-cream)', border: '1px solid var(--border-light)', borderRadius: '10px' }} />
            )}
          </div>
        </div>

        {/* View Switch Rendering */}
        {!mounted ? (
          <div className="table-card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
            <div className="skeleton-card" style={{ width: '100%', height: '100%' }}></div>
          </div>
        ) : viewMode === 'list' ? (
          /* TABLE LIST VIEW */
          <div className="table-card">
            <div className="table-wrapper">
              <table className="customer-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>City</th>
                    <th>Marital Status</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                        No clients found matching the selected search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((customer) => {
                      const completeness = getProfileCompleteness(customer);
                      const barColor = completeness > 80 ? 'var(--status-matched)' : completeness >= 50 ? 'var(--status-hold)' : '#E02424';
                      return (
                        <tr key={customer.id} onClick={() => handleCardClick(customer.id)}>
                          <td>
                            <div className="name-cell">
                              <div className="avatar-initials">
                                {getInitials(customer.firstName, customer.lastName)}
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span className="client-name">{customer.firstName} {customer.lastName}</span>
                                <div style={{ width: '100px', height: '4px', backgroundColor: 'var(--border-light)', borderRadius: '2px', overflow: 'hidden' }}>
                                  <div style={{ width: `${completeness}%`, height: '100%', backgroundColor: barColor }} />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>{customer.gender}</td>
                          <td>{customer.age}</td>
                          <td>{customer.city}</td>
                          <td>{customer.maritalStatus}</td>
                          <td>
                            <span className={getStatusBadgeClass(customer.statusTag)}>
                              {customer.statusTag}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          /* CARD GRID VIEW */
          <div className="card-grid">
            {filteredCustomers.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', background: 'var(--bg-white)', border: '1px solid var(--border-light)', borderRadius: '16px', color: 'var(--text-muted)' }}>
                No clients found matching the selected search criteria.
              </div>
            ) : (
              filteredCustomers.map((customer) => (
                <CustomerCard
                  key={customer.id}
                  customer={customer}
                  onClick={() => handleCardClick(customer.id)}
                />
              ))
            )}
          </div>
        ) : (
          /* KANBAN BOARD VIEW */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', alignItems: 'start' }}>
            {['New', 'Active', 'Matched', 'Closed'].map(stage => {
              const stageCustomers = filteredCustomers.filter(c => c.statusTag === stage);
              return (
                <CustomerKanbanColumn
                  key={stage}
                  stage={stage}
                  stageCustomers={stageCustomers}
                  onClickCard={handleCardClick}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
