import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mockCredentials = {
    email: 'admin@codearena.com',
    password: 'Admin@2025'
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Admin ID is required';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    setIsLoading(true);

    try {
      const response = await api.post('/admin/login', {
        id: formData.email, // The backend expects 'id', we map the 'email' input to it
        password: formData.password
      });

      if (response.status === 200) {
        // Backend response format: { error: nil, token: "...", refresh_token: "..." }
        const { token } = response.data;

        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminToken', token);
        localStorage.setItem('userRole', 'admin');

        if (formData?.rememberMe) {
          localStorage.setItem('rememberAdmin', 'true');
        }
        navigate('/admin-dashboard');
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle axios error response structure
      const errorMessage = error.response?.data?.error || "Login failed. Please check your credentials.";
      setErrors({
        submit: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Admin ID"
        type="text"
        name="email"
        placeholder="admin"
        value={formData?.email}
        onChange={handleChange}
        error={errors?.email}
        required
        disabled={isLoading}
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleChange}
          error={errors?.password}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          tabIndex={-1}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleChange}
          disabled={isLoading}
        />
        <button
          type="button"
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          onClick={() => alert('Please contact system administrator for password reset')}
        >
          Forgot Password?
        </button>
      </div>
      {errors?.submit && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg flex items-start gap-3">
          <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
          <p className="text-sm text-error">{errors?.submit}</p>
        </div>
      )}
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="Shield"
        iconPosition="left"
        className="h-12"
      >
        Admin Sign In
      </Button>
      <div className="pt-4 border-t border-border">
        <p className="text-sm text-center text-muted-foreground">
          Not an administrator?{' '}
          <button
            type="button"
            onClick={() => navigate('/student-login-registration')}
            className="font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Student Login
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;