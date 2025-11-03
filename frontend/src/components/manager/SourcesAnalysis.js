import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography,
  Space,
  Button,
  Select,
  Input,
  Table,
  Tag
} from 'antd';
import { 
  DownloadOutlined,
  SearchOutlined,
  BarChartOutlined,
  TableOutlined
} from '@ant-design/icons';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const { Title } = Typography;
const { Option } = Select;

const SourcesAnalysis = () => {
  const [viewType, setViewType] = useState('chart');

  // Данные для источников
  const sourcesData = [
    { name: 'Другие', value: 83, color: '#faad14' },
    { name: 'news.myseldon.com', value: 9, color: '#1890ff' },
    { name: 'ru24.net', value: 3, color: '#52c41a' },
    { name: 'ria.city', value: 2, color: '#f5222d' },
    { name: '123ru.net', value: 1, color: '#722ed1' }
  ];

  // Данные для динамики источников
  const sourcesTrendData = [
    { date: '16.09', myseldon: 120, ru24: 45, ria: 30, ru123: 25, newslife: 20 },
    { date: '17.09', myseldon: 150, ru24: 50, ria: 35, ru123: 30, newslife: 25 },
    { date: '18.09', myseldon: 180, ru24: 55, ria: 40, ru123: 35, newslife: 30 },
    { date: '19.09', myseldon: 200, ru24: 60, ria: 45, ru123: 40, newslife: 35 },
    { date: '20.09', myseldon: 80, ru24: 30, ria: 20, ru123: 15, newslife: 10 },
    { date: '21.09', myseldon: 160, ru24: 50, ria: 35, ru123: 30, newslife: 25 }
  ];

  // Данные для категорий источников
  const categoriesData = [
    { name: 'Агрегаторы СМИ', value: 46, color: '#1890ff' },
    { name: 'Интернет-СМИ', value: 27, color: '#52c41a' },
    { name: 'Отраслевые порталы', value: 7, color: '#f5222d' },
    { name: 'Информагентства', value: 6, color: '#722ed1' },
    { name: 'Сайты компаний', value: 5, color: '#faad14' },
    { name: 'Сайты госучреждений', value: 3, color: '#13c2c2' },
    { name: 'Газеты', value: 2, color: '#eb2f96' },
    { name: 'Закрытые ленты', value: 1, color: '#722ed1' },
    { name: 'ТВ', value: 1, color: '#fa8c16' },
    { name: 'Радио', value: 1, color: '#a0d911' }
  ];

  // Данные для тональности по источникам
  const sentimentBySourceData = [
    { source: 'news.myseldon.com', positive: 88, neutral: 623, negative: 52 },
    { source: 'ru24.net', positive: 36, neutral: 252, negative: 10 },
    { source: 'ria.city', positive: 19, neutral: 190, negative: 11 },
    { source: '123ru.net', positive: 24, neutral: 179, negative: 14 },
    { source: 'news-life.pro', positive: 17, neutral: 135, negative: 9 }
  ];

  // Таблица источников
  const sourcesTableData = [
    { rank: 1, source: 'news.myseldon.com', messages: 763, percentage: 8.75, mediaPresence: 135, citations: 0, positive: 88, neutral: 623, negative: 52 },
    { rank: 2, source: 'ru24.net', messages: 298, percentage: 3.42, mediaPresence: 0.57, citations: 0, positive: 36, neutral: 252, negative: 10 },
    { rank: 3, source: 'ria.city', messages: 220, percentage: 2.52, mediaPresence: 0.59, citations: 0, positive: 19, neutral: 190, negative: 11 },
    { rank: 4, source: '123ru.net', messages: 217, percentage: 2.49, mediaPresence: 0.08, citations: 0, positive: 24, neutral: 179, negative: 14 },
    { rank: 5, source: 'news-life.pro', messages: 161, percentage: 1.85, mediaPresence: 0.64, citations: 0, positive: 17, neutral: 135, negative: 9 }
  ];

  const columns = [
    {
      title: '#',
      dataIndex: 'rank',
      key: 'rank',
      width: 50,
    },
    {
      title: 'Источник',
      dataIndex: 'source',
      key: 'source',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            backgroundColor: '#1890ff', 
            borderRadius: '50%',
            marginRight: '8px'
          }}></div>
          {text}
        </div>
      ),
    },
    {
      title: 'Сообщений ↓',
      dataIndex: 'messages',
      key: 'messages',
      render: (value) => <span style={{ fontWeight: 'bold' }}>{value.toLocaleString()}</span>,
    },
    {
      title: '%',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (value) => <span style={{ fontWeight: 'bold' }}>{value}%</span>,
    },
    {
      title: 'Медиаприсутствие',
      dataIndex: 'mediaPresence',
      key: 'mediaPresence',
    },
    {
      title: 'Цитирование',
      dataIndex: 'citations',
      key: 'citations',
    },
    {
      title: 'Позитив',
      dataIndex: 'positive',
      key: 'positive',
      render: (value) => <span style={{ color: '#52c41a', fontWeight: 'bold' }}>{value}</span>,
    },
    {
      title: 'Нейтрально',
      dataIndex: 'neutral',
      key: 'neutral',
      render: (value) => <span style={{ color: '#8c8c8c', fontWeight: 'bold' }}>{value}</span>,
    },
    {
      title: 'Негатив',
      dataIndex: 'negative',
      key: 'negative',
      render: (value) => <span style={{ color: '#f5222d', fontWeight: 'bold' }}>{value}</span>,
    },
  ];

  return (
    <div className="fade-in">
      {/* Поиск источников */}
      <Card size="small" style={{ marginBottom: '16px' }}>
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Input.Search
              placeholder="Поиск источника"
              style={{ width: '100%' }}
              enterButton={<SearchOutlined />}
            />
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        {/* Левая колонка */}
        <Col span={12}>
          {/* Сообщений по источникам */}
          <Card 
            title="Сообщений по источникам"
            extra={
              <Button type="text" icon={<DownloadOutlined />} size="small" />
            }
            style={{ marginBottom: '16px' }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sourcesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {sourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name]}
                  labelStyle={{ color: '#333' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Легенда */}
            <div style={{ marginTop: '16px' }}>
              {sourcesData.map((item, index) => (
                <div key={index} style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px',
                  fontSize: '12px'
                }}>
                  <span style={{ 
                    display: 'inline-block',
                    width: '12px',
                    height: '12px',
                    backgroundColor: item.color,
                    marginRight: '8px',
                    borderRadius: '2px'
                  }}></span>
                  <span style={{ flex: 1 }}>{item.name}</span>
                  <span style={{ fontWeight: 'bold' }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Динамика по источникам */}
          <Card 
            title="Динамика по источникам, топ 5"
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
              <LineChart data={sourcesTrendData}>
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
                  dataKey="myseldon" 
                  stroke="#1890ff" 
                  strokeWidth={2}
                  name="news.myseldon.com"
                  dot={{ fill: '#1890ff', strokeWidth: 2, r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="ru24" 
                  stroke="#52c41a" 
                  strokeWidth={2}
                  name="ru24.net"
                  dot={{ fill: '#52c41a', strokeWidth: 2, r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="ria" 
                  stroke="#f5222d" 
                  strokeWidth={2}
                  name="ria.city"
                  dot={{ fill: '#f5222d', strokeWidth: 2, r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="ru123" 
                  stroke="#722ed1" 
                  strokeWidth={2}
                  name="123ru.net"
                  dot={{ fill: '#722ed1', strokeWidth: 2, r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="newslife" 
                  stroke="#faad14" 
                  strokeWidth={2}
                  name="news-life.pro"
                  dot={{ fill: '#faad14', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Правая колонка */}
        <Col span={12}>
          {/* Сообщений по категориям источников */}
          <Card 
            title="Сообщений по категориям источников"
            extra={
              <Button type="text" icon={<DownloadOutlined />} size="small" />
            }
            style={{ marginBottom: '16px' }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoriesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name]}
                  labelStyle={{ color: '#333' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Легенда */}
            <div style={{ marginTop: '16px', maxHeight: '200px', overflowY: 'auto' }}>
              {categoriesData.map((item, index) => (
                <div key={index} style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '6px',
                  fontSize: '12px'
                }}>
                  <span style={{ 
                    display: 'inline-block',
                    width: '12px',
                    height: '12px',
                    backgroundColor: item.color,
                    marginRight: '8px',
                    borderRadius: '2px'
                  }}></span>
                  <span style={{ flex: 1 }}>{item.name}</span>
                  <span style={{ fontWeight: 'bold' }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Тональность по источникам */}
          <Card 
            title="Тональность по источникам, топ 5"
            extra={
              <Space>
                <Button 
                  type={viewType === 'chart' ? 'primary' : 'default'} 
                  icon={<BarChartOutlined />} 
                  size="small"
                  onClick={() => setViewType('chart')}
                />
                <Button 
                  type={viewType === 'table' ? 'primary' : 'default'} 
                  icon={<TableOutlined />} 
                  size="small"
                  onClick={() => setViewType('table')}
                />
                <Button type="text" icon={<DownloadOutlined />} size="small" />
              </Space>
            }
          >
            {viewType === 'chart' ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sentimentBySourceData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="source" type="category" width={120} />
                  <Tooltip 
                    labelStyle={{ color: '#333' }}
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #d9d9d9',
                      borderRadius: '6px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="positive" stackId="a" fill="#52c41a" name="Позитив" />
                  <Bar dataKey="neutral" stackId="a" fill="#d9d9d9" name="Нейтрально" />
                  <Bar dataKey="negative" stackId="a" fill="#f5222d" name="Негатив" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Table
                dataSource={sourcesTableData}
                columns={columns}
                pagination={false}
                size="small"
                scroll={{ x: 600 }}
              />
            )}
          </Card>
        </Col>
      </Row>

    </div>
  );
};

export default SourcesAnalysis;
