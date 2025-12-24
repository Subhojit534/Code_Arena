import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const CodeEditor = ({ 
  code, 
  setCode, 
  language, 
  setLanguage, 
  onRun, 
  onSubmit, 
  isRunning, 
  isSubmitting 
}) => {
  const [lineCount, setLineCount] = useState(1);

  const languageOptions = [
    { value: 'python', label: 'Python 3.9' },
    { value: 'javascript', label: 'JavaScript (Node.js)' },
    { value: 'cpp', label: 'C++ 17' },
    { value: 'c', label: 'C (GCC)' },
    { value: 'java', label: 'Java 11' },
    { value: 'go', label: 'Go 1.18' },
    { value: 'rust', label: 'Rust 1.65' }
  ];

  const languageTemplates = {
    python: `def solution():\n    # Write your code here\n    pass\n\nif __name__ == "__main__":\n    solution()`,
    javascript: `function solution() {\n    // Write your code here\n}\n\nsolution();`,
    cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}`,
    c: `#include <stdio.h>\n\nint main() {\n    // Write your code here\n    return 0;\n}`,
    java: `public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}`,
    go: `package main\n\nimport "fmt"\n\nfunc main() {\n    // Write your code here\n}`,
    rust: `fn main() {\n    // Write your code here\n}`
  };

  useEffect(() => {
    const lines = code?.split('\n')?.length;
    setLineCount(lines);
  }, [code]);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(languageTemplates?.[newLanguage] || '');
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Tab') {
      e?.preventDefault();
      const start = e?.target?.selectionStart;
      const end = e?.target?.selectionEnd;
      const newCode = code?.substring(0, start) + '    ' + code?.substring(end);
      setCode(newCode);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <Icon name="Code2" size={20} className="text-primary" />
          <span className="font-medium text-foreground">Code Editor</span>
        </div>
        <div className="flex items-center gap-3">
          <Select
            options={languageOptions}
            value={language}
            onChange={handleLanguageChange}
            className="w-48"
          />
          <button
            onClick={onRun}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isRunning ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Icon name="Play" size={16} />
                <span>Run Code</span>
              </>
            )}
          </button>
          <button
            onClick={onSubmit}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Icon name="Send" size={16} />
                <span>Submit</span>
              </>
            )}
          </button>
        </div>
      </div>
      {/* Editor Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line Numbers */}
        <div className="w-12 bg-muted/50 border-r border-border overflow-hidden">
          <div className="py-4 px-2 text-right font-mono text-xs text-muted-foreground select-none">
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i + 1} className="leading-6">
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Code Area */}
        <div className="flex-1 overflow-auto">
          <textarea
            value={code}
            onChange={(e) => setCode(e?.target?.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-full p-4 bg-transparent text-foreground font-mono text-sm leading-6 resize-none focus:outline-none"
            spellCheck="false"
            placeholder="Start coding here..."
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;