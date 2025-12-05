
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  Plus, Search, AlertTriangle, CheckCircle, XCircle, FileText, 
  Trash2, Upload, AlertOctagon, UserCircle, Download, X, Truck, MoreVertical, Edit,
  Clock, ArrowLeft, MessageSquare, Send, Calendar, Briefcase, Filter, ChevronDown, ChevronUp, User as UserIcon,
  Moon, Sun, PackagePlus, Paperclip, CornerDownLeft, FileSpreadsheet, Power,
  AlertCircle, ShoppingCart, Save, PackageCheck, Phone, KeyRound
} from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { MatchcodeInput } from './components/MatchcodeInput';
import { 
  User, Material, RequestItem, MaterialRequest, Movement, Supplier, Role, UserStatus, RequestStatus 
} from './types';
import { 
  MOCK_USERS, MOCK_MATERIALS, MOCK_REQUESTS, MOCK_MOVEMENTS, MOCK_SUPPLIERS 
} from './constants';

// Use direct path instead of module import for native environment compatibility
const logo = '/components/logo.png';

// --- Login Screen ---
const LoginScreen = ({ 
    onLogin, 
    isDarkMode, 
    toggleTheme, 
    error 
}: { 
    onLogin: (role: Role, email: string, password: string) => void, 
    isDarkMode: boolean, 
    toggleTheme: () => void,
    error: string | null 
}) => {
  const [selectedRole, setSelectedRole] = useState<Role>('ADMIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole, email, password);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-200">
      <div className="absolute top-4 right-4">
        <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden transition-colors duration-200 border border-gray-200 dark:border-gray-700">
        <div className="bg-white dark:bg-gray-800 p-8 text-center flex justify-center border-b border-gray-100 dark:border-gray-700">
            <img 
              src={logo} 
              alt="Amazonas Energia" 
              className="h-20 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Amazonas_Energia_logo.svg';
              }}
            />
        </div>
        <div className="px-8 pt-4 pb-2 text-center">
             <p className="text-gray-500 dark:text-gray-400">Controle de Estoque TI</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6 pt-4">
          
          {/* Error Alert */}
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg flex items-center text-sm animate-pulse">
                <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-amazonas-blue dark:text-gray-300 mb-1">Perfil de Acesso</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSelectedRole('ADMIN')}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  selectedRole === 'ADMIN'
                    ? 'border-amazonas-green bg-green-50 dark:bg-amazonas-green/20 text-amazonas-green dark:text-amazonas-green'
                    : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-800'
                }`}
              >
                Administrador
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('SOLICITANTE')}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  selectedRole === 'SOLICITANTE'
                    ? 'border-amazonas-green bg-green-50 dark:bg-amazonas-green/20 text-amazonas-green dark:text-amazonas-green'
                    : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-800'
                }`}
              >
                Solicitante
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-amazonas-blue dark:text-gray-300 mb-1">E-mail</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 border rounded-lg focus:ring-2 focus:ring-amazonas-green focus:border-transparent outline-none transition-colors"
              placeholder="seu.email@amazonas.com.br"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amazonas-blue dark:text-gray-300 mb-1">Senha</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 border rounded-lg focus:ring-2 focus:ring-amazonas-green focus:border-transparent outline-none transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amazonas-green text-white py-3 rounded-lg font-bold hover:bg-amazonas-light transition-colors shadow-lg"
          >
            Entrar no Sistema
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Helper Constants ---
const UNIT_OPTIONS = [
  'Unidade',
  'Caixa',
  'Metro',
  'Bobina',
  'Rolo',
  'Par',
  'Litro',
  'Pacote',
  'Kit',
  'Peça'
];

const getStatusColor = (status: RequestStatus) => {
  switch(status) {
    case 'PENDENTE': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200';
    case 'EM_ATENDIMENTO': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200';
    case 'AGUARDANDO_CORRECAO': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200';
    case 'CONCLUIDO': return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200';
    case 'CANCELADO':
    case 'REJEITADO': return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

// --- Main App ---
export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [loginError, setLoginError] = useState<string | null>(null);
  
  // Sidebar State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  // Apply theme class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Simulated Database State
  const [materials, setMaterials] = useState<Material[]>(MOCK_MATERIALS);
  const [requests, setRequests] = useState<MaterialRequest[]>(MOCK_REQUESTS);
  const [movements, setMovements] = useState<Movement[]>(MOCK_MOVEMENTS);
  const [suppliers, setSuppliers] = useState<Supplier[]>(MOCK_SUPPLIERS);
  const [usersList, setUsersList] = useState<User[]>(MOCK_USERS);

  // LIFTED STATE to avoid component re-mounting and state loss
  const [selectedApproval, setSelectedApproval] = useState<MaterialRequest | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Change Password State
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ old: '', new: '', confirm: '' });

  // Toast State
  const [toast, setToast] = useState<{visible: boolean, message: string}>({ visible: false, message: '' });
  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  // Generic Confirmation Modal State
  const [confirmationModal, setConfirmationModal] = useState<{
    open: boolean, 
    title: string, 
    message: string, 
    onConfirm: () => void 
  }>({ open: false, title: '', message: '', onConfirm: () => {} });


  // Handlers
  const handleLogin = (role: Role, email: string, password: string) => {
    setLoginError(null);
    const foundUser = usersList.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser && foundUser.role === role && foundUser.password === password) {
        if (foundUser.status === 'INATIVO') {
             setLoginError("Usuário inativo. Contate o administrador.");
             return;
        }
        setUser(foundUser);
        setCurrentView(foundUser.role === 'ADMIN' ? 'dashboard' : 'my-requests');
    } else {
        setLoginError("E-mail ou senha incorretos.");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
    setSelectedApproval(null);
    setLoginError(null);
    setIsProfileOpen(false);
    setIsChangePasswordOpen(false);
    setPasswordForm({ old: '', new: '', confirm: '' });
  };
  
  const handleChangePasswordSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!user) return;
      
      if (passwordForm.old !== user.password) {
          showToast("Senha antiga incorreta.");
          return;
      }
      
      if (passwordForm.new !== passwordForm.confirm) {
          showToast("A nova senha e a confirmação não conferem.");
          return;
      }
      
      if (passwordForm.new.length < 4) {
           showToast("A nova senha deve ter pelo menos 4 caracteres.");
           return;
      }

      // Update in database (mock)
      setUsersList(prev => prev.map(u => u.id === user.id ? { ...u, password: passwordForm.new } : u));
      
      // Update current session
      setUser({ ...user, password: passwordForm.new });
      
      showToast("Senha alterada com sucesso!");
      setIsChangePasswordOpen(false);
      setPasswordForm({ old: '', new: '', confirm: '' });
  };

  const updateStock = (materialId: string, qty: number, type: 'ADD' | 'REMOVE') => {
    setMaterials(prev => prev.map(m => {
      if (m.id === materialId) {
        const newStock = type === 'ADD' ? m.currentStock + qty : m.currentStock - qty;
        return { ...m, currentStock: newStock };
      }
      return m;
    }));
  };

  // --- Screens ---

  const Dashboard = () => {
    const lowStockItems = materials.filter(m => m.currentStock <= m.minStock);
    const pendingRequests = requests.filter(r => r.status === 'PENDENTE' || r.status === 'EM_ATENDIMENTO');
    const categoryData = materials.reduce((acc: any, curr) => {
      const cat = curr.category;
      if (!acc[cat]) acc[cat] = 0;
      acc[cat] += curr.currentStock;
      return acc;
    }, {});
    
    const pieData = Object.keys(categoryData).map((key, index) => ({
      name: key,
      value: categoryData[key],
      color: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'][index % 5]
    }));

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-amazonas-blue dark:text-gray-100">Visão Geral</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-amazonas-green">
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total de Materiais</div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{materials.length}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-red-500">
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Estoque Baixo</div>
            <div className="text-3xl font-bold text-red-600 mt-2">{lowStockItems.length}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Solicitações Abertas</div>
            <div className="text-3xl font-bold text-yellow-600 mt-2">{pendingRequests.length}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Movimentações (Mês)</div>
            <div className="text-3xl font-bold text-blue-600 mt-2">{movements.length}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm w-full min-w-0">
            <h3 className="text-lg font-bold text-amazonas-blue dark:text-gray-200 mb-4">Distribuição por Categoria</h3>
            <div className="h-64 w-full min-w-0">
              <ResponsiveContainer width="100%" minWidth={0} height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#fff', color: isDarkMode ? '#fff' : '#000' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm w-full min-w-0">
            <h3 className="text-lg font-bold text-amazonas-blue dark:text-gray-200 mb-4 flex items-center">
              <AlertOctagon className="text-red-500 mr-2" size={20} />Itens Críticos (Abaixo do Mínimo)
            </h3>
            <div className="overflow-y-auto max-h-64">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700">
                  <tr><th className="px-4 py-2">Item</th><th className="px-4 py-2 text-right">Atual</th><th className="px-4 py-2 text-right">Mínimo</th></tr>
                </thead>
                <tbody>
                  {lowStockItems.map(m => (
                    <tr key={m.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-200">{m.description}</td>
                      <td className="px-4 py-3 text-right text-red-600 font-bold">{m.currentStock}</td>
                      <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">{m.minStock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StockManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Entry/Devolution Modal State
    const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
    const [entryForm, setEntryForm] = useState<{
        materialId: string, 
        materialName: string, 
        type: 'ENTRADA' | 'DEVOLUCAO', 
        quantity: number, 
        nf: string, 
        obs: string,
        deliveredBy: string // New Field for Devolution
    }>({ materialId: '', materialName: '', type: 'ENTRADA', quantity: 1, nf: '', obs: '', deliveredBy: '' });

    const [newMaterial, setNewMaterial] = useState({ codeSap: '', description: '', unit: 'Unidade', supplierId: '', minStock: 0, category: 'Geral' });

    const filteredMaterials = materials.filter(m => m.description.toLowerCase().includes(searchTerm.toLowerCase()) || m.codeDat.toLowerCase().includes(searchTerm.toLowerCase()));
    const nextDatCode = useMemo(() => {
        const maxId = materials.reduce((max, m) => { const num = parseInt(m.codeDat.replace(/[^0-9]/g, '')) || 0; return num > max ? num : max; }, 0);
        return `DAT-${String(maxId + 1).padStart(3, '0')}`;
    }, [materials]);

    const handleCreateMaterial = (e: React.FormEvent) => {
        e.preventDefault();
        const material: Material = { id: `m${Date.now()}`, codeDat: nextDatCode, codeSap: newMaterial.codeSap, description: newMaterial.description, unit: newMaterial.unit, supplierId: Number(newMaterial.supplierId), currentStock: 0, minStock: Number(newMaterial.minStock), category: newMaterial.category };
        setMaterials([...materials, material]);
        setIsModalOpen(false);
        setNewMaterial({ codeSap: '', description: '', unit: 'Unidade', supplierId: '', minStock: 0, category: 'Geral' });
    };

    const handleEntrySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!entryForm.materialId) { showToast("Selecione um material."); return; }
        
        // Update Stock
        updateStock(entryForm.materialId, entryForm.quantity, 'ADD'); // Both Entrada and Devolução increase stock
        
        // Create Movement
        const newMove: Movement = {
            id: `mov-${Date.now()}`,
            type: entryForm.type,
            materialId: entryForm.materialId,
            quantity: entryForm.quantity,
            date: new Date().toISOString().split('T')[0],
            responsible: user?.name || 'Admin',
            nf: entryForm.nf,
            ticket: entryForm.obs, // using ticket field for generic obs if needed or add new field
            deliveredBy: entryForm.type === 'DEVOLUCAO' ? entryForm.deliveredBy : undefined
        };
        
        setMovements(prev => [newMove, ...prev]);
        showToast(`${entryForm.type} registrada com sucesso!`);
        setIsEntryModalOpen(false);
        setEntryForm({ materialId: '', materialName: '', type: 'ENTRADA', quantity: 1, nf: '', obs: '', deliveredBy: '' });
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-amazonas-blue dark:text-white">Materiais e Estoque</h2>
          {user?.role === 'ADMIN' && (
            <div className="flex gap-2">
                <button onClick={() => setIsEntryModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
                  <PackageCheck size={18} className="mr-2" /> Entrada / Devolução
                </button>
                <button onClick={() => setIsModalOpen(true)} className="bg-amazonas-green text-white px-4 py-2 rounded-lg flex items-center hover:bg-amazonas-light transition-colors">
                  <Plus size={18} className="mr-2" />Novo Material
                </button>
            </div>
          )}
        </div>
        <div className="mb-6 relative">
          <input 
            type="text" 
            placeholder="Buscar por descrição ou código..." 
            className="w-full pl-10 pr-4 py-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 border rounded-lg focus:ring-2 focus:ring-amazonas-green outline-none" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm uppercase">
                <th className="p-4 border-b dark:border-gray-600">Código DAT</th>
                <th className="p-4 border-b dark:border-gray-600">Descrição</th>
                <th className="p-4 border-b dark:border-gray-600">Unidade</th>
                <th className="p-4 border-b dark:border-gray-600 text-right">Estoque</th>
                <th className="p-4 border-b dark:border-gray-600 text-right">Mínimo</th>
                <th className="p-4 border-b dark:border-gray-600 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredMaterials.map(m => (
                <tr key={m.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="p-4 text-sm font-mono text-gray-500 dark:text-gray-400">{m.codeDat}</td>
                  <td className="p-4 font-medium text-gray-900 dark:text-gray-200">{m.description}</td>
                  <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{m.unit}</td>
                  <td className="p-4 text-right font-bold text-gray-900 dark:text-gray-200">{m.currentStock}</td>
                  <td className="p-4 text-right text-sm text-gray-500 dark:text-gray-400">{m.minStock}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${m.currentStock <= m.minStock ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'}`}>
                        {m.currentStock <= m.minStock ? 'Baixo' : 'Normal'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Create Material Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b dark:border-gray-600">
                        <h3 className="font-bold text-lg text-amazonas-blue dark:text-white">Cadastrar Novo Material</h3>
                        <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-red-500"><X size={24} /></button>
                    </div>
                    <form onSubmit={handleCreateMaterial} className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">Código DAT</label><input value={nextDatCode} disabled className="w-full p-2 bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-900 dark:text-gray-400 border rounded" /></div>
                            <div><label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">Código SAP</label><input required value={newMaterial.codeSap} onChange={e => setNewMaterial({...newMaterial, codeSap: e.target.value})} className="w-full p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 border rounded" /></div>
                        </div>
                        <div><label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">Descrição</label><input required value={newMaterial.description} onChange={e => setNewMaterial({...newMaterial, description: e.target.value})} className="w-full p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 border rounded" /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">Unidade</label><select value={newMaterial.unit} onChange={e => setNewMaterial({...newMaterial, unit: e.target.value})} className="w-full p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 border rounded">{UNIT_OPTIONS.map(o => <option key={o}>{o}</option>)}</select></div>
                            <div><label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">Fornecedor</label><select value={newMaterial.supplierId} onChange={e => setNewMaterial({...newMaterial, supplierId: e.target.value})} className="w-full p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 border rounded"><option value="">Selecione</option>{suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
                        </div>
                        <div><label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">Mínimo</label><input type="number" value={newMaterial.minStock} onChange={e => setNewMaterial({...newMaterial, minStock: parseInt(e.target.value)})} className="w-full p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 border rounded" /></div>
                         <div><label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">Categoria</label><input value={newMaterial.category} onChange={e => setNewMaterial({...newMaterial, category: e.target.value})} className="w-full p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 border rounded" /></div>
                        <div className="flex justify-end space-x-2 pt-2">
                             <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Cancelar</button>
                             <button type="submit" className="px-4 py-2 bg-amazonas-green text-white rounded">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {/* Entry / Devolution Modal */}
        {isEntryModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b dark:border-gray-600">
                        <h3 className="font-bold text-lg text-amazonas-blue dark:text-white">Entrada de Material</h3>
                        <button onClick={() => setIsEntryModalOpen(false)} className="text-gray-500 hover:text-red-500"><X size={24} /></button>
                    </div>
                    <form onSubmit={handleEntrySubmit} className="p-6 space-y-4">
                        <div>
                             <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">Material</label>
                             {entryForm.materialName ? (
                                 <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                     <span className="dark:text-white">{entryForm.materialName}</span>
                                     <button type="button" onClick={() => setEntryForm({...entryForm, materialId: '', materialName: ''})} className="text-red-500"><X size={16}/></button>
                                 </div>
                             ) : (
                                <MatchcodeInput materials={materials} onSelect={(m) => setEntryForm({...entryForm, materialId: m.id, materialName: m.description})} />
                             )}
                        </div>
                        
                        <div>
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">Tipo de Movimentação</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button type="button" onClick={() => setEntryForm({...entryForm, type: 'ENTRADA'})} className={`p-2 rounded text-sm font-bold border ${entryForm.type === 'ENTRADA' ? 'bg-green-100 text-green-700 border-green-300' : 'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-300'}`}>Entrada (Compra)</button>
                                <button type="button" onClick={() => setEntryForm({...entryForm, type: 'DEVOLUCAO'})} className={`p-2 rounded text-sm font-bold border ${entryForm.type === 'DEVOLUCAO' ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-white text-gray-700 dark:bg-gray-700 border-gray-300'}`} style={{ color: entryForm.type === 'DEVOLUCAO' ? undefined : '#374151' }}>Devolução</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">Quantidade</label>
                                <input type="number" min="1" required className="w-full p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 border rounded" value={entryForm.quantity} onChange={e => setEntryForm({...entryForm, quantity: parseInt(e.target.value)})} />
                             </div>
                             <div>
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">{entryForm.type === 'ENTRADA' ? 'Nota Fiscal' : 'Origem'}</label>
                                <input className="w-full p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 border rounded" value={entryForm.nf} onChange={e => setEntryForm({...entryForm, nf: e.target.value})} placeholder={entryForm.type === 'ENTRADA' ? 'Ex: NF-123' : 'Ex: Setor X'} />
                             </div>
                        </div>
                        
                        {/* New Field for Devolution: Delivered By */}
                        {entryForm.type === 'DEVOLUCAO' && (
                            <div>
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">Nome do Entregador (Quem Devolveu)</label>
                                <input className="w-full p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 border rounded" value={entryForm.deliveredBy} onChange={e => setEntryForm({...entryForm, deliveredBy: e.target.value})} placeholder="Ex: João da Silva" />
                            </div>
                        )}

                        <div>
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">Observação</label>
                            <input className="w-full p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 border rounded" value={entryForm.obs} onChange={e => setEntryForm({...entryForm, obs: e.target.value})} />
                        </div>

                        <div className="flex justify-end space-x-2 pt-2">
                             <button type="button" onClick={() => setIsEntryModalOpen(false)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Cancelar</button>
                             <button type="submit" className="px-4 py-2 bg-amazonas-green text-white rounded">Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
      </div>
    );
  };

  const ApprovalList = () => {
    // Re-implementing based on the unified request/approval logic
    const [actionMessage, setActionMessage] = useState('');
    const [searchId, setSearchId] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [completionModalOpen, setCompletionModalOpen] = useState(false);
    const [deliveryOption, setDeliveryOption] = useState('requester');
    const [customRecipient, setCustomRecipient] = useState('');

    const handleActionClick = (newStatus: RequestStatus, actionTitle: string) => {
        if (newStatus === 'CONCLUIDO') {
            setCompletionModalOpen(true);
            return;
        }
        if (!actionMessage.trim()) { showToast("Preencha a observação."); return; }
        setConfirmationModal({
            open: true, title: `Confirmar ${actionTitle}`, message: "Deseja prosseguir?",
            onConfirm: () => executeStatusUpdate(newStatus, actionTitle)
        });
    };

    const executeStatusUpdate = (newStatus: RequestStatus, action: string, recipient?: string) => {
        if (!selectedApproval) return;
        const updatedReq = { ...selectedApproval, status: newStatus, history: [...selectedApproval.history, { date: new Date().toLocaleString(), user: user?.name || 'Admin', action, message: actionMessage || '...' }] };
        
        if (newStatus === 'CONCLUIDO') {
            selectedApproval.items.forEach(i => {
                updateStock(i.materialId, i.quantity, 'REMOVE');
                setMovements(prev => [{ id: `mov-${Date.now()}`, type: 'SAIDA', materialId: i.materialId, quantity: i.quantity, date: new Date().toISOString().split('T')[0], responsible: user?.name || 'Admin', recipient: recipient || 'Não informado', requestId: selectedApproval.id }, ...prev]);
            });
        }
        setRequests(prev => prev.map(r => r.id === selectedApproval.id ? updatedReq : r));
        setSelectedApproval(updatedReq); setActionMessage(''); setConfirmationModal({ ...confirmationModal, open: false }); setCompletionModalOpen(false);
    };

    const filtered = requests.filter(r => r.id.includes(searchId) && (filterStatus ? r.status === filterStatus : true));

    if (selectedApproval) return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 relative">
            <button onClick={() => setSelectedApproval(null)} className="mb-4 flex items-center text-amazonas-blue dark:text-white font-bold"><ArrowLeft className="mr-2" /> Voltar</button>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mb-6">
                <h2 className="text-xl font-bold text-green-800 dark:text-green-300">Solicitação #{selectedApproval.id}</h2>
                <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-green-900 dark:text-green-200">
                    <div><b>Solicitante:</b> {selectedApproval.requesterName}</div>
                    <div><b>Empresa:</b> {selectedApproval.requesterCompany}</div>
                    <div className="col-span-2"><b>Justificativa:</b> {selectedApproval.justification}</div>
                </div>
            </div>
            {/* Items List */}
            <div className="mb-6"><h3 className="font-bold text-gray-900 dark:text-white mb-2">Itens</h3>
                {selectedApproval.items.map((i, idx) => <div key={idx} className="flex justify-between py-2 border-b dark:border-gray-700 text-gray-900 dark:text-gray-100"><span className="font-medium">{i.materialName}</span><span>{i.quantity} {i.materialUnit}</span></div>)}
            </div>
            {/* Chat History */}
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Histórico</h3>
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl h-64 overflow-y-auto mb-6 space-y-3">
                {selectedApproval.history.map((h, i) => {
                    const isMe = h.user === user?.name;
                    return (
                        <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-xl text-sm ${isMe ? 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'}`}>
                                <div className="font-bold text-xs opacity-70 mb-1">{h.user} - {h.action}</div>
                                {h.message}
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* Actions */}
            {selectedApproval.status !== 'CONCLUIDO' && selectedApproval.status !== 'CANCELADO' && (
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                    <textarea className="w-full p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-800 dark:text-white border rounded mb-2" placeholder="Observação obrigatória..." value={actionMessage} onChange={e => setActionMessage(e.target.value)} />
                    <div className="flex gap-2">
                        {selectedApproval.status === 'PENDENTE' && <button onClick={() => handleActionClick('EM_ATENDIMENTO', 'Atender')} className="bg-blue-600 text-white px-3 py-1 rounded">Atender</button>}
                        {selectedApproval.status === 'EM_ATENDIMENTO' && <button onClick={() => handleActionClick('CONCLUIDO', 'Concluir')} className="bg-green-600 text-white px-3 py-1 rounded">Concluir</button>}
                        <button onClick={() => handleActionClick('AGUARDANDO_CORRECAO', 'Pedir Correção')} className="bg-yellow-500 text-white px-3 py-1 rounded">Corrigir</button>
                        <button onClick={() => handleActionClick('CANCELADO', 'Rejeitar')} className="bg-red-500 text-white px-3 py-1 rounded">Rejeitar</button>
                    </div>
                </div>
            )}
             {completionModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96">
                        <h3 className="font-bold mb-4 dark:text-white text-gray-900">Concluir Entrega</h3>
                        <select className="w-full mb-2 p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white border rounded" value={deliveryOption} onChange={e => setDeliveryOption(e.target.value)}>
                            <option value="requester">Solicitante ({selectedApproval.requesterName})</option>
                            <option value="other">Outro</option>
                        </select>
                        {deliveryOption === 'other' && <input className="w-full mb-4 p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white border rounded" placeholder="Nome de quem retirou" value={customRecipient} onChange={e => setCustomRecipient(e.target.value)} />}
                        <div className="flex justify-end gap-2">
                             <button onClick={() => setCompletionModalOpen(false)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Cancelar</button>
                             <button onClick={() => {
                                 setConfirmationModal({ open: true, title: "Confirmar Entrega", message: "Baixar estoque?", onConfirm: () => executeStatusUpdate('CONCLUIDO', 'Conclusão', deliveryOption === 'other' ? customRecipient : selectedApproval.requesterName) })
                             }} className="px-3 py-1 bg-green-600 text-white rounded">Confirmar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-amazonas-blue dark:text-white mb-6">Central de Aprovações</h2>
            <div className="mb-4 flex gap-4">
                 <input placeholder="Buscar ID..." className="p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white border rounded" value={searchId} onChange={e => setSearchId(e.target.value)} />
                 <select className="p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white border rounded" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}><option value="">Todos Status</option><option value="PENDENTE">Pendente</option><option value="CONCLUIDO">Concluído</option></select>
            </div>
            <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm"><tr><th className="p-4">ID</th><th className="p-4">Requerente</th><th className="p-4">Empresa</th><th className="p-4">Data</th><th className="p-4">Status</th></tr></thead>
                <tbody>
                    {filtered.map(r => (
                        <tr key={r.id} onClick={() => setSelectedApproval(r)} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b dark:border-gray-700">
                            <td className="p-4 text-blue-600 font-bold">#{r.id}</td>
                            <td className="p-4 text-gray-900 dark:text-gray-200">{r.requesterName}</td>
                            <td className="p-4 text-gray-900 dark:text-gray-200">{r.requesterCompany}</td>
                            <td className="p-4 text-gray-900 dark:text-gray-200">{new Date(r.date).toLocaleDateString()}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(r.status)}`}>
                                    {r.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
  };

  const MovementsList = () => {
    // Restoring Advanced Filters and Export
    const [showFilters, setShowFilters] = useState(false);
    const [filterDate, setFilterDate] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterMaterial, setFilterMaterial] = useState('');

    const filteredMoves = movements.filter(m => {
        const mat = materials.find(mat => mat.id === m.materialId);
        const matchesDate = filterDate ? m.date === filterDate : true;
        const matchesType = filterType ? m.type === filterType : true;
        const matchesMat = filterMaterial ? mat?.description.toLowerCase().includes(filterMaterial.toLowerCase()) : true;
        return matchesDate && matchesType && matchesMat;
    });

    const exportToCSV = () => {
        const headers = "Data,Tipo,Material,Quantidade,Responsavel,NotaFiscal,Recebedor\n";
        const rows = filteredMoves.map(m => {
            const mat = materials.find(mat => mat.id === m.materialId);
            return `${m.date},${m.type},"${mat?.description}",${m.quantity},${m.responsible},${m.nf || '-'},${m.recipient || '-'}`;
        }).join("\n");
        const blob = new Blob([headers + rows], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'movimentacoes.csv'; a.click();
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-amazonas-blue dark:text-white">Movimentações</h2>
                <button onClick={exportToCSV} className="flex items-center text-green-600 hover:text-green-700"><Download className="mr-2" size={18}/> CSV</button>
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="mb-4 text-sm text-blue-600 flex items-center"><Filter size={16} className="mr-1"/> Filtros</button>
            {showFilters && (
                <div className="grid grid-cols-3 gap-4 mb-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <input type="date" className="p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-800 dark:text-white border rounded" value={filterDate} onChange={e => setFilterDate(e.target.value)} />
                    <select className="p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-800 dark:text-white border rounded" value={filterType} onChange={e => setFilterType(e.target.value)}><option value="">Todos Tipos</option><option value="ENTRADA">Entrada</option><option value="SAIDA">Saída</option><option value="DEVOLUCAO">Devolução</option></select>
                    <input type="text" placeholder="Material..." className="p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-800 dark:text-white border rounded" value={filterMaterial} onChange={e => setFilterMaterial(e.target.value)} />
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Data</th>
                            <th className="p-4">Tipo</th>
                            <th className="p-4">Cod</th>
                            <th className="p-4">Material</th>
                            <th className="p-4">QTD</th>
                            <th className="p-4">Responsável</th>
                            <th className="p-4">Recebedor/Entregador</th>
                            <th className="p-4">Ref.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMoves.map(m => {
                            const mat = materials.find(mt => mt.id === m.materialId);
                            let typeClass = '';
                            if (m.type === 'ENTRADA') typeClass = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
                            else if (m.type === 'SAIDA') typeClass = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
                            else typeClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';

                            // Logic for ID Column Display
                            let idDisplay = '';
                            if (m.type === 'SAIDA') idDisplay = `Req #${m.requestId}`;
                            else if (m.type === 'ENTRADA') idDisplay = 'Entrada Manual';
                            else idDisplay = 'Devolução';

                            // Logic for Receiver/Deliverer Column
                            let receiverDisplay = '';
                            if (m.type === 'SAIDA') receiverDisplay = m.recipient || '-';
                            else if (m.type === 'DEVOLUCAO') receiverDisplay = m.deliveredBy || '-';
                            else receiverDisplay = m.responsible; // For Entry, the responsible admin received it into stock

                            return (
                                <tr key={m.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="p-4 text-xs font-mono text-gray-600 dark:text-gray-400">{idDisplay}</td>
                                    <td className="p-4 text-gray-900 dark:text-gray-200">{new Date(m.date).toLocaleDateString()}</td>
                                    <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold ${typeClass}`}>{m.type}</span></td>
                                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400 font-mono">{mat?.codeDat}</td>
                                    <td className="p-4 text-gray-900 dark:text-gray-200">{mat?.description}</td>
                                    <td className="p-4 font-bold text-gray-900 dark:text-white">{m.quantity}</td>
                                    <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{m.responsible}</td>
                                    <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{receiverDisplay}</td>
                                    <td className="p-4 text-xs text-gray-500">{m.nf || '-'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
  };

  const SuppliersList = () => {
    // Restoring CRUD for Suppliers
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSup, setEditingSup] = useState<Supplier | null>(null);
    const [form, setForm] = useState({ name: '', cnpj: '', email: '', phone: '', address: '' });

    const handleSave = () => {
        if (editingSup) {
            setSuppliers(prev => prev.map(s => s.id === editingSup.id ? { ...s, ...form } : s));
        } else {
            setSuppliers(prev => [...prev, { id: Date.now(), ...form, status: 'ATIVO' }]);
        }
        setIsModalOpen(false); setEditingSup(null); setForm({ name: '', cnpj: '', email: '', phone: '', address: '' });
    };

    const toggleStatus = (id: number) => {
        setConfirmationModal({ 
            open: true, title: "Alterar Status", message: "Confirmar alteração?", 
            onConfirm: () => {
                setSuppliers(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'ATIVO' ? 'INATIVO' : 'ATIVO' } : s));
                setConfirmationModal({ ...confirmationModal, open: false });
            }
        });
    };

    const confirmDelete = (id: number) => {
        setConfirmationModal({
            open: true, title: "Excluir Fornecedor", message: "Tem certeza que deseja excluir este fornecedor?",
            onConfirm: () => {
                setSuppliers(prev => prev.filter(s => s.id !== id));
                setConfirmationModal({ ...confirmationModal, open: false });
                setIsModalOpen(false);
            }
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold text-amazonas-blue dark:text-white">Fornecedores</h2>
                <button onClick={() => { setEditingSup(null); setForm({ name: '', cnpj: '', email: '', phone: '', address: '' }); setIsModalOpen(true); }} className="bg-amazonas-green text-white px-4 py-2 rounded-lg flex items-center"><Plus size={18} className="mr-2"/> Novo Fornecedor</button>
            </div>
            <div className="flex flex-col gap-3">
                {suppliers.map(s => (
                    <div key={s.id} className="group bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">{s.name}</h3>
                            <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">{s.cnpj}</div>
                        </div>

                        <div className="flex-[2] grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700 dark:text-gray-300">
                             <div className="flex items-center gap-2 truncate">
                                <Truck size={14} className="text-gray-400 shrink-0"/> 
                                <span className="truncate" title={s.address}>{s.address}</span>
                             </div>
                             <div className="flex items-center gap-2 truncate">
                                <MessageSquare size={14} className="text-gray-400 shrink-0"/> 
                                <span className="truncate" title={s.email}>{s.email}</span>
                             </div>
                             <div className="flex items-center gap-2 truncate">
                                <Phone size={14} className="text-gray-400 shrink-0"/> 
                                <span className="truncate">{s.phone}</span>
                             </div>
                        </div>

                        <div className="flex items-center gap-4 self-end md:self-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${s.status === 'ATIVO' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                {s.status}
                            </span>
                            <div className="flex items-center gap-2 pl-4 border-l border-gray-200 dark:border-gray-700">
                                <button onClick={() => { setEditingSup(s); setForm(s); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Editar">
                                    <Edit size={18}/>
                                </button>
                                <button onClick={() => toggleStatus(s.id)} className={`p-2 rounded-lg transition-colors ${s.status === 'ATIVO' ? 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' : 'text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'}`} title={s.status === 'ATIVO' ? 'Desativar' : 'Ativar'}>
                                    <Power size={18}/>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
                        <h3 className="font-bold mb-4 dark:text-white text-gray-900">{editingSup ? 'Editar' : 'Novo'} Fornecedor</h3>
                        <input className="w-full mb-2 p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white border rounded" placeholder="Nome" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                        <input className="w-full mb-2 p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white border rounded" placeholder="CNPJ" value={form.cnpj} onChange={e => setForm({...form, cnpj: e.target.value})} />
                        <input className="w-full mb-2 p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white border rounded" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                        <input className="w-full mb-2 p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white border rounded" placeholder="Telefone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                        <input className="w-full mb-4 p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white border rounded" placeholder="Endereço" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
                        <div className="flex justify-between items-center">
                             {editingSup ? (
                                <button type="button" onClick={() => confirmDelete(editingSup.id)} className="px-3 py-1 bg-transparent border border-red-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors" title="Excluir">
                                    <Trash2 size={18} />
                                </button>
                             ) : <div></div>}
                             <div className="flex gap-2">
                                <button onClick={() => setIsModalOpen(false)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Cancelar</button>
                                <button onClick={handleSave} className="px-3 py-1 bg-amazonas-green text-white rounded">Salvar</button>
                             </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
  };
  
  const UsersList = () => {
    // Restoring CRUD for Users
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [form, setForm] = useState<any>({ name: '', email: '', role: 'SOLICITANTE', department: '', registrationId: '', company: '' });

    const handleSave = () => {
        if (!/^\d+$/.test(form.registrationId)) { showToast("Matrícula deve conter apenas números."); return; }
        if (editingUser) {
            setUsersList(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...form } : u));
        } else {
            setUsersList(prev => [...prev, { id: Date.now().toString(), status: 'ATIVO', password: '123456', ...form }]);
        }
        setIsModalOpen(false); setEditingUser(null);
    };

    const toggleStatus = (id: string) => {
         setConfirmationModal({ open: true, title: "Alterar Status", message: "Confirmar?", onConfirm: () => {
             setUsersList(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'ATIVO' ? 'INATIVO' : 'ATIVO' } : u));
             setConfirmationModal({ ...confirmationModal, open: false });
         }});
    };

    const confirmDelete = (id: string) => {
        setConfirmationModal({
            open: true, title: "Excluir Usuário", message: "Tem certeza que deseja excluir este usuário?",
            onConfirm: () => {
                setUsersList(prev => prev.filter(u => u.id !== id));
                setConfirmationModal({ ...confirmationModal, open: false });
                setIsModalOpen(false);
            }
        });
    };
    
    const confirmResetPassword = (user: User) => {
        setConfirmationModal({
            open: true,
            title: "Resetar Senha",
            message: `Deseja resetar a senha do usuário ${user.name} para o padrão (123456)?`,
            onConfirm: () => {
                setUsersList(prev => prev.map(u => u.id === user.id ? { ...u, password: '123456' } : u));
                showToast(`Senha de ${user.name} resetada com sucesso!`);
                setConfirmationModal({ ...confirmationModal, open: false });
            }
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between mb-6">
                 <h2 className="text-2xl font-bold text-amazonas-blue dark:text-white">Usuários</h2>
                 <button onClick={() => { setEditingUser(null); setForm({ name: '', email: '', role: 'SOLICITANTE', department: '', registrationId: '', company: '' }); setIsModalOpen(true); }} className="bg-amazonas-green text-white px-4 py-2 rounded-lg flex items-center"><Plus size={18} className="mr-2"/> Novo Usuário</button>
            </div>
            <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm"><tr><th className="p-4">Nome</th><th className="p-4">Matrícula</th><th className="p-4">Empresa</th><th className="p-4">Email</th><th className="p-4">Status</th><th className="p-4">Ações</th></tr></thead>
                <tbody>
                    {usersList.map(u => (
                        <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b dark:border-gray-700">
                            <td className="p-4 font-medium text-gray-900 dark:text-white">{u.name}</td>
                            <td className="p-4 text-gray-900 dark:text-gray-300">{u.registrationId}</td>
                            <td className="p-4 text-gray-900 dark:text-gray-300">{u.company}</td>
                            <td className="p-4 text-gray-600 dark:text-gray-400">{u.email}</td>
                            <td className="p-4"><span className={`text-xs font-bold ${u.status === 'ATIVO' ? 'text-green-600' : 'text-red-600'}`}>{u.status}</span></td>
                            <td className="p-4 flex gap-2">
                                <button onClick={() => { setEditingUser(u); setForm(u); setIsModalOpen(true); }} className="text-blue-500" title="Editar"><Edit size={16}/></button>
                                <button onClick={() => confirmResetPassword(u)} className="text-yellow-500" title="Resetar Senha"><KeyRound size={16}/></button>
                                <button onClick={() => toggleStatus(u.id)} className="text-gray-500" title={u.status === 'ATIVO' ? 'Desativar' : 'Ativar'}><Power size={16}/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
             {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
                        <h3 className="font-bold mb-4 dark:text-white text-gray-900">{editingUser ? 'Editar' : 'Novo'} Usuário</h3>
                        <input className="w-full mb-2 p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white border rounded" placeholder="Nome" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                        <input className="w-full mb-2 p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white border rounded" placeholder="Matrícula (Números)" value={form.registrationId} onChange={e => { if (/^\d*$/.test(e.target.value)) setForm({...form, registrationId: e.target.value}) }} />
                        <input className="w-full mb-2 p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white border rounded" placeholder="Empresa" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                        <input className="w-full mb-2 p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white border rounded" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                        <select className="w-full mb-4 p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white border rounded" value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                            <option value="ADMIN">Administrador</option>
                            <option value="SOLICITANTE">Solicitante</option>
                        </select>
                        <div className="flex justify-between items-center">
                            {editingUser ? (
                                <button type="button" onClick={() => confirmDelete(editingUser.id)} className="px-3 py-1 bg-transparent border border-red-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors" title="Excluir">
                                    <Trash2 size={18} />
                                </button>
                             ) : <div></div>}
                             <div className="flex gap-2">
                                <button onClick={() => setIsModalOpen(false)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Cancelar</button>
                                <button onClick={handleSave} className="px-3 py-1 bg-amazonas-green text-white rounded">Salvar</button>
                             </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
  };

  const MyRequests = () => {
      // Unified view with Floating Modal for new request and Bulk Add
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [selectedRequest, setSelectedRequest] = useState<MaterialRequest | null>(null);
      
      // New Request State
      const [cart, setCart] = useState<{material: Material, quantity: number}[]>([]);
      const [justification, setJustification] = useState('');
      const [location, setLocation] = useState('');
      
      // Edit Mode State (For Corrections)
      const [isEditing, setIsEditing] = useState(false);
      const [editCart, setEditCart] = useState<{materialId: string, materialName: string, materialUnit: string, quantity: number}[]>([]);
      const [editJustification, setEditJustification] = useState('');
      const [editLocation, setEditLocation] = useState('');

      const myReqs = requests.filter(r => r.requesterId === user?.id);
      
      const addToCart = (m: Material) => { 
          if (isEditing) {
              if (!editCart.find(c => c.materialId === m.id)) {
                  setEditCart([...editCart, { materialId: m.id, materialName: m.description, materialUnit: m.unit, quantity: 1 }]);
              }
          } else {
              if (!cart.find(c => c.material.id === m.id)) setCart([...cart, { material: m, quantity: 1 }]); 
          }
      };

      const handleSubmit = () => {
           if (!justification || !location || cart.length === 0) { showToast("Preencha todos os campos."); return; }
           
           // Generate Sequential ID
           const maxId = requests.reduce((max, r) => {
                const num = parseInt(r.id.replace('ID_', '')) || 0;
                return num > max ? num : max;
           }, 0);
           const nextId = `ID_${String(maxId + 1).padStart(5, '0')}`;

           const newReq: MaterialRequest = {
               id: nextId, requesterId: user?.id || '', requesterName: user?.name || '', requesterCompany: user?.company || '', department: user?.department || '', date: new Date().toISOString().split('T')[0], status: 'PENDENTE', location, justification,
               items: cart.map(c => ({ materialId: c.material.id, materialName: c.material.description, materialUnit: c.material.unit, quantity: c.quantity })),
               history: [{ date: new Date().toLocaleString(), user: user?.name || '', action: 'Abertura', message: 'Solicitação criada.' }]
           };
           setRequests([newReq, ...requests]); setIsModalOpen(false); setCart([]); setJustification(''); setLocation(''); showToast("Solicitação enviada!");
      };

      const handleStartEdit = (req: MaterialRequest) => {
          setIsEditing(true);
          setEditCart(req.items);
          setEditJustification(req.justification);
          setEditLocation(req.location);
      };

      const handleSubmitCorrection = () => {
          if (!selectedRequest) return;
          const updatedReq = {
              ...selectedRequest,
              status: 'PENDENTE' as RequestStatus, // Or EM_ATENDIMENTO
              justification: editJustification,
              location: editLocation,
              items: editCart,
              history: [...selectedRequest.history, { date: new Date().toLocaleString(), user: user?.name || '', action: 'Correção Enviada', message: 'Correções aplicadas pelo solicitante.' }]
          };
          setRequests(prev => prev.map(r => r.id === selectedRequest.id ? updatedReq : r));
          setSelectedRequest(updatedReq);
          setIsEditing(false);
          showToast("Correção enviada!");
      };

      const handleCancelRequest = () => {
          setConfirmationModal({
              open: true,
              title: "Cancelar Solicitação",
              message: "Deseja realmente cancelar esta solicitação?",
              onConfirm: () => {
                  if (!selectedRequest) return;
                  const updated = {
                      ...selectedRequest,
                      status: 'CANCELADO' as RequestStatus,
                      history: [...selectedRequest.history, { date: new Date().toLocaleString(), user: user?.name || '', action: 'Cancelado', message: 'Solicitação cancelada pelo usuário.' }]
                  };
                  setRequests(prev => prev.map(r => r.id === updated.id ? updated : r));
                  setSelectedRequest(updated);
                  setConfirmationModal({ ...confirmationModal, open: false });
              }
          });
      };

      // Detail View
      if (selectedRequest) return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 relative">
             <div className="flex justify-between items-center mb-4">
                <button onClick={() => { setSelectedRequest(null); setIsEditing(false); }} className="flex items-center text-amazonas-blue dark:text-white font-bold"><ArrowLeft className="mr-2" /> Voltar</button>
                {selectedRequest.status === 'AGUARDANDO_CORRECAO' && !isEditing && (
                    <div className="flex gap-2">
                        <button onClick={handleCancelRequest} className="bg-red-500 text-white px-4 py-2 rounded flex items-center hover:bg-red-600 transition-colors"><XCircle size={16} className="mr-2"/> Cancelar</button>
                        <button onClick={() => handleStartEdit(selectedRequest)} className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center hover:bg-yellow-600 transition-colors"><Edit size={16} className="mr-2"/> Corrigir</button>
                    </div>
                )}
             </div>
             
             {isEditing ? (
                 <div className="space-y-4 bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-700">
                     <h3 className="font-bold text-lg text-yellow-800 dark:text-yellow-200">Editando Correção</h3>
                     <input className="w-full p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white border rounded" value={editLocation} onChange={e => setEditLocation(e.target.value)} placeholder="Local" />
                     <textarea className="w-full p-2 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white border rounded" value={editJustification} onChange={e => setEditJustification(e.target.value)} placeholder="Justificativa" />
                     
                     <div className="border-t border-yellow-200 pt-4">
                         <h4 className="font-bold mb-2 text-yellow-800 dark:text-yellow-100">Itens (Adicionar/Remover)</h4>
                         <MatchcodeInput materials={materials} onSelect={addToCart} />
                         <div className="mt-2 space-y-2">
                             {editCart.map(c => (
                                 <div key={c.materialId} className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-600">
                                     <span className="text-gray-900 dark:text-white">{c.materialName}</span>
                                     <div className="flex items-center gap-2">
                                         <button onClick={() => setEditCart(editCart.map(x => x.materialId === c.materialId ? { ...x, quantity: Math.max(1, x.quantity - 1) } : x))} className="p-1 bg-gray-200 text-gray-700 rounded">-</button>
                                          <input 
                                                type="number"
                                                min="1"
                                                className="w-12 text-center bg-transparent border-b border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white focus:outline-none focus:border-amazonas-green p-0"
                                                value={c.quantity}
                                                onChange={(e) => {
                                                    const val = parseInt(e.target.value);
                                                    setEditCart(editCart.map(x => x.materialId === c.materialId ? { ...x, quantity: val > 0 ? val : 1 } : x));
                                                }}
                                            />
                                         <button onClick={() => setEditCart(editCart.map(x => x.materialId === c.materialId ? { ...x, quantity: x.quantity + 1 } : x))} className="p-1 bg-gray-200 text-gray-700 rounded">+</button>
                                         <button onClick={() => setEditCart(editCart.filter(x => x.materialId !== c.materialId))} className="text-red-500"><Trash2 size={16}/></button>
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </div>
                     <div className="flex justify-end gap-2">
                         <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Cancelar</button>
                         <button onClick={() => setConfirmationModal({ open: true, title: "Enviar Correção", message: "Confirmar envio das alterações?", onConfirm: () => { handleSubmitCorrection(); setConfirmationModal({...confirmationModal, open: false}); } })} className="px-4 py-2 bg-green-600 text-white rounded">Enviar Correção</button>
                     </div>
                 </div>
             ) : (
                <>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mb-6">
                        <div className="grid grid-cols-2 gap-4 text-sm text-green-900 dark:text-green-200">
                            <div><b>ID:</b> #{selectedRequest.id}</div>
                            <div><b>Status:</b> {selectedRequest.status}</div>
                            <div><b>Local:</b> {selectedRequest.location}</div>
                            <div className="col-span-2"><b>Justificativa:</b> {selectedRequest.justification}</div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Itens</h3>
                        {selectedRequest.items.map((i, idx) => (
                            <div key={idx} className="flex justify-between py-2 border-b dark:border-gray-700 text-gray-900 dark:text-gray-100">
                                <span className="font-medium text-gray-900 dark:text-white">{i.materialName}</span>
                                <span className="text-gray-900 dark:text-gray-300">{i.quantity} {i.materialUnit}</span>
                            </div>
                        ))}
                    </div>
                </>
             )}

             {/* History Chat */}
             <h3 className="font-bold text-gray-900 dark:text-white mb-2">Histórico</h3>
             <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl h-64 overflow-y-auto space-y-3">
                {selectedRequest.history.map((h, i) => {
                    const isMe = h.user === user?.name;
                    return (
                        <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-xl text-sm ${isMe ? 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'}`}>
                                <div className="font-bold text-xs opacity-70 mb-1">{h.user} - {h.action}</div>
                                {h.message}
                            </div>
                        </div>
                    );
                })}
             </div>
          </div>
      );

      return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 relative">
              <div className="flex justify-between items-center mb-6">
                   <h2 className="text-2xl font-bold text-amazonas-blue dark:text-white">Minhas Requisições</h2>
                   <button onClick={() => setIsModalOpen(true)} className="bg-amazonas-green text-white px-4 py-2 rounded-lg flex items-center shadow-lg"><Plus size={18} className="mr-2"/> Nova Requisição</button>
              </div>
              <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm"><tr><th className="p-4">ID</th><th className="p-4">Data</th><th className="p-4">Status</th><th className="p-4">Local</th></tr></thead>
                  <tbody>
                      {myReqs.map(r => (
                          <tr key={r.id} onClick={() => setSelectedRequest(r)} className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b dark:border-gray-700 cursor-pointer">
                              <td className="p-4 font-bold text-blue-600">#{r.id}</td>
                              <td className="p-4 text-gray-900 dark:text-gray-200">{new Date(r.date).toLocaleDateString()}</td>
                              <td className="p-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(r.status)}`}>
                                      {r.status}
                                  </span>
                              </td>
                              <td className="p-4 text-gray-900 dark:text-gray-200">{r.location}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>

              {/* Floating Modal for New Request with PERFECT Centering and Fixed Layout */}
              {isModalOpen && createPortal(
                  <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
                           {/* Header */}
                           <div className="flex justify-between items-center p-5 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 shrink-0">
                               <h2 className="text-xl font-bold text-amazonas-blue dark:text-white flex items-center gap-2">
                                   <PackagePlus className="text-amazonas-green" /> Nova Requisição de Material
                               </h2>
                               <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"><X className="text-gray-500"/></button>
                           </div>

                           {/* Scrollable Body */}
                           <div className="overflow-y-auto p-6 space-y-6 flex-1">
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div>
                                       <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">Solicitante</label>
                                       <input className="w-full p-2.5 border rounded-lg bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700 cursor-not-allowed" value={user?.name} disabled />
                                   </div>
                                   <div>
                                       <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">Departamento</label>
                                       <input className="w-full p-2.5 border rounded-lg bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700 cursor-not-allowed" value={user?.department} disabled />
                                   </div>
                               </div>

                               <div>
                                   <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">Local de Aplicação *</label>
                                   <input className="w-full p-2.5 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 border rounded-lg focus:ring-2 focus:ring-amazonas-green outline-none" placeholder="Ex: Sala de Reunião 01" value={location} onChange={e => setLocation(e.target.value)} />
                               </div>

                               <div>
                                   <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">Justificativa *</label>
                                   <textarea className="w-full p-2.5 bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 border rounded-lg focus:ring-2 focus:ring-amazonas-green outline-none" placeholder="Ex: Substituição de material danificado" rows={3} value={justification} onChange={e => setJustification(e.target.value)} />
                               </div>
                               
                               <div className="border-t dark:border-gray-700 pt-6">
                                   <h3 className="font-bold text-lg mb-4 text-amazonas-blue dark:text-white flex items-center gap-2"><ShoppingCart size={20}/> Adicionar Materiais</h3>

                                   <div className="mb-4">
                                       <label className="text-xs font-semibold uppercase text-gray-500 tracking-wide mb-1 block">Buscar Material (Matchcode)</label>
                                       <MatchcodeInput materials={materials} onSelect={addToCart} />
                                   </div>
                                   
                                   {/* Cart List */}
                                   <div className="bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl overflow-hidden">
                                       <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b dark:border-gray-700 flex justify-between text-xs font-bold text-gray-500 uppercase">
                                           <span>Item</span>
                                           <span>Quantidade</span>
                                       </div>
                                       {cart.length === 0 && <div className="p-8 text-center text-gray-400 italic">Nenhum material adicionado ainda.</div>}
                                       {cart.map(c => (
                                           <div key={c.material.id} className="flex justify-between items-center p-4 border-b dark:border-gray-700 last:border-0 hover:bg-white dark:hover:bg-gray-800 transition-colors">
                                               <div>
                                                   <div className="font-medium text-gray-900 dark:text-white">{c.material.description}</div>
                                                   <div className="text-xs text-gray-500">{c.material.codeDat}</div>
                                               </div>
                                               <div className="flex items-center gap-3 bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600 p-1">
                                                   <button onClick={() => setCart(cart.map(x => x.material.id === c.material.id ? { ...x, quantity: Math.max(1, x.quantity - 1) } : x))} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 rounded text-gray-700 dark:text-white font-bold transition-colors">-</button>
                                                   <input 
                                                        type="number"
                                                        min="1"
                                                        className="w-12 text-center bg-transparent border-b border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white focus:outline-none focus:border-amazonas-green p-0"
                                                        value={c.quantity}
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value);
                                                            setCart(cart.map(x => x.material.id === c.material.id ? { ...x, quantity: val > 0 ? val : 1 } : x));
                                                        }}
                                                    />
                                                   <button onClick={() => setCart(cart.map(x => x.material.id === c.material.id ? { ...x, quantity: x.quantity + 1 } : x))} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 rounded text-gray-700 dark:text-white font-bold transition-colors">+</button>
                                               </div>
                                                <button onClick={() => setCart(cart.filter(x => x.material.id !== c.material.id))} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={18}/></button>
                                           </div>
                                       ))}
                                   </div>
                               </div>
                           </div>

                           {/* Footer */}
                           <div className="p-5 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3 shrink-0 rounded-b-2xl">
                               <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium">Cancelar</button>
                               <button onClick={handleSubmit} className="px-6 py-2.5 bg-amazonas-green hover:bg-amazonas-light text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                                   <Send size={18} /> Solicitar
                               </button>
                           </div>
                      </div>
                  </div>,
                  document.body
              )}
          </div>
      );
  };

  const UserProfileModal = () => (
      <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 relative">
              <button onClick={() => setIsProfileOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"><X size={20}/></button>
              <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 bg-amazonas-green/10 dark:bg-amazonas-green/20 rounded-full flex items-center justify-center mb-3">
                      <UserCircle size={48} className="text-amazonas-green"/>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{user?.role}</span>
              </div>
              <div className="space-y-4 mb-6">
                  <div className="flex justify-between border-b dark:border-gray-700 pb-2">
                      <span className="text-gray-500 dark:text-gray-400">Email</span>
                      <span className="font-medium text-gray-900 dark:text-white">{user?.email}</span>
                  </div>
                  <div className="flex justify-between border-b dark:border-gray-700 pb-2">
                      <span className="text-gray-500 dark:text-gray-400">Matrícula</span>
                      <span className="font-medium text-gray-900 dark:text-white">{user?.registrationId}</span>
                  </div>
                  <div className="flex justify-between border-b dark:border-gray-700 pb-2">
                      <span className="text-gray-500 dark:text-gray-400">Empresa</span>
                      <span className="font-medium text-gray-900 dark:text-white">{user?.company}</span>
                  </div>
                   <div className="flex justify-between border-b dark:border-gray-700 pb-2">
                      <span className="text-gray-500 dark:text-gray-400">Departamento</span>
                      <span className="font-medium text-gray-900 dark:text-white">{user?.department}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                      <span className="text-gray-500 dark:text-gray-400">Status</span>
                      <span className="font-bold text-green-600">{user?.status}</span>
                  </div>
              </div>
              
              <button 
                onClick={() => { setIsProfileOpen(false); setIsChangePasswordOpen(true); }}
                className="w-full py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
              >
                  <KeyRound size={18} /> Alterar Senha
              </button>
          </div>
      </div>
  );

  if (!user) {
    return <LoginScreen onLogin={handleLogin} isDarkMode={isDarkMode} toggleTheme={toggleTheme} error={loginError} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 font-sans">
      <Sidebar role={user.role} currentView={currentView} onChangeView={setCurrentView} onLogout={handleLogout} isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} p-6 md:p-8`}>
        <div className="flex justify-end mb-6 gap-3">
            <button onClick={() => setIsProfileOpen(true)} className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Meu Perfil">
                <UserIcon size={20} />
            </button>
            <button onClick={toggleTheme} className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Alternar Tema">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </div>
        <div className="animate-fade-in">
            {currentView === 'dashboard' && <Dashboard />}
            {currentView === 'stock' && <StockManagement />}
            {currentView === 'approvals' && <ApprovalList />}
            {currentView === 'movements' && <MovementsList />}
            {currentView === 'suppliers' && <SuppliersList />}
            {currentView === 'users' && <UsersList />}
            {currentView === 'my-requests' && <MyRequests />}
        </div>
        
        {/* Global Toast */}
        {toast.visible && (
            <div className="fixed bottom-4 right-4 bg-amazonas-green text-white px-6 py-4 rounded-lg shadow-2xl z-[100] animate-bounce flex items-center">
                <CheckCircle className="mr-2"/> {toast.message}
            </div>
        )}

        {isProfileOpen && <UserProfileModal />}
        
        {/* Change Password Modal */}
        {isChangePasswordOpen && (
            <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black bg-opacity-50 p-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-sm p-6 relative">
                    <button onClick={() => { setIsChangePasswordOpen(false); setPasswordForm({ old: '', new: '', confirm: '' }); }} className="absolute top-4 right-4 text-gray-500 hover:text-red-500"><X size={20}/></button>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Alterar Senha</h3>
                    <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Senha Antiga</label>
                            <input 
                                type="password" 
                                required 
                                className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg focus:ring-amazonas-green focus:border-amazonas-green"
                                value={passwordForm.old}
                                onChange={e => setPasswordForm({...passwordForm, old: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Nova Senha</label>
                            <input 
                                type="password" 
                                required 
                                className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg focus:ring-amazonas-green focus:border-amazonas-green"
                                value={passwordForm.new}
                                onChange={e => setPasswordForm({...passwordForm, new: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Confirmar Nova Senha</label>
                            <input 
                                type="password" 
                                required 
                                className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg focus:ring-amazonas-green focus:border-amazonas-green"
                                value={passwordForm.confirm}
                                onChange={e => setPasswordForm({...passwordForm, confirm: e.target.value})}
                            />
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                            <button type="button" onClick={() => { setIsChangePasswordOpen(false); setPasswordForm({ old: '', new: '', confirm: '' }); }} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Cancelar</button>
                            <button type="submit" className="px-4 py-2 bg-amazonas-green text-white rounded hover:bg-amazonas-light transition-colors">Confirmar</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
        
        {/* Global Confirmation Modal */}
        {confirmationModal.open && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-sm p-6">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{confirmationModal.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{confirmationModal.message}</p>
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setConfirmationModal({...confirmationModal, open: false})} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Cancelar</button>
                        <button onClick={confirmationModal.onConfirm} className="px-4 py-2 bg-amazonas-green text-white rounded hover:bg-amazonas-light">Confirmar</button>
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
}
