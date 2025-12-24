import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkImportModal = ({ isOpen, onClose, onImport }) => {
  const [importFormat, setImportFormat] = useState('json');
  const [importData, setImportData] = useState('');
  const [validationError, setValidationError] = useState('');

  const formatOptions = [
    { value: 'json', label: 'JSON Format', description: 'Import test cases from JSON array' },
    { value: 'csv', label: 'CSV Format', description: 'Import test cases from CSV file' }
  ];

  const jsonExample = `[
  {
    "description": "Basic addition test",
    "input": "2 3",
    "expectedOutput": "5",
    "isPublic": true,
    "priority": "high"
  },
  {
    "description": "Large numbers test",
    "input": "1000000 2000000",
    "expectedOutput": "3000000",
    "isPublic": false,
    "priority": "medium"
  }
]`;

  const csvExample = `description,input,expectedOutput,isPublic,priority
"Basic addition test","2 3","5",true,high "Large numbers test","1000000 2000000","3000000",false,medium`;

  const validateAndImport = () => {
    setValidationError('');
    
    if (!importData?.trim()) {
      setValidationError('Please enter data to import');
      return;
    }

    try {
      let testCases = [];
      
      if (importFormat === 'json') {
        testCases = JSON.parse(importData);
        if (!Array.isArray(testCases)) {
          throw new Error('JSON must be an array of test cases');
        }
      } else {
        const lines = importData?.trim()?.split('\n');
        const headers = lines?.[0]?.split(',')?.map(h => h?.trim()?.replace(/"/g, ''));
        
        testCases = lines?.slice(1)?.map(line => {
          const values = line?.split(',')?.map(v => v?.trim()?.replace(/"/g, ''));
          const testCase = {};
          headers?.forEach((header, index) => {
            if (header === 'isPublic') {
              testCase[header] = values?.[index]?.toLowerCase() === 'true';
            } else {
              testCase[header] = values?.[index];
            }
          });
          return testCase;
        });
      }

      testCases?.forEach((tc, index) => {
        if (!tc?.description || !tc?.input || !tc?.expectedOutput) {
          throw new Error(`Test case ${index + 1} is missing required fields`);
        }
      });

      onImport(testCases);
      setImportData('');
      onClose();
    } catch (error) {
      setValidationError(error?.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animation-fade-in">
      <div className="bg-card rounded-lg border border-border shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-hidden animation-scale-in">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Upload" size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Bulk Import Test Cases</h2>
                <p className="text-sm text-muted-foreground">Import multiple test cases at once</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <Select
            label="Import Format"
            description="Choose the format of your import data"
            options={formatOptions}
            value={importFormat}
            onChange={setImportFormat}
            className="mb-6"
          />

          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Import Data <span className="text-destructive">*</span>
            </label>
            <textarea
              className="w-full min-h-[300px] px-4 py-3 bg-background border border-input rounded-lg text-sm text-foreground font-mono resize-y focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              placeholder={`Paste your ${importFormat?.toUpperCase()} data here...`}
              value={importData}
              onChange={(e) => setImportData(e?.target?.value)}
            />
            {validationError && (
              <p className="mt-2 text-sm text-destructive">{validationError}</p>
            )}
          </div>

          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-start gap-3 mb-3">
              <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Format Example</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Use this format for your {importFormat?.toUpperCase()} import
                </p>
              </div>
            </div>
            <pre className="text-xs text-foreground font-mono bg-background p-4 rounded-lg border border-border overflow-x-auto">
              {importFormat === 'json' ? jsonExample : csvExample}
            </pre>
          </div>
        </div>

        <div className="p-6 border-t border-border flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={validateAndImport}
            iconName="Upload"
            iconPosition="left"
          >
            Import Test Cases
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkImportModal;