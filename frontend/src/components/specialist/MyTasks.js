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
  Modal
} from 'antd';
import { 
  CommentOutlined,
  FilterOutlined,
  EyeOutlined,
  FileTextOutlined,
  CheckOutlined
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const MyTasks = () => {
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all'
  });
  const [isResponseModalVisible, setIsResponseModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [response, setResponse] = useState('');
  const [newStatus, setNewStatus] = useState('');

  // Mock данные для задач специалиста
  const tasks = [
    {
      id: 1,
      title: 'Обработка негативного отзыва',
      description: 'Клиент жалуется на долгую доставку заказа #12345',
      review: {
        author: 'Анна Петрова',
        text: 'Заказал доставку, ждал 3 дня вместо обещанных 24 часов. Очень недоволен сервисом.',
        rating: 2,
        source: 'Google Maps',
        date: '2024-01-15'
      },
      priority: 'high',
      status: 'in_progress',
      createdAt: '2024-01-15 10:30',
      deadline: '2024-01-16 18:00',
      progress: 60,
      comments: [
        {
          author: 'Модератор',
          text: 'Срочно связаться с клиентом и решить проблему',
          date: '2024-01-15 11:00'
        }
      ]
    },
    {
      id: 2,
      title: 'Ответ на положительный отзыв',
      description: 'Поблагодарить клиента за отзыв и пригласить к дальнейшему сотрудничеству',
      review: {
        author: 'Михаил Сидоров',
        text: 'Отличный сервис! Быстро и качественно выполнили заказ. Рекомендую!',
        rating: 5,
        source: 'Yandex',
        date: '2024-01-14'
      },
      priority: 'medium',
      status: 'completed',
      createdAt: '2024-01-14 15:20',
      deadline: '2024-01-15 12:00',
      progress: 100,
      comments: []
    },
    {
      id: 3,
      title: 'Работа с жалобой на качество',
      description: 'Разобраться с жалобой на некачественный товар',
      review: {
        author: 'Елена Козлова',
        text: 'Товар пришел с браком, не соответствует описанию. Требую возврат денег!',
        rating: 1,
        source: '2GIS',
        date: '2024-01-13'
      },
      priority: 'critical',
      status: 'new',
      createdAt: '2024-01-13 14:00',
      deadline: '2024-01-14 18:00',
      progress: 0,
      comments: []
    },
    {
      id: 4,
      title: 'Обработка нейтрального отзыва',
      description: 'Ответить на отзыв с предложением улучшения сервиса',
      review: {
        author: 'Дмитрий Волков',
        text: 'Сервис нормальный, но можно было бы быстрее. В целом доволен.',
        rating: 3,
        source: 'Отзовик',
        date: '2024-01-12'
      },
      priority: 'low',
      status: 'in_progress',
      createdAt: '2024-01-12 16:30',
      deadline: '2024-01-13 18:00',
      progress: 30,
      comments: []
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
      title: 'Задача',
      dataIndex: 'title',
      key: 'title',
      width: 250,
      ellipsis: true,
    },
    {
      title: 'Отзыв',
      key: 'review',
      width: 200,
      render: (_, record) => (
        <div style={{ maxWidth: '200px', wordWrap: 'break-word' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '11px' }}>
            {record.review.author} ({record.review.rating}⭐)
          </div>
          <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.2' }}>
            {record.review.text.substring(0, 40)}...
          </div>
          <div style={{ fontSize: '9px', color: '#999', marginTop: '4px' }}>
            {record.review.source} • {record.review.date}
          </div>
        </div>
      ),
    },
    {
      title: 'Приоритет',
      dataIndex: 'priority',
      key: 'priority',
      width: 120,
      render: (priority) => {
        const priorityConfig = {
          'low': { color: '#52c41a', text: 'Низкий' },
          'medium': { color: '#faad14', text: 'Средний' },
          'high': { color: '#ff7875', text: 'Высокий' },
          'critical': { color: '#ff4d4f', text: 'Критический' }
        };
        const config = priorityConfig[priority];
        return (
          <Tag color={config.color}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => {
        const statusConfig = {
          'new': { color: '#1890ff', text: 'Новая' },
          'in_progress': { color: '#faad14', text: 'В работе' },
          'completed': { color: '#52c41a', text: 'Выполнена' },
          'overdue': { color: '#ff4d4f', text: 'Просрочена' }
        };
        const config = statusConfig[status];
        return (
          <Tag color={config.color}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: 'Срок',
      dataIndex: 'deadline',
      key: 'deadline',
      width: 140,
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 260,
      render: (_, record) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <Button
              type="primary"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleViewTask(record)}
              style={{ width: '120px' }}
            >
              Просмотр
            </Button>
            <Button
              type="default"
              size="small"
              icon={<CheckOutlined />}
              onClick={() => handleChangeStatus(record)}
              style={{ width: '120px' }}
            >
              Статус
            </Button>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <Button
              type="default"
              size="small"
              icon={<FileTextOutlined />}
              onClick={() => handleAddResponse(record)}
              style={{ width: '120px' }}
            >
              Записать
            </Button>
            <Button
              type="default"
              size="small"
              icon={<CommentOutlined />}
              onClick={() => handleViewComments(record)}
              style={{ width: '120px' }}
            >
              Комментарии
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsViewModalVisible(true);
  };

  const handleViewModalCancel = () => {
    setIsViewModalVisible(false);
    setSelectedTask(null);
  };

  const handleAddResponse = (task) => {
    setSelectedTask(task);
    setResponse('');
    setIsResponseModalVisible(true);
  };

  const handleResponseModalCancel = () => {
    setIsResponseModalVisible(false);
    setSelectedTask(null);
    setResponse('');
  };

  const handleResponseSubmit = () => {
    message.success('Ответ записан в систему');
    setIsResponseModalVisible(false);
    setSelectedTask(null);
    setResponse('');
  };

  const handleViewComments = (task) => {
    setSelectedTask(task);
    setIsCommentsModalVisible(true);
  };

  const handleCommentsModalCancel = () => {
    setIsCommentsModalVisible(false);
    setSelectedTask(null);
  };

  const handleChangeStatus = (task) => {
    setSelectedTask(task);
    setNewStatus(task.status);
    setIsStatusModalVisible(true);
  };

  const handleStatusModalCancel = () => {
    setIsStatusModalVisible(false);
    setSelectedTask(null);
    setNewStatus('');
  };

  const handleStatusSubmit = () => {
    const statusNames = {
      'new': 'Новая',
      'in_progress': 'В работе',
      'completed': 'Выполнена',
      'overdue': 'Просрочена'
    };
    message.success(`Статус задачи изменен на "${statusNames[newStatus]}"`);
    setIsStatusModalVisible(false);
    setSelectedTask(null);
    setNewStatus('');
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
            Мои задачи
          </Title>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                {tasks.filter(t => t.status === 'in_progress').length}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>В работе</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                {tasks.filter(t => t.status === 'completed').length}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Выполнено</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff4d4f' }}>
                {tasks.filter(t => t.status === 'new').length}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Новых</div>
            </div>
          </div>
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
                <Option value="in_progress">В работе</Option>
                <Option value="completed">Выполнены</Option>
                <Option value="overdue">Просрочены</Option>
              </Select>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Select
                value={filters.priority}
                onChange={(value) => setFilters({...filters, priority: value})}
                style={{ width: 140 }}
                placeholder="Все приоритеты"
              >
                <Option value="all">Все приоритеты</Option>
                <Option value="low">Низкий</Option>
                <Option value="medium">Средний</Option>
                <Option value="high">Высокий</Option>
                <Option value="critical">Критический</Option>
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
                placeholder="Поиск по задаче"
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
          dataSource={tasks}
          rowKey="id"
          scroll={{ x: 1600 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} из ${total} задач`
          }}
        />
      </Card>

      {/* Модальное окно просмотра задачи */}
      <Modal
        title="Детали задачи"
        open={isViewModalVisible}
        onCancel={handleViewModalCancel}
        footer={[
          <Button key="close" onClick={handleViewModalCancel}>
            Закрыть
          </Button>
        ]}
        width={800}
      >
        {selectedTask && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <Typography.Title level={4} style={{ marginBottom: '16px' }}>
                {selectedTask.title}
              </Typography.Title>
              <Typography.Paragraph>
                {selectedTask.description}
              </Typography.Paragraph>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <Typography.Title level={5}>Информация о задаче</Typography.Title>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <Typography.Text strong>Приоритет:</Typography.Text>
                  <br />
                  <Tag color={
                    selectedTask.priority === 'critical' ? '#ff4d4f' :
                    selectedTask.priority === 'high' ? '#ff7875' :
                    selectedTask.priority === 'medium' ? '#faad14' : '#52c41a'
                  }>
                    {selectedTask.priority === 'critical' ? 'Критический' :
                     selectedTask.priority === 'high' ? 'Высокий' :
                     selectedTask.priority === 'medium' ? 'Средний' : 'Низкий'}
                  </Tag>
                </div>
                <div>
                  <Typography.Text strong>Статус:</Typography.Text>
                  <br />
                  <Tag color={
                    selectedTask.status === 'completed' ? '#52c41a' :
                    selectedTask.status === 'overdue' ? '#ff4d4f' :
                    selectedTask.status === 'in_progress' ? '#faad14' : '#1890ff'
                  }>
                    {selectedTask.status === 'completed' ? 'Выполнена' :
                     selectedTask.status === 'overdue' ? 'Просрочена' :
                     selectedTask.status === 'in_progress' ? 'В работе' : 'Новая'}
                  </Tag>
                </div>
                <div>
                  <Typography.Text strong>Создана:</Typography.Text>
                  <br />
                  <Typography.Text>{selectedTask.createdAt}</Typography.Text>
                </div>
                <div>
                  <Typography.Text strong>Срок выполнения:</Typography.Text>
                  <br />
                  <Typography.Text>{selectedTask.deadline}</Typography.Text>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <Typography.Title level={5}>Исходный отзыв</Typography.Title>
              <div style={{ 
                background: '#f5f5f5', 
                padding: '16px', 
                borderRadius: '8px',
                marginBottom: '16px'
              }}>
                <div style={{ marginBottom: '8px' }}>
                  <Typography.Text strong>Автор:</Typography.Text> {selectedTask.review.author}
                  <br />
                  <Typography.Text strong>Рейтинг:</Typography.Text> {selectedTask.review.rating}⭐
                  <br />
                  <Typography.Text strong>Источник:</Typography.Text> {selectedTask.review.source}
                  <br />
                  <Typography.Text strong>Дата:</Typography.Text> {selectedTask.review.date}
                </div>
                <div style={{ marginTop: '12px' }}>
                  <Typography.Text strong>Текст отзыва:</Typography.Text>
                  <br />
                  <Typography.Text style={{ fontStyle: 'italic' }}>
                    "{selectedTask.review.text}"
                  </Typography.Text>
                </div>
              </div>
            </div>

            {selectedTask.comments && selectedTask.comments.length > 0 && (
              <div>
                <Typography.Title level={5}>Комментарии модератора</Typography.Title>
                {selectedTask.comments.map((comment, index) => (
                  <div key={index} style={{ 
                    background: '#f9f9f9', 
                    padding: '12px', 
                    borderRadius: '6px',
                    marginBottom: '8px'
                  }}>
                    <div style={{ marginBottom: '4px' }}>
                      <Typography.Text strong>{comment.author}</Typography.Text>
                      <Typography.Text type="secondary" style={{ marginLeft: '8px' }}>
                        {comment.date}
                      </Typography.Text>
                    </div>
                    <Typography.Text>{comment.text}</Typography.Text>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Модальное окно комментариев */}
      <Modal
        title="Комментарии к задаче"
        open={isCommentsModalVisible}
        onCancel={handleCommentsModalCancel}
        footer={[
          <Button key="close" onClick={handleCommentsModalCancel}>
            Закрыть
          </Button>
        ]}
        width={600}
      >
        {selectedTask && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <Typography.Text strong>Задача:</Typography.Text>
              <br />
              <Typography.Text>{selectedTask.title}</Typography.Text>
            </div>

            {selectedTask.comments && selectedTask.comments.length > 0 ? (
              <div>
                <Typography.Title level={5}>Комментарии модератора:</Typography.Title>
                {selectedTask.comments.map((comment, index) => (
                  <div key={index} style={{ 
                    background: '#f9f9f9', 
                    padding: '12px', 
                    borderRadius: '6px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ marginBottom: '8px' }}>
                      <Typography.Text strong>{comment.author}</Typography.Text>
                      <Typography.Text type="secondary" style={{ marginLeft: '8px' }}>
                        {comment.date}
                      </Typography.Text>
                    </div>
                    <Typography.Text>{comment.text}</Typography.Text>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Typography.Text type="secondary">
                  Комментарии отсутствуют
                </Typography.Text>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Модальное окно записи ответа */}
      <Modal
        title="Записать ответ на отзыв"
        open={isResponseModalVisible}
        onCancel={handleResponseModalCancel}
        onOk={handleResponseSubmit}
        okText="Сохранить"
        cancelText="Отмена"
        width={700}
      >
        {selectedTask && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <Typography.Text strong>Задача:</Typography.Text>
              <br />
              <Typography.Text>{selectedTask.title}</Typography.Text>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <Typography.Text strong>Исходный отзыв:</Typography.Text>
              <div style={{ 
                background: '#f5f5f5', 
                padding: '12px', 
                borderRadius: '6px',
                marginTop: '8px'
              }}>
                <Typography.Text style={{ fontStyle: 'italic' }}>
                  "{selectedTask.review.text}"
                </Typography.Text>
                <br />
                <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                  — {selectedTask.review.author}, {selectedTask.review.source}
                </Typography.Text>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Ваш ответ, который был оставлен на источнике:
              </label>
              <Input.TextArea 
                placeholder="Введите текст ответа, который вы оставили клиенту на источнике..."
                rows={6}
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
            </div>

            <div style={{ 
              background: '#fff7e6', 
              padding: '12px', 
              borderRadius: '6px',
              marginTop: '16px'
            }}>
              <Typography.Text type="secondary">
                <strong>Важно:</strong> Скопируйте сюда текст ответа, который вы оставили клиенту на удаленном сервисе ({selectedTask.review.source}).
              </Typography.Text>
            </div>
          </div>
        )}
      </Modal>

      {/* Модальное окно изменения статуса */}
      <Modal
        title="Изменить статус задачи"
        open={isStatusModalVisible}
        onCancel={handleStatusModalCancel}
        onOk={handleStatusSubmit}
        okText="Изменить"
        cancelText="Отмена"
        width={500}
      >
        {selectedTask && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <Typography.Text strong>Задача:</Typography.Text>
              <br />
              <Typography.Text>{selectedTask.title}</Typography.Text>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Текущий статус:
              </label>
              <Tag color={
                selectedTask.status === 'completed' ? '#52c41a' :
                selectedTask.status === 'overdue' ? '#ff4d4f' :
                selectedTask.status === 'in_progress' ? '#faad14' : '#1890ff'
              }>
                {selectedTask.status === 'completed' ? 'Выполнена' :
                 selectedTask.status === 'overdue' ? 'Просрочена' :
                 selectedTask.status === 'in_progress' ? 'В работе' : 'Новая'}
              </Tag>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Новый статус:
              </label>
              <Select
                value={newStatus}
                onChange={setNewStatus}
                style={{ width: '100%' }}
                placeholder="Выберите новый статус"
              >
                <Option value="new">Новая</Option>
                <Option value="in_progress">В работе</Option>
                <Option value="completed">Выполнена</Option>
              </Select>
            </div>

            <div style={{ 
              background: '#e6f7ff', 
              padding: '12px', 
              borderRadius: '6px',
              marginTop: '16px'
            }}>
              <Typography.Text type="secondary">
                <strong>Совет:</strong> Обновляйте статус задачи по мере её выполнения. Модератор будет видеть изменения.
              </Typography.Text>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyTasks;
