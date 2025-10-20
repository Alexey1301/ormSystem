import React, { useState } from 'react';
import { 
  Card, 
  Typography,
  Row,
  Col,
  Statistic,
  Progress,
  Select,
  DatePicker
} from 'antd';
import { 
  CheckCircleOutlined,
  ClockCircleOutlined,
  MessageOutlined,
  StarOutlined,
  TrophyOutlined,
  RiseOutlined
} from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// const { } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const MyStatistics = () => {
  const [dateRange, setDateRange] = useState(null);

  // Mock данные для статистики
  const statsData = {
    totalTasks: 45,
    completedTasks: 38,
    inProgressTasks: 5,
    overdueTasks: 2,
    averageRating: 4.2,
    responseTime: '2.5 часа',
    satisfactionRate: 87
  };

  // Данные для графика производительности
  const performanceData = [
    { date: '2024-01-08', tasks: 3, completed: 2 },
    { date: '2024-01-09', tasks: 5, completed: 4 },
    { date: '2024-01-10', tasks: 4, completed: 4 },
    { date: '2024-01-11', tasks: 6, completed: 5 },
    { date: '2024-01-12', tasks: 4, completed: 3 },
    { date: '2024-01-13', tasks: 7, completed: 6 },
    { date: '2024-01-14', tasks: 5, completed: 5 },
    { date: '2024-01-15', tasks: 8, completed: 7 }
  ];

  // Данные для круговой диаграммы по типам задач
  const taskTypesData = [
    { name: 'Негативные отзывы', value: 15, color: '#ff4d4f' },
    { name: 'Положительные отзывы', value: 12, color: '#52c41a' },
    { name: 'Нейтральные отзывы', value: 8, color: '#faad14' },
    { name: 'Жалобы', value: 10, color: '#ff7875' }
  ];


  return (
    <div className="fade-in">
      {/* Общая статистика */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Всего задач"
              value={statsData.totalTasks}
              prefix={<MessageOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Выполнено"
              value={statsData.completedTasks}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="В работе"
              value={statsData.inProgressTasks}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Средний рейтинг"
              value={statsData.averageRating}
              prefix={<StarOutlined />}
              precision={1}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Детальная статистика */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="Эффективность работы" extra={<TrophyOutlined />}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Выполнение задач</span>
                <span>{Math.round((statsData.completedTasks / statsData.totalTasks) * 100)}%</span>
              </div>
              <Progress 
                percent={Math.round((statsData.completedTasks / statsData.totalTasks) * 100)} 
                status="active"
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Удовлетворенность клиентов</span>
                <span>{statsData.satisfactionRate}%</span>
              </div>
              <Progress 
                percent={statsData.satisfactionRate} 
                status="active"
                strokeColor="#52c41a"
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Среднее время ответа</span>
                <span>{statsData.responseTime}</span>
              </div>
              <Progress 
                percent={75} 
                status="active"
                strokeColor="#1890ff"
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Распределение задач" extra={<RiseOutlined />}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={taskTypesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ marginTop: '16px' }}>
              {taskTypesData.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <div 
                    style={{ 
                      width: '12px', 
                      height: '12px', 
                      backgroundColor: item.color, 
                      marginRight: '8px',
                      borderRadius: '2px'
                    }} 
                  />
                  <span style={{ fontSize: '12px' }}>{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* График производительности */}
      <Card title="Динамика работы">
        <div style={{ marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <RangePicker 
            placeholder={['Дата от', 'Дата до']}
            value={dateRange}
            onChange={setDateRange}
          />
          <Select defaultValue="week" style={{ width: 120 }}>
            <Option value="week">Неделя</Option>
            <Option value="month">Месяц</Option>
            <Option value="quarter">Квартал</Option>
          </Select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="tasks" 
              stroke="#1890ff" 
              strokeWidth={2}
              name="Всего задач"
            />
            <Line 
              type="monotone" 
              dataKey="completed" 
              stroke="#52c41a" 
              strokeWidth={2}
              name="Выполнено"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default MyStatistics;
