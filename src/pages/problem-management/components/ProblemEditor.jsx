import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';


const ProblemEditor = ({ problem, onSave, onCancel, onDelete }) => {
  const [activeTab, setActiveTab] = useState('statement');
  const [isPreview, setIsPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    difficulty: 'medium',
    category: '',
    tags: [],
    statement: '',
    constraints: '',
    examples: [],
    templates: {},
    status: 'draft'
  });

  useEffect(() => {
    if (problem) {
      setFormData(problem);
    } else {
      setFormData({
        title: '',
        difficulty: 'medium',
        category: '',
        tags: [],
        statement: '',
        constraints: '',
        examples: [],
        templates: {},
        status: 'draft'
      });
    }
  }, [problem]);

  const difficultyOptions = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const categoryOptions = [
    { value: 'arrays', label: 'Arrays' },
    { value: 'strings', label: 'Strings' },
    { value: 'trees', label: 'Trees' },
    { value: 'graphs', label: 'Graphs' },
    { value: 'dynamic-programming', label: 'Dynamic Programming' },
    { value: 'sorting', label: 'Sorting' },
    { value: 'searching', label: 'Searching' },
    { value: 'recursion', label: 'Recursion' }
  ];

  const languageOptions = [
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' }
  ];

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'archived', label: 'Archived' }
  ];

  const tabs = [
    { id: 'statement', label: 'Problem Statement', icon: 'FileText' },
    { id: 'constraints', label: 'Constraints', icon: 'AlertCircle' },
    { id: 'examples', label: 'Examples', icon: 'Code2' },
    { id: 'templates', label: 'Solution Templates', icon: 'FileCode' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave({ ...formData, id: problem?.id || Date.now() });
  };

  const handleAddExample = () => {
    setFormData(prev => ({
      ...prev,
      examples: [...prev?.examples, { input: '', output: '', explanation: '' }]
    }));
  };

  const handleExampleChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      examples: prev?.examples?.map((ex, i) => 
        i === index ? { ...ex, [field]: value } : ex
      )
    }));
  };

  const handleRemoveExample = (index) => {
    setFormData(prev => ({
      ...prev,
      examples: prev?.examples?.filter((_, i) => i !== index)
    }));
  };

  const handleTemplateChange = (language, value) => {
    setFormData(prev => ({
      ...prev,
      templates: { ...prev?.templates, [language]: value }
    }));
  };

  if (!problem && !formData?.title) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-muted/30">
        <Icon name="FileText" size={64} className="text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Problem Selected</h3>
        <p className="text-muted-foreground mb-6">Select a problem from the list or create a new one to get started</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            {problem ? 'Edit Problem' : 'Create New Problem'}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              iconName={isPreview ? 'Edit' : 'Eye'}
              onClick={() => setIsPreview(!isPreview)}
            >
              {isPreview ? 'Edit' : 'Preview'}
            </Button>
            {problem && (
              <Button
                variant="destructive"
                size="sm"
                iconName="Trash2"
                onClick={onDelete}
              >
                Delete
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Save"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Problem Title"
            type="text"
            placeholder="Enter problem title"
            value={formData?.title}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            required
          />
          <Select
            label="Difficulty"
            options={difficultyOptions}
            value={formData?.difficulty}
            onChange={(value) => handleInputChange('difficulty', value)}
            required
          />
          <Select
            label="Category"
            options={categoryOptions}
            value={formData?.category}
            onChange={(value) => handleInputChange('category', value)}
            required
          />
        </div>

        <div className="mt-4">
          <Select
            label="Status"
            options={statusOptions}
            value={formData?.status}
            onChange={(value) => handleInputChange('status', value)}
          />
        </div>
      </div>
      <div className="flex border-b border-border overflow-x-auto">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {isPreview ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-lg border border-border p-6">
              <h1 className="text-2xl font-bold text-foreground mb-4">{formData?.title}</h1>
              <div className="flex items-center gap-4 mb-6">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  formData?.difficulty === 'easy' ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950' :
                  formData?.difficulty === 'medium'? 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950' : 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950'
                }`}>
                  {formData?.difficulty?.charAt(0)?.toUpperCase() + formData?.difficulty?.slice(1)}
                </span>
                <span className="text-muted-foreground">{formData?.category}</span>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap">{formData?.statement}</div>
                {formData?.constraints && (
                  <>
                    <h3 className="text-lg font-semibold mt-6 mb-3">Constraints</h3>
                    <div className="whitespace-pre-wrap">{formData?.constraints}</div>
                  </>
                )}
                {formData?.examples?.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold mt-6 mb-3">Examples</h3>
                    {formData?.examples?.map((example, index) => (
                      <div key={index} className="mb-4 bg-muted p-4 rounded-lg">
                        <p className="font-medium mb-2">Example {index + 1}:</p>
                        <pre className="bg-background p-3 rounded mb-2"><code>Input: {example?.input}</code></pre>
                        <pre className="bg-background p-3 rounded mb-2"><code>Output: {example?.output}</code></pre>
                        {example?.explanation && (
                          <p className="text-sm text-muted-foreground">Explanation: {example?.explanation}</p>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'statement' && (
              <div className="max-w-4xl mx-auto space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Problem Statement
                  </label>
                  <textarea
                    value={formData?.statement}
                    onChange={(e) => handleInputChange('statement', e?.target?.value)}
                    placeholder="Write the problem statement here...\n\nYou can use:\n- Multiple paragraphs\n- Code snippets\n- Mathematical expressions"
                    className="w-full h-96 px-4 py-3 bg-card border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
                  />
                </div>
              </div>
            )}

            {activeTab === 'constraints' && (
              <div className="max-w-4xl mx-auto space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Constraints
                  </label>
                  <textarea
                    value={formData?.constraints}
                    onChange={(e) => handleInputChange('constraints', e?.target?.value)}
                    placeholder="Define constraints here...\n\nExample:\n- 1 ≤ n ≤ 10^5\n- -10^9 ≤ arr[i] ≤ 10^9\n- Time limit: 2 seconds"
                    className="w-full h-64 px-4 py-3 bg-card border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
                  />
                </div>
              </div>
            )}

            {activeTab === 'examples' && (
              <div className="max-w-4xl mx-auto space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Test Examples</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Plus"
                    onClick={handleAddExample}
                  >
                    Add Example
                  </Button>
                </div>

                {formData?.examples?.length === 0 ? (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <Icon name="Code2" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No examples added yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData?.examples?.map((example, index) => (
                      <div key={index} className="bg-card border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-foreground">Example {index + 1}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="Trash2"
                            onClick={() => handleRemoveExample(index)}
                          >
                            Remove
                          </Button>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Input</label>
                            <textarea
                              value={example?.input}
                              onChange={(e) => handleExampleChange(index, 'input', e?.target?.value)}
                              placeholder="Enter input..."
                              className="w-full h-20 px-3 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Output</label>
                            <textarea
                              value={example?.output}
                              onChange={(e) => handleExampleChange(index, 'output', e?.target?.value)}
                              placeholder="Enter expected output..."
                              className="w-full h-20 px-3 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Explanation (Optional)</label>
                            <textarea
                              value={example?.explanation}
                              onChange={(e) => handleExampleChange(index, 'explanation', e?.target?.value)}
                              placeholder="Explain the example..."
                              className="w-full h-20 px-3 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'templates' && (
              <div className="max-w-4xl mx-auto space-y-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Solution Templates</h3>
                  <p className="text-sm text-muted-foreground">
                    Provide starter code templates for each supported language
                  </p>
                </div>

                <div className="space-y-6">
                  {languageOptions?.map((lang) => (
                    <div key={lang?.value} className="bg-card border border-border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="Code2" size={18} className="text-primary" />
                        <h4 className="font-medium text-foreground">{lang?.label}</h4>
                      </div>
                      <textarea
                        value={formData?.templates?.[lang?.value] || ''}
                        onChange={(e) => handleTemplateChange(lang?.value, e?.target?.value)}
                        placeholder={`// ${lang?.label} starter code\n// Add function signature and comments here...`}
                        className="w-full h-48 px-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProblemEditor;