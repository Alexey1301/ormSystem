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
  BankOutlined 
} from '@ant-design/icons';
import useCompanyStore from '../../store/companyStore';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const CompanyManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deletingCompany, setDeletingCompany] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null);
  const [form] = Form.useForm();
  
  const { companies, loading, addCompany, updateCompany, deleteCompany } = useCompanyStore();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <BankOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Отрасль',
      dataIndex: 'industry',
      key: 'industry',
      render: (industry) => {
        const industryColors = {
          'IT': 'blue',
          'Услуги': 'green',
          'Медиа': 'purple',
          'Торговля': 'orange',
          'Производство': 'red'
        };
        return (
          <Tag color={industryColors[industry] || 'default'}>
            {industry}
          </Tag>
        );
      },
    },
    {
      title: 'Веб-сайт',
      dataIndex: 'website',
      key: 'website',
      render: (website) => (
        <a href={website} target="_blank" rel="noopener noreferrer">
          {website}
        </a>
      ),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Активна' : 'Неактивна'}
        </Tag>
      ),
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
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
    setEditingCompany(null);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setIsModalVisible(true);
    form.setFieldsValue(company);
  };

  const handleDeleteClick = (company) => {
    setDeletingCompany(company);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setDeletingCompany(null);
  };

  const handleDeleteConfirm = async () => {
    if (deletingCompany) {
      const result = await deleteCompany(deletingCompany.id);
      if (result.success) {
        message.success('Компания успешно удалена');
        setIsDeleteModalVisible(false);
        setDeletingCompany(null);
      }
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingCompany) {
        const result = await updateCompany(editingCompany.id, values);
        if (result.success) {
          message.success('Компания успешно обновлена');
        }
      } else {
        const result = await addCompany(values);
        if (result.success) {
          message.success('Компания успешно создана');
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
            Управление компаниями
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            size="large"
          >
            Добавить компанию
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={companies}
          rowKey="id"
          loading={loading}
          scroll={{ x: 1000 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} из ${total} компаний`
          }}
        />
      </Card>

      <Modal
        title={editingCompany ? 'Редактировать компанию' : 'Добавить компанию'}
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
          name="companyForm"
        >
          <Form.Item
            name="name"
            label="Название компании"
            rules={[{ required: true, message: 'Введите название компании!' }]}
          >
            <Input placeholder="Введите название компании" />
          </Form.Item>

          <Form.Item
            name="industry"
            label="Отрасль"
            rules={[{ required: true, message: 'Выберите отрасль!' }]}
          >
            <Select placeholder="Выберите отрасль">
              <Option value="IT">IT</Option>
              <Option value="Услуги">Услуги</Option>
              <Option value="Медиа">Медиа</Option>
              <Option value="Торговля">Торговля</Option>
              <Option value="Производство">Производство</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="website"
            label="Веб-сайт"
            rules={[
              { required: true, message: 'Введите веб-сайт!' },
              { type: 'url', message: 'Введите корректный URL!' }
            ]}
          >
            <Input placeholder="https://example.com" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Описание"
            rules={[{ required: true, message: 'Введите описание!' }]}
          >
            <TextArea 
              rows={3} 
              placeholder="Краткое описание деятельности компании" 
            />
          </Form.Item>

          <Form.Item
            name="status"
            label="Статус"
            rules={[{ required: true, message: 'Выберите статус!' }]}
          >
            <Select placeholder="Выберите статус">
              <Option value="active">Активна</Option>
              <Option value="inactive">Неактивна</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Модальное окно подтверждения удаления */}
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
          <Title level={4} style={{ marginBottom: '16px' }}>
            Вы уверены, что хотите удалить компанию?
          </Title>
          {deletingCompany && (
            <div style={{ 
              background: '#f5f5f5', 
              padding: '12px', 
              borderRadius: '6px',
              marginBottom: '16px'
            }}>
              <Text strong>{deletingCompany.name}</Text>
              <br />
              <Text type="secondary">{deletingCompany.industry}</Text>
            </div>
          )}
          <Text type="secondary">
            Это действие нельзя будет отменить.
          </Text>
        </div>
      </Modal>
    </div>
  );
};

export default CompanyManagement;
