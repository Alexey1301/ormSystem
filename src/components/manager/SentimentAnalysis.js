import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Typography,
  Space,
  Button,
  Select,
  Input
} from 'antd';
import { 
  ArrowDownOutlined,
  DownloadOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  FilterOutlined
} from '@ant-design/icons';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const { Title } = Typography;
const { Option } = Select;

const SentimentAnalysis = () => {
  const [viewType, setViewType] = useState('chart');

  // Данные для круговой диаграммы тональности
  const sentimentData = [
    { name: 'Нейтрально', value: 6959, percentage: 79.78, color: '#d9d9d9' },
    { name: 'Позитив', value: 1050, percentage: 12.04, color: '#52c41a' },
    { name: 'Негатив', value: 714, percentage: 8.19, color: '#f5222d' }
  ];

  // Данные для динамики тональности
  const sentimentTrendData = [
    { date: '16.09', neutral: 1200, positive: 150, negative: 80 },
    { date: '17.09', neutral: 1400, positive: 200, negative: 120 },
    { date: '18.09', neutral: 1300, positive: 180, negative: 100 },
    { date: '19.09', neutral: 1100, positive: 160, negative: 90 },
    { date: '20.09', neutral: 600, positive: 100, negative: 60 },
    { date: '21.09', neutral: 1200, positive: 190, negative: 110 }
  ];

  return (
    <div className="fade-in">
      {/* Поиск и фильтры */}
      <Card size="small" style={{ marginBottom: '16px' }}>
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Input.Search
              placeholder="Поиск внутри темы"
              style={{ width: '100%' }}
              enterButton={<SearchOutlined />}
            />
          </Col>
          <Col>
            <Space>
              <Button>Вид ленты</Button>
              <Button icon={<FilterOutlined />}>
                Фильтры
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        {/* Левая колонка */}
        <Col span={12}>
          {/* Распределение по тональности */}
          <Card 
            title="Распределение по тональности"
            extra={
              <Button type="text" icon={<DownloadOutlined />} size="small" />
            }
            style={{ marginBottom: '16px' }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [value, name]}
                  labelStyle={{ color: '#333' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Легенда */}
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              {sentimentData.map((item, index) => (
                <div key={index} style={{ 
                  display: 'inline-block', 
                  margin: '0 8px',
                  fontSize: '12px'
                }}>
                  <span style={{ 
                    display: 'inline-block',
                    width: '12px',
                    height: '12px',
                    backgroundColor: item.color,
                    marginRight: '4px',
                    borderRadius: '2px'
                  }}></span>
                  {item.name}
                </div>
              ))}
            </div>
          </Card>

          {/* Таблица детальных данных */}
          <Card>
            <div style={{ marginBottom: '16px' }}>
              <Title level={5} style={{ margin: 0 }}>
                Детальная статистика
              </Title>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <th style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>#</th>
                  <th style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>Тональность</th>
                  <th style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>
                    Сообщений ↓
                  </th>
                  <th style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>%</th>
                </tr>
              </thead>
              <tbody>
                {sentimentData.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '8px' }}>{index + 1}</td>
                    <td style={{ padding: '8px' }}>
                      <span style={{ 
                        display: 'inline-block',
                        width: '12px',
                        height: '12px',
                        backgroundColor: item.color,
                        marginRight: '8px',
                        borderRadius: '2px'
                      }}></span>
                      {item.name}
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>
                      {item.value.toLocaleString()}
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>
                      {item.percentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Col>

        {/* Правая колонка */}
        <Col span={12}>
          {/* Лояльность */}
          <Card 
            title={
              <Space>
                Лояльность
                <Button type="text" icon={<QuestionCircleOutlined />} size="small" />
              </Space>
            }
            style={{ marginBottom: '16px' }}
          >
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <Statistic
                value={1.5}
                precision={1}
                valueStyle={{ 
                  fontSize: '48px',
                  color: '#1890ff',
                  fontWeight: 'bold'
                }}
              />
              <div style={{ 
                marginTop: '8px',
                color: '#f5222d',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                ↓-0.5
              </div>
            </div>
          </Card>

          {/* Динамика тональности */}
          <Card 
            title="Динамика тональности"
            extra={
              <Space>
                <Select defaultValue="days" size="small" style={{ width: 100 }}>
                  <Option value="days">по дням</Option>
                  <Option value="weeks">по неделям</Option>
                </Select>
                <Button type="text" icon={<DownloadOutlined />} size="small" />
              </Space>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sentimentTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  labelStyle={{ color: '#333' }}
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="neutral" 
                  stroke="#d9d9d9" 
                  strokeWidth={2}
                  name="Нейтрально"
                  dot={{ fill: '#d9d9d9', strokeWidth: 2, r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="positive" 
                  stroke="#52c41a" 
                  strokeWidth={2}
                  name="Позитив"
                  dot={{ fill: '#52c41a', strokeWidth: 2, r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="negative" 
                  stroke="#f5222d" 
                  strokeWidth={2}
                  name="Негатив"
                  dot={{ fill: '#f5222d', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SentimentAnalysis;
