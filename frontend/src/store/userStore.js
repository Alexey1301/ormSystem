import { create } from 'zustand';

const useUserStore = create((set, get) => ({
  // Состояние
  users: [
    {
      id: 1,
      name: 'Администратор Системы',
      email: 'admin@company.com',
      role: 'admin',
      status: 'active',
      createdAt: '2025-10-01',
      lastLogin: '2025-10-19'
    },
    {
      id: 2,
      name: 'Иван Петров',
      email: 'manager@company.com',
      role: 'manager',
      status: 'active',
      createdAt: '2025-10-02',
      lastLogin: '2025-10-18'
    },
    {
      id: 3,
      name: 'Анна Смирнова',
      email: 'moderator@company.com',
      role: 'moderator',
      status: 'active',
      createdAt: '2025-10-03',
      lastLogin: '2025-10-17'
    },
    {
      id: 4,
      name: 'Михаил Козлов',
      email: 'specialist@company.com',
      role: 'specialist',
      status: 'active',
      createdAt: '2025-10-04',
      lastLogin: '2025-10-16'
    }
  ],
  loading: false,

  // Действия
  addUser: async (userData) => {
    set({ loading: true });
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = {
      id: Date.now(),
      ...userData,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: null
    };
    
    set(state => ({
      users: [...state.users, newUser],
      loading: false
    }));
    
    return { success: true, user: newUser };
  },

  updateUser: async (userId, userData) => {
    set({ loading: true });
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set(state => ({
      users: state.users.map(user => 
        user.id === userId ? { ...user, ...userData } : user
      ),
      loading: false
    }));
    
    return { success: true };
  },

  deleteUser: async (userId) => {
    set({ loading: true });
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set(state => ({
      users: state.users.filter(user => user.id !== userId),
      loading: false
    }));
    
    return { success: true };
  },

  getUserById: (userId) => {
    const { users } = get();
    return users.find(user => user.id === userId);
  }
}));

export default useUserStore;
