import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  DatePicker, 
  Button,
  Typography,
  Space,
  Input,
  Select
} from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined,
  CalendarOutlined,
  FilterOutlined,
  SearchOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import {
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
const { RangePicker } = DatePicker;
const { Option } = Select;

const SummaryReport = () => {
  const [dateRange, setDateRange] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState('all');

  // Mock данные для KPI
  const kpiData = [
    {
      title: 'Сообщения',
      value: 8723,
      change: -20.9,
      changeType: 'decrease',
      suffix: '',
      color: '#1890ff'
    },
    {
      title: 'Источники',
      value: 2361,
      change: -12.3,
      changeType: 'decrease',
      suffix: '',
      color: '#52c41a'
    },
    {
      title: 'Аудитория',
      value: 336581453,
      change: 10.3,
      changeType: 'increase',
      suffix: '',
      color: '#faad14'
    },
    {
      title: 'Лояльность',
      value: 1.5,
      change: -0.5,
      changeType: 'decrease',
      suffix: '',
      color: '#722ed1'
    }
  ];

  // Mock данные для графика
  const trendData = [
    { date: '16.09', mentions: 1200, positive: 150, negative: 80 },
    { date: '17.09', mentions: 1800, positive: 200, negative: 120 },
    { date: '18.09', mentions: 1600, positive: 180, negative: 100 },
    { date: '19.09', mentions: 1400, positive: 160, negative: 90 },
    { date: '20.09', mentions: 800, positive: 100, negative: 60 },
    { date: '21.09', mentions: 1500, positive: 190, negative: 110 }
  ];

  return (
    <div className="fade-in">
      {/* Заголовок и фильтры */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <Title level={3} style={{ margin: 0 }}>
            Сводный отчет
          </Title>
          <Space>
            <RangePicker 
              value={dateRange}
              onChange={setDateRange}
              suffixIcon={<CalendarOutlined />}
              placeholder={['Дата от', 'Дата до']}
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
            <Button icon={<FilterOutlined />}>
              Фильтры
            </Button>
            <Button icon={<DownloadOutlined />}>
              Экспорт
            </Button>
          </Space>
        </div>

        {/* KPI карточки */}
        <Row gutter={[16, 16]}>
          {kpiData.map((kpi, index) => (
            <Col span={4.8} key={index}>
              <Card 
                style={{ 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  border: '1px solid #e8e8e8'
                }}
              >
                <Statistic
                  title={kpi.title}
                  value={kpi.value}
                  precision={kpi.title === 'Лояльность' ? 1 : 0}
                  valueStyle={{ 
                    color: kpi.color,
                    fontSize: '24px',
                    fontWeight: 'bold'
                  }}
                  prefix={
                    kpi.changeType === 'increase' ? 
                    <ArrowUpOutlined style={{ color: '#52c41a' }} /> : 
                    <ArrowDownOutlined style={{ color: '#f5222d' }} />
                  }
                  suffix={
                    <span style={{ 
                      color: kpi.changeType === 'increase' ? '#52c41a' : '#f5222d',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {kpi.change > 0 ? '+' : ''}{kpi.change}%
                    </span>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* График динамики */}
      <Card title="Динамика упоминаний по дням">
        <div style={{ marginBottom: '16px' }}>
          <Space>
            <Select defaultValue="days" style={{ width: 120 }}>
              <Option value="days">по дням</Option>
              <Option value="weeks">по неделям</Option>
              <Option value="months">по месяцам</Option>
            </Select>
            <Button icon={<DownloadOutlined />} size="small">
              Экспорт
            </Button>
          </Space>
        </div>
        
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={trendData}>
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
              dataKey="mentions" 
              stroke="#1890ff" 
              strokeWidth={3}
              name="Количество упоминаний"
              dot={{ fill: '#1890ff', strokeWidth: 2, r: 4 }}
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

    </div>
  );
};

export default SummaryReport;
