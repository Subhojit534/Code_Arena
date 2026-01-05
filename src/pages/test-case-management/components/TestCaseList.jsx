import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestCaseList = ({ testCases, onEdit, onDelete, onToggleVisibility }) => {
  const getVisibilityBadge = (isPublic) => {
    if (isPublic) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent/10 text-accent text-xs font-medium">
          <Icon name="Eye" size={12} />
          Public
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-destructive/10 text-destructive text-xs font-medium">
        <Icon name="EyeOff" size={12} />
        Private
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-error/10 text-error',
      medium: 'bg-warning/10 text-warning',
      low: 'bg-muted text-muted-foreground'
    };
    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium ${colors?.[priority] || colors?.low}`}>
        {priority?.charAt(0)?.toUpperCase() + priority?.slice(1)}
      </span>
    );
  };

  if (testCases?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
          <Icon name="FileText" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Test Cases Yet</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Create your first test case to start evaluating code submissions
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-lg font-semibold">2</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Test Cases</h2>
              <p className="text-sm text-muted-foreground">{testCases?.length} test case{testCases?.length !== 1 ? 's' : ''} configured</p>
            </div>
          </div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {testCases?.map((testCase, index) => (
          <div key={testCase?.id} className="p-6 hover:bg-muted/30 transition-colors duration-200">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary text-sm font-semibold">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-semibold text-foreground">Test Case #{testCase?.id}</h3>
                    {getVisibilityBadge(testCase?.isPublic)}
                    {getPriorityBadge(testCase?.priority)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{testCase?.description}</p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Input</p>
                      <div className="bg-muted/50 rounded-lg p-3 border border-border">
                        <pre className="text-xs text-foreground font-mono whitespace-pre-wrap break-all">
                          {testCase?.isPublic ? testCase?.input : '••••••••••••'}
                        </pre>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Expected Output</p>
                      <div className="bg-muted/50 rounded-lg p-3 border border-border">
                        <pre className="text-xs text-foreground font-mono whitespace-pre-wrap break-all">
                          {testCase?.isPublic ? testCase?.expectedOutput : '••••••••••••'}
                        </pre>
                      </div>
                    </div>
                  </div>

                  {!testCase?.isPublic && (
                    <div className="mt-3 flex items-start gap-2 p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                      <Icon name="Shield" size={16} className="text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-destructive">
                        Private test case - Input and output are hidden from students and only used for evaluation
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onToggleVisibility(testCase?.id)}
                  title={testCase?.isPublic ? 'Make Private' : 'Make Public'}
                >
                  <Icon name={testCase?.isPublic ? 'EyeOff' : 'Eye'} size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(testCase)}
                  title="Edit test case"
                >
                  <Icon name="Edit" size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(testCase?.id)}
                  title="Delete test case"
                >
                  <Icon name="Trash2" size={18} className="text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCaseList;