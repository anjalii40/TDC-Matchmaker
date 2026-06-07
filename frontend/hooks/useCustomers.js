import { useState, useEffect, useMemo } from 'react';
import { getApiUrl } from '../lib/utils/helpers';

export default function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Consolidate filter state to prevent cascading updates
  const [filters, setFilters] = useState({
    search: '',
    gender: 'all',
    religion: 'all',
    status: 'all'
  });
  
  const [viewMode, setViewMode] = useState('list'); // 'list', 'grid' or 'kanban'
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch(getApiUrl('/api/customers'));
        if (res.ok) {
          const data = await res.json();
          setCustomers(data);
        }
      } catch (err) {
        console.error("Error loading customers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Sync viewMode with localStorage after client mount to prevent hydration flicker
  useEffect(() => {
    const savedMode = localStorage.getItem('matchmaker_view_mode');
    if (savedMode === 'grid' || savedMode === 'kanban' || savedMode === 'list') {
      setViewMode(savedMode);
    }
    setMounted(true);
  }, []);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    localStorage.setItem('matchmaker_view_mode', mode);
  };

  // KPI Calculations memoized to prevent jumping values during filtering
  const kpis = useMemo(() => ({
    total: customers.length,
    new: customers.filter(c => c.statusTag === 'New').length,
    active: customers.filter(c => c.statusTag === 'Active').length,
    matched: customers.filter(c => c.statusTag === 'Matched').length,
    closed: customers.filter(c => c.statusTag === 'Closed').length
  }), [customers]);

  // Extract unique religions dynamically
  const uniqueReligions = useMemo(() => {
    return [...new Set(customers.map(c => c.religion))].filter(Boolean).sort();
  }, [customers]);

  // Filtered list computed from consolidated filters state
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const matchesSearch = `${customer.firstName} ${customer.lastName}`
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      
      const matchesGender = filters.gender === 'all' || filters.gender === '' || customer.gender === filters.gender;
      const matchesStatus = filters.status === 'all' || filters.status === '' || customer.statusTag === filters.status;
      const matchesReligion = filters.religion === 'all' || filters.religion === '' || customer.religion === filters.religion;

      return matchesSearch && matchesGender && matchesStatus && matchesReligion;
    });
  }, [customers, filters]);

  return {
    customers,
    filteredCustomers,
    loading,
    filters,
    setFilters,
    uniqueReligions,
    viewMode,
    handleViewModeChange,
    kpis,
    mounted
  };
}
