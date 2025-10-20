import React, { useState } from 'react';
import { Layout, Menu, Button, Typography, Avatar, Dropdown } from 'antd';
import { 
  UserOutlined, 
  LogoutOutlined,
  DashboardOutlined,
  TeamOutlined,
  BankOutlined,
  BarChartOutlined,
  FileTextOutlined,
  SettingOutlined,
  MonitorOutlined,
  CheckSquareOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import UserManagement from '../components/admin/UserManagement';
import CompanyManagement from '../components/manager/CompanyManagement';
import SummaryReport from '../components/manager/SummaryReport';
import SentimentAnalysis from '../components/manager/SentimentAnalysis';
import SourcesAnalysis from '../components/manager/SourcesAnalysis';
import GeographyAnalysis from '../components/manager/GeographyAnalysis';
import SourceManagement from '../components/moderator/SourceManagement';
import ReviewManagement from '../components/moderator/ReviewManagement';
import TaskManagement from '../components/moderator/TaskManagement';
import MyTasks from '../components/specialist/MyTasks';
import MyStatistics from '../components/specialist/MyStatistics';
import Profile from '../components/common/Profile';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
  const [selectedKey, setSelectedKey] = useState('dashboard');
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUserMenuClick = ({ key }) => {
    if (key === 'logout') {
      handleLogout();
    } else {
      setSelectedKey(key);
    }
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Профиль',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Выйти',
      onClick: handleLogout,
    },
  ];

  // Меню в зависимости от роли пользователя
  const getMenuItems = () => {
  const baseItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Главная',
    },
  ];

    switch (user?.role) {
      case 'admin':
        return [
          ...baseItems,
          {
            key: 'users',
            icon: <TeamOutlined />,
            label: 'Управление пользователями',
          },
        ];
      
      case 'manager':
        return [
          ...baseItems,
          {
            key: 'companies',
            icon: <BankOutlined />,
            label: 'Управление компаниями',
          },
          {
            key: 'summary-report',
            icon: <BarChartOutlined />,
            label: 'Сводный отчет',
          },
          {
            key: 'sentiment',
            icon: <BarChartOutlined />,
            label: 'Тональность',
          },
          {
            key: 'sources-analysis',
            icon: <MonitorOutlined />,
            label: 'Источники',
          },
          {
            key: 'geography',
            icon: <GlobalOutlined />,
            label: 'География',
          },
        ];
      
      case 'moderator':
        return [
          ...baseItems,
          {
            key: 'sources',
            icon: <MonitorOutlined />,
            label: 'Источники',
          },
          {
            key: 'reviews',
            icon: <FileTextOutlined />,
            label: 'Отзывы',
          },
          {
            key: 'tasks',
            icon: <CheckSquareOutlined />,
            label: 'Задачи',
          },
        ];
      
      case 'specialist':
        return [
          ...baseItems,
          {
            key: 'my-tasks',
            icon: <CheckSquareOutlined />,
            label: 'Мои задачи',
          },
          {
            key: 'statistics',
            icon: <BarChartOutlined />,
            label: 'Моя статистика',
          },
        ];
      
      default:
        return baseItems;
    }
  };

  const getRoleTitle = () => {
    const roleTitles = {
      admin: 'Администратор',
      manager: 'Управляющий',
      moderator: 'Модератор',
      specialist: 'Специалист'
    };
    return roleTitles[user?.role] || 'Пользователь';
  };

  const renderContent = () => {
    switch (selectedKey) {
      case 'users':
        return <UserManagement />;
      case 'companies':
        return <CompanyManagement />;
      case 'summary-report':
        return <SummaryReport />;
      case 'sentiment':
        return <SentimentAnalysis />;
      case 'sources-analysis':
        return <SourcesAnalysis />;
      case 'geography':
        return <GeographyAnalysis />;
      case 'sources':
        return <SourceManagement />;
      case 'reviews':
        return <ReviewManagement />;
      case 'tasks':
        return <TaskManagement />;
      case 'my-tasks':
        return <MyTasks />;
      case 'statistics':
        return <MyStatistics />;
      case 'profile':
        return <Profile />;
      case 'dashboard':
        return (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Title level={2}>Добро пожаловать, {user?.name}!</Title>
            <Text type="secondary" style={{ fontSize: '16px' }}>
              Вы вошли в систему как {getRoleTitle()}
            </Text>
            <div style={{ marginTop: '24px' }}>
              <Text type="secondary">
                Выберите раздел в меню слева для начала работы
              </Text>
            </div>
          </div>
        );
      default:
        return (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Title level={2}>Раздел в разработке</Title>
            <Text type="secondary">
              Данный раздел будет доступен в следующих версиях
            </Text>
          </div>
        );
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="dashboard-header" style={{ 
        padding: '0 24px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
            Система управления репутацией
          </Title>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Text strong>{getRoleTitle()}</Text>
          <Dropdown
            menu={{ 
              items: userMenuItems,
              onClick: handleUserMenuClick
            }}
            placement="bottomRight"
            arrow
          >
            <Button type="text" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Avatar icon={<UserOutlined />} />
              {user?.name}
            </Button>
          </Dropdown>
        </div>
      </Header>

      <Layout>
        <Sider 
          className="dashboard-sidebar"
          width={200}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            style={{ height: '100%', borderRight: 0 }}
            items={getMenuItems()}
            onClick={({ key }) => setSelectedKey(key)}
          />
        </Sider>

        <Layout className="dashboard-content" style={{ padding: '24px' }}>
          <Content className="fade-in" style={{ 
            background: '#fff', 
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
