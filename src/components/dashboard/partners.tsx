// // // // //@ts-nocheck
// // // // 'use client';

// // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // import axios from 'axios';
// // // // import CommonSidebar from './components/CommonSidebar';
// // // // import { useAuth } from '@/contexts/AuthContext';

// // // // // ============================================
// // // // // TYPES
// // // // // ============================================

// // // // interface UserProfile {
// // // //   userId: number;
// // // //   uid: string;
// // // //   name: string;
// // // //   email: string;
// // // //   photoUrl: string | null;
// // // //   emailVerified: boolean;
// // // //   isProfileCompleted: boolean;
// // // //   phoneNumber?: string;
// // // //   address?: string;
// // // //   gender?: string;
// // // //   dob?: string;
// // // // }

// // // // interface Partner {
// // // //   partnerId: number;
// // // //   userId: number;
// // // //   partnerCode: string;
// // // //   partnerName: string;
// // // //   partnerEmail: string;
// // // //   partnerPhotoUrl?: string | null;
// // // //   companyName: string;
// // // //   companyEmail: string;
// // // //   companyMobileNumber?: string;
// // // //   companyWebsite?: string;
// // // //   companyAddress?: string;
// // // //   contactPersonName?: string;
// // // //   contactPersonDesignation?: string;
// // // //   servicesOffered: string[];
// // // //   agreementType: string;
// // // //   agreementValue: number;
// // // //   agreementPdfDriveLink: string;
// // // //   agreementStartDate?: string;
// // // //   agreementEndDate?: string;
// // // //   partnerStatus: string;
// // // //   isApproved: boolean;
// // // //   directorNote?: string | null;
// // // //   totalClients: number;
// // // //   activeClients: number;
// // // //   createdAt: string;
// // // //   updatedAt: string;
// // // // }

// // // // interface PartnerDashboard {
// // // //   partnerId: number;
// // // //   partnerCode: string;
// // // //   companyName: string;
// // // //   partnerStatus: string;
// // // //   totalClients: number;
// // // //   approvedClients: number;
// // // //   pendingClients: number;
// // // //   totalProjects: number;
// // // //   activeProjects: number;
// // // //   completedProjects: number;
// // // //   totalPaymentsCount: number;
// // // //   totalApprovedRevenue: number;
// // // //   totalPendingRevenue: number;
// // // //   recentClients: Client[];
// // // // }

// // // // interface Client {
// // // //   mappingId: number;
// // // //   clientId: number;
// // // //   userId: number;
// // // //   name: string;
// // // //   email: string;
// // // //   phoneNumber?: string;
// // // //   companyName: string;
// // // //   companyEmail?: string;
// // // //   clientStatus: string;
// // // //   isApproved: boolean;
// // // //   assignedAt: string;
// // // //   mappingStatus: string;
// // // //   notes?: string | null;
// // // // }

// // // // interface Project {
// // // //   projectId: number;
// // // //   projectName: string;
// // // //   projectDescription?: string;
// // // //   projectType?: string;
// // // //   status: string;
// // // //   cost?: string;
// // // //   deadline?: string;
// // // //   departmentId?: number;
// // // //   departmentName?: string;
// // // //   createdAt: string;
// // // //   updatedAt: string;
// // // // }

// // // // interface Payment {
// // // //   paymentId: number;
// // // //   transactionId: string;
// // // //   dateTime: string;
// // // //   type: string;
// // // //   amount: string;
// // // //   status: string;
// // // //   user?: { userId: number; name: string; email: string };
// // // //   paymentNote?: string;
// // // //   approvedBy?: { userId: number; name: string };
// // // //   approvedAt?: string;
// // // //   directorNote?: string;
// // // // }

// // // // // ============================================
// // // // // API CONFIGURATION
// // // // // ============================================

// // // // const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// // // // const apiCall = async <T,>(
// // // //   method: string,
// // // //   endpoint: string,
// // // //   data?: any
// // // // ): Promise<T> => {
// // // //   try {
// // // //     const config: any = {
// // // //       method,
// // // //       url: `${API_BASE}${endpoint}`,
// // // //       withCredentials: true,
// // // //     };
// // // //     if (data) {
// // // //       config.data = data;
// // // //       config.headers = { 'Content-Type': 'application/json' };
// // // //     }
// // // //     const response = await axios(config);
// // // //     return response.data;
// // // //   } catch (error: any) {
// // // //     throw error.response?.data || error;
// // // //   }
// // // // };

// // // // // ============================================
// // // // // PARTNER APIs
// // // // // ============================================

// // // // const registerAsPartner = async (payload: any) => {
// // // //   return apiCall('POST', '/api/partner/register', payload);
// // // // };

// // // // const getMyPartnerProfile = async () => {
// // // //   return apiCall<{ success: boolean; data: Partner }>('GET', '/api/partner/me');
// // // // };

// // // // const getMyPartnerDashboard = async () => {
// // // //   return apiCall<{ success: boolean; data: PartnerDashboard }>('GET', '/api/partner/me/dashboard');
// // // // };

// // // // const getMyPartnerClients = async () => {
// // // //   return apiCall<{ success: boolean; data: Client[] }>('GET', '/api/partner/clients');
// // // // };

// // // // const getOneClient = async (clientId: number) => {
// // // //   return apiCall<{ success: boolean; data: Client }>('GET', `/api/partner/clients/${clientId}`);
// // // // };

// // // // const createClient = async (payload: any) => {
// // // //   return apiCall('POST', '/api/partner/clients', payload);
// // // // };

// // // // const getClientProjects = async (clientId: number) => {
// // // //   return apiCall<{ success: boolean; data: Project[] }>(
// // // //     'GET',
// // // //     `/api/partner/clients/${clientId}/projects`
// // // //   );
// // // // };

// // // // const createProjectForClient = async (clientId: number, payload: any) => {
// // // //   return apiCall('POST', `/api/partner/clients/${clientId}/projects`, payload);
// // // // };

// // // // const getClientPayments = async (clientId: number) => {
// // // //   return apiCall<{ success: boolean; data: Payment[] }>(
// // // //     'GET',
// // // //     `/api/partner/clients/${clientId}/payments`
// // // //   );
// // // // };

// // // // // ============================================
// // // // // HEAD DIRECTOR APIs
// // // // // ============================================

// // // // const getAllPartners = async () => {
// // // //   return apiCall<{ success: boolean; data: Partner[] }>('GET', '/api/partner/all');
// // // // };

// // // // const getOnePartner = async (partnerId: number) => {
// // // //   return apiCall<{ success: boolean; data: Partner }>('GET', `/api/partner/${partnerId}`);
// // // // };

// // // // const updatePartnerStatus = async (partnerId: number, status: string, note?: string) => {
// // // //   let url = `/api/partner/${partnerId}/status?status=${status}`;
// // // //   if (note) url += `&note=${encodeURIComponent(note)}`;
// // // //   return apiCall('PUT', url, null);
// // // // };

// // // // // ============================================
// // // // // USER PROFILE API
// // // // // ============================================

// // // // const getUserProfile = async () => {
// // // //   return apiCall<{ success: boolean; data: UserProfile }>('GET', '/api/users/profile');
// // // // };

// // // // // ============================================
// // // // // SIDEBAR MENU
// // // // // ============================================

// // // // const partnerMenuItems = [
// // // //   { id: 'dashboard', label: 'Dashboard', icon: '📊' },
// // // //   { id: 'my-clients', label: 'My Clients', icon: '👥' },
// // // //   { id: 'my-details', label: 'My Details', icon: '📝' },
// // // //   { id: 'profile', label: 'Profile', icon: '👤' },
// // // // ];

// // // // const directorMenuItems = [
// // // //   { id: 'dashboard', label: 'Dashboard', icon: '📊' },
// // // //   { id: 'all-partners', label: 'All Partners', icon: '🤝' },
// // // //   { id: 'profile', label: 'Profile', icon: '👤' },
// // // // ];

// // // // // ============================================
// // // // // STATUS CONFIGURATION
// // // // // ============================================

// // // // const statusConfig: Record<string, { label: string; class: string; icon: string; color: string }> = {
// // // //   PENDING: { label: 'Pending', class: 'status-pending', icon: '⏳', color: '#F59E0B' },
// // // //   APPROVED: { label: 'Approved', class: 'status-approved', icon: '✅', color: '#10B981' },
// // // //   BLOCKED: { label: 'Blocked', class: 'status-rejected', icon: '🔴', color: '#EF4444' },
// // // //   DEACTIVATED: { label: 'Deactivated', class: 'status-rejected', icon: '⚪', color: '#6B7280' },
// // // //   ACTIVE: { label: 'Active', class: 'status-approved', icon: '🟢', color: '#10B981' },
// // // //   IN_PROGRESS: { label: 'In Progress', class: 'status-progress', icon: '🔄', color: '#3B82F6' },
// // // //   COMPLETED: { label: 'Completed', class: 'status-completed', icon: '✔️', color: '#10B981' },
// // // // };

// // // // const getStatusBadge = (status: string) => {
// // // //   const config = statusConfig[status] || { label: status || 'N/A', class: 'status-pending', icon: '📌', color: '#6B7280' };
// // // //   return <span className={`status-badge ${config.class}`}>{config.icon} {config.label}</span>;
// // // // };

// // // // const formatDate = (dateString: string) => {
// // // //   if (!dateString) return '—';
// // // //   return new Date(dateString).toLocaleString();
// // // // };

// // // // const formatMoney = (n: number | string) => {
// // // //   return '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });
// // // // };

// // // // // ============================================
// // // // // SERVICES / AGREEMENT OPTIONS
// // // // // ============================================

// // // // const SERVICES = [
// // // //   'CLIENT_RELATIONSHIP',
// // // //   'SELLING',
// // // //   'SECURITY',
// // // //   'MARKETING',
// // // //   'SUPPORT',
// // // //   'DEVELOPMENT',
// // // //   'OTHER',
// // // // ];

// // // // const AGREEMENT_TYPES = ['PERCENTAGE', 'MONTHLY', 'FIXED'];

// // // // // ============================================
// // // // // MAIN PARTNER COMPONENT
// // // // // ============================================

// // // // const Partner: React.FC = () => {
// // // //   const [activeNav, setActiveNav] = useState('dashboard');
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
// // // //   const [user, setUser] = useState<UserProfile | null>(null);

// // // //   // Partner state
// // // //   const [profile, setProfile] = useState<Partner | null>(null);
// // // //   const [dashboard, setDashboard] = useState<PartnerDashboard | null>(null);
// // // //   const [clients, setClients] = useState<Client[]>([]);
// // // //   const [noProfile, setNoProfile] = useState(false);

// // // //   // Director state
// // // //   const [allPartners, setAllPartners] = useState<Partner[]>([]);
// // // //   const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
// // // //   const [isDirector, setIsDirector] = useState(false);

// // // //   // Client detail
// // // //   const [selectedClient, setSelectedClient] = useState<Client | null>(null);
// // // //   const [clientProjects, setClientProjects] = useState<Project[]>([]);
// // // //   const [clientPayments, setClientPayments] = useState<Payment[]>([]);

// // // //   // Modal states
// // // //   const [showRegisterModal, setShowRegisterModal] = useState(false);
// // // //   const [showCreateClientModal, setShowCreateClientModal] = useState(false);
// // // //   const [showClientDetailModal, setShowClientDetailModal] = useState(false);
// // // //   const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
// // // //   const [showPartnerDetailModal, setShowPartnerDetailModal] = useState(false);
// // // //   const [showProfileModal, setShowProfileModal] = useState(false);

// // // //   const [darkMode, setDarkMode] = useState(false);
// // // //   const [busy, setBusy] = useState(false);
// // // //   const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);

// // // //   // Form states
// // // //   const [registerForm, setRegisterForm] = useState({
// // // //     companyName: '',
// // // //     companyEmail: '',
// // // //     companyMobileNumber: '',
// // // //     companyWebsite: '',
// // // //     companyAddress: '',
// // // //     contactPersonName: '',
// // // //     contactPersonDesignation: '',
// // // //     servicesOffered: [] as string[],
// // // //     agreementType: 'PERCENTAGE',
// // // //     agreementValue: '',
// // // //     agreementPdfDriveLink: '',
// // // //     agreementStartDate: '',
// // // //     agreementEndDate: '',
// // // //     internalNotes: '',
// // // //   });

// // // //   const [clientForm, setClientForm] = useState({
// // // //     email: '',
// // // //     name: '',
// // // //     phoneNumber: '',
// // // //     gender: '',
// // // //     dob: '',
// // // //     photoUrl: '',
// // // //     address: '',
// // // //     companyName: '',
// // // //     companyMobileNumber: '',
// // // //     companyEmail: '',
// // // //     orgType: '',
// // // //     clientType: '',
// // // //     clientWebsite: '',
// // // //     notes: '',
// // // //   });

// // // //   const [projectForm, setProjectForm] = useState({
// // // //     projectName: '',
// // // //     projectDescription: '',
// // // //     projectType: 'WEB',
// // // //     departmentId: '',
// // // //     cost: '',
// // // //     deadline: '',
// // // //   });

// // // //   const { logout } = useAuth();

// // // //   const showToast = (type: 'ok' | 'err', msg: string) => {
// // // //     setToast({ type, msg });
// // // //     setTimeout(() => setToast(null), 4000);
// // // //   };

// // // //   // ---------- LOAD INITIAL ----------
// // // //   useEffect(() => {
// // // //     const savedTheme = localStorage.getItem('theme');
// // // //     if (savedTheme === 'dark') {
// // // //       setDarkMode(true);
// // // //       document.documentElement.setAttribute('data-theme', 'dark');
// // // //     }
// // // //     loadInitialData();
// // // //   }, []);

// // // //   const loadInitialData = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const [profileRes, detailsRes] = await Promise.all([
// // // //         getUserProfile().catch(() => ({ data: null })),
// // // //         getMyPartnerProfile().catch(() => ({ data: null })),
// // // //       ]);
// // // //       setUser(profileRes.data);

// // // //       if (detailsRes.data) {
// // // //         // Partner exists — load partner data
// // // //         setProfile(detailsRes.data);
// // // //         setNoProfile(false);
// // // //         await loadPartnerData();
// // // //       } else {
// // // //         setNoProfile(true);
// // // //       }

// // // //       // Try director list — silently fail if not director
// // // //       try {
// // // //         const allRes = await getAllPartners();
// // // //         setAllPartners(allRes.data || []);
// // // //         setIsDirector(true);
// // // //       } catch {
// // // //         setIsDirector(false);
// // // //       }
// // // //     } catch (err) {
// // // //       console.error('Error loading initial data:', err);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const loadPartnerData = async () => {
// // // //     try {
// // // //       const [dashRes, clientsRes] = await Promise.all([
// // // //         getMyPartnerDashboard().catch(() => ({ data: null })),
// // // //         getMyPartnerClients().catch(() => ({ data: [] })),
// // // //       ]);
// // // //       setDashboard(dashRes.data || null);
// // // //       setClients(clientsRes.data || []);
// // // //     } catch (err) {
// // // //       console.error('Error loading partner data:', err);
// // // //     }
// // // //   };

// // // //   const toggleDarkMode = () => {
// // // //     const newMode = !darkMode;
// // // //     setDarkMode(newMode);
// // // //     document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
// // // //     localStorage.setItem('theme', newMode ? 'dark' : 'light');
// // // //   };

// // // //   const handleLogout = async () => {
// // // //     try {
// // // //       await logout();
// // // //       window.location.href = '/';
// // // //     } catch (error) {
// // // //       console.error('Logout error:', error);
// // // //     }
// // // //   };

// // // //   // ---------- PARTNER ACTIONS ----------

// // // //   const handleRegisterPartner = async () => {
// // // //     setBusy(true);
// // // //     try {
// // // //       const payload: any = {
// // // //         companyName: registerForm.companyName.trim(),
// // // //         agreementType: registerForm.agreementType,
// // // //         agreementPdfDriveLink: registerForm.agreementPdfDriveLink.trim(),
// // // //       };
// // // //       if (registerForm.companyEmail.trim()) payload.companyEmail = registerForm.companyEmail.trim();
// // // //       if (registerForm.companyMobileNumber.trim())
// // // //         payload.companyMobileNumber = registerForm.companyMobileNumber.trim();
// // // //       if (registerForm.companyWebsite.trim()) payload.companyWebsite = registerForm.companyWebsite.trim();
// // // //       if (registerForm.companyAddress.trim()) payload.companyAddress = registerForm.companyAddress.trim();
// // // //       if (registerForm.contactPersonName.trim())
// // // //         payload.contactPersonName = registerForm.contactPersonName.trim();
// // // //       if (registerForm.contactPersonDesignation.trim())
// // // //         payload.contactPersonDesignation = registerForm.contactPersonDesignation.trim();
// // // //       if (registerForm.servicesOffered.length) payload.servicesOffered = registerForm.servicesOffered;
// // // //       if (registerForm.agreementValue) payload.agreementValue = Number(registerForm.agreementValue);
// // // //       if (registerForm.agreementStartDate) payload.agreementStartDate = registerForm.agreementStartDate;
// // // //       if (registerForm.agreementEndDate) payload.agreementEndDate = registerForm.agreementEndDate;
// // // //       if (registerForm.internalNotes.trim()) payload.internalNotes = registerForm.internalNotes.trim();

// // // //       await registerAsPartner(payload);
// // // //       showToast('ok', 'Partner registration submitted. Pending Head Director approval.');
// // // //       setShowRegisterModal(false);
// // // //       await loadInitialData();
// // // //     } catch (err: any) {
// // // //       showToast('err', err?.message || 'Registration failed');
// // // //     } finally {
// // // //       setBusy(false);
// // // //     }
// // // //   };

// // // //   const handleCreateClient = async () => {
// // // //     setBusy(true);
// // // //     try {
// // // //       const payload: any = {
// // // //         email: clientForm.email.trim(),
// // // //         name: clientForm.name.trim(),
// // // //         companyName: clientForm.companyName.trim(),
// // // //       };
// // // //       Object.entries(clientForm).forEach(([k, v]) => {
// // // //         if (!['email', 'name', 'companyName'].includes(k) && v.trim()) payload[k] = v.trim();
// // // //       });

// // // //       await createClient(payload);
// // // //       showToast('ok', 'Client created successfully');
// // // //       setShowCreateClientModal(false);
// // // //       setClientForm({
// // // //         email: '', name: '', phoneNumber: '', gender: '', dob: '', photoUrl: '',
// // // //         address: '', companyName: '', companyMobileNumber: '', companyEmail: '',
// // // //         orgType: '', clientType: '', clientWebsite: '', notes: '',
// // // //       });
// // // //       await loadPartnerData();
// // // //     } catch (err: any) {
// // // //       showToast('err', err?.message || 'Failed to create client');
// // // //     } finally {
// // // //       setBusy(false);
// // // //     }
// // // //   };

// // // //   const handleViewClient = async (client: Client) => {
// // // //     setSelectedClient(client);
// // // //     setClientProjects([]);
// // // //     setClientPayments([]);
// // // //     setShowClientDetailModal(true);
// // // //     try {
// // // //       const [projRes, payRes] = await Promise.all([
// // // //         getClientProjects(client.clientId).catch(() => ({ data: [] })),
// // // //         getClientPayments(client.clientId).catch(() => ({ data: [] })),
// // // //       ]);
// // // //       setClientProjects(projRes.data || []);
// // // //       setClientPayments(payRes.data || []);
// // // //     } catch (err) {
// // // //       showToast('err', 'Failed to load client details');
// // // //     }
// // // //   };

// // // //   const handleCreateProject = async () => {
// // // //     if (!selectedClient) return;
// // // //     setBusy(true);
// // // //     try {
// // // //       const payload: any = { projectName: projectForm.projectName.trim() };
// // // //       if (projectForm.projectDescription.trim())
// // // //         payload.projectDescription = projectForm.projectDescription.trim();
// // // //       if (projectForm.projectType) payload.projectType = projectForm.projectType;
// // // //       if (projectForm.departmentId) payload.departmentId = Number(projectForm.departmentId);
// // // //       if (projectForm.cost) payload.cost = projectForm.cost;
// // // //       if (projectForm.deadline)
// // // //         payload.deadline = projectForm.deadline.length === 16 ? projectForm.deadline + ':00' : projectForm.deadline;

// // // //       await createProjectForClient(selectedClient.clientId, payload);
// // // //       showToast('ok', 'Project created for client');
// // // //       setShowCreateProjectModal(false);
// // // //       setProjectForm({
// // // //         projectName: '', projectDescription: '', projectType: 'WEB',
// // // //         departmentId: '', cost: '', deadline: '',
// // // //       });
// // // //       // reload projects
// // // //       const projRes = await getClientProjects(selectedClient.clientId);
// // // //       setClientProjects(projRes.data || []);
// // // //     } catch (err: any) {
// // // //       showToast('err', err?.message || 'Failed to create project');
// // // //     } finally {
// // // //       setBusy(false);
// // // //     }
// // // //   };

// // // //   // ---------- DIRECTOR ACTIONS ----------

// // // //   const handleUpdateStatus = async (partnerId: number, status: string) => {
// // // //     setBusy(true);
// // // //     try {
// // // //       await updatePartnerStatus(partnerId, status, `Set to ${status} by Head Director`);
// // // //       showToast('ok', 'Partner status updated');
// // // //       // update local state
// // // //       setAllPartners((prev) =>
// // // //         prev.map((p) =>
// // // //           p.partnerId === partnerId
// // // //             ? { ...p, partnerStatus: status, isApproved: status === 'APPROVED' }
// // // //             : p
// // // //         )
// // // //       );
// // // //       if (selectedPartner?.partnerId === partnerId) {
// // // //         setSelectedPartner((sp) =>
// // // //           sp ? { ...sp, partnerStatus: status, isApproved: status === 'APPROVED' } : sp
// // // //         );
// // // //       }
// // // //     } catch (err: any) {
// // // //       showToast('err', err?.message || 'Failed to update status');
// // // //     } finally {
// // // //       setBusy(false);
// // // //     }
// // // //   };

// // // //   const handleViewPartner = async (partner: Partner) => {
// // // //     setSelectedPartner(partner);
// // // //     setShowPartnerDetailModal(true);
// // // //   };

// // // //   const canCreate = profile?.partnerStatus === 'APPROVED';
// // // //   const menuItems = isDirector ? directorMenuItems : partnerMenuItems;

// // // //   // ============================================
// // // //   // RENDER
// // // //   // ============================================
// // // //   if (loading) {
// // // //     return (
// // // //       <div className="client-loader">
// // // //         <div className="loader-spinner"></div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="client-container">
// // // //       <CommonSidebar
// // // //         activeNav={activeNav}
// // // //         setActiveNav={setActiveNav}
// // // //         onLogout={handleLogout}
// // // //         onThemeToggle={toggleDarkMode}
// // // //         darkMode={darkMode}
// // // //         user={user ? { name: user.name, email: user.email, photoUrl: user.photoUrl } : null}
// // // //         menuItems={menuItems}
// // // //         title="Partner Portal"
// // // //         logoIcon="🤝"
// // // //         isOpen={mobileSidebarOpen}
// // // //         onClose={() => setMobileSidebarOpen(false)}
// // // //       />

// // // //       <button className="mobile-menu-btn" onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>
// // // //         ☰
// // // //       </button>

// // // //       <main className="client-main">
// // // //         {/* HEADER */}
// // // //         <header className="client-header">
// // // //           <div className="header-welcome">
// // // //             <h1>Welcome back, {user?.name?.split(' ')[0] || 'Partner'}!</h1>
// // // //             <p>Partner Dashboard - Client & Project Management</p>
// // // //           </div>
// // // //           <div className="header-stats">
// // // //             <div className="header-stat-item">
// // // //               <span className="stat-label">Status</span>
// // // //               <span className="stat-value-sm">
// // // //                 {profile ? getStatusBadge(profile.partnerStatus) : <span className="status-badge status-pending">⏳ Not Registered</span>}
// // // //               </span>
// // // //             </div>
// // // //             {dashboard && (
// // // //               <>
// // // //                 <div className="header-stat-item">
// // // //                   <span className="stat-label">Clients</span>
// // // //                   <span className="stat-value-sm">{dashboard.totalClients} total</span>
// // // //                 </div>
// // // //                 <div className="header-stat-item">
// // // //                   <span className="stat-label">Projects</span>
// // // //                   <span className="stat-value-sm">{dashboard.activeProjects} active</span>
// // // //                 </div>
// // // //               </>
// // // //             )}
// // // //           </div>
// // // //         </header>

// // // //         {/* ====== NO PROFILE → SHOW REGISTER CTA ====== */}
// // // //         {noProfile && activeNav === 'dashboard' && (
// // // //           <div className="dashboard-card">
// // // //             <div className="card-header">
// // // //               <h2>Become a Partner</h2>
// // // //               <p className="card-subtitle">Register as a partner to manage clients, projects & payments</p>
// // // //             </div>
// // // //             <div style={{ padding: '2rem 0', textAlign: 'center' }}>
// // // //               <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>🤝</div>
// // // //               <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
// // // //                 You haven't registered as a partner yet. Submit your application to get started.
// // // //               </p>
// // // //               <button className="btn-msub" style={{ maxWidth: 320, margin: '0 auto' }} onClick={() => setShowRegisterModal(true)}>
// // // //                 Register as Partner
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* ====== DASHBOARD TAB (Partner) ====== */}
// // // //         {activeNav === 'dashboard' && profile && dashboard && (
// // // //           <>
// // // //             {/* Stats */}
// // // //             <div className="stats-grid">
// // // //               <div className="stat-card">
// // // //                 <div className="stat-icon purple">👥</div>
// // // //                 <div className="stat-info">
// // // //                   <span className="stat-value">{dashboard.totalClients}</span>
// // // //                   <span className="stat-label">Total Clients</span>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="stat-card">
// // // //                 <div className="stat-icon orange">⏳</div>
// // // //                 <div className="stat-info">
// // // //                   <span className="stat-value">{dashboard.pendingClients}</span>
// // // //                   <span className="stat-label">Pending Clients</span>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="stat-card">
// // // //                 <div className="stat-icon green">🚀</div>
// // // //                 <div className="stat-info">
// // // //                   <span className="stat-value">{dashboard.activeProjects}</span>
// // // //                   <span className="stat-label">Active Projects</span>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="stat-card">
// // // //                 <div className="stat-icon blue">💰</div>
// // // //                 <div className="stat-info">
// // // //                   <span className="stat-value" style={{ fontSize: '1.4rem' }}>{formatMoney(dashboard.totalApprovedRevenue)}</span>
// // // //                   <span className="stat-label">Approved Revenue</span>
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             {/* Partner info card */}
// // // //             <div className="dashboard-card">
// // // //               <div className="card-header">
// // // //                 <h2>Partner Profile</h2>
// // // //                 {getStatusBadge(profile.partnerStatus)}
// // // //               </div>
// // // //               <div className="details-grid">
// // // //                 <div className="detail-item"><label>Company</label><span>{profile.companyName}</span></div>
// // // //                 <div className="detail-item"><label>Partner Code</label><span style={{ color: 'var(--teal)', fontWeight: 600 }}>{profile.partnerCode}</span></div>
// // // //                 <div className="detail-item"><label>Contact</label><span>{profile.partnerName}</span></div>
// // // //                 <div className="detail-item"><label>Email</label><span>{profile.partnerEmail}</span></div>
// // // //                 <div className="detail-item"><label>Agreement</label><span>{profile.agreementType} · {profile.agreementValue}</span></div>
// // // //                 <div className="detail-item"><label>Validity</label><span>{formatDate(profile.agreementStartDate)} → {formatDate(profile.agreementEndDate)}</span></div>
// // // //                 <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
// // // //                   <label>Services</label>
// // // //                   <div className="skills-tags">
// // // //                     {profile.servicesOffered?.map((s) => (
// // // //                       <span key={s} className="skill-tag">{s.replace('_', ' ')}</span>
// // // //                     ))}
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //               {profile.directorNote && (
// // // //                 <div className="warning-banner" style={{ marginTop: '1rem' }}>
// // // //                   <strong>Director Note:</strong> {profile.directorNote}
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             {/* Recent clients */}
// // // //             <div className="dashboard-card">
// // // //               <div className="card-header">
// // // //                 <h2>Recent Clients</h2>
// // // //                 <button className="view-all-link" onClick={() => setActiveNav('my-clients')}>View All →</button>
// // // //               </div>
// // // //               <div className="projects-grid">
// // // //                 {dashboard.recentClients?.slice(0, 3).map((c) => (
// // // //                   <div key={c.mappingId} className="project-card">
// // // //                     <div className="project-card-header">
// // // //                       <h3>{c.name}</h3>
// // // //                       {getStatusBadge(c.isApproved ? 'APPROVED' : 'PENDING')}
// // // //                     </div>
// // // //                     <p className="project-card-desc">{c.companyName}</p>
// // // //                     <div className="project-card-meta">
// // // //                       <span>✉ {c.email}</span>
// // // //                       {c.phoneNumber && <span>📞 {c.phoneNumber}</span>}
// // // //                     </div>
// // // //                     <div className="project-card-actions">
// // // //                       <button className="btn-sm btn-primary" onClick={() => handleViewClient(c)}>View Details</button>
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //               {(!dashboard.recentClients || dashboard.recentClients.length === 0) && (
// // // //                 <div className="empty-state">
// // // //                   <span className="empty-icon">📭</span>
// // // //                   <p>No clients yet. Create your first client!</p>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </>
// // // //         )}

// // // //         {/* ====== MY CLIENTS TAB ====== */}
// // // //         {activeNav === 'my-clients' && (
// // // //           <div className="dashboard-card full-width">
// // // //             <div className="card-header">
// // // //               <h2>My Clients</h2>
// // // //               <button className="btn-primary" onClick={() => setShowCreateClientModal(true)} disabled={!canCreate}>
// // // //                 + New Client
// // // //               </button>
// // // //             </div>
// // // //             {!canCreate && (
// // // //               <div className="warning-banner" style={{ marginBottom: '1rem' }}>
// // // //                 ⚠️ Partner account is <strong>{profile?.partnerStatus}</strong>. You need APPROVED status to create clients.
// // // //               </div>
// // // //             )}
// // // //             <div className="projects-grid">
// // // //               {clients.map((c) => (
// // // //                 <div key={c.mappingId} className="project-card">
// // // //                   <div className="project-card-header">
// // // //                     <h3>{c.name}</h3>
// // // //                     {getStatusBadge(c.isApproved ? 'APPROVED' : 'PENDING')}
// // // //                   </div>
// // // //                   <p className="project-card-desc">{c.companyName}</p>
// // // //                   <div className="project-card-meta">
// // // //                     <span>✉ {c.email}</span>
// // // //                     {c.phoneNumber && <span>📞 {c.phoneNumber}</span>}
// // // //                     <span>📅 {formatDate(c.assignedAt)}</span>
// // // //                   </div>
// // // //                   {c.notes && <div className="project-card-manager">📝 {c.notes}</div>}
// // // //                   <div className="project-card-actions">
// // // //                     <button className="btn-sm btn-primary" onClick={() => handleViewClient(c)}>View Details</button>
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //             {clients.length === 0 && (
// // // //               <div className="empty-state">
// // // //                 <span className="empty-icon">👥</span>
// // // //                 <p>No clients yet. Create your first client to get started.</p>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         )}

// // // //         {/* ====== MY DETAILS TAB ====== */}
// // // //         {activeNav === 'my-details' && profile && (
// // // //           <div className="dashboard-card full-width">
// // // //             <div className="card-header">
// // // //               <h2>My Partner Details</h2>
// // // //               {getStatusBadge(profile.partnerStatus)}
// // // //             </div>
// // // //             <div className="details-grid">
// // // //               <div className="detail-item"><label>Company Name</label><span>{profile.companyName}</span></div>
// // // //               <div className="detail-item"><label>Company Email</label><span>{profile.companyEmail || '—'}</span></div>
// // // //               <div className="detail-item"><label>Company Mobile</label><span>{profile.companyMobileNumber || '—'}</span></div>
// // // //               <div className="detail-item"><label>Company Website</label><span>{profile.companyWebsite || '—'}</span></div>
// // // //               <div className="detail-item"><label>Contact Person</label><span>{profile.contactPersonName || '—'}</span></div>
// // // //               <div className="detail-item"><label>Designation</label><span>{profile.contactPersonDesignation || '—'}</span></div>
// // // //               <div className="detail-item"><label>Partner Code</label><span style={{ color: 'var(--teal)', fontWeight: 600 }}>{profile.partnerCode}</span></div>
// // // //               <div className="detail-item"><label>Agreement Type</label><span>{profile.agreementType}</span></div>
// // // //               <div className="detail-item"><label>Agreement Value</label><span>{profile.agreementValue}</span></div>
// // // //               <div className="detail-item"><label>Start Date</label><span>{formatDate(profile.agreementStartDate)}</span></div>
// // // //               <div className="detail-item"><label>End Date</label><span>{formatDate(profile.agreementEndDate)}</span></div>
// // // //               <div className="detail-item"><label>Approved</label><span>{profile.isApproved ? '✅ Yes' : '❌ No'}</span></div>
// // // //               <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
// // // //                 <label>Services Offered</label>
// // // //                 <div className="skills-tags">
// // // //                   {profile.servicesOffered?.map((s) => (
// // // //                     <span key={s} className="skill-tag">{s.replace('_', ' ')}</span>
// // // //                   ))}
// // // //                 </div>
// // // //               </div>
// // // //               <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
// // // //                 <label>Agreement PDF</label>
// // // //                 <a href={profile.agreementPdfDriveLink} target="_blank" rel="noopener noreferrer" className="resume-link">
// // // //                   📄 View Agreement
// // // //                 </a>
// // // //               </div>
// // // //             </div>
// // // //             {profile.directorNote && (
// // // //               <div className="warning-banner" style={{ marginTop: '1rem' }}>
// // // //                 <strong>Director Note:</strong> {profile.directorNote}
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         )}

// // // //         {/* ====== ALL PARTNERS TAB (Director) ====== */}
// // // //         {activeNav === 'all-partners' && isDirector && (
// // // //           <div className="dashboard-card full-width">
// // // //             <div className="card-header">
// // // //               <h2>All Partners</h2>
// // // //               <span className="activity-badge">{allPartners.length} total</span>
// // // //             </div>
// // // //             <div className="projects-grid">
// // // //               {allPartners.map((p) => (
// // // //                 <div key={p.partnerId} className="project-card">
// // // //                   <div className="project-card-header">
// // // //                     <h3>{p.companyName}</h3>
// // // //                     {getStatusBadge(p.partnerStatus)}
// // // //                   </div>
// // // //                   <p className="project-card-desc">{p.partnerName} · {p.partnerCode}</p>
// // // //                   <div className="project-card-meta">
// // // //                     <span>✉ {p.partnerEmail}</span>
// // // //                     <span>👥 {p.totalClients} clients</span>
// // // //                     <span>📋 {p.agreementType}</span>
// // // //                   </div>
// // // //                   <div className="project-card-actions">
// // // //                     <button className="btn-sm btn-primary" onClick={() => handleViewPartner(p)}>View Details</button>
// // // //                     {p.partnerStatus !== 'APPROVED' && (
// // // //                       <button className="btn-sm btn-outline" onClick={() => handleUpdateStatus(p.partnerId, 'APPROVED')} disabled={busy}>
// // // //                         ✅ Approve
// // // //                       </button>
// // // //                     )}
// // // //                     {p.partnerStatus === 'APPROVED' && (
// // // //                       <button className="btn-sm btn-outline" onClick={() => handleUpdateStatus(p.partnerId, 'BLOCKED')} disabled={busy}>
// // // //                         🔴 Block
// // // //                       </button>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //             {allPartners.length === 0 && (
// // // //               <div className="empty-state">
// // // //                 <span className="empty-icon">🤝</span>
// // // //                 <p>No partners found.</p>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         )}

// // // //         {/* ====== PROFILE TAB ====== */}
// // // //         {activeNav === 'profile' && (
// // // //           <div className="dashboard-card full-width">
// // // //             <div className="card-header">
// // // //               <h2>Profile Information</h2>
// // // //             </div>
// // // //             <div className="profile-info">
// // // //               <div className="profile-avatar-large">
// // // //                 {user?.photoUrl ? (
// // // //                   <img src={user.photoUrl} alt={user.name} />
// // // //                 ) : (
// // // //                   <div className="avatar-placeholder">{user?.name?.charAt(0) || 'P'}</div>
// // // //                 )}
// // // //               </div>
// // // //               <div className="profile-details">
// // // //                 <div className="detail-item"><label>Full Name</label><span>{user?.name}</span></div>
// // // //                 <div className="detail-item"><label>Email</label><span>{user?.email}</span></div>
// // // //                 <div className="detail-item"><label>Role</label><span>Partner</span></div>
// // // //                 <div className="detail-item"><label>Phone</label><span>{user?.phoneNumber || 'Not provided'}</span></div>
// // // //                 <div className="detail-item"><label>Address</label><span>{user?.address || 'Not provided'}</span></div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         <footer className="client-footer">
// // // //           <p>© 2026 Softmax Nexus | Developed by <a href="https://softmax.in" style={{ color: 'skyblue' }}>Softmax.in</a></p>
// // // //         </footer>
// // // //       </main>

// // // //       {/* ============ MODALS ============ */}

// // // //       {/* Register Partner Modal */}
// // // //       {showRegisterModal && (
// // // //         <div className="modal-mask open">
// // // //           <div className="modal-box large">
// // // //             <button className="m-close" onClick={() => setShowRegisterModal(false)}>✕</button>
// // // //             <h2>Register as Partner</h2>
// // // //             <div className="m-form">
// // // //               <div className="details-grid">
// // // //                 <div className="form-field">
// // // //                   <label>Company Name *</label>
// // // //                   <input value={registerForm.companyName} onChange={(e) => setRegisterForm({ ...registerForm, companyName: e.target.value })} placeholder="XYZ Partners Pvt Ltd" />
// // // //                 </div>
// // // //                 <div className="form-field">
// // // //                   <label>Company Email</label>
// // // //                   <input type="email" value={registerForm.companyEmail} onChange={(e) => setRegisterForm({ ...registerForm, companyEmail: e.target.value })} />
// // // //                 </div>
// // // //                 <div className="form-field">
// // // //                   <label>Company Mobile</label>
// // // //                   <input value={registerForm.companyMobileNumber} onChange={(e) => setRegisterForm({ ...registerForm, companyMobileNumber: e.target.value })} />
// // // //                 </div>
// // // //                 <div className="form-field">
// // // //                   <label>Website</label>
// // // //                   <input value={registerForm.companyWebsite} onChange={(e) => setRegisterForm({ ...registerForm, companyWebsite: e.target.value })} />
// // // //                 </div>
// // // //                 <div className="form-field">
// // // //                   <label>Contact Person</label>
// // // //                   <input value={registerForm.contactPersonName} onChange={(e) => setRegisterForm({ ...registerForm, contactPersonName: e.target.value })} />
// // // //                 </div>
// // // //                 <div className="form-field">
// // // //                   <label>Designation</label>
// // // //                   <input value={registerForm.contactPersonDesignation} onChange={(e) => setRegisterForm({ ...registerForm, contactPersonDesignation: e.target.value })} />
// // // //                 </div>
// // // //                 <div className="form-field" style={{ gridColumn: '1 / -1' }}>
// // // //                   <label>Address</label>
// // // //                   <textarea value={registerForm.companyAddress} onChange={(e) => setRegisterForm({ ...registerForm, companyAddress: e.target.value })} rows={2} />
// // // //                 </div>
// // // //                 <div className="form-field" style={{ gridColumn: '1 / -1' }}>
// // // //                   <label>Services Offered</label>
// // // //                   <div className="skills-tags">
// // // //                     {SERVICES.map((s) => (
// // // //                       <span
// // // //                         key={s}
// // // //                         className="skill-tag"
// // // //                         style={{
// // // //                           cursor: 'pointer',
// // // //                           background: registerForm.servicesOffered.includes(s) ? 'var(--teal)' : 'rgba(44,166,164,0.1)',
// // // //                           color: registerForm.servicesOffered.includes(s) ? 'white' : 'var(--teal)',
// // // //                         }}
// // // //                         onClick={() =>
// // // //                           setRegisterForm({
// // // //                             ...registerForm,
// // // //                             servicesOffered: registerForm.servicesOffered.includes(s)
// // // //                               ? registerForm.servicesOffered.filter((x) => x !== s)
// // // //                               : [...registerForm.servicesOffered, s],
// // // //                           })
// // // //                         }
// // // //                       >
// // // //                         {s.replace('_', ' ')}
// // // //                       </span>
// // // //                     ))}
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="form-field">
// // // //                   <label>Agreement Type *</label>
// // // //                   <select value={registerForm.agreementType} onChange={(e) => setRegisterForm({ ...registerForm, agreementType: e.target.value })}>
// // // //                     {AGREEMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
// // // //                   </select>
// // // //                 </div>
// // // //                 <div className="form-field">
// // // //                   <label>Agreement Value</label>
// // // //                   <input type="number" step="0.01" value={registerForm.agreementValue} onChange={(e) => setRegisterForm({ ...registerForm, agreementValue: e.target.value })} placeholder="15" />
// // // //                 </div>
// // // //                 <div className="form-field" style={{ gridColumn: '1 / -1' }}>
// // // //                   <label>Agreement PDF Drive Link *</label>
// // // //                   <input value={registerForm.agreementPdfDriveLink} onChange={(e) => setRegisterForm({ ...registerForm, agreementPdfDriveLink: e.target.value })} placeholder="https://drive.google.com/..." />
// // // //                 </div>
// // // //                 <div className="form-field">
// // // //                   <label>Start Date</label>
// // // //                   <input type="date" value={registerForm.agreementStartDate} onChange={(e) => setRegisterForm({ ...registerForm, agreementStartDate: e.target.value })} />
// // // //                 </div>
// // // //                 <div className="form-field">
// // // //                   <label>End Date</label>
// // // //                   <input type="date" value={registerForm.agreementEndDate} onChange={(e) => setRegisterForm({ ...registerForm, agreementEndDate: e.target.value })} />
// // // //                 </div>
// // // //                 <div className="form-field" style={{ gridColumn: '1 / -1' }}>
// // // //                   <label>Internal Notes</label>
// // // //                   <textarea value={registerForm.internalNotes} onChange={(e) => setRegisterForm({ ...registerForm, internalNotes: e.target.value })} rows={2} />
// // // //                 </div>
// // // //               </div>
// // // //               <button className="btn-msub" onClick={handleRegisterPartner} disabled={busy}>
// // // //                 {busy ? 'Submitting…' : 'Submit Registration'}
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Create Client Modal */}
// // // //       {showCreateClientModal && (
// // // //         <div className="modal-mask open">
// // // //           <div className="modal-box large">
// // // //             <button className="m-close" onClick={() => setShowCreateClientModal(false)}>✕</button>
// // // //             <h2>Create Client</h2>
// // // //             <div className="m-form">
// // // //               <div className="details-grid">
// // // //                 <div className="form-field"><label>Client Email *</label><input type="email" value={clientForm.email} onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })} /></div>
// // // //                 <div className="form-field"><label>Client Name *</label><input value={clientForm.name} onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })} /></div>
// // // //                 <div className="form-field" style={{ gridColumn: '1 / -1' }}><label>Company Name *</label><input value={clientForm.companyName} onChange={(e) => setClientForm({ ...clientForm, companyName: e.target.value })} /></div>
// // // //                 <div className="form-field"><label>Phone</label><input value={clientForm.phoneNumber} onChange={(e) => setClientForm({ ...clientForm, phoneNumber: e.target.value })} /></div>
// // // //                 <div className="form-field">
// // // //                   <label>Gender</label>
// // // //                   <select value={clientForm.gender} onChange={(e) => setClientForm({ ...clientForm, gender: e.target.value })}>
// // // //                     <option value="">—</option>
// // // //                     <option value="MALE">Male</option>
// // // //                     <option value="FEMALE">Female</option>
// // // //                     <option value="OTHER">Other</option>
// // // //                   </select>
// // // //                 </div>
// // // //                 <div className="form-field"><label>DOB</label><input type="date" value={clientForm.dob} onChange={(e) => setClientForm({ ...clientForm, dob: e.target.value })} /></div>
// // // //                 <div className="form-field"><label>Photo URL</label><input value={clientForm.photoUrl} onChange={(e) => setClientForm({ ...clientForm, photoUrl: e.target.value })} /></div>
// // // //                 <div className="form-field" style={{ gridColumn: '1 / -1' }}><label>Address</label><textarea value={clientForm.address} onChange={(e) => setClientForm({ ...clientForm, address: e.target.value })} rows={2} /></div>
// // // //                 <div className="form-field"><label>Company Mobile</label><input value={clientForm.companyMobileNumber} onChange={(e) => setClientForm({ ...clientForm, companyMobileNumber: e.target.value })} /></div>
// // // //                 <div className="form-field"><label>Company Email</label><input type="email" value={clientForm.companyEmail} onChange={(e) => setClientForm({ ...clientForm, companyEmail: e.target.value })} /></div>
// // // //                 <div className="form-field"><label>Org Type</label><input value={clientForm.orgType} onChange={(e) => setClientForm({ ...clientForm, orgType: e.target.value })} /></div>
// // // //                 <div className="form-field"><label>Client Type</label><input value={clientForm.clientType} onChange={(e) => setClientForm({ ...clientForm, clientType: e.target.value })} /></div>
// // // //                 <div className="form-field" style={{ gridColumn: '1 / -1' }}><label>Website</label><input value={clientForm.clientWebsite} onChange={(e) => setClientForm({ ...clientForm, clientWebsite: e.target.value })} /></div>
// // // //                 <div className="form-field" style={{ gridColumn: '1 / -1' }}><label>Notes</label><textarea value={clientForm.notes} onChange={(e) => setClientForm({ ...clientForm, notes: e.target.value })} rows={2} /></div>
// // // //               </div>
// // // //               <button className="btn-msub" onClick={handleCreateClient} disabled={busy}>
// // // //                 {busy ? 'Creating…' : 'Create Client'}
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Client Detail Modal */}
// // // //       {showClientDetailModal && selectedClient && (
// // // //         <div className="modal-mask open">
// // // //           <div className="modal-box large">
// // // //             <button className="m-close" onClick={() => setShowClientDetailModal(false)}>✕</button>
// // // //             <h2>{selectedClient.name} — {selectedClient.companyName}</h2>
// // // //             <div className="m-tabs">
// // // //               <button className="m-tab active">📋 Overview</button>
// // // //             </div>
// // // //             <div className="project-detail-section">
// // // //               <div className="detail-grid">
// // // //                 <div><label>Email:</label> {selectedClient.email}</div>
// // // //                 <div><label>Phone:</label> {selectedClient.phoneNumber || '—'}</div>
// // // //                 <div><label>Status:</label> {getStatusBadge(selectedClient.isApproved ? 'APPROVED' : 'PENDING')}</div>
// // // //                 <div><label>Assigned:</label> {formatDate(selectedClient.assignedAt)}</div>
// // // //                 <div><label>Company Email:</label> {selectedClient.companyEmail || '—'}</div>
// // // //               </div>
// // // //               {selectedClient.notes && (
// // // //                 <div className="detail-row" style={{ marginTop: '1rem' }}>
// // // //                   <label>Notes:</label>
// // // //                   <p>{selectedClient.notes}</p>
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             {/* Projects */}
// // // //             <div style={{ marginTop: '1.5rem' }}>
// // // //               <div className="card-header" style={{ marginBottom: '0.75rem' }}>
// // // //                 <h3>Projects ({clientProjects.length})</h3>
// // // //                 <button className="btn-primary btn-sm" onClick={() => setShowCreateProjectModal(true)} disabled={!canCreate}>
// // // //                   + New Project
// // // //                 </button>
// // // //               </div>
// // // //               {clientProjects.length === 0 ? (
// // // //                 <div className="empty-state"><span className="empty-icon">🚀</span><p>No projects yet.</p></div>
// // // //               ) : (
// // // //                 <div className="projects-grid">
// // // //                   {clientProjects.map((p) => (
// // // //                     <div key={p.projectId} className="project-card">
// // // //                       <div className="project-card-header">
// // // //                         <h3>{p.projectName}</h3>
// // // //                         {getStatusBadge(p.status)}
// // // //                       </div>
// // // //                       <p className="project-card-desc">{p.projectDescription || '—'}</p>
// // // //                       <div className="project-card-meta">
// // // //                         <span>🧩 {p.projectType || '—'}</span>
// // // //                         <span>🏢 {p.departmentName || 'No dept'}</span>
// // // //                         <span>💰 {p.cost ? formatMoney(p.cost) : '—'}</span>
// // // //                       </div>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             {/* Payments */}
// // // //             <div style={{ marginTop: '1.5rem' }}>
// // // //               <div className="card-header" style={{ marginBottom: '0.75rem' }}>
// // // //                 <h3>Payments ({clientPayments.length})</h3>
// // // //               </div>
// // // //               {clientPayments.length === 0 ? (
// // // //                 <div className="empty-state"><span className="empty-icon">💳</span><p>No payments yet.</p></div>
// // // //               ) : (
// // // //                 <div className="files-list">
// // // //                   {clientPayments.map((pay) => (
// // // //                     <div key={pay.paymentId} className="file-item">
// // // //                       <div className="file-icon">{pay.status === 'APPROVED' ? '✅' : '⏳'}</div>
// // // //                       <div className="file-info">
// // // //                         <div className="file-name">{pay.transactionId}</div>
// // // //                         <div className="file-meta">
// // // //                           <span className="file-type">{pay.type}</span>
// // // //                           <span>{formatDate(pay.dateTime)}</span>
// // // //                         </div>
// // // //                       </div>
// // // //                       <div style={{ fontWeight: 700, color: pay.status === 'APPROVED' ? 'var(--teal)' : 'var(--orange)' }}>
// // // //                         {formatMoney(pay.amount)}
// // // //                       </div>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Create Project Modal */}
// // // //       {showCreateProjectModal && selectedClient && (
// // // //         <div className="modal-mask open">
// // // //           <div className="modal-box">
// // // //             <button className="m-close" onClick={() => setShowCreateProjectModal(false)}>✕</button>
// // // //             <h2>New Project — {selectedClient.name}</h2>
// // // //             <div className="m-form">
// // // //               <div className="form-field">
// // // //                 <label>Project Name *</label>
// // // //                 <input value={projectForm.projectName} onChange={(e) => setProjectForm({ ...projectForm, projectName: e.target.value })} />
// // // //               </div>
// // // //               <div className="form-field">
// // // //                 <label>Description</label>
// // // //                 <textarea value={projectForm.projectDescription} onChange={(e) => setProjectForm({ ...projectForm, projectDescription: e.target.value })} rows={3} />
// // // //               </div>
// // // //               <div className="form-field">
// // // //                 <label>Type</label>
// // // //                 <select value={projectForm.projectType} onChange={(e) => setProjectForm({ ...projectForm, projectType: e.target.value })}>
// // // //                   <option value="WEB">WEB</option>
// // // //                   <option value="MOBILE">MOBILE</option>
// // // //                   <option value="DESKTOP">DESKTOP</option>
// // // //                   <option value="OTHER">OTHER</option>
// // // //                 </select>
// // // //               </div>
// // // //               <div className="form-field">
// // // //                 <label>Department ID</label>
// // // //                 <input type="number" value={projectForm.departmentId} onChange={(e) => setProjectForm({ ...projectForm, departmentId: e.target.value })} />
// // // //               </div>
// // // //               <div className="form-field">
// // // //                 <label>Cost</label>
// // // //                 <input value={projectForm.cost} onChange={(e) => setProjectForm({ ...projectForm, cost: e.target.value })} placeholder="25000" />
// // // //               </div>
// // // //               <div className="form-field">
// // // //                 <label>Deadline</label>
// // // //                 <input type="datetime-local" value={projectForm.deadline} onChange={(e) => setProjectForm({ ...projectForm, deadline: e.target.value })} />
// // // //               </div>
// // // //               <button className="btn-msub" onClick={handleCreateProject} disabled={busy}>
// // // //                 {busy ? 'Creating…' : 'Create Project'}
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Partner Detail Modal (Director) */}
// // // //       {showPartnerDetailModal && selectedPartner && (
// // // //         <div className="modal-mask open">
// // // //           <div className="modal-box large">
// // // //             <button className="m-close" onClick={() => setShowPartnerDetailModal(false)}>✕</button>
// // // //             <h2>{selectedPartner.companyName}</h2>
// // // //             <div className="m-tabs">
// // // //               <button className="m-tab active">📋 Details</button>
// // // //             </div>
// // // //             <div className="details-grid">
// // // //               <div className="detail-item"><label>Partner Code</label><span>{selectedPartner.partnerCode}</span></div>
// // // //               <div className="detail-item"><label>Partner Name</label><span>{selectedPartner.partnerName}</span></div>
// // // //               <div className="detail-item"><label>Email</label><span>{selectedPartner.partnerEmail}</span></div>
// // // //               <div className="detail-item"><label>Company Email</label><span>{selectedPartner.companyEmail}</span></div>
// // // //               <div className="detail-item"><label>Mobile</label><span>{selectedPartner.companyMobileNumber || '—'}</span></div>
// // // //               <div className="detail-item"><label>Website</label><span>{selectedPartner.companyWebsite || '—'}</span></div>
// // // //               <div className="detail-item"><label>Agreement</label><span>{selectedPartner.agreementType} · {selectedPartner.agreementValue}</span></div>
// // // //               <div className="detail-item"><label>Status</label><span>{getStatusBadge(selectedPartner.partnerStatus)}</span></div>
// // // //               <div className="detail-item"><label>Total Clients</label><span>{selectedPartner.totalClients}</span></div>
// // // //               <div className="detail-item"><label>Active Clients</label><span>{selectedPartner.activeClients}</span></div>
// // // //             </div>
// // // //             <div style={{ marginTop: '1rem' }}>
// // // //               <label style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase' }}>Services</label>
// // // //               <div className="skills-tags" style={{ marginTop: '0.3rem' }}>
// // // //                 {selectedPartner.servicesOffered?.map((s) => (
// // // //                   <span key={s} className="skill-tag">{s.replace('_', ' ')}</span>
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //             {selectedPartner.directorNote && (
// // // //               <div className="warning-banner" style={{ marginTop: '1rem' }}>
// // // //                 <strong>Note:</strong> {selectedPartner.directorNote}
// // // //               </div>
// // // //             )}
// // // //             <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
// // // //               {['PENDING', 'APPROVED', 'BLOCKED', 'DEACTIVATED']
// // // //                 .filter((s) => s !== selectedPartner.partnerStatus)
// // // //                 .map((s) => (
// // // //                   <button
// // // //                     key={s}
// // // //                     className={s === 'APPROVED' ? 'btn-primary btn-sm' : s === 'PENDING' ? 'btn-outline btn-sm' : 'btn-danger btn-sm'}
// // // //                     onClick={() => handleUpdateStatus(selectedPartner.partnerId, s)}
// // // //                     disabled={busy}
// // // //                   >
// // // //                     Set {s}
// // // //                   </button>
// // // //                 ))}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Toast */}
// // // //       {toast && (
// // // //         <div style={{
// // // //           position: 'fixed', bottom: '1.5rem', right: '1.5rem',
// // // //           padding: '0.85rem 1.25rem', borderRadius: 12,
// // // //           fontSize: '0.85rem', fontWeight: 600, color: '#fff',
// // // //           background: toast.type === 'ok' ? 'var(--g-main)' : 'linear-gradient(135deg,#FE9496,#A05AFF)',
// // // //           boxShadow: '0 10px 30px rgba(15,23,42,0.2)', zIndex: 2000,
// // // //           maxWidth: 360,
// // // //         }}>
// // // //           {toast.msg}
// // // //         </div>
// // // //       )}

// // // //       <style jsx>{`
// // // //         .activity-badge {
// // // //           background: var(--surface);
// // // //           border: 1px solid var(--border);
// // // //           border-radius: 20px;
// // // //           padding: 0.25rem 0.75rem;
// // // //           font-size: 0.75rem;
// // // //           color: var(--muted);
// // // //         }
// // // //         .empty-state {
// // // //           text-align: center;
// // // //           padding: 3rem;
// // // //           color: var(--muted);
// // // //         }
// // // //         .empty-icon {
// // // //           font-size: 3rem;
// // // //           display: block;
// // // //           margin-bottom: 1rem;
// // // //           opacity: 0.5;
// // // //         }
// // // //         .warning-banner {
// // // //           padding: 0.75rem 1rem;
// // // //           background: rgba(254, 148, 150, 0.1);
// // // //           border: 1px solid var(--orange);
// // // //           border-radius: 10px;
// // // //           font-size: 0.8rem;
// // // //           color: var(--orange);
// // // //         }
// // // //         .skills-tags {
// // // //           display: flex;
// // // //           flex-wrap: wrap;
// // // //           gap: 0.3rem;
// // // //         }
// // // //         .skill-tag {
// // // //           background: rgba(44, 166, 164, 0.1);
// // // //           color: var(--teal);
// // // //           padding: 0.2rem 0.5rem;
// // // //           border-radius: 12px;
// // // //           font-size: 0.7rem;
// // // //         }
// // // //         .resume-link {
// // // //           color: var(--teal);
// // // //           text-decoration: none;
// // // //           font-weight: 600;
// // // //         }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Partner;

// // // //@ts-nocheck
// // // 'use client';

// // // import React, { useState, useEffect, useMemo } from 'react';
// // // import axios from 'axios';
// // // import CommonSidebar from './components/CommonSidebar';
// // // import { useAuth } from '@/contexts/AuthContext';

// // // // ============================================
// // // // TYPES
// // // // ============================================

// // // interface UserProfile {
// // //   userId: number; uid: string; name: string; email: string;
// // //   photoUrl: string | null; emailVerified: boolean; isProfileCompleted: boolean;
// // //   phoneNumber?: string; address?: string; gender?: string; dob?: string;
// // // }

// // // interface Partner {
// // //   partnerId: number; userId: number; partnerCode: string; partnerName: string;
// // //   partnerEmail: string; partnerPhotoUrl?: string | null; companyName: string;
// // //   companyEmail: string; companyMobileNumber?: string; companyWebsite?: string;
// // //   companyAddress?: string; contactPersonName?: string; contactPersonDesignation?: string;
// // //   servicesOffered: string[]; agreementType: string; agreementValue: number;
// // //   agreementPdfDriveLink: string; agreementStartDate?: string; agreementEndDate?: string;
// // //   partnerStatus: string; isApproved: boolean; directorNote?: string | null;
// // //   totalClients: number; activeClients: number; createdAt: string; updatedAt: string;
// // // }

// // // interface PartnerDashboard {
// // //   partnerId: number; partnerCode: string; companyName: string; partnerStatus: string;
// // //   totalClients: number; approvedClients: number; pendingClients: number;
// // //   totalProjects: number; activeProjects: number; completedProjects: number;
// // //   totalPaymentsCount: number; totalApprovedRevenue: number; totalPendingRevenue: number;
// // //   recentClients: Client[];
// // // }

// // // interface Client {
// // //   mappingId: number; clientId: number; userId: number; name: string; email: string;
// // //   phoneNumber?: string; companyName: string; companyEmail?: string; clientStatus: string;
// // //   isApproved: boolean; assignedAt: string; mappingStatus: string; notes?: string | null;
// // // }

// // // interface Project {
// // //   projectId: number; projectName: string; projectDescription?: string;
// // //   projectType?: string; status: string; cost?: string; deadline?: string;
// // //   departmentId?: number; departmentName?: string; createdAt: string; updatedAt: string;
// // // }

// // // interface Payment {
// // //   paymentId: number; transactionId: string; dateTime: string; type: string;
// // //   amount: string; status: string; user?: { userId: number; name: string; email: string };
// // //   paymentNote?: string; approvedBy?: { userId: number; name: string };
// // //   approvedAt?: string; directorNote?: string;
// // // }

// // // // ============================================
// // // // API
// // // // ============================================

// // // const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// // // const apiCall = async <T,>(method: string, endpoint: string, data?: any): Promise<T> => {
// // //   try {
// // //     const config: any = { method, url: `${API_BASE}${endpoint}`, withCredentials: true };
// // //     if (data) { config.data = data; config.headers = { 'Content-Type': 'application/json' }; }
// // //     const res = await axios(config);
// // //     return res.data;
// // //   } catch (error: any) {
// // //     throw error.response?.data || error;
// // //   }
// // // };

// // // const registerAsPartner = (payload: any) => apiCall('POST', '/api/partner/register', payload);
// // // const getMyPartnerProfile = () => apiCall<{ success: boolean; data: Partner }>('GET', '/api/partner/me');
// // // const getMyPartnerDashboard = () => apiCall<{ success: boolean; data: PartnerDashboard }>('GET', '/api/partner/me/dashboard');
// // // const getMyPartnerClients = () => apiCall<{ success: boolean; data: Client[] }>('GET', '/api/partner/clients');
// // // const createClient = (payload: any) => apiCall('POST', '/api/partner/clients', payload);
// // // const getClientProjects = (clientId: number) => apiCall<{ success: boolean; data: Project[] }>('GET', `/api/partner/clients/${clientId}/projects`);
// // // const createProjectForClient = (clientId: number, payload: any) => apiCall('POST', `/api/partner/clients/${clientId}/projects`, payload);
// // // const getClientPayments = (clientId: number) => apiCall<{ success: boolean; data: Payment[] }>('GET', `/api/partner/clients/${clientId}/payments`);
// // // const getAllPartners = () => apiCall<{ success: boolean; data: Partner[] }>('GET', '/api/partner/all');
// // // const updatePartnerStatus = (partnerId: number, status: string, note?: string) => {
// // //   let url = `/api/partner/${partnerId}/status?status=${status}`;
// // //   if (note) url += `&note=${encodeURIComponent(note)}`;
// // //   return apiCall('PUT', url, null);
// // // };
// // // const getUserProfile = () => apiCall<{ success: boolean; data: UserProfile }>('GET', '/api/users/profile');

// // // // ============================================
// // // // MENU
// // // // ============================================

// // // const partnerMenuItems = [
// // //   { id: 'dashboard', label: 'Dashboard', icon: '📊' },
// // //   { id: 'my-clients', label: 'My Clients', icon: '👥' },
// // //   { id: 'my-details', label: 'My Details', icon: '📝' },
// // //   { id: 'profile', label: 'Profile', icon: '👤' },
// // // ];
// // // const directorMenuItems = [
// // //   { id: 'dashboard', label: 'Dashboard', icon: '📊' },
// // //   { id: 'all-partners', label: 'All Partners', icon: '🤝' },
// // //   { id: 'profile', label: 'Profile', icon: '👤' },
// // // ];

// // // // ============================================
// // // // HELPERS
// // // // ============================================

// // // const statusConfig: Record<string, { label: string; class: string; icon: string; color: string }> = {
// // //   PENDING: { label: 'Pending', class: 'status-pending', icon: '⏳', color: '#F59E0B' },
// // //   APPROVED: { label: 'Approved', class: 'status-approved', icon: '✅', color: '#10B981' },
// // //   BLOCKED: { label: 'Blocked', class: 'status-rejected', icon: '🔴', color: '#EF4444' },
// // //   DEACTIVATED: { label: 'Deactivated', class: 'status-rejected', icon: '⚪', color: '#6B7280' },
// // //   ACTIVE: { label: 'Active', class: 'status-approved', icon: '🟢', color: '#10B981' },
// // //   IN_PROGRESS: { label: 'In Progress', class: 'status-progress', icon: '🔄', color: '#3B82F6' },
// // //   COMPLETED: { label: 'Completed', class: 'status-completed', icon: '✔️', color: '#10B981' },
// // //   PAID: { label: 'Paid', class: 'status-approved', icon: '💚', color: '#10B981' },
// // //   FAILED: { label: 'Failed', class: 'status-rejected', icon: '❌', color: '#EF4444' },
// // // };

// // // const getStatusBadge = (status: string) => {
// // //   const c = statusConfig[status] || { label: status || 'N/A', class: 'status-pending', icon: '📌', color: '#6B7280' };
// // //   return <span className={`status-badge ${c.class}`}>{c.icon} {c.label}</span>;
// // // };
// // // const formatDate = (d: string) => (!d ? '—' : new Date(d).toLocaleString());
// // // const formatMoney = (n: number | string) => '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });

// // // const SERVICES = ['CLIENT_RELATIONSHIP','SELLING','SECURITY','MARKETING','SUPPORT','DEVELOPMENT','OTHER'];
// // // const AGREEMENT_TYPES = ['PERCENTAGE','MONTHLY','FIXED'];

// // // // ============================================
// // // // MAIN
// // // // ============================================

// // // const Partner: React.FC = () => {
// // //   const [activeNav, setActiveNav] = useState('dashboard');
// // //   const [loading, setLoading] = useState(true);
// // //   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
// // //   const [user, setUser] = useState<UserProfile | null>(null);

// // //   const [profile, setProfile] = useState<Partner | null>(null);
// // //   const [dashboard, setDashboard] = useState<PartnerDashboard | null>(null);
// // //   const [clients, setClients] = useState<Client[]>([]);
// // //   const [noProfile, setNoProfile] = useState(false);

// // //   const [allPartners, setAllPartners] = useState<Partner[]>([]);
// // //   const [isDirector, setIsDirector] = useState(false);

// // //   const [darkMode, setDarkMode] = useState(false);
// // //   const [busy, setBusy] = useState(false);
// // //   const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);

// // //   // ---- Inline view state (replaces modals) ----
// // //   const [showRegisterForm, setShowRegisterForm] = useState(false);
// // //   const [showCreateClientForm, setShowCreateClientForm] = useState(false);
// // //   const [showCreateProjectForm, setShowCreateProjectForm] = useState(false);

// // //   // ---- Selected client (inline detail page) ----
// // //   const [selectedClient, setSelectedClient] = useState<Client | null>(null);
// // //   const [clientProjects, setClientProjects] = useState<Project[]>([]);
// // //   const [clientPayments, setClientPayments] = useState<Payment[]>([]);
// // //   const [loadingClientDetail, setLoadingClientDetail] = useState(false);

// // //   // ---- Filters ----
// // //   const [clientSearch, setClientSearch] = useState('');
// // //   const [clientStatusFilter, setClientStatusFilter] = useState('ALL');
// // //   const [projectSearch, setProjectSearch] = useState('');
// // //   const [projectStatusFilter, setProjectStatusFilter] = useState('ALL');
// // //   const [paymentStatusFilter, setPaymentStatusFilter] = useState('ALL');
// // //   const [partnerSearch, setPartnerSearch] = useState('');
// // //   const [partnerStatusFilter, setPartnerStatusFilter] = useState('ALL');

// // //   // ---- Forms ----
// // //   const [registerForm, setRegisterForm] = useState({
// // //     companyName: '', companyEmail: '', companyMobileNumber: '', companyWebsite: '',
// // //     companyAddress: '', contactPersonName: '', contactPersonDesignation: '',
// // //     servicesOffered: [] as string[], agreementType: 'PERCENTAGE', agreementValue: '',
// // //     agreementPdfDriveLink: '', agreementStartDate: '', agreementEndDate: '', internalNotes: '',
// // //   });
// // //   const [clientForm, setClientForm] = useState({
// // //     email: '', name: '', phoneNumber: '', gender: '', dob: '', photoUrl: '',
// // //     address: '', companyName: '', companyMobileNumber: '', companyEmail: '',
// // //     orgType: '', clientType: '', clientWebsite: '', notes: '',
// // //   });
// // //   const [projectForm, setProjectForm] = useState({
// // //     projectName: '', projectDescription: '', projectType: 'WEB',
// // //     departmentId: '', cost: '', deadline: '',
// // //   });

// // //   const { logout } = useAuth();
// // //   const showToast = (type: 'ok' | 'err', msg: string) => {
// // //     setToast({ type, msg });
// // //     setTimeout(() => setToast(null), 4000);
// // //   };

// // //   // ---------- INIT ----------
// // //   useEffect(() => {
// // //     const saved = localStorage.getItem('theme');
// // //     if (saved === 'dark') { setDarkMode(true); document.documentElement.setAttribute('data-theme', 'dark'); }
// // //     loadInitialData();
// // //   }, []);

// // //   const loadInitialData = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const [profileRes, detailsRes] = await Promise.all([
// // //         getUserProfile().catch(() => ({ data: null })),
// // //         getMyPartnerProfile().catch(() => ({ data: null })),
// // //       ]);
// // //       setUser(profileRes.data);
// // //       if (detailsRes.data) {
// // //         setProfile(detailsRes.data); setNoProfile(false); await loadPartnerData();
// // //       } else setNoProfile(true);

// // //       try {
// // //         const allRes = await getAllPartners();
// // //         setAllPartners(allRes.data || []); setIsDirector(true);
// // //       } catch { setIsDirector(false); }
// // //     } catch (err) { console.error(err); }
// // //     finally { setLoading(false); }
// // //   };

// // //   const loadPartnerData = async () => {
// // //     try {
// // //       const [dashRes, clientsRes] = await Promise.all([
// // //         getMyPartnerDashboard().catch(() => ({ data: null })),
// // //         getMyPartnerClients().catch(() => ({ data: [] })),
// // //       ]);
// // //       setDashboard(dashRes.data || null);
// // //       setClients(clientsRes.data || []);
// // //     } catch (err) { console.error(err); }
// // //   };

// // //   const toggleDarkMode = () => {
// // //     const n = !darkMode; setDarkMode(n);
// // //     document.documentElement.setAttribute('data-theme', n ? 'dark' : 'light');
// // //     localStorage.setItem('theme', n ? 'dark' : 'light');
// // //   };

// // //   const handleLogout = async () => {
// // //     try { await logout(); window.location.href = '/'; }
// // //     catch (e) { console.error(e); }
// // //   };

// // //   // ---------- ACTIONS ----------

// // //   const handleRegisterPartner = async () => {
// // //     if (!registerForm.companyName.trim()) return showToast('err', 'Company name required');
// // //     if (!registerForm.agreementPdfDriveLink.trim()) return showToast('err', 'Agreement PDF link required');
// // //     setBusy(true);
// // //     try {
// // //       const payload: any = {
// // //         companyName: registerForm.companyName.trim(),
// // //         agreementType: registerForm.agreementType,
// // //         agreementPdfDriveLink: registerForm.agreementPdfDriveLink.trim(),
// // //       };
// // //       ['companyEmail','companyMobileNumber','companyWebsite','companyAddress',
// // //        'contactPersonName','contactPersonDesignation','agreementStartDate',
// // //        'agreementEndDate','internalNotes'].forEach(k => {
// // //         if ((registerForm as any)[k]?.trim()) payload[k] = (registerForm as any)[k].trim();
// // //       });
// // //       if (registerForm.servicesOffered.length) payload.servicesOffered = registerForm.servicesOffered;
// // //       if (registerForm.agreementValue) payload.agreementValue = Number(registerForm.agreementValue);

// // //       await registerAsPartner(payload);
// // //       showToast('ok', 'Partner registration submitted. Pending Head Director approval.');
// // //       setShowRegisterForm(false);
// // //       await loadInitialData();
// // //     } catch (err: any) { showToast('err', err?.message || 'Registration failed'); }
// // //     finally { setBusy(false); }
// // //   };

// // //   const handleCreateClient = async () => {
// // //     if (!clientForm.email.trim() || !clientForm.name.trim() || !clientForm.companyName.trim()) {
// // //       return showToast('err', 'Email, name & company name are required');
// // //     }
// // //     setBusy(true);
// // //     try {
// // //       const payload: any = {
// // //         email: clientForm.email.trim(),
// // //         name: clientForm.name.trim(),
// // //         companyName: clientForm.companyName.trim(),
// // //       };
// // //       Object.entries(clientForm).forEach(([k, v]) => {
// // //         if (!['email','name','companyName'].includes(k) && v.trim()) payload[k] = v.trim();
// // //       });
// // //       await createClient(payload);
// // //       showToast('ok', 'Client created successfully');
// // //       setShowCreateClientForm(false);
// // //       setClientForm({
// // //         email: '', name: '', phoneNumber: '', gender: '', dob: '', photoUrl: '',
// // //         address: '', companyName: '', companyMobileNumber: '', companyEmail: '',
// // //         orgType: '', clientType: '', clientWebsite: '', notes: '',
// // //       });
// // //       await loadPartnerData();
// // //     } catch (err: any) { showToast('err', err?.message || 'Failed to create client'); }
// // //     finally { setBusy(false); }
// // //   };

// // //   const openClientDetail = async (client: Client) => {
// // //     setSelectedClient(client);
// // //     setClientProjects([]); setClientPayments([]);
// // //     setLoadingClientDetail(true);
// // //     try {
// // //       const [projRes, payRes] = await Promise.all([
// // //         getClientProjects(client.clientId).catch(() => ({ data: [] })),
// // //         getClientPayments(client.clientId).catch(() => ({ data: [] })),
// // //       ]);
// // //       setClientProjects(projRes.data || []);
// // //       setClientPayments(payRes.data || []);
// // //     } catch { showToast('err', 'Failed to load client details'); }
// // //     finally { setLoadingClientDetail(false); }
// // //   };

// // //   const closeClientDetail = () => {
// // //     setSelectedClient(null); setClientProjects([]); setClientPayments([]);
// // //     setProjectSearch(''); setProjectStatusFilter('ALL'); setPaymentStatusFilter('ALL');
// // //   };

// // //   const handleCreateProject = async () => {
// // //     if (!selectedClient) return;
// // //     if (!projectForm.projectName.trim()) return showToast('err', 'Project name required');
// // //     setBusy(true);
// // //     try {
// // //       const payload: any = { projectName: projectForm.projectName.trim() };
// // //       if (projectForm.projectDescription.trim()) payload.projectDescription = projectForm.projectDescription.trim();
// // //       if (projectForm.projectType) payload.projectType = projectForm.projectType;
// // //       if (projectForm.departmentId) payload.departmentId = Number(projectForm.departmentId);
// // //       if (projectForm.cost) payload.cost = projectForm.cost;
// // //       if (projectForm.deadline)
// // //         payload.deadline = projectForm.deadline.length === 16 ? projectForm.deadline + ':00' : projectForm.deadline;

// // //       await createProjectForClient(selectedClient.clientId, payload);
// // //       showToast('ok', 'Project created successfully');
// // //       setShowCreateProjectForm(false);
// // //       setProjectForm({ projectName: '', projectDescription: '', projectType: 'WEB', departmentId: '', cost: '', deadline: '' });
// // //       const projRes = await getClientProjects(selectedClient.clientId);
// // //       setClientProjects(projRes.data || []);
// // //     } catch (err: any) { showToast('err', err?.message || 'Failed to create project'); }
// // //     finally { setBusy(false); }
// // //   };

// // //   const handleUpdateStatus = async (partnerId: number, status: string) => {
// // //     setBusy(true);
// // //     try {
// // //       await updatePartnerStatus(partnerId, status, `Set to ${status} by Head Director`);
// // //       showToast('ok', 'Partner status updated');
// // //       setAllPartners(prev => prev.map(p =>
// // //         p.partnerId === partnerId ? { ...p, partnerStatus: status, isApproved: status === 'APPROVED' } : p
// // //       ));
// // //     } catch (err: any) { showToast('err', err?.message || 'Failed to update'); }
// // //     finally { setBusy(false); }
// // //   };

// // //   const canCreate = profile?.partnerStatus === 'APPROVED';
// // //   const menuItems = isDirector ? directorMenuItems : partnerMenuItems;

// // //   // ---------- FILTERED DATA ----------
// // //   const filteredClients = useMemo(() => {
// // //     let list = clients;
// // //     if (clientStatusFilter !== 'ALL') {
// // //       list = list.filter(c => (c.isApproved ? 'APPROVED' : 'PENDING') === clientStatusFilter);
// // //     }
// // //     const q = clientSearch.trim().toLowerCase();
// // //     if (q) {
// // //       list = list.filter(c =>
// // //         c.name?.toLowerCase().includes(q) ||
// // //         c.email?.toLowerCase().includes(q) ||
// // //         c.companyName?.toLowerCase().includes(q) ||
// // //         c.phoneNumber?.toLowerCase().includes(q)
// // //       );
// // //     }
// // //     return list;
// // //   }, [clients, clientSearch, clientStatusFilter]);

// // //   const filteredProjects = useMemo(() => {
// // //     let list = clientProjects;
// // //     if (projectStatusFilter !== 'ALL') list = list.filter(p => p.status === projectStatusFilter);
// // //     const q = projectSearch.trim().toLowerCase();
// // //     if (q) list = list.filter(p =>
// // //       p.projectName?.toLowerCase().includes(q) ||
// // //       p.projectDescription?.toLowerCase().includes(q) ||
// // //       p.projectType?.toLowerCase().includes(q)
// // //     );
// // //     return list;
// // //   }, [clientProjects, projectSearch, projectStatusFilter]);

