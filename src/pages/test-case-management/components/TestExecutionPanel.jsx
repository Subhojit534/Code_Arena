import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestExecutionPreview = ({ testCase, onClose }) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);

  const executePreview = () => {
    setIsExecuting(true);
    
    setTimeout(() => {
      const passed = Math.random() > 0.3;
      setExecutionResult({
        passed,
        executionTime: Math.floor(Math.random() * 500) + 50,
        memoryUsed: Math.floor(Math.random() * 50) + 10,
        actualOutput: passed ? testCase?.expectedOutput : 'Different output',
        timestamp: new Date()?.toISOString()
      });
      setIsExecuting(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animation-fade-in">
      <div className="bg-card rounded-lg border border-border shadow-elevated w-full max-w-3xl max-h-[90vh] overflow-hidden animation-scale-in">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Play" size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Test Execution Preview</h2>
                <p className="text-sm text-muted-foreground">Verify test case correctness</p>
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
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Test Case Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Input</p>
                  <div className="bg-muted/50 rounded-lg p-3 border border-border">
                    <pre className="text-xs text-foreground font-mono whitespace-pre-wrap break-all">
                      {testCase?.input}
                    </pre>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Expected Output</p>
                  <div className="bg-muted/50 rounded-lg p-3 border border-border">
                    <pre className="text-xs text-foreground font-mono whitespace-pre-wrap break-all">
                      {testCase?.expectedOutput}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {!executionResult && !isExecuting && (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Play" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Execute</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Click the button below to run a preview execution of this test case
                </p>
                <Button
                  variant="default"
                  onClick={executePreview}
                  iconName="Play"
                  iconPosition="left"
                >
                  Execute Preview
                </Button>
              </div>
            )}

            {isExecuting && (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Icon name="Loader" size={32} className="text-primary animate-spin" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Executing Test Case</h3>
                <p className="text-sm text-muted-foreground">
                  Running validation checks...
                </p>
              </div>
            )}

            {executionResult && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border ${executionResult?.passed ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${executionResult?.passed ? 'bg-success/10' : 'bg-destructive/10'}`}>
                      <Icon 
                        name={executionResult?.passed ? 'CheckCircle' : 'XCircle'} 
                        size={24} 
                        className={executionResult?.passed ? 'text-success' : 'text-destructive'} 
                      />
                    </div>
                    <div>
                      <h3 className={`text-base font-semibold ${executionResult?.passed ? 'text-success' : 'text-destructive'}`}>
                        {executionResult?.passed ? 'Test Passed' : 'Test Failed'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Execution completed at {new Date(executionResult.timestamp)?.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Clock" size={16} className="text-muted-foreground" />
                      <p className="text-xs font-medium text-muted-foreground">Execution Time</p>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{executionResult?.executionTime}ms</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Database" size={16} className="text-muted-foreground" />
                      <p className="text-xs font-medium text-muted-foreground">Memory Used</p>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{executionResult?.memoryUsed}MB</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Actual Output</p>
                  <div className="bg-muted/50 rounded-lg p-3 border border-border">
                    <pre className="text-xs text-foreground font-mono whitespace-pre-wrap break-all">
                      {executionResult?.actualOutput}
                    </pre>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={executePreview}
                  iconName="RotateCw"
                  iconPosition="left"
                  fullWidth
                >
                  Run Again
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-border flex items-center justify-end">
          <Button
            variant="default"
            onClick={onClose}
          >
            Close Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestExecutionPreview;