import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  // Состояние авторизации
  isAuthenticated: false,
  user: null,
  loading: false,
  
  // Действия
  login: async (credentials) => {
    set({ loading: true });
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock данные пользователей
    const mockUsers = {
      'admin@company.com': { 
        id: 1, 
        email: 'admin@company.com', 
        name: 'Администратор Системы', 
        role: 'admin',
        password: 'admin123'
      },
      'manager@company.com': { 
        id: 2, 
        email: 'manager@company.com', 
        name: 'Иван Петров', 
        role: 'manager',
        password: 'manager123'
      },
      'moderator@company.com': { 
        id: 3, 
        email: 'moderator@company.com', 
        name: 'Анна Смирнова', 
        role: 'moderator',
        password: 'moderator123'
      },
      'specialist@company.com': { 
        id: 4, 
        email: 'specialist@company.com', 
        name: 'Михаил Козлов', 
        role: 'specialist',
        password: 'specialist123'
      }
    };
    
    const user = mockUsers[credentials.email];
    
    if (user && user.password === credentials.password) {
      set({ 
        isAuthenticated: true, 
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
        loading: false 
      });
      return { success: true };
    } else {
      set({ loading: false });
      return { success: false, error: 'Неверные учетные данные' };
    }
  },
  
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
  
  resetPassword: async (email) => {
    set({ loading: true });
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set({ loading: false });
    return { success: true, message: 'Инструкции по сбросу пароля отправлены на email' };
  }
}));

export default useAuthStore;
