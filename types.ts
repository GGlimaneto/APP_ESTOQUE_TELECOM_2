
export type Role = 'ADMIN' | 'SOLICITANTE';

export type UserStatus = 'ATIVO' | 'INATIVO';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  // New fields for User Management
  registrationId: string; // Matricula
  company: string;        // Empresa
  status: UserStatus;
  password?: string;      // Senha para login
}

export interface Supplier {
  id: number;
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  address: string;
  status: UserStatus; // Added status field
}

export interface Material {
  id: string; // Internal ID
  codeSap: string;
  codeDat: string; // Primary Key usually
  description: string;
  unit: string;
  supplierId: number;
  currentStock: number;
  minStock: number;
  category: string;
}

export interface Movement {
  id: string;
  type: 'ENTRADA' | 'SAIDA' | 'DEVOLUCAO';
  materialId: string;
  quantity: number;
  date: string;
  responsible: string; // Quem fez a entrada ou entregou (Usuário do Sistema/Admin)
  recipient?: string; // Quem RECEBEU o material fisicamente (Saídas)
  deliveredBy?: string; // Quem ENTREGOU o material (Devoluções) - Novo Campo
  nf?: string; // Nota Fiscal for entries
  requestId?: string; // Link to a request if output
  
  // New fields for detailed report
  contract?: string;
  order?: string;
  ticket?: string; // Chamado/GED
}

export type RequestStatus = 
  | 'PENDENTE' 
  | 'EM_ATENDIMENTO' 
  | 'AGUARDANDO_CORRECAO' 
  | 'CONCLUIDO' 
  | 'CANCELADO' 
  | 'REJEITADO'; // Mantido para compatibilidade legado, mas o fluxo principal usa Cancelado

export interface RequestItem {
  materialId: string;
  quantity: number;
  materialName: string; // Denormalized for display
  materialUnit: string;
}

export interface RequestHistory {
  date: string;
  user: string;
  action: string;
  message?: string;
  attachments?: string[]; // Names of attached files
}

export interface MaterialRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterCompany: string; // New field
  department: string;
  date: string;
  status: RequestStatus;
  items: RequestItem[];
  location: string; // Local de aplicação
  justification: string;
  history: RequestHistory[]; // Audit trail / Chat
  attachments?: string[]; // Initial attachments
}