// // //   const filteredPayments = useMemo(() => {
// // //     let list = clientPayments;
// // //     if (paymentStatusFilter !== 'ALL') list = list.filter(p => p.status === paymentStatusFilter);
// // //     return list;
// // //   }, [clientPayments, paymentStatusFilter]);

// // //   const filteredPartners = useMemo(() => {
// // //     let list = allPartners;
// // //     if (partnerStatusFilter !== 'ALL') list = list.filter(p => p.partnerStatus === partnerStatusFilter);
// // //     const q = partnerSearch.trim().toLowerCase();
// // //     if (q) list = list.filter(p =>
// // //       p.companyName?.toLowerCase().includes(q) ||
// // //       p.partnerName?.toLowerCase().includes(q) ||
// // //       p.partnerEmail?.toLowerCase().includes(q) ||
// // //       p.partnerCode?.toLowerCase().includes(q)
// // //     );
// // //     return list;
// // //   }, [allPartners, partnerSearch, partnerStatusFilter]);

// // //   // ---------- LOADER ----------
// // //   if (loading) {
// // //     return <div className="client-loader"><div className="loader-spinner"></div></div>;
// // //   }

// // //   // ============================================
// // //   // RENDER
// // //   // ============================================
// // //   return (
// // //     <div className="client-container">
// // //       <CommonSidebar
// // //         activeNav={activeNav}
// // //         setActiveNav={(id: string) => { setActiveNav(id); setSelectedClient(null); setShowCreateClientForm(false); setShowCreateProjectForm(false); setShowRegisterForm(false); }}
// // //         onLogout={handleLogout}
// // //         onThemeToggle={toggleDarkMode}
// // //         darkMode={darkMode}
// // //         user={user ? { name: user.name, email: user.email, photoUrl: user.photoUrl } : null}
// // //         menuItems={menuItems}
// // //         title="Partner Portal"
// // //         logoIcon="🤝"
// // //         isOpen={mobileSidebarOpen}
// // //         onClose={() => setMobileSidebarOpen(false)}
// // //       />

// // //       <button className="mobile-menu-btn" onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>☰</button>

// // //       <main className="client-main">
// // //         <header className="client-header">
// // //           <div className="header-welcome">
// // //             <h1>Welcome back, {user?.name?.split(' ')[0] || 'Partner'}!</h1>
// // //             <p>Partner Dashboard — Client & Project Management</p>
// // //           </div>
// // //           <div className="header-stats">
// // //             <div className="header-stat-item">
// // //               <span className="stat-label">Status</span>
// // //               <span className="stat-value-sm">
// // //                 {profile ? getStatusBadge(profile.partnerStatus) : <span className="status-badge status-pending">⏳ Not Registered</span>}
// // //               </span>
// // //             </div>
// // //             {dashboard && (
// // //               <>
// // //                 <div className="header-stat-item">
// // //                   <span className="stat-label">Clients</span>
// // //                   <span className="stat-value-sm">{dashboard.totalClients} total</span>
// // //                 </div>
// // //                 <div className="header-stat-item">
// // //                   <span className="stat-label">Projects</span>
// // //                   <span className="stat-value-sm">{dashboard.activeProjects} active</span>
// // //                 </div>
// // //               </>
// // //             )}
// // //           </div>
// // //         </header>

