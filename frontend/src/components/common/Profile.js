import React, { useState } from 'react';
import { 
  Card, 
  Typography,
  Row,
  Col,
  Avatar,
  Button,
  Form,
  Input,
  Select,
  message,
  Divider,
  Tag,
  Space
} from 'antd';
import { 
  UserOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  TeamOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  // Mock данные пользователя
  const userData = {
    id: 1,
    name: 'Алексей Иванов',
    email: 'alexey.ivanov@company.com',
    phone: '+7 (999) 123-45-67',
    role: 'specialist',
    roleName: 'Специалист',
    department: 'Отдел репутации',
    position: 'Специалист по работе с отзывами',
    hireDate: '2023-03-15',
    lastLogin: '2024-01-15 14:30',
    avatar: null,
    bio: 'Опытный специалист по работе с клиентскими отзывами. Специализируюсь на анализе тональности и построении позитивного имиджа компании.',
    skills: ['Анализ отзывов', 'Работа с клиентами', 'SMM', 'Копирайтинг'],
    stats: {
      tasksCompleted: 156,
      averageRating: 4.7,
      responseTime: '2.3 часа',
      satisfactionRate: 94
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      department: userData.department,
      position: userData.position,
      bio: userData.bio
    });
  };

  const handleSave = async (values) => {
    try {
      // Здесь будет API вызов для сохранения данных
      await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация API
      message.success('Профиль успешно обновлен');
      setIsEditing(false);
    } catch (error) {
      message.error('Ошибка при сохранении профиля');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  return (
    <div className="fade-in">
      <Row gutter={[24, 24]}>
        {/* Основная информация */}
        <Col xs={24} lg={16}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <UserOutlined />
                <span>Личная информация</span>
                {!isEditing && (
                  <Button 
                    type="primary" 
                    icon={<EditOutlined />} 
                    size="small"
                    onClick={handleEdit}
                    style={{ marginLeft: 'auto' }}
                  >
                    Редактировать
                  </Button>
                )}
              </div>
            }
          >
            {!isEditing ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                  <Avatar size={80} icon={<UserOutlined />} style={{ marginRight: '16px' }} />
                  <div>
                    <Title level={3} style={{ margin: 0, marginBottom: '8px' }}>
                      {userData.name}
                    </Title>
                    <Tag color="blue" style={{ marginBottom: '8px' }}>
                      {userData.roleName}
                    </Tag>
                    <div style={{ color: '#666' }}>
                      <Text>{userData.position}</Text>
                    </div>
                  </div>
                </div>

                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <div style={{ marginBottom: '16px' }}>
                      <Text strong><MailOutlined /> Email:</Text>
                      <br />
                      <Text>{userData.email}</Text>
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div style={{ marginBottom: '16px' }}>
                      <Text strong><PhoneOutlined /> Телефон:</Text>
                      <br />
                      <Text>{userData.phone}</Text>
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div style={{ marginBottom: '16px' }}>
                      <Text strong><TeamOutlined /> Отдел:</Text>
                      <br />
                      <Text>{userData.department}</Text>
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div style={{ marginBottom: '16px' }}>
                      <Text strong><CalendarOutlined /> Дата найма:</Text>
                      <br />
                      <Text>{userData.hireDate}</Text>
                    </div>
                  </Col>
                </Row>

                <Divider />

                <div style={{ marginBottom: '16px' }}>
                  <Text strong>О себе:</Text>
                  <br />
                  <Text>{userData.bio}</Text>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <Text strong>Навыки:</Text>
                  <br />
                  <Space wrap style={{ marginTop: '8px' }}>
                    {userData.skills.map((skill, index) => (
                      <Tag key={index} color="green">{skill}</Tag>
                    ))}
                  </Space>
                </div>
              </div>
            ) : (
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="name"
                      label="ФИО"
                      rules={[{ required: true, message: 'Введите ФИО' }]}
                    >
                      <Input placeholder="Введите ФИО" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: 'Введите email' },
                        { type: 'email', message: 'Введите корректный email' }
                      ]}
                    >
                      <Input placeholder="Введите email" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="phone"
                      label="Телефон"
                      rules={[{ required: true, message: 'Введите телефон' }]}
                    >
                      <Input placeholder="Введите телефон" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="department"
                      label="Отдел"
                      rules={[{ required: true, message: 'Выберите отдел' }]}
                    >
                      <Select placeholder="Выберите отдел">
                        <Option value="Отдел репутации">Отдел репутации</Option>
                        <Option value="Отдел маркетинга">Отдел маркетинга</Option>
                        <Option value="Отдел продаж">Отдел продаж</Option>
                        <Option value="IT отдел">IT отдел</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="position"
                  label="Должность"
                  rules={[{ required: true, message: 'Введите должность' }]}
                >
                  <Input placeholder="Введите должность" />
                </Form.Item>

                <Form.Item
                  name="bio"
                  label="О себе"
                >
                  <TextArea 
                    rows={4} 
                    placeholder="Расскажите о себе..."
                  />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                      Сохранить
                    </Button>
                    <Button onClick={handleCancel} icon={<CloseOutlined />}>
                      Отмена
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            )}
          </Card>
        </Col>

        {/* Статистика и дополнительная информация */}
        <Col xs={24} lg={8}>
          <Card title="Статистика работы" style={{ marginBottom: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1890ff', marginBottom: '8px' }}>
                {userData.stats.tasksCompleted}
              </div>
              <Text type="secondary">Задач выполнено</Text>
            </div>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a', marginBottom: '4px' }}>
                    {userData.stats.averageRating}
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>Средний рейтинг</Text>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#faad14', marginBottom: '4px' }}>
                    {userData.stats.responseTime}
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>Время ответа</Text>
                </div>
              </Col>
            </Row>

            <Divider />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#52c41a', marginBottom: '4px' }}>
                {userData.stats.satisfactionRate}%
              </div>
              <Text type="secondary">Удовлетворенность клиентов</Text>
            </div>
          </Card>

          <Card title="Системная информация">
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Последний вход:</Text>
              <br />
              <Text type="secondary">{userData.lastLogin}</Text>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Text strong>ID пользователя:</Text>
              <br />
              <Text type="secondary">#{userData.id}</Text>
            </div>
            <div>
              <Text strong>Роль в системе:</Text>
              <br />
              <Tag color="blue">{userData.roleName}</Tag>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
