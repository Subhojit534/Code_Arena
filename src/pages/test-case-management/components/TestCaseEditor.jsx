import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const TestCaseEditor = ({ 
  formData, 
  onChange, 
  onSubmit, 
  onCancel, 
  isEditing,
  errors 
}) => {
  const priorityOptions = [
    { value: 'high', label: 'High Priority', description: 'Critical test case for evaluation' },
    { value: 'medium', label: 'Medium Priority', description: 'Standard test case' },
    { value: 'low', label: 'Low Priority', description: 'Optional edge case' }
  ];

  const handleInputChange = (field, value) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-lg font-semibold">3</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {isEditing ? 'Edit Test Case' : 'Create New Test Case'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isEditing ? 'Update test case details and visibility' : 'Add a new test case for the selected problem'}
            </p>
          </div>
        </div>
      </div>
      <form onSubmit={onSubmit} className="p-6 space-y-6">
        <Input
          label="Test Case Description"
          type="text"
          placeholder="Brief description of what this test case validates"
          value={formData?.description}
          onChange={(e) => handleInputChange('description', e?.target?.value)}
          error={errors?.description}
          required
          description="Provide a clear description for internal reference"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Input Data <span className="text-destructive">*</span>
            </label>
            <textarea
              className="w-full min-h-[200px] px-4 py-3 bg-background border border-input rounded-lg text-sm text-foreground font-mono resize-y focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              placeholder="Enter test case input (e.g., array, string, numbers)"
              value={formData?.input}
              onChange={(e) => handleInputChange('input', e?.target?.value)}
              required
            />
            {errors?.input && (
              <p className="mt-2 text-xs text-destructive">{errors?.input}</p>
            )}
            <p className="mt-2 text-xs text-muted-foreground">
              Format input data as it will be passed to the code
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Expected Output <span className="text-destructive">*</span>
            </label>
            <textarea
              className="w-full min-h-[200px] px-4 py-3 bg-background border border-input rounded-lg text-sm text-foreground font-mono resize-y focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              placeholder="Enter expected output for validation"
              value={formData?.expectedOutput}
              onChange={(e) => handleInputChange('expectedOutput', e?.target?.value)}
              required
            />
            {errors?.expectedOutput && (
              <p className="mt-2 text-xs text-destructive">{errors?.expectedOutput}</p>
            )}
            <p className="mt-2 text-xs text-muted-foreground">
              Exact output expected from correct code execution
            </p>
          </div>
        </div>

        <Select
          label="Priority Level"
          description="Set execution priority for this test case"
          options={priorityOptions}
          value={formData?.priority}
          onChange={(value) => handleInputChange('priority', value)}
          required
        />

        <div className="p-4 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="Settings" size={16} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground mb-1">Visibility Settings</h3>
              <p className="text-xs text-muted-foreground">
                Control whether students can see this test case details
              </p>
            </div>
          </div>

          <Checkbox
            label="Make this a public test case"
            description="Public test cases are visible to students with full input/output details (maximum 3 public cases recommended)"
            checked={formData?.isPublic}
            onChange={(e) => handleInputChange('isPublic', e?.target?.checked)}
          />

          {!formData?.isPublic && (
            <div className="mt-4 flex items-start gap-3 p-3 bg-destructive/5 rounded-lg border border-destructive/20">
              <Icon name="ShieldAlert" size={20} className="text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-destructive mb-1">Private Test Case Security</p>
                <p className="text-xs text-destructive/80">
                  This test case will be completely hidden from students. Input and output will only be used for backend evaluation. Students will only see pass/fail status and score.
                </p>
              </div>
            </div>
          )}

          {formData?.isPublic && (
            <div className="mt-4 flex items-start gap-3 p-3 bg-accent/5 rounded-lg border border-accent/20">
              <Icon name="Eye" size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-accent mb-1">Public Test Case Visibility</p>
                <p className="text-xs text-accent/80">
                  Students will see the complete input, expected output, and actual output for this test case. This helps them understand and debug their code.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            iconName={isEditing ? 'Save' : 'Plus'}
            iconPosition="left"
          >
            {isEditing ? 'Update Test Case' : 'Create Test Case'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TestCaseEditor;