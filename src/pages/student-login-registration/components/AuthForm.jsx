import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const AuthForm = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const [errors, setErrors] = useState({});

    const mockCredentials = {
        email: 'student@codearena.com',
        password: 'Student@123'
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e?.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (errors?.[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!isLogin && !formData?.name?.trim()) {
            newErrors.name = 'Full name is required';
        }

        if (!formData?.email?.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData?.password) {
            newErrors.password = 'Password is required';
        } else if (formData?.password?.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!isLogin) {
            if (!formData?.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData?.password !== formData?.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }

            if (!formData?.agreeToTerms) {
                newErrors.agreeToTerms = 'You must agree to the terms and conditions';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors)?.length === 0;
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            if (isLogin) {
                if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
                    navigate('/student-dashboard');
                } else {
                    setErrors({
                        email: 'Invalid credentials. Use: student@codearena.com',
                        password: 'Invalid credentials. Use: Student@123'
                    });
                }
            } else {
                navigate('/student-dashboard');
            }
            setIsLoading(false);
        }, 1500);
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeToTerms: false
        });
        setErrors({});
        setShowPassword(false);
        setShowConfirmPassword(false);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-card rounded-2xl shadow-elevated p-8 border border-border">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                        <Icon name="Code2" size={32} className="text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="text-muted-foreground">
                        {isLogin
                            ? 'Sign in to continue your coding journey' : 'Start your competitive programming journey'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <Input
                            label="Full Name"
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData?.name}
                            onChange={handleInputChange}
                            error={errors?.name}
                            required={!isLogin}
                        />
                    )}

                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData?.email}
                        onChange={handleInputChange}
                        error={errors?.email}
                        required
                    />

                    <div className="relative">
                        <Input
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Enter your password"
                            value={formData?.password}
                            onChange={handleInputChange}
                            error={errors?.password}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
                        </button>
                    </div>

                    {!isLogin && (
                        <div className="relative">
                            <Input
                                label="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData?.confirmPassword}
                                onChange={handleInputChange}
                                error={errors?.confirmPassword}
                                required={!isLogin}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
                                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                            >
                                <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
                            </button>
                        </div>
                    )}

                    {isLogin && (
                        <div className="flex items-center justify-between">
                            <Checkbox
                                label="Remember me"
                                size="sm"
                            />
                            <button
                                type="button"
                                className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                            >
                                Forgot Password?
                            </button>
                        </div>
                    )}

                    {!isLogin && (
                        <Checkbox
                            label="I agree to the Terms of Service and Privacy Policy"
                            checked={formData?.agreeToTerms}
                            onChange={handleInputChange}
                            name="agreeToTerms"
                            error={errors?.agreeToTerms}
                            required
                        />
                    )}

                    <Button
                        type="submit"
                        variant="default"
                        size="lg"
                        fullWidth
                        loading={isLoading}
                        iconName={isLogin ? 'LogIn' : 'UserPlus'}
                        iconPosition="left"
                    >
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        <button
                            type="button"
                            onClick={toggleAuthMode}
                            className="text-primary hover:text-primary/80 transition-colors font-semibold"
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-4">
                        <div className="h-px flex-1 bg-border"></div>
                        <span>Or continue with</span>
                        <div className="h-px flex-1 bg-border"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            size="default"
                            iconName="Github"
                            iconPosition="left"
                        >
                            GitHub
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="default"
                            iconName="Mail"
                            iconPosition="left"
                        >
                            Google
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                    Looking for admin access?
                </p>
                <button
                    type="button"
                    onClick={() => navigate('/admin-login')}
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                >
                    <Icon name="Shield" size={16} />
                    Admin Login
                </button>
            </div>
        </div>
    );
};

export default AuthForm;