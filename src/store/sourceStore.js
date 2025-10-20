import { create } from 'zustand';

const useSourceStore = create((set, get) => ({
  // Состояние
  sources: [
    {
      id: 1,
      name: 'Google Maps',
      type: 'maps',
      status: 'active',
      lastCollection: '2025-10-19 10:30',
      reviewsCount: 245,
      isEnabled: true
    },
    {
      id: 2,
      name: 'Yandex Карты',
      type: 'maps',
      status: 'active',
      lastCollection: '2025-10-19 09:45',
      reviewsCount: 189,
      isEnabled: true
    },
    {
      id: 3,
      name: '2GIS',
      type: 'maps',
      status: 'active',
      lastCollection: '2025-10-19 11:15',
      reviewsCount: 156,
      isEnabled: true
    },
    {
      id: 4,
      name: 'Отзовик',
      type: 'review_site',
      status: 'inactive',
      lastCollection: '2025-10-15 14:20',
      reviewsCount: 78,
      isEnabled: false
    },
    {
      id: 5,
      name: 'Яндекс.Отзывы',
      type: 'review_site',
      status: 'active',
      lastCollection: '2025-10-19 12:00',
      reviewsCount: 134,
      isEnabled: true
    }
  ],
  loading: false,

  // Действия
  updateSource: async (sourceId, sourceData) => {
    set({ loading: true });
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set(state => ({
      sources: state.sources.map(source => 
        source.id === sourceId ? { ...source, ...sourceData } : source
      ),
      loading: false
    }));
    
    return { success: true };
  },

  toggleSource: async (sourceId) => {
    const { sources } = get();
    const source = sources.find(s => s.id === sourceId);
    if (source) {
      return await get().updateSource(sourceId, { 
        isEnabled: !source.isEnabled,
        status: !source.isEnabled ? 'active' : 'inactive'
      });
    }
    return { success: false };
  },

  startCollection: async (sourceIds) => {
    set({ loading: true });
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    set(state => ({
      sources: state.sources.map(source => 
        sourceIds.includes(source.id) 
          ? { 
              ...source, 
              status: 'collecting',
              lastCollection: new Date().toISOString().slice(0, 16).replace('T', ' ')
            }
          : source
      ),
      loading: false
    }));
    
    return { success: true };
  },

  getSourceById: (sourceId) => {
    const { sources } = get();
    return sources.find(source => source.id === sourceId);
  }
}));

export default useSourceStore;
