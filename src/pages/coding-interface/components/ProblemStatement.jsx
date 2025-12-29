import React from 'react';
import Icon from '../../../components/AppIcon';

const ProblemStatement = ({ problem, activeTestCase, setActiveTestCase }) => {
  if (!problem) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <Icon name="Code2" size={48} className="mx-auto mb-4 opacity-50" />
          <p>Select a problem to start coding</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-card">
      <div className="p-6 space-y-6">
        {/* Problem Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-foreground">{problem?.title}</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${problem?.difficulty === 'Easy' ? 'bg-success/10 text-success' :
              problem?.difficulty === 'Medium' ? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
              }`}>
              {problem?.difficulty}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="Trophy" size={16} />
              <span>{problem?.score} points</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Users" size={16} />
              <span>{problem?.submissions} submissions</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="CheckCircle2" size={16} />
              <span>{problem?.successRate}% success rate</span>
            </div>
          </div>
        </div>

        {/* Problem Description */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Description</h2>
          <p className="text-foreground leading-relaxed whitespace-pre-line">{problem?.description}</p>
        </div>

        {/* Constraints */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Constraints</h2>
          <ul className="space-y-2 text-foreground">
            {problem?.constraints?.map((constraint, index) => (
              <li key={index} className="flex items-start gap-2">
                <Icon name="ChevronRight" size={16} className="mt-1 text-primary flex-shrink-0" />
                <span>{constraint}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Examples */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Examples</h2>
          {problem?.examples?.map((example, index) => (
            <div key={index} className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="font-medium text-foreground">Example {index + 1}</div>
              <div className="space-y-2">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Input:</div>
                  <code className="block whitespace-pre bg-background px-3 py-2 rounded text-sm font-mono text-foreground">
                    {example?.input}
                  </code>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Output:</div>
                  <code className="block whitespace-pre bg-background px-3 py-2 rounded text-sm font-mono text-foreground">
                    {example?.output}
                  </code>
                </div>
                {example?.explanation && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Explanation:</div>
                    <p className="text-sm text-foreground">{example?.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Public Test Cases */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Public Test Cases</h2>
          <div className="space-y-3">
            {problem?.publicTestCases?.map((testCase, index) => (
              <div
                key={index}
                onClick={() => setActiveTestCase(index)}
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${activeTestCase === index
                  ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium text-foreground">Test Case {index + 1}</div>
                  {testCase?.status && (
                    <div className={`flex items-center gap-1 text-sm ${testCase?.status === 'passed' ? 'text-success' : 'text-error'
                      }`}>
                      <Icon name={testCase?.status === 'passed' ? 'CheckCircle2' : 'XCircle'} size={16} />
                      <span className="capitalize">{testCase?.status}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Input:</div>
                    <code className="whitespace-pre block bg-background px-3 py-2 rounded text-xs font-mono text-foreground">
                      {testCase?.input}
                    </code>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Expected Output:</div>
                    <code className="block whitespace-pre bg-background px-3 py-2 rounded text-xs font-mono text-foreground">
                      {testCase?.expectedOutput}
                    </code>
                  </div>
                  {testCase?.actualOutput && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Your Output:</div>
                      <code className={`block px-3 py-2 rounded text-xs font-mono ${testCase?.status === 'passed' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                        }`}>
                        {testCase?.actualOutput}
                      </code>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemStatement;