import React from 'react';
import { 
  Card, 
  Typography,
  Row,
  Col,
  Statistic,
  Table,
  Tag,
  Space,
  Button
} from 'antd';
import { 
  UserOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  RiseOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const AdminDashboard = () => {
  // Mock данные для администратора
  const stats = {
    totalUsers: 187,
    activeUsers: 156,
    newUsers: 12,
    inactiveUsers: 31
  };

  const recentUsers = [
    {
      id: 1,
      name: 'Анна Петрова',
      role: 'manager',
      roleName: 'Менеджер',
      email: 'anna.petrova@company.com',
      status: 'active',
      lastLogin: '2025-10-19 14:30',
      joinDate: '2025-10-10'
    },
    {
      id: 2,
      name: 'Михаил Сидоров',
      role: 'moderator',
      roleName: 'Модератор',
      email: 'mikhail.sidorov@company.com',
      status: 'active',
      lastLogin: '2025-10-19 12:15',
      joinDate: '2025-10-08'
    },
    {
      id: 3,
      name: 'Елена Козлова',
      role: 'specialist',
      roleName: 'Специалист',
      email: 'elena.kozlova@company.com',
      status: 'inactive',
      lastLogin: '2025-10-18 16:45',
      joinDate: '2025-10-05'
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Неактивные пользователи',
      description: '3 пользователя не входили в систему более 7 дней',
      time: '1 час назад'
    },
    {
      id: 2,
      type: 'info',
      title: 'Новые пользователи',
      description: '3 новых пользователя зарегистрированы на этой неделе',
      time: '3 часа назад'
    },
    {
      id: 3,
      type: 'success',
      title: 'Система работает стабильно',
      description: 'Все сервисы функционируют в штатном режиме',
      time: '3 часа назад'
    }
  ];

  const columns = [
    {
      title: 'Пользователь',
      key: 'user',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{record.name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
        </div>
      ),
    },
    {
      title: 'Роль',
      dataIndex: 'roleName',
      key: 'roleName',
      render: (roleName) => (
        <Tag color="blue">{roleName}</Tag>
      ),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Активен' : 'Неактивен'}
        </Tag>
      ),
    },
    {
      title: 'Последний вход',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
    },
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
      case 'info':
        return <RiseOutlined style={{ color: '#1890ff' }} />;
      case 'success':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      default:
        return <ExclamationCircleOutlined />;
    }
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Добро пожаловать, Администратор!</Title>
        <Text type="secondary">Управление системой, пользователями и мониторинг работы</Text>
      </div>

      {/* Приветственная информация */}
      <Card style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={3} style={{ color: 'white', margin: 0 }}>
              Система управления репутацией
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
              Полный контроль над пользователями, ролями и системными процессами
            </Text>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {stats.totalUsers} пользователей
            </div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              в системе
            </div>
          </div>
        </div>
      </Card>

      {/* Статистика */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Всего пользователей"
              value={stats.totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Активных"
              value={stats.activeUsers}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Новых"
              value={stats.newUsers}
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Неактивных"
              value={stats.inactiveUsers}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Недавние пользователи */}
        <Col xs={24} lg={16}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TeamOutlined />
                <span>Недавние пользователи</span>
              </div>
            }
            extra={<Button type="link">Все пользователи</Button>}
          >
            <Table
              columns={columns}
              dataSource={recentUsers}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>

        {/* Системные уведомления */}
        <Col xs={24} lg={8}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ExclamationCircleOutlined />
                <span>Системные уведомления</span>
              </div>
            }
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              {systemAlerts.map((alert) => (
                <div key={alert.id} style={{ 
                  padding: '12px', 
                  border: '1px solid #f0f0f0', 
                  borderRadius: '6px',
                  background: '#fafafa'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    {getAlertIcon(alert.type)}
                    <Text strong style={{ marginLeft: '8px' }}>{alert.title}</Text>
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {alert.description}
                  </Text>
                  <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                    {alert.time}
                  </div>
                </div>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Быстрые действия */}
      <Card title="Быстрые действия" style={{ marginTop: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Button type="primary" block icon={<UserOutlined />}>
              Добавить пользователя
            </Button>
          </Col>
          <Col xs={24} sm={8}>
            <Button block icon={<TeamOutlined />}>
              Управление ролями
            </Button>
          </Col>
          <Col xs={24} sm={8}>
            <Button block icon={<CheckCircleOutlined />}>
              Аудит системы
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Полезные ссылки и информация */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="Системная информация">
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Версия системы:</Text> 1.0.0
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Последнее обновление:</Text> 15.01.2024
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Статус системы:</Text> 
              <Tag color="green" style={{ marginLeft: '8px' }}>Работает</Tag>
            </div>
            <div>
              <Text strong>Резервное копирование:</Text> 
              <Tag color="blue" style={{ marginLeft: '8px' }}>Автоматически</Tag>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Рекомендации">
            <div style={{ marginBottom: '12px' }}>
              <Text>• Регулярно проверяйте активность пользователей</Text>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <Text>• Настройте автоматические уведомления</Text>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <Text>• Проводите аудит прав доступа</Text>
            </div>
            <div>
              <Text>• Мониторьте системные логи</Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