// // //         {/* ================= DASHBOARD ================= */}
// // //         {activeNav === 'dashboard' && (
// // //           <>
// // //             {noProfile && !showRegisterForm && (
// // //               <div className="dashboard-card">
// // //                 <div className="card-header">
// // //                   <h2>Become a Partner</h2>
// // //                   <p className="card-subtitle">Register as a partner to manage clients, projects & payments</p>
// // //                 </div>
// // //                 <div className="empty-hero">
// // //                   <div className="hero-icon">🤝</div>
// // //                   <p className="hero-text">You haven't registered as a partner yet. Submit your application to get started.</p>
// // //                   <button className="btn-primary" onClick={() => setShowRegisterForm(true)}>Register as Partner</button>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {noProfile && showRegisterForm && (
// // //               <div className="dashboard-card full-width">
// // //                 <div className="card-header">
// // //                   <h2>Register as Partner</h2>
// // //                   <button className="btn-outline btn-sm" onClick={() => setShowRegisterForm(false)}>← Cancel</button>
// // //                 </div>
// // //                 <div className="details-grid">
// // //                   <div className="form-field"><label>Company Name *</label><input value={registerForm.companyName} onChange={(e) => setRegisterForm({ ...registerForm, companyName: e.target.value })} placeholder="XYZ Partners Pvt Ltd" /></div>
// // //                   <div className="form-field"><label>Company Email</label><input type="email" value={registerForm.companyEmail} onChange={(e) => setRegisterForm({ ...registerForm, companyEmail: e.target.value })} /></div>
// // //                   <div className="form-field"><label>Company Mobile</label><input value={registerForm.companyMobileNumber} onChange={(e) => setRegisterForm({ ...registerForm, companyMobileNumber: e.target.value })} /></div>
// // //                   <div className="form-field"><label>Website</label><input value={registerForm.companyWebsite} onChange={(e) => setRegisterForm({ ...registerForm, companyWebsite: e.target.value })} /></div>
// // //                   <div className="form-field"><label>Contact Person</label><input value={registerForm.contactPersonName} onChange={(e) => setRegisterForm({ ...registerForm, contactPersonName: e.target.value })} /></div>
// // //                   <div className="form-field"><label>Designation</label><input value={registerForm.contactPersonDesignation} onChange={(e) => setRegisterForm({ ...registerForm, contactPersonDesignation: e.target.value })} /></div>
// // //                   <div className="form-field span-2"><label>Address</label><textarea value={registerForm.companyAddress} onChange={(e) => setRegisterForm({ ...registerForm, companyAddress: e.target.value })} rows={2} /></div>
// // //                   <div className="form-field span-2">
// // //                     <label>Services Offered</label>
// // //                     <div className="skills-tags">
// // //                       {SERVICES.map((s) => {
// // //                         const sel = registerForm.servicesOffered.includes(s);
// // //                         return (
// // //                           <span key={s} className={`skill-tag ${sel ? 'selected' : ''}`}
// // //                             onClick={() => setRegisterForm({
// // //                               ...registerForm,
// // //                               servicesOffered: sel ? registerForm.servicesOffered.filter(x => x !== s) : [...registerForm.servicesOffered, s],
// // //                             })}>
// // //                             {s.replace('_', ' ')}
// // //                           </span>
// // //                         );
// // //                       })}
// // //                     </div>
// // //                   </div>
// // //                   <div className="form-field">
// // //                     <label>Agreement Type *</label>
// // //                     <select value={registerForm.agreementType} onChange={(e) => setRegisterForm({ ...registerForm, agreementType: e.target.value })}>
// // //                       {AGREEMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
// // //                     </select>
// // //                   </div>
// // //                   <div className="form-field"><label>Agreement Value</label><input type="number" step="0.01" value={registerForm.agreementValue} onChange={(e) => setRegisterForm({ ...registerForm, agreementValue: e.target.value })} placeholder="15" /></div>
// // //                   <div className="form-field span-2"><label>Agreement PDF Drive Link *</label><input value={registerForm.agreementPdfDriveLink} onChange={(e) => setRegisterForm({ ...registerForm, agreementPdfDriveLink: e.target.value })} placeholder="https://drive.google.com/..." /></div>
// // //                   <div className="form-field"><label>Start Date</label><input type="date" value={registerForm.agreementStartDate} onChange={(e) => setRegisterForm({ ...registerForm, agreementStartDate: e.target.value })} /></div>
// // //                   <div className="form-field"><label>End Date</label><input type="date" value={registerForm.agreementEndDate} onChange={(e) => setRegisterForm({ ...registerForm, agreementEndDate: e.target.value })} /></div>
// // //                   <div className="form-field span-2"><label>Internal Notes</label><textarea value={registerForm.internalNotes} onChange={(e) => setRegisterForm({ ...registerForm, internalNotes: e.target.value })} rows={2} /></div>
// // //                 </div>
// // //                 <div className="form-actions">
// // //                   <button className="btn-outline" onClick={() => setShowRegisterForm(false)}>Cancel</button>
// // //                   <button className="btn-primary" onClick={handleRegisterPartner} disabled={busy}>
// // //                     {busy ? 'Submitting…' : 'Submit Registration'}
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {profile && dashboard && (
// // //               <>
// // //                 <div className="stats-grid">
// // //                   <div className="stat-card">
// // //                     <div className="stat-icon purple">👥</div>
// // //                     <div className="stat-info"><span className="stat-value">{dashboard.totalClients}</span><span className="stat-label">Total Clients</span></div>
// // //                   </div>
// // //                   <div className="stat-card">
// // //                     <div className="stat-icon orange">⏳</div>
// // //                     <div className="stat-info"><span className="stat-value">{dashboard.pendingClients}</span><span className="stat-label">Pending Clients</span></div>
// // //                   </div>
// // //                   <div className="stat-card">
// // //                     <div className="stat-icon green">🚀</div>
// // //                     <div className="stat-info"><span className="stat-value">{dashboard.activeProjects}</span><span className="stat-label">Active Projects</span></div>
// // //                   </div>
// // //                   <div className="stat-card">
// // //                     <div className="stat-icon blue">💰</div>
// // //                     <div className="stat-info"><span className="stat-value" style={{ fontSize: '1.3rem' }}>{formatMoney(dashboard.totalApprovedRevenue)}</span><span className="stat-label">Approved Revenue</span></div>
// // //                   </div>
// // //                 </div>

// // //                 <div className="dashboard-card">
// // //                   <div className="card-header"><h2>Partner Profile</h2>{getStatusBadge(profile.partnerStatus)}</div>
// // //                   <div className="details-grid">
// // //                     <div className="detail-item"><label>Company</label><span>{profile.companyName}</span></div>
// // //                     <div className="detail-item"><label>Partner Code</label><span style={{ color: 'var(--teal)', fontWeight: 600 }}>{profile.partnerCode}</span></div>
// // //                     <div className="detail-item"><label>Contact</label><span>{profile.partnerName}</span></div>
// // //                     <div className="detail-item"><label>Email</label><span>{profile.partnerEmail}</span></div>
// // //                     <div className="detail-item"><label>Agreement</label><span>{profile.agreementType} · {profile.agreementValue}</span></div>
// // //                     <div className="detail-item"><label>Validity</label><span>{formatDate(profile.agreementStartDate)} → {formatDate(profile.agreementEndDate)}</span></div>
// // //                     <div className="detail-item span-2">
// // //                       <label>Services</label>
// // //                       <div className="skills-tags">
// // //                         {profile.servicesOffered?.map(s => <span key={s} className="skill-tag">{s.replace('_', ' ')}</span>)}
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                   {profile.directorNote && (
// // //                     <div className="warning-banner" style={{ marginTop: '1rem' }}><strong>Director Note:</strong> {profile.directorNote}</div>
// // //                   )}
// // //                 </div>

// // //                 <div className="dashboard-card">
// // //                   <div className="card-header">
// // //                     <h2>Recent Clients</h2>
// // //                     <button className="view-all-link" onClick={() => setActiveNav('my-clients')}>View All →</button>
// // //                   </div>
// // //                   <div className="projects-grid">
// // //                     {dashboard.recentClients?.slice(0, 3).map(c => (
// // //                       <div key={c.mappingId} className="project-card">
// // //                         <div className="project-card-header">
// // //                           <h3>{c.name}</h3>
// // //                           {getStatusBadge(c.isApproved ? 'APPROVED' : 'PENDING')}
// // //                         </div>
// // //                         <p className="project-card-desc">{c.companyName}</p>
// // //                         <div className="project-card-meta">
// // //                           <span>✉ {c.email}</span>
// // //                           {c.phoneNumber && <span>📞 {c.phoneNumber}</span>}
// // //                         </div>
// // //                         <div className="project-card-actions">
// // //                           <button className="btn-sm btn-primary" onClick={() => { setActiveNav('my-clients'); openClientDetail(c); }}>View Details</button>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                   {(!dashboard.recentClients || dashboard.recentClients.length === 0) && (
// // //                     <div className="empty-state"><span className="empty-icon">📭</span><p>No clients yet. Create your first client!</p></div>
// // //                   )}
// // //                 </div>
// // //               </>
// // //             )}
// // //           </>
// // //         )}

// // //         {/* ================= MY CLIENTS ================= */}
// // //         {activeNav === 'my-clients' && !selectedClient && (
// // //           <div className="dashboard-card full-width">
// // //             <div className="card-header">
// // //               <h2>My Clients</h2>
// // //               {!showCreateClientForm && (
// // //                 <button className="btn-primary" onClick={() => setShowCreateClientForm(true)} disabled={!canCreate}>
// // //                   + New Client
// // //                 </button>
// // //               )}
// // //             </div>

// // //             {!canCreate && !showCreateClientForm && (
// // //               <div className="warning-banner" style={{ marginBottom: '1rem' }}>
// // //                 ⚠️ Partner account is <strong>{profile?.partnerStatus}</strong>. You need APPROVED status to create clients.
// // //               </div>
// // //             )}

// // //             {showCreateClientForm && (
// // //               <div className="inline-form-card">
// // //                 <div className="card-header" style={{ marginBottom: '1rem' }}>
// // //                   <h3>Create New Client</h3>
// // //                   <button className="btn-outline btn-sm" onClick={() => setShowCreateClientForm(false)}>← Back</button>
// // //                 </div>
// // //                 <div className="details-grid">
// // //                   <div className="form-field"><label>Client Email *</label><input type="email" value={clientForm.email} onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })} /></div>
// // //                   <div className="form-field"><label>Client Name *</label><input value={clientForm.name} onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })} /></div>
// // //                   <div className="form-field span-2"><label>Company Name *</label><input value={clientForm.companyName} onChange={(e) => setClientForm({ ...clientForm, companyName: e.target.value })} /></div>
// // //                   <div className="form-field"><label>Phone</label><input value={clientForm.phoneNumber} onChange={(e) => setClientForm({ ...clientForm, phoneNumber: e.target.value })} /></div>
// // //                   <div className="form-field">
// // //                     <label>Gender</label>
// // //                     <select value={clientForm.gender} onChange={(e) => setClientForm({ ...clientForm, gender: e.target.value })}>
// // //                       <option value="">—</option>
// // //                       <option value="MALE">Male</option>
// // //                       <option value="FEMALE">Female</option>
// // //                       <option value="OTHER">Other</option>
// // //                     </select>
// // //                   </div>
// // //                   <div className="form-field"><label>DOB</label><input type="date" value={clientForm.dob} onChange={(e) => setClientForm({ ...clientForm, dob: e.target.value })} /></div>
// // //                   <div className="form-field"><label>Photo URL</label><input value={clientForm.photoUrl} onChange={(e) => setClientForm({ ...clientForm, photoUrl: e.target.value })} /></div>
// // //                   <div className="form-field span-2"><label>Address</label><textarea value={clientForm.address} onChange={(e) => setClientForm({ ...clientForm, address: e.target.value })} rows={2} /></div>
// // //                   <div className="form-field"><label>Company Mobile</label><input value={clientForm.companyMobileNumber} onChange={(e) => setClientForm({ ...clientForm, companyMobileNumber: e.target.value })} /></div>
// // //                   <div className="form-field"><label>Company Email</label><input type="email" value={clientForm.companyEmail} onChange={(e) => setClientForm({ ...clientForm, companyEmail: e.target.value })} /></div>
// // //                   <div className="form-field"><label>Org Type</label><input value={clientForm.orgType} onChange={(e) => setClientForm({ ...clientForm, orgType: e.target.value })} /></div>
// // //                   <div className="form-field"><label>Client Type</label><input value={clientForm.clientType} onChange={(e) => setClientForm({ ...clientForm, clientType: e.target.value })} /></div>
// // //                   <div className="form-field span-2"><label>Website</label><input value={clientForm.clientWebsite} onChange={(e) => setClientForm({ ...clientForm, clientWebsite: e.target.value })} /></div>
// // //                   <div className="form-field span-2"><label>Notes</label><textarea value={clientForm.notes} onChange={(e) => setClientForm({ ...clientForm, notes: e.target.value })} rows={2} /></div>
// // //                 </div>
// // //                 <div className="form-actions">
// // //                   <button className="btn-outline" onClick={() => setShowCreateClientForm(false)}>Cancel</button>
// // //                   <button className="btn-primary" onClick={handleCreateClient} disabled={busy}>
// // //                     {busy ? 'Creating…' : 'Create Client'}
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {!showCreateClientForm && (
// // //               <>
// // //                 <div className="filter-bar">
// // //                   <div className="search-input-wrap">
// // //                     <span className="search-icon">🔍</span>
// // //                     <input className="search-input" placeholder="Search by name, email, company, phone…"
// // //                       value={clientSearch} onChange={(e) => setClientSearch(e.target.value)} />
// // //                     {clientSearch && <button className="clear-btn" onClick={() => setClientSearch('')}>✕</button>}
// // //                   </div>
// // //                   <select className="filter-select" value={clientStatusFilter} onChange={(e) => setClientStatusFilter(e.target.value)}>
// // //                     <option value="ALL">All Status</option>
// // //                     <option value="APPROVED">Approved</option>
// // //                     <option value="PENDING">Pending</option>
// // //                   </select>
// // //                 </div>

// // //                 {filteredClients.length === 0 ? (
// // //                   <div className="empty-state">
// // //                     <span className="empty-icon">👥</span>
// // //                     <p>{clients.length === 0 ? 'No clients yet. Create your first client to get started.' : 'No clients match your filters.'}</p>
// // //                   </div>
// // //                 ) : (
// // //                   <div className="projects-grid">
// // //                     {filteredClients.map(c => (
// // //                       <div key={c.mappingId} className="project-card">
// // //                         <div className="project-card-header">
// // //                           <h3>{c.name}</h3>
// // //                           {getStatusBadge(c.isApproved ? 'APPROVED' : 'PENDING')}
// // //                         </div>
// // //                         <p className="project-card-desc">{c.companyName}</p>
// // //                         <div className="project-card-meta">
// // //                           <span>✉ {c.email}</span>
// // //                           {c.phoneNumber && <span>📞 {c.phoneNumber}</span>}
// // //                           <span>📅 {formatDate(c.assignedAt)}</span>
// // //                         </div>
// // //                         {c.notes && <div className="project-card-manager">📝 {c.notes}</div>}
// // //                         <div className="project-card-actions">
// // //                           <button className="btn-sm btn-primary" onClick={() => openClientDetail(c)}>View Details</button>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </>
// // //             )}
// // //           </div>
// // //         )}

// // //         {/* ================= CLIENT DETAIL ================= */}
// // //         {activeNav === 'my-clients' && selectedClient && (
// // //           <div className="dashboard-card full-width">
// // //             <div className="card-header">
// // //               <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
// // //                 <button className="btn-outline btn-sm" onClick={closeClientDetail}>← Back to Clients</button>
// // //                 <h2 style={{ margin: 0 }}>{selectedClient.name}</h2>
// // //                 {getStatusBadge(selectedClient.isApproved ? 'APPROVED' : 'PENDING')}
// // //               </div>
// // //             </div>

// // //             <div className="details-grid" style={{ marginBottom: '1.5rem' }}>
// // //               <div className="detail-item"><label>Company</label><span>{selectedClient.companyName}</span></div>
// // //               <div className="detail-item"><label>Email</label><span>{selectedClient.email}</span></div>
// // //               <div className="detail-item"><label>Phone</label><span>{selectedClient.phoneNumber || '—'}</span></div>
// // //               <div className="detail-item"><label>Company Email</label><span>{selectedClient.companyEmail || '—'}</span></div>
// // //               <div className="detail-item"><label>Assigned</label><span>{formatDate(selectedClient.assignedAt)}</span></div>
// // //               <div className="detail-item"><label>Mapping Status</label><span>{selectedClient.mappingStatus}</span></div>
// // //               {selectedClient.notes && (
// // //                 <div className="detail-item span-2"><label>Notes</label><span>{selectedClient.notes}</span></div>
// // //               )}
// // //             </div>

// // //             {loadingClientDetail ? (
// // //               <div className="loading-inline"><div className="loader-spinner" /></div>
// // //             ) : (
// // //               <>
// // //                 {/* Projects */}
// // //                 <div className="section-header">
// // //                   <h3>🚀 Projects ({filteredProjects.length}{filteredProjects.length !== clientProjects.length ? ` of ${clientProjects.length}` : ''})</h3>
// // //                   <button className="btn-primary btn-sm" onClick={() => setShowCreateProjectForm(true)} disabled={!canCreate || showCreateProjectForm}>
// // //                     + New Project
// // //                   </button>
// // //                 </div>

// // //                 {showCreateProjectForm && (
// // //                   <div className="inline-form-card" style={{ marginBottom: '1rem' }}>
// // //                     <div className="card-header" style={{ marginBottom: '1rem' }}>
// // //                       <h4>Create New Project</h4>
// // //                       <button className="btn-outline btn-sm" onClick={() => setShowCreateProjectForm(false)}>← Back</button>
// // //                     </div>
// // //                     <div className="details-grid">
// // //                       <div className="form-field"><label>Project Name *</label><input value={projectForm.projectName} onChange={(e) => setProjectForm({ ...projectForm, projectName: e.target.value })} /></div>
// // //                       <div className="form-field">
// // //                         <label>Type</label>
// // //                         <select value={projectForm.projectType} onChange={(e) => setProjectForm({ ...projectForm, projectType: e.target.value })}>
// // //                           <option value="WEB">WEB</option><option value="MOBILE">MOBILE</option>
// // //                           <option value="DESKTOP">DESKTOP</option><option value="OTHER">OTHER</option>
// // //                         </select>
// // //                       </div>
// // //                       <div className="form-field span-2"><label>Description</label><textarea value={projectForm.projectDescription} onChange={(e) => setProjectForm({ ...projectForm, projectDescription: e.target.value })} rows={2} /></div>
// // //                       <div className="form-field"><label>Department ID</label><input type="number" value={projectForm.departmentId} onChange={(e) => setProjectForm({ ...projectForm, departmentId: e.target.value })} /></div>
// // //                       <div className="form-field"><label>Cost</label><input value={projectForm.cost} onChange={(e) => setProjectForm({ ...projectForm, cost: e.target.value })} placeholder="25000" /></div>
// // //                       <div className="form-field span-2"><label>Deadline</label><input type="datetime-local" value={projectForm.deadline} onChange={(e) => setProjectForm({ ...projectForm, deadline: e.target.value })} /></div>
// // //                     </div>
// // //                     <div className="form-actions">
// // //                       <button className="btn-outline" onClick={() => setShowCreateProjectForm(false)}>Cancel</button>
// // //                       <button className="btn-primary" onClick={handleCreateProject} disabled={busy}>{busy ? 'Creating…' : 'Create Project'}</button>
// // //                     </div>
// // //                   </div>
// // //                 )}

// // //                 {clientProjects.length > 0 && !showCreateProjectForm && (
// // //                   <div className="filter-bar" style={{ marginBottom: '1rem' }}>
// // //                     <div className="search-input-wrap">
// // //                       <span className="search-icon">🔍</span>
// // //                       <input className="search-input" placeholder="Search projects…" value={projectSearch} onChange={(e) => setProjectSearch(e.target.value)} />
// // //                       {projectSearch && <button className="clear-btn" onClick={() => setProjectSearch('')}>✕</button>}
// // //                     </div>
// // //                     <select className="filter-select" value={projectStatusFilter} onChange={(e) => setProjectStatusFilter(e.target.value)}>
// // //                       <option value="ALL">All Status</option>
// // //                       <option value="PENDING">Pending</option>
// // //                       <option value="IN_PROGRESS">In Progress</option>
// // //                       <option value="COMPLETED">Completed</option>
// // //                     </select>
// // //                   </div>
// // //                 )}

// // //                 {filteredProjects.length === 0 ? (
// // //                   <div className="empty-state"><span className="empty-icon">🚀</span><p>{clientProjects.length === 0 ? 'No projects yet.' : 'No projects match your filters.'}</p></div>
// // //                 ) : (
// // //                   <div className="projects-grid">
// // //                     {filteredProjects.map(p => (
// // //                       <div key={p.projectId} className="project-card">
// // //                         <div className="project-card-header"><h3>{p.projectName}</h3>{getStatusBadge(p.status)}</div>
// // //                         <p className="project-card-desc">{p.projectDescription || '—'}</p>
// // //                         <div className="project-card-meta">
// // //                           <span>🧩 {p.projectType || '—'}</span>
// // //                           <span>🏢 {p.departmentName || 'No dept'}</span>
// // //                           <span>💰 {p.cost ? formatMoney(p.cost) : '—'}</span>
// // //                           {p.deadline && <span>📅 {formatDate(p.deadline)}</span>}
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 )}

// // //                 {/* Payments */}
// // //                 <div className="section-header" style={{ marginTop: '2rem' }}>
// // //                   <h3>💳 Payments ({filteredPayments.length}{filteredPayments.length !== clientPayments.length ? ` of ${clientPayments.length}` : ''})</h3>
// // //                   {clientPayments.length > 0 && (
// // //                     <select className="filter-select" value={paymentStatusFilter} onChange={(e) => setPaymentStatusFilter(e.target.value)}>
// // //                       <option value="ALL">All Status</option>
// // //                       <option value="PENDING">Pending</option>
// // //                       <option value="APPROVED">Approved</option>
// // //                       <option value="PAID">Paid</option>
// // //                       <option value="FAILED">Failed</option>
// // //                     </select>
// // //                   )}
// // //                 </div>

// // //                 {filteredPayments.length === 0 ? (
// // //                   <div className="empty-state"><span className="empty-icon">💳</span><p>{clientPayments.length === 0 ? 'No payments yet.' : 'No payments match your filter.'}</p></div>
// // //                 ) : (
// // //                   <div className="files-list">
// // //                     {filteredPayments.map(pay => (
// // //                       <div key={pay.paymentId} className="file-item">
// // //                         <div className="file-icon">{pay.status === 'APPROVED' ? '✅' : pay.status === 'FAILED' ? '❌' : '⏳'}</div>
// // //                         <div className="file-info">
// // //                           <div className="file-name">{pay.transactionId}</div>
// // //                           <div className="file-meta">
// // //                             <span className="file-type">{pay.type}</span>
// // //                             <span>{formatDate(pay.dateTime)}</span>
// // //                           </div>
// // //                         </div>
// // //                         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
// // //                           <div style={{ fontWeight: 700, color: pay.status === 'APPROVED' ? 'var(--teal)' : 'var(--orange)' }}>{formatMoney(pay.amount)}</div>
// // //                           {getStatusBadge(pay.status)}
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </>
// // //             )}
// // //           </div>
// // //         )}

// // //         {/* ================= MY DETAILS ================= */}
// // //         {activeNav === 'my-details' && profile && (
// // //           <div className="dashboard-card full-width">
// // //             <div className="card-header"><h2>My Partner Details</h2>{getStatusBadge(profile.partnerStatus)}</div>
// // //             <div className="details-grid">
// // //               <div className="detail-item"><label>Company Name</label><span>{profile.companyName}</span></div>
// // //               <div className="detail-item"><label>Company Email</label><span>{profile.companyEmail || '—'}</span></div>
// // //               <div className="detail-item"><label>Company Mobile</label><span>{profile.companyMobileNumber || '—'}</span></div>
// // //               <div className="detail-item"><label>Company Website</label><span>{profile.companyWebsite || '—'}</span></div>
// // //               <div className="detail-item"><label>Contact Person</label><span>{profile.contactPersonName || '—'}</span></div>
// // //               <div className="detail-item"><label>Designation</label><span>{profile.contactPersonDesignation || '—'}</span></div>
// // //               <div className="detail-item"><label>Partner Code</label><span style={{ color: 'var(--teal)', fontWeight: 600 }}>{profile.partnerCode}</span></div>
// // //               <div className="detail-item"><label>Agreement Type</label><span>{profile.agreementType}</span></div>
// // //               <div className="detail-item"><label>Agreement Value</label><span>{profile.agreementValue}</span></div>
// // //               <div className="detail-item"><label>Start Date</label><span>{formatDate(profile.agreementStartDate)}</span></div>
// // //               <div className="detail-item"><label>End Date</label><span>{formatDate(profile.agreementEndDate)}</span></div>
// // //               <div className="detail-item"><label>Approved</label><span>{profile.isApproved ? '✅ Yes' : '❌ No'}</span></div>
// // //               <div className="detail-item span-2">
// // //                 <label>Services Offered</label>
// // //                 <div className="skills-tags">{profile.servicesOffered?.map(s => <span key={s} className="skill-tag">{s.replace('_', ' ')}</span>)}</div>
// // //               </div>
// // //               <div className="detail-item span-2">
// // //                 <label>Agreement PDF</label>
// // //                 <a href={profile.agreementPdfDriveLink} target="_blank" rel="noopener noreferrer" className="resume-link">📄 View Agreement</a>
// // //               </div>
// // //             </div>
// // //             {profile.directorNote && (
// // //               <div className="warning-banner" style={{ marginTop: '1rem' }}><strong>Director Note:</strong> {profile.directorNote}</div>
// // //             )}
// // //           </div>
// // //         )}

// // //         {/* ================= ALL PARTNERS ================= */}
// // //         {activeNav === 'all-partners' && isDirector && (
// // //           <div className="dashboard-card full-width">
// // //             <div className="card-header">
// // //               <h2>All Partners</h2>
// // //               <span className="activity-badge">{filteredPartners.length} of {allPartners.length}</span>
// // //             </div>

// // //             <div className="filter-bar">
// // //               <div className="search-input-wrap">
// // //                 <span className="search-icon">🔍</span>
// // //                 <input className="search-input" placeholder="Search by company, name, email, code…"
// // //                   value={partnerSearch} onChange={(e) => setPartnerSearch(e.target.value)} />
// // //                 {partnerSearch && <button className="clear-btn" onClick={() => setPartnerSearch('')}>✕</button>}
// // //               </div>
// // //               <select className="filter-select" value={partnerStatusFilter} onChange={(e) => setPartnerStatusFilter(e.target.value)}>
// // //                 <option value="ALL">All Status</option>
// // //                 <option value="PENDING">Pending</option>
// // //                 <option value="APPROVED">Approved</option>
// // //                 <option value="BLOCKED">Blocked</option>
// // //                 <option value="DEACTIVATED">Deactivated</option>
// // //               </select>
// // //             </div>

// // //             {filteredPartners.length === 0 ? (
// // //               <div className="empty-state"><span className="empty-icon">🤝</span><p>{allPartners.length === 0 ? 'No partners found.' : 'No partners match your filters.'}</p></div>
// // //             ) : (
// // //               <div className="projects-grid">
// // //                 {filteredPartners.map(p => (
// // //                   <div key={p.partnerId} className="project-card">
// // //                     <div className="project-card-header"><h3>{p.companyName}</h3>{getStatusBadge(p.partnerStatus)}</div>
// // //                     <p className="project-card-desc">{p.partnerName} · {p.partnerCode}</p>
// // //                     <div className="project-card-meta">
// // //                       <span>✉ {p.partnerEmail}</span>
// // //                       <span>👥 {p.totalClients} clients</span>
// // //                       <span>📋 {p.agreementType}</span>
// // //                     </div>
// // //                     <div className="project-card-actions">
// // //                       {p.partnerStatus !== 'APPROVED' && (
// // //                         <button className="btn-sm btn-primary" onClick={() => handleUpdateStatus(p.partnerId, 'APPROVED')} disabled={busy}>✅ Approve</button>
// // //                       )}
// // //                       {p.partnerStatus === 'APPROVED' && (
// // //                         <button className="btn-sm btn-outline" onClick={() => handleUpdateStatus(p.partnerId, 'BLOCKED')} disabled={busy}>🔴 Block</button>
// // //                       )}
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             )}
// // //           </div>
// // //         )}

// // //         {/* ================= PROFILE ================= */}
// // //         {activeNav === 'profile' && (
// // //           <div className="dashboard-card full-width">
// // //             <div className="card-header"><h2>Profile Information</h2></div>
// // //             <div className="profile-info">
// // //               <div className="profile-avatar-large">
// // //                 {user?.photoUrl ? <img src={user.photoUrl} alt={user.name} /> : <div className="avatar-placeholder">{user?.name?.charAt(0) || 'P'}</div>}
// // //               </div>
// // //               <div className="profile-details">
// // //                 <div className="detail-item"><label>Full Name</label><span>{user?.name}</span></div>
// // //                 <div className="detail-item"><label>Email</label><span>{user?.email}</span></div>
// // //                 <div className="detail-item"><label>Role</label><span>Partner</span></div>
// // //                 <div className="detail-item"><label>Phone</label><span>{user?.phoneNumber || 'Not provided'}</span></div>
// // //                 <div className="detail-item"><label>Address</label><span>{user?.address || 'Not provided'}</span></div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         <footer className="client-footer">
// // //           <p>© 2026 Softmax Nexus | Developed by <a href="https://softmax.in" style={{ color: 'skyblue' }}>Softmax.in</a></p>
// // //         </footer>
// // //       </main>

// // //       {/* Toast */}
// // //       {toast && (
// // //         <div style={{
// // //           position: 'fixed', bottom: '1.5rem', right: '1.5rem',
// // //           padding: '0.85rem 1.25rem', borderRadius: 12, fontSize: '0.85rem', fontWeight: 600,
// // //           color: '#fff', background: toast.type === 'ok' ? 'var(--g-main)' : 'linear-gradient(135deg,#FE9496,#A05AFF)',
// // //           boxShadow: '0 10px 30px rgba(15,23,42,0.2)', zIndex: 2000, maxWidth: 360,
// // //         }}>{toast.msg}</div>
// // //       )}

// // //       <style jsx>{`
// // //         /* ---------- Inline / Reusable ---------- */
// // //         .span-2 { grid-column: 1 / -1; }
// // //         .activity-badge {
// // //           background: var(--surface); border: 1px solid var(--border);
// // //           border-radius: 20px; padding: 0.25rem 0.75rem;
// // //           font-size: 0.75rem; color: var(--muted);
// // //         }
// // //         .empty-state { text-align: center; padding: 3rem 1rem; color: var(--muted); }
// // //         .empty-icon { font-size: 3rem; display: block; margin-bottom: 1rem; opacity: 0.5; }
// // //         .empty-hero { text-align: center; padding: 2rem 1rem; }
// // //         .hero-icon { font-size: 4rem; margin-bottom: 1rem; opacity: 0.5; }
// // //         .hero-text { color: var(--muted); margin-bottom: 1.5rem; max-width: 480px; margin-left: auto; margin-right: auto; }

// // //         .warning-banner {
// // //           padding: 0.75rem 1rem; background: rgba(254, 148, 150, 0.1);
// // //           border: 1px solid var(--orange); border-radius: 10px;
// // //           font-size: 0.8rem; color: var(--orange);
// // //         }
// // //         .skills-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
// // //         .skill-tag {
// // //           background: rgba(44, 166, 164, 0.1); color: var(--teal);
// // //           padding: 0.3rem 0.7rem; border-radius: 12px; font-size: 0.72rem;
// // //           cursor: pointer; transition: all 0.15s ease; user-select: none;
// // //           border: 1px solid transparent;
// // //         }
// // //         .skill-tag:hover { background: rgba(44, 166, 164, 0.2); }
// // //         .skill-tag.selected { background: var(--teal); color: white; border-color: var(--teal); }
// // //         .resume-link { color: var(--teal); text-decoration: none; font-weight: 600; }
// // //         .resume-link:hover { text-decoration: underline; }

// // //         /* ---------- Filter bar ---------- */
// // //         .filter-bar {
// // //           display: flex; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap;
// // //         }
// // //         .search-input-wrap {
// // //           position: relative; flex: 1 1 260px; min-width: 200px;
// // //         }
// // //         .search-icon {
// // //           position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%);
// // //           font-size: 0.85rem; opacity: 0.6; pointer-events: none;
// // //         }
// // //         .search-input {
// // //           width: 100%; padding: 0.65rem 2.2rem 0.65rem 2.4rem;
// // //           border: 1px solid var(--border); border-radius: 10px;
// // //           background: var(--surface); color: var(--text);
// // //           font-size: 0.85rem; outline: none; transition: border-color 0.15s;
// // //         }
// // //         .search-input:focus { border-color: var(--teal); }
// // //         .clear-btn {
// // //           position: absolute; right: 0.6rem; top: 50%; transform: translateY(-50%);
// // //           background: transparent; border: none; color: var(--muted);
// // //           cursor: pointer; font-size: 0.8rem; padding: 0.2rem 0.4rem;
// // //         }
// // //         .filter-select {
// // //           padding: 0.65rem 0.9rem; border: 1px solid var(--border);
// // //           border-radius: 10px; background: var(--surface); color: var(--text);
// // //           font-size: 0.85rem; cursor: pointer; outline: none;
// // //           min-width: 140px; transition: border-color 0.15s;
// // //         }
// // //         .filter-select:focus { border-color: var(--teal); }

// // //         /* ---------- Inline form card ---------- */
// // //         .inline-form-card {
// // //           background: var(--surface); border: 1px solid var(--border);
// // //           border-radius: 14px; padding: 1.25rem; margin-bottom: 1.5rem;
// // //         }
// // //         .form-actions {
// // //           display: flex; gap: 0.75rem; justify-content: flex-end;
// // //           margin-top: 1.25rem; flex-wrap: wrap;
// // //         }

// // //         /* ---------- Section header ---------- */
// // //         .section-header {
// // //           display: flex; align-items: center; justify-content: space-between;
// // //           gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap;
// // //         }
// // //         .section-header h3 { margin: 0; font-size: 1rem; }

// // //         /* ---------- Loading ---------- */
// // //         .loading-inline {
// // //           display: flex; justify-content: center; padding: 2rem;
// // //         }

// // //         /* ---------- Files list (payments) ---------- */
// // //         .files-list { display: flex; flex-direction: column; gap: 0.6rem; }
// // //         .file-item {
// // //           display: flex; align-items: center; gap: 0.85rem;
// // //           padding: 0.85rem 1rem; background: var(--surface);
// // //           border: 1px solid var(--border); border-radius: 12px;
// // //           transition: all 0.15s ease; flex-wrap: wrap;
// // //         }
// // //         .file-item:hover { border-color: var(--teal); }
// // //         .file-icon { font-size: 1.4rem; flex-shrink: 0; }
// // //         .file-info { flex: 1 1 200px; min-width: 0; }
// // //         .file-name { font-weight: 600; font-size: 0.85rem; word-break: break-all; }
// // //         .file-meta { display: flex; gap: 0.6rem; font-size: 0.72rem; color: var(--muted); margin-top: 0.2rem; flex-wrap: wrap; }
// // //         .file-type {
// // //           background: rgba(44, 166, 164, 0.1); color: var(--teal);
// // //           padding: 0.1rem 0.4rem; border-radius: 6px;
// // //         }

// // //         /* ---------- Responsive ---------- */
// // //         @media (max-width: 768px) {
// // //           .filter-bar { flex-direction: column; }
// // //           .search-input-wrap { flex: 1 1 auto; }
// // //           .filter-select { width: 100%; }
// // //           .section-header { flex-direction: column; align-items: stretch; }
// // //           .form-actions { justify-content: stretch; }
// // //           .form-actions button { flex: 1; }
// // //           .file-item { flex-direction: column; align-items: flex-start; }
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default Partner;



// // //@ts-nocheck
// // 'use client';

// // import React, { useState, useEffect, useMemo, useCallback } from 'react';
// // import axios from 'axios';
// // import CommonSidebar from './components/CommonSidebar';
// // import { useAuth } from '@/contexts/AuthContext';

// // // ============================================
// // // TYPES
// // // ============================================

// // interface UserProfile {
// //   userId: number; uid: string; name: string; email: string;
// //   photoUrl: string | null; emailVerified: boolean; isProfileCompleted: boolean;
// //   phoneNumber?: string; address?: string; gender?: string; dob?: string;
// // }

// // interface Partner {
// //   partnerId: number; userId: number; partnerCode: string; partnerName: string;
// //   partnerEmail: string; partnerPhotoUrl?: string | null; companyName: string;
// //   companyEmail: string; companyMobileNumber?: string; companyWebsite?: string;
// //   companyAddress?: string; contactPersonName?: string; contactPersonDesignation?: string;
// //   servicesOffered: string[]; agreementType: string; agreementValue: number;
// //   agreementPdfDriveLink: string; agreementStartDate?: string; agreementEndDate?: string;
// //   partnerStatus: string; isApproved: boolean; directorNote?: string | null;
// //   totalClients: number; activeClients: number; createdAt: string; updatedAt: string;
// // }

// // interface PartnerDashboard {
// //   partnerId: number; partnerCode: string; companyName: string; partnerStatus: string;
// //   totalClients: number; approvedClients: number; pendingClients: number;
// //   totalProjects: number; activeProjects: number; completedProjects: number;
// //   totalPaymentsCount: number; totalApprovedRevenue: number; totalPendingRevenue: number;
// //   recentClients: Client[];
// // }

// // interface Client {
// //   mappingId: number; clientId: number; userId: number; name: string; email: string;
// //   phoneNumber?: string; companyName: string; companyEmail?: string; clientStatus: string;
// //   isApproved: boolean; assignedAt: string; mappingStatus: string; notes?: string | null;
// // }

// // interface Project {
// //   projectId: number; projectName: string; projectDescription?: string;
// //   projectType?: string; status: string; cost?: string; deadline?: string;
// //   departmentId?: number; departmentName?: string; createdAt: string; updatedAt: string;
// // }

// // interface PaymentResponseDTO {
// //   paymentId: number; transactionId: string; dateTime: string;
// //   type: string; amount: string;
// //   status: 'PENDING' | 'APPROVED' | 'REJECTED';
// //   paymentNote: string | null;
// //   userName: string | null; userEmail: string | null;
// //   approvedByName: string | null; approvedAt: string | null;
// //   directorNote: string | null;
// // }

// // interface ProjectStatusDTO {
// //   statusId: number; projectId: number; projectName: string;
// //   status: string; dateTime: string;
// //   handledById: number | null; handledByName: string | null;
// //   assignedToId: number | null; assignedToName: string | null;
// //   directorNote: string | null; managerNote: string | null;
// //   deadline: string | null;
// // }

// // // ============================================
// // // API
// // // ============================================

// // const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// // const apiCall = async <T,>(method: string, endpoint: string, data?: any): Promise<T> => {
// //   try {
// //     const config: any = { method, url: `${API_BASE}${endpoint}`, withCredentials: true };
// //     if (data) { config.data = data; config.headers = { 'Content-Type': 'application/json' }; }
// //     const res = await axios(config);
// //     return res.data;
// //   } catch (error: any) {
// //     throw error.response?.data || error;
// //   }
// // };

// // const registerAsPartner = (p: any) => apiCall('POST', '/api/partner/register', p);
// // const getMyPartnerProfile = () => apiCall<{ success: boolean; data: Partner }>('GET', '/api/partner/me');
// // const getMyPartnerDashboard = () => apiCall<{ success: boolean; data: PartnerDashboard }>('GET', '/api/partner/me/dashboard');
// // const getMyPartnerClients = () => apiCall<{ success: boolean; data: Client[] }>('GET', '/api/partner/clients');
// // const createClient = (p: any) => apiCall('POST', '/api/partner/clients', p);
// // const createProjectForClient = (clientId: number, p: any) =>
// //   apiCall('POST', `/api/partner/clients/${clientId}/projects`, p);

// // // NEW: uses the "all" endpoints and history
// // const getAllClientProjects = (clientId: number) =>
// //   apiCall<{ success: boolean; data: Project[] }>('GET', `/api/partner/clients/${clientId}/projects/all`);
// // const getProjectHistory = (clientId: number, projectId: number) =>
// //   apiCall<{ success: boolean; data: ProjectStatusDTO[] }>(
// //     'GET', `/api/partner/clients/${clientId}/projects/${projectId}/history`);
// // const getClientPayments = (clientId: number) =>
// //   apiCall<{ success: boolean; data: PaymentResponseDTO[] }>(
// //     'GET', `/api/partner/clients/${clientId}/payments`);

// // const getAllPartners = () => apiCall<{ success: boolean; data: Partner[] }>('GET', '/api/partner/all');
// // const updatePartnerStatus = (partnerId: number, status: string, note?: string) => {
// //   let url = `/api/partner/${partnerId}/status?status=${status}`;
// //   if (note) url += `&note=${encodeURIComponent(note)}`;
// //   return apiCall('PUT', url, null);
// // };
// // const getUserProfile = () => apiCall<{ success: boolean; data: UserProfile }>('GET', '/api/users/profile');

// // // ============================================
// // // MENU
// // // ============================================

// // const partnerMenuItems = [
// //   { id: 'dashboard', label: 'Dashboard', icon: '📊' },
// //   { id: 'my-clients', label: 'My Clients', icon: '👥' },
// //   { id: 'my-details', label: 'My Details', icon: '📝' },
// //   { id: 'profile', label: 'Profile', icon: '👤' },
// // ];
// // const directorMenuItems = [
// //   { id: 'dashboard', label: 'Dashboard', icon: '📊' },
// //   { id: 'all-partners', label: 'All Partners', icon: '🤝' },
// //   { id: 'profile', label: 'Profile', icon: '👤' },
// // ];

// // // ============================================
// // // HELPERS
// // // ============================================

// // const statusConfig: Record<string, { label: string; class: string; icon: string }> = {
// //   PENDING: { label: 'Pending', class: 'status-pending', icon: '⏳' },
// //   APPROVED: { label: 'Approved', class: 'status-approved', icon: '✅' },
// //   REJECTED: { label: 'Rejected', class: 'status-rejected', icon: '❌' },
// //   BLOCKED: { label: 'Blocked', class: 'status-rejected', icon: '🔴' },
// //   DEACTIVATED: { label: 'Deactivated', class: 'status-rejected', icon: '⚪' },
// //   ACTIVE: { label: 'Active', class: 'status-approved', icon: '🟢' },
// //   IN_PROGRESS: { label: 'In Progress', class: 'status-progress', icon: '🔄' },
// //   ASSIGNED: { label: 'Assigned', class: 'status-progress', icon: '👥' },
// //   COMPLETED: { label: 'Completed', class: 'status-completed', icon: '✔️' },
// //   PAID: { label: 'Paid', class: 'status-approved', icon: '💚' },
// //   FAILED: { label: 'Failed', class: 'status-rejected', icon: '❌' },
// // };

// // const getStatusBadge = (status: string) => {
// //   const c = statusConfig[status] || { label: status || 'N/A', class: 'status-pending', icon: '📌' };
// //   return <span className={`status-badge ${c.class}`}>{c.icon} {c.label}</span>;
// // };
// // const fmtDate = (d: string) => (!d ? '—' : new Date(d).toLocaleString());
// // const fmtShort = (d: string) => (!d ? '—' : new Date(d).toLocaleDateString());
// // const fmtMoney = (n: number | string) => '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });
// // const relTime = (d: string) => {
// //   try {
// //     const diff = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
// //     if (diff < 1) return 'just now';
// //     if (diff < 60) return `${diff}m ago`;
// //     if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
// //     return `${Math.floor(diff / 1440)}d ago`;
// //   } catch { return '—'; }
// // };

// // const SERVICES = ['CLIENT_RELATIONSHIP','SELLING','SECURITY','MARKETING','SUPPORT','DEVELOPMENT','OTHER'];
// // const AGREEMENT_TYPES = ['PERCENTAGE','MONTHLY','FIXED'];

// // // ============================================
// // // MAIN
// // // ============================================

// // const Partner: React.FC = () => {
// //   const [activeNav, setActiveNav] = useState('dashboard');
// //   const [loading, setLoading] = useState(true);
// //   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
// //   const [user, setUser] = useState<UserProfile | null>(null);

// //   const [profile, setProfile] = useState<Partner | null>(null);
// //   const [dashboard, setDashboard] = useState<PartnerDashboard | null>(null);
// //   const [clients, setClients] = useState<Client[]>([]);
// //   const [noProfile, setNoProfile] = useState(false);

// //   const [allPartners, setAllPartners] = useState<Partner[]>([]);
// //   const [isDirector, setIsDirector] = useState(false);

// //   const [darkMode, setDarkMode] = useState(false);
// //   const [busy, setBusy] = useState(false);
// //   const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);

// //   // Inline views
// //   const [showRegisterForm, setShowRegisterForm] = useState(false);
// //   const [showCreateClientForm, setShowCreateClientForm] = useState(false);
// //   const [showCreateProjectForm, setShowCreateProjectForm] = useState(false);

// //   // Client detail
// //   const [selectedClient, setSelectedClient] = useState<Client | null>(null);
// //   const [clientProjects, setClientProjects] = useState<Project[]>([]);
// //   const [clientPayments, setClientPayments] = useState<PaymentResponseDTO[]>([]);
// //   const [loadingClientDetail, setLoadingClientDetail] = useState(false);

// //   // Selected project detail (inline, no popup)
// //   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
// //   const [projectHistory, setProjectHistory] = useState<ProjectStatusDTO[]>([]);
// //   const [loadingHistory, setLoadingHistory] = useState(false);

// //   // Filters
// //   const [clientSearch, setClientSearch] = useState('');
// //   const [clientStatusFilter, setClientStatusFilter] = useState('ALL');
// //   const [projectSearch, setProjectSearch] = useState('');
// //   const [projectStatusFilter, setProjectStatusFilter] = useState('ALL');
// //   const [paymentStatusFilter, setPaymentStatusFilter] = useState('ALL');
// //   const [partnerSearch, setPartnerSearch] = useState('');
// //   const [partnerStatusFilter, setPartnerStatusFilter] = useState('ALL');

// //   // Forms
// //   const [registerForm, setRegisterForm] = useState({
// //     companyName: '', companyEmail: '', companyMobileNumber: '', companyWebsite: '',
// //     companyAddress: '', contactPersonName: '', contactPersonDesignation: '',
// //     servicesOffered: [] as string[], agreementType: 'PERCENTAGE', agreementValue: '',
// //     agreementPdfDriveLink: '', agreementStartDate: '', agreementEndDate: '', internalNotes: '',
// //   });
// //   const [clientForm, setClientForm] = useState({
// //     email: '', name: '', phoneNumber: '', gender: '', dob: '', photoUrl: '',
// //     address: '', companyName: '', companyMobileNumber: '', companyEmail: '',
// //     orgType: '', clientType: '', clientWebsite: '', notes: '',
// //   });
// //   const [projectForm, setProjectForm] = useState({
// //     projectName: '', projectDescription: '', projectType: 'WEB',
// //     departmentId: '', cost: '', deadline: '',
// //   });

// //   const { logout } = useAuth();
// //   const showToast = (type: 'ok' | 'err', msg: string) => {
// //     setToast({ type, msg });
// //     setTimeout(() => setToast(null), 4000);
// //   };

// //   // ---------- INIT ----------
// //   useEffect(() => {
// //     const saved = localStorage.getItem('theme');
// //     if (saved === 'dark') { setDarkMode(true); document.documentElement.setAttribute('data-theme', 'dark'); }
// //     loadInitialData();
// //   }, []);

// //   const loadInitialData = async () => {
// //     setLoading(true);
// //     try {
// //       const [profileRes, detailsRes] = await Promise.all([
// //         getUserProfile().catch(() => ({ data: null })),
// //         getMyPartnerProfile().catch(() => ({ data: null })),
// //       ]);
// //       setUser(profileRes.data);
// //       if (detailsRes.data) { setProfile(detailsRes.data); setNoProfile(false); await loadPartnerData(); }
// //       else setNoProfile(true);
// //       try {
// //         const allRes = await getAllPartners();
// //         setAllPartners(allRes.data || []); setIsDirector(true);
// //       } catch { setIsDirector(false); }
// //     } catch (err) { console.error(err); }
// //     finally { setLoading(false); }
// //   };

// //   const loadPartnerData = async () => {
// //     try {
// //       const [dashRes, clientsRes] = await Promise.all([
// //         getMyPartnerDashboard().catch(() => ({ data: null })),
// //         getMyPartnerClients().catch(() => ({ data: [] })),
// //       ]);
// //       setDashboard(dashRes.data || null);
// //       setClients(clientsRes.data || []);
// //     } catch (err) { console.error(err); }
// //   };

// //   const toggleDarkMode = () => {
// //     const n = !darkMode; setDarkMode(n);
// //     document.documentElement.setAttribute('data-theme', n ? 'dark' : 'light');
// //     localStorage.setItem('theme', n ? 'dark' : 'light');
// //   };

// //   const handleLogout = async () => {
// //     try { await logout(); window.location.href = '/'; } catch (e) { console.error(e); }
// //   };

// //   // ---------- ACTIONS ----------
// //   const handleRegisterPartner = async () => {
// //     if (!registerForm.companyName.trim()) return showToast('err', 'Company name required');
// //     if (!registerForm.agreementPdfDriveLink.trim()) return showToast('err', 'Agreement PDF link required');
// //     setBusy(true);
// //     try {
// //       const payload: any = {
// //         companyName: registerForm.companyName.trim(),
// //         agreementType: registerForm.agreementType,
// //         agreementPdfDriveLink: registerForm.agreementPdfDriveLink.trim(),
// //       };
// //       ['companyEmail','companyMobileNumber','companyWebsite','companyAddress',
// //        'contactPersonName','contactPersonDesignation','agreementStartDate',
// //        'agreementEndDate','internalNotes'].forEach(k => {
// //         if ((registerForm as any)[k]?.trim()) payload[k] = (registerForm as any)[k].trim();
// //       });
// //       if (registerForm.servicesOffered.length) payload.servicesOffered = registerForm.servicesOffered;
// //       if (registerForm.agreementValue) payload.agreementValue = Number(registerForm.agreementValue);

// //       await registerAsPartner(payload);
// //       showToast('ok', 'Partner registration submitted. Pending Head Director approval.');
// //       setShowRegisterForm(false);
// //       await loadInitialData();
// //     } catch (err: any) { showToast('err', err?.message || 'Registration failed'); }
// //     finally { setBusy(false); }
// //   };

// //   const handleCreateClient = async () => {
// //     if (!clientForm.email.trim() || !clientForm.name.trim() || !clientForm.companyName.trim())
// //       return showToast('err', 'Email, name & company name are required');
// //     setBusy(true);
// //     try {
// //       const payload: any = {
// //         email: clientForm.email.trim(),
// //         name: clientForm.name.trim(),
// //         companyName: clientForm.companyName.trim(),
// //       };
// //       Object.entries(clientForm).forEach(([k, v]) => {
// //         if (!['email','name','companyName'].includes(k) && v.trim()) payload[k] = v.trim();
// //       });
// //       await createClient(payload);
// //       showToast('ok', 'Client created successfully');
// //       setShowCreateClientForm(false);
// //       setClientForm({
// //         email: '', name: '', phoneNumber: '', gender: '', dob: '', photoUrl: '',
// //         address: '', companyName: '', companyMobileNumber: '', companyEmail: '',
// //         orgType: '', clientType: '', clientWebsite: '', notes: '',
// //       });
// //       await loadPartnerData();
// //     } catch (err: any) { showToast('err', err?.message || 'Failed to create client'); }
// //     finally { setBusy(false); }
// //   };

// //   const openClientDetail = async (client: Client) => {
// //     setSelectedClient(client);
// //     setSelectedProject(null);
// //     setProjectHistory([]);
// //     setClientProjects([]); setClientPayments([]);
// //     setLoadingClientDetail(true);
// //     try {
// //       const [projRes, payRes] = await Promise.all([
// //         getAllClientProjects(client.clientId).catch(() => ({ data: [] })),
// //         getClientPayments(client.clientId).catch(() => ({ data: [] })),
// //       ]);
// //       setClientProjects(projRes.data || []);
// //       setClientPayments(payRes.data || []);
// //     } catch { showToast('err', 'Failed to load client details'); }
// //     finally { setLoadingClientDetail(false); }
// //   };

// //   const closeClientDetail = () => {
// //     setSelectedClient(null); setSelectedProject(null); setProjectHistory([]);
// //     setClientProjects([]); setClientPayments([]);
// //     setProjectSearch(''); setProjectStatusFilter('ALL'); setPaymentStatusFilter('ALL');
// //   };

// //   const openProjectDetail = async (project: Project) => {
// //     if (!selectedClient) return;
// //     setSelectedProject(project);
// //     setProjectHistory([]);
// //     setLoadingHistory(true);
// //     try {
// //       const res = await getProjectHistory(selectedClient.clientId, project.projectId);
// //       setProjectHistory(res.data || []);
// //     } catch { showToast('err', 'Failed to load project history'); }
// //     finally { setLoadingHistory(false); }
// //   };

// //   const handleCreateProject = async () => {
// //     if (!selectedClient) return;
// //     if (!projectForm.projectName.trim()) return showToast('err', 'Project name required');
// //     setBusy(true);
// //     try {
// //       const payload: any = { projectName: projectForm.projectName.trim() };
// //       if (projectForm.projectDescription.trim()) payload.projectDescription = projectForm.projectDescription.trim();
// //       if (projectForm.projectType) payload.projectType = projectForm.projectType;
// //       if (projectForm.departmentId) payload.departmentId = Number(projectForm.departmentId);
// //       if (projectForm.cost) payload.cost = projectForm.cost;
// //       if (projectForm.deadline)
// //         payload.deadline = projectForm.deadline.length === 16 ? projectForm.deadline + ':00' : projectForm.deadline;

// //       await createProjectForClient(selectedClient.clientId, payload);
// //       showToast('ok', 'Project created successfully');
// //       setShowCreateProjectForm(false);
// //       setProjectForm({ projectName: '', projectDescription: '', projectType: 'WEB', departmentId: '', cost: '', deadline: '' });
// //       const projRes = await getAllClientProjects(selectedClient.clientId);
// //       setClientProjects(projRes.data || []);
// //     } catch (err: any) { showToast('err', err?.message || 'Failed to create project'); }
// //     finally { setBusy(false); }
// //   };

// //   const handleUpdateStatus = async (partnerId: number, status: string) => {
// //     setBusy(true);
// //     try {
// //       await updatePartnerStatus(partnerId, status, `Set to ${status} by Head Director`);
// //       showToast('ok', 'Partner status updated');
// //       setAllPartners(prev => prev.map(p =>
// //         p.partnerId === partnerId ? { ...p, partnerStatus: status, isApproved: status === 'APPROVED' } : p
// //       ));
// //     } catch (err: any) { showToast('err', err?.message || 'Failed to update'); }
// //     finally { setBusy(false); }
// //   };

// //   const canCreate = profile?.partnerStatus === 'APPROVED';
// //   const menuItems = isDirector ? directorMenuItems : partnerMenuItems;

// //   // ---------- DERIVED ----------
// //   const filteredClients = useMemo(() => {
// //     let list = clients;
// //     if (clientStatusFilter !== 'ALL')
// //       list = list.filter(c => (c.isApproved ? 'APPROVED' : 'PENDING') === clientStatusFilter);
// //     const q = clientSearch.trim().toLowerCase();
// //     if (q) list = list.filter(c =>
// //       c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) ||
// //       c.companyName?.toLowerCase().includes(q) || c.phoneNumber?.toLowerCase().includes(q));
// //     return list;
// //   }, [clients, clientSearch, clientStatusFilter]);

// //   const filteredProjects = useMemo(() => {
// //     let list = clientProjects;
// //     if (projectStatusFilter !== 'ALL') list = list.filter(p => p.status === projectStatusFilter);
// //     const q = projectSearch.trim().toLowerCase();
// //     if (q) list = list.filter(p =>
// //       p.projectName?.toLowerCase().includes(q) ||
// //       p.projectDescription?.toLowerCase().includes(q) ||
// //       p.projectType?.toLowerCase().includes(q));
// //     return list;
// //   }, [clientProjects, projectSearch, projectStatusFilter]);

// //   const filteredPayments = useMemo(() => {
// //     let list = clientPayments;
// //     if (paymentStatusFilter !== 'ALL') list = list.filter(p => p.status === paymentStatusFilter);
// //     return list;
// //   }, [clientPayments, paymentStatusFilter]);

// //   const filteredPartners = useMemo(() => {
// //     let list = allPartners;
// //     if (partnerStatusFilter !== 'ALL') list = list.filter(p => p.partnerStatus === partnerStatusFilter);
// //     const q = partnerSearch.trim().toLowerCase();
// //     if (q) list = list.filter(p =>
// //       p.companyName?.toLowerCase().includes(q) || p.partnerName?.toLowerCase().includes(q) ||
// //       p.partnerEmail?.toLowerCase().includes(q) || p.partnerCode?.toLowerCase().includes(q));
// //     return list;
// //   }, [allPartners, partnerSearch, partnerStatusFilter]);

// //   const projectPaymentsForSelected = useMemo(() => {
// //     if (!selectedProject) return [];
// //     return clientPayments.filter(p =>
// //       // best-effort match since payment response doesn't carry projectId — show all client payments
// //       true
// //     );
// //   }, [selectedProject, clientPayments]);

// //   if (loading) {
// //     return <div className="client-loader"><div className="loader-spinner"></div></div>;
// //   }

// //   // ============================================
// //   // RENDER
// //   // ============================================
// //   return (
// //     <div className="client-container">
// //       <CommonSidebar
// //         activeNav={activeNav}
// //         setActiveNav={(id: string) => {
// //           setActiveNav(id);
// //           setSelectedClient(null); setSelectedProject(null); setProjectHistory([]);
// //           setShowCreateClientForm(false); setShowCreateProjectForm(false); setShowRegisterForm(false);
// //         }}
// //         onLogout={handleLogout}
// //         onThemeToggle={toggleDarkMode}
// //         darkMode={darkMode}
// //         user={user ? { name: user.name, email: user.email, photoUrl: user.photoUrl } : null}
// //         menuItems={menuItems}
// //         title="Partner Portal"
// //         logoIcon="🤝"
// //         isOpen={mobileSidebarOpen}
// //         onClose={() => setMobileSidebarOpen(false)}
// //       />

// //       <button className="mobile-menu-btn" onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>☰</button>

// //       <main className="client-main">
// //         <header className="client-header">
// //           <div className="header-welcome">
// //             <h1>Welcome back, {user?.name?.split(' ')[0] || 'Partner'}!</h1>
// //             <p>Partner Dashboard — Client & Project Management</p>
// //           </div>
// //           <div className="header-stats">
// //             <div className="header-stat-item">
// //               <span className="stat-label">Status</span>
// //               <span className="stat-value-sm">
// //                 {profile ? getStatusBadge(profile.partnerStatus)
// //                   : <span className="status-badge status-pending">⏳ Not Registered</span>}
// //               </span>
// //             </div>
// //             {dashboard && (
// //               <>
// //                 <div className="header-stat-item">
// //                   <span className="stat-label">Clients</span>
// //                   <span className="stat-value-sm">{dashboard.totalClients} total</span>
// //                 </div>
// //                 <div className="header-stat-item">
// //                   <span className="stat-label">Projects</span>
// //                   <span className="stat-value-sm">{dashboard.activeProjects} active</span>
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         </header>

// //         {/* ============ DASHBOARD ============ */}
// //         {activeNav === 'dashboard' && (
// //           <>
// //             {noProfile && !showRegisterForm && (
// //               <div className="dashboard-card">
// //                 <div className="card-header">
// //                   <h2>Become a Partner</h2>
// //                   <p className="card-subtitle">Register as a partner to manage clients, projects & payments</p>
// //                 </div>
// //                 <div className="empty-hero">
// //                   <div className="hero-icon">🤝</div>
// //                   <p className="hero-text">You haven't registered as a partner yet. Submit your application to get started.</p>
// //                   <button className="btn-primary" onClick={() => setShowRegisterForm(true)}>Register as Partner</button>
// //                 </div>
// //               </div>
// //             )}

// //             {noProfile && showRegisterForm && (
// //               <div className="dashboard-card full-width">
// //                 <div className="card-header">
// //                   <h2>Register as Partner</h2>
// //                   <button className="btn-outline btn-sm" onClick={() => setShowRegisterForm(false)}>← Cancel</button>
// //                 </div>
// //                 <div className="details-grid">
// //                   <div className="form-field"><label>Company Name *</label><input value={registerForm.companyName} onChange={(e) => setRegisterForm({ ...registerForm, companyName: e.target.value })} placeholder="XYZ Partners Pvt Ltd" /></div>
// //                   <div className="form-field"><label>Company Email</label><input type="email" value={registerForm.companyEmail} onChange={(e) => setRegisterForm({ ...registerForm, companyEmail: e.target.value })} /></div>
// //                   <div className="form-field"><label>Company Mobile</label><input value={registerForm.companyMobileNumber} onChange={(e) => setRegisterForm({ ...registerForm, companyMobileNumber: e.target.value })} /></div>
// //                   <div className="form-field"><label>Website</label><input value={registerForm.companyWebsite} onChange={(e) => setRegisterForm({ ...registerForm, companyWebsite: e.target.value })} /></div>
// //                   <div className="form-field"><label>Contact Person</label><input value={registerForm.contactPersonName} onChange={(e) => setRegisterForm({ ...registerForm, contactPersonName: e.target.value })} /></div>
// //                   <div className="form-field"><label>Designation</label><input value={registerForm.contactPersonDesignation} onChange={(e) => setRegisterForm({ ...registerForm, contactPersonDesignation: e.target.value })} /></div>
// //                   <div className="form-field span-2"><label>Address</label><textarea value={registerForm.companyAddress} onChange={(e) => setRegisterForm({ ...registerForm, companyAddress: e.target.value })} rows={2} /></div>
// //                   <div className="form-field span-2">
// //                     <label>Services Offered</label>
// //                     <div className="skills-tags">
// //                       {SERVICES.map((s) => {
// //                         const sel = registerForm.servicesOffered.includes(s);
// //                         return (
// //                           <span key={s} className={`skill-tag ${sel ? 'selected' : ''}`}
// //                             onClick={() => setRegisterForm({
// //                               ...registerForm,
// //                               servicesOffered: sel ? registerForm.servicesOffered.filter(x => x !== s) : [...registerForm.servicesOffered, s],
// //                             })}>{s.replace('_', ' ')}</span>
// //                         );
// //                       })}
// //                     </div>
// //                   </div>
// //                   <div className="form-field">
// //                     <label>Agreement Type *</label>
// //                     <select value={registerForm.agreementType} onChange={(e) => setRegisterForm({ ...registerForm, agreementType: e.target.value })}>
// //                       {AGREEMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
// //                     </select>
// //                   </div>
// //                   <div className="form-field"><label>Agreement Value</label><input type="number" step="0.01" value={registerForm.agreementValue} onChange={(e) => setRegisterForm({ ...registerForm, agreementValue: e.target.value })} placeholder="15" /></div>
// //                   <div className="form-field span-2"><label>Agreement PDF Drive Link *</label><input value={registerForm.agreementPdfDriveLink} onChange={(e) => setRegisterForm({ ...registerForm, agreementPdfDriveLink: e.target.value })} placeholder="https://drive.google.com/..." /></div>
// //                   <div className="form-field"><label>Start Date</label><input type="date" value={registerForm.agreementStartDate} onChange={(e) => setRegisterForm({ ...registerForm, agreementStartDate: e.target.value })} /></div>
// //                   <div className="form-field"><label>End Date</label><input type="date" value={registerForm.agreementEndDate} onChange={(e) => setRegisterForm({ ...registerForm, agreementEndDate: e.target.value })} /></div>
// //                   <div className="form-field span-2"><label>Internal Notes</label><textarea value={registerForm.internalNotes} onChange={(e) => setRegisterForm({ ...registerForm, internalNotes: e.target.value })} rows={2} /></div>
// //                 </div>
// //                 <div className="form-actions">
// //                   <button className="btn-outline" onClick={() => setShowRegisterForm(false)}>Cancel</button>
// //                   <button className="btn-primary" onClick={handleRegisterPartner} disabled={busy}>{busy ? 'Submitting…' : 'Submit Registration'}</button>
// //                 </div>
// //               </div>
// //             )}

// //             {profile && dashboard && (
// //               <>
// //                 <div className="stats-grid">
// //                   <div className="stat-card"><div className="stat-icon purple">👥</div><div className="stat-info"><span className="stat-value">{dashboard.totalClients}</span><span className="stat-label">Total Clients</span></div></div>
// //                   <div className="stat-card"><div className="stat-icon orange">⏳</div><div className="stat-info"><span className="stat-value">{dashboard.pendingClients}</span><span className="stat-label">Pending Clients</span></div></div>
// //                   <div className="stat-card"><div className="stat-icon green">🚀</div><div className="stat-info"><span className="stat-value">{dashboard.activeProjects}</span><span className="stat-label">Active Projects</span></div></div>
// //                   <div className="stat-card"><div className="stat-icon blue">💰</div><div className="stat-info"><span className="stat-value" style={{ fontSize: '1.3rem' }}>{fmtMoney(dashboard.totalApprovedRevenue)}</span><span className="stat-label">Approved Revenue</span></div></div>
// //                 </div>

// //                 <div className="dashboard-card">
// //                   <div className="card-header"><h2>Partner Profile</h2>{getStatusBadge(profile.partnerStatus)}</div>
// //                   <div className="details-grid">
// //                     <div className="detail-item"><label>Company</label><span>{profile.companyName}</span></div>
// //                     <div className="detail-item"><label>Partner Code</label><span style={{ color: 'var(--teal)', fontWeight: 600 }}>{profile.partnerCode}</span></div>
// //                     <div className="detail-item"><label>Contact</label><span>{profile.partnerName}</span></div>
// //                     <div className="detail-item"><label>Email</label><span>{profile.partnerEmail}</span></div>
// //                     <div className="detail-item"><label>Agreement</label><span>{profile.agreementType} · {profile.agreementValue}</span></div>
// //                     <div className="detail-item"><label>Validity</label><span>{fmtShort(profile.agreementStartDate)} → {fmtShort(profile.agreementEndDate)}</span></div>
// //                     <div className="detail-item span-2">
// //                       <label>Services</label>
// //                       <div className="skills-tags">
// //                         {profile.servicesOffered?.map(s => <span key={s} className="skill-tag">{s.replace('_', ' ')}</span>)}
// //                       </div>
// //                     </div>
// //                   </div>
// //                   {profile.directorNote && (
// //                     <div className="warning-banner" style={{ marginTop: '1rem' }}><strong>Director Note:</strong> {profile.directorNote}</div>
// //                   )}
// //                 </div>

// //                 <div className="dashboard-card">
// //                   <div className="card-header">
// //                     <h2>Recent Clients</h2>
// //                     <button className="view-all-link" onClick={() => setActiveNav('my-clients')}>View All →</button>
// //                   </div>
// //                   <div className="projects-grid">
// //                     {dashboard.recentClients?.slice(0, 3).map(c => (
// //                       <div key={c.mappingId} className="project-card">
// //                         <div className="project-card-header">
// //                           <h3>{c.name}</h3>
// //                           {getStatusBadge(c.isApproved ? 'APPROVED' : 'PENDING')}
// //                         </div>
// //                         <p className="project-card-desc">{c.companyName}</p>
// //                         <div className="project-card-meta">
// //                           <span>✉ {c.email}</span>
// //                           {c.phoneNumber && <span>📞 {c.phoneNumber}</span>}
// //                         </div>
// //                         <div className="project-card-actions">
// //                           <button className="btn-sm btn-primary" onClick={() => { setActiveNav('my-clients'); openClientDetail(c); }}>View Details</button>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                   {(!dashboard.recentClients || dashboard.recentClients.length === 0) && (
// //                     <div className="empty-state"><span className="empty-icon">📭</span><p>No clients yet. Create your first client!</p></div>
// //                   )}
// //                 </div>
// //               </>
// //             )}
// //           </>
// //         )}

// //         {/* ============ MY CLIENTS (list) ============ */}
// //         {activeNav === 'my-clients' && !selectedClient && (
// //           <div className="dashboard-card full-width">
// //             <div className="card-header">
// //               <h2>My Clients</h2>
// //               {!showCreateClientForm && (
// //                 <button className="btn-primary" onClick={() => setShowCreateClientForm(true)} disabled={!canCreate}>+ New Client</button>
// //               )}
// //             </div>

// //             {!canCreate && !showCreateClientForm && (
// //               <div className="warning-banner" style={{ marginBottom: '1rem' }}>
// //                 ⚠️ Partner account is <strong>{profile?.partnerStatus}</strong>. You need APPROVED status to create clients.
// //               </div>
// //             )}

// //             {showCreateClientForm && (
// //               <div className="inline-form-card">
// //                 <div className="card-header" style={{ marginBottom: '1rem' }}>
// //                   <h3>Create New Client</h3>
// //                   <button className="btn-outline btn-sm" onClick={() => setShowCreateClientForm(false)}>← Back</button>
// //                 </div>
// //                 <div className="details-grid">
// //                   <div className="form-field"><label>Client Email *</label><input type="email" value={clientForm.email} onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })} /></div>
// //                   <div className="form-field"><label>Client Name *</label><input value={clientForm.name} onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })} /></div>
// //                   <div className="form-field span-2"><label>Company Name *</label><input value={clientForm.companyName} onChange={(e) => setClientForm({ ...clientForm, companyName: e.target.value })} /></div>
// //                   <div className="form-field"><label>Phone</label><input value={clientForm.phoneNumber} onChange={(e) => setClientForm({ ...clientForm, phoneNumber: e.target.value })} /></div>
// //                   <div className="form-field">
// //                     <label>Gender</label>
// //                     <select value={clientForm.gender} onChange={(e) => setClientForm({ ...clientForm, gender: e.target.value })}>
// //                       <option value="">—</option>
// //                       <option value="MALE">Male</option>
// //                       <option value="FEMALE">Female</option>
// //                       <option value="OTHER">Other</option>
// //                     </select>
// //                   </div>
// //                   <div className="form-field"><label>DOB</label><input type="date" value={clientForm.dob} onChange={(e) => setClientForm({ ...clientForm, dob: e.target.value })} /></div>
// //                   <div className="form-field"><label>Photo URL</label><input value={clientForm.photoUrl} onChange={(e) => setClientForm({ ...clientForm, photoUrl: e.target.value })} /></div>
// //                   <div className="form-field span-2"><label>Address</label><textarea value={clientForm.address} onChange={(e) => setClientForm({ ...clientForm, address: e.target.value })} rows={2} /></div>
// //                   <div className="form-field"><label>Company Mobile</label><input value={clientForm.companyMobileNumber} onChange={(e) => setClientForm({ ...clientForm, companyMobileNumber: e.target.value })} /></div>
// //                   <div className="form-field"><label>Company Email</label><input type="email" value={clientForm.companyEmail} onChange={(e) => setClientForm({ ...clientForm, companyEmail: e.target.value })} /></div>
// //                   <div className="form-field"><label>Org Type</label><input value={clientForm.orgType} onChange={(e) => setClientForm({ ...clientForm, orgType: e.target.value })} /></div>
// //                   <div className="form-field"><label>Client Type</label><input value={clientForm.clientType} onChange={(e) => setClientForm({ ...clientForm, clientType: e.target.value })} /></div>
// //                   <div className="form-field span-2"><label>Website</label><input value={clientForm.clientWebsite} onChange={(e) => setClientForm({ ...clientForm, clientWebsite: e.target.value })} /></div>
// //                   <div className="form-field span-2"><label>Notes</label><textarea value={clientForm.notes} onChange={(e) => setClientForm({ ...clientForm, notes: e.target.value })} rows={2} /></div>
// //                 </div>
// //                 <div className="form-actions">
// //                   <button className="btn-outline" onClick={() => setShowCreateClientForm(false)}>Cancel</button>
// //                   <button className="btn-primary" onClick={handleCreateClient} disabled={busy}>{busy ? 'Creating…' : 'Create Client'}</button>
// //                 </div>
// //               </div>
// //             )}

// //             {!showCreateClientForm && (
// //               <>
// //                 <div className="filter-bar">
// //                   <div className="search-input-wrap">
// //                     <span className="search-icon">🔍</span>
// //                     <input className="search-input" placeholder="Search by name, email, company, phone…"
// //                       value={clientSearch} onChange={(e) => setClientSearch(e.target.value)} />
// //                     {clientSearch && <button className="clear-btn" onClick={() => setClientSearch('')}>✕</button>}
// //                   </div>
// //                   <select className="filter-select" value={clientStatusFilter} onChange={(e) => setClientStatusFilter(e.target.value)}>
// //                     <option value="ALL">All Status</option>
// //                     <option value="APPROVED">Approved</option>
// //                     <option value="PENDING">Pending</option>
// //                   </select>
// //                 </div>

// //                 {filteredClients.length === 0 ? (
// //                   <div className="empty-state">
// //                     <span className="empty-icon">👥</span>
// //                     <p>{clients.length === 0 ? 'No clients yet. Create your first client to get started.' : 'No clients match your filters.'}</p>
// //                   </div>
// //                 ) : (
// //                   <div className="projects-grid">
// //                     {filteredClients.map(c => (
// //                       <div key={c.mappingId} className="project-card">
// //                         <div className="project-card-header">
// //                           <h3>{c.name}</h3>
// //                           {getStatusBadge(c.isApproved ? 'APPROVED' : 'PENDING')}
// //                         </div>
// //                         <p className="project-card-desc">{c.companyName}</p>
// //                         <div className="project-card-meta">
// //                           <span>✉ {c.email}</span>
// //                           {c.phoneNumber && <span>📞 {c.phoneNumber}</span>}
// //                           <span>📅 {fmtShort(c.assignedAt)}</span>
// //                         </div>
// //                         {c.notes && <div className="project-card-manager">📝 {c.notes}</div>}
// //                         <div className="project-card-actions">
// //                           <button className="btn-sm btn-primary" onClick={() => openClientDetail(c)}>View Details</button>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </>
// //             )}
// //           </div>
// //         )}

// //         {/* ============ CLIENT DETAIL (with project history) ============ */}
// //         {activeNav === 'my-clients' && selectedClient && (
// //           <div className="dashboard-card full-width">
// //             {/* Breadcrumb */}
// //             <div className="breadcrumb">
// //               <button className="crumb-link" onClick={closeClientDetail}>My Clients</button>
// //               <span className="crumb-sep">›</span>
// //               <span className="crumb-current">{selectedClient.name}</span>
// //               {selectedProject && (
// //                 <>
// //                   <span className="crumb-sep">›</span>
// //                   <span className="crumb-current">{selectedProject.projectName}</span>
// //                   <button className="crumb-link" style={{ marginLeft: '0.5rem' }} onClick={() => { setSelectedProject(null); setProjectHistory([]); }}>✕ clear</button>
// //                 </>
// //               )}
// //             </div>

// //             <div className="card-header">
// //               <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
// //                 <h2 style={{ margin: 0 }}>{selectedClient.name}</h2>
// //                 {getStatusBadge(selectedClient.isApproved ? 'APPROVED' : 'PENDING')}
// //               </div>
// //             </div>

// //             <div className="details-grid" style={{ marginBottom: '1.5rem' }}>
// //               <div className="detail-item"><label>Company</label><span>{selectedClient.companyName}</span></div>
// //               <div className="detail-item"><label>Email</label><span>{selectedClient.email}</span></div>
// //               <div className="detail-item"><label>Phone</label><span>{selectedClient.phoneNumber || '—'}</span></div>
// //               <div className="detail-item"><label>Company Email</label><span>{selectedClient.companyEmail || '—'}</span></div>
// //               <div className="detail-item"><label>Assigned</label><span>{fmtShort(selectedClient.assignedAt)}</span></div>
// //               <div className="detail-item"><label>Mapping Status</label><span>{selectedClient.mappingStatus}</span></div>
// //               {selectedClient.notes && <div className="detail-item span-2"><label>Notes</label><span>{selectedClient.notes}</span></div>}
// //             </div>

// //             {loadingClientDetail ? (
// //               <div className="loading-inline"><div className="loader-spinner" /></div>
// //             ) : (
// //               <>
// //                 {/* Projects */}
// //                 <div className="section-header">
// //                   <h3>🚀 Projects ({filteredProjects.length}{filteredProjects.length !== clientProjects.length ? ` of ${clientProjects.length}` : ''})</h3>
// //                   <button className="btn-primary btn-sm" onClick={() => setShowCreateProjectForm(true)} disabled={!canCreate || showCreateProjectForm}>+ New Project</button>
// //                 </div>

// //                 {showCreateProjectForm && (
// //                   <div className="inline-form-card" style={{ marginBottom: '1rem' }}>
// //                     <div className="card-header" style={{ marginBottom: '1rem' }}>
// //                       <h4>Create New Project</h4>
// //                       <button className="btn-outline btn-sm" onClick={() => setShowCreateProjectForm(false)}>← Back</button>
// //                     </div>
// //                     <div className="details-grid">
// //                       <div className="form-field"><label>Project Name *</label><input value={projectForm.projectName} onChange={(e) => setProjectForm({ ...projectForm, projectName: e.target.value })} /></div>
// //                       <div className="form-field">
// //                         <label>Type</label>
// //                         <select value={projectForm.projectType} onChange={(e) => setProjectForm({ ...projectForm, projectType: e.target.value })}>
// //                           <option value="WEB">WEB</option><option value="MOBILE">MOBILE</option>
// //                           <option value="DESKTOP">DESKTOP</option><option value="OTHER">OTHER</option>
// //                         </select>
// //                       </div>
// //                       <div className="form-field span-2"><label>Description</label><textarea value={projectForm.projectDescription} onChange={(e) => setProjectForm({ ...projectForm, projectDescription: e.target.value })} rows={2} /></div>
// //                       <div className="form-field"><label>Department ID</label><input type="number" value={projectForm.departmentId} onChange={(e) => setProjectForm({ ...projectForm, departmentId: e.target.value })} /></div>
// //                       <div className="form-field"><label>Cost</label><input value={projectForm.cost} onChange={(e) => setProjectForm({ ...projectForm, cost: e.target.value })} placeholder="25000" /></div>
// //                       <div className="form-field span-2"><label>Deadline</label><input type="datetime-local" value={projectForm.deadline} onChange={(e) => setProjectForm({ ...projectForm, deadline: e.target.value })} /></div>
// //                     </div>
// //                     <div className="form-actions">
// //                       <button className="btn-outline" onClick={() => setShowCreateProjectForm(false)}>Cancel</button>
// //                       <button className="btn-primary" onClick={handleCreateProject} disabled={busy}>{busy ? 'Creating…' : 'Create Project'}</button>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {clientProjects.length > 0 && !showCreateProjectForm && (
// //                   <div className="filter-bar" style={{ marginBottom: '1rem' }}>
// //                     <div className="search-input-wrap">
// //                       <span className="search-icon">🔍</span>
// //                       <input className="search-input" placeholder="Search projects…" value={projectSearch} onChange={(e) => setProjectSearch(e.target.value)} />
// //                       {projectSearch && <button className="clear-btn" onClick={() => setProjectSearch('')}>✕</button>}
// //                     </div>
// //                     <select className="filter-select" value={projectStatusFilter} onChange={(e) => setProjectStatusFilter(e.target.value)}>
// //                       <option value="ALL">All Status</option>
// //                       <option value="PENDING">Pending</option>
// //                       <option value="ASSIGNED">Assigned</option>
// //                       <option value="IN_PROGRESS">In Progress</option>
// //                       <option value="COMPLETED">Completed</option>
// //                     </select>
// //                   </div>
// //                 )}

// //                 {filteredProjects.length === 0 ? (
// //                   <div className="empty-state"><span className="empty-icon">🚀</span><p>{clientProjects.length === 0 ? 'No projects yet.' : 'No projects match your filters.'}</p></div>
// //                 ) : (
// //                   <div className="projects-grid">
// //                     {filteredProjects.map(p => (
// //                       <div key={p.projectId}
// //                         className={`project-card clickable ${selectedProject?.projectId === p.projectId ? 'active' : ''}`}
// //                         onClick={() => openProjectDetail(p)}>
// //                         <div className="project-card-header"><h3>{p.projectName}</h3>{getStatusBadge(p.status)}</div>
// //                         <p className="project-card-desc">{p.projectDescription || '—'}</p>
// //                         <div className="project-card-meta">
// //                           <span>🧩 {p.projectType || '—'}</span>
// //                           <span>🏢 {p.departmentName || 'No dept'}</span>
// //                           <span>💰 {p.cost ? fmtMoney(p.cost) : '—'}</span>
// //                           {p.deadline && <span>📅 {fmtShort(p.deadline)}</span>}
// //                         </div>
// //                         <div className="card-cta">View History →</div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}

// //                 {/* ============ PROJECT HISTORY PANEL ============ */}
// //                 {selectedProject && (
// //                   <div className="history-panel">
// //                     <div className="history-header">
// //                       <div>
// //                         <h3 style={{ margin: 0 }}>📜 {selectedProject.projectName} — History</h3>
// //                         <p className="history-sub">Complete status timeline</p>
// //                       </div>
// //                       <button className="btn-outline btn-sm" onClick={() => { setSelectedProject(null); setProjectHistory([]); }}>✕ Close</button>
// //                     </div>

// //                     {loadingHistory ? (
// //                       <div className="loading-inline"><div className="loader-spinner" /></div>
// //                     ) : projectHistory.length === 0 ? (
// //                       <div className="empty-state"><span className="empty-icon">📜</span><p>No history records found.</p></div>
// //                     ) : (
// //                       <div className="timeline">
// //                         {[...projectHistory].reverse().map((h, idx) => (
// //                           <div key={h.statusId || idx} className="timeline-item">
// //                             <div className="timeline-rail">
// //                               <div className={`timeline-dot dot-${h.status?.toLowerCase()}`} />
// //                               {idx !== projectHistory.length - 1 && <div className="timeline-line" />}
// //                             </div>
// //                             <div className="timeline-body">
// //                               <div className="timeline-top">
// //                                 <span className={`timeline-status status-pill pill-${h.status?.toLowerCase()}`}>
// //                                   {statusConfig[h.status]?.icon || '📌'} {h.status}
// //                                 </span>
// //                                 <span className="timeline-date">{fmtDate(h.dateTime)} · {relTime(h.dateTime)}</span>
// //                               </div>
// //                               <div className="timeline-meta">
// //                                 {h.handledByName && <span>👤 Handled by <strong>{h.handledByName}</strong></span>}
// //                                 {h.assignedToName && <span>➡️ Assigned to <strong>{h.assignedToName}</strong></span>}
// //                                 {h.deadline && <span>📅 Deadline {fmtShort(h.deadline)}</span>}
// //                               </div>
// //                               {h.directorNote && <div className="note-box director">🎯 <strong>Director:</strong> {h.directorNote}</div>}
// //                               {h.managerNote && <div className="note-box manager">🧑‍💼 <strong>Manager:</strong> {h.managerNote}</div>}
// //                             </div>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}

// //                 {/* Payments */}
// //                 <div className="section-header" style={{ marginTop: '2rem' }}>
// //                   <h3>💳 Payments ({filteredPayments.length}{filteredPayments.length !== clientPayments.length ? ` of ${clientPayments.length}` : ''})</h3>
// //                   {clientPayments.length > 0 && (
// //                     <select className="filter-select" value={paymentStatusFilter} onChange={(e) => setPaymentStatusFilter(e.target.value)}>
// //                       <option value="ALL">All Status</option>
// //                       <option value="PENDING">Pending</option>
// //                       <option value="APPROVED">Approved</option>
// //                       <option value="REJECTED">Rejected</option>
// //                     </select>
// //                   )}
// //                 </div>

// //                 {filteredPayments.length === 0 ? (
// //                   <div className="empty-state"><span className="empty-icon">💳</span><p>{clientPayments.length === 0 ? 'No payments yet.' : 'No payments match your filter.'}</p></div>
// //                 ) : (
// //                   <div className="payment-table-wrap">
// //                     <table className="payment-table">
// //                       <thead>
// //                         <tr>
// //                           <th>Transaction</th>
// //                           <th>Amount</th>
// //                           <th>Date</th>
// //                           <th>Status</th>
// //                           <th>User</th>
// //                           <th>Approved By</th>
// //                           <th>Note</th>
// //                         </tr>
// //                       </thead>
// //                       <tbody>
// //                         {filteredPayments.map(p => (
// //                           <tr key={p.paymentId}>
// //                             <td className="mono">{p.transactionId}</td>
// //                             <td className="amount">{fmtMoney(p.amount)}</td>
// //                             <td>{fmtShort(p.dateTime)}</td>
// //                             <td>{getStatusBadge(p.status)}</td>
// //                             <td>{p.userName || '—'}<br /><small>{p.userEmail}</small></td>
// //                             <td>{p.approvedByName || '—'}</td>
// //                             <td className="note-cell">{p.paymentNote || '—'}</td>
// //                           </tr>
// //                         ))}
// //                       </tbody>
// //                     </table>
// //                   </div>
// //                 )}
// //               </>
// //             )}
// //           </div>
// //         )}

// //         {/* ============ MY DETAILS ============ */}
// //         {activeNav === 'my-details' && profile && (
// //           <div className="dashboard-card full-width">
// //             <div className="card-header"><h2>My Partner Details</h2>{getStatusBadge(profile.partnerStatus)}</div>
// //             <div className="details-grid">
// //               <div className="detail-item"><label>Company Name</label><span>{profile.companyName}</span></div>
// //               <div className="detail-item"><label>Company Email</label><span>{profile.companyEmail || '—'}</span></div>
// //               <div className="detail-item"><label>Company Mobile</label><span>{profile.companyMobileNumber || '—'}</span></div>
// //               <div className="detail-item"><label>Company Website</label><span>{profile.companyWebsite || '—'}</span></div>
// //               <div className="detail-item"><label>Contact Person</label><span>{profile.contactPersonName || '—'}</span></div>
// //               <div className="detail-item"><label>Designation</label><span>{profile.contactPersonDesignation || '—'}</span></div>
// //               <div className="detail-item"><label>Partner Code</label><span style={{ color: 'var(--teal)', fontWeight: 600 }}>{profile.partnerCode}</span></div>
// //               <div className="detail-item"><label>Agreement Type</label><span>{profile.agreementType}</span></div>
// //               <div className="detail-item"><label>Agreement Value</label><span>{profile.agreementValue}</span></div>
// //               <div className="detail-item"><label>Start Date</label><span>{fmtShort(profile.agreementStartDate)}</span></div>
// //               <div className="detail-item"><label>End Date</label><span>{fmtShort(profile.agreementEndDate)}</span></div>
// //               <div className="detail-item"><label>Approved</label><span>{profile.isApproved ? '✅ Yes' : '❌ No'}</span></div>
// //               <div className="detail-item span-2">
// //                 <label>Services Offered</label>
// //                 <div className="skills-tags">{profile.servicesOffered?.map(s => <span key={s} className="skill-tag">{s.replace('_', ' ')}</span>)}</div>
// //               </div>
// //               <div className="detail-item span-2">
// //                 <label>Agreement PDF</label>
// //                 <a href={profile.agreementPdfDriveLink} target="_blank" rel="noopener noreferrer" className="resume-link">📄 View Agreement</a>
// //               </div>
// //             </div>
// //             {profile.directorNote && (
// //               <div className="warning-banner" style={{ marginTop: '1rem' }}><strong>Director Note:</strong> {profile.directorNote}</div>
// //             )}
// //           </div>
// //         )}

// //         {/* ============ ALL PARTNERS ============ */}
// //         {activeNav === 'all-partners' && isDirector && (
// //           <div className="dashboard-card full-width">
// //             <div className="card-header">
// //               <h2>All Partners</h2>
// //               <span className="activity-badge">{filteredPartners.length} of {allPartners.length}</span>
// //             </div>

// //             <div className="filter-bar">
// //               <div className="search-input-wrap">
// //                 <span className="search-icon">🔍</span>
// //                 <input className="search-input" placeholder="Search by company, name, email, code…"
// //                   value={partnerSearch} onChange={(e) => setPartnerSearch(e.target.value)} />
// //                 {partnerSearch && <button className="clear-btn" onClick={() => setPartnerSearch('')}>✕</button>}
// //               </div>
// //               <select className="filter-select" value={partnerStatusFilter} onChange={(e) => setPartnerStatusFilter(e.target.value)}>
// //                 <option value="ALL">All Status</option>
// //                 <option value="PENDING">Pending</option>
// //                 <option value="APPROVED">Approved</option>
// //                 <option value="BLOCKED">Blocked</option>
// //                 <option value="DEACTIVATED">Deactivated</option>
// //               </select>
// //             </div>

// //             {filteredPartners.length === 0 ? (
// //               <div className="empty-state"><span className="empty-icon">🤝</span><p>{allPartners.length === 0 ? 'No partners found.' : 'No partners match your filters.'}</p></div>
// //             ) : (
// //               <div className="projects-grid">
// //                 {filteredPartners.map(p => (
// //                   <div key={p.partnerId} className="project-card">
// //                     <div className="project-card-header"><h3>{p.companyName}</h3>{getStatusBadge(p.partnerStatus)}</div>
// //                     <p className="project-card-desc">{p.partnerName} · {p.partnerCode}</p>
// //                     <div className="project-card-meta">
// //                       <span>✉ {p.partnerEmail}</span>
// //                       <span>👥 {p.totalClients} clients</span>
// //                       <span>📋 {p.agreementType}</span>
// //                     </div>
// //                     <div className="project-card-actions">
// //                       {p.partnerStatus !== 'APPROVED' && (
// //                         <button className="btn-sm btn-primary" onClick={() => handleUpdateStatus(p.partnerId, 'APPROVED')} disabled={busy}>✅ Approve</button>
// //                       )}
// //                       {p.partnerStatus === 'APPROVED' && (
// //                         <button className="btn-sm btn-outline" onClick={() => handleUpdateStatus(p.partnerId, 'BLOCKED')} disabled={busy}>🔴 Block</button>
// //                       )}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* ============ PROFILE ============ */}
// //         {activeNav === 'profile' && (
// //           <div className="dashboard-card full-width">
// //             <div className="card-header"><h2>Profile Information</h2></div>
// //             <div className="profile-info">
// //               <div className="profile-avatar-large">
// //                 {user?.photoUrl ? <img src={user.photoUrl} alt={user.name} /> : <div className="avatar-placeholder">{user?.name?.charAt(0) || 'P'}</div>}
// //               </div>
// //               <div className="profile-details">
// //                 <div className="detail-item"><label>Full Name</label><span>{user?.name}</span></div>
// //                 <div className="detail-item"><label>Email</label><span>{user?.email}</span></div>
// //                 <div className="detail-item"><label>Role</label><span>Partner</span></div>
// //                 <div className="detail-item"><label>Phone</label><span>{user?.phoneNumber || 'Not provided'}</span></div>
// //                 <div className="detail-item"><label>Address</label><span>{user?.address || 'Not provided'}</span></div>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         <footer className="client-footer">
// //           <p>© 2026 Softmax Nexus | Developed by <a href="https://softmax.in" style={{ color: 'skyblue' }}>Softmax.in</a></p>
// //         </footer>
// //       </main>

// //       {toast && (
// //         <div className="toast" data-type={toast.type}>{toast.msg}</div>
// //       )}

// //       <style jsx>{`
// //         .span-2 { grid-column: 1 / -1; }
// //         .activity-badge {
// //           background: var(--surface); border: 1px solid var(--border);
// //           border-radius: 20px; padding: 0.25rem 0.75rem;
// //           font-size: 0.75rem; color: var(--muted);
// //         }
// //         .empty-state { text-align: center; padding: 3rem 1rem; color: var(--muted); }
// //         .empty-icon { font-size: 3rem; display: block; margin-bottom: 1rem; opacity: 0.5; }
// //         .empty-hero { text-align: center; padding: 2rem 1rem; }
// //         .hero-icon { font-size: 4rem; margin-bottom: 1rem; opacity: 0.5; }
// //         .hero-text { color: var(--muted); margin-bottom: 1.5rem; max-width: 480px; margin: 0 auto 1.5rem; }

// //         .warning-banner {
// //           padding: 0.75rem 1rem; background: rgba(254, 148, 150, 0.1);
// //           border: 1px solid var(--orange); border-radius: 10px;
// //           font-size: 0.8rem; color: var(--orange);
// //         }
// //         .skills-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
// //         .skill-tag {
// //           background: rgba(44, 166, 164, 0.1); color: var(--teal);
// //           padding: 0.3rem 0.7rem; border-radius: 12px; font-size: 0.72rem;
// //           cursor: pointer; transition: all 0.15s ease; user-select: none;
// //           border: 1px solid transparent;
// //         }
// //         .skill-tag:hover { background: rgba(44, 166, 164, 0.2); }
// //         .skill-tag.selected { background: var(--teal); color: white; border-color: var(--teal); }
// //         .resume-link { color: var(--teal); text-decoration: none; font-weight: 600; }
// //         .resume-link:hover { text-decoration: underline; }

// //         /* Filter bar */
// //         .filter-bar { display: flex; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
// //         .search-input-wrap { position: relative; flex: 1 1 260px; min-width: 200px; }
// //         .search-icon {
// //           position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%);
// //           font-size: 0.85rem; opacity: 0.6; pointer-events: none;
// //         }
// //         .search-input {
// //           width: 100%; padding: 0.65rem 2.2rem 0.65rem 2.4rem;
// //           border: 1px solid var(--border); border-radius: 10px;
// //           background: var(--surface); color: var(--text);
// //           font-size: 0.85rem; outline: none; transition: border-color 0.15s;
// //         }
// //         .search-input:focus { border-color: var(--teal); }
// //         .clear-btn {
// //           position: absolute; right: 0.6rem; top: 50%; transform: translateY(-50%);
// //           background: var(--border); border: none; border-radius: 50%;
// //           width: 20px; height: 20px; font-size: 0.7rem; cursor: pointer;
// //           display: flex; align-items: center; justify-content: center; color: var(--muted);
// //         }
// //         .filter-select {
// //           padding: 0.65rem 1rem; border: 1px solid var(--border); border-radius: 10px;
// //           background: var(--surface); color: var(--text); font-size: 0.85rem; cursor: pointer;
// //           min-width: 140px;
// //         }

// //         /* Inline form card */
// //         .inline-form-card {
// //           padding: 1.5rem; background: var(--surface);
// //           border: 1px solid var(--border); border-radius: 14px;
// //           margin-bottom: 1.5rem; animation: slideDown 0.25s ease;
// //         }
// //         .form-actions { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1.25rem; }
// //         .form-field { display: flex; flex-direction: column; gap: 0.35rem; }
// //         .form-field label { font-size: 0.72rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.03em; }
// //         .form-field input, .form-field textarea, .form-field select {
// //           padding: 0.6rem 0.85rem; border: 1px solid var(--border); border-radius: 8px;
// //           background: var(--card-bg); color: var(--text); font-size: 0.85rem;
// //           font-family: inherit; outline: none; transition: border-color 0.15s;
// //         }
// //         .form-field input:focus, .form-field textarea:focus, .form-field select:focus { border-color: var(--teal); }

// //         /* Breadcrumb */
// //         .breadcrumb {
// //           display: flex; align-items: center; gap: 0.5rem;
// //           font-size: 0.8rem; margin-bottom: 1rem; flex-wrap: wrap;
// //         }
// //         .crumb-link {
// //           background: transparent; border: none; color: var(--teal);
// //           font-weight: 600; cursor: pointer; padding: 0; font-size: 0.8rem;
// //         }
// //         .crumb-link:hover { text-decoration: underline; }
// //         .crumb-sep { color: var(--muted); }
// //         .crumb-current { color: var(--text); font-weight: 600; }

// //         /* Section header */
// //         .section-header {
// //           display: flex; justify-content: space-between; align-items: center;
// //           margin-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem;
// //         }
// //         .section-header h3 { margin: 0; font-size: 1.05rem; font-weight: 700; }

// //         /* Clickable project card */
// //         .project-card.clickable { cursor: pointer; transition: all 0.2s ease; }
// //         .project-card.clickable:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: var(--teal); }
// //         .project-card.clickable.active { border-color: var(--teal); box-shadow: 0 0 0 2px rgba(44,166,164,0.2); }
// //         .card-cta { font-size: 0.75rem; color: var(--teal); font-weight: 600; margin-top: 0.75rem; }

// //         /* HISTORY PANEL */
// //         .history-panel {
// //           margin-top: 2rem; padding: 1.5rem;
// //           background: linear-gradient(135deg, rgba(44,166,164,0.04), rgba(52,168,83,0.04));
// //           border: 1px solid var(--border); border-radius: 16px;
// //           animation: slideDown 0.3s ease;
// //         }
// //         .history-header {
// //           display: flex; justify-content: space-between; align-items: flex-start;
// //           margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;
// //         }
// //         .history-sub { color: var(--muted); font-size: 0.8rem; margin: 0.25rem 0 0; }

// //         .timeline { position: relative; }
// //         .timeline-item { display: flex; gap: 1rem; position: relative; }
// //         .timeline-rail {
// //           display: flex; flex-direction: column; align-items: center;
// //           min-width: 24px;
// //         }
// //         .timeline-dot {
// //           width: 14px; height: 14px; border-radius: 50%;
// //           background: var(--muted); margin-top: 6px;
// //           box-shadow: 0 0 0 4px var(--card-bg); z-index: 2;
// //         }
// //         .timeline-dot.dot-pending { background: #f59e0b; }
// //         .timeline-dot.dot-approved { background: #10b981; }
// //         .timeline-dot.dot-in_progress { background: #3b82f6; }
// //         .timeline-dot.dot-completed { background: #22c55e; }
// //         .timeline-dot.dot-rejected { background: #ef4444; }
// //         .timeline-line {
// //           flex: 1; width: 2px; background: var(--border);
// //           margin: 4px 0; min-height: 30px;
// //         }
// //         .timeline-body {
// //           flex: 1; padding-bottom: 1.5rem;
// //         }
// //         .timeline-top {
// //           display: flex; justify-content: space-between; align-items: center;
// //           gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.4rem;
// //         }
// //         .timeline-status {
// //           font-size: 0.75rem; font-weight: 700;
// //           padding: 0.2rem 0.6rem; border-radius: 20px;
// //           background: var(--surface); color: var(--text);
// //         }
// //         .pill-pending { background: rgba(245,158,11,0.15); color: #d97706; }
// //         .pill-approved { background: rgba(16,185,129,0.15); color: #059669; }
// //         .pill-in_progress { background: rgba(59,130,246,0.15); color: #2563eb; }
// //         .pill-completed { background: rgba(34,197,94,0.15); color: #16a34a; }
// //         .pill-rejected { background: rgba(239,68,68,0.15); color: #dc2626; }
// //         .timeline-date { font-size: 0.72rem; color: var(--muted); }
// //         .timeline-meta {
// //           display: flex; gap: 1rem; flex-wrap: wrap;
// //           font-size: 0.78rem; color: var(--muted); margin-bottom: 0.5rem;
// //         }
// //         .timeline-meta strong { color: var(--text); font-weight: 600; }
// //         .note-box {
// //           font-size: 0.78rem; padding: 0.55rem 0.85rem;
// //           border-radius: 8px; margin-top: 0.4rem; line-height: 1.45;
// //         }
// //         .note-box.director {
// //           background: rgba(139,92,246,0.08);
// //           border-left: 3px solid #8b5cf6; color: #6d28d9;
// //         }
// //         .note-box.manager {
// //           background: rgba(59,130,246,0.08);
// //           border-left: 3px solid #3b82f6; color: #1d4ed8;
// //         }

// //         /* Payment table */
// //         .payment-table-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid var(--border); }
// //         .payment-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
// //         .payment-table th {
// //           text-align: left; padding: 0.7rem 0.85rem;
// //           background: var(--surface); font-size: 0.7rem;
// //           text-transform: uppercase; letter-spacing: 0.04em;
// //           color: var(--muted); border-bottom: 1px solid var(--border);
// //           white-space: nowrap;
// //         }
// //         .payment-table td { padding: 0.75rem 0.85rem; border-bottom: 1px solid var(--border); }
// //         .payment-table tr:last-child td { border-bottom: none; }
// //         .payment-table tr:hover td { background: rgba(44,166,164,0.04); }
// //         .payment-table .mono { font-family: 'SF Mono', monospace; font-size: 0.72rem; color: var(--teal); }
// //         .payment-table .amount { font-weight: 700; color: var(--text); }
// //         .payment-table .note-cell { max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--muted); }
// //         .payment-table small { color: var(--muted); font-size: 0.7rem; }

// //         .loading-inline { display: flex; justify-content: center; padding: 2rem; }

// //         .toast {
// //           position: fixed; bottom: 1.5rem; right: 1.5rem;
// //           padding: 0.85rem 1.25rem; border-radius: 12px;
// //           font-size: 0.85rem; font-weight: 600; color: #fff;
// //           box-shadow: 0 10px 30px rgba(15,23,42,0.2); z-index: 2000;
// //           max-width: 360px; animation: slideUp 0.3s ease;
// //         }
// //         .toast[data-type='ok'] { background: linear-gradient(135deg, var(--teal), #34a853); }
// //         .toast[data-type='err'] { background: linear-gradient(135deg, #FE9496, #A05AFF); }

// //         @keyframes slideDown {
// //           from { opacity: 0; transform: translateY(-8px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }
// //         @keyframes slideUp {
// //           from { opacity: 0; transform: translateY(8px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default Partner;

// 'use client';

// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import CommonSidebar from './components/CommonSidebar';
// import { useAuth } from '@/contexts/AuthContext';

// // ============================================
// // TYPES
// // ============================================

// interface UserProfile {
//   userId: number; uid: string; name: string; email: string;
//   photoUrl: string | null; emailVerified: boolean; isProfileCompleted: boolean;
//   phoneNumber?: string; address?: string; gender?: string; dob?: string;
// }

// interface Partner {
//   partnerId: number; userId: number; partnerCode: string; partnerName: string;
//   partnerEmail: string; partnerPhotoUrl?: string | null; companyName: string;
//   companyEmail: string; companyMobileNumber?: string; companyWebsite?: string;
//   companyAddress?: string; contactPersonName?: string; contactPersonDesignation?: string;
//   servicesOffered: string[]; agreementType: string; agreementValue: number;
//   agreementPdfDriveLink: string; agreementStartDate?: string; agreementEndDate?: string;
//   partnerStatus: string; isApproved: boolean; directorNote?: string | null;
//   totalClients: number; activeClients: number; createdAt: string; updatedAt: string;
// }

// interface PartnerDashboard {
//   partnerId: number; partnerCode: string; companyName: string; partnerStatus: string;
//   totalClients: number; approvedClients: number; pendingClients: number;
//   totalProjects: number; activeProjects: number; completedProjects: number;
//   totalPaymentsCount: number; totalApprovedRevenue: number; totalPendingRevenue: number;
//   recentClients: Client[];
// }

// interface Client {
//   mappingId: number; clientId: number; userId: number; name: string; email: string;
//   phoneNumber?: string; companyName: string; companyEmail?: string; clientStatus: string;
//   isApproved: boolean; assignedAt: string; mappingStatus: string; notes?: string | null;
// }

// interface PaymentResponseDTO {
//   paymentId: number; transactionId: string; dateTime: string;
//   type: string; amount: string;
//   status: 'PENDING' | 'APPROVED' | 'REJECTED';
//   paymentNote: string | null;
//   userName: string | null; userEmail: string | null;
//   approvedByName: string | null; approvedAt: string | null;
//   directorNote: string | null;
// }

// interface ProjectStatusDTO {
//   statusId: number; projectId: number; projectName: string;
//   status: string; dateTime: string;
//   handledById: number | null; handledByName: string | null;
//   assignedToId: number | null; assignedToName: string | null;
//   directorNote: string | null; managerNote: string | null;
//   deadline: string | null;
// }

// // ✅ NEW — matches backend ProjectPaymentSummaryDTO
// interface ProjectPaymentSummary {
//   projectId: number;
//   projectName: string;
//   projectDescription: string | null;
//   projectType: string | null;
//   status: string;
//   departmentId: number | null;
//   departmentName: string | null;
//   clientId: number;
//   clientName: string | null;
//   clientEmail: string | null;
//   assignedManagerName: string | null;
//   deadline: string | null;
//   totalProjectAmount: string;
//   paidAmount: string;
//   remainingAmount: string;
//   paidPercentage: number;
//   isFullyPaid: boolean;
//   payments: PaymentResponseDTO[];
// }

// // ============================================
// // API
// // ============================================

// const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// const apiCall = async <T,>(method: string, endpoint: string, data?: any): Promise<T> => {
//   try {
//     const config: any = { method, url: `${API_BASE}${endpoint}`, withCredentials: true };
//     if (data) { config.data = data; config.headers = { 'Content-Type': 'application/json' }; }
//     const res = await axios(config);
//     return res.data;
//   } catch (error: any) {
//     throw error.response?.data || error;
//   }
// };

// const registerAsPartner = (p: any) => apiCall('POST', '/api/partner/register', p);
// const getMyPartnerProfile = () => apiCall<{ success: boolean; data: Partner }>('GET', '/api/partner/me');
// const getMyPartnerDashboard = () => apiCall<{ success: boolean; data: PartnerDashboard }>('GET', '/api/partner/me/dashboard');
// const getMyPartnerClients = () => apiCall<{ success: boolean; data: Client[] }>('GET', '/api/partner/clients');
// const createClient = (p: any) => apiCall('POST', '/api/partner/clients', p);
// const createProjectForClient = (clientId: number, p: any) =>
//   apiCall('POST', `/api/partner/clients/${clientId}/projects`, p);

// const getAllClientProjects = (clientId: number) =>
//   apiCall<{ success: boolean; data: ProjectPaymentSummary[] }>(
//     'GET', `/api/partner/clients/${clientId}/projects/all`);

// const getProjectHistory = (clientId: number, projectId: number) =>
//   apiCall<{ success: boolean; data: ProjectStatusDTO[] }>(
//     'GET', `/api/partner/clients/${clientId}/projects/${projectId}/history`);

// const getAllPartners = () => apiCall<{ success: boolean; data: Partner[] }>('GET', '/api/partner/all');
// const updatePartnerStatus = (partnerId: number, status: string, note?: string) => {
//   let url = `/api/partner/${partnerId}/status?status=${status}`;
//   if (note) url += `&note=${encodeURIComponent(note)}`;
//   return apiCall('PUT', url, null);
// };
// const getUserProfile = () => apiCall<{ success: boolean; data: UserProfile }>('GET', '/api/users/profile');

// // ============================================
// // MENU
// // ============================================

// const partnerMenuItems = [
//   { id: 'dashboard', label: 'Dashboard', icon: '📊' },
//   { id: 'my-clients', label: 'My Clients', icon: '👥' },
//   { id: 'my-details', label: 'My Details', icon: '📝' },
//   { id: 'profile', label: 'Profile', icon: '👤' },
// ];
// const directorMenuItems = [
//   { id: 'dashboard', label: 'Dashboard', icon: '📊' },
//   { id: 'all-partners', label: 'All Partners', icon: '🤝' },
//   { id: 'profile', label: 'Profile', icon: '👤' },
// ];

// // ============================================
// // HELPERS
// // ============================================

// const statusConfig: Record<string, { label: string; class: string; icon: string }> = {
//   PENDING: { label: 'Pending', class: 'status-pending', icon: '⏳' },
//   APPROVED: { label: 'Approved', class: 'status-approved', icon: '✅' },
//   REJECTED: { label: 'Rejected', class: 'status-rejected', icon: '❌' },
//   BLOCKED: { label: 'Blocked', class: 'status-rejected', icon: '🔴' },
//   DEACTIVATED: { label: 'Deactivated', class: 'status-rejected', icon: '⚪' },
//   ACTIVE: { label: 'Active', class: 'status-approved', icon: '🟢' },
//   IN_PROGRESS: { label: 'In Progress', class: 'status-progress', icon: '🔄' },
//   ASSIGNED: { label: 'Assigned', class: 'status-progress', icon: '👥' },
//   COMPLETED: { label: 'Completed', class: 'status-completed', icon: '✔️' },
// };

// const getStatusBadge = (status: string) => {
//   const c = statusConfig[status] || { label: status || 'N/A', class: 'status-pending', icon: '📌' };
//   return <span className={`status-badge ${c.class}`}>{c.icon} {c.label}</span>;
// };
// const fmtDate = (d: string) => (!d ? '—' : new Date(d).toLocaleString());
// const fmtShort = (d: string) => (!d ? '—' : new Date(d).toLocaleDateString());
// const fmtMoney = (n: number | string) => '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });
// const relTime = (d: string) => {
//   try {
//     const diff = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
//     if (diff < 1) return 'just now';
//     if (diff < 60) return `${diff}m ago`;
//     if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
//     return `${Math.floor(diff / 1440)}d ago`;
//   } catch { return '—'; }
// };

// const SERVICES = ['CLIENT_RELATIONSHIP','SELLING','SECURITY','MARKETING','SUPPORT','DEVELOPMENT','OTHER'];
// const AGREEMENT_TYPES = ['PERCENTAGE','MONTHLY','FIXED'];

// // ============================================
// // MAIN
// // ============================================

// const Partner: React.FC = () => {
//   const [activeNav, setActiveNav] = useState('dashboard');
//   const [loading, setLoading] = useState(true);
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
//   const [user, setUser] = useState<UserProfile | null>(null);

//   const [profile, setProfile] = useState<Partner | null>(null);
//   const [dashboard, setDashboard] = useState<PartnerDashboard | null>(null);
//   const [clients, setClients] = useState<Client[]>([]);
//   const [noProfile, setNoProfile] = useState(false);

//   const [allPartners, setAllPartners] = useState<Partner[]>([]);
//   const [isDirector, setIsDirector] = useState(false);

//   const [darkMode, setDarkMode] = useState(false);
//   const [busy, setBusy] = useState(false);
//   const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);

//   const [showRegisterForm, setShowRegisterForm] = useState(false);
//   const [showCreateClientForm, setShowCreateClientForm] = useState(false);
//   const [showCreateProjectForm, setShowCreateProjectForm] = useState(false);

//   const [selectedClient, setSelectedClient] = useState<Client | null>(null);
//   const [clientProjects, setClientProjects] = useState<ProjectPaymentSummary[]>([]);
//   const [loadingClientDetail, setLoadingClientDetail] = useState(false);

//   const [selectedProject, setSelectedProject] = useState<ProjectPaymentSummary | null>(null);
//   const [projectHistory, setProjectHistory] = useState<ProjectStatusDTO[]>([]);
//   const [loadingHistory, setLoadingHistory] = useState(false);

//   const [clientSearch, setClientSearch] = useState('');
//   const [clientStatusFilter, setClientStatusFilter] = useState('ALL');
//   const [projectSearch, setProjectSearch] = useState('');
//   const [projectStatusFilter, setProjectStatusFilter] = useState('ALL');
//   const [partnerSearch, setPartnerSearch] = useState('');
//   const [partnerStatusFilter, setPartnerStatusFilter] = useState('ALL');

//   const [registerForm, setRegisterForm] = useState({
//     companyName: '', companyEmail: '', companyMobileNumber: '', companyWebsite: '',
//     companyAddress: '', contactPersonName: '', contactPersonDesignation: '',
//     servicesOffered: [] as string[], agreementType: 'PERCENTAGE', agreementValue: '',
//     agreementPdfDriveLink: '', agreementStartDate: '', agreementEndDate: '', internalNotes: '',
//   });
//   const [clientForm, setClientForm] = useState({
//     email: '', name: '', phoneNumber: '', gender: '', dob: '', photoUrl: '',
//     address: '', companyName: '', companyMobileNumber: '', companyEmail: '',
//     orgType: '', clientType: '', clientWebsite: '', notes: '',
//   });
//   const [projectForm, setProjectForm] = useState({
//     projectName: '', projectDescription: '', projectType: 'WEB',
//     departmentId: '', cost: '', deadline: '',
//   });

//   const { logout } = useAuth();
//   const showToast = (type: 'ok' | 'err', msg: string) => {
//     setToast({ type, msg });
//     setTimeout(() => setToast(null), 4000);
//   };

//   useEffect(() => {
//     const saved = localStorage.getItem('theme');
//     if (saved === 'dark') { setDarkMode(true); document.documentElement.setAttribute('data-theme', 'dark'); }
//     loadInitialData();
//   }, []);

//   const loadInitialData = async () => {
//     setLoading(true);
//     try {
//       const [profileRes, detailsRes] = await Promise.all([
//         getUserProfile().catch(() => ({ data: null })),
//         getMyPartnerProfile().catch(() => ({ data: null })),
//       ]);
//       setUser(profileRes.data);
//       if (detailsRes.data) { setProfile(detailsRes.data); setNoProfile(false); await loadPartnerData(); }
//       else setNoProfile(true);
//       try {
//         const allRes = await getAllPartners();
//         setAllPartners(allRes.data || []); setIsDirector(true);
//       } catch { setIsDirector(false); }
//     } catch (err) { console.error(err); }
//     finally { setLoading(false); }
//   };

//   const loadPartnerData = async () => {
//     try {
//       const [dashRes, clientsRes] = await Promise.all([
//         getMyPartnerDashboard().catch(() => ({ data: null })),
//         getMyPartnerClients().catch(() => ({ data: [] })),
//       ]);
//       setDashboard(dashRes.data || null);
//       setClients(clientsRes.data || []);
//     } catch (err) { console.error(err); }
//   };

//   const toggleDarkMode = () => {
//     const n = !darkMode; setDarkMode(n);
//     document.documentElement.setAttribute('data-theme', n ? 'dark' : 'light');
//     localStorage.setItem('theme', n ? 'dark' : 'light');
//   };

//   const handleLogout = async () => {
//     try { await logout(); window.location.href = '/'; } catch (e) { console.error(e); }
//   };

//   // ---------- ACTIONS ----------
//   const handleRegisterPartner = async () => {
//     if (!registerForm.companyName.trim()) return showToast('err', 'Company name required');
//     if (!registerForm.agreementPdfDriveLink.trim()) return showToast('err', 'Agreement PDF link required');
//     setBusy(true);
//     try {
//       const payload: any = {
//         companyName: registerForm.companyName.trim(),
//         agreementType: registerForm.agreementType,
//         agreementPdfDriveLink: registerForm.agreementPdfDriveLink.trim(),
//       };
//       ['companyEmail','companyMobileNumber','companyWebsite','companyAddress',
//        'contactPersonName','contactPersonDesignation','agreementStartDate',
//        'agreementEndDate','internalNotes'].forEach(k => {
//         if ((registerForm as any)[k]?.trim()) payload[k] = (registerForm as any)[k].trim();
//       });
//       if (registerForm.servicesOffered.length) payload.servicesOffered = registerForm.servicesOffered;
//       if (registerForm.agreementValue) payload.agreementValue = Number(registerForm.agreementValue);

//       await registerAsPartner(payload);
//       showToast('ok', 'Partner registration submitted. Pending Head Director approval.');
//       setShowRegisterForm(false);
//       await loadInitialData();
//     } catch (err: any) { showToast('err', err?.message || 'Registration failed'); }
//     finally { setBusy(false); }
//   };

//   const handleCreateClient = async () => {
//     if (!clientForm.email.trim() || !clientForm.name.trim() || !clientForm.companyName.trim())
//       return showToast('err', 'Email, name & company name are required');
//     setBusy(true);
//     try {
//       const payload: any = {
//         email: clientForm.email.trim(),
//         name: clientForm.name.trim(),
//         companyName: clientForm.companyName.trim(),
//       };
//       Object.entries(clientForm).forEach(([k, v]) => {
//         if (!['email','name','companyName'].includes(k) && v.trim()) payload[k] = v.trim();
//       });
//       await createClient(payload);
//       showToast('ok', 'Client created successfully');
//       setShowCreateClientForm(false);
//       setClientForm({
//         email: '', name: '', phoneNumber: '', gender: '', dob: '', photoUrl: '',
//         address: '', companyName: '', companyMobileNumber: '', companyEmail: '',
//         orgType: '', clientType: '', clientWebsite: '', notes: '',
//       });
//       await loadPartnerData();
//     } catch (err: any) { showToast('err', err?.message || 'Failed to create client'); }
//     finally { setBusy(false); }
//   };

//   const openClientDetail = async (client: Client) => {
//     setSelectedClient(client);
//     setSelectedProject(null);
//     setProjectHistory([]);
//     setClientProjects([]);
//     setLoadingClientDetail(true);
//     try {
//       const projRes = await getAllClientProjects(client.clientId).catch(() => ({ data: [] }));
//       setClientProjects(projRes.data || []);
//     } catch { showToast('err', 'Failed to load client details'); }
//     finally { setLoadingClientDetail(false); }
//   };

//   const closeClientDetail = () => {
//     setSelectedClient(null); setSelectedProject(null); setProjectHistory([]);
//     setClientProjects([]);
//     setProjectSearch(''); setProjectStatusFilter('ALL');
//   };

//   const openProjectDetail = async (project: ProjectPaymentSummary) => {
//     if (!selectedClient) return;
//     setSelectedProject(project);
//     setProjectHistory([]);
//     setLoadingHistory(true);
//     try {
//       const res = await getProjectHistory(selectedClient.clientId, project.projectId);
//       setProjectHistory(res.data || []);
//     } catch { showToast('err', 'Failed to load project history'); }
//     finally { setLoadingHistory(false); }
//   };

//   const handleCreateProject = async () => {
//     if (!selectedClient) return;
//     if (!projectForm.projectName.trim()) return showToast('err', 'Project name required');
//     if (!projectForm.cost || Number(projectForm.cost) <= 0)
//       return showToast('err', 'Project budget (cost) required and must be > 0');
//     setBusy(true);
//     try {
//       const payload: any = {
//         projectName: projectForm.projectName.trim(),
//         cost: String(projectForm.cost),
//       };
//       if (projectForm.projectDescription.trim()) payload.projectDescription = projectForm.projectDescription.trim();
//       if (projectForm.projectType) payload.projectType = projectForm.projectType;
//       if (projectForm.departmentId) payload.departmentId = Number(projectForm.departmentId);
//       if (projectForm.deadline)
//         payload.deadline = projectForm.deadline.length === 16 ? projectForm.deadline + ':00' : projectForm.deadline;

//       await createProjectForClient(selectedClient.clientId, payload);
//       showToast('ok', 'Project created successfully');
//       setShowCreateProjectForm(false);
//       setProjectForm({ projectName: '', projectDescription: '', projectType: 'WEB', departmentId: '', cost: '', deadline: '' });
//       const projRes = await getAllClientProjects(selectedClient.clientId);
//       setClientProjects(projRes.data || []);
//       await loadPartnerData();
//     } catch (err: any) { showToast('err', err?.message || 'Failed to create project'); }
//     finally { setBusy(false); }
//   };

//   const handleUpdateStatus = async (partnerId: number, status: string) => {
//     setBusy(true);
//     try {
//       await updatePartnerStatus(partnerId, status, `Set to ${status} by Head Director`);
//       showToast('ok', 'Partner status updated');
//       setAllPartners(prev => prev.map(p =>
//         p.partnerId === partnerId ? { ...p, partnerStatus: status, isApproved: status === 'APPROVED' } : p
//       ));
//     } catch (err: any) { showToast('err', err?.message || 'Failed to update'); }
//     finally { setBusy(false); }
//   };

//   const canCreate = profile?.partnerStatus === 'APPROVED';
//   const menuItems = isDirector ? directorMenuItems : partnerMenuItems;

//   // ---------- DERIVED ----------
//   const filteredClients = useMemo(() => {
//     let list = clients;
//     if (clientStatusFilter !== 'ALL')
//       list = list.filter(c => (c.isApproved ? 'APPROVED' : 'PENDING') === clientStatusFilter);
//     const q = clientSearch.trim().toLowerCase();
//     if (q) list = list.filter(c =>
//       c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) ||
//       c.companyName?.toLowerCase().includes(q) || c.phoneNumber?.toLowerCase().includes(q));
//     return list;
//   }, [clients, clientSearch, clientStatusFilter]);

//   const filteredProjects = useMemo(() => {
//     let list = clientProjects;
//     if (projectStatusFilter !== 'ALL') list = list.filter(p => p.status === projectStatusFilter);
//     const q = projectSearch.trim().toLowerCase();
//     if (q) list = list.filter(p =>
//       p.projectName?.toLowerCase().includes(q) ||
//       p.projectDescription?.toLowerCase().includes(q) ||
//       p.projectType?.toLowerCase().includes(q));
//     return list;
//   }, [clientProjects, projectSearch, projectStatusFilter]);

//   const filteredPartners = useMemo(() => {
//     let list = allPartners;
//     if (partnerStatusFilter !== 'ALL') list = list.filter(p => p.partnerStatus === partnerStatusFilter);
//     const q = partnerSearch.trim().toLowerCase();
//     if (q) list = list.filter(p =>
//       p.companyName?.toLowerCase().includes(q) || p.partnerName?.toLowerCase().includes(q) ||
//       p.partnerEmail?.toLowerCase().includes(q) || p.partnerCode?.toLowerCase().includes(q));
//     return list;
//   }, [allPartners, partnerSearch, partnerStatusFilter]);

//   if (loading) {
//     return <div className="client-loader"><div className="loader-spinner"></div></div>;
//   }

//   return (
//     <div className="client-container">
//       <CommonSidebar
//         activeNav={activeNav}
//         setActiveNav={(id: string) => {
//           setActiveNav(id);
//           setSelectedClient(null); setSelectedProject(null); setProjectHistory([]);
//           setShowCreateClientForm(false); setShowCreateProjectForm(false); setShowRegisterForm(false);
//         }}
//         onLogout={handleLogout}
//         onThemeToggle={toggleDarkMode}
//         darkMode={darkMode}
//         user={user ? { name: user.name, email: user.email, photoUrl: user.photoUrl } : null}
//         menuItems={menuItems}
//         title="Partner Portal"
//         logoIcon="🤝"
//         isOpen={mobileSidebarOpen}
//         onClose={() => setMobileSidebarOpen(false)}
//       />

//       <button className="mobile-menu-btn" onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>☰</button>

//       <main className="client-main">
//         <header className="client-header">
//           <div className="header-welcome">
//             <h1>Welcome back, {user?.name?.split(' ')[0] || 'Partner'}!</h1>
//             <p>Partner Dashboard — Client & Project Management</p>
//           </div>
//           <div className="header-stats">
//             <div className="header-stat-item">
//               <span className="stat-label">Status</span>
//               <span className="stat-value-sm">
//                 {profile ? getStatusBadge(profile.partnerStatus)
//                   : <span className="status-badge status-pending">⏳ Not Registered</span>}
//               </span>
//             </div>
//             {dashboard && (
//               <>
//                 <div className="header-stat-item">
//                   <span className="stat-label">Clients</span>
//                   <span className="stat-value-sm">{dashboard.totalClients} total</span>
//                 </div>
//                 <div className="header-stat-item">
//                   <span className="stat-label">Projects</span>
//                   <span className="stat-value-sm">{dashboard.activeProjects} active</span>
//                 </div>
//               </>
//             )}
//           </div>
//         </header>

//         {/* ============ DASHBOARD ============ */}
//         {activeNav === 'dashboard' && (
//           <>
//             {noProfile && !showRegisterForm && (
//               <div className="dashboard-card">
//                 <div className="card-header">
//                   <h2>Become a Partner</h2>
//                 </div>
//                 <div className="empty-hero">
//                   <div className="hero-icon">🤝</div>
//                   <p className="hero-text">You haven't registered as a partner yet. Submit your application to get started.</p>
//                   <button className="btn-primary" onClick={() => setShowRegisterForm(true)}>Register as Partner</button>
//                 </div>
//               </div>
//             )}

//             {noProfile && showRegisterForm && (
//               <div className="dashboard-card full-width">
//                 <div className="card-header">
//                   <h2>Register as Partner</h2>
//                   <button className="btn-outline btn-sm" onClick={() => setShowRegisterForm(false)}>← Cancel</button>
//                 </div>
//                 <div className="details-grid">
//                   <div className="form-field"><label>Company Name *</label><input value={registerForm.companyName} onChange={(e) => setRegisterForm({ ...registerForm, companyName: e.target.value })} placeholder="XYZ Partners Pvt Ltd" /></div>
//                   <div className="form-field"><label>Company Email</label><input type="email" value={registerForm.companyEmail} onChange={(e) => setRegisterForm({ ...registerForm, companyEmail: e.target.value })} /></div>
//                   <div className="form-field"><label>Company Mobile</label><input value={registerForm.companyMobileNumber} onChange={(e) => setRegisterForm({ ...registerForm, companyMobileNumber: e.target.value })} /></div>
//                   <div className="form-field"><label>Website</label><input value={registerForm.companyWebsite} onChange={(e) => setRegisterForm({ ...registerForm, companyWebsite: e.target.value })} /></div>
//                   <div className="form-field"><label>Contact Person</label><input value={registerForm.contactPersonName} onChange={(e) => setRegisterForm({ ...registerForm, contactPersonName: e.target.value })} /></div>
//                   <div className="form-field"><label>Designation</label><input value={registerForm.contactPersonDesignation} onChange={(e) => setRegisterForm({ ...registerForm, contactPersonDesignation: e.target.value })} /></div>
//                   <div className="form-field span-2"><label>Address</label><textarea value={registerForm.companyAddress} onChange={(e) => setRegisterForm({ ...registerForm, companyAddress: e.target.value })} rows={2} /></div>
//                   <div className="form-field span-2">
//                     <label>Services Offered</label>
//                     <div className="skills-tags">
//                       {SERVICES.map((s) => {
//                         const sel = registerForm.servicesOffered.includes(s);
//                         return (
//                           <span key={s} className={`skill-tag ${sel ? 'selected' : ''}`}
//                             onClick={() => setRegisterForm({
//                               ...registerForm,
//                               servicesOffered: sel ? registerForm.servicesOffered.filter(x => x !== s) : [...registerForm.servicesOffered, s],
//                             })}>{s.replace('_', ' ')}</span>
//                         );
//                       })}
//                     </div>
//                   </div>
//                   <div className="form-field">
//                     <label>Agreement Type *</label>
//                     <select value={registerForm.agreementType} onChange={(e) => setRegisterForm({ ...registerForm, agreementType: e.target.value })}>
//                       {AGREEMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
//                     </select>
//                   </div>
//                   <div className="form-field"><label>Agreement Value</label><input type="number" step="0.01" value={registerForm.agreementValue} onChange={(e) => setRegisterForm({ ...registerForm, agreementValue: e.target.value })} placeholder="15" /></div>
//                   <div className="form-field span-2"><label>Agreement PDF Drive Link *</label><input value={registerForm.agreementPdfDriveLink} onChange={(e) => setRegisterForm({ ...registerForm, agreementPdfDriveLink: e.target.value })} placeholder="https://drive.google.com/..." /></div>
//                   <div className="form-field"><label>Start Date</label><input type="date" value={registerForm.agreementStartDate} onChange={(e) => setRegisterForm({ ...registerForm, agreementStartDate: e.target.value })} /></div>
//                   <div className="form-field"><label>End Date</label><input type="date" value={registerForm.agreementEndDate} onChange={(e) => setRegisterForm({ ...registerForm, agreementEndDate: e.target.value })} /></div>
//                   <div className="form-field span-2"><label>Internal Notes</label><textarea value={registerForm.internalNotes} onChange={(e) => setRegisterForm({ ...registerForm, internalNotes: e.target.value })} rows={2} /></div>
//                 </div>
//                 <div className="form-actions">
//                   <button className="btn-outline" onClick={() => setShowRegisterForm(false)}>Cancel</button>
//                   <button className="btn-primary" onClick={handleRegisterPartner} disabled={busy}>{busy ? 'Submitting…' : 'Submit Registration'}</button>
//                 </div>
//               </div>
//             )}

//             {profile && dashboard && (
//               <>
//                 <div className="stats-grid">
//                   <div className="stat-card"><div className="stat-icon purple">👥</div><div className="stat-info"><span className="stat-value">{dashboard.totalClients}</span><span className="stat-label">Total Clients</span></div></div>
//                   <div className="stat-card"><div className="stat-icon orange">⏳</div><div className="stat-info"><span className="stat-value">{dashboard.pendingClients}</span><span className="stat-label">Pending Clients</span></div></div>
//                   <div className="stat-card"><div className="stat-icon green">🚀</div><div className="stat-info"><span className="stat-value">{dashboard.activeProjects}</span><span className="stat-label">Active Projects</span></div></div>
//                   <div className="stat-card"><div className="stat-icon blue">💰</div><div className="stat-info"><span className="stat-value" style={{ fontSize: '1.3rem' }}>{fmtMoney(dashboard.totalApprovedRevenue)}</span><span className="stat-label">Approved Revenue</span></div></div>
//                 </div>

//                 <div className="dashboard-card">
//                   <div className="card-header"><h2>Partner Profile</h2>{getStatusBadge(profile.partnerStatus)}</div>
//                   <div className="details-grid">
//                     <div className="detail-item"><label>Company</label><span>{profile.companyName}</span></div>
//                     <div className="detail-item"><label>Partner Code</label><span style={{ color: 'var(--teal)', fontWeight: 600 }}>{profile.partnerCode}</span></div>
//                     <div className="detail-item"><label>Contact</label><span>{profile.partnerName}</span></div>
//                     <div className="detail-item"><label>Email</label><span>{profile.partnerEmail}</span></div>
//                     <div className="detail-item"><label>Agreement</label><span>{profile.agreementType} · {profile.agreementValue}</span></div>
//                     <div className="detail-item"><label>Validity</label><span>{fmtShort(profile.agreementStartDate)} → {fmtShort(profile.agreementEndDate)}</span></div>
//                     <div className="detail-item span-2">
//                       <label>Services</label>
//                       <div className="skills-tags">
//                         {profile.servicesOffered?.map(s => <span key={s} className="skill-tag">{s.replace('_', ' ')}</span>)}
//                       </div>
//                     </div>
//                   </div>
//                   {profile.directorNote && (
//                     <div className="warning-banner" style={{ marginTop: '1rem' }}><strong>Director Note:</strong> {profile.directorNote}</div>
//                   )}
//                 </div>

//                 <div className="dashboard-card">
//                   <div className="card-header">
//                     <h2>Recent Clients</h2>
//                     <button className="view-all-link" onClick={() => setActiveNav('my-clients')}>View All →</button>
//                   </div>
//                   <div className="projects-grid">
//                     {dashboard.recentClients?.slice(0, 3).map(c => (
//                       <div key={c.mappingId} className="project-card">
//                         <div className="project-card-header">
//                           <h3>{c.name}</h3>
//                           {getStatusBadge(c.isApproved ? 'APPROVED' : 'PENDING')}
//                         </div>
//                         <p className="project-card-desc">{c.companyName}</p>
//                         <div className="project-card-meta">
//                           <span>✉ {c.email}</span>
//                           {c.phoneNumber && <span>📞 {c.phoneNumber}</span>}
//                         </div>
//                         <div className="project-card-actions">
//                           <button className="btn-sm btn-primary" onClick={() => { setActiveNav('my-clients'); openClientDetail(c); }}>View Details</button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   {(!dashboard.recentClients || dashboard.recentClients.length === 0) && (
//                     <div className="empty-state"><span className="empty-icon">📭</span><p>No clients yet. Create your first client!</p></div>
//                   )}
//                 </div>
//               </>
//             )}
//           </>
//         )}

//         {/* ============ MY CLIENTS ============ */}
//         {activeNav === 'my-clients' && !selectedClient && (
//           <div className="dashboard-card full-width">
//             <div className="card-header">
//               <h2>My Clients</h2>
//               {!showCreateClientForm && (
//                 <button className="btn-primary" onClick={() => setShowCreateClientForm(true)} disabled={!canCreate}>+ New Client</button>
//               )}
//             </div>

//             {!canCreate && !showCreateClientForm && (
//               <div className="warning-banner" style={{ marginBottom: '1rem' }}>
//                 ⚠️ Partner account is <strong>{profile?.partnerStatus}</strong>. You need APPROVED status to create clients.
//               </div>
//             )}

//             {showCreateClientForm && (
//               <div className="inline-form-card">
//                 <div className="card-header" style={{ marginBottom: '1rem' }}>
//                   <h3>Create New Client</h3>
//                   <button className="btn-outline btn-sm" onClick={() => setShowCreateClientForm(false)}>← Back</button>
//                 </div>
//                 <div className="details-grid">
//                   <div className="form-field"><label>Client Email *</label><input type="email" value={clientForm.email} onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })} /></div>
//                   <div className="form-field"><label>Client Name *</label><input value={clientForm.name} onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })} /></div>
//                   <div className="form-field span-2"><label>Company Name *</label><input value={clientForm.companyName} onChange={(e) => setClientForm({ ...clientForm, companyName: e.target.value })} /></div>
//                   <div className="form-field"><label>Phone</label><input value={clientForm.phoneNumber} onChange={(e) => setClientForm({ ...clientForm, phoneNumber: e.target.value })} /></div>
//                   <div className="form-field">
//                     <label>Gender</label>
//                     <select value={clientForm.gender} onChange={(e) => setClientForm({ ...clientForm, gender: e.target.value })}>
//                       <option value="">—</option>
//                       <option value="MALE">Male</option>
//                       <option value="FEMALE">Female</option>
//                       <option value="OTHER">Other</option>
//                     </select>
//                   </div>
//                   <div className="form-field"><label>DOB</label><input type="date" value={clientForm.dob} onChange={(e) => setClientForm({ ...clientForm, dob: e.target.value })} /></div>
//                   <div className="form-field"><label>Photo URL</label><input value={clientForm.photoUrl} onChange={(e) => setClientForm({ ...clientForm, photoUrl: e.target.value })} /></div>
//                   <div className="form-field span-2"><label>Address</label><textarea value={clientForm.address} onChange={(e) => setClientForm({ ...clientForm, address: e.target.value })} rows={2} /></div>
//                   <div className="form-field"><label>Company Mobile</label><input value={clientForm.companyMobileNumber} onChange={(e) => setClientForm({ ...clientForm, companyMobileNumber: e.target.value })} /></div>
//                   <div className="form-field"><label>Company Email</label><input type="email" value={clientForm.companyEmail} onChange={(e) => setClientForm({ ...clientForm, companyEmail: e.target.value })} /></div>
//                   <div className="form-field"><label>Org Type</label><input value={clientForm.orgType} onChange={(e) => setClientForm({ ...clientForm, orgType: e.target.value })} /></div>
//                   <div className="form-field"><label>Client Type</label><input value={clientForm.clientType} onChange={(e) => setClientForm({ ...clientForm, clientType: e.target.value })} /></div>
//                   <div className="form-field span-2"><label>Website</label><input value={clientForm.clientWebsite} onChange={(e) => setClientForm({ ...clientForm, clientWebsite: e.target.value })} /></div>
//                   <div className="form-field span-2"><label>Notes</label><textarea value={clientForm.notes} onChange={(e) => setClientForm({ ...clientForm, notes: e.target.value })} rows={2} /></div>
//                 </div>
//                 <div className="form-actions">
//                   <button className="btn-outline" onClick={() => setShowCreateClientForm(false)}>Cancel</button>
//                   <button className="btn-primary" onClick={handleCreateClient} disabled={busy}>{busy ? 'Creating…' : 'Create Client'}</button>
//                 </div>
//               </div>
//             )}

//             {!showCreateClientForm && (
//               <>
//                 <div className="filter-bar">
//                   <div className="search-input-wrap">
//                     <span className="search-icon">🔍</span>
//                     <input className="search-input" placeholder="Search by name, email, company, phone…"
//                       value={clientSearch} onChange={(e) => setClientSearch(e.target.value)} />
//                     {clientSearch && <button className="clear-btn" onClick={() => setClientSearch('')}>✕</button>}
//                   </div>
//                   <select className="filter-select" value={clientStatusFilter} onChange={(e) => setClientStatusFilter(e.target.value)}>
//                     <option value="ALL">All Status</option>
//                     <option value="APPROVED">Approved</option>
//                     <option value="PENDING">Pending</option>
//                   </select>
//                 </div>

//                 {filteredClients.length === 0 ? (
//                   <div className="empty-state">
//                     <span className="empty-icon">👥</span>
//                     <p>{clients.length === 0 ? 'No clients yet. Create your first client to get started.' : 'No clients match your filters.'}</p>
//                   </div>
//                 ) : (
//                   <div className="projects-grid">
//                     {filteredClients.map(c => (
//                       <div key={c.mappingId} className="project-card">
//                         <div className="project-card-header">
//                           <h3>{c.name}</h3>
//                           {getStatusBadge(c.isApproved ? 'APPROVED' : 'PENDING')}
//                         </div>
//                         <p className="project-card-desc">{c.companyName}</p>
//                         <div className="project-card-meta">
//                           <span>✉ {c.email}</span>
//                           {c.phoneNumber && <span>📞 {c.phoneNumber}</span>}
//                           <span>📅 {fmtShort(c.assignedAt)}</span>
//                         </div>
//                         {c.notes && <div className="project-card-manager">📝 {c.notes}</div>}
//                         <div className="project-card-actions">
//                           <button className="btn-sm btn-primary" onClick={() => openClientDetail(c)}>View Details</button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         )}

//         {/* ============ CLIENT DETAIL ============ */}
//         {activeNav === 'my-clients' && selectedClient && (
//           <div className="dashboard-card full-width">
//             <div className="breadcrumb">
//               <button className="crumb-link" onClick={closeClientDetail}>My Clients</button>
//               <span className="crumb-sep">›</span>
//               <span className="crumb-current">{selectedClient.name}</span>
//               {selectedProject && (
//                 <>
//                   <span className="crumb-sep">›</span>
//                   <span className="crumb-current">{selectedProject.projectName}</span>
//                   <button className="crumb-link" style={{ marginLeft: '0.5rem' }} onClick={() => { setSelectedProject(null); setProjectHistory([]); }}>✕ clear</button>
//                 </>
//               )}
//             </div>

//             <div className="card-header">
//               <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
//                 <h2 style={{ margin: 0 }}>{selectedClient.name}</h2>
//                 {getStatusBadge(selectedClient.isApproved ? 'APPROVED' : 'PENDING')}
//               </div>
//             </div>

//             <div className="details-grid" style={{ marginBottom: '1.5rem' }}>
//               <div className="detail-item"><label>Company</label><span>{selectedClient.companyName}</span></div>
//               <div className="detail-item"><label>Email</label><span>{selectedClient.email}</span></div>
//               <div className="detail-item"><label>Phone</label><span>{selectedClient.phoneNumber || '—'}</span></div>
//               <div className="detail-item"><label>Company Email</label><span>{selectedClient.companyEmail || '—'}</span></div>
//               <div className="detail-item"><label>Assigned</label><span>{fmtShort(selectedClient.assignedAt)}</span></div>
//               <div className="detail-item"><label>Mapping Status</label><span>{selectedClient.mappingStatus}</span></div>
//               {selectedClient.notes && <div className="detail-item span-2"><label>Notes</label><span>{selectedClient.notes}</span></div>}
//             </div>

//             {loadingClientDetail ? (
//               <div className="loading-inline"><div className="loader-spinner" /></div>
//             ) : (
//               <>
//                 {/* ✅ AGGREGATE PAYMENT STATS */}
//                 {clientProjects.length > 0 && (() => {
//                   const totalBudget = clientProjects.reduce((s, p) => s + Number(p.totalProjectAmount || 0), 0);
//                   const totalPaid = clientProjects.reduce((s, p) => s + Number(p.paidAmount || 0), 0);
//                   const totalRemaining = clientProjects.reduce((s, p) => s + Number(p.remainingAmount || 0), 0);
//                   const overallPct = totalBudget > 0 ? (totalPaid / totalBudget) * 100 : 0;
//                   return (
//                     <div className="overall-progress-card">
//                       <div className="progress-header">
//                         <span>💰 Overall Payment Progress</span>
//                         <span className="progress-percentage">{overallPct.toFixed(1)}%</span>
//                       </div>
//                       <div className="progress-bar-container large">
//                         <div className="progress-fill" style={{ width: `${Math.min(overallPct, 100)}%` }} />
//                       </div>
//                       <div className="progress-stats">
//                         <span>Total Budget: {fmtMoney(totalBudget)}</span>
//                         <span>Paid: {fmtMoney(totalPaid)}</span>
//                         <span>Remaining: {fmtMoney(totalRemaining)}</span>
//                       </div>
//                     </div>
//                   );
//                 })()}

//                 {/* Projects */}
//                 <div className="section-header">
//                   <h3>🚀 Projects ({filteredProjects.length}{filteredProjects.length !== clientProjects.length ? ` of ${clientProjects.length}` : ''})</h3>
//                   <button className="btn-primary btn-sm" onClick={() => setShowCreateProjectForm(true)} disabled={!canCreate || showCreateProjectForm}>+ New Project</button>
//                 </div>

//                 {showCreateProjectForm && (
//                   <div className="inline-form-card" style={{ marginBottom: '1rem' }}>
//                     <div className="card-header" style={{ marginBottom: '1rem' }}>
//                       <h4>Create New Project</h4>
//                       <button className="btn-outline btn-sm" onClick={() => setShowCreateProjectForm(false)}>← Back</button>
//                     </div>
//                     <div className="details-grid">
//                       <div className="form-field"><label>Project Name *</label><input value={projectForm.projectName} onChange={(e) => setProjectForm({ ...projectForm, projectName: e.target.value })} /></div>
//                       <div className="form-field">
//                         <label>Type</label>
//                         <select value={projectForm.projectType} onChange={(e) => setProjectForm({ ...projectForm, projectType: e.target.value })}>
//                           <option value="WEB">WEB</option><option value="MOBILE">MOBILE</option>
//                           <option value="DESKTOP">DESKTOP</option><option value="OTHER">OTHER</option>
//                         </select>
//                       </div>
//                       <div className="form-field span-2"><label>Description</label><textarea value={projectForm.projectDescription} onChange={(e) => setProjectForm({ ...projectForm, projectDescription: e.target.value })} rows={2} /></div>
//                       <div className="form-field"><label>Department ID</label><input type="number" value={projectForm.departmentId} onChange={(e) => setProjectForm({ ...projectForm, departmentId: e.target.value })} /></div>
//                       <div className="form-field">
//                         <label>Project Budget (₹) *</label>
//                         <input
//                           type="number"
//                           min="1"
//                           required
//                           value={projectForm.cost}
//                           onChange={(e) => setProjectForm({ ...projectForm, cost: e.target.value })}
//                           placeholder="25000"
//                         />
//                       </div>
//                       <div className="form-field span-2"><label>Deadline</label><input type="datetime-local" value={projectForm.deadline} onChange={(e) => setProjectForm({ ...projectForm, deadline: e.target.value })} /></div>
//                     </div>
//                     <div className="form-actions">
//                       <button className="btn-outline" onClick={() => setShowCreateProjectForm(false)}>Cancel</button>
//                       <button className="btn-primary" onClick={handleCreateProject} disabled={busy}>{busy ? 'Creating…' : 'Create Project'}</button>
//                     </div>
//                   </div>
//                 )}

//                 {clientProjects.length > 0 && !showCreateProjectForm && (
//                   <div className="filter-bar" style={{ marginBottom: '1rem' }}>
//                     <div className="search-input-wrap">
//                       <span className="search-icon">🔍</span>
//                       <input className="search-input" placeholder="Search projects…" value={projectSearch} onChange={(e) => setProjectSearch(e.target.value)} />
//                       {projectSearch && <button className="clear-btn" onClick={() => setProjectSearch('')}>✕</button>}
//                     </div>
//                     <select className="filter-select" value={projectStatusFilter} onChange={(e) => setProjectStatusFilter(e.target.value)}>
//                       <option value="ALL">All Status</option>
//                       <option value="PENDING">Pending</option>
//                       <option value="ASSIGNED">Assigned</option>
//                       <option value="IN_PROGRESS">In Progress</option>
//                       <option value="COMPLETED">Completed</option>
//                     </select>
//                   </div>
//                 )}

//                 {filteredProjects.length === 0 ? (
//                   <div className="empty-state"><span className="empty-icon">🚀</span><p>{clientProjects.length === 0 ? 'No projects yet.' : 'No projects match your filters.'}</p></div>
//                 ) : (
//                   <div className="projects-grid">
//                     {filteredProjects.map(p => (
//                       <div
//                         key={p.projectId}
//                         className={`project-card clickable ${selectedProject?.projectId === p.projectId ? 'active' : ''}`}
//                         onClick={() => openProjectDetail(p)}
//                       >
//                         <div className="project-card-header">
//                           <h3>{p.projectName}</h3>
//                           {getStatusBadge(p.status)}
//                         </div>
//                         <p className="project-card-desc">{p.projectDescription || '—'}</p>

//                         {/* ✅ PAYMENT INFO — the fix */}
//                         <div className="project-payment-info">
//                           <div className="payment-row">
//                             <span>💰 Budget</span>
//                             <strong>{fmtMoney(p.totalProjectAmount)}</strong>
//                           </div>
//                           <div className="payment-row paid">
//                             <span>✅ Paid</span>
//                             <strong>{fmtMoney(p.paidAmount)}</strong>
//                           </div>
//                           <div className="payment-row remaining">
//                             <span>⏳ Remaining</span>
//                             <strong>{fmtMoney(p.remainingAmount)}</strong>
//                           </div>
//                           <div className="progress-bar-mini">
//                             <div className="progress-fill-mini" style={{ width: `${Math.min(p.paidPercentage, 100)}%` }} />
//                           </div>
//                           <div className="payment-pct">
//                             {p.paidPercentage.toFixed(1)}% paid
//                             {p.isFullyPaid && <span className="fully-paid-tag">✅ Fully Paid</span>}
//                           </div>
//                         </div>

//                         <div className="project-card-meta">
//                           <span>🧩 {p.projectType || '—'}</span>
//                           <span>🏢 {p.departmentName || 'No dept'}</span>
//                           {p.deadline && <span>📅 {fmtShort(p.deadline)}</span>}
//                           {p.assignedManagerName && <span>👔 {p.assignedManagerName}</span>}
//                         </div>
//                         <div className="card-cta">View History →</div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* ============ PROJECT HISTORY PANEL ============ */}
//                 {selectedProject && (
//                   <div className="history-panel">
//                     <div className="history-header">
//                       <div>
//                         <h3 style={{ margin: 0 }}>📜 {selectedProject.projectName} — History</h3>
//                         <p className="history-sub">Complete status timeline</p>
//                       </div>
//                       <button className="btn-outline btn-sm" onClick={() => { setSelectedProject(null); setProjectHistory([]); }}>✕ Close</button>
//                     </div>

//                     {/* Project payment summary */}
//                     <div className="history-payment-summary">
//                       <div><span>Budget</span><strong>{fmtMoney(selectedProject.totalProjectAmount)}</strong></div>
//                       <div><span>Paid</span><strong style={{ color: 'var(--green)' }}>{fmtMoney(selectedProject.paidAmount)}</strong></div>
//                       <div><span>Remaining</span><strong style={{ color: 'var(--orange)' }}>{fmtMoney(selectedProject.remainingAmount)}</strong></div>
//                       <div><span>Progress</span><strong>{selectedProject.paidPercentage.toFixed(1)}%</strong></div>
//                     </div>

//                     {loadingHistory ? (
//                       <div className="loading-inline"><div className="loader-spinner" /></div>
//                     ) : projectHistory.length === 0 ? (
//                       <div className="empty-state"><span className="empty-icon">📜</span><p>No history records found.</p></div>
//                     ) : (
//                       <div className="timeline">
//                         {[...projectHistory].reverse().map((h, idx) => (
//                           <div key={h.statusId || idx} className="timeline-item">
//                             <div className="timeline-rail">
//                               <div className={`timeline-dot dot-${h.status?.toLowerCase()}`} />
//                               {idx !== projectHistory.length - 1 && <div className="timeline-line" />}
//                             </div>
//                             <div className="timeline-body">
//                               <div className="timeline-top">
//                                 <span className={`timeline-status status-pill pill-${h.status?.toLowerCase()}`}>
//                                   {statusConfig[h.status]?.icon || '📌'} {h.status}
//                                 </span>
//                                 <span className="timeline-date">{fmtDate(h.dateTime)} · {relTime(h.dateTime)}</span>
//                               </div>
//                               <div className="timeline-meta">
//                                 {h.handledByName && <span>👤 Handled by <strong>{h.handledByName}</strong></span>}
//                                 {h.assignedToName && <span>➡️ Assigned to <strong>{h.assignedToName}</strong></span>}
//                                 {h.deadline && <span>📅 Deadline {fmtShort(h.deadline)}</span>}
//                               </div>
//                               {h.directorNote && <div className="note-box director">🎯 <strong>Director:</strong> {h.directorNote}</div>}
//                               {h.managerNote && <div className="note-box manager">🧑‍💼 <strong>Manager:</strong> {h.managerNote}</div>}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {/* ✅ PROJECT PAYMENTS — from selectedProject.payments */}
//                     {selectedProject.payments && selectedProject.payments.length > 0 && (
//                       <div style={{ marginTop: '2rem' }}>
//                         <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
//                           💳 Payments ({selectedProject.payments.length})
//                         </h4>
//                         <div className="payment-table-wrap">
//                           <table className="payment-table">
//                             <thead>
//                               <tr>
//                                 <th>Transaction</th>
//                                 <th>Amount</th>
//                                 <th>Date</th>
//                                 <th>Status</th>
//                                 <th>Note</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {selectedProject.payments.map(p => (
//                                 <tr key={p.paymentId}>
//                                   <td className="mono">{p.transactionId}</td>
//                                   <td className="amount">{fmtMoney(p.amount)}</td>
//                                   <td>{fmtShort(p.dateTime)}</td>
//                                   <td>{getStatusBadge(p.status)}</td>
//                                   <td className="note-cell">{p.paymentNote || '—'}</td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         )}

//         {/* ============ MY DETAILS ============ */}
//         {activeNav === 'my-details' && profile && (
//           <div className="dashboard-card full-width">
//             <div className="card-header"><h2>My Partner Details</h2>{getStatusBadge(profile.partnerStatus)}</div>
//             <div className="details-grid">
//               <div className="detail-item"><label>Company Name</label><span>{profile.companyName}</span></div>
//               <div className="detail-item"><label>Company Email</label><span>{profile.companyEmail || '—'}</span></div>
//               <div className="detail-item"><label>Company Mobile</label><span>{profile.companyMobileNumber || '—'}</span></div>
//               <div className="detail-item"><label>Company Website</label><span>{profile.companyWebsite || '—'}</span></div>
//               <div className="detail-item"><label>Contact Person</label><span>{profile.contactPersonName || '—'}</span></div>
//               <div className="detail-item"><label>Designation</label><span>{profile.contactPersonDesignation || '—'}</span></div>
//               <div className="detail-item"><label>Partner Code</label><span style={{ color: 'var(--teal)', fontWeight: 600 }}>{profile.partnerCode}</span></div>
//               <div className="detail-item"><label>Agreement Type</label><span>{profile.agreementType}</span></div>
//               <div className="detail-item"><label>Agreement Value</label><span>{profile.agreementValue}</span></div>
//               <div className="detail-item"><label>Start Date</label><span>{fmtShort(profile.agreementStartDate)}</span></div>
//               <div className="detail-item"><label>End Date</label><span>{fmtShort(profile.agreementEndDate)}</span></div>
//               <div className="detail-item"><label>Approved</label><span>{profile.isApproved ? '✅ Yes' : '❌ No'}</span></div>
//               <div className="detail-item span-2">
//                 <label>Services Offered</label>
//                 <div className="skills-tags">{profile.servicesOffered?.map(s => <span key={s} className="skill-tag">{s.replace('_', ' ')}</span>)}</div>
//               </div>
//               <div className="detail-item span-2">
//                 <label>Agreement PDF</label>
//                 <a href={profile.agreementPdfDriveLink} target="_blank" rel="noopener noreferrer" className="resume-link">📄 View Agreement</a>
//               </div>
//             </div>
//             {profile.directorNote && (
//               <div className="warning-banner" style={{ marginTop: '1rem' }}><strong>Director Note:</strong> {profile.directorNote}</div>
//             )}
//           </div>
//         )}

//         {/* ============ ALL PARTNERS (DIRECTOR) ============ */}
//         {activeNav === 'all-partners' && isDirector && (
//           <div className="dashboard-card full-width">
//             <div className="card-header">
//               <h2>All Partners</h2>
//               <span className="activity-badge">{filteredPartners.length} of {allPartners.length}</span>
//             </div>

//             <div className="filter-bar">
//               <div className="search-input-wrap">
//                 <span className="search-icon">🔍</span>
//                 <input className="search-input" placeholder="Search by company, name, email, code…"
//                   value={partnerSearch} onChange={(e) => setPartnerSearch(e.target.value)} />
//                 {partnerSearch && <button className="clear-btn" onClick={() => setPartnerSearch('')}>✕</button>}
//               </div>
//               <select className="filter-select" value={partnerStatusFilter} onChange={(e) => setPartnerStatusFilter(e.target.value)}>
//                 <option value="ALL">All Status</option>
//                 <option value="PENDING">Pending</option>
//                 <option value="APPROVED">Approved</option>
//                 <option value="BLOCKED">Blocked</option>
//                 <option value="DEACTIVATED">Deactivated</option>
//               </select>
//             </div>

//             {filteredPartners.length === 0 ? (
//               <div className="empty-state"><span className="empty-icon">🤝</span><p>{allPartners.length === 0 ? 'No partners found.' : 'No partners match your filters.'}</p></div>
//             ) : (
//               <div className="projects-grid">
//                 {filteredPartners.map(p => (
//                   <div key={p.partnerId} className="project-card">
//                     <div className="project-card-header"><h3>{p.companyName}</h3>{getStatusBadge(p.partnerStatus)}</div>
//                     <p className="project-card-desc">{p.partnerName} · {p.partnerCode}</p>
//                     <div className="project-card-meta">
//                       <span>✉ {p.partnerEmail}</span>
//                       <span>👥 {p.totalClients} clients</span>
//                       <span>📋 {p.agreementType}</span>
//                     </div>
//                     <div className="project-card-actions">
//                       {p.partnerStatus !== 'APPROVED' && (
//                         <button className="btn-sm btn-primary" onClick={() => handleUpdateStatus(p.partnerId, 'APPROVED')} disabled={busy}>✅ Approve</button>
//                       )}
//                       {p.partnerStatus === 'APPROVED' && (
//                         <button className="btn-sm btn-outline" onClick={() => handleUpdateStatus(p.partnerId, 'BLOCKED')} disabled={busy}>🔴 Block</button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* ============ PROFILE ============ */}
//         {activeNav === 'profile' && (
//           <div className="dashboard-card full-width">
//             <div className="card-header"><h2>Profile Information</h2></div>
//             <div className="profile-info">
//               <div className="profile-avatar-large">
//                 {user?.photoUrl ? <img src={user.photoUrl} alt={user.name} /> : <div className="avatar-placeholder">{user?.name?.charAt(0) || 'P'}</div>}
//               </div>
//               <div className="profile-details">
//                 <div className="detail-item"><label>Full Name</label><span>{user?.name}</span></div>
//                 <div className="detail-item"><label>Email</label><span>{user?.email}</span></div>
//                 <div className="detail-item"><label>Role</label><span>Partner</span></div>
//                 <div className="detail-item"><label>Phone</label><span>{user?.phoneNumber || 'Not provided'}</span></div>
//                 <div className="detail-item"><label>Address</label><span>{user?.address || 'Not provided'}</span></div>
//               </div>
//             </div>
//           </div>
//         )}

//         <footer className="client-footer">
//           <p>© 2026 Softmax Nexus | Developed by <a href="https://softmax.in" style={{ color: 'skyblue' }}>Softmax.in</a></p>
//         </footer>
//       </main>

//       {toast && (
//         <div className="toast" data-type={toast.type}>{toast.msg}</div>
//       )}

//       <style jsx>{`
//         .span-2 { grid-column: 1 / -1; }
//         .activity-badge {
//           background: var(--surface); border: 1px solid var(--border);
//           border-radius: 20px; padding: 0.25rem 0.75rem;
//           font-size: 0.75rem; color: var(--muted);
//         }
//         .empty-state { text-align: center; padding: 3rem 1rem; color: var(--muted); }
//         .empty-icon { font-size: 3rem; display: block; margin-bottom: 1rem; opacity: 0.5; }
//         .empty-hero { text-align: center; padding: 2rem 1rem; }
//         .hero-icon { font-size: 4rem; margin-bottom: 1rem; opacity: 0.5; }
//         .hero-text { color: var(--muted); margin-bottom: 1.5rem; max-width: 480px; margin: 0 auto 1.5rem; }

//         .warning-banner {
//           padding: 0.75rem 1rem; background: rgba(254, 148, 150, 0.1);
//           border: 1px solid var(--orange); border-radius: 10px;
//           font-size: 0.8rem; color: var(--orange);
//         }
//         .skills-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
//         .skill-tag {
//           background: rgba(44, 166, 164, 0.1); color: var(--teal);
//           padding: 0.3rem 0.7rem; border-radius: 12px; font-size: 0.72rem;
//           cursor: pointer; transition: all 0.15s ease; user-select: none;
//           border: 1px solid transparent;
//         }
//         .skill-tag:hover { background: rgba(44, 166, 164, 0.2); }
//         .skill-tag.selected { background: var(--teal); color: white; border-color: var(--teal); }
//         .resume-link { color: var(--teal); text-decoration: none; font-weight: 600; }
//         .resume-link:hover { text-decoration: underline; }

//         /* Filter bar */
//         .filter-bar { display: flex; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
//         .search-input-wrap { position: relative; flex: 1 1 260px; min-width: 200px; }
//         .search-icon {
//           position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%);
//           font-size: 0.85rem; opacity: 0.6; pointer-events: none;
//         }
//         .search-input {
//           width: 100%; padding: 0.65rem 2.2rem 0.65rem 2.4rem;
//           border: 1px solid var(--border); border-radius: 10px;
//           background: var(--surface); color: var(--text);
//           font-size: 0.85rem; outline: none; transition: border-color 0.15s;
//         }
//         .search-input:focus { border-color: var(--teal); }
//         .clear-btn {
//           position: absolute; right: 0.6rem; top: 50%; transform: translateY(-50%);
//           background: var(--border); border: none; border-radius: 50%;
//           width: 20px; height: 20px; font-size: 0.7rem; cursor: pointer;
//           display: flex; align-items: center; justify-content: center; color: var(--muted);
//         }
//         .filter-select {
//           padding: 0.65rem 1rem; border: 1px solid var(--border); border-radius: 10px;
//           background: var(--surface); color: var(--text); font-size: 0.85rem; cursor: pointer;
//           min-width: 140px;
//         }

//         /* Inline form card */
//         .inline-form-card {
//           padding: 1.5rem; background: var(--surface);
//           border: 1px solid var(--border); border-radius: 14px;
//           margin-bottom: 1.5rem; animation: slideDown 0.25s ease;
//         }
//         .form-actions { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1.25rem; }
//         .form-field { display: flex; flex-direction: column; gap: 0.35rem; }
//         .form-field label { font-size: 0.72rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.03em; }
//         .form-field input, .form-field textarea, .form-field select {
//           padding: 0.6rem 0.85rem; border: 1px solid var(--border); border-radius: 8px;
//           background: var(--card-bg); color: var(--text); font-size: 0.85rem;
//           font-family: inherit; outline: none; transition: border-color 0.15s;
//         }
//         .form-field input:focus, .form-field textarea:focus, .form-field select:focus { border-color: var(--teal); }

//         /* Breadcrumb */
//         .breadcrumb {
//           display: flex; align-items: center; gap: 0.5rem;
//           font-size: 0.8rem; margin-bottom: 1rem; flex-wrap: wrap;
//         }
//         .crumb-link {
//           background: transparent; border: none; color: var(--teal);
//           font-weight: 600; cursor: pointer; padding: 0; font-size: 0.8rem;
//         }
//         .crumb-link:hover { text-decoration: underline; }
//         .crumb-sep { color: var(--muted); }
//         .crumb-current { color: var(--text); font-weight: 600; }

//         /* Section header */
//         .section-header {
//           display: flex; justify-content: space-between; align-items: center;
//           margin-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem;
//         }
//         .section-header h3 { margin: 0; font-size: 1.05rem; font-weight: 700; }

//         /* Overall progress card */
//         .overall-progress-card {
//           background: linear-gradient(135deg, rgba(44,166,164,0.06), rgba(52,168,83,0.06));
//           border: 1px solid var(--border); border-radius: 14px;
//           padding: 1.25rem; margin-bottom: 1.5rem;
//         }
//         .progress-header {
//           display: flex; justify-content: space-between; align-items: center;
//           margin-bottom: 0.65rem; font-size: 0.85rem; font-weight: 600;
//         }
//         .progress-percentage { color: var(--teal); font-weight: 700; font-size: 1rem; }
//         .progress-bar-container {
//           height: 10px; background: var(--border); border-radius: 5px;
//           overflow: hidden; margin-bottom: 0.65rem;
//         }
//         .progress-bar-container.large { height: 14px; }
//         .progress-fill {
//           height: 100%; background: linear-gradient(90deg, var(--teal), var(--green));
//           border-radius: 5px; transition: width 0.4s ease;
//         }
//         .progress-stats {
//           display: flex; justify-content: space-between; gap: 1rem;
//           font-size: 0.75rem; color: var(--muted); flex-wrap: wrap;
//         }

//         /* Clickable project card */
//         .project-card.clickable { cursor: pointer; transition: all 0.2s ease; }
//         .project-card.clickable:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: var(--teal); }
//         .project-card.clickable.active { border-color: var(--teal); box-shadow: 0 0 0 2px rgba(44,166,164,0.2); }
//         .card-cta { font-size: 0.75rem; color: var(--teal); font-weight: 600; margin-top: 0.75rem; }

//         /* ✅ Project payment info block */
//         .project-payment-info {
//           background: var(--surface); border-radius: 10px;
//           padding: 0.75rem; margin: 0.75rem 0;
//           border: 1px solid var(--border);
//         }
//         .payment-row {
//           display: flex; justify-content: space-between;
//           font-size: 0.8rem; padding: 0.25rem 0;
//         }
//         .payment-row span { color: var(--muted); }
//         .payment-row strong { color: var(--text); font-weight: 700; }
//         .payment-row.paid strong { color: var(--green); }
//         .payment-row.remaining strong { color: var(--orange); }
//         .progress-bar-mini {
//           height: 6px; background: var(--border); border-radius: 3px;
//           overflow: hidden; margin-top: 0.5rem;
//         }
//         .progress-fill-mini {
//           height: 100%; background: linear-gradient(90deg, var(--teal), var(--green));
//           border-radius: 3px; transition: width 0.4s ease;
//         }
//         .payment-pct {
//           display: flex; justify-content: space-between; align-items: center;
//           font-size: 0.7rem; color: var(--muted); margin-top: 0.4rem;
//         }
//         .fully-paid-tag {
//           background: rgba(34,197,94,0.15); color: var(--green);
//           padding: 0.15rem 0.5rem; border-radius: 10px;
//           font-weight: 600; font-size: 0.68rem;
//         }

//         /* HISTORY PANEL */
//         .history-panel {
//           margin-top: 2rem; padding: 1.5rem;
//           background: linear-gradient(135deg, rgba(44,166,164,0.04), rgba(52,168,83,0.04));
//           border: 1px solid var(--border); border-radius: 16px;
//           animation: slideDown 0.3s ease;
//         }
//         .history-header {
//           display: flex; justify-content: space-between; align-items: flex-start;
//           margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;
//         }
//         .history-sub { color: var(--muted); font-size: 0.8rem; margin: 0.25rem 0 0; }

//         .history-payment-summary {
//           display: grid; grid-template-columns: repeat(4, 1fr);
//           gap: 0.75rem; margin-bottom: 1.5rem;
//           padding: 0.85rem; background: var(--card-bg);
//           border-radius: 10px; border: 1px solid var(--border);
//         }
//         .history-payment-summary > div {
//           display: flex; flex-direction: column; gap: 0.2rem;
//         }
//         .history-payment-summary span {
//           font-size: 0.68rem; text-transform: uppercase;
//           color: var(--muted); font-weight: 600; letter-spacing: 0.03em;
//         }
//         .history-payment-summary strong { font-size: 0.95rem; font-weight: 700; }
//         @media (max-width: 640px) {
//           .history-payment-summary { grid-template-columns: repeat(2, 1fr); }
//         }

//         .timeline { position: relative; }
//         .timeline-item { display: flex; gap: 1rem; position: relative; }
//         .timeline-rail {
//           display: flex; flex-direction: column; align-items: center;
//           min-width: 24px;
//         }
//         .timeline-dot {
//           width: 14px; height: 14px; border-radius: 50%;
//           background: var(--muted); margin-top: 6px;
//           box-shadow: 0 0 0 4px var(--card-bg); z-index: 2;
//         }
//         .timeline-dot.dot-pending { background: #f59e0b; }
//         .timeline-dot.dot-approved { background: #10b981; }
//         .timeline-dot.dot-in_progress { background: #3b82f6; }
//         .timeline-dot.dot-completed { background: #22c55e; }
//         .timeline-dot.dot-rejected { background: #ef4444; }
//         .timeline-line {
//           flex: 1; width: 2px; background: var(--border);
//           margin: 4px 0; min-height: 30px;
//         }
//         .timeline-body { flex: 1; padding-bottom: 1.5rem; }
//         .timeline-top {
//           display: flex; justify-content: space-between; align-items: center;
//           gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.4rem;
//         }
//         .timeline-status {
//           font-size: 0.75rem; font-weight: 700;
//           padding: 0.2rem 0.6rem; border-radius: 20px;
//           background: var(--surface); color: var(--text);
//         }
//         .pill-pending { background: rgba(245,158,11,0.15); color: #d97706; }
//         .pill-approved { background: rgba(16,185,129,0.15); color: #059669; }
//         .pill-in_progress { background: rgba(59,130,246,0.15); color: #2563eb; }
//         .pill-completed { background: rgba(34,197,94,0.15); color: #16a34a; }
//         .pill-rejected { background: rgba(239,68,68,0.15); color: #dc2626; }
//         .timeline-date { font-size: 0.72rem; color: var(--muted); }
//         .timeline-meta {
//           display: flex; gap: 1rem; flex-wrap: wrap;
//           font-size: 0.78rem; color: var(--muted); margin-bottom: 0.5rem;
//         }
//         .timeline-meta strong { color: var(--text); font-weight: 600; }
//         .note-box {
//           font-size: 0.78rem; padding: 0.55rem 0.85rem;
//           border-radius: 8px; margin-top: 0.4rem; line-height: 1.45;
//         }
//         .note-box.director {
//           background: rgba(139,92,246,0.08);
//           border-left: 3px solid #8b5cf6; color: #6d28d9;
//         }
//         .note-box.manager {
//           background: rgba(59,130,246,0.08);
//           border-left: 3px solid #3b82f6; color: #1d4ed8;
//         }

//         /* Payment table */
//         .payment-table-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid var(--border); }
//         .payment-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
//         .payment-table th {
//           text-align: left; padding: 0.7rem 0.85rem;
//           background: var(--surface); font-size: 0.7rem;
//           text-transform: uppercase; letter-spacing: 0.04em;
//           color: var(--muted); border-bottom: 1px solid var(--border);
//           white-space: nowrap;
//         }
//         .payment-table td { padding: 0.75rem 0.85rem; border-bottom: 1px solid var(--border); }
//         .payment-table tr:last-child td { border-bottom: none; }
//         .payment-table tr:hover td { background: rgba(44,166,164,0.04); }
//         .payment-table .mono { font-family: 'SF Mono', monospace; font-size: 0.72rem; color: var(--teal); }
//         .payment-table .amount { font-weight: 700; color: var(--text); }
//         .payment-table .note-cell { max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--muted); }
//         .payment-table small { color: var(--muted); font-size: 0.7rem; }

//         .loading-inline { display: flex; justify-content: center; padding: 2rem; }

//         .toast {
//           position: fixed; bottom: 1.5rem; right: 1.5rem;
//           padding: 0.85rem 1.25rem; border-radius: 12px;
//           font-size: 0.85rem; font-weight: 600; color: #fff;
//           box-shadow: 0 10px 30px rgba(15,23,42,0.2); z-index: 2000;
//           max-width: 360px; animation: slideUp 0.3s ease;
//         }
//         .toast[data-type='ok'] { background: linear-gradient(135deg, var(--teal), #34a853); }
//         .toast[data-type='err'] { background: linear-gradient(135deg, #FE9496, #A05AFF); }

//         @keyframes slideDown {
//           from { opacity: 0; transform: translateY(-8px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(8px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Partner;

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import CommonSidebar from './components/CommonSidebar';
import { useAuth } from '@/contexts/AuthContext';

// ============================================
// TYPES
// ============================================

interface UserProfile {
  userId: number; uid: string; name: string; email: string;
  photoUrl: string | null; emailVerified: boolean; isProfileCompleted: boolean;
  phoneNumber?: string; address?: string; gender?: string; dob?: string;
}

interface Partner {
  partnerId: number; userId: number; partnerCode: string; partnerName: string;
  partnerEmail: string; partnerPhotoUrl?: string | null; companyName: string;
  companyEmail: string; companyMobileNumber?: string; companyWebsite?: string;
  companyAddress?: string; contactPersonName?: string; contactPersonDesignation?: string;
  servicesOffered: string[]; agreementType: string; agreementValue: number;
  agreementPdfDriveLink: string; agreementStartDate?: string; agreementEndDate?: string;
  partnerStatus: string; isApproved: boolean; directorNote?: string | null;
  totalClients: number; activeClients: number; createdAt: string; updatedAt: string;
}

interface PartnerDashboard {
  partnerId: number; partnerCode: string; companyName: string; partnerStatus: string;
  totalClients: number; approvedClients: number; pendingClients: number;
  totalProjects: number; activeProjects: number; completedProjects: number;
  totalPaymentsCount: number; totalApprovedRevenue: number; totalPendingRevenue: number;
  recentClients: Client[];
}

interface Client {
  mappingId: number; clientId: number; userId: number; name: string; email: string;
  phoneNumber?: string; companyName: string; companyEmail?: string; clientStatus: string;
  isApproved: boolean; assignedAt: string; mappingStatus: string; notes?: string | null;
}

interface PaymentResponseDTO {
  paymentId: number; transactionId: string; dateTime: string;
  type: string; amount: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  paymentNote: string | null;
  userName: string | null; userEmail: string | null;
  approvedByName: string | null; approvedAt: string | null;
  directorNote: string | null;
}

interface ProjectStatusDTO {
  statusId: number; projectId: number; projectName: string;
  status: string; dateTime: string;
  handledById: number | null; handledByName: string | null;
  assignedToId: number | null; assignedToName: string | null;
  directorNote: string | null; managerNote: string | null;
  deadline: string | null;
}

// ✅ NEW — matches backend ProjectPaymentSummaryDTO
interface ProjectPaymentSummary {
  projectId: number;
  projectName: string;
  projectDescription: string | null;
  projectType: string | null;
  status: string;
  departmentId: number | null;
  departmentName: string | null;
  clientId: number;
  clientName: string | null;
  clientEmail: string | null;
  assignedManagerName: string | null;
  deadline: string | null;
  totalProjectAmount: string;
  paidAmount: string;
  remainingAmount: string;
  paidPercentage: number;
  isFullyPaid: boolean;
  payments: PaymentResponseDTO[];
}

// ============================================
// API
// ============================================

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const apiCall = async <T,>(method: string, endpoint: string, data?: any): Promise<T> => {
  try {
    const config: any = { method, url: `${API_BASE}${endpoint}`, withCredentials: true };
    if (data) { config.data = data; config.headers = { 'Content-Type': 'application/json' }; }
    const res = await axios(config);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

const registerAsPartner = (p: any) => apiCall('POST', '/api/partner/register', p);
const getMyPartnerProfile = () => apiCall<{ success: boolean; data: Partner }>('GET', '/api/partner/me');
const getMyPartnerDashboard = () => apiCall<{ success: boolean; data: PartnerDashboard }>('GET', '/api/partner/me/dashboard');
const getMyPartnerClients = () => apiCall<{ success: boolean; data: Client[] }>('GET', '/api/partner/clients');
const createClient = (p: any) => apiCall('POST', '/api/partner/clients', p);
const createProjectForClient = (clientId: number, p: any) =>
  apiCall('POST', `/api/partner/clients/${clientId}/projects`, p);

const getAllClientProjects = (clientId: number) =>
  apiCall<{ success: boolean; data: ProjectPaymentSummary[] }>(
    'GET', `/api/partner/clients/${clientId}/projects/all`);

const getProjectHistory = (clientId: number, projectId: number) =>
  apiCall<{ success: boolean; data: ProjectStatusDTO[] }>(
    'GET', `/api/partner/clients/${clientId}/projects/${projectId}/history`);

const getAllPartners = () => apiCall<{ success: boolean; data: Partner[] }>('GET', '/api/partner/all');
const updatePartnerStatus = (partnerId: number, status: string, note?: string) => {
  let url = `/api/partner/${partnerId}/status?status=${status}`;
  if (note) url += `&note=${encodeURIComponent(note)}`;
  return apiCall('PUT', url, null);
};
const getUserProfile = () => apiCall<{ success: boolean; data: UserProfile }>('GET', '/api/users/profile');

// ============================================
// MENU
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
// HELPERS
// ============================================

const statusConfig: Record<string, { label: string; class: string; icon: string }> = {
  PENDING: { label: 'Pending', class: 'status-pending', icon: '⏳' },
  APPROVED: { label: 'Approved', class: 'status-approved', icon: '✅' },
  REJECTED: { label: 'Rejected', class: 'status-rejected', icon: '❌' },
  BLOCKED: { label: 'Blocked', class: 'status-rejected', icon: '🔴' },
  DEACTIVATED: { label: 'Deactivated', class: 'status-rejected', icon: '⚪' },
  ACTIVE: { label: 'Active', class: 'status-approved', icon: '🟢' },
  IN_PROGRESS: { label: 'In Progress', class: 'status-progress', icon: '🔄' },
  ASSIGNED: { label: 'Assigned', class: 'status-progress', icon: '👥' },
  COMPLETED: { label: 'Completed', class: 'status-completed', icon: '✔️' },
};

const getStatusBadge = (status: string) => {
  const c = statusConfig[status] || { label: status || 'N/A', class: 'status-pending', icon: '📌' };
  return <span className={`status-badge ${c.class}`}>{c.icon} {c.label}</span>;
};
const fmtDate = (d?: string | null) => (!d ? '—' : new Date(d).toLocaleString());
const fmtShort = (d?: string | null) => (!d ? '—' : new Date(d).toLocaleDateString());
const fmtMoney = (n: number | string) => '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });
const relTime = (d: string) => {
  try {
    const diff = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
    if (diff < 1) return 'just now';
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  } catch { return '—'; }
};

const SERVICES = ['CLIENT_RELATIONSHIP','SELLING','SECURITY','MARKETING','SUPPORT','DEVELOPMENT','OTHER'];
const AGREEMENT_TYPES = ['PERCENTAGE','MONTHLY','FIXED'];

// ============================================
// MAIN
// ============================================

const Partner: React.FC = () => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  const [profile, setProfile] = useState<Partner | null>(null);
  const [dashboard, setDashboard] = useState<PartnerDashboard | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [noProfile, setNoProfile] = useState(false);

  const [allPartners, setAllPartners] = useState<Partner[]>([]);
  const [isDirector, setIsDirector] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);

  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showCreateClientForm, setShowCreateClientForm] = useState(false);
  const [showCreateProjectForm, setShowCreateProjectForm] = useState(false);

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientProjects, setClientProjects] = useState<ProjectPaymentSummary[]>([]);
  const [loadingClientDetail, setLoadingClientDetail] = useState(false);

  const [selectedProject, setSelectedProject] = useState<ProjectPaymentSummary | null>(null);
  const [projectHistory, setProjectHistory] = useState<ProjectStatusDTO[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const [clientSearch, setClientSearch] = useState('');
  const [clientStatusFilter, setClientStatusFilter] = useState('ALL');
  const [projectSearch, setProjectSearch] = useState('');
  const [projectStatusFilter, setProjectStatusFilter] = useState('ALL');
  const [partnerSearch, setPartnerSearch] = useState('');
  const [partnerStatusFilter, setPartnerStatusFilter] = useState('ALL');

  const [registerForm, setRegisterForm] = useState({
    companyName: '', companyEmail: '', companyMobileNumber: '', companyWebsite: '',
    companyAddress: '', contactPersonName: '', contactPersonDesignation: '',
    servicesOffered: [] as string[], agreementType: 'PERCENTAGE', agreementValue: '',
    agreementPdfDriveLink: '', agreementStartDate: '', agreementEndDate: '', internalNotes: '',
  });
  const [clientForm, setClientForm] = useState({
    email: '', name: '', phoneNumber: '', gender: '', dob: '', photoUrl: '',
    address: '', companyName: '', companyMobileNumber: '', companyEmail: '',
    orgType: '', clientType: '', clientWebsite: '', notes: '',
  });
  // ✅ departmentId removed from state — always hardcoded to 5 on submit
  const [projectForm, setProjectForm] = useState({
    projectName: '', projectDescription: '', projectType: 'WEB',
    cost: '', deadline: '',
  });

  const { logout } = useAuth();
  const showToast = (type: 'ok' | 'err', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') { setDarkMode(true); document.documentElement.setAttribute('data-theme', 'dark'); }
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
      if (detailsRes.data) { setProfile(detailsRes.data); setNoProfile(false); await loadPartnerData(); }
      else setNoProfile(true);
      try {
        const allRes = await getAllPartners();
        setAllPartners(allRes.data || []); setIsDirector(true);
      } catch { setIsDirector(false); }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const loadPartnerData = async () => {
    try {
      const [dashRes, clientsRes] = await Promise.all([
        getMyPartnerDashboard().catch(() => ({ data: null })),
        getMyPartnerClients().catch(() => ({ data: [] })),
      ]);
      setDashboard(dashRes.data || null);
      setClients(clientsRes.data || []);
    } catch (err) { console.error(err); }
  };

  const toggleDarkMode = () => {
    const n = !darkMode; setDarkMode(n);
    document.documentElement.setAttribute('data-theme', n ? 'dark' : 'light');
    localStorage.setItem('theme', n ? 'dark' : 'light');
  };

  const handleLogout = async () => {
    try { await logout(); window.location.href = '/'; } catch (e) { console.error(e); }
  };

  // ---------- ACTIONS ----------
  const handleRegisterPartner = async () => {
    if (!registerForm.companyName.trim()) return showToast('err', 'Company name required');
    if (!registerForm.agreementPdfDriveLink.trim()) return showToast('err', 'Agreement PDF link required');
    setBusy(true);
    try {
      const payload: any = {
        companyName: registerForm.companyName.trim(),
        agreementType: registerForm.agreementType,
        agreementPdfDriveLink: registerForm.agreementPdfDriveLink.trim(),
      };
      ['companyEmail','companyMobileNumber','companyWebsite','companyAddress',
       'contactPersonName','contactPersonDesignation','agreementStartDate',
       'agreementEndDate','internalNotes'].forEach(k => {
        if ((registerForm as any)[k]?.trim()) payload[k] = (registerForm as any)[k].trim();
      });
      if (registerForm.servicesOffered.length) payload.servicesOffered = registerForm.servicesOffered;
      if (registerForm.agreementValue) payload.agreementValue = Number(registerForm.agreementValue);

      await registerAsPartner(payload);
      showToast('ok', 'Partner registration submitted. Pending Head Director approval.');
      setShowRegisterForm(false);
      await loadInitialData();
    } catch (err: any) { showToast('err', err?.message || 'Registration failed'); }
    finally { setBusy(false); }
  };

  const handleCreateClient = async () => {
    if (!clientForm.email.trim() || !clientForm.name.trim() || !clientForm.companyName.trim())
      return showToast('err', 'Email, name & company name are required');
    setBusy(true);
    try {
      const payload: any = {
        email: clientForm.email.trim(),
        name: clientForm.name.trim(),
        companyName: clientForm.companyName.trim(),
      };
      Object.entries(clientForm).forEach(([k, v]) => {
        if (!['email','name','companyName'].includes(k) && v.trim()) payload[k] = v.trim();
      });
      await createClient(payload);
      showToast('ok', 'Client created successfully');
      setShowCreateClientForm(false);
      setClientForm({
        email: '', name: '', phoneNumber: '', gender: '', dob: '', photoUrl: '',
        address: '', companyName: '', companyMobileNumber: '', companyEmail: '',
        orgType: '', clientType: '', clientWebsite: '', notes: '',
      });
      await loadPartnerData();
    } catch (err: any) { showToast('err', err?.message || 'Failed to create client'); }
    finally { setBusy(false); }
  };

  const openClientDetail = async (client: Client) => {
    setSelectedClient(client);
    setSelectedProject(null);
    setProjectHistory([]);
    setClientProjects([]);
    setLoadingClientDetail(true);
    try {
      const projRes = await getAllClientProjects(client.clientId).catch(() => ({ data: [] }));
      setClientProjects(projRes.data || []);
    } catch { showToast('err', 'Failed to load client details'); }
    finally { setLoadingClientDetail(false); }
  };

  const closeClientDetail = () => {
    setSelectedClient(null); setSelectedProject(null); setProjectHistory([]);
    setClientProjects([]);
    setProjectSearch(''); setProjectStatusFilter('ALL');
  };

  const openProjectDetail = async (project: ProjectPaymentSummary) => {
    if (!selectedClient) return;
    setSelectedProject(project);
    setProjectHistory([]);
    setLoadingHistory(true);
    try {
      const res = await getProjectHistory(selectedClient.clientId, project.projectId);
      setProjectHistory(res.data || []);
    } catch { showToast('err', 'Failed to load project history'); }
    finally { setLoadingHistory(false); }
  };

  const handleCreateProject = async () => {
    if (!selectedClient) return;
    if (!projectForm.projectName.trim()) return showToast('err', 'Project name required');
    if (!projectForm.cost || Number(projectForm.cost) <= 0)
      return showToast('err', 'Project budget (cost) required and must be > 0');
    setBusy(true);
    try {
      const payload: any = {
        projectName: projectForm.projectName.trim(),
        cost: String(projectForm.cost),
        departmentId: 5, // ✅ Fixed department ID — always 5, no user input
      };
      if (projectForm.projectDescription.trim()) payload.projectDescription = projectForm.projectDescription.trim();
      if (projectForm.projectType) payload.projectType = projectForm.projectType;
      if (projectForm.deadline)
        payload.deadline = projectForm.deadline.length === 16 ? projectForm.deadline + ':00' : projectForm.deadline;

      await createProjectForClient(selectedClient.clientId, payload);
      showToast('ok', 'Project created successfully');
      setShowCreateProjectForm(false);
      setProjectForm({ projectName: '', projectDescription: '', projectType: 'WEB', cost: '', deadline: '' });
      const projRes = await getAllClientProjects(selectedClient.clientId);
      setClientProjects(projRes.data || []);
      await loadPartnerData();
    } catch (err: any) { showToast('err', err?.message || 'Failed to create project'); }
    finally { setBusy(false); }
  };

  const handleUpdateStatus = async (partnerId: number, status: string) => {
    setBusy(true);
    try {
      await updatePartnerStatus(partnerId, status, `Set to ${status} by Head Director`);
      showToast('ok', 'Partner status updated');
      setAllPartners(prev => prev.map(p =>
        p.partnerId === partnerId ? { ...p, partnerStatus: status, isApproved: status === 'APPROVED' } : p
      ));
    } catch (err: any) { showToast('err', err?.message || 'Failed to update'); }
    finally { setBusy(false); }
  };

  const canCreate = profile?.partnerStatus === 'APPROVED';
  const menuItems = isDirector ? directorMenuItems : partnerMenuItems;

  // ---------- DERIVED ----------
  const filteredClients = useMemo(() => {
    let list = clients;
    if (clientStatusFilter !== 'ALL')
      list = list.filter(c => (c.isApproved ? 'APPROVED' : 'PENDING') === clientStatusFilter);
    const q = clientSearch.trim().toLowerCase();
    if (q) list = list.filter(c =>
      c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) ||
      c.companyName?.toLowerCase().includes(q) || c.phoneNumber?.toLowerCase().includes(q));
    return list;
  }, [clients, clientSearch, clientStatusFilter]);

  const filteredProjects = useMemo(() => {
    let list = clientProjects;
    if (projectStatusFilter !== 'ALL') list = list.filter(p => p.status === projectStatusFilter);
    const q = projectSearch.trim().toLowerCase();
    if (q) list = list.filter(p =>
      p.projectName?.toLowerCase().includes(q) ||
      p.projectDescription?.toLowerCase().includes(q) ||
      p.projectType?.toLowerCase().includes(q));
    return list;
  }, [clientProjects, projectSearch, projectStatusFilter]);

  const filteredPartners = useMemo(() => {
    let list = allPartners;
    if (partnerStatusFilter !== 'ALL') list = list.filter(p => p.partnerStatus === partnerStatusFilter);
    const q = partnerSearch.trim().toLowerCase();
    if (q) list = list.filter(p =>
      p.companyName?.toLowerCase().includes(q) || p.partnerName?.toLowerCase().includes(q) ||
      p.partnerEmail?.toLowerCase().includes(q) || p.partnerCode?.toLowerCase().includes(q));
    return list;
  }, [allPartners, partnerSearch, partnerStatusFilter]);

  if (loading) {
    return <div className="client-loader"><div className="loader-spinner"></div></div>;
  }

  return (
    <div className="client-container">
      <CommonSidebar
        activeNav={activeNav}
        setActiveNav={(id: string) => {
          setActiveNav(id);
          setSelectedClient(null); setSelectedProject(null); setProjectHistory([]);
          setShowCreateClientForm(false); setShowCreateProjectForm(false); setShowRegisterForm(false);
        }}
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

      <button className="mobile-menu-btn" onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>☰</button>

      <main className="client-main">
        <header className="client-header">
          <div className="header-welcome">
            <h1>Welcome back, {user?.name?.split(' ')[0] || 'Partner'}!</h1>
            <p>Partner Dashboard — Client & Project Management</p>
          </div>
          <div className="header-stats">
            <div className="header-stat-item">
              <span className="stat-label">Status</span>
              <span className="stat-value-sm">
                {profile ? getStatusBadge(profile.partnerStatus)
                  : <span className="status-badge status-pending">⏳ Not Registered</span>}
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

        {/* ============ DASHBOARD ============ */}
        {activeNav === 'dashboard' && (
          <>
            {noProfile && !showRegisterForm && (
              <div className="dashboard-card">
                <div className="card-header">
                  <h2>Become a Partner</h2>
                </div>
                <div className="empty-hero">
                  <div className="hero-icon">🤝</div>
                  <p className="hero-text">You haven't registered as a partner yet. Submit your application to get started.</p>
                  <button className="btn-primary" onClick={() => setShowRegisterForm(true)}>Register as Partner</button>
                </div>
              </div>
            )}

            {noProfile && showRegisterForm && (
              <div className="dashboard-card full-width">
                <div className="card-header">
                  <h2>Register as Partner</h2>
                  <button className="btn-outline btn-sm" onClick={() => setShowRegisterForm(false)}>← Cancel</button>
                </div>
                <div className="details-grid">
                  <div className="form-field"><label>Company Name *</label><input value={registerForm.companyName} onChange={(e) => setRegisterForm({ ...registerForm, companyName: e.target.value })} placeholder="XYZ Partners Pvt Ltd" /></div>
                  <div className="form-field"><label>Company Email</label><input type="email" value={registerForm.companyEmail} onChange={(e) => setRegisterForm({ ...registerForm, companyEmail: e.target.value })} /></div>
                  <div className="form-field"><label>Company Mobile</label><input value={registerForm.companyMobileNumber} onChange={(e) => setRegisterForm({ ...registerForm, companyMobileNumber: e.target.value })} /></div>
                  <div className="form-field"><label>Website</label><input value={registerForm.companyWebsite} onChange={(e) => setRegisterForm({ ...registerForm, companyWebsite: e.target.value })} /></div>
                  <div className="form-field"><label>Contact Person</label><input value={registerForm.contactPersonName} onChange={(e) => setRegisterForm({ ...registerForm, contactPersonName: e.target.value })} /></div>
                  <div className="form-field"><label>Designation</label><input value={registerForm.contactPersonDesignation} onChange={(e) => setRegisterForm({ ...registerForm, contactPersonDesignation: e.target.value })} /></div>
                  <div className="form-field span-2"><label>Address</label><textarea value={registerForm.companyAddress} onChange={(e) => setRegisterForm({ ...registerForm, companyAddress: e.target.value })} rows={2} /></div>
                  <div className="form-field span-2">
                    <label>Services Offered</label>
                    <div className="skills-tags">
                      {SERVICES.map((s) => {
                        const sel = registerForm.servicesOffered.includes(s);
                        return (
                          <span key={s} className={`skill-tag ${sel ? 'selected' : ''}`}
                            onClick={() => setRegisterForm({
                              ...registerForm,
                              servicesOffered: sel ? registerForm.servicesOffered.filter(x => x !== s) : [...registerForm.servicesOffered, s],
                            })}>{s.replace('_', ' ')}</span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Agreement Type *</label>
                    <select value={registerForm.agreementType} onChange={(e) => setRegisterForm({ ...registerForm, agreementType: e.target.value })}>
                      {AGREEMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="form-field"><label>Agreement Value</label><input type="number" step="0.01" value={registerForm.agreementValue} onChange={(e) => setRegisterForm({ ...registerForm, agreementValue: e.target.value })} placeholder="15" /></div>
                  <div className="form-field span-2"><label>Agreement PDF Drive Link *</label><input value={registerForm.agreementPdfDriveLink} onChange={(e) => setRegisterForm({ ...registerForm, agreementPdfDriveLink: e.target.value })} placeholder="https://drive.google.com/..." /></div>
                  <div className="form-field"><label>Start Date</label><input type="date" value={registerForm.agreementStartDate} onChange={(e) => setRegisterForm({ ...registerForm, agreementStartDate: e.target.value })} /></div>
                  <div className="form-field"><label>End Date</label><input type="date" value={registerForm.agreementEndDate} onChange={(e) => setRegisterForm({ ...registerForm, agreementEndDate: e.target.value })} /></div>
                  <div className="form-field span-2"><label>Internal Notes</label><textarea value={registerForm.internalNotes} onChange={(e) => setRegisterForm({ ...registerForm, internalNotes: e.target.value })} rows={2} /></div>
                </div>
                <div className="form-actions">
                  <button className="btn-outline" onClick={() => setShowRegisterForm(false)}>Cancel</button>
                  <button className="btn-primary" onClick={handleRegisterPartner} disabled={busy}>{busy ? 'Submitting…' : 'Submit Registration'}</button>
                </div>
              </div>
            )}

            {profile && dashboard && (
              <>
                <div className="stats-grid">
                  <div className="stat-card"><div className="stat-icon purple">👥</div><div className="stat-info"><span className="stat-value">{dashboard.totalClients}</span><span className="stat-label">Total Clients</span></div></div>
                  <div className="stat-card"><div className="stat-icon orange">⏳</div><div className="stat-info"><span className="stat-value">{dashboard.pendingClients}</span><span className="stat-label">Pending Clients</span></div></div>
                  <div className="stat-card"><div className="stat-icon green">🚀</div><div className="stat-info"><span className="stat-value">{dashboard.activeProjects}</span><span className="stat-label">Active Projects</span></div></div>
                  <div className="stat-card"><div className="stat-icon blue">💰</div><div className="stat-info"><span className="stat-value" style={{ fontSize: '1.3rem' }}>{fmtMoney(dashboard.totalApprovedRevenue)}</span><span className="stat-label">Approved Revenue</span></div></div>
                </div>

                <div className="dashboard-card">
                  <div className="card-header"><h2>Partner Profile</h2>{getStatusBadge(profile.partnerStatus)}</div>
                  <div className="details-grid">
                    <div className="detail-item"><label>Company</label><span>{profile.companyName}</span></div>
                    <div className="detail-item"><label>Partner Code</label><span style={{ color: 'var(--teal)', fontWeight: 600 }}>{profile.partnerCode}</span></div>
                    <div className="detail-item"><label>Contact</label><span>{profile.partnerName}</span></div>
                    <div className="detail-item"><label>Email</label><span>{profile.partnerEmail}</span></div>
                    <div className="detail-item"><label>Agreement</label><span>{profile.agreementType} · {profile.agreementValue}</span></div>
                    <div className="detail-item"><label>Validity</label><span>{fmtShort(profile.agreementStartDate)} → {fmtShort(profile.agreementEndDate)}</span></div>
                    <div className="detail-item span-2">
                      <label>Services</label>
                      <div className="skills-tags">
                        {profile.servicesOffered?.map(s => <span key={s} className="skill-tag">{s.replace('_', ' ')}</span>)}
                      </div>
                    </div>
                  </div>
                  {profile.directorNote && (
                    <div className="warning-banner" style={{ marginTop: '1rem' }}><strong>Director Note:</strong> {profile.directorNote}</div>
                  )}
                </div>

                <div className="dashboard-card">
                  <div className="card-header">
                    <h2>Recent Clients</h2>
                    <button className="view-all-link" onClick={() => setActiveNav('my-clients')}>View All →</button>
                  </div>
                  <div className="projects-grid">
                    {dashboard.recentClients?.slice(0, 3).map(c => (
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
                          <button className="btn-sm btn-primary" onClick={() => { setActiveNav('my-clients'); openClientDetail(c); }}>View Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {(!dashboard.recentClients || dashboard.recentClients.length === 0) && (
                    <div className="empty-state"><span className="empty-icon">📭</span><p>No clients yet. Create your first client!</p></div>
                  )}
                </div>
              </>
            )}
          </>
        )}

        {/* ============ MY CLIENTS ============ */}
        {activeNav === 'my-clients' && !selectedClient && (
          <div className="dashboard-card full-width">
            <div className="card-header">
              <h2>My Clients</h2>
              {!showCreateClientForm && (
                <button className="btn-primary" onClick={() => setShowCreateClientForm(true)} disabled={!canCreate}>+ New Client</button>
              )}
            </div>

            {!canCreate && !showCreateClientForm && (
              <div className="warning-banner" style={{ marginBottom: '1rem' }}>
                ⚠️ Partner account is <strong>{profile?.partnerStatus}</strong>. You need APPROVED status to create clients.
              </div>
            )}

            {showCreateClientForm && (
              <div className="inline-form-card">
                <div className="card-header" style={{ marginBottom: '1rem' }}>
                  <h3>Create New Client</h3>
                  <button className="btn-outline btn-sm" onClick={() => setShowCreateClientForm(false)}>← Back</button>
                </div>
                <div className="details-grid">
                  <div className="form-field"><label>Client Email *</label><input type="email" value={clientForm.email} onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })} /></div>
                  <div className="form-field"><label>Client Name *</label><input value={clientForm.name} onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })} /></div>
                  <div className="form-field span-2"><label>Company Name *</label><input value={clientForm.companyName} onChange={(e) => setClientForm({ ...clientForm, companyName: e.target.value })} /></div>
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
                  <div className="form-field span-2"><label>Address</label><textarea value={clientForm.address} onChange={(e) => setClientForm({ ...clientForm, address: e.target.value })} rows={2} /></div>
                  <div className="form-field"><label>Company Mobile</label><input value={clientForm.companyMobileNumber} onChange={(e) => setClientForm({ ...clientForm, companyMobileNumber: e.target.value })} /></div>
                  <div className="form-field"><label>Company Email</label><input type="email" value={clientForm.companyEmail} onChange={(e) => setClientForm({ ...clientForm, companyEmail: e.target.value })} /></div>
                  <div className="form-field"><label>Org Type</label><input value={clientForm.orgType} onChange={(e) => setClientForm({ ...clientForm, orgType: e.target.value })} /></div>
                  <div className="form-field"><label>Client Type</label><input value={clientForm.clientType} onChange={(e) => setClientForm({ ...clientForm, clientType: e.target.value })} /></div>
                  <div className="form-field span-2"><label>Website</label><input value={clientForm.clientWebsite} onChange={(e) => setClientForm({ ...clientForm, clientWebsite: e.target.value })} /></div>
                  <div className="form-field span-2"><label>Notes</label><textarea value={clientForm.notes} onChange={(e) => setClientForm({ ...clientForm, notes: e.target.value })} rows={2} /></div>
                </div>
                <div className="form-actions">
                  <button className="btn-outline" onClick={() => setShowCreateClientForm(false)}>Cancel</button>
                  <button className="btn-primary" onClick={handleCreateClient} disabled={busy}>{busy ? 'Creating…' : 'Create Client'}</button>
                </div>
              </div>
            )}

            {!showCreateClientForm && (
              <>
                <div className="filter-bar">
                  <div className="search-input-wrap">
                    <span className="search-icon">🔍</span>
                    <input className="search-input" placeholder="Search by name, email, company, phone…"
                      value={clientSearch} onChange={(e) => setClientSearch(e.target.value)} />
                    {clientSearch && <button className="clear-btn" onClick={() => setClientSearch('')}>✕</button>}
                  </div>
                  <select className="filter-select" value={clientStatusFilter} onChange={(e) => setClientStatusFilter(e.target.value)}>
                    <option value="ALL">All Status</option>
                    <option value="APPROVED">Approved</option>
                    <option value="PENDING">Pending</option>
                  </select>
                </div>

                {filteredClients.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-icon">👥</span>
                    <p>{clients.length === 0 ? 'No clients yet. Create your first client to get started.' : 'No clients match your filters.'}</p>
                  </div>
                ) : (
                  <div className="projects-grid">
                    {filteredClients.map(c => (
                      <div key={c.mappingId} className="project-card">
                        <div className="project-card-header">
                          <h3>{c.name}</h3>
                          {getStatusBadge(c.isApproved ? 'APPROVED' : 'PENDING')}
                        </div>
                        <p className="project-card-desc">{c.companyName}</p>
                        <div className="project-card-meta">
                          <span>✉ {c.email}</span>
                          {c.phoneNumber && <span>📞 {c.phoneNumber}</span>}
                          <span>📅 {fmtShort(c.assignedAt)}</span>
                        </div>
                        {c.notes && <div className="project-card-manager">📝 {c.notes}</div>}
                        <div className="project-card-actions">
                          <button className="btn-sm btn-primary" onClick={() => openClientDetail(c)}>View Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ============ CLIENT DETAIL ============ */}
        {activeNav === 'my-clients' && selectedClient && (
          <div className="dashboard-card full-width">
            <div className="breadcrumb">
              <button className="crumb-link" onClick={closeClientDetail}>My Clients</button>
              <span className="crumb-sep">›</span>
              <span className="crumb-current">{selectedClient.name}</span>
              {selectedProject && (
                <>
                  <span className="crumb-sep">›</span>
                  <span className="crumb-current">{selectedProject.projectName}</span>
                  <button className="crumb-link" style={{ marginLeft: '0.5rem' }} onClick={() => { setSelectedProject(null); setProjectHistory([]); }}>✕ clear</button>
                </>
              )}
            </div>

            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <h2 style={{ margin: 0 }}>{selectedClient.name}</h2>
                {getStatusBadge(selectedClient.isApproved ? 'APPROVED' : 'PENDING')}
              </div>
            </div>

            <div className="details-grid" style={{ marginBottom: '1.5rem' }}>
              <div className="detail-item"><label>Company</label><span>{selectedClient.companyName}</span></div>
              <div className="detail-item"><label>Email</label><span>{selectedClient.email}</span></div>
              <div className="detail-item"><label>Phone</label><span>{selectedClient.phoneNumber || '—'}</span></div>
              <div className="detail-item"><label>Company Email</label><span>{selectedClient.companyEmail || '—'}</span></div>
              <div className="detail-item"><label>Assigned</label><span>{fmtShort(selectedClient.assignedAt)}</span></div>
              <div className="detail-item"><label>Mapping Status</label><span>{selectedClient.mappingStatus}</span></div>
              {selectedClient.notes && <div className="detail-item span-2"><label>Notes</label><span>{selectedClient.notes}</span></div>}
            </div>

            {loadingClientDetail ? (
              <div className="loading-inline"><div className="loader-spinner" /></div>
            ) : (
              <>
                {/* ✅ AGGREGATE PAYMENT STATS */}
                {clientProjects.length > 0 && (() => {
                  const totalBudget = clientProjects.reduce((s, p) => s + Number(p.totalProjectAmount || 0), 0);
                  const totalPaid = clientProjects.reduce((s, p) => s + Number(p.paidAmount || 0), 0);
                  const totalRemaining = clientProjects.reduce((s, p) => s + Number(p.remainingAmount || 0), 0);
                  const overallPct = totalBudget > 0 ? (totalPaid / totalBudget) * 100 : 0;
                  return (
                    <div className="overall-progress-card">
                      <div className="progress-header">
                        <span>💰 Overall Payment Progress</span>
                        <span className="progress-percentage">{overallPct.toFixed(1)}%</span>
                      </div>
                      <div className="progress-bar-container large">
                        <div className="progress-fill" style={{ width: `${Math.min(overallPct, 100)}%` }} />
                      </div>
                      <div className="progress-stats">
                        <span>Total Budget: {fmtMoney(totalBudget)}</span>
                        <span>Paid: {fmtMoney(totalPaid)}</span>
                        <span>Remaining: {fmtMoney(totalRemaining)}</span>
                      </div>
                    </div>
                  );
                })()}

                {/* Projects */}
                <div className="section-header">
                  <h3>🚀 Projects ({filteredProjects.length}{filteredProjects.length !== clientProjects.length ? ` of ${clientProjects.length}` : ''})</h3>
                  <button className="btn-primary btn-sm" onClick={() => setShowCreateProjectForm(true)} disabled={!canCreate || showCreateProjectForm}>+ New Project</button>
                </div>

                {showCreateProjectForm && (
                  <div className="inline-form-card" style={{ marginBottom: '1rem' }}>
                    <div className="card-header" style={{ marginBottom: '1rem' }}>
                      <h4>Create New Project</h4>
                      <button className="btn-outline btn-sm" onClick={() => setShowCreateProjectForm(false)}>← Back</button>
                    </div>
                    <div className="details-grid">
                      <div className="form-field"><label>Project Name *</label><input value={projectForm.projectName} onChange={(e) => setProjectForm({ ...projectForm, projectName: e.target.value })} /></div>
                      <div className="form-field">
                        <label>Type</label>
                        <select value={projectForm.projectType} onChange={(e) => setProjectForm({ ...projectForm, projectType: e.target.value })}>
                          <option value="WEB">WEB</option><option value="MOBILE">MOBILE</option>
                          <option value="DESKTOP">DESKTOP</option><option value="OTHER">OTHER</option>
                        </select>
                      </div>
                      <div className="form-field span-2"><label>Description</label><textarea value={projectForm.projectDescription} onChange={(e) => setProjectForm({ ...projectForm, projectDescription: e.target.value })} rows={2} /></div>
                      <div className="form-field span-2">
                        <label>Project Budget (₹) *</label>
                        <input
                          type="number"
                          min="1"
                          required
                          value={projectForm.cost}
                          onChange={(e) => setProjectForm({ ...projectForm, cost: e.target.value })}
                          placeholder="25000"
                        />
                      </div>
                      <div className="form-field span-2"><label>Deadline</label><input type="datetime-local" value={projectForm.deadline} onChange={(e) => setProjectForm({ ...projectForm, deadline: e.target.value })} /></div>
                    </div>
                    <div className="form-actions">
                      <button className="btn-outline" onClick={() => setShowCreateProjectForm(false)}>Cancel</button>
                      <button className="btn-primary" onClick={handleCreateProject} disabled={busy}>{busy ? 'Creating…' : 'Create Project'}</button>
                    </div>
                  </div>
                )}

                {clientProjects.length > 0 && !showCreateProjectForm && (
                  <div className="filter-bar" style={{ marginBottom: '1rem' }}>
                    <div className="search-input-wrap">
                      <span className="search-icon">🔍</span>
                      <input className="search-input" placeholder="Search projects…" value={projectSearch} onChange={(e) => setProjectSearch(e.target.value)} />
                      {projectSearch && <button className="clear-btn" onClick={() => setProjectSearch('')}>✕</button>}
                    </div>
                    <select className="filter-select" value={projectStatusFilter} onChange={(e) => setProjectStatusFilter(e.target.value)}>
                      <option value="ALL">All Status</option>
                      <option value="PENDING">Pending</option>
                      <option value="ASSIGNED">Assigned</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>
                )}

                {filteredProjects.length === 0 ? (
                  <div className="empty-state"><span className="empty-icon">🚀</span><p>{clientProjects.length === 0 ? 'No projects yet.' : 'No projects match your filters.'}</p></div>
                ) : (
                  <div className="projects-grid">
                    {filteredProjects.map(p => (
                      <div
                        key={p.projectId}
                        className={`project-card clickable ${selectedProject?.projectId === p.projectId ? 'active' : ''}`}
                        onClick={() => openProjectDetail(p)}
                      >
                        <div className="project-card-header">
                          <h3>{p.projectName}</h3>
                          {getStatusBadge(p.status)}
                        </div>
                        <p className="project-card-desc">{p.projectDescription || '—'}</p>

                        {/* ✅ PAYMENT INFO — the fix */}
                        <div className="project-payment-info">
                          <div className="payment-row">
                            <span>💰 Budget</span>
                            <strong>{fmtMoney(p.totalProjectAmount)}</strong>
                          </div>
                          <div className="payment-row paid">
                            <span>✅ Paid</span>
                            <strong>{fmtMoney(p.paidAmount)}</strong>
                          </div>
                          <div className="payment-row remaining">
                            <span>⏳ Remaining</span>
                            <strong>{fmtMoney(p.remainingAmount)}</strong>
                          </div>
                          <div className="progress-bar-mini">
                            <div className="progress-fill-mini" style={{ width: `${Math.min(p.paidPercentage, 100)}%` }} />
                          </div>
                          <div className="payment-pct">
                            {p.paidPercentage.toFixed(1)}% paid
                            {p.isFullyPaid && <span className="fully-paid-tag">✅ Fully Paid</span>}
                          </div>
                        </div>

                        <div className="project-card-meta">
                          <span>🧩 {p.projectType || '—'}</span>
                          <span>🏢 {p.departmentName || 'No dept'}</span>
                          {p.deadline && <span>📅 {fmtShort(p.deadline)}</span>}
                          {p.assignedManagerName && <span>👔 {p.assignedManagerName}</span>}
                        </div>
                        <div className="card-cta">View History →</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ============ PROJECT HISTORY PANEL ============ */}
                {selectedProject && (
                  <div className="history-panel">
                    <div className="history-header">
                      <div>
                        <h3 style={{ margin: 0 }}>📜 {selectedProject.projectName} — History</h3>
                        <p className="history-sub">Complete status timeline</p>
                      </div>
                      <button className="btn-outline btn-sm" onClick={() => { setSelectedProject(null); setProjectHistory([]); }}>✕ Close</button>
                    </div>

                    {/* Project payment summary */}
                    <div className="history-payment-summary">
                      <div><span>Budget</span><strong>{fmtMoney(selectedProject.totalProjectAmount)}</strong></div>
                      <div><span>Paid</span><strong style={{ color: 'var(--green)' }}>{fmtMoney(selectedProject.paidAmount)}</strong></div>
                      <div><span>Remaining</span><strong style={{ color: 'var(--orange)' }}>{fmtMoney(selectedProject.remainingAmount)}</strong></div>
                      <div><span>Progress</span><strong>{selectedProject.paidPercentage.toFixed(1)}%</strong></div>
                    </div>

                    {loadingHistory ? (
                      <div className="loading-inline"><div className="loader-spinner" /></div>
                    ) : projectHistory.length === 0 ? (
                      <div className="empty-state"><span className="empty-icon">📜</span><p>No history records found.</p></div>
                    ) : (
                      <div className="timeline">
                        {[...projectHistory].reverse().map((h, idx) => (
                          <div key={h.statusId || idx} className="timeline-item">
                            <div className="timeline-rail">
                              <div className={`timeline-dot dot-${h.status?.toLowerCase()}`} />
                              {idx !== projectHistory.length - 1 && <div className="timeline-line" />}
                            </div>
                            <div className="timeline-body">
                              <div className="timeline-top">
                                <span className={`timeline-status status-pill pill-${h.status?.toLowerCase()}`}>
                                  {statusConfig[h.status]?.icon || '📌'} {h.status}
                                </span>
                                <span className="timeline-date">{fmtDate(h.dateTime)} · {relTime(h.dateTime)}</span>
                              </div>
                              <div className="timeline-meta">
                                {h.handledByName && <span>👤 Handled by <strong>{h.handledByName}</strong></span>}
                                {h.assignedToName && <span>➡️ Assigned to <strong>{h.assignedToName}</strong></span>}
                                {h.deadline && <span>📅 Deadline {fmtShort(h.deadline)}</span>}
                              </div>
                              {h.directorNote && <div className="note-box director">🎯 <strong>Director:</strong> {h.directorNote}</div>}
                              {h.managerNote && <div className="note-box manager">🧑‍💼 <strong>Manager:</strong> {h.managerNote}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ✅ PROJECT PAYMENTS — from selectedProject.payments */}
                    {selectedProject.payments && selectedProject.payments.length > 0 && (
                      <div style={{ marginTop: '2rem' }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
                          💳 Payments ({selectedProject.payments.length})
                        </h4>
                        <div className="payment-table-wrap">
                          <table className="payment-table">
                            <thead>
                              <tr>
                                <th>Transaction</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Note</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedProject.payments.map(p => (
                                <tr key={p.paymentId}>
                                  <td className="mono">{p.transactionId}</td>
                                  <td className="amount">{fmtMoney(p.amount)}</td>
                                  <td>{fmtShort(p.dateTime)}</td>
                                  <td>{getStatusBadge(p.status)}</td>
                                  <td className="note-cell">{p.paymentNote || '—'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ============ MY DETAILS ============ */}
        {activeNav === 'my-details' && profile && (
          <div className="dashboard-card full-width">
            <div className="card-header"><h2>My Partner Details</h2>{getStatusBadge(profile.partnerStatus)}</div>
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
              <div className="detail-item"><label>Start Date</label><span>{fmtShort(profile.agreementStartDate)}</span></div>
              <div className="detail-item"><label>End Date</label><span>{fmtShort(profile.agreementEndDate)}</span></div>
              <div className="detail-item"><label>Approved</label><span>{profile.isApproved ? '✅ Yes' : '❌ No'}</span></div>
              <div className="detail-item span-2">
                <label>Services Offered</label>
                <div className="skills-tags">{profile.servicesOffered?.map(s => <span key={s} className="skill-tag">{s.replace('_', ' ')}</span>)}</div>
              </div>
              <div className="detail-item span-2">
                <label>Agreement PDF</label>
                <a href={profile.agreementPdfDriveLink} target="_blank" rel="noopener noreferrer" className="resume-link">📄 View Agreement</a>
              </div>
            </div>
            {profile.directorNote && (
              <div className="warning-banner" style={{ marginTop: '1rem' }}><strong>Director Note:</strong> {profile.directorNote}</div>
            )}
          </div>
        )}

        {/* ============ ALL PARTNERS (DIRECTOR) ============ */}
        {activeNav === 'all-partners' && isDirector && (
          <div className="dashboard-card full-width">
            <div className="card-header">
              <h2>All Partners</h2>
              <span className="activity-badge">{filteredPartners.length} of {allPartners.length}</span>
            </div>

            <div className="filter-bar">
              <div className="search-input-wrap">
                <span className="search-icon">🔍</span>
                <input className="search-input" placeholder="Search by company, name, email, code…"
                  value={partnerSearch} onChange={(e) => setPartnerSearch(e.target.value)} />
                {partnerSearch && <button className="clear-btn" onClick={() => setPartnerSearch('')}>✕</button>}
              </div>
              <select className="filter-select" value={partnerStatusFilter} onChange={(e) => setPartnerStatusFilter(e.target.value)}>
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="BLOCKED">Blocked</option>
                <option value="DEACTIVATED">Deactivated</option>
              </select>
            </div>

            {filteredPartners.length === 0 ? (
              <div className="empty-state"><span className="empty-icon">🤝</span><p>{allPartners.length === 0 ? 'No partners found.' : 'No partners match your filters.'}</p></div>
            ) : (
              <div className="projects-grid">
                {filteredPartners.map(p => (
                  <div key={p.partnerId} className="project-card">
                    <div className="project-card-header"><h3>{p.companyName}</h3>{getStatusBadge(p.partnerStatus)}</div>
                    <p className="project-card-desc">{p.partnerName} · {p.partnerCode}</p>
                    <div className="project-card-meta">
                      <span>✉ {p.partnerEmail}</span>
                      <span>👥 {p.totalClients} clients</span>
                      <span>📋 {p.agreementType}</span>
                    </div>
                    <div className="project-card-actions">
                      {p.partnerStatus !== 'APPROVED' && (
                        <button className="btn-sm btn-primary" onClick={() => handleUpdateStatus(p.partnerId, 'APPROVED')} disabled={busy}>✅ Approve</button>
                      )}
                      {p.partnerStatus === 'APPROVED' && (
                        <button className="btn-sm btn-outline" onClick={() => handleUpdateStatus(p.partnerId, 'BLOCKED')} disabled={busy}>🔴 Block</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============ PROFILE ============ */}
        {activeNav === 'profile' && (
          <div className="dashboard-card full-width">
            <div className="card-header"><h2>Profile Information</h2></div>
            <div className="profile-info">
              <div className="profile-avatar-large">
                {user?.photoUrl ? <img src={user.photoUrl} alt={user.name} /> : <div className="avatar-placeholder">{user?.name?.charAt(0) || 'P'}</div>}
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

      {toast && (
        <div className="toast" data-type={toast.type}>{toast.msg}</div>
      )}

      <style jsx>{`
        .span-2 { grid-column: 1 / -1; }
        .activity-badge {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 20px; padding: 0.25rem 0.75rem;
          font-size: 0.75rem; color: var(--muted);
        }
        .empty-state { text-align: center; padding: 3rem 1rem; color: var(--muted); }
        .empty-icon { font-size: 3rem; display: block; margin-bottom: 1rem; opacity: 0.5; }
        .empty-hero { text-align: center; padding: 2rem 1rem; }
        .hero-icon { font-size: 4rem; margin-bottom: 1rem; opacity: 0.5; }
        .hero-text { color: var(--muted); margin-bottom: 1.5rem; max-width: 480px; margin: 0 auto 1.5rem; }

        .warning-banner {
          padding: 0.75rem 1rem; background: rgba(254, 148, 150, 0.1);
          border: 1px solid var(--orange); border-radius: 10px;
          font-size: 0.8rem; color: var(--orange);
        }
        .skills-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .skill-tag {
          background: rgba(44, 166, 164, 0.1); color: var(--teal);
          padding: 0.3rem 0.7rem; border-radius: 12px; font-size: 0.72rem;
          cursor: pointer; transition: all 0.15s ease; user-select: none;
          border: 1px solid transparent;
        }
        .skill-tag:hover { background: rgba(44, 166, 164, 0.2); }
        .skill-tag.selected { background: var(--teal); color: white; border-color: var(--teal); }
        .resume-link { color: var(--teal); text-decoration: none; font-weight: 600; }
        .resume-link:hover { text-decoration: underline; }

        /* Filter bar */
        .filter-bar { display: flex; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
        .search-input-wrap { position: relative; flex: 1 1 260px; min-width: 200px; }
        .search-icon {
          position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%);
          font-size: 0.85rem; opacity: 0.6; pointer-events: none;
        }
        .search-input {
          width: 100%; padding: 0.65rem 2.2rem 0.65rem 2.4rem;
          border: 1px solid var(--border); border-radius: 10px;
          background: var(--surface); color: var(--text);
          font-size: 0.85rem; outline: none; transition: border-color 0.15s;
        }
        .search-input:focus { border-color: var(--teal); }
        .clear-btn {
          position: absolute; right: 0.6rem; top: 50%; transform: translateY(-50%);
          background: var(--border); border: none; border-radius: 50%;
          width: 20px; height: 20px; font-size: 0.7rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center; color: var(--muted);
        }
        .filter-select {
          padding: 0.65rem 1rem; border: 1px solid var(--border); border-radius: 10px;
          background: var(--surface); color: var(--text); font-size: 0.85rem; cursor: pointer;
          min-width: 140px;
        }

        /* Inline form card */
        .inline-form-card {
          padding: 1.5rem; background: var(--surface);
          border: 1px solid var(--border); border-radius: 14px;
          margin-bottom: 1.5rem; animation: slideDown 0.25s ease;
        }
        .form-actions { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1.25rem; }
        .form-field { display: flex; flex-direction: column; gap: 0.35rem; }
        .form-field label { font-size: 0.72rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.03em; }
        .form-field input, .form-field textarea, .form-field select {
          padding: 0.6rem 0.85rem; border: 1px solid var(--border); border-radius: 8px;
          background: var(--card-bg); color: var(--text); font-size: 0.85rem;
          font-family: inherit; outline: none; transition: border-color 0.15s;
        }
        .form-field input:focus, .form-field textarea:focus, .form-field select:focus { border-color: var(--teal); }

        /* Breadcrumb */
        .breadcrumb {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.8rem; margin-bottom: 1rem; flex-wrap: wrap;
        }
        .crumb-link {
          background: transparent; border: none; color: var(--teal);
          font-weight: 600; cursor: pointer; padding: 0; font-size: 0.8rem;
        }
        .crumb-link:hover { text-decoration: underline; }
        .crumb-sep { color: var(--muted); }
        .crumb-current { color: var(--text); font-weight: 600; }

        /* Section header */
        .section-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem;
        }
        .section-header h3 { margin: 0; font-size: 1.05rem; font-weight: 700; }

        /* Overall progress card */
        .overall-progress-card {
          background: linear-gradient(135deg, rgba(44,166,164,0.06), rgba(52,168,83,0.06));
          border: 1px solid var(--border); border-radius: 14px;
          padding: 1.25rem; margin-bottom: 1.5rem;
        }
        .progress-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 0.65rem; font-size: 0.85rem; font-weight: 600;
        }
        .progress-percentage { color: var(--teal); font-weight: 700; font-size: 1rem; }
        .progress-bar-container {
          height: 10px; background: var(--border); border-radius: 5px;
          overflow: hidden; margin-bottom: 0.65rem;
        }
        .progress-bar-container.large { height: 14px; }
        .progress-fill {
          height: 100%; background: linear-gradient(90deg, var(--teal), var(--green));
          border-radius: 5px; transition: width 0.4s ease;
        }
        .progress-stats {
          display: flex; justify-content: space-between; gap: 1rem;
          font-size: 0.75rem; color: var(--muted); flex-wrap: wrap;
        }

        /* Clickable project card */
        .project-card.clickable { cursor: pointer; transition: all 0.2s ease; }
        .project-card.clickable:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: var(--teal); }
        .project-card.clickable.active { border-color: var(--teal); box-shadow: 0 0 0 2px rgba(44,166,164,0.2); }
        .card-cta { font-size: 0.75rem; color: var(--teal); font-weight: 600; margin-top: 0.75rem; }

        /* ✅ Project payment info block */
        .project-payment-info {
          background: var(--surface); border-radius: 10px;
          padding: 0.75rem; margin: 0.75rem 0;
          border: 1px solid var(--border);
        }
        .payment-row {
          display: flex; justify-content: space-between;
          font-size: 0.8rem; padding: 0.25rem 0;
        }
        .payment-row span { color: var(--muted); }
        .payment-row strong { color: var(--text); font-weight: 700; }
        .payment-row.paid strong { color: var(--green); }
        .payment-row.remaining strong { color: var(--orange); }
        .progress-bar-mini {
          height: 6px; background: var(--border); border-radius: 3px;
          overflow: hidden; margin-top: 0.5rem;
        }
        .progress-fill-mini {
          height: 100%; background: linear-gradient(90deg, var(--teal), var(--green));
          border-radius: 3px; transition: width 0.4s ease;
        }
        .payment-pct {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.7rem; color: var(--muted); margin-top: 0.4rem;
        }
        .fully-paid-tag {
          background: rgba(34,197,94,0.15); color: var(--green);
          padding: 0.15rem 0.5rem; border-radius: 10px;
          font-weight: 600; font-size: 0.68rem;
        }

        /* HISTORY PANEL */
        .history-panel {
          margin-top: 2rem; padding: 1.5rem;
          background: linear-gradient(135deg, rgba(44,166,164,0.04), rgba(52,168,83,0.04));
          border: 1px solid var(--border); border-radius: 16px;
          animation: slideDown 0.3s ease;
        }
        .history-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;
        }
        .history-sub { color: var(--muted); font-size: 0.8rem; margin: 0.25rem 0 0; }

        .history-payment-summary {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem; margin-bottom: 1.5rem;
          padding: 0.85rem; background: var(--card-bg);
          border-radius: 10px; border: 1px solid var(--border);
        }
        .history-payment-summary > div {
          display: flex; flex-direction: column; gap: 0.2rem;
        }
        .history-payment-summary span {
          font-size: 0.68rem; text-transform: uppercase;
          color: var(--muted); font-weight: 600; letter-spacing: 0.03em;
        }
        .history-payment-summary strong { font-size: 0.95rem; font-weight: 700; }
        @media (max-width: 640px) {
          .history-payment-summary { grid-template-columns: repeat(2, 1fr); }
        }

        .timeline { position: relative; }
        .timeline-item { display: flex; gap: 1rem; position: relative; }
        .timeline-rail {
          display: flex; flex-direction: column; align-items: center;
          min-width: 24px;
        }
        .timeline-dot {
          width: 14px; height: 14px; border-radius: 50%;
          background: var(--muted); margin-top: 6px;
          box-shadow: 0 0 0 4px var(--card-bg); z-index: 2;
        }
        .timeline-dot.dot-pending { background: #f59e0b; }
        .timeline-dot.dot-approved { background: #10b981; }
        .timeline-dot.dot-in_progress { background: #3b82f6; }
        .timeline-dot.dot-completed { background: #22c55e; }
        .timeline-dot.dot-rejected { background: #ef4444; }
        .timeline-line {
          flex: 1; width: 2px; background: var(--border);
          margin: 4px 0; min-height: 30px;
        }
        .timeline-body { flex: 1; padding-bottom: 1.5rem; }
        .timeline-top {
          display: flex; justify-content: space-between; align-items: center;
          gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.4rem;
        }
        .timeline-status {
          font-size: 0.75rem; font-weight: 700;
          padding: 0.2rem 0.6rem; border-radius: 20px;
          background: var(--surface); color: var(--text);
        }
        .pill-pending { background: rgba(245,158,11,0.15); color: #d97706; }
        .pill-approved { background: rgba(16,185,129,0.15); color: #059669; }
        .pill-in_progress { background: rgba(59,130,246,0.15); color: #2563eb; }
        .pill-completed { background: rgba(34,197,94,0.15); color: #16a34a; }
        .pill-rejected { background: rgba(239,68,68,0.15); color: #dc2626; }
        .timeline-date { font-size: 0.72rem; color: var(--muted); }
        .timeline-meta {
          display: flex; gap: 1rem; flex-wrap: wrap;
          font-size: 0.78rem; color: var(--muted); margin-bottom: 0.5rem;
        }
        .timeline-meta strong { color: var(--text); font-weight: 600; }
        .note-box {
          font-size: 0.78rem; padding: 0.55rem 0.85rem;
          border-radius: 8px; margin-top: 0.4rem; line-height: 1.45;
        }
        .note-box.director {
          background: rgba(139,92,246,0.08);
          border-left: 3px solid #8b5cf6; color: #6d28d9;
        }
        .note-box.manager {
          background: rgba(59,130,246,0.08);
          border-left: 3px solid #3b82f6; color: #1d4ed8;
        }

        /* Payment table */
        .payment-table-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid var(--border); }
        .payment-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
        .payment-table th {
          text-align: left; padding: 0.7rem 0.85rem;
          background: var(--surface); font-size: 0.7rem;
          text-transform: uppercase; letter-spacing: 0.04em;
          color: var(--muted); border-bottom: 1px solid var(--border);
          white-space: nowrap;
        }
        .payment-table td { padding: 0.75rem 0.85rem; border-bottom: 1px solid var(--border); }
        .payment-table tr:last-child td { border-bottom: none; }
        .payment-table tr:hover td { background: rgba(44,166,164,0.04); }
        .payment-table .mono { font-family: 'SF Mono', monospace; font-size: 0.72rem; color: var(--teal); }
        .payment-table .amount { font-weight: 700; color: var(--text); }
        .payment-table .note-cell { max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--muted); }
        .payment-table small { color: var(--muted); font-size: 0.7rem; }

        .loading-inline { display: flex; justify-content: center; padding: 2rem; }

        .toast {
          position: fixed; bottom: 1.5rem; right: 1.5rem;
          padding: 0.85rem 1.25rem; border-radius: 12px;
          font-size: 0.85rem; font-weight: 600; color: #fff;
          box-shadow: 0 10px 30px rgba(15,23,42,0.2); z-index: 2000;
          max-width: 360px; animation: slideUp 0.3s ease;
        }
        .toast[data-type='ok'] { background: linear-gradient(135deg, var(--teal), #34a853); }
        .toast[data-type='err'] { background: linear-gradient(135deg, #FE9496, #A05AFF); }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Partner;