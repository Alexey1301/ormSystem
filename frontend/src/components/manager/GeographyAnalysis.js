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
  GlobalOutlined
} from '@ant-design/icons';
import {
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
const { Option } = Select;

const GeographyAnalysis = () => {
  const [selectedRegion, setSelectedRegion] = useState('russia');

  // Данные для стран
  const countriesData = [
    { name: 'Россия', value: 8686, percentage: 99.58, positive: 1046, neutral: 6927, negative: 713, color: '#1890ff' },
    { name: 'Казахстан', value: 17, percentage: 0.19, positive: 3, neutral: 14, negative: 0, color: '#52c41a' },
    { name: 'Беларусь', value: 13, percentage: 0.15, positive: 1, neutral: 12, negative: 0, color: '#f5222d' },
    { name: 'Грузия', value: 3, percentage: 0.03, positive: 0, neutral: 3, negative: 0, color: '#722ed1' },
    { name: 'Армения', value: 2, percentage: 0.02, positive: 0, neutral: 1, negative: 1, color: '#faad14' },
    { name: 'Азербайджан', value: 1, percentage: 0.01, positive: 0, neutral: 1, negative: 0, color: '#13c2c2' },
    { name: 'Узбекистан', value: 1, percentage: 0.01, positive: 0, neutral: 1, negative: 0, color: '#eb2f96' }
  ];

  // Данные для регионов России
  const regionsData = [
    { region: 'Москва', messages: 332, percentage: 4.48, positive: 30, neutral: 287, negative: 15 },
    { region: 'Санкт-Петербург', messages: 254, percentage: 3.43, positive: 21, neutral: 201, negative: 32 },
    { region: 'Нижегородская область', messages: 196, percentage: 2.64, positive: 17, neutral: 175, negative: 4 },
    { region: 'Московская область', messages: 162, percentage: 2.18, positive: 12, neutral: 146, negative: 4 },
    { region: 'Иркутская область', messages: 147, percentage: 1.98, positive: 31, neutral: 100, negative: 16 },
    { region: 'Республика Башкортостан', messages: 119, percentage: 1.6, positive: 8, neutral: 107, negative: 4 },
    { region: 'Новосибирская область', messages: 114, percentage: 1.54, positive: 11, neutral: 97, negative: 6 },
    { region: 'Краснодарский край', messages: 109, percentage: 1.47, positive: 15, neutral: 91, negative: 3 },
    { region: 'Владимирская область', messages: 100, percentage: 1.35, positive: 6, neutral: 80, negative: 14 },
    { region: 'Забайкальский край', messages: 86, percentage: 1.16, positive: 17, neutral: 66, negative: 3 }
  ];

  const countriesColumns = [
    {
      title: 'Страна',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            backgroundColor: record.color, 
            borderRadius: '50%',
            marginRight: '8px'
          }}></div>
          {text}
        </div>
      ),
    },
    {
      title: 'Сообщений ↓',
      dataIndex: 'value',
      key: 'value',
      render: (value) => <span style={{ fontWeight: 'bold' }}>{value.toLocaleString()}</span>,
    },
    {
      title: '%',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (value) => <span style={{ fontWeight: 'bold' }}>{value}%</span>,
    },
    {
      title: 'Позитив',
      dataIndex: 'positive',
      key: 'positive',
      render: (value) => <span style={{ color: '#52c41a', fontWeight: 'bold' }}>{value}</span>,
    },
    {
      title: 'Нейтр.',
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

  const regionsColumns = [
    {
      title: 'Регионы',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: 'Сообщений ↓',
      dataIndex: 'messages',
      key: 'messages',
      render: (value) => <span style={{ fontWeight: 'bold' }}>{value.toLocaleString()}</span>,
    },
    {
      title: '% сообщений',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (value) => <span style={{ fontWeight: 'bold' }}>{value}%</span>,
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
      {/* Поиск */}
      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={12}>
          <Card size="small">
            <Input.Search
              placeholder="Поиск страны"
              style={{ width: '100%' }}
              enterButton={<SearchOutlined />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small">
            <Input.Search
              placeholder="Поиск региона"
              style={{ width: '100%' }}
              enterButton={<SearchOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Левая колонка - Международная география */}
        <Col span={12}>
          {/* Карта мира (заглушка) */}
          <Card 
            title="Распределение по странам"
            extra={
              <Button type="text" icon={<DownloadOutlined />} size="small" />
            }
            style={{ marginBottom: '16px' }}
          >
            <div style={{ 
              height: '300px', 
              background: 'linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <div style={{ textAlign: 'center' }}>
                <GlobalOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
                <div style={{ fontSize: '16px', color: '#666' }}>
                  Интерактивная карта мира
                </div>
                <div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
                  (Требуется интеграция с картографическим сервисом)
                </div>
              </div>
              
              {/* Легенда карты */}
              <div style={{ 
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                background: 'rgba(255,255,255,0.9)',
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>Легенда:</div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#1890ff', marginRight: '4px' }}></div>
                  0 - 2.5k
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#40a9ff', marginRight: '4px' }}></div>
                  2.5k - 5k
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#69c0ff', marginRight: '4px' }}></div>
                  5k - 7.5k
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#91d5ff', marginRight: '4px' }}></div>
                  7.5k - 10k
                </div>
              </div>
            </div>
          </Card>

          {/* Круговая диаграмма стран */}
          <Card title="Распределение по странам">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={countriesData.slice(0, 3)}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {countriesData.slice(0, 3).map((entry, index) => (
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
            <div style={{ marginTop: '16px' }}>
              {countriesData.slice(0, 3).map((item, index) => (
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
                  <span style={{ fontWeight: 'bold' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Таблица стран */}
          <Card title="Страны" size="small">
            <Table
              dataSource={countriesData}
              columns={countriesColumns}
              pagination={false}
              size="small"
              scroll={{ x: 500 }}
            />
          </Card>
        </Col>

        {/* Правая колонка - Регионы России */}
        <Col span={12}>
          {/* Фильтр регионов */}
          <Card size="small" style={{ marginBottom: '16px' }}>
            <Row gutter={16} align="middle">
              <Col>
                <span style={{ fontWeight: 'bold' }}>Регионы</span>
              </Col>
              <Col>
                <Select
                  value={selectedRegion}
                  onChange={setSelectedRegion}
                  style={{ width: 150 }}
                >
                  <Option value="russia">Россия</Option>
                  <Option value="kazakhstan">Казахстан</Option>
                  <Option value="belarus">Беларусь</Option>
                </Select>
              </Col>
            </Row>
          </Card>

          {/* Таблица регионов */}
          <Card title="Регионы России">
            <Table
              dataSource={regionsData}
              columns={regionsColumns}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `${range[0]}-${range[1]} из ${total} регионов`
              }}
              size="small"
              scroll={{ x: 600 }}
            />
          </Card>
        </Col>
      </Row>

    </div>
  );
};

export default GeographyAnalysis;
