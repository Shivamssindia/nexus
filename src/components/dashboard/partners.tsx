//@ts-nocheck
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CommonSidebar from './components/CommonSidebar';
import { useAuth } from '@/contexts/AuthContext';

// ============================================
// TYPES
// ============================================

interface UserProfile {
  userId: number;
  uid: string;
  name: string;
  email: string;
  photoUrl: string | null;
  emailVerified: boolean;
  isProfileCompleted: boolean;
  phoneNumber?: string;
  address?: string;
  gender?: string;
  dob?: string;
}

interface Partner {
  partnerId: number;
  userId: number;
  partnerCode: string;
  partnerName: string;
  partnerEmail: string;
  partnerPhotoUrl?: string | null;
  companyName: string;
  companyEmail: string;
  companyMobileNumber?: string;
  companyWebsite?: string;
  companyAddress?: string;
  contactPersonName?: string;
  contactPersonDesignation?: string;
  servicesOffered: string[];
  agreementType: string;
  agreementValue: number;
  agreementPdfDriveLink: string;
  agreementStartDate?: string;
  agreementEndDate?: string;
  partnerStatus: string;
  isApproved: boolean;
  directorNote?: string | null;
  totalClients: number;
  activeClients: number;
  createdAt: string;
  updatedAt: string;
}

interface PartnerDashboard {
  partnerId: number;
  partnerCode: string;
  companyName: string;
  partnerStatus: string;
  totalClients: number;
  approvedClients: number;
  pendingClients: number;
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalPaymentsCount: number;
  totalApprovedRevenue: number;
  totalPendingRevenue: number;
  recentClients: Client[];
}

interface Client {
  mappingId: number;
  clientId: number;
  userId: number;
  name: string;
  email: string;
  phoneNumber?: string;
  companyName: string;
  companyEmail?: string;
  clientStatus: string;
  isApproved: boolean;
  assignedAt: string;
  mappingStatus: string;
  notes?: string | null;
}

interface Project {
  projectId: number;
  projectName: string;
  projectDescription?: string;
  projectType?: string;
  status: string;
  cost?: string;
  deadline?: string;
  departmentId?: number;
  departmentName?: string;
  createdAt: string;
  updatedAt: string;
}

interface Payment {
  paymentId: number;
  transactionId: string;
  dateTime: string;
  type: string;
  amount: string;
  status: string;
  user?: { userId: number; name: string; email: string };
  paymentNote?: string;
  approvedBy?: { userId: number; name: string };
  approvedAt?: string;
  directorNote?: string;
}

// ============================================
// API CONFIGURATION
// ============================================

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const apiCall = async <T,>(
  method: string,
  endpoint: string,
  data?: any
): Promise<T> => {
  try {
    const config: any = {
      method,
      url: `${API_BASE}${endpoint}`,
      withCredentials: true,
    };
    if (data) {
      config.data = data;
      config.headers = { 'Content-Type': 'application/json' };
    }
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

// ============================================
// PARTNER APIs
// ============================================

const registerAsPartner = async (payload: any) => {
  return apiCall('POST', '/api/partner/register', payload);
};

const getMyPartnerProfile = async () => {
  return apiCall<{ success: boolean; data: Partner }>('GET', '/api/partner/me');
};

const getMyPartnerDashboard = async () => {
  return apiCall<{ success: boolean; data: PartnerDashboard }>('GET', '/api/partner/me/dashboard');
};

const getMyPartnerClients = async () => {
  return apiCall<{ success: boolean; data: Client[] }>('GET', '/api/partner/clients');
};

const getOneClient = async (clientId: number) => {
  return apiCall<{ success: boolean; data: Client }>('GET', `/api/partner/clients/${clientId}`);
};

const createClient = async (payload: any) => {
  return apiCall('POST', '/api/partner/clients', payload);
};

const getClientProjects = async (clientId: number) => {
  return apiCall<{ success: boolean; data: Project[] }>(
    'GET',
    `/api/partner/clients/${clientId}/projects`
  );
};

const createProjectForClient = async (clientId: number, payload: any) => {
  return apiCall('POST', `/api/partner/clients/${clientId}/projects`, payload);
};

const getClientPayments = async (clientId: number) => {
  return apiCall<{ success: boolean; data: Payment[] }>(
    'GET',
    `/api/partner/clients/${clientId}/payments`
  );
};

// ============================================
// HEAD DIRECTOR APIs
// ============================================

const getAllPartners = async () => {
  return apiCall<{ success: boolean; data: Partner[] }>('GET', '/api/partner/all');
};

const getOnePartner = async (partnerId: number) => {
  return apiCall<{ success: boolean; data: Partner }>('GET', `/api/partner/${partnerId}`);
};

const updatePartnerStatus = async (partnerId: number, status: string, note?: string) => {
  let url = `/api/partner/${partnerId}/status?status=${status}`;
  if (note) url += `&note=${encodeURIComponent(note)}`;
  return apiCall('PUT', url, null);
};

// ============================================
// USER PROFILE API
// ============================================

const getUserProfile = async () => {
  return apiCall<{ success: boolean; data: UserProfile }>('GET', '/api/users/profile');
};

// ============================================
// SIDEBAR MENU
// ============================================

const partnerMenuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'my-clients', label: 'My Clients', icon: '👥' },
  { id: 'my-details', label: 'My Details', icon: '📝' },
  { id: 'profile', label: 'Profile', icon: '👤' },
];

const directorMenuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'all-partners', label: 'All Partners', icon: '🤝' },
  { id: 'profile', label: 'Profile', icon: '👤' },
];

// ============================================
// STATUS CONFIGURATION
// ============================================

const statusConfig: Record<string, { label: string; class: string; icon: string; color: string }> = {
  PENDING: { label: 'Pending', class: 'status-pending', icon: '⏳', color: '#F59E0B' },
  APPROVED: { label: 'Approved', class: 'status-approved', icon: '✅', color: '#10B981' },
  BLOCKED: { label: 'Blocked', class: 'status-rejected', icon: '🔴', color: '#EF4444' },
  DEACTIVATED: { label: 'Deactivated', class: 'status-rejected', icon: '⚪', color: '#6B7280' },
  ACTIVE: { label: 'Active', class: 'status-approved', icon: '🟢', color: '#10B981' },
  IN_PROGRESS: { label: 'In Progress', class: 'status-progress', icon: '🔄', color: '#3B82F6' },
  COMPLETED: { label: 'Completed', class: 'status-completed', icon: '✔️', color: '#10B981' },
};

const getStatusBadge = (status: string) => {
  const config = statusConfig[status] || { label: status || 'N/A', class: 'status-pending', icon: '📌', color: '#6B7280' };
  return <span className={`status-badge ${config.class}`}>{config.icon} {config.label}</span>;
};

const formatDate = (dateString: string) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleString();
};

const formatMoney = (n: number | string) => {
  return '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });
};

// ============================================
// SERVICES / AGREEMENT OPTIONS
// ============================================

const SERVICES = [
  'CLIENT_RELATIONSHIP',
  'SELLING',
  'SECURITY',
  'MARKETING',
  'SUPPORT',
  'DEVELOPMENT',
  'OTHER',
];

const AGREEMENT_TYPES = ['PERCENTAGE', 'MONTHLY', 'FIXED'];

// ============================================
// MAIN PARTNER COMPONENT
// ============================================

const Partner: React.FC = () => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  // Partner state
  const [profile, setProfile] = useState<Partner | null>(null);
  const [dashboard, setDashboard] = useState<PartnerDashboard | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [noProfile, setNoProfile] = useState(false);

  // Director state
  const [allPartners, setAllPartners] = useState<Partner[]>([]);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isDirector, setIsDirector] = useState(false);

  // Client detail
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientProjects, setClientProjects] = useState<Project[]>([]);
  const [clientPayments, setClientPayments] = useState<Payment[]>([]);

  // Modal states
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCreateClientModal, setShowCreateClientModal] = useState(false);
  const [showClientDetailModal, setShowClientDetailModal] = useState(false);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showPartnerDetailModal, setShowPartnerDetailModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);

  // Form states
  const [registerForm, setRegisterForm] = useState({
    companyName: '',
    companyEmail: '',
    companyMobileNumber: '',
    companyWebsite: '',
    companyAddress: '',
    contactPersonName: '',
    contactPersonDesignation: '',
    servicesOffered: [] as string[],
    agreementType: 'PERCENTAGE',
    agreementValue: '',
    agreementPdfDriveLink: '',
    agreementStartDate: '',
    agreementEndDate: '',
    internalNotes: '',
  });

  const [clientForm, setClientForm] = useState({
    email: '',
    name: '',
    phoneNumber: '',
    gender: '',
    dob: '',
    photoUrl: '',
    address: '',
    companyName: '',
    companyMobileNumber: '',
    companyEmail: '',
    orgType: '',
    clientType: '',
    clientWebsite: '',
    notes: '',
  });

  const [projectForm, setProjectForm] = useState({
    projectName: '',
    projectDescription: '',
    projectType: 'WEB',
    departmentId: '',
    cost: '',
    deadline: '',
  });

  const { logout } = useAuth();

  const showToast = (type: 'ok' | 'err', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  // ---------- LOAD INITIAL ----------
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [profileRes, detailsRes] = await Promise.all([
        getUserProfile().catch(() => ({ data: null })),
        getMyPartnerProfile().catch(() => ({ data: null })),
      ]);
      setUser(profileRes.data);

      if (detailsRes.data) {
        // Partner exists — load partner data
        setProfile(detailsRes.data);
        setNoProfile(false);
        await loadPartnerData();
      } else {
        setNoProfile(true);
      }

      // Try director list — silently fail if not director
      try {
        const allRes = await getAllPartners();
        setAllPartners(allRes.data || []);
        setIsDirector(true);
      } catch {
        setIsDirector(false);
      }
    } catch (err) {
      console.error('Error loading initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadPartnerData = async () => {
    try {
      const [dashRes, clientsRes] = await Promise.all([
        getMyPartnerDashboard().catch(() => ({ data: null })),
        getMyPartnerClients().catch(() => ({ data: [] })),
      ]);
      setDashboard(dashRes.data || null);
      setClients(clientsRes.data || []);
    } catch (err) {
      console.error('Error loading partner data:', err);
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // ---------- PARTNER ACTIONS ----------

  const handleRegisterPartner = async () => {
    setBusy(true);
    try {
      const payload: any = {
        companyName: registerForm.companyName.trim(),
        agreementType: registerForm.agreementType,
        agreementPdfDriveLink: registerForm.agreementPdfDriveLink.trim(),
      };
      if (registerForm.companyEmail.trim()) payload.companyEmail = registerForm.companyEmail.trim();
      if (registerForm.companyMobileNumber.trim())
        payload.companyMobileNumber = registerForm.companyMobileNumber.trim();
      if (registerForm.companyWebsite.trim()) payload.companyWebsite = registerForm.companyWebsite.trim();
      if (registerForm.companyAddress.trim()) payload.companyAddress = registerForm.companyAddress.trim();
      if (registerForm.contactPersonName.trim())
        payload.contactPersonName = registerForm.contactPersonName.trim();
      if (registerForm.contactPersonDesignation.trim())
        payload.contactPersonDesignation = registerForm.contactPersonDesignation.trim();
      if (registerForm.servicesOffered.length) payload.servicesOffered = registerForm.servicesOffered;
      if (registerForm.agreementValue) payload.agreementValue = Number(registerForm.agreementValue);
      if (registerForm.agreementStartDate) payload.agreementStartDate = registerForm.agreementStartDate;
      if (registerForm.agreementEndDate) payload.agreementEndDate = registerForm.agreementEndDate;
      if (registerForm.internalNotes.trim()) payload.internalNotes = registerForm.internalNotes.trim();

      await registerAsPartner(payload);
      showToast('ok', 'Partner registration submitted. Pending Head Director approval.');
      setShowRegisterModal(false);
      await loadInitialData();
    } catch (err: any) {
      showToast('err', err?.message || 'Registration failed');
    } finally {
      setBusy(false);
    }
  };

  const handleCreateClient = async () => {
    setBusy(true);
    try {
      const payload: any = {
        email: clientForm.email.trim(),
        name: clientForm.name.trim(),
        companyName: clientForm.companyName.trim(),
      };
      Object.entries(clientForm).forEach(([k, v]) => {
        if (!['email', 'name', 'companyName'].includes(k) && v.trim()) payload[k] = v.trim();
      });

      await createClient(payload);
      showToast('ok', 'Client created successfully');
      setShowCreateClientModal(false);
      setClientForm({
        email: '', name: '', phoneNumber: '', gender: '', dob: '', photoUrl: '',
        address: '', companyName: '', companyMobileNumber: '', companyEmail: '',
        orgType: '', clientType: '', clientWebsite: '', notes: '',
      });
      await loadPartnerData();
    } catch (err: any) {
      showToast('err', err?.message || 'Failed to create client');
    } finally {
      setBusy(false);
    }
  };

  const handleViewClient = async (client: Client) => {
    setSelectedClient(client);
    setClientProjects([]);
    setClientPayments([]);
    setShowClientDetailModal(true);
    try {
      const [projRes, payRes] = await Promise.all([
        getClientProjects(client.clientId).catch(() => ({ data: [] })),
        getClientPayments(client.clientId).catch(() => ({ data: [] })),
      ]);
      setClientProjects(projRes.data || []);
      setClientPayments(payRes.data || []);
    } catch (err) {
      showToast('err', 'Failed to load client details');
    }
  };

  const handleCreateProject = async () => {
    if (!selectedClient) return;
    setBusy(true);
    try {
      const payload: any = { projectName: projectForm.projectName.trim() };
      if (projectForm.projectDescription.trim())
        payload.projectDescription = projectForm.projectDescription.trim();
      if (projectForm.projectType) payload.projectType = projectForm.projectType;
      if (projectForm.departmentId) payload.departmentId = Number(projectForm.departmentId);
      if (projectForm.cost) payload.cost = projectForm.cost;
      if (projectForm.deadline)
        payload.deadline = projectForm.deadline.length === 16 ? projectForm.deadline + ':00' : projectForm.deadline;

      await createProjectForClient(selectedClient.clientId, payload);
      showToast('ok', 'Project created for client');
      setShowCreateProjectModal(false);
      setProjectForm({
        projectName: '', projectDescription: '', projectType: 'WEB',
        departmentId: '', cost: '', deadline: '',
      });
      // reload projects
      const projRes = await getClientProjects(selectedClient.clientId);
      setClientProjects(projRes.data || []);
    } catch (err: any) {
      showToast('err', err?.message || 'Failed to create project');
    } finally {
      setBusy(false);
    }
  };

  // ---------- DIRECTOR ACTIONS ----------

  const handleUpdateStatus = async (partnerId: number, status: string) => {
    setBusy(true);
    try {
      await updatePartnerStatus(partnerId, status, `Set to ${status} by Head Director`);
      showToast('ok', 'Partner status updated');
      // update local state
      setAllPartners((prev) =>
        prev.map((p) =>
          p.partnerId === partnerId
            ? { ...p, partnerStatus: status, isApproved: status === 'APPROVED' }
            : p
        )
      );
      if (selectedPartner?.partnerId === partnerId) {
        setSelectedPartner((sp) =>
          sp ? { ...sp, partnerStatus: status, isApproved: status === 'APPROVED' } : sp
        );
      }
    } catch (err: any) {
      showToast('err', err?.message || 'Failed to update status');
    } finally {
      setBusy(false);
    }
  };

  const handleViewPartner = async (partner: Partner) => {
    setSelectedPartner(partner);
    setShowPartnerDetailModal(true);
  };

  const canCreate = profile?.partnerStatus === 'APPROVED';
  const menuItems = isDirector ? directorMenuItems : partnerMenuItems;

  // ============================================
  // RENDER
  // ============================================
  if (loading) {
    return (
      <div className="client-loader">
        <div className="loader-spinner"></div>
      </div>
    );
  }

  return (
    <div className="client-container">
      <CommonSidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onLogout={handleLogout}
        onThemeToggle={toggleDarkMode}
        darkMode={darkMode}
        user={user ? { name: user.name, email: user.email, photoUrl: user.photoUrl } : null}
        menuItems={menuItems}
        title="Partner Portal"
        logoIcon="🤝"
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <button className="mobile-menu-btn" onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>
        ☰
      </button>

      <main className="client-main">
        {/* HEADER */}
        <header className="client-header">
          <div className="header-welcome">
            <h1>Welcome back, {user?.name?.split(' ')[0] || 'Partner'}!</h1>
            <p>Partner Dashboard - Client & Project Management</p>
          </div>
          <div className="header-stats">
            <div className="header-stat-item">
              <span className="stat-label">Status</span>
              <span className="stat-value-sm">
                {profile ? getStatusBadge(profile.partnerStatus) : <span className="status-badge status-pending">⏳ Not Registered</span>}
              </span>
            </div>
            {dashboard && (
              <>
                <div className="header-stat-item">
                  <span className="stat-label">Clients</span>
                  <span className="stat-value-sm">{dashboard.totalClients} total</span>
                </div>
                <div className="header-stat-item">
                  <span className="stat-label">Projects</span>
                  <span className="stat-value-sm">{dashboard.activeProjects} active</span>
                </div>
              </>
            )}
          </div>
        </header>

        {/* ====== NO PROFILE → SHOW REGISTER CTA ====== */}
        {noProfile && activeNav === 'dashboard' && (
          <div className="dashboard-card">
            <div className="card-header">
              <h2>Become a Partner</h2>
              <p className="card-subtitle">Register as a partner to manage clients, projects & payments</p>
            </div>
            <div style={{ padding: '2rem 0', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>🤝</div>
              <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
                You haven't registered as a partner yet. Submit your application to get started.
              </p>
              <button className="btn-msub" style={{ maxWidth: 320, margin: '0 auto' }} onClick={() => setShowRegisterModal(true)}>
                Register as Partner
              </button>
            </div>
          </div>
        )}

        {/* ====== DASHBOARD TAB (Partner) ====== */}
        {activeNav === 'dashboard' && profile && dashboard && (
          <>
            {/* Stats */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon purple">👥</div>
                <div className="stat-info">
                  <span className="stat-value">{dashboard.totalClients}</span>
                  <span className="stat-label">Total Clients</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon orange">⏳</div>
                <div className="stat-info">
                  <span className="stat-value">{dashboard.pendingClients}</span>
                  <span className="stat-label">Pending Clients</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon green">🚀</div>
                <div className="stat-info">
                  <span className="stat-value">{dashboard.activeProjects}</span>
                  <span className="stat-label">Active Projects</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon blue">💰</div>
                <div className="stat-info">
                  <span className="stat-value" style={{ fontSize: '1.4rem' }}>{formatMoney(dashboard.totalApprovedRevenue)}</span>
                  <span className="stat-label">Approved Revenue</span>
                </div>
              </div>
            </div>

            {/* Partner info card */}
            <div className="dashboard-card">
              <div className="card-header">
                <h2>Partner Profile</h2>
                {getStatusBadge(profile.partnerStatus)}
              </div>
              <div className="details-grid">
                <div className="detail-item"><label>Company</label><span>{profile.companyName}</span></div>
                <div className="detail-item"><label>Partner Code</label><span style={{ color: 'var(--teal)', fontWeight: 600 }}>{profile.partnerCode}</span></div>
                <div className="detail-item"><label>Contact</label><span>{profile.partnerName}</span></div>
                <div className="detail-item"><label>Email</label><span>{profile.partnerEmail}</span></div>
                <div className="detail-item"><label>Agreement</label><span>{profile.agreementType} · {profile.agreementValue}</span></div>
                <div className="detail-item"><label>Validity</label><span>{formatDate(profile.agreementStartDate)} → {formatDate(profile.agreementEndDate)}</span></div>
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                  <label>Services</label>
                  <div className="skills-tags">
                    {profile.servicesOffered?.map((s) => (
                      <span key={s} className="skill-tag">{s.replace('_', ' ')}</span>
                    ))}
                  </div>
                </div>
              </div>
              {profile.directorNote && (
                <div className="warning-banner" style={{ marginTop: '1rem' }}>
                  <strong>Director Note:</strong> {profile.directorNote}
                </div>
              )}
            </div>

            {/* Recent clients */}
            <div className="dashboard-card">
              <div className="card-header">
                <h2>Recent Clients</h2>
                <button className="view-all-link" onClick={() => setActiveNav('my-clients')}>View All →</button>
              </div>
              <div className="projects-grid">
                {dashboard.recentClients?.slice(0, 3).map((c) => (
                  <div key={c.mappingId} className="project-card">
                    <div className="project-card-header">
                      <h3>{c.name}</h3>
                      {getStatusBadge(c.isApproved ? 'APPROVED' : 'PENDING')}
                    </div>
                    <p className="project-card-desc">{c.companyName}</p>
                    <div className="project-card-meta">
                      <span>✉ {c.email}</span>
                      {c.phoneNumber && <span>📞 {c.phoneNumber}</span>}
                    </div>
                    <div className="project-card-actions">
                      <button className="btn-sm btn-primary" onClick={() => handleViewClient(c)}>View Details</button>
                    </div>
                  </div>
                ))}
              </div>
              {(!dashboard.recentClients || dashboard.recentClients.length === 0) && (
                <div className="empty-state">
                  <span className="empty-icon">📭</span>
                  <p>No clients yet. Create your first client!</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* ====== MY CLIENTS TAB ====== */}
        {activeNav === 'my-clients' && (
          <div className="dashboard-card full-width">
            <div className="card-header">
              <h2>My Clients</h2>
              <button className="btn-primary" onClick={() => setShowCreateClientModal(true)} disabled={!canCreate}>
                + New Client
              </button>
            </div>
            {!canCreate && (
              <div className="warning-banner" style={{ marginBottom: '1rem' }}>
                ⚠️ Partner account is <strong>{profile?.partnerStatus}</strong>. You need APPROVED status to create clients.
              </div>
            )}
            <div className="projects-grid">
              {clients.map((c) => (
                <div key={c.mappingId} className="project-card">
                  <div className="project-card-header">
                    <h3>{c.name}</h3>
                    {getStatusBadge(c.isApproved ? 'APPROVED' : 'PENDING')}
                  </div>
                  <p className="project-card-desc">{c.companyName}</p>
                  <div className="project-card-meta">
                    <span>✉ {c.email}</span>
                    {c.phoneNumber && <span>📞 {c.phoneNumber}</span>}
                    <span>📅 {formatDate(c.assignedAt)}</span>
                  </div>
                  {c.notes && <div className="project-card-manager">📝 {c.notes}</div>}
                  <div className="project-card-actions">
                    <button className="btn-sm btn-primary" onClick={() => handleViewClient(c)}>View Details</button>
                  </div>
                </div>
              ))}
            </div>
            {clients.length === 0 && (
              <div className="empty-state">
                <span className="empty-icon">👥</span>
                <p>No clients yet. Create your first client to get started.</p>
              </div>
            )}
          </div>
        )}

        {/* ====== MY DETAILS TAB ====== */}
        {activeNav === 'my-details' && profile && (
          <div className="dashboard-card full-width">
            <div className="card-header">
              <h2>My Partner Details</h2>
              {getStatusBadge(profile.partnerStatus)}
            </div>
            <div className="details-grid">
              <div className="detail-item"><label>Company Name</label><span>{profile.companyName}</span></div>
              <div className="detail-item"><label>Company Email</label><span>{profile.companyEmail || '—'}</span></div>
              <div className="detail-item"><label>Company Mobile</label><span>{profile.companyMobileNumber || '—'}</span></div>
              <div className="detail-item"><label>Company Website</label><span>{profile.companyWebsite || '—'}</span></div>
              <div className="detail-item"><label>Contact Person</label><span>{profile.contactPersonName || '—'}</span></div>
              <div className="detail-item"><label>Designation</label><span>{profile.contactPersonDesignation || '—'}</span></div>
              <div className="detail-item"><label>Partner Code</label><span style={{ color: 'var(--teal)', fontWeight: 600 }}>{profile.partnerCode}</span></div>
              <div className="detail-item"><label>Agreement Type</label><span>{profile.agreementType}</span></div>
              <div className="detail-item"><label>Agreement Value</label><span>{profile.agreementValue}</span></div>
              <div className="detail-item"><label>Start Date</label><span>{formatDate(profile.agreementStartDate)}</span></div>
              <div className="detail-item"><label>End Date</label><span>{formatDate(profile.agreementEndDate)}</span></div>
              <div className="detail-item"><label>Approved</label><span>{profile.isApproved ? '✅ Yes' : '❌ No'}</span></div>
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <label>Services Offered</label>
                <div className="skills-tags">
                  {profile.servicesOffered?.map((s) => (
                    <span key={s} className="skill-tag">{s.replace('_', ' ')}</span>
                  ))}
                </div>
              </div>
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <label>Agreement PDF</label>
                <a href={profile.agreementPdfDriveLink} target="_blank" rel="noopener noreferrer" className="resume-link">
                  📄 View Agreement
                </a>
              </div>
            </div>
            {profile.directorNote && (
              <div className="warning-banner" style={{ marginTop: '1rem' }}>
                <strong>Director Note:</strong> {profile.directorNote}
              </div>
            )}
          </div>
        )}

        {/* ====== ALL PARTNERS TAB (Director) ====== */}
        {activeNav === 'all-partners' && isDirector && (
          <div className="dashboard-card full-width">
            <div className="card-header">
              <h2>All Partners</h2>
              <span className="activity-badge">{allPartners.length} total</span>
            </div>
            <div className="projects-grid">
              {allPartners.map((p) => (
                <div key={p.partnerId} className="project-card">
                  <div className="project-card-header">
                    <h3>{p.companyName}</h3>
                    {getStatusBadge(p.partnerStatus)}
                  </div>
                  <p className="project-card-desc">{p.partnerName} · {p.partnerCode}</p>
                  <div className="project-card-meta">
                    <span>✉ {p.partnerEmail}</span>
                    <span>👥 {p.totalClients} clients</span>
                    <span>📋 {p.agreementType}</span>
                  </div>
                  <div className="project-card-actions">
                    <button className="btn-sm btn-primary" onClick={() => handleViewPartner(p)}>View Details</button>
                    {p.partnerStatus !== 'APPROVED' && (
                      <button className="btn-sm btn-outline" onClick={() => handleUpdateStatus(p.partnerId, 'APPROVED')} disabled={busy}>
                        ✅ Approve
                      </button>
                    )}
                    {p.partnerStatus === 'APPROVED' && (
                      <button className="btn-sm btn-outline" onClick={() => handleUpdateStatus(p.partnerId, 'BLOCKED')} disabled={busy}>
                        🔴 Block
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {allPartners.length === 0 && (
              <div className="empty-state">
                <span className="empty-icon">🤝</span>
                <p>No partners found.</p>
              </div>
            )}
          </div>
        )}

        {/* ====== PROFILE TAB ====== */}
        {activeNav === 'profile' && (
          <div className="dashboard-card full-width">
            <div className="card-header">
              <h2>Profile Information</h2>
            </div>
            <div className="profile-info">
              <div className="profile-avatar-large">
                {user?.photoUrl ? (
                  <img src={user.photoUrl} alt={user.name} />
                ) : (
                  <div className="avatar-placeholder">{user?.name?.charAt(0) || 'P'}</div>
                )}
              </div>
              <div className="profile-details">
                <div className="detail-item"><label>Full Name</label><span>{user?.name}</span></div>
                <div className="detail-item"><label>Email</label><span>{user?.email}</span></div>
                <div className="detail-item"><label>Role</label><span>Partner</span></div>
                <div className="detail-item"><label>Phone</label><span>{user?.phoneNumber || 'Not provided'}</span></div>
                <div className="detail-item"><label>Address</label><span>{user?.address || 'Not provided'}</span></div>
              </div>
            </div>
          </div>
        )}

        <footer className="client-footer">
          <p>© 2026 Softmax Nexus | Developed by <a href="https://softmax.in" style={{ color: 'skyblue' }}>Softmax.in</a></p>
        </footer>
      </main>

      {/* ============ MODALS ============ */}

      {/* Register Partner Modal */}
      {showRegisterModal && (
        <div className="modal-mask open">
          <div className="modal-box large">
            <button className="m-close" onClick={() => setShowRegisterModal(false)}>✕</button>
            <h2>Register as Partner</h2>
            <div className="m-form">
              <div className="details-grid">
                <div className="form-field">
                  <label>Company Name *</label>
                  <input value={registerForm.companyName} onChange={(e) => setRegisterForm({ ...registerForm, companyName: e.target.value })} placeholder="XYZ Partners Pvt Ltd" />
                </div>
                <div className="form-field">
                  <label>Company Email</label>
                  <input type="email" value={registerForm.companyEmail} onChange={(e) => setRegisterForm({ ...registerForm, companyEmail: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>Company Mobile</label>
                  <input value={registerForm.companyMobileNumber} onChange={(e) => setRegisterForm({ ...registerForm, companyMobileNumber: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>Website</label>
                  <input value={registerForm.companyWebsite} onChange={(e) => setRegisterForm({ ...registerForm, companyWebsite: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>Contact Person</label>
                  <input value={registerForm.contactPersonName} onChange={(e) => setRegisterForm({ ...registerForm, contactPersonName: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>Designation</label>
                  <input value={registerForm.contactPersonDesignation} onChange={(e) => setRegisterForm({ ...registerForm, contactPersonDesignation: e.target.value })} />
                </div>
                <div className="form-field" style={{ gridColumn: '1 / -1' }}>
                  <label>Address</label>
                  <textarea value={registerForm.companyAddress} onChange={(e) => setRegisterForm({ ...registerForm, companyAddress: e.target.value })} rows={2} />
                </div>
                <div className="form-field" style={{ gridColumn: '1 / -1' }}>
                  <label>Services Offered</label>
                  <div className="skills-tags">
                    {SERVICES.map((s) => (
                      <span
                        key={s}
                        className="skill-tag"
                        style={{
                          cursor: 'pointer',
                          background: registerForm.servicesOffered.includes(s) ? 'var(--teal)' : 'rgba(44,166,164,0.1)',
                          color: registerForm.servicesOffered.includes(s) ? 'white' : 'var(--teal)',
                        }}
                        onClick={() =>
                          setRegisterForm({
                            ...registerForm,
                            servicesOffered: registerForm.servicesOffered.includes(s)
                              ? registerForm.servicesOffered.filter((x) => x !== s)
                              : [...registerForm.servicesOffered, s],
                          })
                        }
                      >
                        {s.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="form-field">
                  <label>Agreement Type *</label>
                  <select value={registerForm.agreementType} onChange={(e) => setRegisterForm({ ...registerForm, agreementType: e.target.value })}>
                    {AGREEMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label>Agreement Value</label>
                  <input type="number" step="0.01" value={registerForm.agreementValue} onChange={(e) => setRegisterForm({ ...registerForm, agreementValue: e.target.value })} placeholder="15" />
                </div>
                <div className="form-field" style={{ gridColumn: '1 / -1' }}>
                  <label>Agreement PDF Drive Link *</label>
                  <input value={registerForm.agreementPdfDriveLink} onChange={(e) => setRegisterForm({ ...registerForm, agreementPdfDriveLink: e.target.value })} placeholder="https://drive.google.com/..." />
                </div>
                <div className="form-field">
                  <label>Start Date</label>
                  <input type="date" value={registerForm.agreementStartDate} onChange={(e) => setRegisterForm({ ...registerForm, agreementStartDate: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>End Date</label>
                  <input type="date" value={registerForm.agreementEndDate} onChange={(e) => setRegisterForm({ ...registerForm, agreementEndDate: e.target.value })} />
                </div>
                <div className="form-field" style={{ gridColumn: '1 / -1' }}>
                  <label>Internal Notes</label>
                  <textarea value={registerForm.internalNotes} onChange={(e) => setRegisterForm({ ...registerForm, internalNotes: e.target.value })} rows={2} />
                </div>
              </div>
              <button className="btn-msub" onClick={handleRegisterPartner} disabled={busy}>
                {busy ? 'Submitting…' : 'Submit Registration'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Client Modal */}
      {showCreateClientModal && (
        <div className="modal-mask open">
          <div className="modal-box large">
            <button className="m-close" onClick={() => setShowCreateClientModal(false)}>✕</button>
            <h2>Create Client</h2>
            <div className="m-form">
              <div className="details-grid">
                <div className="form-field"><label>Client Email *</label><input type="email" value={clientForm.email} onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })} /></div>
                <div className="form-field"><label>Client Name *</label><input value={clientForm.name} onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })} /></div>
                <div className="form-field" style={{ gridColumn: '1 / -1' }}><label>Company Name *</label><input value={clientForm.companyName} onChange={(e) => setClientForm({ ...clientForm, companyName: e.target.value })} /></div>
                <div className="form-field"><label>Phone</label><input value={clientForm.phoneNumber} onChange={(e) => setClientForm({ ...clientForm, phoneNumber: e.target.value })} /></div>
                <div className="form-field">
                  <label>Gender</label>
                  <select value={clientForm.gender} onChange={(e) => setClientForm({ ...clientForm, gender: e.target.value })}>
                    <option value="">—</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="form-field"><label>DOB</label><input type="date" value={clientForm.dob} onChange={(e) => setClientForm({ ...clientForm, dob: e.target.value })} /></div>
                <div className="form-field"><label>Photo URL</label><input value={clientForm.photoUrl} onChange={(e) => setClientForm({ ...clientForm, photoUrl: e.target.value })} /></div>
                <div className="form-field" style={{ gridColumn: '1 / -1' }}><label>Address</label><textarea value={clientForm.address} onChange={(e) => setClientForm({ ...clientForm, address: e.target.value })} rows={2} /></div>
                <div className="form-field"><label>Company Mobile</label><input value={clientForm.companyMobileNumber} onChange={(e) => setClientForm({ ...clientForm, companyMobileNumber: e.target.value })} /></div>
                <div className="form-field"><label>Company Email</label><input type="email" value={clientForm.companyEmail} onChange={(e) => setClientForm({ ...clientForm, companyEmail: e.target.value })} /></div>
                <div className="form-field"><label>Org Type</label><input value={clientForm.orgType} onChange={(e) => setClientForm({ ...clientForm, orgType: e.target.value })} /></div>
                <div className="form-field"><label>Client Type</label><input value={clientForm.clientType} onChange={(e) => setClientForm({ ...clientForm, clientType: e.target.value })} /></div>
                <div className="form-field" style={{ gridColumn: '1 / -1' }}><label>Website</label><input value={clientForm.clientWebsite} onChange={(e) => setClientForm({ ...clientForm, clientWebsite: e.target.value })} /></div>
                <div className="form-field" style={{ gridColumn: '1 / -1' }}><label>Notes</label><textarea value={clientForm.notes} onChange={(e) => setClientForm({ ...clientForm, notes: e.target.value })} rows={2} /></div>
              </div>
              <button className="btn-msub" onClick={handleCreateClient} disabled={busy}>
                {busy ? 'Creating…' : 'Create Client'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Client Detail Modal */}
      {showClientDetailModal && selectedClient && (
        <div className="modal-mask open">
          <div className="modal-box large">
            <button className="m-close" onClick={() => setShowClientDetailModal(false)}>✕</button>
            <h2>{selectedClient.name} — {selectedClient.companyName}</h2>
            <div className="m-tabs">
              <button className="m-tab active">📋 Overview</button>
            </div>
            <div className="project-detail-section">
              <div className="detail-grid">
                <div><label>Email:</label> {selectedClient.email}</div>
                <div><label>Phone:</label> {selectedClient.phoneNumber || '—'}</div>
                <div><label>Status:</label> {getStatusBadge(selectedClient.isApproved ? 'APPROVED' : 'PENDING')}</div>
                <div><label>Assigned:</label> {formatDate(selectedClient.assignedAt)}</div>
                <div><label>Company Email:</label> {selectedClient.companyEmail || '—'}</div>
              </div>
              {selectedClient.notes && (
                <div className="detail-row" style={{ marginTop: '1rem' }}>
                  <label>Notes:</label>
                  <p>{selectedClient.notes}</p>
                </div>
              )}
            </div>

            {/* Projects */}
            <div style={{ marginTop: '1.5rem' }}>
              <div className="card-header" style={{ marginBottom: '0.75rem' }}>
                <h3>Projects ({clientProjects.length})</h3>
                <button className="btn-primary btn-sm" onClick={() => setShowCreateProjectModal(true)} disabled={!canCreate}>
                  + New Project
                </button>
              </div>
              {clientProjects.length === 0 ? (
                <div className="empty-state"><span className="empty-icon">🚀</span><p>No projects yet.</p></div>
              ) : (
                <div className="projects-grid">
                  {clientProjects.map((p) => (
                    <div key={p.projectId} className="project-card">
                      <div className="project-card-header">
                        <h3>{p.projectName}</h3>
                        {getStatusBadge(p.status)}
                      </div>
                      <p className="project-card-desc">{p.projectDescription || '—'}</p>
                      <div className="project-card-meta">
                        <span>🧩 {p.projectType || '—'}</span>
                        <span>🏢 {p.departmentName || 'No dept'}</span>
                        <span>💰 {p.cost ? formatMoney(p.cost) : '—'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Payments */}
            <div style={{ marginTop: '1.5rem' }}>
              <div className="card-header" style={{ marginBottom: '0.75rem' }}>
                <h3>Payments ({clientPayments.length})</h3>
              </div>
              {clientPayments.length === 0 ? (
                <div className="empty-state"><span className="empty-icon">💳</span><p>No payments yet.</p></div>
              ) : (
                <div className="files-list">
                  {clientPayments.map((pay) => (
                    <div key={pay.paymentId} className="file-item">
                      <div className="file-icon">{pay.status === 'APPROVED' ? '✅' : '⏳'}</div>
                      <div className="file-info">
                        <div className="file-name">{pay.transactionId}</div>
                        <div className="file-meta">
                          <span className="file-type">{pay.type}</span>
                          <span>{formatDate(pay.dateTime)}</span>
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, color: pay.status === 'APPROVED' ? 'var(--teal)' : 'var(--orange)' }}>
                        {formatMoney(pay.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateProjectModal && selectedClient && (
        <div className="modal-mask open">
          <div className="modal-box">
            <button className="m-close" onClick={() => setShowCreateProjectModal(false)}>✕</button>
            <h2>New Project — {selectedClient.name}</h2>
            <div className="m-form">
              <div className="form-field">
                <label>Project Name *</label>
                <input value={projectForm.projectName} onChange={(e) => setProjectForm({ ...projectForm, projectName: e.target.value })} />
              </div>
              <div className="form-field">
                <label>Description</label>
                <textarea value={projectForm.projectDescription} onChange={(e) => setProjectForm({ ...projectForm, projectDescription: e.target.value })} rows={3} />
              </div>
              <div className="form-field">
                <label>Type</label>
                <select value={projectForm.projectType} onChange={(e) => setProjectForm({ ...projectForm, projectType: e.target.value })}>
                  <option value="WEB">WEB</option>
                  <option value="MOBILE">MOBILE</option>
                  <option value="DESKTOP">DESKTOP</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>
              <div className="form-field">
                <label>Department ID</label>
                <input type="number" value={projectForm.departmentId} onChange={(e) => setProjectForm({ ...projectForm, departmentId: e.target.value })} />
              </div>
              <div className="form-field">
                <label>Cost</label>
                <input value={projectForm.cost} onChange={(e) => setProjectForm({ ...projectForm, cost: e.target.value })} placeholder="25000" />
              </div>
              <div className="form-field">
                <label>Deadline</label>
                <input type="datetime-local" value={projectForm.deadline} onChange={(e) => setProjectForm({ ...projectForm, deadline: e.target.value })} />
              </div>
              <button className="btn-msub" onClick={handleCreateProject} disabled={busy}>
                {busy ? 'Creating…' : 'Create Project'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Partner Detail Modal (Director) */}
      {showPartnerDetailModal && selectedPartner && (
        <div className="modal-mask open">
          <div className="modal-box large">
            <button className="m-close" onClick={() => setShowPartnerDetailModal(false)}>✕</button>
            <h2>{selectedPartner.companyName}</h2>
            <div className="m-tabs">
              <button className="m-tab active">📋 Details</button>
            </div>
            <div className="details-grid">
              <div className="detail-item"><label>Partner Code</label><span>{selectedPartner.partnerCode}</span></div>
              <div className="detail-item"><label>Partner Name</label><span>{selectedPartner.partnerName}</span></div>
              <div className="detail-item"><label>Email</label><span>{selectedPartner.partnerEmail}</span></div>
              <div className="detail-item"><label>Company Email</label><span>{selectedPartner.companyEmail}</span></div>
              <div className="detail-item"><label>Mobile</label><span>{selectedPartner.companyMobileNumber || '—'}</span></div>
              <div className="detail-item"><label>Website</label><span>{selectedPartner.companyWebsite || '—'}</span></div>
              <div className="detail-item"><label>Agreement</label><span>{selectedPartner.agreementType} · {selectedPartner.agreementValue}</span></div>
              <div className="detail-item"><label>Status</label><span>{getStatusBadge(selectedPartner.partnerStatus)}</span></div>
              <div className="detail-item"><label>Total Clients</label><span>{selectedPartner.totalClients}</span></div>
              <div className="detail-item"><label>Active Clients</label><span>{selectedPartner.activeClients}</span></div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <label style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase' }}>Services</label>
              <div className="skills-tags" style={{ marginTop: '0.3rem' }}>
                {selectedPartner.servicesOffered?.map((s) => (
                  <span key={s} className="skill-tag">{s.replace('_', ' ')}</span>
                ))}
              </div>
            </div>
            {selectedPartner.directorNote && (
              <div className="warning-banner" style={{ marginTop: '1rem' }}>
                <strong>Note:</strong> {selectedPartner.directorNote}
              </div>
            )}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              {['PENDING', 'APPROVED', 'BLOCKED', 'DEACTIVATED']
                .filter((s) => s !== selectedPartner.partnerStatus)
                .map((s) => (
                  <button
                    key={s}
                    className={s === 'APPROVED' ? 'btn-primary btn-sm' : s === 'PENDING' ? 'btn-outline btn-sm' : 'btn-danger btn-sm'}
                    onClick={() => handleUpdateStatus(selectedPartner.partnerId, s)}
                    disabled={busy}
                  >
                    Set {s}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem',
          padding: '0.85rem 1.25rem', borderRadius: 12,
          fontSize: '0.85rem', fontWeight: 600, color: '#fff',
          background: toast.type === 'ok' ? 'var(--g-main)' : 'linear-gradient(135deg,#FE9496,#A05AFF)',
          boxShadow: '0 10px 30px rgba(15,23,42,0.2)', zIndex: 2000,
          maxWidth: 360,
        }}>
          {toast.msg}
        </div>
      )}

      <style jsx>{`
        .activity-badge {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          color: var(--muted);
        }
        .empty-state {
          text-align: center;
          padding: 3rem;
          color: var(--muted);
        }
        .empty-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 1rem;
          opacity: 0.5;
        }
        .warning-banner {
          padding: 0.75rem 1rem;
          background: rgba(254, 148, 150, 0.1);
          border: 1px solid var(--orange);
          border-radius: 10px;
          font-size: 0.8rem;
          color: var(--orange);
        }
        .skills-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
        }
        .skill-tag {
          background: rgba(44, 166, 164, 0.1);
          color: var(--teal);
          padding: 0.2rem 0.5rem;
          border-radius: 12px;
          font-size: 0.7rem;
        }
        .resume-link {
          color: var(--teal);
          text-decoration: none;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Partner;