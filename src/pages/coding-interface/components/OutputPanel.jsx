import React from 'react';
import Icon from '../../../components/AppIcon';

const OutputPanel = ({ output, isVisible, onToggle }) => {
  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground transition-all duration-200"
      >
        <Icon name="ChevronUp" size={16} />
        <span className="text-sm font-medium">Show Output</span>
      </button>
    );
  }

  return (
    <div className="border-t border-border bg-card">
      {/* Output Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <Icon name="Terminal" size={20} className="text-primary" />
          <span className="font-medium text-foreground">Output</span>
        </div>
        <button
          onClick={onToggle}
          className="p-1 rounded hover:bg-muted transition-colors duration-200"
        >
          <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
        </button>
      </div>
      {/* Output Content */}
      <div className="p-4 max-h-64 overflow-y-auto">
        {!output ? (
          <div className="text-center text-muted-foreground py-8">
            <Icon name="Terminal" size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Run your code to see the output here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Status */}
            {output?.status && (
              <div className={`flex items-center gap-2 text-sm font-medium ${output?.status === 'success' ? 'text-success' :
                output?.status === 'error' ? 'text-error' : 'text-warning'
                }`}>
                <Icon
                  name={
                    output?.status === 'success' ? 'CheckCircle2' :
                      output?.status === 'error' ? 'XCircle' : 'AlertCircle'
                  }
                  size={16}
                />
                <span className="capitalize">{output?.status}</span>
              </div>
            )}

            {/* Message */}
            {output?.message && (
              <div className="text-sm text-foreground">
                {output?.message}
              </div>
            )}

            {/* Compilation Error */}
            {output?.compilationError && (
              <div className="bg-error/10 border border-error/20 rounded-lg p-3">
                <div className="text-sm font-medium text-error mb-2">Compilation Error:</div>
                <pre className="text-xs text-error font-mono whitespace-pre-wrap">
                  {output?.compilationError}
                </pre>
              </div>
            )}

            {/* Runtime Error */}
            {output?.runtimeError && (
              <div className="bg-error/10 border border-error/20 rounded-lg p-3">
                <div className="text-sm font-medium text-error mb-2">Runtime Error:</div>
                <pre className="text-xs text-error font-mono whitespace-pre-wrap">
                  {output?.runtimeError}
                </pre>
              </div>
            )}

            {/* Complexity & Analysis */}
            {output.status === "success" ? (<div className="grid grid-cols-2 gap-4">
              {output?.complexity && (
                <div className="bg-muted/30 border border-border rounded-lg p-3">
                  <div className="text-xs font-medium text-muted-foreground mb-1">Estimated Time Complexity</div>
                  <div className="text-sm font-mono font-semibold text-primary">{output?.complexity}</div>
                </div>
              )}
              {output?.executionTime !== undefined && (
                <div className="bg-muted/30 border border-border rounded-lg p-3">
                  <div className="text-xs font-medium text-muted-foreground mb-1">Execution Time</div>
                  <div className="text-sm font-mono font-semibold text-primary">{output?.executionTime} ms</div>
                </div>
              )}
            </div>) : null}

            {/* Test Results */}
            {output?.testResults && (
              <div className="space-y-3">
                <div className="text-sm font-medium text-foreground">Test Results:</div>
                {output?.testResults?.map((result, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-3 ${result?.status?.current_status === "SUCCESS" ? 'border-success/20 bg-success/5' : 'border-error/20 bg-error/5'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        Test Case {index + 1}
                      </span>
                      <div className={`flex items-center gap-1 text-sm ${result?.status?.current_status === "SUCCESS" ? 'text-success' : 'text-error'
                        }`}>
                        <Icon name={result?.status?.current_status === "SUCCESS" ? 'CheckCircle2' : 'XCircle'} size={14} />
                        <span>{result?.status?.current_status === "SUCCESS" ? 'Passed' : 'Failed'}</span>
                      </div>
                    </div>
                    {result?.status?.message && (
                      <div className="text-xs text-muted-foreground mb-1">
                        <code className="text-foreground">{result?.status?.message}</code>
                      </div>
                    )}

                  </div>
                ))}
              </div>
            )}

            {/* Submission Results */}
            {output?.submissionResults && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Submission Results:</span>
                  <div className="text-sm text-muted-foreground">
                    Score: <span className="text-primary font-semibold">{output?.score}/{output?.totalScore}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-success/10 border border-success/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-success">{output?.passedTests}</div>
                    <div className="text-xs text-muted-foreground">Passed</div>
                  </div>
                  <div className="bg-error/10 border border-error/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-error">{output?.failedTests}</div>
                    <div className="text-xs text-muted-foreground">Failed</div>
                  </div>
                </div>
              </div>
            )}

            {output?.analysisResults && output?.analysisResults?.length > 0 && (
              <div className="bg-muted/30 border border-border rounded-lg p-3">
                <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <Icon name="Activity" size={14} />
                  Code Analysis
                </div>
                <div className="space-y-2">
                  {output?.analysisResults.map((item, idx) => (
                    <div key={idx} className={`text-xs flex items-start gap-2 ${item.type === 'warning' ? 'text-warning' :
                      item.type === 'error' ? 'text-error' : 'text-muted-foreground'
                      }`}>
                      <Icon name={item.type === 'warning' ? 'AlertTriangle' : 'Info'} size={12} className="mt-0.5" />
                      <span>{item.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;