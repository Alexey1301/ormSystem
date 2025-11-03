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
  Timeline
} from 'antd';
import { 
  CheckSquareOutlined,
  ClockCircleOutlined,
  StarOutlined,
  MessageOutlined,
  TrophyOutlined,
  FireOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const SpecialistDashboard = () => {
  // Mock данные для специалиста
  const stats = {
    totalTasks: 67,
    completedTasks: 58,
    inProgressTasks: 7,
    overdueTasks: 2,
    averageRating: 4.8,
    responseTime: '1.8 часа',
    satisfactionRate: 96,
    streakDays: 18
  };

  const recentTasks = [
    {
      id: 1,
      title: 'Обработка негативного отзыва',
      priority: 'high',
      status: 'in_progress',
      deadline: '2025-10-20 18:00',
      company: 'ООО "ТехноСервис"',
      progress: 60
    },
    {
      id: 2,
      title: 'Ответ на положительный отзыв',
      priority: 'medium',
      status: 'completed',
      deadline: '2025-10-19 12:00',
      company: 'ИП Петров',
      progress: 100
    },
    {
      id: 3,
      title: 'Работа с жалобой на качество',
      priority: 'critical',
      status: 'new',
      deadline: '2025-10-18 18:00',
      company: 'ООО "СтройМатериалы"',
      progress: 0
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Специалист месяца',
      description: 'Лучший результат по обработке отзывов',
      date: '2024-01-01',
      icon: <TrophyOutlined style={{ color: '#faad14' }} />
    },
    {
      id: 2,
      title: 'Быстрый ответ',
      description: 'Среднее время ответа менее 2 часов',
      date: '2024-01-10',
      icon: <FireOutlined style={{ color: '#ff4d4f' }} />
    },
    {
      id: 3,
      title: 'Высокий рейтинг',
      description: 'Средняя оценка работы 4.5+',
      date: '2024-01-05',
      icon: <StarOutlined style={{ color: '#52c41a' }} />
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return '#ff4d4f';
      case 'high': return '#ff7875';
      case 'medium': return '#faad14';
      case 'low': return '#52c41a';
      default: return 'default';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'critical': return 'Критический';
      case 'high': return 'Высокий';
      case 'medium': return 'Средний';
      case 'low': return 'Низкий';
      default: return priority;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'blue';
      case 'in_progress': return 'orange';
      case 'completed': return 'green';
      case 'overdue': return 'red';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'new': return 'Новая';
      case 'in_progress': return 'В работе';
      case 'completed': return 'Выполнена';
      case 'overdue': return 'Просрочена';
      default: return status;
    }
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Добро пожаловать, Специалист!</Title>
        <Text type="secondary">Ваши задачи, статистика работы и личные достижения</Text>
      </div>

      {/* Приветственная информация */}
      <Card style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', color: '#333' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={3} style={{ color: '#333', margin: 0 }}>
              Ваш рабочий центр
            </Title>
            <Text style={{ color: 'rgba(51,51,51,0.8)', fontSize: '16px' }}>
              Управление задачами, отслеживание прогресса и мотивация к достижениям
            </Text>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
              {stats.totalTasks} задач
            </div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              в работе
            </div>
          </div>
        </div>
      </Card>

      {/* Основная статистика */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Всего задач"
              value={stats.totalTasks}
              prefix={<CheckSquareOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Text type="secondary">
                В работе: {stats.inProgressTasks}
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Выполнено"
              value={stats.completedTasks}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Text type="secondary">
                Серия: {stats.streakDays} дней
              </Text>
            </div>
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
            <div style={{ marginTop: '8px' }}>
              <Text type="secondary">
                Время ответа: {stats.responseTime}
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Удовлетворенность"
              value={stats.satisfactionRate}
              suffix="%"
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Text type="secondary">
                Просрочено: {stats.overdueTasks}
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Текущие задачи */}
        <Col xs={24} lg={12}>
          <Card title="Текущие задачи">
            <Space direction="vertical" style={{ width: '100%' }}>
              {recentTasks.map((task) => (
                <div key={task.id} style={{ 
                  padding: '12px',
                  border: '1px solid #f0f0f0',
                  borderRadius: '6px',
                  background: '#fafafa'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <Text strong>{task.title}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {task.company} • до {task.deadline}
                      </Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Tag color={getPriorityColor(task.priority)}>
                        {getPriorityText(task.priority)}
                      </Tag>
                      <Tag color={getStatusColor(task.status)}>
                        {getStatusText(task.status)}
                      </Tag>
                    </div>
                  </div>
                  <Progress 
                    percent={task.progress} 
                    size="small" 
                    status={task.progress === 100 ? 'success' : 'active'}
                  />
                </div>
              ))}
            </Space>
          </Card>
        </Col>

        {/* Достижения */}
        <Col xs={24} lg={12}>
          <Card title="Достижения">
            <Timeline>
              {achievements.map((achievement) => (
                <Timeline.Item
                  key={achievement.id}
                  dot={achievement.icon}
                >
                  <div>
                    <Text strong>{achievement.title}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {achievement.description}
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '11px' }}>
                      {achievement.date}
                    </Text>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
      </Row>

      {/* Прогресс работы */}
      <Card title="Прогресс работы" style={{ marginTop: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '8px' }}>
                <Text strong>Выполнение задач</Text>
              </div>
              <Progress 
                type="circle" 
                percent={Math.round((stats.completedTasks / stats.totalTasks) * 100)} 
                size={80}
                strokeColor="#52c41a"
              />
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '8px' }}>
                <Text strong>Качество работы</Text>
              </div>
              <Progress 
                type="circle" 
                percent={Math.round((stats.averageRating / 5) * 100)} 
                size={80}
                strokeColor="#faad14"
              />
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '8px' }}>
                <Text strong>Удовлетворенность</Text>
              </div>
              <Progress 
                type="circle" 
                percent={stats.satisfactionRate} 
                size={80}
                strokeColor="#722ed1"
              />
            </div>
          </Col>
        </Row>
      </Card>

      {/* Быстрые действия */}
      <Card title="Быстрые действия" style={{ marginTop: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={6}>
            <Button type="primary" block icon={<CheckSquareOutlined />}>
              Мои задачи
            </Button>
          </Col>
          <Col xs={24} sm={6}>
            <Button block icon={<StarOutlined />}>
              Моя статистика
            </Button>
          </Col>
          <Col xs={24} sm={6}>
            <Button block icon={<MessageOutlined />}>
              Новые отзывы
            </Button>
          </Col>
          <Col xs={24} sm={6}>
            <Button block icon={<TrophyOutlined />}>
              Достижения
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Мотивация и достижения */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="Ваши достижения">
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Выполнено задач:</Text> 
              <Tag color="green" style={{ marginLeft: '8px' }}>{stats.completedTasks}</Tag>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Средний рейтинг:</Text> 
              <Tag color="gold" style={{ marginLeft: '8px' }}>{stats.averageRating}/5</Tag>
            </div>
            <div>
              <Text strong>Время ответа:</Text> 
              <Tag color="blue" style={{ marginLeft: '8px' }}>{stats.responseTime}</Tag>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Мотивация">
            <div style={{ marginBottom: '12px' }}>
              <Text>🎯 Вы на правильном пути! Продолжайте в том же духе</Text>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <Text>⚡ Быстрые ответы повышают удовлетворенность клиентов</Text>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <Text>🏆 Качественная работа ведет к карьерному росту</Text>
            </div>
            <div>
              <Text>💡 Изучайте новые техники работы с клиентами</Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SpecialistDashboard;
