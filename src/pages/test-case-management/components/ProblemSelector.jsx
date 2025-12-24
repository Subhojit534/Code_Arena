import React from 'react';
import Select from '../../../components/ui/Select';

const ProblemSelector = ({ problems, selectedProblem, onProblemChange, loading }) => {
  const problemOptions = problems?.map(problem => ({
    value: problem?.id,
    label: `${problem?.title} (${problem?.difficulty})`,
    description: `${problem?.testCaseCount || 0} test cases`
  }));

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="text-primary text-lg font-semibold">1</span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Select Problem</h2>
          <p className="text-sm text-muted-foreground">Choose a problem to manage its test cases</p>
        </div>
      </div>

      <Select
        label="Problem"
        placeholder="Select a coding problem"
        description="Test cases will be linked to the selected problem"
        options={problemOptions}
        value={selectedProblem}
        onChange={onProblemChange}
        searchable
        loading={loading}
        required
        className="mt-4"
      />

      {selectedProblem && (
        <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Problem Selected</p>
              <p className="text-xs text-muted-foreground mt-1">
                You can now create, edit, and manage test cases for this problem
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemSelector;