import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  message, 
  Space,
  Tag,
  Typography,
  Card
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  UserOutlined 
} from '@ant-design/icons';
import useUserStore from '../../store/userStore';

const { Title } = Typography;
const { Option } = Select;

const UserManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [form] = Form.useForm();
  
  const { users, loading, addUser, updateUser, deleteUser } = useUserStore();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text, record) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
      width: 130,
      render: (role) => {
        const roleColors = {
          admin: 'red',
          manager: 'blue',
          moderator: 'orange',
          specialist: 'green'
        };
        const roleNames = {
          admin: 'Администратор',
          manager: 'Управляющий',
          moderator: 'Модератор',
          specialist: 'Специалист'
        };
        return (
          <Tag color={roleColors[role]}>
            {roleNames[role]}
          </Tag>
        );
      },
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Активен' : 'Неактивен'}
        </Tag>
      ),
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 140,
    },
    {
      title: 'Последний вход',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      width: 140,
      render: (date) => date || 'Никогда',
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Редактировать
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteClick(record)}
          >
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
    form.setFieldsValue(user);
  };

  const handleDeleteClick = (user) => {
    setDeletingUser(user);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingUser) {
      const result = await deleteUser(deletingUser.id);
      if (result.success) {
        message.success('Пользователь успешно удален');
        setIsDeleteModalVisible(false);
        setDeletingUser(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setDeletingUser(null);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingUser) {
        const result = await updateUser(editingUser.id, values);
        if (result.success) {
          message.success('Пользователь успешно обновлен');
        }
      } else {
        const result = await addUser(values);
        if (result.success) {
          message.success('Пользователь успешно создан');
        }
      }
      
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
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
            Управление пользователями
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            size="large"
          >
            Добавить пользователя
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          loading={loading}
          scroll={{ x: 1200 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} из ${total} пользователей`
          }}
        />
      </Card>

      <Modal
        title={editingUser ? 'Редактировать пользователя' : 'Добавить пользователя'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
        okText="Сохранить"
        cancelText="Отмена"
      >
        <Form
          form={form}
          layout="vertical"
          name="userForm"
        >
          <Form.Item
            name="name"
            label="Имя"
            rules={[{ required: true, message: 'Введите имя пользователя!' }]}
          >
            <Input placeholder="Введите имя пользователя" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Введите email!' },
              { type: 'email', message: 'Введите корректный email!' }
            ]}
          >
            <Input placeholder="Введите email" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Роль"
            rules={[{ required: true, message: 'Выберите роль!' }]}
          >
            <Select placeholder="Выберите роль">
              <Option value="admin">Администратор</Option>
              <Option value="manager">Управляющий</Option>
              <Option value="moderator">Модератор</Option>
              <Option value="specialist">Специалист</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Статус"
            rules={[{ required: true, message: 'Выберите статус!' }]}
          >
            <Select placeholder="Выберите статус">
              <Option value="active">Активен</Option>
              <Option value="inactive">Неактивен</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Подтверждение удаления"
        open={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
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
            Вы уверены, что хотите удалить этого пользователя?
          </Typography.Title>
          {deletingUser && (
            <div style={{ 
              background: '#f5f5f5', 
              padding: '16px', 
              borderRadius: '8px',
              marginBottom: '16px'
            }}>
              <Typography.Text strong>Пользователь:</Typography.Text>
              <br />
              <Typography.Text>{deletingUser.name}</Typography.Text>
              <br />
              <Typography.Text type="secondary">{deletingUser.email}</Typography.Text>
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

export default UserManagement;
