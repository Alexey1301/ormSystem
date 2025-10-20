import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Tag, 
  message, 
  Typography,
  Card,
  Select,
  Input,
  DatePicker,
  Rate,
  Modal
} from 'antd';
import { 
  DeleteOutlined, 
  FilterOutlined
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const ReviewManagement = () => {
  const [filters, setFilters] = useState({
    status: 'all',
    rating: 'all',
    source: 'all'
  });
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deletingReview, setDeletingReview] = useState(null);

  // Mock данные для отзывов
  const reviews = [
    {
      id: 1,
      author: 'Анна Петрова',
      rating: 5,
      text: 'Отличный сервис! Быстро и качественно выполнили заказ.',
      source: 'Google Maps',
      company: 'ООО "ТехноИнновации"',
      date: '2024-01-15',
      status: 'new',
      isRelevant: true
    },
    {
      id: 2,
      author: 'Михаил Иванов',
      rating: 2,
      text: 'Долго ждал ответа, не понравилось отношение к клиентам.',
      source: 'Yandex',
      company: 'ООО "ТехноИнновации"',
      date: '2024-01-14',
      status: 'processed',
      isRelevant: true
    },
    {
      id: 3,
      author: 'Елена Сидорова',
      rating: 4,
      text: 'Хорошая компания, рекомендую!',
      source: '2GIS',
      company: 'ИП Иванов И.И.',
      date: '2024-01-13',
      status: 'new',
      isRelevant: false
    },
    {
      id: 4,
      author: 'Дмитрий Козлов',
      rating: 1,
      text: 'Ужасное обслуживание, не рекомендую никому.',
      source: 'Отзовик',
      company: 'АО "МедиаГрупп"',
      date: '2024-01-12',
      status: 'processed',
      isRelevant: true
    }
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      fixed: 'left',
    },
    {
      title: 'Автор',
      dataIndex: 'author',
      key: 'author',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Рейтинг',
      dataIndex: 'rating',
      key: 'rating',
      width: 120,
      render: (rating) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Rate disabled value={rating} style={{ fontSize: '12px' }} />
          <span style={{ fontSize: '12px', color: '#666' }}>{rating}</span>
        </div>
      ),
    },
    {
      title: 'Текст отзыва',
      dataIndex: 'text',
      key: 'text',
      ellipsis: true,
      width: 400,
      render: (text) => (
        <div style={{ 
          maxWidth: '400px',
          wordWrap: 'break-word',
          lineHeight: '1.4'
        }}>
          {text}
        </div>
      ),
    },
    {
      title: 'Источник',
      dataIndex: 'source',
      key: 'source',
      width: 140,
      render: (source) => (
        <span style={{ color: '#1890ff', cursor: 'pointer' }}>
          {source}
        </span>
      ),
    },
    {
      title: 'Компания',
      dataIndex: 'company',
      key: 'company',
      width: 200,
      ellipsis: true,
      render: (company) => (
        <div style={{ 
          maxWidth: '200px',
          wordWrap: 'break-word',
          lineHeight: '1.4'
        }}>
          {company}
        </div>
      ),
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status) => {
        const statusConfig = {
          'new': { color: '#faad14', bgColor: '#fff7e6', text: 'Новый' },
          'processed': { color: '#52c41a', bgColor: '#f6ffed', text: 'Обработан' },
          'archived': { color: '#8c8c8c', bgColor: '#f5f5f5', text: 'Архив' }
        };
        const config = statusConfig[status];
        return (
          <Tag 
            style={{ 
              backgroundColor: config.bgColor,
              color: config.color,
              border: `1px solid ${config.color}`,
              borderRadius: '4px',
              margin: '2px 0'
            }}
          >
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Button
          type="primary"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteReview(record)}
          style={{ width: '100%' }}
        >
          Удалить
        </Button>
      ),
    },
  ];

  const handleDeleteReview = (review) => {
    setDeletingReview(review);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalVisible(false);
    setDeletingReview(null);
  };

  const handleDeleteConfirm = () => {
    message.success(`Отзыв удален: ${deletingReview?.text.substring(0, 50)}...`);
    setIsDeleteModalVisible(false);
    setDeletingReview(null);
  };


  return (
    <div className="fade-in">
      <Card>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <Title level={3} style={{ margin: 0 }}>
            Управление отзывами
          </Title>
        </div>

        <Card size="small" style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Select
                value={filters.status}
                onChange={(value) => setFilters({...filters, status: value})}
                style={{ width: 140 }}
                placeholder="Все статусы"
              >
                <Option value="all">Все статусы</Option>
                <Option value="new">Новые</Option>
                <Option value="processed">Обработанные</Option>
                <Option value="archived">Архив</Option>
              </Select>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Select
                value={filters.rating}
                onChange={(value) => setFilters({...filters, rating: value})}
                style={{ width: 140 }}
                placeholder="Все рейтинги"
              >
                <Option value="all">Все рейтинги</Option>
                <Option value="5">5 звезд</Option>
                <Option value="4">4 звезды</Option>
                <Option value="3">3 звезды</Option>
                <Option value="2">2 звезды</Option>
                <Option value="1">1 звезда</Option>
              </Select>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Select
                value={filters.source}
                onChange={(value) => setFilters({...filters, source: value})}
                style={{ width: 150 }}
                placeholder="Все источники"
              >
                <Option value="all">Все источники</Option>
                <Option value="Google Maps">Google Maps</Option>
                <Option value="Yandex">Yandex</Option>
                <Option value="2GIS">2GIS</Option>
                <Option value="Отзовик">Отзовик</Option>
              </Select>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <RangePicker 
                placeholder={['Дата от', 'Дата до']}
                style={{ width: 200 }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Input.Search
                placeholder="Поиск по тексту"
                style={{ width: 200 }}
                onSearch={(value) => console.log('Search:', value)}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Button 
                icon={<FilterOutlined />}
                type="primary"
                style={{ height: '32px' }}
              >
                Применить фильтры
              </Button>
            </div>
          </div>
        </Card>

        <Table
          columns={columns}
          dataSource={reviews}
          rowKey="id"
          scroll={{ x: 1600 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} из ${total} отзывов`
          }}
        />
      </Card>

      {/* Модальное окно удаления отзыва */}
      <Modal
        title="Подтверждение удаления"
        open={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteModalCancel}
        okText="Удалить"
        cancelText="Отмена"
        okButtonProps={{ danger: true }}
        width={400}
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: '48px', color: '#ff4d4f', marginBottom: '16px' }}>
            ⚠️
          </div>
          <Typography.Title level={4} style={{ marginBottom: '16px' }}>
            Вы уверены, что хотите удалить этот отзыв?
          </Typography.Title>
          {deletingReview && (
            <div style={{
              background: '#f5f5f5',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '16px'
            }}>
              <Typography.Text strong>Автор:</Typography.Text>
              <br />
              <Typography.Text>{deletingReview.author}</Typography.Text>
              <br />
              <Typography.Text strong>Отзыв:</Typography.Text>
              <br />
              <Typography.Text>{deletingReview.text.substring(0, 100)}...</Typography.Text>
            </div>
          )}
          <Typography.Text type="secondary">
            Это действие нельзя отменить.
          </Typography.Text>
        </div>
      </Modal>
    </div>
  );
};

export default ReviewManagement;
