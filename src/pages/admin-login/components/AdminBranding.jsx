import React from 'react';
import Icon from '../../../components/AppIcon';

const AdminBranding = () => {
  return (
    <div className="text-center space-y-4">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl">
        <Icon name="Shield" size={32} className="text-primary" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Administrator Access
        </h1>
        <p className="text-muted-foreground">
          Secure login for platform management and administration
        </p>
      </div>
    </div>
  );
};

export default AdminBranding;