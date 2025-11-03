import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  DatePicker, 
  Select, 
  Button,
  Typography,
  Space
} from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined,
  CalendarOutlined,
  FilterOutlined
} from '@ant-design/icons';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Analytics = () => {
  const [dateRange, setDateRange] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState('all');

  // Mock данные для аналитики
  const reputationData = [
    { name: 'Янв', positive: 65, negative: 20, neutral: 15 },
    { name: 'Фев', positive: 70, negative: 15, neutral: 15 },
    { name: 'Мар', positive: 75, negative: 12, neutral: 13 },
    { name: 'Апр', positive: 68, negative: 18, neutral: 14 },
    { name: 'Май', positive: 72, negative: 16, neutral: 12 },
    { name: 'Июн', positive: 78, negative: 10, neutral: 12 },
  ];

  const sourceData = [
    { name: 'Google Maps', value: 35, color: '#1890ff' },
    { name: 'Yandex', value: 25, color: '#52c41a' },
    { name: '2GIS', value: 20, color: '#faad14' },
    { name: 'Отзовик', value: 15, color: '#f5222d' },
    { name: 'Другие', value: 5, color: '#722ed1' },
  ];

  const reviewTrends = [
    { name: 'Янв', reviews: 45, responses: 38 },
    { name: 'Фев', reviews: 52, responses: 45 },
    { name: 'Мар', reviews: 48, responses: 42 },
    { name: 'Апр', reviews: 61, responses: 55 },
    { name: 'Май', reviews: 58, responses: 52 },
    { name: 'Июн', reviews: 67, responses: 61 },
  ];

  const stats = [
    {
      title: 'Общий рейтинг',
      value: 4.2,
      precision: 1,
      suffix: '/5',
      valueStyle: { color: '#3f8600' },
      prefix: <ArrowUpOutlined />,
    },
    {
      title: 'Всего отзывов',
      value: 1128,
      suffix: '',
      valueStyle: { color: '#1890ff' },
    },
    {
      title: 'Положительных',
      value: 78,
      suffix: '%',
      valueStyle: { color: '#3f8600' },
      prefix: <ArrowUpOutlined />,
    },
    {
      title: 'Отрицательных',
      value: 12,
      suffix: '%',
      valueStyle: { color: '#cf1322' },
      prefix: <ArrowDownOutlined />,
    },
  ];

  return (
    <div className="fade-in">
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <Title level={3} style={{ margin: 0 }}>
            Аналитика репутации
          </Title>
          <Space>
            <RangePicker 
              value={dateRange}
              onChange={setDateRange}
              suffixIcon={<CalendarOutlined />}
            />
            <Select
              value={selectedCompany}
              onChange={setSelectedCompany}
              style={{ width: 200 }}
              placeholder="Выберите компанию"
            >
              <Option value="all">Все компании</Option>
              <Option value="1">ООО "ТехноИнновации"</Option>
              <Option value="2">ИП Иванов И.И.</Option>
              <Option value="3">АО "МедиаГрупп"</Option>
            </Select>
            <Button type="primary" icon={<FilterOutlined />}>
              Применить фильтры
            </Button>
          </Space>
        </div>

        <Row gutter={16}>
          {stats.map((stat, index) => (
            <Col span={6} key={index}>
              <Card>
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  precision={stat.precision}
                  valueStyle={stat.valueStyle}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Динамика репутации" style={{ marginBottom: '16px' }}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={reputationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="positive" 
                  stackId="1" 
                  stroke="#52c41a" 
                  fill="#52c41a" 
                  name="Положительные"
                />
                <Area 
                  type="monotone" 
                  dataKey="negative" 
                  stackId="1" 
                  stroke="#f5222d" 
                  fill="#f5222d" 
                  name="Отрицательные"
                />
                <Area 
                  type="monotone" 
                  dataKey="neutral" 
                  stackId="1" 
                  stroke="#faad14" 
                  fill="#faad14" 
                  name="Нейтральные"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Источники отзывов" style={{ marginBottom: '16px' }}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Card title="Тренды отзывов и ответов">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={reviewTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="reviews" 
              stroke="#1890ff" 
              strokeWidth={2}
              name="Отзывы"
            />
            <Line 
              type="monotone" 
              dataKey="responses" 
              stroke="#52c41a" 
              strokeWidth={2}
              name="Ответы"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Analytics;
