import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProblemsList = ({ problems, selectedProblem, onSelectProblem, onCreateNew }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const difficultyOptions = [
    { value: 'all', label: 'All Difficulties' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'arrays', label: 'Arrays' },
    { value: 'strings', label: 'Strings' },
    { value: 'trees', label: 'Trees' },
    { value: 'graphs', label: 'Graphs' },
    { value: 'dynamic-programming', label: 'Dynamic Programming' },
    { value: 'sorting', label: 'Sorting' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date Created' },
    { value: 'title', label: 'Title' },
    { value: 'difficulty', label: 'Difficulty' },
    { value: 'status', label: 'Status' }
  ];

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950',
      medium: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950',
      hard: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950'
    };
    return colors?.[difficulty] || colors?.medium;
  };

  const getStatusColor = (status) => {
    const colors = {
      published: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950',
      draft: 'text-slate-600 bg-slate-50 dark:text-slate-400 dark:bg-slate-950',
      archived: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950'
    };
    return colors?.[status] || colors?.draft;
  };

  const filteredProblems = problems?.filter(problem => {
      const matchesSearch = problem?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                          problem?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'all' || problem?.difficulty === difficultyFilter;
      const matchesCategory = categoryFilter === 'all' || problem?.category === categoryFilter;
      return matchesSearch && matchesDifficulty && matchesCategory;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a?.title?.localeCompare(b?.title);
        case 'difficulty':
          const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
          return difficultyOrder?.[a?.difficulty] - difficultyOrder?.[b?.difficulty];
        case 'status':
          return a?.status?.localeCompare(b?.status);
        case 'date':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <div className="p-4 border-b border-border space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Problems</h2>
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={onCreateNew}
          >
            New Problem
          </Button>
        </div>

        <Input
          type="search"
          placeholder="Search problems..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
        />

        <div className="grid grid-cols-2 gap-2">
          <Select
            options={difficultyOptions}
            value={difficultyFilter}
            onChange={setDifficultyFilter}
            placeholder="Difficulty"
          />
          <Select
            options={categoryOptions}
            value={categoryFilter}
            onChange={setCategoryFilter}
            placeholder="Category"
          />
        </div>

        <Select
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
          placeholder="Sort by"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredProblems?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Icon name="Search" size={48} className="text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No problems found</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredProblems?.map((problem) => (
              <button
                key={problem?.id}
                onClick={() => onSelectProblem(problem)}
                className={`w-full p-4 text-left transition-colors hover:bg-muted ${
                  selectedProblem?.id === problem?.id ? 'bg-muted' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-medium text-foreground line-clamp-2">{problem?.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getDifficultyColor(problem?.difficulty)}`}>
                    {problem?.difficulty?.charAt(0)?.toUpperCase() + problem?.difficulty?.slice(1)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Icon name="Tag" size={14} />
                  <span>{problem?.category}</span>
                  <span>•</span>
                  <Icon name="Calendar" size={14} />
                  <span>{new Date(problem.createdAt)?.toLocaleDateString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(problem?.status)}`}>
                    {problem?.status?.charAt(0)?.toUpperCase() + problem?.status?.slice(1)}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="Code2" size={14} />
                    <span>{problem?.languages?.length} languages</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemsList;