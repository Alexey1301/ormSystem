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
  Tag
} from 'antd';
import { 
  ApartmentOutlined,
  RiseOutlined,
  FallOutlined,
  StarOutlined,
  MessageOutlined,
  TeamOutlined,
  BarChartOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const ManagerDashboard = () => {
  // Mock данные для менеджера
  const stats = {
    totalCompanies: 18,
    activeCompanies: 15,
    totalReviews: 2847,
    averageRating: 4.3,
    positiveReviews: 1956,
    negativeReviews: 224,
    neutralReviews: 667
  };

  const recentActivity = [
    {
      id: 1,
      company: 'ООО "ТехноСервис"',
      action: 'Новый отзыв',
      rating: 5,
      date: '2025-10-19 14:30',
      type: 'positive'
    },
    {
      id: 2,
      company: 'ИП Иванов',
      action: 'Обработан негативный отзыв',
      rating: 2,
      date: '2025-10-19 12:15',
      type: 'negative'
    },
    {
      id: 3,
      company: 'ООО "СтройМатериалы"',
      action: 'Обновлена статистика',
      rating: 4,
      date: '2025-10-19 10:45',
      type: 'neutral'
    }
  ];

  const topCompanies = [
    { name: 'ООО "ТехноСервис"', rating: 4.8, reviews: 156, trend: 'up' },
    { name: 'ИП Петров', rating: 4.6, reviews: 89, trend: 'up' },
    { name: 'ООО "СтройМатериалы"', rating: 4.4, reviews: 203, trend: 'down' },
    { name: 'ООО "Логистик"', rating: 4.2, reviews: 78, trend: 'up' }
  ];

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return '#52c41a';
    if (rating >= 3.5) return '#faad14';
    return '#ff4d4f';
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 
      <RiseOutlined style={{ color: '#52c41a' }} /> : 
      <FallOutlined style={{ color: '#ff4d4f' }} />;
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Добро пожаловать, Менеджер!</Title>
        <Text type="secondary">Управление компаниями, анализ репутации и контроль качества</Text>
      </div>

      {/* Приветственная информация */}
      <Card style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={3} style={{ color: 'white', margin: 0 }}>
              Аналитика репутации
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
              Мониторинг отзывов, управление компаниями и анализ трендов
            </Text>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {stats.totalCompanies} компаний
            </div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              под управлением
            </div>
          </div>
        </div>
      </Card>

      {/* Основная статистика */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Всего компаний"
              value={stats.totalCompanies}
              prefix={<ApartmentOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Активных компаний"
              value={stats.activeCompanies}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Всего отзывов"
              value={stats.totalReviews}
              prefix={<MessageOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Средний рейтинг"
              value={stats.averageRating}
              prefix={<StarOutlined />}
              precision={1}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Анализ отзывов */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="Распределение отзывов">
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text>Положительные</Text>
                <Text strong>{stats.positiveReviews}</Text>
              </div>
              <Progress 
                percent={Math.round((stats.positiveReviews / stats.totalReviews) * 100)} 
                strokeColor="#52c41a"
                showInfo={false}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text>Нейтральные</Text>
                <Text strong>{stats.neutralReviews}</Text>
              </div>
              <Progress 
                percent={Math.round((stats.neutralReviews / stats.totalReviews) * 100)} 
                strokeColor="#faad14"
                showInfo={false}
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text>Негативные</Text>
                <Text strong>{stats.negativeReviews}</Text>
              </div>
              <Progress 
                percent={Math.round((stats.negativeReviews / stats.totalReviews) * 100)} 
                strokeColor="#ff4d4f"
                showInfo={false}
              />
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Топ компании по рейтингу">
            <Space direction="vertical" style={{ width: '100%' }}>
              {topCompanies.map((company, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: index < topCompanies.length - 1 ? '1px solid #f0f0f0' : 'none'
                }}>
                  <div>
                    <Text strong>{company.name}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {company.reviews} отзывов
                    </Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Text style={{ color: getRatingColor(company.rating), fontWeight: 'bold' }}>
                      {company.rating}
                    </Text>
                    {getTrendIcon(company.trend)}
                  </div>
                </div>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Последняя активность */}
      <Card title="Последняя активность">
        <Space direction="vertical" style={{ width: '100%' }}>
          {recentActivity.map((activity) => (
            <div key={activity.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '12px',
              border: '1px solid #f0f0f0',
              borderRadius: '6px',
              background: '#fafafa'
            }}>
              <div>
                <Text strong>{activity.company}</Text>
                <br />
                <Text type="secondary">{activity.action}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Tag color={activity.type === 'positive' ? 'green' : activity.type === 'negative' ? 'red' : 'orange'}>
                  {activity.rating}⭐
                </Tag>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  {activity.date}
                </Text>
              </div>
            </div>
          ))}
        </Space>
      </Card>

      {/* Быстрые действия */}
      <Card title="Быстрые действия" style={{ marginTop: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={6}>
            <Button type="primary" block icon={<ApartmentOutlined />}>
              Добавить компанию
            </Button>
          </Col>
          <Col xs={24} sm={6}>
            <Button block icon={<BarChartOutlined />}>
              Аналитика
            </Button>
          </Col>
          <Col xs={24} sm={6}>
            <Button block icon={<TeamOutlined />}>
              Управление
            </Button>
          </Col>
          <Col xs={24} sm={6}>
            <Button block icon={<MessageOutlined />}>
              Отчеты
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Полезная информация */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="Ключевые метрики">
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Средний рейтинг:</Text> 
              <Tag color="green" style={{ marginLeft: '8px' }}>{stats.averageRating}/5</Tag>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Положительных отзывов:</Text> 
              <Tag color="green" style={{ marginLeft: '8px' }}>{Math.round((stats.positiveReviews / stats.totalReviews) * 100)}%</Tag>
            </div>
            <div>
              <Text strong>Обработано за месяц:</Text> 
              <Tag color="blue" style={{ marginLeft: '8px' }}>{stats.totalReviews} отзывов</Tag>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Рекомендации">
            <div style={{ marginBottom: '12px' }}>
              <Text>• Анализируйте тренды отзывов еженедельно</Text>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <Text>• Отслеживайте негативные отзывы в реальном времени</Text>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <Text>• Сравнивайте показатели между компаниями</Text>
            </div>
            <div>
              <Text>• Генерируйте отчеты для руководства</Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ManagerDashboard;
