import React from 'react';
import { 
  LayoutDashboard, 
  Box, 
  ArrowRightLeft, 
  ClipboardList, 
  Users, 
  LogOut, 
  Truck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Role } from '../types';

// Use direct path instead of module import for native environment compatibility
const logo = '/components/logo.png';

interface SidebarProps {
  role: Role;
  currentView: string;
  onChangeView: (view: string) => void;
  onLogout: () => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  role, 
  currentView, 
  onChangeView, 
  onLogout,
  isCollapsed,
  toggleSidebar
}) => {
  const adminLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'stock', label: 'Materiais & Estoque', icon: Box },
    { id: 'movements', label: 'Movimentações', icon: ArrowRightLeft },
    { id: 'approvals', label: 'Aprovações', icon: ClipboardList },
    { id: 'suppliers', label: 'Fornecedores', icon: Truck },
    { id: 'users', label: 'Usuários', icon: Users },
  ];

  const requesterLinks = [
    { id: 'stock', label: 'Catálogo de Materiais', icon: Box },
    { id: 'my-requests', label: 'Minhas Requisições', icon: ClipboardList }, 
  ];

  const links = role === 'ADMIN' ? adminLinks : requesterLinks;

  return (
    <div 
      className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-gray-900 h-screen shadow-2xl flex flex-col fixed left-0 top-0 z-20 transition-all duration-300 ease-in-out border-r border-gray-200 dark:border-gray-800`}
    >
      {/* Logo Area */}
      <div className={`h-24 flex items-center justify-center transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-4'} bg-amazonas-green/10 dark:bg-amazonas-green/20`}>
        <div className={`flex flex-col items-center justify-center w-full transition-all duration-300 bg-white/90 dark:bg-gray-800/90 rounded-lg p-2 ${isCollapsed ? 'h-12 w-12' : 'h-16 w-48'}`}>
            <img 
              src={logo} 
              alt="Amazonas Energia" 
              className={`transition-all duration-300 object-contain ${isCollapsed ? 'w-full h-full' : 'w-full h-full'}`}
              onError={(e) => {
                // Fallback if local image fails
                (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Amazonas_Energia_logo.svg';
              }}
            />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 sidebar-scroll">
        <ul className="space-y-2 px-3">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = currentView === link.id;
            return (
              <li key={link.id}>
                <button
                  onClick={() => onChangeView(link.id)}
                  title={isCollapsed ? link.label : ''}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-4'} py-3 rounded-xl transition-all duration-200 group relative
                    ${isActive 
                      ? 'bg-amazonas-green text-white shadow-lg shadow-amazonas-green/30' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-amazonas-green dark:hover:text-amazonas-green'
                    }`}
                >
                  <Icon size={22} className={`shrink-0 ${!isCollapsed && 'mr-3'} transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  
                  {!isCollapsed && (
                    <span className="font-medium truncate transition-opacity duration-300">
                      {link.label}
                    </span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                      {link.label}
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
         {/* Toggle Button */}
         <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>

        <button
          onClick={onLogout}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-center'} px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-xl transition-colors`}
          title={isCollapsed ? "Sair do Sistema" : ""}
        >
          <LogOut size={20} className={`${!isCollapsed && 'mr-2'}`} />
          {!isCollapsed && "Sair"}
        </button>
      </div>
    </div>
  );
};