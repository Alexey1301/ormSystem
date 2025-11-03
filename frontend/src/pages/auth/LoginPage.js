import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Space } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const { Title, Text } = Typography;

const LoginPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const navigate = useNavigate();
  const { login, resetPassword } = useAuthStore();

  const onFinish = async (values) => {
    setLoading(true);
    const result = await login(values);
    setLoading(false);
    
    if (result.success) {
      message.success('Успешный вход в систему!');
      navigate('/dashboard');
    } else {
      message.error(result.error);
    }
  };

  const handleResetPassword = async () => {
    const email = form.getFieldValue('email');
    if (!email) {
      message.error('Введите email для сброса пароля');
      return;
    }
    
    setLoading(true);
    const result = await resetPassword(email);
    setLoading(false);
    
    if (result.success) {
      message.success(result.message);
      setShowResetPassword(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Card 
        style={{ 
          width: '100%', 
          maxWidth: 400,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          borderRadius: '12px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title level={2} style={{ color: '#1890ff', marginBottom: '8px' }}>
            Система управления репутацией
          </Title>
          <Text type="secondary">Войдите в свой аккаунт</Text>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Введите email!' },
              { type: 'email', message: 'Введите корректный email!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Введите пароль!' }]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Пароль" 
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              style={{ width: '100%', height: '40px' }}
            >
              Войти
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Button 
              type="link" 
              onClick={() => setShowResetPassword(!showResetPassword)}
              style={{ padding: 0 }}
            >
              Забыли пароль?
            </Button>
          </div>

          {showResetPassword && (
            <Card 
              size="small" 
              style={{ marginTop: '16px', background: '#f5f5f5' }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text strong>Сброс пароля</Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Введите email для получения инструкций по сбросу пароля
                </Text>
                <Button 
                  type="primary" 
                  size="small"
                  loading={loading}
                  onClick={handleResetPassword}
                >
                  Отправить инструкции
                </Button>
              </Space>
            </Card>
          )}
        </Form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Тестовые аккаунты:
          </Text>
          <div style={{ marginTop: '8px', fontSize: '11px', color: '#666' }}>
            <div>admin@company.com / admin123</div>
            <div>manager@company.com / manager123</div>
            <div>moderator@company.com / moderator123</div>
            <div>specialist@company.com / specialist123</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
