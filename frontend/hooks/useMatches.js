import { useState, useEffect, useCallback } from 'react';

export default function useMatches(customerId, addToast) {
  const [customer, setCustomer] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loadingCustomer, setLoadingCustomer] = useState(true);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [sentMatchIds, setSentMatchIds] = useState(new Set());

  // Fetch customer metadata
  const fetchCustomer = useCallback(async () => {
    try {
      const res = await fetch(`/api/customers`);
      if (res.ok) {
        const list = await res.json();
        const current = list.find(c => c.id === customerId);
        if (current) {
          setCustomer(current);
          if (current.sentMatches) {
            setSentMatchIds(new Set(current.sentMatches.map(m => m.profileId)));
          }
        }
      }
    } catch (err) {
      console.error("Error loading customer data:", err);
    } finally {
      setLoadingCustomer(false);
    }
  }, [customerId]);

  const [matchesFetched, setMatchesFetched] = useState(false);

  // Reset matchesFetched when customer ID changes
  useEffect(() => {
    setMatchesFetched(false);
  }, [customerId]);

  // Fetch matches
  const fetchMatches = useCallback(async () => {
    setLoadingMatches(true);
    try {
      const res = await fetch(`/api/customers/${customerId}/matches`);
      if (res.ok) {
        const data = await res.json();
        setMatches(data.matches || []);
        setMatchesFetched(true);
        if (data.customer) {
          setCustomer(data.customer);
          if (data.customer.sentMatches) {
            setSentMatchIds(new Set(data.customer.sentMatches.map(m => m.profileId)));
          }
        }
      }
    } catch (err) {
      console.error("Error loading matches:", err);
    } finally {
      setLoadingMatches(false);
    }
  }, [customerId]);

  useEffect(() => {
    if (customerId) {
      fetchCustomer();
    }
  }, [customerId, fetchCustomer]);

  useEffect(() => {
    if (customer && customer.matchesGenerated && !matchesFetched) {
      fetchMatches();
    }
  }, [customer?.matchesGenerated, matchesFetched, fetchMatches]);

  // Handle toggling client paused search state
  const handleTogglePaused = async () => {
    try {
      const res = await fetch(`/api/customers/${customerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle_paused' })
      });
      if (res.ok) {
        const updated = await res.json();
        setCustomer(updated);
        if (addToast) addToast(updated.searchPaused ? "Client search paused." : "Client search resumed.");
      } else {
        if (addToast) addToast("Failed to update pause status.");
      }
    } catch (err) {
      console.error("Error toggling paused:", err);
      if (addToast) addToast("Error updating status.");
    }
  };

  // Handle toggling client closed account state
  const handleToggleClosed = async () => {
    try {
      const res = await fetch(`/api/customers/${customerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle_closed' })
      });
      if (res.ok) {
        const updated = await res.json();
        setCustomer(updated);
        if (addToast) addToast(updated.accountClosed ? "Client account closed." : "Client account reopened.");
      } else {
        if (addToast) addToast("Failed to update account status.");
      }
    } catch (err) {
      console.error("Error toggling closed:", err);
      if (addToast) addToast("Error updating status.");
    }
  };

  // Handle updating a proposal's status
  const handleUpdateProposalStatus = async (profileId, newStatus) => {
    try {
      const res = await fetch(`/api/customers/${customerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'update_proposal', 
          profileId, 
          status: newStatus 
        })
      });
      if (res.ok) {
        const updated = await res.json();
        setCustomer(updated);
        if (updated.sentMatches) {
          setSentMatchIds(new Set(updated.sentMatches.map(m => m.profileId)));
        }
        if (addToast) addToast(`Proposal status updated to ${newStatus}.`);
      } else {
        if (addToast) addToast("Failed to update proposal status.");
      }
    } catch (err) {
      console.error("Error updating proposal status:", err);
      if (addToast) addToast("Error updating status.");
    }
  };

  // Propose match (Send Email Modal action)
  const proposeMatch = async (matchToPropose) => {
    try {
      const res = await fetch(`/api/customers/${customerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'propose',
          match: {
            profileId: matchToPropose.profile.id,
            firstName: matchToPropose.profile.firstName,
            lastName: matchToPropose.profile.lastName,
            designation: matchToPropose.profile.designation,
            city: matchToPropose.profile.city,
            score: matchToPropose.score,
            intro: matchToPropose.intro
          }
        })
      });

      if (res.ok) {
        const updated = await res.json();
        setCustomer(updated);
        if (updated.sentMatches) {
          setSentMatchIds(new Set(updated.sentMatches.map(m => m.profileId)));
        }
        if (addToast) addToast(`Matrimonial match proposal sent to ${updated.firstName}!`);
        return true;
      } else {
        if (addToast) addToast("Failed to send proposal. Please try again.");
        return false;
      }
    } catch (err) {
      console.error("Error proposing match:", err);
      if (addToast) addToast("Failed to send proposal.");
      return false;
    }
  };

  return {
    customer,
    setCustomer,
    matches,
    loadingCustomer,
    loadingMatches,
    sentMatchIds,
    handleTogglePaused,
    handleToggleClosed,
    handleUpdateProposalStatus,
    proposeMatch,
    fetchMatches
  };
}
