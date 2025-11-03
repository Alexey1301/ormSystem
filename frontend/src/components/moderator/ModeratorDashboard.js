import React from 'react';
import { 
  Card, 
  Typography,
  Row,
  Col,
  Statistic,
  Progress,
  Space,
  Button,
  Tag,
  List
} from 'antd';
import { 
  MonitorOutlined,
  FileTextOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const ModeratorDashboard = () => {
  // Mock данные для модератора
  const stats = {
    totalSources: 12,
    activeSources: 10,
    totalReviews: 1242,
    pendingReviews: 43,
    processedToday: 67,
    tasksAssigned: 28,
    tasksCompleted: 22
  };

  const recentReviews = [
    {
      id: 1,
      author: 'Анна Петрова',
      text: 'Отличный сервис! Быстро и качественно выполнили заказ.',
      rating: 5,
      source: 'Google Maps',
      company: 'ООО "ТехноСервис"',
      date: '2025-10-19 14:30',
      status: 'new'
    },
    {
      id: 2,
      author: 'Михаил Сидоров',
      text: 'Очень недоволен качеством товара. Требую возврат денег!',
      rating: 1,
      source: 'Yandex',
      company: 'ИП Иванов',
      date: '2025-10-19 12:15',
      status: 'in_progress'
    },
    {
      id: 3,
      author: 'Елена Козлова',
      text: 'Сервис нормальный, но можно было бы быстрее.',
      rating: 3,
      source: '2GIS',
      company: 'ООО "СтройМатериалы"',
      date: '2025-10-19 10:45',
      status: 'processed'
    }
  ];

  const systemStatus = [
    { name: 'Google Maps', status: 'active', lastUpdate: '2 мин назад', reviews: 45 },
    { name: 'Yandex', status: 'active', lastUpdate: '5 мин назад', reviews: 32 },
    { name: '2GIS', status: 'active', lastUpdate: '1 мин назад', reviews: 28 },
    { name: 'Отзовик', status: 'inactive', lastUpdate: '2 часа назад', reviews: 0 },
    { name: 'Яндекс.Карты', status: 'active', lastUpdate: '3 мин назад', reviews: 18 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'blue';
      case 'in_progress': return 'orange';
      case 'processed': return 'green';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'new': return 'Новый';
      case 'in_progress': return 'В работе';
      case 'processed': return 'Обработан';
      default: return status;
    }
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Добро пожаловать, Модератор!</Title>
        <Text type="secondary">Управление источниками, обработка отзывов и контроль качества</Text>
      </div>

      {/* Приветственная информация */}
      <Card style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={3} style={{ color: 'white', margin: 0 }}>
              Центр модерации
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
              Мониторинг источников, обработка отзывов и управление задачами
            </Text>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {stats.totalSources} источников
            </div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              под контролем
            </div>
          </div>
        </div>
      </Card>

      {/* Основная статистика */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Источники"
              value={stats.totalSources}
              prefix={<MonitorOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Text type="secondary">
                Активных: {stats.activeSources}
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Отзывы"
              value={stats.totalReviews}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Text type="secondary">
                Ожидают: {stats.pendingReviews}
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Задачи"
              value={stats.tasksAssigned}
              prefix={<CheckSquareOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Text type="secondary">
                Выполнено: {stats.tasksCompleted}
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Обработано сегодня"
              value={stats.processedToday}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Статус источников */}
        <Col xs={24} lg={12}>
          <Card title="Статус источников">
            <Space direction="vertical" style={{ width: '100%' }}>
              {systemStatus.map((source, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px',
                  border: '1px solid #f0f0f0',
                  borderRadius: '6px',
                  background: source.status === 'active' ? '#f6ffed' : '#fff2f0'
                }}>
                  <div>
                    <Text strong>{source.name}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {source.lastUpdate} • {source.reviews} отзывов
                    </Text>
                  </div>
                  <Tag color={source.status === 'active' ? 'green' : 'red'}>
                    {source.status === 'active' ? 'Активен' : 'Неактивен'}
                  </Tag>
                </div>
              ))}
            </Space>
          </Card>
        </Col>

        {/* Последние отзывы */}
        <Col xs={24} lg={12}>
          <Card title="Последние отзывы">
            <Space direction="vertical" style={{ width: '100%' }}>
              {recentReviews.map((review) => (
                <div key={review.id} style={{ 
                  padding: '12px',
                  border: '1px solid #f0f0f0',
                  borderRadius: '6px',
                  background: '#fafafa'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <Text strong>{review.author}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {review.source} • {review.company}
                      </Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Tag color={getStatusColor(review.status)}>
                        {getStatusText(review.status)}
                      </Tag>
                      <Text style={{ color: '#faad14' }}>{review.rating}⭐</Text>
                    </div>
                  </div>
                  <Text style={{ fontSize: '13px', fontStyle: 'italic' }}>
                    "{review.text.substring(0, 80)}..."
                  </Text>
                  <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                    {review.date}
                  </div>
                </div>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Прогресс работы */}
      <Card title="Прогресс работы" style={{ marginTop: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '8px' }}>
                <Text strong>Обработка отзывов</Text>
              </div>
              <Progress 
                type="circle" 
                percent={Math.round((stats.processedToday / (stats.processedToday + stats.pendingReviews)) * 100)} 
                size={80}
                strokeColor="#52c41a"
              />
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '8px' }}>
                <Text strong>Выполнение задач</Text>
              </div>
              <Progress 
                type="circle" 
                percent={Math.round((stats.tasksCompleted / stats.tasksAssigned) * 100)} 
                size={80}
                strokeColor="#1890ff"
              />
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '8px' }}>
                <Text strong>Активность источников</Text>
              </div>
              <Progress 
                type="circle" 
                percent={Math.round((stats.activeSources / stats.totalSources) * 100)} 
                size={80}
                strokeColor="#faad14"
              />
            </div>
          </Col>
        </Row>
      </Card>

      {/* Быстрые действия */}
      <Card title="Быстрые действия" style={{ marginTop: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={6}>
            <Button type="primary" block icon={<MonitorOutlined />}>
              Управление источниками
            </Button>
          </Col>
          <Col xs={24} sm={6}>
            <Button block icon={<FileTextOutlined />}>
              Обработка отзывов
            </Button>
          </Col>
          <Col xs={24} sm={6}>
            <Button block icon={<CheckSquareOutlined />}>
              Управление задачами
            </Button>
          </Col>
          <Col xs={24} sm={6}>
            <Button block icon={<SyncOutlined />}>
              Запустить сбор
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Полезная информация */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="Статус системы">
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Активных источников:</Text> 
              <Tag color="green" style={{ marginLeft: '8px' }}>{stats.activeSources}/{stats.totalSources}</Tag>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Ожидают обработки:</Text> 
              <Tag color="orange" style={{ marginLeft: '8px' }}>{stats.pendingReviews} отзывов</Tag>
            </div>
            <div>
              <Text strong>Обработано сегодня:</Text> 
              <Tag color="blue" style={{ marginLeft: '8px' }}>{stats.processedToday} отзывов</Tag>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Рекомендации">
            <div style={{ marginBottom: '12px' }}>
              <Text>• Проверяйте статус источников ежедневно</Text>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <Text>• Обрабатывайте негативные отзывы в приоритете</Text>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <Text>• Назначайте задачи специалистам своевременно</Text>
            </div>
            <div>
              <Text>• Мониторьте качество работы команды</Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ModeratorDashboard;
