
import { Material, Supplier, User, MaterialRequest, Movement } from './types';

export const MOCK_USERS: User[] = [
  { 
    id: '1', name: 'Carlos Administrador', email: 'admin@amazonas.com.br', role: 'ADMIN', department: 'TI - Infraestrutura',
    registrationId: '001', company: 'Amazonas Energia', status: 'ATIVO', password: '123456'
  },
  { 
    id: '2', name: 'João Solicitante', email: 'joao@amazonas.com.br', role: 'SOLICITANTE', department: 'Manutenção',
    registrationId: '002', company: 'Tercerizada A', status: 'ATIVO', password: '123456'
  },
  { 
    id: '3', name: 'Maria Engenharia', email: 'maria@amazonas.com.br', role: 'SOLICITANTE', department: 'Engenharia',
    registrationId: '003', company: 'Amazonas Energia', status: 'ATIVO', password: '123456'
  },
  { 
    id: '4', name: 'Usuário de Teste', email: 'teste@amazonas.com.br', role: 'SOLICITANTE', department: 'TI - Qualidade',
    registrationId: '998', company: 'Amazonas Energia', status: 'ATIVO', password: '123456'
  },
  { 
    id: '5', name: 'Admin de Teste', email: 'admin.teste@amazonas.com.br', role: 'ADMIN', department: 'TI - Gestão',
    registrationId: '999', company: 'Amazonas Energia', status: 'ATIVO', password: '123456'
  },
];

export const MOCK_SUPPLIERS: Supplier[] = [
  { id: 1, name: 'Dell Computadores', cnpj: '00.000.000/0001-99', phone: '(11) 4004-0000', email: 'contato@dell.com', address: 'Av. Industrial, SP', status: 'ATIVO' },
  { id: 2, name: 'Furukawa Electric', cnpj: '11.111.111/0001-11', phone: '(41) 3333-3333', email: 'vendas@furukawa.com', address: 'Curitiba, PR', status: 'ATIVO' },
  { id: 3, name: 'Cisco Systems', cnpj: '22.222.222/0001-22', phone: '(11) 5555-5555', email: 'br-sales@cisco.com', address: 'São Paulo, SP', status: 'ATIVO' },
  { id: 4, name: 'Kalunga Papelaria', cnpj: '33.333.333/0001-33', phone: '(11) 3003-3003', email: 'empresas@kalunga.com', address: 'Manaus, AM', status: 'ATIVO' },
];

export const MOCK_MATERIALS: Material[] = [
  { id: 'm1', codeDat: 'DAT-001', codeSap: 'SAP-1001', description: 'Cabo UTP Cat6 Azul', unit: 'Caixa', supplierId: 2, currentStock: 45, minStock: 10, category: 'Cabeamento' },
  { id: 'm2', codeDat: 'DAT-002', codeSap: 'SAP-1002', description: 'Conector RJ45 Macho', unit: 'Unidade', supplierId: 2, currentStock: 500, minStock: 100, category: 'Conectores' },
  { id: 'm3', codeDat: 'DAT-003', codeSap: 'SAP-2001', description: 'Mouse Óptico USB Dell', unit: 'Unidade', supplierId: 1, currentStock: 12, minStock: 15, category: 'Periféricos' },
  { id: 'm4', codeDat: 'DAT-004', codeSap: 'SAP-2002', description: 'Teclado ABNT2 USB Dell', unit: 'Unidade', supplierId: 1, currentStock: 8, minStock: 10, category: 'Periféricos' },
  { id: 'm5', codeDat: 'DAT-005', codeSap: 'SAP-3001', description: 'Switch Cisco 24 Portas Gigabit', unit: 'Unidade', supplierId: 3, currentStock: 2, minStock: 2, category: 'Rede' },
  { id: 'm6', codeDat: 'DAT-006', codeSap: 'SAP-4001', description: 'Bateria 9V Alcalina', unit: 'Unidade', supplierId: 4, currentStock: 0, minStock: 20, category: 'Consumíveis' },
  { id: 'm7', codeDat: 'DAT-007', codeSap: 'SAP-5001', description: 'Monitor 24 Polegadas LED', unit: 'Unidade', supplierId: 1, currentStock: 5, minStock: 5, category: 'Periféricos' },
  { id: 'm8', codeDat: 'DAT-008', codeSap: 'SAP-6001', description: 'Capacete de Segurança Aba Frontal', unit: 'Unidade', supplierId: 4, currentStock: 30, minStock: 10, category: 'EPI' },
  { id: 'm9', codeDat: 'DAT-009', codeSap: 'SAP-6002', description: 'Luva de Vaqueta Par', unit: 'Par', supplierId: 4, currentStock: 15, minStock: 20, category: 'EPI' },
  { id: 'm10', codeDat: 'DAT-010', codeSap: 'SAP-7001', description: 'Toner Impressora Laser HP 85A', unit: 'Unidade', supplierId: 4, currentStock: 3, minStock: 5, category: 'Consumíveis' },
];

export const MOCK_REQUESTS: MaterialRequest[] = [
  {
    id: 'ID_00001',
    requesterId: '2',
    requesterName: 'João Solicitante',
    requesterCompany: 'Tercerizada A',
    department: 'Manutenção',
    date: '2023-11-28',
    status: 'PENDENTE',
    location: 'Sede - 2º Andar',
    justification: 'Troca de periféricos equipe financeira',
    items: [
      { materialId: 'm3', quantity: 2, materialName: 'Mouse Óptico USB Dell', materialUnit: 'Unidade' },
      { materialId: 'm4', quantity: 2, materialName: 'Teclado ABNT2 USB Dell', materialUnit: 'Unidade' }
    ],
    history: [
        { date: '2023-11-28 08:30', user: 'João Solicitante', action: 'Abertura', message: 'Solicitação criada no sistema.' }
    ]
  },
  {
    id: 'ID_00002',
    requesterId: '3',
    requesterName: 'Maria Engenharia',
    requesterCompany: 'Amazonas Energia',
    department: 'Engenharia',
    date: '2023-11-29',
    status: 'CONCLUIDO',
    location: 'Subestação Centro',
    justification: 'Manutenção de rede urgente',
    items: [
      { materialId: 'm1', quantity: 2, materialName: 'Cabo UTP Cat6 Azul', materialUnit: 'Caixa' },
      { materialId: 'm2', quantity: 50, materialName: 'Conector RJ45 Macho', materialUnit: 'Unidade' }
    ],
    history: [
        { date: '2023-11-29 09:00', user: 'Maria Engenharia', action: 'Abertura', message: 'Solicitação criada.' },
        { date: '2023-11-29 10:00', user: 'Carlos Administrador', action: 'Aprovação', message: 'Material liberado para retirada.' },
        { date: '2023-11-29 14:00', user: 'Carlos Administrador', action: 'Conclusão', message: 'Entregue ao solicitante.' }
    ]
  }
];

export const MOCK_MOVEMENTS: Movement[] = [
  { 
    id: 'mov-1', type: 'ENTRADA', materialId: 'm1', quantity: 10, date: '2023-11-01', responsible: 'Carlos Administrador', 
    nf: 'NF-5050', contract: 'CTR-2023/001', order: 'PED-9988' 
  },
  { 
    id: 'mov-2', type: 'SAIDA', materialId: 'm1', quantity: 2, date: '2023-11-29', responsible: 'Carlos Administrador', recipient: 'Maria Engenharia',
    requestId: 'ID_00002', ticket: 'CH-12345'
  },
  { 
    id: 'mov-3', type: 'ENTRADA', materialId: 'm3', quantity: 20, date: '2023-10-15', responsible: 'Carlos Administrador', 
    nf: 'NF-1020', contract: 'CTR-2022/105', order: 'PED-7744' 
  },
  { 
    id: 'mov-4', type: 'SAIDA', materialId: 'm2', quantity: 50, date: '2023-11-29', responsible: 'Carlos Administrador', recipient: 'Maria Engenharia',
    requestId: 'ID_00002', ticket: 'CH-12345'
  },
  { 
    id: 'mov-5', type: 'DEVOLUCAO', materialId: 'm1', quantity: 1, date: '2023-11-30', responsible: 'Carlos Administrador', deliveredBy: 'João da Silva',
    ticket: 'Obs: Material sobrou'
  },
];
