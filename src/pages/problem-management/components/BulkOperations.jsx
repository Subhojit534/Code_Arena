import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkOperationsBar = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [bulkAction, setBulkAction] = useState('');

  const bulkActionOptions = [
    { value: '', label: 'Select action...' },
    { value: 'publish', label: 'Publish Selected' },
    { value: 'archive', label: 'Archive Selected' },
    { value: 'draft', label: 'Move to Draft' },
    { value: 'delete', label: 'Delete Selected' }
  ];

  const handleApplyAction = () => {
    if (bulkAction) {
      onBulkAction(bulkAction);
      setBulkAction('');
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animation-slide-up">
      <div className="bg-card border border-border rounded-lg shadow-elevated p-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Icon name="CheckSquare" size={20} className="text-primary" />
          <span className="font-medium text-foreground">
            {selectedCount} problem{selectedCount > 1 ? 's' : ''} selected
          </span>
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex items-center gap-2">
          <Select
            options={bulkActionOptions}
            value={bulkAction}
            onChange={setBulkAction}
            placeholder="Select action"
            className="w-48"
          />
          <Button
            variant="default"
            size="sm"
            onClick={handleApplyAction}
            disabled={!bulkAction}
          >
            Apply
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClearSelection}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkOperationsBar;