//@ts-nocheck
'use client';

import React, { useState, useEffect, useRef } from 'react';
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

interface ClientDetails {
  clientId: number;
  userId: number;
  companyName: string;
  companyMobileNumber: string;
  companyEmail: string;
  orgType: string;
  clientType: string;
  clientWebsite: string;
  isApproved: 'PENDING' | 'APPROVED' | 'REJECTED' | boolean;
  approvedBy?: number;
  approvedAt?: string;
  rejectionReason?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Project {
  projectId: number;
  projectName: string;
  projectDescription: string;
  projectType: string;
  status: 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
  departmentId: number;
  departmentName: string;
  clientId: number;
  clientName: string;
  clientEmail: string;
  assignedManagerId: number | null;
  assignedManagerName: string | null;
  cost: string | null;
  deadline: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ProjectHistory {
  statusId: number;
  projectId: number;
  projectName: string;
  status: string;
  dateTime: string;
  handledById: number;
  handledByName: string;
  assignedToId: number | null;
  assignedToName: string | null;
  directorNote: string | null;
  managerNote: string | null;
  deadline: string | null;
}

interface FileItem {
  fileId: number;
  fileType: string;
  fileLink: string;
  uploaderId: number;
  uploaderName: string;
  uploadTime: string;
  departmentId: number;
  departmentName: string;
}

interface Department {
  departmentId: number;
  departmentName: string;
}

interface PaymentRecord {
  paymentId: number;
  transactionId: string;
  amount: string;
  type: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  userName: string;
  userEmail: string;
  paymentNote: string | null;
  directorNote: string | null;
  approvedByName: string | null;
  approvedAt: string | null;
  dateTime: string;
}

interface PaymentSummary {
  projectId: number;
  projectName: string;
  totalProjectAmount: string;
  paidAmount: string;
  remainingAmount: string;
  paidPercentage: number;
  isFullyPaid: boolean;
  payments: PaymentRecord[];
}

interface ClientDashboardData {
  totalProjects: number;
  totalProjectCost: string;
  totalPaidAmount: string;
  totalRemainingAmount: string;
  overallPaidPercentage: number;
  completedProjects: number;
  pendingProjects: number;
  projects: PaymentSummary[];
}

interface ClientProjectPayment {
  projectId: number;
  projectName: string;
  totalProjectAmount: string;
  paidAmount: string;
  remainingAmount: string;
  paidPercentage: number;
  isFullyPaid: boolean;
  payments: PaymentRecord[];
}

// ============================================
// API SERVICE
// ============================================

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

async function apiCall<T>(method: string, endpoint: string, data?: any): Promise<T> {
  const response = await axios({
    method,
    url: `${API_BASE}${endpoint}`,
    data,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}

async function apiCallFormData<T>(endpoint: string, formData: FormData): Promise<T> {
  const response = await axios.post(`${API_BASE}${endpoint}`, formData, {
    withCredentials: true,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

const fileApi = {
  upload: (projectId: number, file: File, fileType: string) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiCallFormData(`/api/file/upload/${projectId}?fileType=${fileType}`, formData);
  },
  getByProject: (projectId: number) => apiCall<{ success: boolean; data: FileItem[] }>('GET', `/api/file/project/${projectId}`),
  getMyUploads: () => apiCall<{ success: boolean; data: FileItem[] }>('GET', '/api/file/my-uploads'),
  delete: (fileId: number) => apiCall('DELETE', `/api/file/delete/${fileId}`),
  getAccessToken: (fileId: number) => apiCall('POST', `/api/file/access-token/${fileId}`, {}),
};

const paymentApi = {
  submitProjectPayment: (data: any) => apiCall('POST', '/api/payment/project', data),
  getProjectPaymentSummary: (projectId: number) => apiCall<{ success: boolean; data: PaymentSummary }>('GET', `/api/payment/project/${projectId}`),
  getAllPayments: () => apiCall<{ success: boolean; data: PaymentRecord[] }>('GET', '/api/payment/all'),
  getClientDashboard: () => apiCall<{ success: boolean; data: ClientDashboardData }>('GET', '/api/payment/client/dashboard'),
  getMyClientProjects: () => apiCall<{ success: boolean; data: ClientProjectPayment[] }>('GET', '/api/payment/client/my-projects'),
  getClientProjectSummary: (projectId: number) => apiCall<{ success: boolean; data: PaymentSummary }>('GET', `/api/payment/client/project/${projectId}/summary`),
  getClientProjectPayments: (projectId: number) => apiCall<{ success: boolean; data: PaymentRecord[] }>('GET', `/api/payment/client/project/${projectId}/payments`),
  getPaymentByTransactionId: (transactionId: string) => apiCall<{ success: boolean; data: PaymentRecord }>('GET', `/api/payment/client/transaction/${transactionId}`),
};

const clientApi = {
  apply: (data: any) => apiCall('POST', '/api/client/apply', data),
  getMyDetails: () => apiCall('GET', '/api/client/my-details'),
  update: (data: any) => apiCall('PUT', '/api/client/update', data),
};

const projectApi = {
  create: (data: any) => apiCall('POST', '/api/project/create', data),
  update: (projectId: number, data: any) => apiCall('PUT', `/api/project/update/${projectId}`, data),
  delete: (projectId: number) => apiCall('DELETE', `/api/project/delete/${projectId}`),
  getMyProjects: () => apiCall<{ success: boolean; message: string; data: Project[] }>('GET', '/api/project/my-projects'),
  getHistory: (projectId: number) => apiCall('GET', `/api/project/${projectId}/history`),
};

const userApi = {
  getProfile: () => apiCall('GET', '/api/users/profile'),
  updateProfile: (data: any) => apiCall('PUT', '/api/users/profile', data),
};

const departmentApi = {
  getAll: () => apiCall('GET', '/api/department'),
};

// ============================================
// SIDEBAR MENU ITEMS
// ============================================

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'projects', label: 'My Projects', icon: '📁' },
  { id: 'uploads', label: 'My Uploads', icon: '📤' },
  { id: 'company', label: 'Company Details', icon: '🏢' },
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'payments', label: 'Payments', icon: '💰' },
];

// ============================================
// PAYMENT MODAL COMPONENT
// ============================================

const PaymentModal: React.FC<{
  project: Project | null;
  onClose: () => void;
  onPaymentSuccess: () => void;
}> = ({ project, onClose, onPaymentSuccess }) => {
  const [step, setStep] = useState<'qr' | 'form'>('qr');
  const [transactionId, setTransactionId] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentNote, setPaymentNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const qrCodeUrl = "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=upi://pay?pa=company@upi&pn=Gaurion&am=0&cu=INR";

  const handleSubmitPayment = async () => {
    if (!project) return;
    if (!transactionId.trim()) { setError('Please enter Transaction ID'); return; }
    if (!amount.trim() || parseFloat(amount) <= 0) { setError('Please enter a valid amount'); return; }

    setSubmitting(true);
    setError('');

    try {
      await paymentApi.submitProjectPayment({
        transactionId: transactionId.trim(),
        amount: amount.trim(),
        paymentNote: paymentNote.trim() || `Payment for ${project.projectName}`,
        projectId: project.projectId,
      });
      setSuccess('Payment submitted successfully! Waiting for approval.');
      setTimeout(() => { onPaymentSuccess(); onClose(); }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Payment submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-mask open">
      <div className="modal-box">
        <button className="m-close" onClick={onClose}>✕</button>
        <h2>💳 Make Payment</h2>
        <p>{project?.projectName}</p>
        
        <div className="m-tabs">
          <button className={`m-tab ${step === 'qr' ? 'active' : ''}`} onClick={() => setStep('qr')}>📱 Scan & Pay</button>
          <button className={`m-tab ${step === 'form' ? 'active' : ''}`} onClick={() => setStep('form')}>✍️ Submit Details</button>
        </div>

        <div className="m-tab-content">
          {step === 'qr' ? (
            <div style={{ textAlign: 'center' }}>
              <img src={qrCodeUrl} alt="QR Code" style={{ width: 200, height: 200, margin: '20px auto', borderRadius: '16px' }} />
              <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>
                1. Scan QR with any UPI app<br />
                2. Enter amount and make payment<br />
                3. Click "Submit Details" to confirm
              </p>
              <button className="btn-primary" onClick={() => setStep('form')}>Next: Submit Details →</button>
            </div>
          ) : (
            <div className="m-form">
              <input type="text" placeholder="Transaction ID *" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
              <input type="number" placeholder="Amount (INR) *" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <textarea placeholder="Payment Note" rows={2} value={paymentNote} onChange={(e) => setPaymentNote(e.target.value)} />
              {error && <div className="error-msg">{error}</div>}
              {success && <div className="success-msg">{success}</div>}
              <button className="btn-msub" onClick={handleSubmitPayment} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Payment'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// TRANSACTION DETAIL MODAL
// ============================================

const TransactionDetailModal: React.FC<{
  isOpen: boolean;
  transactionId: string;
  onClose: () => void;
}> = ({ isOpen, transactionId, onClose }) => {
  const [payment, setPayment] = useState<PaymentRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && transactionId) {
      fetchTransactionDetails();
    }
  }, [isOpen, transactionId]);

  const fetchTransactionDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await paymentApi.getPaymentByTransactionId(transactionId);
      if (res.success && res.data) {
        setPayment(res.data);
      } else {
        setError('Transaction not found');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch transaction details');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const getStatusClass = (status: string) => {
    if (status === 'APPROVED') return 'status-approved';
    if (status === 'REJECTED') return 'status-rejected';
    return 'status-pending';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'APPROVED') return '✅';
    if (status === 'REJECTED') return '❌';
    return '⏳';
  };

  return (
    <div className="modal-mask open">
      <div className="modal-box">
        <button className="m-close" onClick={onClose}>✕</button>
        <h2>🔍 Transaction Details</h2>
        <p className="txn-id-header">Transaction ID: <strong>{transactionId}</strong></p>
        
        {loading ? (
          <div className="loading-state">Loading transaction details...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : payment ? (
          <div className="transaction-detail-card">
            <div className="detail-header">
              <span className={`status-badge ${getStatusClass(payment.status)}`}>
                {getStatusIcon(payment.status)} {payment.status}
              </span>
              <span className="detail-date">{new Date(payment.dateTime).toLocaleString()}</span>
            </div>
            
            <div className="detail-amount">₹{parseFloat(payment.amount).toLocaleString()}</div>
            
            <div className="detail-info-grid">
              <div className="info-item">
                <label>Payment ID</label>
                <span>#{payment.paymentId}</span>
              </div>
              <div className="info-item">
                <label>Transaction ID</label>
                <span className="txn-id">{payment.transactionId}</span>
              </div>
              <div className="info-item">
                <label>Payment Type</label>
                <span>{payment.type}</span>
              </div>
              <div className="info-item">
                <label>User</label>
                <span>{payment.userName}</span>
              </div>
              {payment.paymentNote && (
                <div className="info-item full-width">
                  <label>Payment Note</label>
                  <span>{payment.paymentNote}</span>
                </div>
              )}
              {payment.directorNote && (
                <div className="info-item full-width">
                  <label>Director Note</label>
                  <span className="director-note">{payment.directorNote}</span>
                </div>
              )}
              {payment.approvedByName && (
                <div className="info-item">
                  <label>Approved By</label>
                  <span>{payment.approvedByName}</span>
                </div>
              )}
              {payment.approvedAt && (
                <div className="info-item">
                  <label>Approved At</label>
                  <span>{new Date(payment.approvedAt).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="empty-state">No transaction details found</div>
        )}
        
        <button className="btn-msub" onClick={onClose} style={{ marginTop: '1rem' }}>Close</button>
      </div>
    </div>
  );
};

// ============================================
// MAIN CLIENT COMPONENT
// ============================================

const Client: React.FC = () => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [clientDetails, setClientDetails] = useState<ClientDetails | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [myUploads, setMyUploads] = useState<FileItem[]>([]);
  const [clientDashboard, setClientDashboard] = useState<ClientDashboardData | null>(null);
  const [clientProjectsPayment, setClientProjectsPayment] = useState<ClientProjectPayment[]>([]);
  const [selectedPaymentProject, setSelectedPaymentProject] = useState<Project | null>(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [projectHistory, setProjectHistory] = useState<ProjectHistory[]>([]);
  const [projectFiles, setProjectFiles] = useState<FileItem[]>([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showClientEditModal, setShowClientEditModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState('overview');
  const [uploadingFile, setUploadingFile] = useState(false);
  const [deletingFile, setDeletingFile] = useState<number | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentRefreshTrigger, setPaymentRefreshTrigger] = useState(0);
  const [projectFilter, setProjectFilter] = useState<'all' | 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED'>('all');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileTypeSelectRef = useRef<HTMLSelectElement>(null);
  const { logout } = useAuth();

  const isClientApproved = clientDetails?.isApproved === 'APPROVED' || clientDetails?.isApproved === true;
  const isClientPending = clientDetails?.isApproved === 'PENDING' || clientDetails?.isApproved === false;
  const isClientRejected = clientDetails?.clientStatus==="REJECTED";

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    loadDashboardData();
    loadDepartments();
    loadClientPaymentData();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      loadClientPaymentData();
    }
  }, [projects, paymentRefreshTrigger]);

  const loadDepartments = async () => {
    setLoadingDepartments(true);
    try {
      const response = await departmentApi.getAll() as { success: boolean; data: any };
      if (response.success && response.data) setDepartments(response.data);
    } catch (error) {
      // Silent fail
    } finally {
      setLoadingDepartments(false);
    }
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [profileRes, clientRes, projectsRes, uploadsRes]: any= await Promise.all([
        userApi.getProfile(),
        clientApi.getMyDetails(),
        projectApi.getMyProjects(),
        fileApi.getMyUploads(),
      ]);
      setUser(profileRes.data);
      setClientDetails(clientRes.data);
      setProjects(projectsRes.data || []);
      setMyUploads(uploadsRes.data || []);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadClientPaymentData = async () => {
    try {
      const [dashboardRes, projectsRes]: any = await Promise.all([
        paymentApi.getClientDashboard().catch(() => ({ data: null })),
        paymentApi.getMyClientProjects().catch(() => ({ data: [] })),
      ]);
      
      if (dashboardRes.success && dashboardRes.data) {
        setClientDashboard(dashboardRes.data);
      }
      if (projectsRes.success && projectsRes.data) {
        setClientProjectsPayment(projectsRes.data);
      }
    } catch (error) {
      console.error('Error loading payment data:', error);
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleCreateProject = async (data: any) => {
    if (!isClientApproved) { 
      alert('Your company must be approved first'); 
      return; 
    }
    try {
      setLoadingDepartments(true);
      const response: any = await projectApi.create(data);
      if (response.success) {
        await loadDashboardData();
        setShowProjectModal(false);
        alert('Project created successfully!');
      }
    } catch (error) {
      alert('Failed to create project');
    } finally {
      setLoadingDepartments(false);
    }
  };

  const handleUpdateProject = async (data: any) => {
    if (!isClientApproved) { 
      alert('Your company must be approved first'); 
      return; 
    }
    if (!editingProject) return;
    try {
      const response: any = await projectApi.update(editingProject.projectId, data);
      if (response.success) {
        await loadDashboardData();
        setShowProjectModal(false);
        setEditingProject(null);
        alert('Project updated successfully!');
      }
    } catch (error) {
      alert('Failed to update project');
    }
  };

  const handleDeleteProject = async (projectId: number) => {
    if (!isClientApproved) { 
      alert('Your company must be approved first'); 
      return; 
    }
    if (!confirm('Are you sure?')) return;
    try {
      await projectApi.delete(projectId);
      await loadDashboardData();
      if (selectedProjectId === projectId) {
        setSelectedProjectId(null);
        setSelectedProject(null);
      }
      alert('Project deleted successfully!');
    } catch (error) {
      alert('Failed to delete project');
    }
  };

  const handleViewProject = async (project: Project) => {
    setSelectedProject(project);
    setActiveModalTab('overview');
    try {
      const [historyRes, filesRes]: any = await Promise.all([
        projectApi.getHistory(project.projectId),
        fileApi.getByProject(project.projectId),
      ]);
      setProjectHistory(historyRes.data || []);
      setProjectFiles(filesRes.data || []);
    } catch (error) {
      // Silent fail
    }
  };

  const handleProjectSelect = (projectId: number | null) => {
    setSelectedProjectId(projectId);
    if (projectId) {
      const project = projects.find(p => p.projectId === projectId);
      if (project) handleViewProject(project);
    } else {
      setSelectedProject(null);
      setProjectHistory([]);
      setProjectFiles([]);
    }
  };

  const handleOpenPaymentModal = (project: Project) => {
    if (!isClientApproved) { 
      alert('Company must be approved to make payments'); 
      return; 
    }
    if (project.status === 'PENDING') { 
      alert('Project pending approval. Wait for director approval.'); 
      return; 
    }
    setSelectedPaymentProject(project);
    setShowPaymentModal(true);
  };

  const handleViewTransaction = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    setShowTransactionModal(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentRefreshTrigger(prev => prev + 1);
    loadClientPaymentData();
  };

  const handleFileUpload = async () => {
    if (!selectedProject || !isClientApproved) return;
    if (!fileInputRef.current?.files?.length) { alert('Select a file'); return; }
    
    const file = fileInputRef.current.files[0];
    const fileType = fileTypeSelectRef.current?.value || 'Document';
    
    setUploadingFile(true);
    try {
      await fileApi.upload(selectedProject.projectId, file, fileType);
      const filesRes = await fileApi.getByProject(selectedProject.projectId);
      setProjectFiles(filesRes.data || []);
      const uploadsRes = await fileApi.getMyUploads();
      setMyUploads(uploadsRes.data || []);
      if (fileInputRef.current) fileInputRef.current.value = '';
      alert('File uploaded successfully!');
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploadingFile(false);
    }
  };

  const handleFileView = async (fileId: number) => {
    try {
      const tokenRes: any = await fileApi.getAccessToken(fileId);
      if (tokenRes.success && tokenRes.data) {
        window.open(`${API_BASE}${tokenRes.data.secureUrl}`, '_blank');
      } else {
        alert('Cannot view file');
      }
    } catch (error) {
      alert('Cannot view file');
    }
  };

  const handleFileDownload = async (fileId: number) => {
    try {
      const tokenRes: any = await fileApi.getAccessToken(fileId);
      if (tokenRes.success && tokenRes.data) {
        window.open(`${API_BASE}${tokenRes.data.downloadUrl}`, '_blank');
      } else {
        alert('Cannot download file');
      }
    } catch (error) {
      alert('Download failed');
    }
  };

  const handleFileDelete = async (fileId: number) => {
    if (!confirm('Delete this file?')) return;
    setDeletingFile(fileId);
    try {
      await fileApi.delete(fileId);
      if (selectedProject) {
        const filesRes = await fileApi.getByProject(selectedProject.projectId);
        setProjectFiles(filesRes.data || []);
      }
      const uploadsRes = await fileApi.getMyUploads();
      setMyUploads(uploadsRes.data || []);
      alert('File deleted successfully!');
    } catch (error) {
      alert('Delete failed');
    } finally {
      setDeletingFile(null);
    }
  };

  const handleUpdateProfile = async (data: any) => {
    try {
      await userApi.updateProfile(data);
      const profileRes : any = await userApi.getProfile();
      setUser(profileRes.data);
      setShowProfileModal(false);
      alert('Profile updated!');
    } catch (error) {
      alert('Update failed');
    }
  };

  const handleUpdateClient = async (data: any) => {
    try {
      await clientApi.update(data);
      const clientRes : any = await clientApi.getMyDetails();
      setClientDetails(clientRes.data);
      setShowClientEditModal(false);
      alert('Company details updated!');
    } catch (error) {
      alert('Update failed');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      // Silent fail
    }
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { class: string; label: string }> = {
      PENDING: { class: 'status-pending', label: '⏳ Pending' },
      APPROVED: { class: 'status-approved', label: '✅ Approved' },
      REJECTED: { class: 'status-rejected', label: '❌ Rejected' },
      ASSIGNED: { class: 'status-assigned', label: '👥 Assigned' },
      IN_PROGRESS: { class: 'status-progress', label: '🔄 In Progress' },
      COMPLETED: { class: 'status-completed', label: '✅ Completed' },
    };
    const c = config[status] || { class: 'status-pending', label: status };
    return <span className={`status-badge ${c.class}`}>{c.label}</span>;
  };

  const getPaymentStatusBadge = (status: string) => {
    if (status === 'APPROVED') return <span className="status-badge status-approved">✅ Approved</span>;
    if (status === 'REJECTED') return <span className="status-badge status-rejected">❌ Rejected</span>;
    return <span className="status-badge status-pending">⏳ Pending</span>;
  };

  const filteredProjects = projectFilter === 'all' ? projects : projects.filter(p => p.status === projectFilter);

  const uploadsByProject = React.useMemo(() => {
    const grouped: { [key: string]: { project: Project | undefined; files: FileItem[] } } = {};
    myUploads.forEach(file => {
      const project = projects.find(p => 
        file.fileLink?.includes(`project_${p.projectId}`) || 
        file.departmentId === p.departmentId
      );
      const projectId = project ? project.projectId.toString() : 'unknown';
      if (!grouped[projectId]) {
        grouped[projectId] = { project, files: [] };
      }
      grouped[projectId].files.push(file);
    });
    return grouped;
  }, [myUploads, projects]);

  const getCommitHash = (statusId: any, index: number): string => {
    if (!statusId) return `COMMIT-${String(index + 1).padStart(2, '0')}`;
    const idString = String(statusId);
    return idString.length > 8 ? idString.slice(-8) : idString.padStart(8, '0');
  };

  const formatRelativeTime = (dateTime: string): string => {
    try {
      const date = new Date(dateTime);
      const now = new Date();
      const diffMins = Math.floor((now.getTime() - date.getTime()) / 60000);
      if (diffMins < 1) return 'just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
      return `${Math.floor(diffMins / 1440)}d ago`;
    } catch {
      return 'unknown';
    }
  };

  const formatDeadline = (deadline: string): string => {
    try {
      const diffDays = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
      if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} days`;
      if (diffDays === 0) return 'Due today';
      return `Due in ${diffDays} days`;
    } catch {
      return 'No deadline';
    }
  };

  if (loading) {
    return (
      <div className="client-loader">
        <div className="loader-spinner"></div>
      </div>
    );
  }

  return (
    <div className="client-container">
      <div className={`client-sidebar ${mobileSidebarOpen ? 'open' : ''}`}>
        <CommonSidebar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          onLogout={handleLogout}
          onThemeToggle={toggleDarkMode}
          darkMode={darkMode}
          user={user ? { name: user.name, email: user.email, photoUrl: user.photoUrl } : null}
          menuItems={menuItems}
          title="Client Portal"
          logoIcon="🚀"
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />
      </div>

      <button className="mobile-menu-btn" onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>☰</button>

      <main className="client-main">
        {clientDetails && isClientPending && (
          <div className="approval-banner pending">
            <div className="banner-icon">⏳</div>
            <div className="banner-content">
              <h4>Company Registration Pending</h4>
              <p>Your company registration is under review. You will be able to create projects, upload files, and make payments once approved.</p>
            </div>
          </div>
        )}
        
        {clientDetails && isClientRejected && (
          <div className="approval-banner rejected">
            <div className="banner-icon">❌</div>
            <div className="banner-content">
              <h4>Company Registration Rejected</h4>
              <p>{clientDetails.rejectionReason || 'Your company registration has been rejected. Please contact support.'}</p>
            </div>
          </div>
        )}

        {clientDetails && isClientApproved && (
          <div className="approval-banner approved">
            <div className="banner-icon">✅</div>
            <div className="banner-content">
              <h4>Company Verified</h4>
              <p>Your company has been approved. You can now create projects, upload files, and make payments.</p>
            </div>
          </div>
        )}

        {selectedProjectId && selectedProject && (
          <div className="project-context-banner">
            <div className="context-info">
              <span className="context-icon">📌</span>
              <span className="context-text">Current Project: <strong>{selectedProject.projectName}</strong></span>
              <span className={`context-status status-${selectedProject.status?.toLowerCase()}`}>
                {selectedProject.status === 'PENDING' ? '⏳ Pending' : 
                 selectedProject.status === 'ASSIGNED' ? '👥 Assigned' :
                 selectedProject.status === 'IN_PROGRESS' ? '🔄 In Progress' : '✅ Completed'}
              </span>
              {selectedProject.cost && <span className="context-cost">💰 ₹{parseFloat(selectedProject.cost).toLocaleString()}</span>}
            </div>
            <button className="context-clear" onClick={() => handleProjectSelect(null)}>✕ Clear</button>
          </div>
        )}

        <header className="client-header">
          <div className="header-welcome">
            <h1>Welcome back, {user?.name?.split(' ')[0] || 'User'}!</h1>
            <p>Manage your projects and account settings</p>
          </div>
          <div className="header-stats">
            <div className="header-stat-item">
              <span className="stat-label">Company</span>
              <span className="stat-value-sm">{clientDetails?.companyName || 'N/A'}</span>
            </div>
            <div className="header-stat-item">
              <span className="stat-label">Status</span>
              {getStatusBadge(clientDetails?.isApproved ? 'APPROVED' : 'PENDING')}
            </div>
            <div className="header-stat-item">
              <span className="stat-label">Member Since</span>
              <span className="stat-value-sm">{clientDetails?.createdAt ? new Date(clientDetails.createdAt).toLocaleDateString() : 'N/A'}</span>
            </div>
          </div>
        </header>

        {activeNav === 'dashboard' && (
          <>
            <div className="stats-grid">
              <div className="stat-card"><div className="stat-icon blue">📊</div><div className="stat-info"><span className="stat-value">{projects.length}</span><span className="stat-label">Total Projects</span></div></div>
              <div className="stat-card"><div className="stat-icon green">✅</div><div className="stat-info"><span className="stat-value">{projects.filter(p => p.status === 'COMPLETED').length}</span><span className="stat-label">Completed</span></div></div>
              <div className="stat-card"><div className="stat-icon orange">🔄</div><div className="stat-info"><span className="stat-value">{projects.filter(p => p.status === 'IN_PROGRESS').length}</span><span className="stat-label">In Progress</span></div></div>
              <div className="stat-card"><div className="stat-icon purple">📎</div><div className="stat-info"><span className="stat-value">{myUploads.length}</span><span className="stat-label">Files Uploaded</span></div></div>
            </div>

            <div className="dashboard-card">
              <div className="card-header"><h2>Recent Projects</h2><button className="btn-primary" onClick={() => setShowProjectModal(true)} disabled={!isClientApproved}>+ New Project</button></div>
              <div className="projects-grid">
                {projects.slice(0, 3).map(project => (
                  <div key={project.projectId} className="card">
                    <div className="project-card-header"><h3>{project.projectName}</h3>{getStatusBadge(project.status)}</div>
                    <p className="project-card-desc">{project.projectDescription.substring(0, 80)}...</p>
                    <div className="project-card-meta"><span>📱 {project.projectType}</span><span>🏢 {project.departmentName}</span>{project.cost && <span>💰 ₹{parseFloat(project.cost).toLocaleString()}</span>}</div>
                    {project.status === 'PENDING' && <div className="pending-warning">⏳ Wait for Approval from Director</div>}
                    <div className="project-card-actions">
                      <button className="btn-sm btn-primary" onClick={() => handleViewProject(project)}>View Details</button>
                      <button className="btn-sm btn-outline" onClick={() => { setEditingProject(project); setShowProjectModal(true); }} disabled={!isClientApproved || project.status === 'PENDING'}>Edit</button>
                      <button className="btn-sm btn-danger" onClick={() => handleDeleteProject(project.projectId)} disabled={!isClientApproved || project.status === 'PENDING'}>Delete</button>
                      <button className="btn-sm btn-payment" onClick={() => handleOpenPaymentModal(project)} disabled={!isClientApproved || project.status === 'PENDING'}>💳 Pay</button>
                    </div>
                  </div>
                ))}
              </div>
              {projects.length === 0 && <div className="empty-state"><span className="empty-icon">📂</span><p>No projects yet. Create your first project!</p></div>}
              {projects.length > 3 && <button className="view-all-link" onClick={() => setActiveNav('projects')}>View All Projects →</button>}
            </div>
          </>
        )}

        {activeNav === 'projects' && (
          <div className="dashboard-card full-width">
            <div className="card-header"><h2>My Projects</h2><div className="header-actions"><select className="filter-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value as any)}><option value="all">All Projects</option><option value="PENDING">⏳ Pending</option><option value="ASSIGNED">👥 Assigned</option><option value="IN_PROGRESS">🔄 In Progress</option><option value="COMPLETED">✅ Completed</option></select><button className="btn-primary" onClick={() => setShowProjectModal(true)} disabled={!isClientApproved}>+ New Project</button></div></div>
            <div className="projects-grid">
              {filteredProjects.map(project => (
                <div key={project.projectId} className="card">
                  <div className="project-card-header"><h3>{project.projectName}</h3>{getStatusBadge(project.status)}</div>
                  <p className="project-card-desc">{project.projectDescription.substring(0, 100)}...</p>
                  <div className="project-card-meta"><span>📱 {project.projectType}</span><span>🏢 {project.departmentName}</span>{project.cost && <span>💰 ₹{parseFloat(project.cost).toLocaleString()}</span>}{project.deadline && <span>📅 Due: {new Date(project.deadline).toLocaleDateString()}</span>}</div>
                  {project.assignedManagerName && <div className="project-card-manager">👔 Manager: {project.assignedManagerName}</div>}
                  {project.status === 'PENDING' && <div className="pending-warning">⏳ Wait for Approval from Director</div>}
                  <div className="project-card-actions">
                    <button className="btn-sm btn-primary" onClick={() => handleViewProject(project)}>View</button>
                    <button className="btn-sm btn-outline" onClick={() => { setEditingProject(project); setShowProjectModal(true); }} disabled={!isClientApproved || project.status === 'PENDING'}>Edit</button>
                    <button className="btn-sm btn-danger" onClick={() => handleDeleteProject(project.projectId)} disabled={!isClientApproved || project.status === 'PENDING'}>Delete</button>
                    <button className="btn-sm btn-payment" onClick={() => handleOpenPaymentModal(project)} disabled={!isClientApproved || project.status === 'PENDING'}>💳 Pay</button>
                  </div>
                </div>
              ))}
            </div>
            {filteredProjects.length === 0 && <div className="empty-state"><span className="empty-icon">📂</span><p>No projects found in this category.</p></div>}
          </div>
        )}

        {activeNav === 'uploads' && (
          <div className="dashboard-card full-width">
            <div className="uploads-header"><div className="uploads-title"><span className="uploads-icon">📁</span><h2>My Uploads</h2></div><p className="uploads-subtitle">Files organized by project</p></div>
            {Object.keys(uploadsByProject).length === 0 ? <div className="empty-state"><span className="empty-icon">📤</span><p>No files uploaded yet. Upload files from your project details.</p></div> : (
              <div className="project-folders-grid">
                {Object.entries(uploadsByProject).map(([projectId, { project, files }]) => (
                  <div key={projectId} className="project-folder-card">
                    <div className="folder-header"><div className="folder-icon">📂</div><div className="folder-info"><h3>{project?.projectName || 'Unknown Project'}</h3><div className="folder-stats"><span className="file-count">{files.length} files</span>{project && getStatusBadge(project.status)}</div></div></div>
                    <div className="folder-files-list">
                      {files.map(file => (
                        <div key={file.fileId} className="folder-file-item">
                          <div className="file-type-icon">{file.fileType === 'Image' ? '🖼️' : file.fileType === 'Code' ? '💻' : file.fileType === 'PDF' ? '📕' : '📄'}</div>
                          <div className="file-details"><div className="file-name">{file.fileLink.split('/').pop()}</div><div className="file-meta-info"><span className="file-badge">{file.fileType}</span><span>📤 {file.uploaderName}</span><span>📅 {new Date(file.uploadTime).toLocaleDateString()}</span></div></div>
                          <div className="file-actions-folder">
                            <button className="icon-btn view" onClick={() => handleFileView(file.fileId)}>👁️</button>
                            <button className="icon-btn download" onClick={() => handleFileDownload(file.fileId)}>📥</button>
                            <button className="icon-btn delete" onClick={() => handleFileDelete(file.fileId)} disabled={deletingFile === file.fileId}>{deletingFile === file.fileId ? '⏳' : '🗑️'}</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeNav === 'company' && (
          <div className="dashboard-card full-width">
            <div className="card-header"><h2>Company Details</h2><button className="btn-outline" onClick={() => setShowClientEditModal(true)}>✏️ Edit</button></div>
            <div className="details-grid">
              <div className="detail-item"><label>Company Name</label><span>{clientDetails?.companyName}</span></div>
              <div className="detail-item"><label>Mobile Number</label><span>{clientDetails?.companyMobileNumber}</span></div>
              <div className="detail-item"><label>Email</label><span>{clientDetails?.companyEmail}</span></div>
              <div className="detail-item"><label>Organization Type</label><span>{clientDetails?.orgType}</span></div>
              <div className="detail-item"><label>Client Type</label><span>{clientDetails?.clientType}</span></div>
              <div className="detail-item"><label>Website</label><a href={clientDetails?.clientWebsite} target="_blank" rel="noopener noreferrer">{clientDetails?.clientWebsite}</a></div>
              <div className="detail-item"><label>Status</label>{getStatusBadge(clientDetails?.isApproved || 'PENDING')}</div>
              <div className="detail-item"><label>Member Since</label><span>{clientDetails?.createdAt && new Date(clientDetails.createdAt).toLocaleDateString()}</span></div>
            </div>
          </div>
        )}

        {activeNav === 'profile' && (
          <div className="dashboard-card full-width">
            <div className="card-header"><h2>Profile Information</h2><button className="btn-outline" onClick={() => setShowProfileModal(true)}>✏️ Edit Profile</button></div>
            <div className="profile-info">
              <div className="profile-avatar-large">{user?.photoUrl ? <img src={user.photoUrl} alt={user.name} /> : <div className="avatar-placeholder">{user?.name?.charAt(0)}</div>}</div>
              <div className="profile-details">
                <div className="detail-item"><label>Full Name</label><span>{user?.name}</span></div>
                <div className="detail-item"><label>Email</label><span>{user?.email}</span></div>
                <div className="detail-item"><label>Phone</label><span>{user?.phoneNumber || 'Not provided'}</span></div>
                <div className="detail-item"><label>Address</label><span>{user?.address || 'Not provided'}</span></div>
                <div className="detail-item"><label>Gender</label><span>{user?.gender || 'Not provided'}</span></div>
                <div className="detail-item"><label>DOB</label><span>{user?.dob || 'Not provided'}</span></div>
              </div>
            </div>
          </div>
        )}

        {/* PAYMENTS PAGE */}
        {activeNav === 'payments' && (
          <div className="dashboard-card full-width">
            <div className="payments-page-header"><div className="payments-title"><span className="payments-icon">💰</span><h2>Payment Dashboard</h2></div><p className="payments-subtitle">Track all your transactions and payment status</p></div>

            <div className="payments-stats-grid">
              <div className="payment-stat-card"><div className="stat-icon-small">📊</div><div className="stat-info-small"><span className="stat-value-small">{clientDashboard?.totalProjects || 0}</span><span className="stat-label-small">Total Projects</span></div></div>
              <div className="payment-stat-card"><div className="stat-icon-small success">✅</div><div className="stat-info-small"><span className="stat-value-small">{clientDashboard?.completedProjects || 0}</span><span className="stat-label-small">Completed</span></div></div>
              <div className="payment-stat-card"><div className="stat-icon-small warning">⏳</div><div className="stat-info-small"><span className="stat-value-small">{clientDashboard?.pendingProjects || 0}</span><span className="stat-label-small">In Progress</span></div></div>
              <div className="payment-stat-card"><div className="stat-icon-small purple">💰</div><div className="stat-info-small"><span className="stat-value-small">₹{clientDashboard ? parseFloat(clientDashboard.totalPaidAmount).toLocaleString() : '0'}</span><span className="stat-label-small">Total Paid</span></div></div>
            </div>

            {clientDashboard && (
              <div className="overall-progress-card">
                <div className="progress-header"><span>Overall Payment Progress</span><span className="progress-percentage">{clientDashboard.overallPaidPercentage.toFixed(1)}%</span></div>
                <div className="progress-bar-container large"><div className="progress-fill" style={{ width: `${clientDashboard.overallPaidPercentage}%` }}></div></div>
                <div className="progress-stats"><span>Total Budget: ₹{parseFloat(clientDashboard.totalProjectCost).toLocaleString()}</span><span>Remaining: ₹{parseFloat(clientDashboard.totalRemainingAmount).toLocaleString()}</span></div>
              </div>
            )}

            <div className="payment-projects-section">
              <h3 className="section-subtitle">📋 Project Payment Status</h3>
              <div className="payment-projects-grid">
                {(clientProjectsPayment.length > 0 ? clientProjectsPayment : clientDashboard?.projects || []).map(project => {
                  const total = parseFloat(project.totalProjectAmount);
                  const paid = parseFloat(project.paidAmount);
                  const remaining = parseFloat(project.remainingAmount);
                  const percentage = project.paidPercentage;
                  const actualProject = projects.find(p => p.projectId === project.projectId);
                  return (
                    <div key={project.projectId} className="payment-project-card">
                      <div className="payment-project-header"><div><h4>{project.projectName}</h4><span className="project-type-badge">{actualProject?.projectType || 'Project'}</span></div>{actualProject && getStatusBadge(actualProject.status)}</div>
                      <div className="payment-amount-section"><div className="amount-row"><span>Total Budget</span><strong className="total-amount">₹{total.toLocaleString()}</strong></div><div className="amount-row paid"><span>Paid Amount</span><strong className="paid-amount">₹{paid.toLocaleString()}</strong></div><div className="amount-row remaining"><span>Remaining</span><strong className="remaining-amount">₹{remaining.toLocaleString()}</strong></div></div>
                      <div className="payment-progress-section"><div className="progress-bar-container"><div className="progress-fill" style={{ width: `${percentage}%` }}></div></div><div className="progress-text"><span>{percentage.toFixed(1)}% Paid</span>{project.isFullyPaid && <span className="fully-paid-badge">✓ Fully Paid</span>}</div></div>
                      {isClientApproved && actualProject?.status !== 'PENDING' && <button className="make-payment-btn" onClick={() => handleOpenPaymentModal(actualProject!)}>💳 Make Payment</button>}
                    </div>
                  );
                })}
              </div>
              {(!clientProjectsPayment || clientProjectsPayment.length === 0) && (!clientDashboard?.projects || clientDashboard.projects.length === 0) && <div className="empty-state"><span className="empty-icon">💰</span><p>No payment-enabled projects found.</p></div>}
            </div>

            <div className="transaction-history-section">
              <h3 className="section-subtitle">📜 Transaction History</h3>
              <div className="transactions-table-container">
                {!clientDashboard?.projects?.some(p => p.payments?.length > 0) ? <div className="empty-state"><span className="empty-icon">📭</span><p>No transactions yet.</p></div> : (
                  <table className="transactions-table">
                    <thead><tr><th>Transaction ID</th><th>Project</th><th>Amount</th><th>Date</th><th>Status</th><th>Note</th><th>Action</th></tr></thead>
                    <tbody>
                      {clientDashboard?.projects?.flatMap(project => project.payments?.map(payment => ({ ...payment, projectName: project.projectName, projectId: project.projectId })) || []).map(payment => (
                        <tr key={payment.paymentId}>
                          <td className="txn-id">{payment.transactionId?.slice(0, 16) || 'N/A'}...</td>
                          <td>{payment.projectName || '—'}</td>
                          <td className="amount-cell">₹{parseFloat(payment.amount).toLocaleString()}</td>
                          <td>{new Date(payment.dateTime).toLocaleDateString()}</td>
                          <td>{getPaymentStatusBadge(payment.status)}</td>
                          <td className="note-cell">{payment.paymentNote || '—'}</td>
                          <td><button className="btn-view-txn" onClick={() => handleViewTransaction(payment.transactionId)}>🔍 View Details</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        <footer className="client-footer"><p>© 2026 Gaurion Bharat | Developed by <a href='https://softmax.in' style={{ color: 'skyblue' }}>Softmax.in</a></p></footer>
      </main>

      {showPaymentModal && selectedPaymentProject && <PaymentModal project={selectedPaymentProject} onClose={() => { setShowPaymentModal(false); setSelectedPaymentProject(null); }} onPaymentSuccess={handlePaymentSuccess} />}
      {showTransactionModal && selectedTransactionId && <TransactionDetailModal isOpen={showTransactionModal} transactionId={selectedTransactionId} onClose={() => { setShowTransactionModal(false); setSelectedTransactionId(null); }} />}

      {showProjectModal && (
        <div className="modal-mask open"><div className="modal-box"><button className="m-close" onClick={() => { setShowProjectModal(false); setEditingProject(null); }}>✕</button><h2>{editingProject ? 'Edit Project' : 'Create Project'}</h2>
          <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); const data: any = { projectName: fd.get('projectName'), projectDescription: fd.get('projectDescription'), projectType: fd.get('projectType'), departmentId: parseInt(fd.get('departmentId') as string) }; const cost = fd.get('cost'); if (cost && cost.toString().trim()) data.cost = cost; editingProject ? handleUpdateProject(data) : handleCreateProject(data); }}>
            <div className="m-form"><input name="projectName" placeholder="Project Name" defaultValue={editingProject?.projectName} required /><textarea name="projectDescription" placeholder="Description" rows={3} defaultValue={editingProject?.projectDescription} required /><input name="cost" placeholder="Project Budget (INR)" defaultValue={editingProject?.cost || ''} /><select name="projectType" defaultValue={editingProject?.projectType || 'Web Application'}><option>Web Application</option><option>Mobile Application</option><option>Desktop Application</option><option>Full Stack Application</option><option>API Development</option><option>AI / ML Project</option><option>E-Commerce Website</option><option>Healthcare System</option></select><select name="departmentId" defaultValue={editingProject?.departmentId || ''} required disabled={loadingDepartments}><option value="">{loadingDepartments ? 'Loading...' : 'Select Department'}</option>{departments.map(dept => <option key={dept.departmentId} value={dept.departmentId}>{dept.departmentName}</option>)}</select><button type="submit" className="btn-msub" disabled={loadingDepartments}>{editingProject ? 'Update Project' : 'Create Project'}</button></div>
          </form>
        </div></div>
      )}

      {showProfileModal && (
        <div className="modal-mask open"><div className="modal-box"><button className="m-close" onClick={() => setShowProfileModal(false)}>✕</button><h2>Edit Profile</h2>
          <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); handleUpdateProfile({ name: fd.get('name'), phoneNumber: fd.get('phoneNumber'), address: fd.get('address'), gender: fd.get('gender'), dob: fd.get('dob') }); }}><div className="m-form"><input name="name" placeholder="Name" defaultValue={user?.name} required /><input name="phoneNumber" placeholder="Phone Number" defaultValue={user?.phoneNumber} /><textarea name="address" placeholder="Address" rows={2} defaultValue={user?.address} /><select name="gender" defaultValue={user?.gender}><option value="">Select Gender</option><option>Male</option><option>Female</option><option>Other</option></select><input name="dob" type="date" defaultValue={user?.dob} /><button type="submit" className="btn-msub">Save Changes</button></div></form>
        </div></div>
      )}

      {showClientEditModal && (
        <div className="modal-mask open"><div className="modal-box"><button className="m-close" onClick={() => setShowClientEditModal(false)}>✕</button><h2>Edit Company Details</h2>
          <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); handleUpdateClient({ companyName: fd.get('companyName'), companyMobileNumber: fd.get('companyMobileNumber'), companyEmail: fd.get('companyEmail'), orgType: fd.get('orgType'), clientType: fd.get('clientType'), clientWebsite: fd.get('clientWebsite') }); }}><div className="m-form"><input name="companyName" placeholder="Company Name" defaultValue={clientDetails?.companyName} required /><input name="companyMobileNumber" placeholder="Mobile Number" defaultValue={clientDetails?.companyMobileNumber} required /><input name="companyEmail" type="email" placeholder="Email" defaultValue={clientDetails?.companyEmail} required /><select name="orgType" defaultValue={clientDetails?.orgType}><option>Private Limited</option><option>Public Limited</option><option>LLP</option><option>Sole Proprietorship</option></select><select name="clientType" defaultValue={clientDetails?.clientType}><option>Startup</option><option>SME</option><option>Enterprise</option><option>Enterprise Plus</option></select><input name="clientWebsite" placeholder="Website URL" defaultValue={clientDetails?.clientWebsite} /><button type="submit" className="btn-msub">Save Changes</button></div></form>
        </div></div>
      )}

      {selectedProject && (
        <div className="modal-mask open"><div className="modal-box large"><button className="m-close" onClick={() => setSelectedProject(null)}>✕</button><h2>{selectedProject.projectName}</h2>
          <div className="m-tabs"><button className={`m-tab ${activeModalTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveModalTab('overview')}>📋 Overview</button><button className={`m-tab ${activeModalTab === 'files' ? 'active' : ''}`} onClick={() => setActiveModalTab('files')}>📎 Files ({projectFiles.length})</button><button className={`m-tab ${activeModalTab === 'history' ? 'active' : ''}`} onClick={() => setActiveModalTab('history')}>📜 History</button></div>

          {activeModalTab === 'overview' && (
            <div className="m-tab-content"><div className="detail-row"><label>Status:</label>{getStatusBadge(selectedProject.status)}</div><div className="detail-row"><label>Description:</label><p>{selectedProject.projectDescription}</p></div><div className="detail-grid"><div><label>Type:</label> {selectedProject.projectType}</div><div><label>Department:</label> {selectedProject.departmentName}</div><div><label>Manager:</label> {selectedProject.assignedManagerName || 'Not assigned'}</div>{selectedProject.cost && <div><label>Budget:</label> ₹{parseFloat(selectedProject.cost).toLocaleString()}</div>}<div><label>Deadline:</label> {selectedProject.deadline ? new Date(selectedProject.deadline).toLocaleDateString() : 'Not set'}</div></div></div>
          )}

          {activeModalTab === 'files' && (
            <div className="m-tab-content">
              {isClientApproved && selectedProject.status !== 'PENDING' && <div className="upload-section"><input type="file" ref={fileInputRef} /><select ref={fileTypeSelectRef} defaultValue="Document"><option>Document</option><option>Image</option><option>Code</option><option>PDF</option><option>Spreadsheet</option></select><button className="btn-primary" onClick={handleFileUpload} disabled={uploadingFile}>{uploadingFile ? 'Uploading...' : '📤 Upload File'}</button></div>}
              {projectFiles.length === 0 ? <div className="empty-state"><span className="empty-icon">📁</span><p>No files uploaded yet.</p></div> : <div className="files-list">{projectFiles.map(file => (<div key={file.fileId} className="file-item"><div className="file-icon">{file.fileType === 'Image' ? '🖼️' : file.fileType === 'Code' ? '💻' : '📄'}</div><div className="file-info"><div className="file-name">{file.fileLink.split('/').pop()}</div><div className="file-meta"><span className="file-type">{file.fileType}</span><span>📤 {file.uploaderName}</span><span>📅 {new Date(file.uploadTime).toLocaleString()}</span></div></div><div className="file-actions"><button className="btn-icon" onClick={() => handleFileView(file.fileId)}>👁️ View</button><button className="btn-icon" onClick={() => handleFileDownload(file.fileId)}>📥 Download</button><button className="btn-icon danger" onClick={() => handleFileDelete(file.fileId)} disabled={deletingFile === file.fileId}>{deletingFile === file.fileId ? '⏳' : '🗑️'}</button></div></div>))}</div>}
            </div>
          )}

          {activeModalTab === 'history' && (
            <div className="m-tab-content">
              {projectHistory.length === 0 ? <div className="empty-state"><span className="empty-icon">📜</span><p>No history records found.</p></div> : <div className="vscode-timeline">{[...projectHistory].reverse().map((entry, idx) => (<div key={idx} className="timeline-entry"><div className="timeline-line"><div className="timeline-dot"></div></div><div className="timeline-content"><div className="commit-header"><span className="hash-text">{getCommitHash(entry.statusId, idx)}</span><span className="branch-name">{entry.status === 'PENDING' ? 'main ⚡' : entry.status === 'IN_PROGRESS' ? 'feature/in-progress' : entry.status === 'APPROVED' ? 'release/approved' : entry.status === 'REJECTED' ? 'hotfix/rejected' : 'main ✔️'}</span><span className="date-text">{formatRelativeTime(entry.dateTime)}</span></div><div className="commit-title">{entry.status === 'PENDING' ? '⏳' : entry.status === 'IN_PROGRESS' ? '🔄' : entry.status === 'APPROVED' ? '✅' : entry.status === 'REJECTED' ? '❌' : '🎉'} {entry.status === 'PENDING' ? 'Pending approval' : entry.status === 'IN_PROGRESS' ? 'Work in progress' : entry.status === 'APPROVED' ? 'Changes approved' : entry.status === 'REJECTED' ? 'Changes rejected' : 'Task completed'}</div>{entry.managerNote && <div className="commit-description">{entry.managerNote}</div>}{entry.directorNote && <div className="commit-description director">{entry.directorNote}</div>}<div className="commit-meta"><span>👤 {entry.handledByName || 'Unknown'}</span>{entry.deadline && <span>📅 {formatDeadline(entry.deadline)}</span>}</div></div></div>))}</div>}
            </div>
          )}
        </div></div>
      )}

      <style jsx>{`
        .client-container { display: flex; min-height: 100vh; }
        .client-sidebar { position: fixed; left: 0; top: 0; bottom: 0; width: 280px; z-index: 100; transition: transform 0.3s ease; }
        .client-main { flex: 1; margin-left: 280px; padding: 24px 32px; min-height: 100vh; }
        @media (max-width: 768px) { .client-sidebar { transform: translateX(-100%); } .client-sidebar.open { transform: translateX(0); } .client-main { margin-left: 0; padding: 16px; } .mobile-menu-btn { display: block; position: fixed; bottom: 20px; right: 20px; z-index: 101; background: var(--g-main); border: none; border-radius: 50%; width: 50px; height: 50px; font-size: 24px; cursor: pointer; } }
        @media (min-width: 769px) { .mobile-menu-btn { display: none; } }
        .approval-banner { border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; display: flex; gap: 16px; }
        .approval-banner.pending { background: #fef3c7; border-left: 4px solid #f59e0b; }
        .approval-banner.rejected { background: #fee2e2; border-left: 4px solid #ef4444; }
        .approval-banner.approved { background: #d1fae5; border-left: 4px solid #10b981; }
        .approval-banner h4 { margin: 0 0 4px; font-size: 16px; font-weight: 700; }
        .approval-banner.pending h4 { color: #92400e; }
        .approval-banner.rejected h4 { color: #991b1b; }
        .approval-banner.approved h4 { color: #065f46; }
        .approval-banner p { margin: 0; font-size: 13px; }
        .pending-warning { background: #fef3c7; padding: 8px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; color: #d97706; margin-bottom: 12px; }
        .btn-payment { background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; }
        .btn-payment:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-view-txn { background: transparent; border: 1px solid var(--teal); color: var(--teal); padding: 4px 8px; border-radius: 20px; font-size: 11px; cursor: pointer; }
        .btn-view-txn:hover { background: var(--teal); color: white; }
        .overall-progress-card { background: linear-gradient(135deg, var(--surface), var(--card-bg)); border-radius: 16px; padding: 1.25rem; margin-bottom: 1.5rem; border: 1px solid var(--border); }
        .progress-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; font-size: 0.85rem; font-weight: 600; }
        .progress-percentage { color: var(--teal); font-weight: 700; }
        .progress-bar-container.large { height: 12px; margin-bottom: 0.75rem; }
        .progress-stats { display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--muted); }
        .uploads-header { margin-bottom: 24px; }
        .uploads-title { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .uploads-icon { font-size: 32px; }
        .uploads-header h2 { font-size: 24px; font-weight: 700; margin: 0; background: linear-gradient(135deg, #2ca6a4, #34a853); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .uploads-subtitle { color: var(--muted); font-size: 14px; margin: 0; }
        .project-folders-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 24px; }
        .project-folder-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 20px; overflow: hidden; transition: all 0.3s ease; }
        .project-folder-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
        .folder-header { display: flex; gap: 16px; padding: 16px 20px; background: linear-gradient(135deg, rgba(44, 166, 164, 0.08), transparent); border-bottom: 1px solid var(--border); }
        .folder-icon { font-size: 40px; }
        .folder-info h3 { font-size: 16px; font-weight: 700; margin: 0 0 6px 0; color: var(--text2); }
        .file-count { font-size: 12px; padding: 2px 8px; background: var(--surface); border-radius: 12px; color: var(--muted); }
        .folder-files-list { padding: 8px 0; max-height: 300px; overflow-y: auto; }
        .folder-file-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-bottom: 1px solid var(--border); }
        .file-type-icon { font-size: 28px; }
        .file-name { font-weight: 600; font-size: 13px; margin-bottom: 4px; color: var(--text2); word-break: break-all; }
        .file-meta-info { display: flex; gap: 12px; flex-wrap: wrap; font-size: 11px; color: var(--muted); }
        .file-badge { padding: 2px 6px; background: rgba(44, 166, 164, 0.1); border-radius: 8px; color: var(--teal); }
        .file-actions-folder { display: flex; gap: 6px; }
        .icon-btn { width: 32px; height: 32px; border-radius: 8px; background: var(--surface); border: 1px solid var(--border); cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; }
        .icon-btn.view:hover { background: #3b82f6; border-color: #3b82f6; color: white; }
        .icon-btn.download:hover { background: #10b981; border-color: #10b981; color: white; }
        .icon-btn.delete:hover { background: #ef4444; border-color: #ef4444; color: white; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px; }
        .stat-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 16px; }
        .stat-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .stat-info .stat-value { font-size: 28px; font-weight: 800; line-height: 1; }
        .stat-info .stat-label { font-size: 12px; color: var(--muted); }
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; }
        .card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; padding: 20px; transition: all 0.2s; }
        .card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
        .project-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .project-card-header h3 { font-size: 16px; font-weight: 700; margin: 0; }
        .project-card-desc { font-size: 13px; color: var(--muted); line-height: 1.5; margin-bottom: 12px; }
        .project-card-meta { display: flex; flex-wrap: wrap; gap: 12px; font-size: 11px; color: var(--muted); margin-bottom: 12px; }
        .project-card-manager { font-size: 12px; color: #8b5cf6; margin-bottom: 16px; }
        .project-card-actions { display: flex; gap: 8px; flex-wrap: wrap; }
        .btn-sm { padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; }
        .btn-sm:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-primary { background: linear-gradient(135deg, #2ca6a4, #1a7a78); color: white; border: none; }
        .btn-outline { background: transparent; border: 1px solid var(--border); }
        .btn-danger { background: rgba(231, 76, 60, 0.1); color: #e74c3c; border: 1px solid #e74c3c; }
        .dashboard-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 20px; padding: 24px; margin-bottom: 24px; }
        .dashboard-card.full-width { width: 100%; }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .card-header h2 { font-size: 20px; font-weight: 700; margin: 0; }
        .header-actions { display: flex; gap: 12px; align-items: center; }
        .filter-select { padding: 8px 16px; border: 1px solid var(--border); border-radius: 10px; background: var(--card-bg); font-size: 13px; cursor: pointer; }
        .file-item { display: flex; align-items: center; gap: 16px; padding: 12px; background: var(--surface); border-radius: 12px; border: 1px solid var(--border); margin-bottom: 8px; }
        .file-icon { font-size: 28px; }
        .file-name { font-weight: 600; font-size: 14px; margin-bottom: 4px; }
        .file-actions { display: flex; gap: 8px; }
        .btn-icon { padding: 6px 12px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; cursor: pointer; font-size: 12px; }
        .btn-icon.danger:hover { background: #fee2e2; border-color: #ef4444; color: #ef4444; }
        .upload-section { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
        .upload-section input, .upload-section select { padding: 8px 12px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; }
        .details-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
        .detail-item { display: flex; flex-direction: column; gap: 4px; }
        .detail-item label { font-size: 11px; font-weight: 600; text-transform: uppercase; color: var(--muted); }
        .detail-item span, .detail-item a { font-size: 14px; font-weight: 500; color: var(--text2); }
        .profile-info { display: flex; gap: 32px; flex-wrap: wrap; }
        .profile-avatar-large { width: 100px; height: 100px; border-radius: 24px; background: linear-gradient(135deg, #2ca6a4, #34a853); display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .avatar-placeholder { font-size: 48px; font-weight: 700; color: white; }
        .profile-details { flex: 1; display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
        .client-footer { text-align: center; padding: 24px 0; margin-top: 32px; border-top: 1px solid var(--border); font-size: 13px; color: var(--muted); }
        .modal-mask { display: flex; position: fixed; inset: 0; z-index: 2000; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(8px); align-items: center; justify-content: center; padding: 20px; }
        .modal-box { background: var(--card-bg); border-radius: 24px; width: 100%; max-width: 500px; max-height: 90vh; overflow-y: auto; padding: 28px; position: relative; }
        .modal-box.large { max-width: 700px; }
        .m-close { position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border-radius: 50%; background: var(--surface); border: 1px solid var(--border); cursor: pointer; }
        .m-tabs { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
        .m-tab { padding: 8px 16px; background: var(--surface); border: none; border-radius: 40px; cursor: pointer; font-size: 14px; font-weight: 500; }
        .m-tab.active { background: linear-gradient(135deg, #2ca6a4, #1a7a78); color: white; }
        .m-form { display: flex; flex-direction: column; gap: 16px; }
        .m-form input, .m-form textarea, .m-form select { padding: 12px 16px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; font-size: 14px; }
        .btn-msub { padding: 14px; background: linear-gradient(135deg, #2ca6a4, #1a7a78); color: white; border: none; border-radius: 40px; font-weight: 700; cursor: pointer; }
        .error-msg { color: #ef4444; font-size: 13px; padding: 8px; background: rgba(239,68,68,0.1); border-radius: 8px; }
        .success-msg { color: #10b981; font-size: 13px; padding: 8px; background: rgba(16,185,129,0.1); border-radius: 8px; }
        .detail-row { margin-bottom: 16px; }
        .detail-row label { font-weight: 700; font-size: 12px; color: var(--muted); display: block; margin-bottom: 4px; }
        .detail-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin-top: 16px; }
        .files-list { display: flex; flex-direction: column; gap: 12px; }
        .vscode-timeline { max-height: 500px; overflow-y: auto; }
        .timeline-entry { display: flex; gap: 16px; margin-bottom: 20px; }
        .timeline-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--teal); }
        .commit-header { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; margin-bottom: 8px; }
        .hash-text { font-family: monospace; font-size: 11px; background: var(--surface); padding: 2px 6px; border-radius: 4px; }
        .branch-name { font-size: 11px; color: #8b5cf6; }
        .date-text { font-size: 11px; color: var(--muted); }
        .commit-title { font-weight: 700; font-size: 14px; margin-bottom: 4px; }
        .commit-description { font-size: 12px; color: var(--muted); margin: 4px 0; padding: 4px 8px; background: var(--surface); border-radius: 8px; }
        .commit-description.director { color: #8b5cf6; }
        .commit-meta { display: flex; gap: 16px; font-size: 11px; color: var(--muted); margin-top: 8px; }
        .status-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .status-pending { background: rgba(245, 124, 0, 0.1); color: #f59e0b; }
        .status-approved { background: rgba(52, 168, 83, 0.1); color: #10b981; }
        .status-rejected { background: rgba(231, 76, 60, 0.1); color: #ef4444; }
        .status-assigned { background: rgba(31, 109, 168, 0.1); color: #3b82f6; }
        .status-progress { background: rgba(44, 166, 164, 0.1); color: #2ca6a4; }
        .status-completed { background: rgba(52, 168, 83, 0.1); color: #22c55e; }
        .empty-state { text-align: center; padding: 40px 20px; color: var(--muted); }
        .empty-icon { font-size: 48px; display: block; margin-bottom: 16px; opacity: 0.5; }
        .client-loader { display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .loader-spinner { width: 40px; height: 40px; border: 3px solid var(--border); border-top-color: var(--teal); border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .project-context-banner { display: flex; justify-content: space-between; align-items: center; background: #eff6ff; border: 1px solid #3b82f6; border-radius: 12px; padding: 12px 20px; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
        .context-info { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; }
        .context-cost { padding: 4px 12px; background: #d1fae5; color: #059669; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .context-clear { background: transparent; border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 14px; cursor: pointer; }
        .context-clear:hover { background: #fee2e2; border-color: #ef4444; color: #ef4444; }
        .client-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; flex-wrap: wrap; gap: 20px; }
        .header-welcome h1 { font-size: 28px; font-weight: 700; margin: 0 0 4px; background: linear-gradient(135deg, #2ca6a4, #34a853); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .header-welcome p { color: var(--muted); font-size: 0.85rem; margin: 0; }
        .header-stats { display: flex; gap: 24px; }
        .header-stat-item { text-align: right; }
        .header-stat-item .stat-label { font-size: 11px; text-transform: uppercase; font-weight: 600; color: var(--muted); display: block; }
        .stat-value-sm { font-size: 14px; font-weight: 600; }
        .view-all-link { margin-top: 20px; text-align: center; width: 100%; padding: 12px; background: transparent; border: none; color: var(--teal); font-weight: 600; cursor: pointer; }
        .payments-page-header { margin-bottom: 24px; }
        .payments-title { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .payments-icon { font-size: 32px; }
        .payments-page-header h2 { font-size: 24px; font-weight: 700; margin: 0; background: linear-gradient(135deg, #2ca6a4, #34a853); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .payments-subtitle { color: var(--muted); font-size: 14px; margin: 0; }
        .payments-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
        @media (max-width: 640px) { .payments-stats-grid { grid-template-columns: repeat(2, 1fr); } }
        .payment-stat-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; padding: 16px; display: flex; align-items: center; gap: 12px; }
        .payment-stat-card:hover { transform: translateY(-2px); box-shadow: var(--shadow); }
        .stat-icon-small { width: 48px; height: 48px; border-radius: 12px; background: rgba(44, 166, 164, 0.1); display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .stat-icon-small.success { background: rgba(52, 168, 83, 0.1); }
        .stat-icon-small.warning { background: rgba(245, 124, 0, 0.1); }
        .stat-icon-small.purple { background: rgba(106, 90, 205, 0.1); }
        .stat-info-small { display: flex; flex-direction: column; }
        .stat-value-small { font-size: 28px; font-weight: 800; line-height: 1; }
        .stat-label-small { font-size: 12px; color: var(--muted); }
        .section-subtitle { font-size: 18px; font-weight: 700; margin-bottom: 20px; color: var(--text2); }
        .payment-projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .payment-project-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 20px; padding: 20px; transition: all 0.2s; }
        .payment-project-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
        .payment-project-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; flex-wrap: wrap; gap: 8px; }
        .payment-project-header h4 { font-size: 16px; font-weight: 700; margin: 0 0 4px 0; }
        .project-type-badge { font-size: 11px; padding: 2px 8px; background: var(--surface); border-radius: 12px; color: var(--muted); }
        .payment-amount-section { background: var(--surface); border-radius: 12px; padding: 12px; margin-bottom: 16px; }
        .amount-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; }
        .amount-row.paid { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .total-amount { color: var(--text2); }
        .paid-amount { color: #10b981; }
        .remaining-amount { color: #f59e0b; }
        .payment-progress-section { margin-bottom: 16px; }
        .progress-bar-container { height: 8px; background: var(--border); border-radius: 4px; overflow: hidden; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #2ca6a4, #34a853); border-radius: 4px; transition: width 0.3s ease; }
        .progress-text { display: flex; justify-content: space-between; margin-top: 6px; font-size: 12px; color: var(--muted); }
        .fully-paid-badge { color: #10b981; font-weight: 600; }
        .make-payment-btn { width: 100%; padding: 10px; background: linear-gradient(135deg, #2ca6a4, #1a7a78); color: white; border: none; border-radius: 40px; font-weight: 600; cursor: pointer; }
        .make-payment-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(44, 166, 164, 0.3); }
        .transactions-table-container { overflow-x: auto; border-radius: 16px; }
        .transactions-table { width: 100%; border-collapse: collapse; }
        .transactions-table th { text-align: left; padding: 12px; background: var(--surface); font-size: 12px; font-weight: 600; color: var(--muted); border-bottom: 1px solid var(--border); }
        .transactions-table td { padding: 12px; border-bottom: 1px solid var(--border); font-size: 13px; }
        .transactions-table tr:hover { background: rgba(44, 166, 164, 0.05); }
        .txn-id { font-family: monospace; font-size: 12px; color: var(--teal); }
        .amount-cell { font-weight: 600; }
        .note-cell { max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--muted); }
      `}</style>
    </div>
  );
};

export default Client;








// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import CommonSidebar from './components/CommonSidebar';
// import { useAuth } from '@/contexts/AuthContext';

// // ============================================
// // TYPES
// // ============================================

// interface UserProfile {
//   userId: number;
//   uid: string;
//   name: string;
//   email: string;
//   photoUrl: string | null;
//   emailVerified: boolean;
//   isProfileCompleted: boolean;
//   phoneNumber?: string;
//   address?: string;
//   gender?: string;
//   dob?: string;
// }

// interface ClientDetails {
//   clientId: number;
//   userId: number;
//   companyName: string;
//   companyMobileNumber: string;
//   companyEmail: string;
//   orgType: string;
//   clientType: string;
//   clientWebsite: string;
//   isApproved: 'PENDING' | 'APPROVED' | 'REJECTED'|boolean;
//   approvedBy?: number;
//   approvedAt?: string;
//   rejectionReason?: string | null;
//   createdAt: string;
//   updatedAt: string;
// }

// interface Project {
//   projectId: number;
//   projectName: string;
//   projectDescription: string;
//   projectType: string;
//   status: 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
//   departmentId: number;
//   departmentName: string;
//   clientId: number;
//   clientName: string;
//   clientEmail: string;
//   assignedManagerId: number | null;
//   assignedManagerName: string | null;
//   cost: string | null;
//   deadline: string | null;
//   createdAt: string;
//   updatedAt: string;
// }

// interface ProjectHistory {
//   statusId: number;
//   projectId: number;
//   projectName: string;
//   status: string;
//   dateTime: string;
//   handledById: number;
//   handledByName: string;
//   assignedToId: number | null;
//   assignedToName: string | null;
//   directorNote: string | null;
//   managerNote: string | null;
//   deadline: string | null;
// }

// interface FileItem {
//   fileId: number;
//   fileType: string;
//   fileLink: string;
//   uploaderId: number;
//   uploaderName: string;
//   uploadTime: string;
//   departmentId: number;
//   departmentName: string;
// }

// interface Department {
//   departmentId: number;
//   departmentName: string;
// }

// interface PaymentRecord {
//   paymentId: number;
//   transactionId: string;
//   amount: string;
//   type: string;
//   status: 'PENDING' | 'APPROVED' | 'REJECTED';
//   userName: string;
//   userEmail: string;
//   paymentNote: string | null;
//   directorNote: string | null;
//   approvedByName: string | null;
//   approvedAt: string | null;
//   dateTime: string;
// }

// interface PaymentSummary {
//   projectId: number;
//   projectName: string;
//   totalProjectAmount: string;
//   paidAmount: string;
//   remainingAmount: string;
//   paidPercentage: number;
//   isFullyPaid: boolean;
//   payments: PaymentRecord[];
// }

// // ============================================
// // API SERVICE
// // ============================================

// const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// async function apiCall<T>(method: string, endpoint: string, data?: any): Promise<T> {
//   const response = await axios({
//     method,
//     url: `${API_BASE}${endpoint}`,
//     data,
//     withCredentials: true,
//     headers: { 'Content-Type': 'application/json' },
//   });
//   return response.data;
// }

// async function apiCallFormData<T>(endpoint: string, formData: FormData): Promise<T> {
//   const response = await axios.post(`${API_BASE}${endpoint}`, formData, {
//     withCredentials: true,
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });
//   return response.data;
// }

// const fileApi = {
//   upload: (projectId: number, file: File, fileType: string) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     return apiCallFormData(`/api/file/upload/${projectId}?fileType=${fileType}`, formData);
//   },
//   getByProject: (projectId: number) => apiCall<{ success: boolean; data: FileItem[] }>('GET', `/api/file/project/${projectId}`),
//   getMyUploads: () => apiCall<{ success: boolean; data: FileItem[] }>('GET', '/api/file/my-uploads'),
//   delete: (fileId: number) => apiCall('DELETE', `/api/file/delete/${fileId}`),
//   getAccessToken: (fileId: number) => apiCall('POST', `/api/file/access-token/${fileId}`, {}),
// };

// const paymentApi = {
//   submitProjectPayment: (data: any) => apiCall('POST', '/api/payment/project', data),
//   getProjectPaymentSummary: (projectId: number) => apiCall<{ success: boolean; data: PaymentSummary }>('GET', `/api/payment/project/${projectId}`),
//   getAllPayments: () => apiCall<{ success: boolean; data: PaymentRecord[] }>('GET', '/api/payment/all'),
// };

// const clientApi = {
//   apply: (data: any) => apiCall('POST', '/api/client/apply', data),
//   getMyDetails: () => apiCall('GET', '/api/client/my-details'),
//   update: (data: any) => apiCall('PUT', '/api/client/update', data),
// };

// const projectApi = {
//   create: (data: any) => apiCall('POST', '/api/project/create', data),
//   update: (projectId: number, data: any) => apiCall('PUT', `/api/project/update/${projectId}`, data),
//   delete: (projectId: number) => apiCall('DELETE', `/api/project/delete/${projectId}`),
//   getMyProjects: () => apiCall<{ success: boolean; message: string; data: Project[] }>('GET', '/api/project/my-projects'),
//   getHistory: (projectId: number) => apiCall('GET', `/api/project/${projectId}/history`),
// };

// const userApi = {
//   getProfile: () => apiCall('GET', '/api/users/profile'),
//   updateProfile: (data: any) => apiCall('PUT', '/api/users/profile', data),
// };

// const departmentApi = {
//   getAll: () => apiCall('GET', '/api/department'),
// };

// // ============================================
// // SIDEBAR MENU ITEMS
// // ============================================

// const menuItems = [
//   { id: 'dashboard', label: 'Dashboard', icon: '📊' },
//   { id: 'projects', label: 'My Projects', icon: '📁' },
//   { id: 'uploads', label: 'My Uploads', icon: '📤' },
//   { id: 'company', label: 'Company Details', icon: '🏢' },
//   { id: 'profile', label: 'Profile', icon: '👤' },
//   { id: 'payments', label: 'Payments', icon: '💰' },
// ];

// // ============================================
// // PAYMENT MODAL COMPONENT
// // ============================================

// const PaymentModal: React.FC<{
//   project: Project | null;
//   onClose: () => void;
//   onPaymentSuccess: () => void;
// }> = ({ project, onClose, onPaymentSuccess }) => {
//   const [step, setStep] = useState<'qr' | 'form'>('qr');
//   const [transactionId, setTransactionId] = useState('');
//   const [amount, setAmount] = useState('');
//   const [paymentNote, setPaymentNote] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const qrCodeUrl = "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=upi://pay?pa=company@upi&pn=Gaurion&am=0&cu=INR";

//   const handleSubmitPayment = async () => {
//     if (!project) return;
//     if (!transactionId.trim()) { setError('Please enter Transaction ID'); return; }
//     if (!amount.trim() || parseFloat(amount) <= 0) { setError('Please enter a valid amount'); return; }

//     setSubmitting(true);
//     setError('');

//     try {
//       await paymentApi.submitProjectPayment({
//         transactionId: transactionId.trim(),
//         amount: amount.trim(),
//         paymentNote: paymentNote.trim() || `Payment for ${project.projectName}`,
//         projectId: project.projectId,
//       });
//       setSuccess('Payment submitted successfully! Waiting for approval.');
//       setTimeout(() => { onPaymentSuccess(); onClose(); }, 2000);
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Payment submission failed');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="modal-mask open">
//       <div className="modal-box">
//         <button className="m-close" onClick={onClose}>✕</button>
//         <h2>💳 Make Payment</h2>
//         <p>{project?.projectName}</p>
        
//         <div className="m-tabs">
//           <button className={`m-tab ${step === 'qr' ? 'active' : ''}`} onClick={() => setStep('qr')}>📱 Scan & Pay</button>
//           <button className={`m-tab ${step === 'form' ? 'active' : ''}`} onClick={() => setStep('form')}>✍️ Submit Details</button>
//         </div>

//         <div className="m-tab-content">
//           {step === 'qr' ? (
//             <div style={{ textAlign: 'center' }}>
//               <img src={qrCodeUrl} alt="QR Code" style={{ width: 200, height: 200, margin: '20px auto', borderRadius: '16px' }} />
//               <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>
//                 1. Scan QR with any UPI app<br />
//                 2. Enter amount and make payment<br />
//                 3. Click "Submit Details" to confirm
//               </p>
//               <button className="btn-primary" onClick={() => setStep('form')}>Next: Submit Details →</button>
//             </div>
//           ) : (
//             <div className="m-form">
//               <input type="text" placeholder="Transaction ID *" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
//               <input type="number" placeholder="Amount (INR) *" value={amount} onChange={(e) => setAmount(e.target.value)} />
//               <textarea placeholder="Payment Note" rows={2} value={paymentNote} onChange={(e) => setPaymentNote(e.target.value)} />
//               {error && <div className="error-msg">{error}</div>}
//               {success && <div className="success-msg">{success}</div>}
//               <button className="btn-msub" onClick={handleSubmitPayment} disabled={submitting}>
//                 {submitting ? 'Submitting...' : 'Submit Payment'}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================
// // MAIN CLIENT COMPONENT
// // ============================================

// const Client: React.FC = () => {
//   const [activeNav, setActiveNav] = useState('dashboard');
//   const [loading, setLoading] = useState(true);
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [clientDetails, setClientDetails] = useState<ClientDetails | null>(null);
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [myUploads, setMyUploads] = useState<FileItem[]>([]);
//   const [allPayments, setAllPayments] = useState<PaymentRecord[]>([]);
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
//   const [projectHistory, setProjectHistory] = useState<ProjectHistory[]>([]);
//   const [projectFiles, setProjectFiles] = useState<FileItem[]>([]);
//   const [showProjectModal, setShowProjectModal] = useState(false);
//   const [editingProject, setEditingProject] = useState<Project | null>(null);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [showClientEditModal, setShowClientEditModal] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [activeModalTab, setActiveModalTab] = useState('overview');
//   const [uploadingFile, setUploadingFile] = useState(false);
//   const [deletingFile, setDeletingFile] = useState<number | null>(null);
//   const [departments, setDepartments] = useState<Department[]>([]);
//   const [loadingDepartments, setLoadingDepartments] = useState(false);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [selectedPaymentProject, setSelectedPaymentProject] = useState<Project | null>(null);
//   const [paymentRefreshTrigger, setPaymentRefreshTrigger] = useState(0);
//   const [projectFilter, setProjectFilter] = useState<'all' | 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED'>('all');
//   const [paymentSummaries, setPaymentSummaries] = useState<Map<number, PaymentSummary>>(new Map());
  
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const fileTypeSelectRef = useRef<HTMLSelectElement>(null);
//   const { logout } = useAuth();

//   // DIRECT CHECK - Client approval status from API response
//   // isApproved can be 'APPROVED', 'PENDING', or 'REJECTED'
//   const isClientApproved = clientDetails?.isApproved === 'APPROVED'||clientDetails?.isApproved === true;

//   const isClientPending = clientDetails?.isApproved === 'PENDING'||clientDetails?.isApproved === false;
//   const isClientRejected = clientDetails?.isApproved === 'REJECTED'||clientDetails?.isApproved === false;

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme === 'dark') {
//       setDarkMode(true);
//       document.documentElement.setAttribute('data-theme', 'dark');
//     }
//     loadDashboardData();
//     loadDepartments();
//   }, []);

//   useEffect(() => {
//     if (projects.length > 0) {
//       loadAllPaymentSummaries();
//       loadAllPayments();
//     }
//   }, [projects, paymentRefreshTrigger]);

//   const loadDepartments = async () => {
//     setLoadingDepartments(true);
//     try {
//       const response = await departmentApi.getAll();
//       if (response.success && response.data) setDepartments(response.data);
//     } catch (error) {
//       // Silent fail
//     } finally {
//       setLoadingDepartments(false);
//     }
//   };

//   const loadDashboardData = async () => {
//     setLoading(true);
//     try {
//       const [profileRes, clientRes, projectsRes, uploadsRes] = await Promise.all([
//         userApi.getProfile(),
//         clientApi.getMyDetails(),
//         projectApi.getMyProjects(),
//         fileApi.getMyUploads(),
//       ]);
//       setUser(profileRes.data);
//       setClientDetails(clientRes.data);
//       setProjects(projectsRes.data || []);
//       setMyUploads(uploadsRes.data || []);
      
//       // Debug log to check approval status
//       console.log('🔍 Client Approval Debug:', {
//         isApproved: clientRes.data?.isApproved,
//         isApprovedType: typeof clientRes.data?.isApproved,
//         companyName: clientRes.data?.companyName,
//         isApprovedStrict: clientRes.data?.isApproved === 'APPROVED'
//       });
//     } catch (error) {
//       console.error('Error loading dashboard:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadAllPayments = async () => {
//     try {
//       const res = await paymentApi.getAllPayments();
//       if (res.success && res.data) {
//         setAllPayments(res.data);
//       }
//     } catch (error) {
//       setAllPayments([]);
//     }
//   };

//   const loadAllPaymentSummaries = async () => {
//     const summaries = new Map<number, PaymentSummary>();
//     for (const project of projects) {
//       if (project.cost && parseFloat(project.cost) > 0) {
//         try {
//           const res = await paymentApi.getProjectPaymentSummary(project.projectId);
//           if (res.success && res.data) {
//             summaries.set(project.projectId, res.data);
//           }
//         } catch (error) {
//           // Silent fail
//         }
//       }
//     }
//     setPaymentSummaries(summaries);
//   };

//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
//     localStorage.setItem('theme', newMode ? 'dark' : 'light');
//   };

//   const handleCreateProject = async (data: any) => {
//     if (!isClientApproved) { 
//       alert('Your company must be approved first. Current status: ' + clientDetails?.isApproved); 
//       return; 
//     }
//     try {
//       setLoadingDepartments(true);
//       const response = await projectApi.create(data);
//       if (response.success) {
//         await loadDashboardData();
//         setShowProjectModal(false);
//         alert('Project created successfully!');
//       }
//     } catch (error) {
//       alert('Failed to create project');
//     } finally {
//       setLoadingDepartments(false);
//     }
//   };

//   const handleUpdateProject = async (data: any) => {
//     if (!isClientApproved) { 
//       alert('Your company must be approved first'); 
//       return; 
//     }
//     if (!editingProject) return;
//     try {
//       const response = await projectApi.update(editingProject.projectId, data);
//       if (response.success) {
//         await loadDashboardData();
//         setShowProjectModal(false);
//         setEditingProject(null);
//         alert('Project updated successfully!');
//       }
//     } catch (error) {
//       alert('Failed to update project');
//     }
//   };

//   const handleDeleteProject = async (projectId: number) => {
//     if (!isClientApproved) { 
//       alert('Your company must be approved first'); 
//       return; 
//     }
//     if (!confirm('Are you sure?')) return;
//     try {
//       await projectApi.delete(projectId);
//       await loadDashboardData();
//       if (selectedProjectId === projectId) {
//         setSelectedProjectId(null);
//         setSelectedProject(null);
//       }
//       alert('Project deleted successfully!');
//     } catch (error) {
//       alert('Failed to delete project');
//     }
//   };

//   const handleViewProject = async (project: Project) => {
//     setSelectedProject(project);
//     setActiveModalTab('overview');
//     try {
//       const [historyRes, filesRes] = await Promise.all([
//         projectApi.getHistory(project.projectId),
//         fileApi.getByProject(project.projectId),
//       ]);
//       setProjectHistory(historyRes.data || []);
//       setProjectFiles(filesRes.data || []);
//     } catch (error) {
//       // Silent fail
//     }
//   };

//   const handleProjectSelect = (projectId: number | null) => {
//     setSelectedProjectId(projectId);
//     if (projectId) {
//       const project = projects.find(p => p.projectId === projectId);
//       if (project) handleViewProject(project);
//     } else {
//       setSelectedProject(null);
//       setProjectHistory([]);
//       setProjectFiles([]);
//     }
//   };

//   const handleOpenPaymentModal = (project: Project) => {
//     if (!isClientApproved) { 
//       alert('Company must be approved to make payments. Current status: ' + clientDetails?.isApproved); 
//       return; 
//     }
//     if (project.status === 'PENDING') { 
//       alert('Project pending approval. Wait for director approval.'); 
//       return; 
//     }
//     setSelectedPaymentProject(project);
//     setShowPaymentModal(true);
//   };

//   const handlePaymentSuccess = () => {
//     setPaymentRefreshTrigger(prev => prev + 1);
//   };

//   const handleFileUpload = async () => {
//     if (!selectedProject || !isClientApproved) return;
//     if (!fileInputRef.current?.files?.length) { alert('Select a file'); return; }
    
//     const file = fileInputRef.current.files[0];
//     const fileType = fileTypeSelectRef.current?.value || 'Document';
    
//     setUploadingFile(true);
//     try {
//       await fileApi.upload(selectedProject.projectId, file, fileType);
//       const filesRes = await fileApi.getByProject(selectedProject.projectId);
//       setProjectFiles(filesRes.data || []);
//       const uploadsRes = await fileApi.getMyUploads();
//       setMyUploads(uploadsRes.data || []);
//       if (fileInputRef.current) fileInputRef.current.value = '';
//       alert('File uploaded successfully!');
//     } catch (error) {
//       alert('Upload failed');
//     } finally {
//       setUploadingFile(false);
//     }
//   };

//   const handleFileView = async (fileId: number) => {
//     try {
//       const tokenRes = await fileApi.getAccessToken(fileId);
//       if (tokenRes.success && tokenRes.data) {
//         window.open(`${API_BASE}${tokenRes.data.secureUrl}`, '_blank');
//       } else {
//         alert('Cannot view file');
//       }
//     } catch (error) {
//       alert('Cannot view file');
//     }
//   };

//   const handleFileDownload = async (fileId: number) => {
//     try {
//       const tokenRes = await fileApi.getAccessToken(fileId);
//       if (tokenRes.success && tokenRes.data) {
//         window.open(`${API_BASE}${tokenRes.data.downloadUrl}`, '_blank');
//       } else {
//         alert('Cannot download file');
//       }
//     } catch (error) {
//       alert('Download failed');
//     }
//   };

//   const handleFileDelete = async (fileId: number) => {
//     if (!confirm('Delete this file?')) return;
//     setDeletingFile(fileId);
//     try {
//       await fileApi.delete(fileId);
//       if (selectedProject) {
//         const filesRes = await fileApi.getByProject(selectedProject.projectId);
//         setProjectFiles(filesRes.data || []);
//       }
//       const uploadsRes = await fileApi.getMyUploads();
//       setMyUploads(uploadsRes.data || []);
//       alert('File deleted successfully!');
//     } catch (error) {
//       alert('Delete failed');
//     } finally {
//       setDeletingFile(null);
//     }
//   };

//   const handleUpdateProfile = async (data: any) => {
//     try {
//       await userApi.updateProfile(data);
//       const profileRes = await userApi.getProfile();
//       setUser(profileRes.data);
//       setShowProfileModal(false);
//       alert('Profile updated!');
//     } catch (error) {
//       alert('Update failed');
//     }
//   };

//   const handleUpdateClient = async (data: any) => {
//     try {
//       await clientApi.update(data);
//       const clientRes = await clientApi.getMyDetails();
//       setClientDetails(clientRes.data);
//       setShowClientEditModal(false);
//       alert('Company details updated!');
//     } catch (error) {
//       alert('Update failed');
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//     } catch (error) {
//       // Silent fail
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     const config: Record<string, { class: string; label: string }> = {
//       PENDING: { class: 'status-pending', label: '⏳ Pending' },
//       APPROVED: { class: 'status-approved', label: '✅ Approved' },
//       REJECTED: { class: 'status-rejected', label: '❌ Rejected' },
//       ASSIGNED: { class: 'status-assigned', label: '👥 Assigned' },
//       IN_PROGRESS: { class: 'status-progress', label: '🔄 In Progress' },
//       COMPLETED: { class: 'status-completed', label: '✅ Completed' },
//     };
//     const c = config[status] || { class: 'status-pending', label: status };
//     return <span className={`status-badge ${c.class}`}>{c.label}</span>;
//   };

//   const getPaymentStatusBadge = (status: string) => {
//     if (status === 'APPROVED') return <span className="status-badge status-approved">✅ Approved</span>;
//     if (status === 'REJECTED') return <span className="status-badge status-rejected">❌ Rejected</span>;
//     return <span className="status-badge status-pending">⏳ Pending</span>;
//   };

//   const filteredProjects = projectFilter === 'all' ? projects : projects.filter(p => p.status === projectFilter);

//   // Group uploads by project for folder view
//   const uploadsByProject = React.useMemo(() => {
//     const grouped: { [key: string]: { project: Project | undefined; files: FileItem[] } } = {};
    
//     myUploads.forEach(file => {
//       const project = projects.find(p => 
//         file.fileLink?.includes(`project_${p.projectId}`) || 
//         file.departmentId === p.departmentId
//       );
      
//       const projectId = project ? project.projectId.toString() : 'unknown';
      
//       if (!grouped[projectId]) {
//         grouped[projectId] = { project, files: [] };
//       }
//       grouped[projectId].files.push(file);
//     });
    
//     return grouped;
//   }, [myUploads, projects]);
//   console.log('📁 Uploads grouped by project:', uploadsByProject);

//   const getCommitHash = (statusId: any, index: number): string => {
//     if (!statusId) return `COMMIT-${String(index + 1).padStart(2, '0')}`;
//     const idString = String(statusId);
//     return idString.length > 8 ? idString.slice(-8) : idString.padStart(8, '0');
//   };

//   const formatRelativeTime = (dateTime: string): string => {
//     try {
//       const date = new Date(dateTime);
//       const now = new Date();
//       const diffMins = Math.floor((now.getTime() - date.getTime()) / 60000);
//       if (diffMins < 1) return 'just now';
//       if (diffMins < 60) return `${diffMins}m ago`;
//       if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
//       return `${Math.floor(diffMins / 1440)}d ago`;
//     } catch {
//       return 'unknown';
//     }
//   };

//   const formatDeadline = (deadline: string): string => {
//     try {
//       const diffDays = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
//       if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} days`;
//       if (diffDays === 0) return 'Due today';
//       return `Due in ${diffDays} days`;
//     } catch {
//       return 'No deadline';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="client-loader">
//         <div className="loader-spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="client-container">
//       <div className={`client-sidebar ${mobileSidebarOpen ? 'open' : ''}`}>
//         <CommonSidebar
//           activeNav={activeNav}
//           setActiveNav={setActiveNav}
//           onLogout={handleLogout}
//           onThemeToggle={toggleDarkMode}
//           darkMode={darkMode}
//           user={user ? { name: user.name, email: user.email, photoUrl: user.photoUrl } : null}
//           menuItems={menuItems}
//           title="Client Portal"
//           logoIcon="🚀"
//           isOpen={mobileSidebarOpen}
//           onClose={() => setMobileSidebarOpen(false)}
//         />
//       </div>

//       <button className="mobile-menu-btn" onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>☰</button>

//       <main className="client-main">
//         {/* Company Approval Status Banner */}
//         {clientDetails && isClientPending && (
//           <div className="approval-banner pending">
//             <div className="banner-icon">⏳</div>
//             <div className="banner-content">
//               <h4>Company Registration Pending</h4>
//               <p>Your company registration is under review. You will be able to create projects, upload files, and make payments once approved.</p>
//             </div>
//           </div>
//         )}
        
//         {clientDetails && isClientRejected && (
//           <div className="approval-banner rejected">
//             <div className="banner-icon">❌</div>
//             <div className="banner-content">
//               <h4>Company Registration Rejected</h4>
//               <p>{clientDetails.rejectionReason || 'Your company registration has been rejected. Please contact support.'}</p>
//             </div>
//           </div>
//         )}

//         {clientDetails && isClientApproved && (
//           <div className="approval-banner approved">
//             <div className="banner-icon">✅</div>
//             <div className="banner-content">
//               <h4>Company Verified</h4>
//               <p>Your company has been approved. You can now create projects, upload files, and make payments.</p>
//             </div>
//           </div>
//         )}

//         {selectedProjectId && selectedProject && (
//           <div className="project-context-banner">
//             <div className="context-info">
//               <span className="context-icon">📌</span>
//               <span className="context-text">Current Project: <strong>{selectedProject.projectName}</strong></span>
//               <span className={`context-status status-${selectedProject.status?.toLowerCase()}`}>
//                 {selectedProject.status === 'PENDING' ? '⏳ Pending' : 
//                  selectedProject.status === 'ASSIGNED' ? '👥 Assigned' :
//                  selectedProject.status === 'IN_PROGRESS' ? '🔄 In Progress' : '✅ Completed'}
//               </span>
//               {selectedProject.cost && <span className="context-cost">💰 ₹{parseFloat(selectedProject.cost).toLocaleString()}</span>}
//             </div>
//             <button className="context-clear" onClick={() => handleProjectSelect(null)}>✕ Clear</button>
//           </div>
//         )}

//         <header className="client-header">
//           <div className="header-welcome">
//             <h1>Welcome back, {user?.name?.split(' ')[0] || 'User'}!</h1>
//             <p>Manage your projects and account settings</p>
//           </div>
//           <div className="header-stats">
//             <div className="header-stat-item">
//               <span className="stat-label">Company</span>
//               <span className="stat-value-sm">{clientDetails?.companyName || 'N/A'}</span>
//             </div>
//             <div className="header-stat-item">
//               <span className="stat-label">Status</span>
//               {getStatusBadge(clientDetails?.isApproved || 'PENDING')}
//             </div>
//             <div className="header-stat-item">
//               <span className="stat-label">Member Since</span>
//               <span className="stat-value-sm">{clientDetails?.createdAt ? new Date(clientDetails.createdAt).toLocaleDateString() : 'N/A'}</span>
//             </div>
//           </div>
//         </header>

//         {activeNav === 'dashboard' && (
//           <>
//             <div className="stats-grid">
//               <div className="stat-card">
//                 <div className="stat-icon blue">📊</div>
//                 <div className="stat-info">
//                   <span className="stat-value">{projects.length}</span>
//                   <span className="stat-label">Total Projects</span>
//                 </div>
//               </div>
//               <div className="stat-card">
//                 <div className="stat-icon green">✅</div>
//                 <div className="stat-info">
//                   <span className="stat-value">{projects.filter(p => p.status === 'COMPLETED').length}</span>
//                   <span className="stat-label">Completed</span>
//                 </div>
//               </div>
//               <div className="stat-card">
//                 <div className="stat-icon orange">🔄</div>
//                 <div className="stat-info">
//                   <span className="stat-value">{projects.filter(p => p.status === 'IN_PROGRESS').length}</span>
//                   <span className="stat-label">In Progress</span>
//                 </div>
//               </div>
//               <div className="stat-card">
//                 <div className="stat-icon purple">📎</div>
//                 <div className="stat-info">
//                   <span className="stat-value">{myUploads.length}</span>
//                   <span className="stat-label">Files Uploaded</span>
//                 </div>
//               </div>
//             </div>

//             <div className="dashboard-card">
//               <div className="card-header">
//                 <h2>Recent Projects</h2>
//                 <button 
//                   className="btn-primary" 
//                   onClick={() => setShowProjectModal(true)} 
//                   disabled={!isClientApproved}
//                   title={!isClientApproved ? `Company not approved. Current status: ${clientDetails?.isApproved}` : ""}
//                 >
//                   + New Project
//                 </button>
//               </div>
//               <div className="projects-grid">
//                 {projects.slice(0, 3).map(project => (
//                   <div key={project.projectId} className="card">
//                     <div className="project-card-header">
//                       <h3>{project.projectName}</h3>
//                       {getStatusBadge(project.status)}
//                     </div>
//                     <p className="project-card-desc">{project.projectDescription.substring(0, 80)}...</p>
//                     <div className="project-card-meta">
//                       <span>📱 {project.projectType}</span>
//                       <span>🏢 {project.departmentName}</span>
//                       {project.cost && <span>💰 ₹{parseFloat(project.cost).toLocaleString()}</span>}
//                     </div>
//                     {project.status === 'PENDING' && <div className="pending-warning">⏳ Wait for Approval from Director</div>}
//                     <div className="project-card-actions">
//                       <button className="btn-sm btn-primary" onClick={() => handleViewProject(project)}>View Details</button>
//                       <button 
//                         className="btn-sm btn-outline" 
//                         onClick={() => { setEditingProject(project); setShowProjectModal(true); }} 
//                         disabled={!isClientApproved || project.status === 'PENDING'}
//                       >Edit</button>
//                       <button 
//                         className="btn-sm btn-danger" 
//                         onClick={() => handleDeleteProject(project.projectId)} 
//                         disabled={!isClientApproved || project.status === 'PENDING'}
//                       >Delete</button>
//                       <button 
//                         className="btn-sm btn-payment" 
//                         onClick={() => handleOpenPaymentModal(project)} 
//                         disabled={!isClientApproved || project.status === 'PENDING'}
//                       >💳 Pay</button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               {projects.length === 0 && (
//                 <div className="empty-state">
//                   <span className="empty-icon">📂</span>
//                   <p>No projects yet. Create your first project!</p>
//                 </div>
//               )}
//               {projects.length > 3 && (
//                 <button className="view-all-link" onClick={() => setActiveNav('projects')}>View All Projects →</button>
//               )}
//             </div>
//           </>
//         )}

//         {activeNav === 'projects' && (
//           <div className="dashboard-card full-width">
//             <div className="card-header">
//               <h2>My Projects</h2>
//               <div className="header-actions">
//                 <select className="filter-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value as any)}>
//                   <option value="all">All Projects</option>
//                   <option value="PENDING">⏳ Pending</option>
//                   <option value="ASSIGNED">👥 Assigned</option>
//                   <option value="IN_PROGRESS">🔄 In Progress</option>
//                   <option value="COMPLETED">✅ Completed</option>
//                 </select>
//                 <button 
//                   className="btn-primary" 
//                   onClick={() => setShowProjectModal(true)} 
//                   disabled={!isClientApproved}
//                   title={!isClientApproved ? `Company not approved. Current status: ${clientDetails?.isApproved}` : ""}
//                 >+ New Project</button>
//               </div>
//             </div>
//             <div className="projects-grid">
//               {filteredProjects.map(project => (
//                 <div key={project.projectId} className="card">
//                   <div className="project-card-header">
//                     <h3>{project.projectName}</h3>
//                     {getStatusBadge(project.status)}
//                   </div>
//                   <p className="project-card-desc">{project.projectDescription.substring(0, 100)}...</p>
//                   <div className="project-card-meta">
//                     <span>📱 {project.projectType}</span>
//                     <span>🏢 {project.departmentName}</span>
//                     {project.cost && <span>💰 ₹{parseFloat(project.cost).toLocaleString()}</span>}
//                     {project.deadline && <span>📅 Due: {new Date(project.deadline).toLocaleDateString()}</span>}
//                   </div>
//                   {project.assignedManagerName && <div className="project-card-manager">👔 Manager: {project.assignedManagerName}</div>}
//                   {project.status === 'PENDING' && <div className="pending-warning">⏳ Wait for Approval from Director</div>}
//                   <div className="project-card-actions">
//                     <button className="btn-sm btn-primary" onClick={() => handleViewProject(project)}>View</button>
//                     <button 
//                       className="btn-sm btn-outline" 
//                       onClick={() => { setEditingProject(project); setShowProjectModal(true); }} 
//                       disabled={!isClientApproved || project.status === 'PENDING'}
//                     >Edit</button>
//                     <button 
//                       className="btn-sm btn-danger" 
//                       onClick={() => handleDeleteProject(project.projectId)} 
//                       disabled={!isClientApproved || project.status === 'PENDING'}
//                     >Delete</button>
//                     <button 
//                       className="btn-sm btn-payment" 
//                       onClick={() => handleOpenPaymentModal(project)} 
//                       disabled={!isClientApproved || project.status === 'PENDING'}
//                     >💳 Pay</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             {filteredProjects.length === 0 && (
//               <div className="empty-state"><span className="empty-icon">📂</span><p>No projects found in this category.</p></div>
//             )}
//           </div>
//         )}

//         {/* MY UPLOADS - Project Wise Folder Design */}
//         {activeNav === 'uploads' && (
//           <div className="dashboard-card full-width">
//             <div className="uploads-header">
//               <div className="uploads-title">
//                 <span className="uploads-icon">📁</span>
//                 <h2>My Uploads</h2>
//               </div>
//               <p className="uploads-subtitle">Files organized by project</p>
//             </div>

//             {Object.keys(uploadsByProject).length === 0 ? (
//               <div className="empty-state">
//                 <span className="empty-icon">📤</span>
//                 <p>No files uploaded yet. Upload files from your project details.</p>
//               </div>
//             ) : (
//               <div className="project-folders-grid">
//                 {Object.entries(uploadsByProject).map(([projectId, { project, files }]) => (
//                   <div key={projectId} className="project-folder-card">
//                     <div className="folder-header">
//                       <div className="folder-icon">📂</div>
//                       <div className="folder-info">
//                         <h3>{project?.projectName || 'Unknown Project'}</h3>
//                         <div className="folder-stats">
//                           <span className="file-count">{files.length} files</span>
//                           {project && getStatusBadge(project.status)}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="folder-files-list">
//                       {files.map(file => (
//                         <div key={file.fileId} className="folder-file-item">
//                           <div className="file-type-icon">
//                             {file.fileType === 'Image' ? '🖼️' : 
//                              file.fileType === 'Code' ? '💻' : 
//                              file.fileType === 'PDF' ? '📕' : '📄'}
//                           </div>
//                           <div className="file-details">
//                             <div className="file-name">{file.fileLink.split('/').pop()}</div>
//                             <div className="file-meta-info">
//                               <span className="file-badge">{file.fileType}</span>
//                               <span>📤 {file.uploaderName}</span>
//                               <span>📅 {new Date(file.uploadTime).toLocaleDateString()}</span>
//                             </div>
//                           </div>
//                           <div className="file-actions-folder">
//                             <button className="icon-btn view" onClick={() => handleFileView(file.fileId)} title="View">👁️</button>
//                             <button className="icon-btn download" onClick={() => handleFileDownload(file.fileId)} title="Download">📥</button>
//                             <button className="icon-btn delete" onClick={() => handleFileDelete(file.fileId)} disabled={deletingFile === file.fileId} title="Delete">
//                               {deletingFile === file.fileId ? '⏳' : '🗑️'}
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {activeNav === 'company' && (
//           <div className="dashboard-card full-width">
//             <div className="card-header">
//               <h2>Company Details</h2>
//               <button className="btn-outline" onClick={() => setShowClientEditModal(true)}>✏️ Edit</button>
//             </div>
//             <div className="details-grid">
//               <div className="detail-item"><label>Company Name</label><span>{clientDetails?.companyName}</span></div>
//               <div className="detail-item"><label>Mobile Number</label><span>{clientDetails?.companyMobileNumber}</span></div>
//               <div className="detail-item"><label>Email</label><span>{clientDetails?.companyEmail}</span></div>
//               <div className="detail-item"><label>Organization Type</label><span>{clientDetails?.orgType}</span></div>
//               <div className="detail-item"><label>Client Type</label><span>{clientDetails?.clientType}</span></div>
//               <div className="detail-item"><label>Website</label><a href={clientDetails?.clientWebsite} target="_blank" rel="noopener noreferrer">{clientDetails?.clientWebsite}</a></div>
//               <div className="detail-item"><label>Status</label>{getStatusBadge(clientDetails?.isApproved || 'PENDING')}</div>
//               <div className="detail-item"><label>Member Since</label><span>{clientDetails?.createdAt && new Date(clientDetails.createdAt).toLocaleDateString()}</span></div>
//             </div>
//           </div>
//         )}

//         {activeNav === 'profile' && (
//           <div className="dashboard-card full-width">
//             <div className="card-header">
//               <h2>Profile Information</h2>
//               <button className="btn-outline" onClick={() => setShowProfileModal(true)}>✏️ Edit Profile</button>
//             </div>
//             <div className="profile-info">
//               <div className="profile-avatar-large">
//                 {user?.photoUrl ? <img src={user.photoUrl} alt={user.name} /> : <div className="avatar-placeholder">{user?.name?.charAt(0)}</div>}
//               </div>
//               <div className="profile-details">
//                 <div className="detail-item"><label>Full Name</label><span>{user?.name}</span></div>
//                 <div className="detail-item"><label>Email</label><span>{user?.email}</span></div>
//                 <div className="detail-item"><label>Phone</label><span>{user?.phoneNumber || 'Not provided'}</span></div>
//                 <div className="detail-item"><label>Address</label><span>{user?.address || 'Not provided'}</span></div>
//                 <div className="detail-item"><label>Gender</label><span>{user?.gender || 'Not provided'}</span></div>
//                 <div className="detail-item"><label>DOB</label><span>{user?.dob || 'Not provided'}</span></div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* PAYMENTS PAGE */}
//         {activeNav === 'payments' && (
//           <div className="dashboard-card full-width">
//             <div className="payments-page-header">
//               <div className="payments-title">
//                 <span className="payments-icon">💰</span>
//                 <h2>Payment Dashboard</h2>
//               </div>
//               <p className="payments-subtitle">Track all your transaction history and payment status</p>
//             </div>

//             <div className="payments-stats-grid">
//               <div className="payment-stat-card">
//                 <div className="stat-icon-small">💳</div>
//                 <div className="stat-info-small">
//                   <span className="stat-value-small">{allPayments.length}</span>
//                   <span className="stat-label-small">Total Transactions</span>
//                 </div>
//               </div>
//               <div className="payment-stat-card">
//                 <div className="stat-icon-small success">✅</div>
//                 <div className="stat-info-small">
//                   <span className="stat-value-small">{allPayments.filter(p => p.status === 'APPROVED').length}</span>
//                   <span className="stat-label-small">Approved</span>
//                 </div>
//               </div>
//               <div className="payment-stat-card">
//                 <div className="stat-icon-small warning">⏳</div>
//                 <div className="stat-info-small">
//                   <span className="stat-value-small">{allPayments.filter(p => p.status === 'PENDING').length}</span>
//                   <span className="stat-label-small">Pending</span>
//                 </div>
//               </div>
//               <div className="payment-stat-card">
//                 <div className="stat-icon-small danger">❌</div>
//                 <div className="stat-info-small">
//                   <span className="stat-value-small">{allPayments.filter(p => p.status === 'REJECTED').length}</span>
//                   <span className="stat-label-small">Rejected</span>
//                 </div>
//               </div>
//             </div>

//             <div className="payment-projects-section">
//               <h3 className="section-subtitle">📋 Project Payment Status</h3>
//               <div className="payment-projects-grid">
//                 {projects.filter(p => p.cost && parseFloat(p.cost) > 0).map(project => {
//                   const summary = paymentSummaries.get(project.projectId);
//                   const total = summary ? parseFloat(summary.totalProjectAmount) : parseFloat(project.cost || '0');
//                   const paid = summary ? parseFloat(summary.paidAmount) : 0;
//                   const remaining = total - paid;
//                   const percentage = total > 0 ? (paid / total) * 100 : 0;
                  
//                   return (
//                     <div key={project.projectId} className="payment-project-card">
//                       <div className="payment-project-header">
//                         <div>
//                           <h4>{project.projectName}</h4>
//                           <span className="project-type-badge">{project.projectType}</span>
//                         </div>
//                         {getStatusBadge(project.status)}
//                       </div>
                      
//                       <div className="payment-amount-section">
//                         <div className="amount-row">
//                           <span>Total Budget</span>
//                           <strong className="total-amount">₹{total.toLocaleString()}</strong>
//                         </div>
//                         <div className="amount-row paid">
//                           <span>Paid Amount</span>
//                           <strong className="paid-amount">₹{paid.toLocaleString()}</strong>
//                         </div>
//                         <div className="amount-row remaining">
//                           <span>Remaining</span>
//                           <strong className="remaining-amount">₹{remaining.toLocaleString()}</strong>
//                         </div>
//                       </div>
                      
//                       <div className="payment-progress-section">
//                         <div className="progress-bar-container">
//                           <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
//                         </div>
//                         <div className="progress-text">
//                           <span>{percentage.toFixed(1)}% Paid</span>
//                           {summary?.isFullyPaid && <span className="fully-paid-badge">✓ Fully Paid</span>}
//                         </div>
//                       </div>
                      
//                       {isClientApproved && project.status !== 'PENDING' && (
//                         <button className="make-payment-btn" onClick={() => handleOpenPaymentModal(project)}>
//                           💳 Make Payment
//                         </button>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//               {projects.filter(p => p.cost && parseFloat(p.cost) > 0).length === 0 && (
//                 <div className="empty-state"><span className="empty-icon">💰</span><p>No payment-enabled projects found. Create a project with a budget to get started.</p></div>
//               )}
//             </div>

//             <div className="transaction-history-section">
//               <h3 className="section-subtitle">📜 Transaction History</h3>
//               <div className="transactions-table-container">
//                 {allPayments.length === 0 ? (
//                   <div className="empty-state"><span className="empty-icon">📭</span><p>No transactions yet.</p></div>
//                 ) : (
//                   <table className="transactions-table">
//                     <thead>
//                       <tr>
//                         <th>Transaction ID</th>
//                         <th>Project</th>
//                         <th>Amount</th>
//                         <th>Date</th>
//                         <th>Status</th>
//                         <th>Note</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {allPayments.map(payment => {
//                         const project = projects.find(p => payment.paymentNote?.includes(p.projectName));
//                         return (
//                           <tr key={payment.paymentId}>
//                             <td className="txn-id">{payment.transactionId?.slice(0, 16) || 'N/A'}...</td>
//                             <td>{project?.projectName || '—'}</td>
//                             <td className="amount-cell">₹{parseFloat(payment.amount).toLocaleString()}</td>
//                             <td>{new Date(payment.dateTime).toLocaleDateString()}</td>
//                             <td>{getPaymentStatusBadge(payment.status)}</td>
//                             <td className="note-cell">{payment.paymentNote || '—'}</td>
//                            </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         <footer className="client-footer">
//           <p>© 2026 Gaurion Bharat | Developed by <a href='https://softmax.in' style={{ color: 'skyblue' }}>Softmax.in</a></p>
//         </footer>
//       </main>

//       {/* Payment Modal */}
//       {showPaymentModal && selectedPaymentProject && (
//         <PaymentModal project={selectedPaymentProject} onClose={() => { setShowPaymentModal(false); setSelectedPaymentProject(null); }} onPaymentSuccess={handlePaymentSuccess} />
//       )}

//       {/* Create/Edit Project Modal */}
//       {showProjectModal && (
//         <div className="modal-mask open">
//           <div className="modal-box">
//             <button className="m-close" onClick={() => { setShowProjectModal(false); setEditingProject(null); }}>✕</button>
//             <h2>{editingProject ? 'Edit Project' : 'Create Project'}</h2>
//             <form onSubmit={(e) => {
//               e.preventDefault();
//               const formData = new FormData(e.currentTarget);
//               const data: any = {
//                 projectName: formData.get('projectName'),
//                 projectDescription: formData.get('projectDescription'),
//                 projectType: formData.get('projectType'),
//                 departmentId: parseInt(formData.get('departmentId') as string),
//               };
//               const cost = formData.get('cost');
//               if (cost && cost.toString().trim()) data.cost = cost;
//               editingProject ? handleUpdateProject(data) : handleCreateProject(data);
//             }}>
//               <div className="m-form">
//                 <input name="projectName" placeholder="Project Name" defaultValue={editingProject?.projectName} required />
//                 <textarea name="projectDescription" placeholder="Description" rows={3} defaultValue={editingProject?.projectDescription} required />
//                 <input name="cost" placeholder="Project Budget (INR)" defaultValue={editingProject?.cost || ''} />
//                 <select name="projectType" defaultValue={editingProject?.projectType || 'Web Application'}>
//                   <option>Web Application</option><option>Mobile Application</option><option>Desktop Application</option>
//                   <option>Full Stack Application</option><option>API Development</option><option>AI / ML Project</option>
//                   <option>E-Commerce Website</option><option>Healthcare System</option>
//                 </select>
//                 <select name="departmentId" defaultValue={editingProject?.departmentId || ''} required disabled={loadingDepartments}>
//                   <option value="">{loadingDepartments ? 'Loading...' : 'Select Department'}</option>
//                   {departments.map(dept => <option key={dept.departmentId} value={dept.departmentId}>{dept.departmentName}</option>)}
//                 </select>
//                 <button type="submit" className="btn-msub" disabled={loadingDepartments}>
//                   {editingProject ? 'Update Project' : 'Create Project'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Edit Profile Modal */}
//       {showProfileModal && (
//         <div className="modal-mask open">
//           <div className="modal-box">
//             <button className="m-close" onClick={() => setShowProfileModal(false)}>✕</button>
//             <h2>Edit Profile</h2>
//             <form onSubmit={(e) => {
//               e.preventDefault();
//               const formData = new FormData(e.currentTarget);
//               handleUpdateProfile({ name: formData.get('name'), phoneNumber: formData.get('phoneNumber'), address: formData.get('address'), gender: formData.get('gender'), dob: formData.get('dob') });
//             }}>
//               <div className="m-form">
//                 <input name="name" placeholder="Name" defaultValue={user?.name} required />
//                 <input name="phoneNumber" placeholder="Phone Number" defaultValue={user?.phoneNumber} />
//                 <textarea name="address" placeholder="Address" rows={2} defaultValue={user?.address} />
//                 <select name="gender" defaultValue={user?.gender}><option value="">Select Gender</option><option>Male</option><option>Female</option><option>Other</option></select>
//                 <input name="dob" type="date" defaultValue={user?.dob} />
//                 <button type="submit" className="btn-msub">Save Changes</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Edit Client Modal */}
//       {showClientEditModal && (
//         <div className="modal-mask open">
//           <div className="modal-box">
//             <button className="m-close" onClick={() => setShowClientEditModal(false)}>✕</button>
//             <h2>Edit Company Details</h2>
//             <form onSubmit={(e) => {
//               e.preventDefault();
//               const formData = new FormData(e.currentTarget);
//               handleUpdateClient({
//                 companyName: formData.get('companyName'),
//                 companyMobileNumber: formData.get('companyMobileNumber'),
//                 companyEmail: formData.get('companyEmail'),
//                 orgType: formData.get('orgType'),
//                 clientType: formData.get('clientType'),
//                 clientWebsite: formData.get('clientWebsite'),
//               });
//             }}>
//               <div className="m-form">
//                 <input name="companyName" placeholder="Company Name" defaultValue={clientDetails?.companyName} required />
//                 <input name="companyMobileNumber" placeholder="Mobile Number" defaultValue={clientDetails?.companyMobileNumber} required />
//                 <input name="companyEmail" type="email" placeholder="Email" defaultValue={clientDetails?.companyEmail} required />
//                 <select name="orgType" defaultValue={clientDetails?.orgType}><option>Private Limited</option><option>Public Limited</option><option>LLP</option><option>Sole Proprietorship</option></select>
//                 <select name="clientType" defaultValue={clientDetails?.clientType}><option>Startup</option><option>SME</option><option>Enterprise</option><option>Enterprise Plus</option></select>
//                 <input name="clientWebsite" placeholder="Website URL" defaultValue={clientDetails?.clientWebsite} />
//                 <button type="submit" className="btn-msub">Save Changes</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Project Details Modal */}
//       {selectedProject && (
//         <div className="modal-mask open">
//           <div className="modal-box large">
//             <button className="m-close" onClick={() => setSelectedProject(null)}>✕</button>
//             <h2>{selectedProject.projectName}</h2>
//             <div className="m-tabs">
//               <button className={`m-tab ${activeModalTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveModalTab('overview')}>📋 Overview</button>
//               <button className={`m-tab ${activeModalTab === 'files' ? 'active' : ''}`} onClick={() => setActiveModalTab('files')}>📎 Files ({projectFiles.length})</button>
//               <button className={`m-tab ${activeModalTab === 'history' ? 'active' : ''}`} onClick={() => setActiveModalTab('history')}>📜 History</button>
//             </div>

//             {activeModalTab === 'overview' && (
//               <div className="m-tab-content">
//                 <div className="detail-row"><label>Status:</label>{getStatusBadge(selectedProject.status)}</div>
//                 <div className="detail-row"><label>Description:</label><p>{selectedProject.projectDescription}</p></div>
//                 <div className="detail-grid">
//                   <div><label>Type:</label> {selectedProject.projectType}</div>
//                   <div><label>Department:</label> {selectedProject.departmentName}</div>
//                   <div><label>Manager:</label> {selectedProject.assignedManagerName || 'Not assigned'}</div>
//                   {selectedProject.cost && <div><label>Budget:</label> ₹{parseFloat(selectedProject.cost).toLocaleString()}</div>}
//                   <div><label>Deadline:</label> {selectedProject.deadline ? new Date(selectedProject.deadline).toLocaleDateString() : 'Not set'}</div>
//                 </div>
//               </div>
//             )}

//             {activeModalTab === 'files' && (
//               <div className="m-tab-content">
//                 {isClientApproved && selectedProject.status !== 'PENDING' && (
//                   <div className="upload-section">
//                     <input type="file" ref={fileInputRef} />
//                     <select ref={fileTypeSelectRef} defaultValue="Document">
//                       <option>Document</option><option>Image</option><option>Code</option><option>PDF</option><option>Spreadsheet</option>
//                     </select>
//                     <button className="btn-primary" onClick={handleFileUpload} disabled={uploadingFile}>
//                       {uploadingFile ? 'Uploading...' : '📤 Upload File'}
//                     </button>
//                   </div>
//                 )}
                
//                 {projectFiles.length === 0 ? (
//                   <div className="empty-state"><span className="empty-icon">📁</span><p>No files uploaded yet.</p></div>
//                 ) : (
//                   <div className="files-list">
//                     {projectFiles.map(file => (
//                       <div key={file.fileId} className="file-item">
//                         <div className="file-icon">{file.fileType === 'Image' ? '🖼️' : file.fileType === 'Code' ? '💻' : '📄'}</div>
//                         <div className="file-info">
//                           <div className="file-name">{file.fileLink.split('/').pop()}</div>
//                           <div className="file-meta">
//                             <span className="file-type">{file.fileType}</span>
//                             <span>📤 {file.uploaderName}</span>
//                             <span>📅 {new Date(file.uploadTime).toLocaleString()}</span>
//                           </div>
//                         </div>
//                         <div className="file-actions">
//                           <button className="btn-icon" onClick={() => handleFileView(file.fileId)}>👁️ View</button>
//                           <button className="btn-icon" onClick={() => handleFileDownload(file.fileId)}>📥 Download</button>
//                           <button className="btn-icon danger" onClick={() => handleFileDelete(file.fileId)} disabled={deletingFile === file.fileId}>
//                             {deletingFile === file.fileId ? '⏳' : '🗑️'}
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {activeModalTab === 'history' && (
//               <div className="m-tab-content">
//                 {projectHistory.length === 0 ? (
//                   <div className="empty-state"><span className="empty-icon">📜</span><p>No history records found.</p></div>
//                 ) : (
//                   <div className="vscode-timeline">
//                     {[...projectHistory].reverse().map((entry, idx) => (
//                       <div key={idx} className="timeline-entry">
//                         <div className="timeline-line"><div className="timeline-dot"></div></div>
//                         <div className="timeline-content">
//                           <div className="commit-header">
//                             <span className="hash-text">{getCommitHash(entry.statusId, idx)}</span>
//                             <span className="branch-name">
//                               {entry.status === 'PENDING' ? 'main ⚡' : 
//                                entry.status === 'IN_PROGRESS' ? 'feature/in-progress' :
//                                entry.status === 'APPROVED' ? 'release/approved' :
//                                entry.status === 'REJECTED' ? 'hotfix/rejected' : 'main ✔️'}
//                             </span>
//                             <span className="date-text">{formatRelativeTime(entry.dateTime)}</span>
//                           </div>
//                           <div className="commit-title">
//                             {entry.status === 'PENDING' ? '⏳' : 
//                              entry.status === 'IN_PROGRESS' ? '🔄' :
//                              entry.status === 'APPROVED' ? '✅' :
//                              entry.status === 'REJECTED' ? '❌' : '🎉'} 
//                             {entry.status === 'PENDING' ? 'Pending approval' :
//                              entry.status === 'IN_PROGRESS' ? 'Work in progress' :
//                              entry.status === 'APPROVED' ? 'Changes approved' :
//                              entry.status === 'REJECTED' ? 'Changes rejected' : 'Task completed'}
//                           </div>
//                           {entry.managerNote && <div className="commit-description">{entry.managerNote}</div>}
//                           {entry.directorNote && <div className="commit-description director">{entry.directorNote}</div>}
//                           <div className="commit-meta">
//                             <span>👤 {entry.handledByName || 'Unknown'}</span>
//                             {entry.deadline && <span>📅 {formatDeadline(entry.deadline)}</span>}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .client-container { display: flex; min-height: 100vh; }
//         .client-sidebar { position: fixed; left: 0; top: 0; bottom: 0; width: 280px; z-index: 100; transition: transform 0.3s ease; }
//         .client-main { flex: 1; margin-left: 280px; padding: 24px 32px; min-height: 100vh; }
        
//         @media (max-width: 768px) {
//           .client-sidebar { transform: translateX(-100%); }
//           .client-sidebar.open { transform: translateX(0); }
//           .client-main { margin-left: 0; padding: 16px; }
//           .mobile-menu-btn { display: block; position: fixed; bottom: 20px; right: 20px; z-index: 101; background: var(--g-main); border: none; border-radius: 50%; width: 50px; height: 50px; font-size: 24px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
//         }
//         @media (min-width: 769px) { .mobile-menu-btn { display: none; } }
        
//         /* Approval Banners */
//         .approval-banner { border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; display: flex; gap: 16px; }
//         .approval-banner.pending { background: #fef3c7; border-left: 4px solid #f59e0b; }
//         .approval-banner.rejected { background: #fee2e2; border-left: 4px solid #ef4444; }
//         .approval-banner.approved { background: #d1fae5; border-left: 4px solid #10b981; }
//         .approval-banner h4 { margin: 0 0 4px; font-size: 16px; font-weight: 700; }
//         .approval-banner.pending h4 { color: #92400e; }
//         .approval-banner.rejected h4 { color: #991b1b; }
//         .approval-banner.approved h4 { color: #065f46; }
//         .approval-banner p { margin: 0; font-size: 13px; }
//         .approval-banner.pending p { color: #78350f; }
//         .approval-banner.rejected p { color: #7f1d1d; }
//         .approval-banner.approved p { color: #064e3b; }
        
//         .pending-warning { background: #fef3c7; padding: 8px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; color: #d97706; margin-bottom: 12px; }
        
//         .btn-payment { background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
//         .btn-payment:disabled { opacity: 0.5; cursor: not-allowed; }
        
//         /* Uploads Page - Folder/Project Wise Design */
//         .uploads-header { margin-bottom: 24px; }
//         .uploads-title { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
//         .uploads-icon { font-size: 32px; }
//         .uploads-header h2 { font-size: 24px; font-weight: 700; margin: 0; background: linear-gradient(135deg, #2ca6a4, #34a853); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
//         .uploads-subtitle { color: var(--muted); font-size: 14px; margin: 0; }
        
//         .project-folders-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 24px; }
//         @media (max-width: 640px) { .project-folders-grid { grid-template-columns: 1fr; } }
        
//         .project-folder-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 20px; overflow: hidden; transition: all 0.3s ease; }
//         .project-folder-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
        
//         .folder-header { display: flex; gap: 16px; padding: 16px 20px; background: linear-gradient(135deg, rgba(44, 166, 164, 0.08), transparent); border-bottom: 1px solid var(--border); }
//         .folder-icon { font-size: 40px; }
//         .folder-info { flex: 1; }
//         .folder-info h3 { font-size: 16px; font-weight: 700; margin: 0 0 6px 0; color: var(--text2); }
//         .folder-stats { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
//         .file-count { font-size: 12px; padding: 2px 8px; background: var(--surface); border-radius: 12px; color: var(--muted); }
        
//         .folder-files-list { padding: 8px 0; max-height: 300px; overflow-y: auto; }
//         .folder-files-list::-webkit-scrollbar { width: 4px; }
//         .folder-files-list::-webkit-scrollbar-track { background: var(--surface); }
//         .folder-files-list::-webkit-scrollbar-thumb { background: var(--teal); border-radius: 4px; }
        
//         .folder-file-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-bottom: 1px solid var(--border); transition: all 0.2s; }
//         .folder-file-item:hover { background: rgba(44, 166, 164, 0.05); }
        
//         .file-type-icon { font-size: 28px; }
//         .file-details { flex: 1; }
//         .file-name { font-weight: 600; font-size: 13px; margin-bottom: 4px; color: var(--text2); word-break: break-all; }
//         .file-meta-info { display: flex; gap: 12px; flex-wrap: wrap; font-size: 11px; color: var(--muted); }
//         .file-badge { padding: 2px 6px; background: rgba(44, 166, 164, 0.1); border-radius: 8px; color: var(--teal); }
        
//         .file-actions-folder { display: flex; gap: 6px; }
//         .icon-btn { width: 32px; height: 32px; border-radius: 8px; background: var(--surface); border: 1px solid var(--border); cursor: pointer; transition: all 0.2s; font-size: 14px; display: flex; align-items: center; justify-content: center; }
//         .icon-btn.view:hover { background: #3b82f6; border-color: #3b82f6; color: white; }
//         .icon-btn.download:hover { background: #10b981; border-color: #10b981; color: white; }
//         .icon-btn.delete:hover { background: #ef4444; border-color: #ef4444; color: white; }
//         .icon-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        
//         .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px; }
//         .stat-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 16px; }
//         .stat-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
//         .stat-icon.blue { background: rgba(31, 109, 168, 0.1); }
//         .stat-icon.green { background: rgba(52, 168, 83, 0.1); }
//         .stat-icon.orange { background: rgba(245, 124, 0, 0.1); }
//         .stat-icon.purple { background: rgba(106, 90, 205, 0.1); }
//         .stat-info .stat-value { font-size: 28px; font-weight: 800; line-height: 1; }
//         .stat-info .stat-label { font-size: 12px; color: var(--muted); }
        
//         .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
//         .card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; padding: 20px; transition: all 0.2s; }
//         .card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
//         .project-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px; }
//         .project-card-header h3 { font-size: 16px; font-weight: 700; margin: 0; }
//         .project-card-desc { font-size: 13px; color: var(--muted); line-height: 1.5; margin-bottom: 12px; }
//         .project-card-meta { display: flex; flex-wrap: wrap; gap: 12px; font-size: 11px; color: var(--muted); margin-bottom: 12px; }
//         .project-card-manager { font-size: 12px; color: #8b5cf6; margin-bottom: 16px; }
//         .project-card-actions { display: flex; gap: 8px; flex-wrap: wrap; }
        
//         .btn-sm { padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
//         .btn-sm:disabled { opacity: 0.5; cursor: not-allowed; }
//         .btn-primary { background: linear-gradient(135deg, #2ca6a4, #1a7a78); color: white; border: none; }
//         .btn-outline { background: transparent; border: 1px solid var(--border); }
//         .btn-danger { background: rgba(231, 76, 60, 0.1); color: #e74c3c; border: 1px solid #e74c3c; }
        
//         .dashboard-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 20px; padding: 24px; margin-bottom: 24px; }
//         .dashboard-card.full-width { width: 100%; }
//         .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 16px; }
//         .card-header h2 { font-size: 20px; font-weight: 700; margin: 0; }
//         .header-actions { display: flex; gap: 12px; align-items: center; }
//         .filter-select { padding: 8px 16px; border: 1px solid var(--border); border-radius: 10px; background: var(--card-bg); font-size: 13px; cursor: pointer; }
        
//         .file-item { display: flex; align-items: center; gap: 16px; padding: 12px; background: var(--surface); border-radius: 12px; border: 1px solid var(--border); margin-bottom: 8px; }
//         .file-icon { font-size: 28px; }
//         .file-info { flex: 1; }
//         .file-name { font-weight: 600; font-size: 14px; margin-bottom: 4px; }
//         .file-meta { display: flex; gap: 16px; font-size: 11px; color: var(--muted); flex-wrap: wrap; }
//         .file-actions { display: flex; gap: 8px; }
//         .btn-icon { padding: 6px 12px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; cursor: pointer; font-size: 12px; transition: all 0.2s; }
//         .btn-icon.danger:hover { background: #fee2e2; border-color: #ef4444; color: #ef4444; }
        
//         .upload-section { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
//         .upload-section input, .upload-section select { padding: 8px 12px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; }
        
//         .details-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
//         .detail-item { display: flex; flex-direction: column; gap: 4px; }
//         .detail-item label { font-size: 11px; font-weight: 600; text-transform: uppercase; color: var(--muted); }
//         .detail-item span, .detail-item a { font-size: 14px; font-weight: 500; color: var(--text2); }
        
//         .profile-info { display: flex; gap: 32px; flex-wrap: wrap; }
//         .profile-avatar-large { width: 100px; height: 100px; border-radius: 24px; background: linear-gradient(135deg, #2ca6a4, #34a853); display: flex; align-items: center; justify-content: center; overflow: hidden; }
//         .avatar-placeholder { font-size: 48px; font-weight: 700; color: white; }
//         .profile-details { flex: 1; display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
        
//         .client-footer { text-align: center; padding: 24px 0; margin-top: 32px; border-top: 1px solid var(--border); font-size: 13px; color: var(--muted); }
        
//         .modal-mask { display: flex; position: fixed; inset: 0; z-index: 2000; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(8px); align-items: center; justify-content: center; padding: 20px; }
//         .modal-box { background: var(--card-bg); border-radius: 24px; width: 100%; max-width: 500px; max-height: 90vh; overflow-y: auto; padding: 28px; position: relative; }
//         .modal-box.large { max-width: 700px; }
//         .m-close { position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border-radius: 50%; background: var(--surface); border: 1px solid var(--border); cursor: pointer; }
//         .m-tabs { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
//         .m-tab { padding: 8px 16px; background: var(--surface); border: none; border-radius: 40px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.2s; }
//         .m-tab.active { background: linear-gradient(135deg, #2ca6a4, #1a7a78); color: white; }
//         .m-form { display: flex; flex-direction: column; gap: 16px; }
//         .m-form input, .m-form textarea, .m-form select { padding: 12px 16px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; font-size: 14px; }
//         .btn-msub { padding: 14px; background: linear-gradient(135deg, #2ca6a4, #1a7a78); color: white; border: none; border-radius: 40px; font-weight: 700; cursor: pointer; }
//         .error-msg { color: #ef4444; font-size: 13px; padding: 8px; background: rgba(239,68,68,0.1); border-radius: 8px; }
//         .success-msg { color: #10b981; font-size: 13px; padding: 8px; background: rgba(16,185,129,0.1); border-radius: 8px; }
        
//         .detail-row { margin-bottom: 16px; }
//         .detail-row label { font-weight: 700; font-size: 12px; color: var(--muted); display: block; margin-bottom: 4px; }
//         .detail-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin-top: 16px; }
//         .detail-grid label { font-size: 11px; color: var(--muted); display: block; }
        
//         .files-list { display: flex; flex-direction: column; gap: 12px; }
        
//         .vscode-timeline { max-height: 500px; overflow-y: auto; }
//         .timeline-entry { display: flex; gap: 16px; margin-bottom: 20px; }
//         .timeline-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--teal); }
//         .commit-header { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; margin-bottom: 8px; }
//         .hash-text { font-family: monospace; font-size: 11px; background: var(--surface); padding: 2px 6px; border-radius: 4px; }
//         .branch-name { font-size: 11px; color: #8b5cf6; }
//         .date-text { font-size: 11px; color: var(--muted); }
//         .commit-title { font-weight: 700; font-size: 14px; margin-bottom: 4px; }
//         .commit-description { font-size: 12px; color: var(--muted); margin: 4px 0; padding: 4px 8px; background: var(--surface); border-radius: 8px; }
//         .commit-description.director { color: #8b5cf6; }
//         .commit-meta { display: flex; gap: 16px; font-size: 11px; color: var(--muted); margin-top: 8px; }
        
//         .status-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
//         .status-pending { background: rgba(245, 124, 0, 0.1); color: #f59e0b; }
//         .status-approved { background: rgba(52, 168, 83, 0.1); color: #10b981; }
//         .status-rejected { background: rgba(231, 76, 60, 0.1); color: #ef4444; }
//         .status-assigned { background: rgba(31, 109, 168, 0.1); color: #3b82f6; }
//         .status-progress { background: rgba(44, 166, 164, 0.1); color: #2ca6a4; }
//         .status-completed { background: rgba(52, 168, 83, 0.1); color: #22c55e; }
        
//         .empty-state { text-align: center; padding: 40px 20px; color: var(--muted); }
//         .empty-icon { font-size: 48px; display: block; margin-bottom: 16px; opacity: 0.5; }
        
//         .client-loader { display: flex; align-items: center; justify-content: center; min-height: 100vh; }
//         .loader-spinner { width: 40px; height: 40px; border: 3px solid var(--border); border-top-color: var(--teal); border-radius: 50%; animation: spin 0.8s linear infinite; }
//         @keyframes spin { to { transform: rotate(360deg); } }
        
//         .project-context-banner { display: flex; justify-content: space-between; align-items: center; background: #eff6ff; border: 1px solid #3b82f6; border-radius: 12px; padding: 12px 20px; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
//         .context-info { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; }
//         .context-cost { padding: 4px 12px; background: #d1fae5; color: #059669; border-radius: 20px; font-size: 12px; font-weight: 600; }
//         .context-clear { background: transparent; border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 14px; cursor: pointer; }
        
//         .client-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; flex-wrap: wrap; gap: 20px; }
//         .header-welcome h1 { font-size: 28px; font-weight: 700; margin: 0 0 4px; background: linear-gradient(135deg, #2ca6a4, #34a853); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
//         .header-stats { display: flex; gap: 24px; }
//         .header-stat-item { text-align: right; }
//         .header-stat-item .stat-label { font-size: 11px; text-transform: uppercase; font-weight: 600; color: var(--muted); display: block; }
//         .stat-value-sm { font-size: 14px; font-weight: 600; }
        
//         .view-all-link { margin-top: 20px; text-align: center; width: 100%; padding: 12px; background: transparent; border: none; color: var(--teal); font-weight: 600; cursor: pointer; }
        
//         /* Payments Page Styles */
//         .payments-page-header { margin-bottom: 24px; }
//         .payments-title { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
//         .payments-icon { font-size: 32px; }
//         .payments-page-header h2 { font-size: 24px; font-weight: 700; margin: 0; background: linear-gradient(135deg, #2ca6a4, #34a853); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
//         .payments-subtitle { color: var(--muted); font-size: 14px; margin: 0; }
        
//         .payments-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
//         @media (max-width: 640px) { .payments-stats-grid { grid-template-columns: repeat(2, 1fr); } }
        
//         .payment-stat-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; padding: 16px; display: flex; align-items: center; gap: 12px; transition: all 0.2s; }
//         .payment-stat-card:hover { transform: translateY(-2px); box-shadow: var(--shadow); }
//         .stat-icon-small { width: 48px; height: 48px; border-radius: 12px; background: rgba(44, 166, 164, 0.1); display: flex; align-items: center; justify-content: center; font-size: 24px; }
//         .stat-icon-small.success { background: rgba(52, 168, 83, 0.1); }
//         .stat-icon-small.warning { background: rgba(245, 124, 0, 0.1); }
//         .stat-icon-small.danger { background: rgba(231, 76, 60, 0.1); }
//         .stat-info-small { display: flex; flex-direction: column; }
//         .stat-value-small { font-size: 28px; font-weight: 800; line-height: 1; }
//         .stat-label-small { font-size: 12px; color: var(--muted); }
        
//         .section-subtitle { font-size: 18px; font-weight: 700; margin-bottom: 20px; color: var(--text2); }
        
//         .payment-projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px; margin-bottom: 40px; }
//         @media (max-width: 640px) { .payment-projects-grid { grid-template-columns: 1fr; } }
        
//         .payment-project-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 20px; padding: 20px; transition: all 0.2s; }
//         .payment-project-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
        
//         .payment-project-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; flex-wrap: wrap; gap: 8px; }
//         .payment-project-header h4 { font-size: 16px; font-weight: 700; margin: 0 0 4px 0; }
//         .project-type-badge { font-size: 11px; padding: 2px 8px; background: var(--surface); border-radius: 12px; color: var(--muted); }
        
//         .payment-amount-section { background: var(--surface); border-radius: 12px; padding: 12px; margin-bottom: 16px; }
//         .amount-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; }
//         .amount-row.paid { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
//         .total-amount { color: var(--text2); }
//         .paid-amount { color: #10b981; }
//         .remaining-amount { color: #f59e0b; }
        
//         .payment-progress-section { margin-bottom: 16px; }
//         .progress-bar-container { height: 8px; background: var(--border); border-radius: 4px; overflow: hidden; }
//         .progress-fill { height: 100%; background: linear-gradient(90deg, #2ca6a4, #34a853); border-radius: 4px; transition: width 0.3s ease; }
//         .progress-text { display: flex; justify-content: space-between; margin-top: 6px; font-size: 12px; color: var(--muted); }
//         .fully-paid-badge { color: #10b981; font-weight: 600; }
        
//         .make-payment-btn { width: 100%; padding: 10px; background: linear-gradient(135deg, #2ca6a4, #1a7a78); color: white; border: none; border-radius: 40px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
//         .make-payment-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(44, 166, 164, 0.3); }
        
//         .transactions-table-container { overflow-x: auto; border-radius: 16px; }
//         .transactions-table { width: 100%; border-collapse: collapse; }
//         .transactions-table th { text-align: left; padding: 12px; background: var(--surface); font-size: 12px; font-weight: 600; color: var(--muted); border-bottom: 1px solid var(--border); }
//         .transactions-table td { padding: 12px; border-bottom: 1px solid var(--border); font-size: 13px; }
//         .transactions-table tr:hover { background: rgba(44, 166, 164, 0.05); }
//         .txn-id { font-family: monospace; font-size: 12px; color: var(--teal); }
//         .amount-cell { font-weight: 600; }
//         .note-cell { max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--muted); }
//       `}</style>
//     </div>
//   );
// };

// export default Client;
