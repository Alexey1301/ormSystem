import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Switch, 
  message, 
  Space,
  Tag,
  Typography,
  Card,
  DatePicker,
  Modal,
  Select,
  Input
} from 'antd';
import { 
  PlayCircleOutlined, 
  SettingOutlined,
  MonitorOutlined
} from '@ant-design/icons';
import useSourceStore from '../../store/sourceStore';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const SourceManagement = () => {
  const [selectedSources, setSelectedSources] = useState([]);
  const [isCollectionModalVisible, setIsCollectionModalVisible] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editingSource, setEditingSource] = useState(null);
  const [deletingSource, setDeletingSource] = useState(null);
  const [collectionDate, setCollectionDate] = useState(null);
  
  const { sources, loading, toggleSource, startCollection } = useSourceStore();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <MonitorOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const typeNames = {
          'maps': 'Карты',
          'review_site': 'Сайт отзывов',
          'social': 'Социальные сети'
        };
        return (
          <Tag color="blue">
            {typeNames[type] || type}
          </Tag>
        );
      },
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusColors = {
          'active': 'green',
          'inactive': 'red',
          'collecting': 'orange',
          'error': 'red'
        };
        const statusNames = {
          'active': 'Активен',
          'inactive': 'Неактивен',
          'collecting': 'Сбор данных',
          'error': 'Ошибка'
        };
        return (
          <Tag color={statusColors[status]}>
            {statusNames[status]}
          </Tag>
        );
      },
    },
    {
      title: 'Включен',
      dataIndex: 'isEnabled',
      key: 'isEnabled',
      render: (isEnabled, record) => (
        <Switch
          checked={isEnabled}
          onChange={() => handleToggleSource(record.id)}
          loading={loading}
        />
      ),
    },
    {
      title: 'Отзывов',
      dataIndex: 'reviewsCount',
      key: 'reviewsCount',
      render: (count) => <Tag color="blue">{count}</Tag>,
    },
    {
      title: 'Последний сбор',
      dataIndex: 'lastCollection',
      key: 'lastCollection',
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={<SettingOutlined />}
          onClick={() => handleConfigureSource(record)}
        >
          Настроить
        </Button>
      ),
    },
  ];

  const handleToggleSource = async (sourceId) => {
    const result = await toggleSource(sourceId);
    if (result.success) {
      message.success('Статус источника изменен');
    }
  };

  const handleConfigureSource = (source) => {
    setEditingSource(source);
    setIsSettingsModalVisible(true);
  };

  const handleSettingsModalCancel = () => {
    setIsSettingsModalVisible(false);
    setEditingSource(null);
  };


  const handleDeleteModalCancel = () => {
    setIsDeleteModalVisible(false);
    setDeletingSource(null);
  };

  const handleDeleteConfirm = () => {
    message.success('Источник удален');
    setIsDeleteModalVisible(false);
    setDeletingSource(null);
  };

  const handleStartCollection = () => {
    if (selectedSources.length === 0) {
      message.warning('Выберите источники для сбора данных');
      return;
    }
    setIsCollectionModalVisible(true);
  };

  const handleCollectionConfirm = async () => {
    const result = await startCollection(selectedSources);
    if (result.success) {
      message.success('Сбор данных запущен');
      setSelectedSources([]);
      setIsCollectionModalVisible(false);
    }
  };

  const rowSelection = {
    selectedRowKeys: selectedSources,
    onChange: setSelectedSources,
    getCheckboxProps: (record) => ({
      disabled: !record.isEnabled,
    }),
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
            Управление источниками
          </Title>
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={handleStartCollection}
            disabled={selectedSources.length === 0}
          >
            Запустить сбор ({selectedSources.length})
          </Button>
        </div>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={sources}
          rowKey="id"
          loading={loading}
          scroll={{ x: 1000 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} из ${total} источников`
          }}
        />
      </Card>

      <Modal
        title="Настройка сбора данных"
        open={isCollectionModalVisible}
        onOk={handleCollectionConfirm}
        onCancel={() => setIsCollectionModalVisible(false)}
        okText="Запустить сбор"
        cancelText="Отмена"
      >
        <div style={{ marginBottom: '16px' }}>
          <Typography.Text strong>
            Выбранные источники: {selectedSources.length}
          </Typography.Text>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <Typography.Text>Период сбора данных:</Typography.Text>
          <RangePicker 
            style={{ width: '100%', marginTop: '8px' }}
            value={collectionDate}
            onChange={setCollectionDate}
          />
        </div>

        <div style={{ background: '#f5f5f5', padding: '12px', borderRadius: '6px' }}>
          <Typography.Text type="secondary">
            Сбор данных может занять несколько минут. 
            Вы будете уведомлены о завершении процесса.
          </Typography.Text>
        </div>
      </Modal>

      {/* Модальное окно настроек источника */}
      <Modal
        title={`Настройки источника: ${editingSource?.name}`}
        open={isSettingsModalVisible}
        onCancel={handleSettingsModalCancel}
        width={600}
        footer={[
          <Button key="cancel" onClick={handleSettingsModalCancel}>
            Отмена
          </Button>,
          <Button 
            key="delete" 
            danger 
            onClick={() => {
              setIsSettingsModalVisible(false);
              setDeletingSource(editingSource);
              setIsDeleteModalVisible(true);
            }}
          >
            Удалить источник
          </Button>,
          <Button key="save" type="primary" onClick={() => {
            message.success('Настройки источника сохранены');
            setIsSettingsModalVisible(false);
            setEditingSource(null);
          }}>
            Сохранить
          </Button>
        ]}
      >
        {editingSource && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <Title level={5}>Параметры сбора данных</Title>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Частота сбора:
                </label>
                <Select defaultValue="daily" style={{ width: '100%' }}>
                  <Option value="hourly">Каждый час</Option>
                  <Option value="daily">Ежедневно</Option>
                  <Option value="weekly">Еженедельно</Option>
                  <Option value="manual">Вручную</Option>
                </Select>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Глубина поиска:
                </label>
                <Select defaultValue="10" style={{ width: '100%' }}>
                  <Option value="5">5 страниц</Option>
                  <Option value="10">10 страниц</Option>
                  <Option value="20">20 страниц</Option>
                  <Option value="50">50 страниц</Option>
                </Select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Ключевые слова для поиска:
                </label>
                <Input.TextArea 
                  placeholder="Введите ключевые слова через запятую"
                  rows={3}
                  defaultValue="отзыв, рейтинг, оценка, мнение"
                />
              </div>
            </div>


            <div style={{ marginBottom: '24px' }}>
              <Title level={5}>Фильтрация контента</Title>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Исключить отзывы с рейтингом:
                </label>
                <Select mode="multiple" style={{ width: '100%' }} placeholder="Выберите рейтинги для исключения">
                  <Option value="1">1 звезда</Option>
                  <Option value="2">2 звезды</Option>
                  <Option value="3">3 звезды</Option>
                  <Option value="4">4 звезды</Option>
                  <Option value="5">5 звезд</Option>
                </Select>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Приоритет источника:
                </label>
                <Select defaultValue="medium" style={{ width: '100%' }}>
                  <Option value="low">Низкий</Option>
                  <Option value="medium">Средний</Option>
                  <Option value="high">Высокий</Option>
                  <Option value="critical">Критический</Option>
                </Select>
              </div>
            </div>
          </div>
        )}
      </Modal>


      {/* Модальное окно удаления источника */}
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
            Вы уверены, что хотите удалить этот источник?
          </Typography.Title>
          {deletingSource && (
            <div style={{
              background: '#f5f5f5',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '16px'
            }}>
              <Typography.Text strong>Источник:</Typography.Text>
              <br />
              <Typography.Text>{deletingSource.name}</Typography.Text>
              <br />
              <Typography.Text type="secondary">{deletingSource.type}</Typography.Text>
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

export default SourceManagement;
