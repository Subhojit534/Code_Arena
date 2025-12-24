import React from 'react';
import AuthForm from './components/AuthForm';
import FeatureHighlight from './components/FeatureHighlight';
import TrustIndicators from './components/TrustIndicator';

const StudentLoginRegistration = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                    <div className="order-2 lg:order-1 hidden lg:block">
                        <FeatureHighlight />
                    </div>

                    <div className="order-1 lg:order-2">
                        <AuthForm />
                    </div>
                </div>

                <div className="mt-12 lg:hidden">
                    <FeatureHighlight />
                </div>

                <div className="mt-16 max-w-4xl mx-auto">
                    <TrustIndicators />
                </div>
            </div>
        </div>
    );
};

export default StudentLoginRegistration;