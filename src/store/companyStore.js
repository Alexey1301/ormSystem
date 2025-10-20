import { create } from 'zustand';

const useCompanyStore = create((set, get) => ({
  // Состояние
  companies: [
    {
      id: 1,
      name: 'ООО "ТехноИнновации"',
      industry: 'IT',
      website: 'https://techinnovations.ru',
      description: 'Разработка программного обеспечения',
      status: 'active',
      createdAt: '2025-10-01'
    },
    {
      id: 2,
      name: 'ИП Иванов И.И.',
      industry: 'Услуги',
      website: 'https://ivanov-services.ru',
      description: 'Консалтинговые услуги',
      status: 'active',
      createdAt: '2025-10-05'
    },
    {
      id: 3,
      name: 'АО "МедиаГрупп"',
      industry: 'Медиа',
      website: 'https://mediagroup.ru',
      description: 'Медиа и реклама',
      status: 'inactive',
      createdAt: '2025-10-10'
    }
  ],
  loading: false,

  // Действия
  addCompany: async (companyData) => {
    set({ loading: true });
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newCompany = {
      id: Date.now(),
      ...companyData,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0]
    };
    
    set(state => ({
      companies: [...state.companies, newCompany],
      loading: false
    }));
    
    return { success: true, company: newCompany };
  },

  updateCompany: async (companyId, companyData) => {
    set({ loading: true });
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set(state => ({
      companies: state.companies.map(company => 
        company.id === companyId ? { ...company, ...companyData } : company
      ),
      loading: false
    }));
    
    return { success: true };
  },

  deleteCompany: async (companyId) => {
    set({ loading: true });
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set(state => ({
      companies: state.companies.filter(company => company.id !== companyId),
      loading: false
    }));
    
    return { success: true };
  },

  getCompanyById: (companyId) => {
    const { companies } = get();
    return companies.find(company => company.id === companyId);
  }
}));

export default useCompanyStore;
