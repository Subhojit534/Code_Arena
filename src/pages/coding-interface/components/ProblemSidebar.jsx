import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProblemSidebar = ({ problems, selectedProblem, onSelectProblem, isOpen, onToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [activeTab, setActiveTab] = useState('problems');

  // Generate deterministic mock leaderboard data based on problem ID
  const getLeaderboardData = (problemId) => {
    // Base users list
    const users = [
      "Alex Chen", "Sarah Jones", "Mike Ross", "Jessica Suits",
      "Harvey Specter", "Louis Litt", "Rachel Zane", "Donna Paulsen"
    ];

    // Seeded random-like generation based on problemId string
    const seed = String(problemId || 'default').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return users
      .map((name, index) => {
        // Generate a time between 40ms and 200ms based on seed + index
        const baseTime = 40 + ((seed * (index + 1) * 17) % 160);
        return {
          name,
          time: baseTime,
          originalindex: index // keep track for stability if needed, though sort handles it
        };
      })
      .sort((a, b) => a.time - b.time) // Sort by execution time (lowest first)
      .map((user, index) => ({
        ...user,
        rank: index + 1
      }))
      .slice(0, 10); // Top 10
  };

  const filteredProblems = problems?.filter(problem => {
    const matchesSearch = problem?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'all' || problem?.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-elevated flex items-center justify-center"
      >
        <Icon name={isOpen ? 'X' : 'List'} size={24} />
      </button>
      {/* Sidebar */}
      <div
        className={`fixed lg:relative inset-y-0 left-0 z-40 w-80 bg-card border-r border-border transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('problems')}
                  className={`px-3 py-1 text-sm font-semibold rounded-lg transition-colors ${activeTab === 'problems' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
                >
                  Problems
                </button>
                <button
                  onClick={() => setActiveTab('leaderboard')}
                  className={`px-3 py-1 text-sm font-semibold rounded-lg transition-colors ${activeTab === 'leaderboard' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
                >
                  Leaderboard
                </button>
              </div>
              <button
                onClick={onToggle}
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-200"
              >
                <Icon name="X" size={20} className="text-muted-foreground" />
              </button>
            </div>

            {activeTab === 'problems' && (
              <>
                {/* Search */}
                <div className="relative mb-3">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search problems..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="w-full pl-9 pr-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {/* Difficulty Filter */}
                <div className="flex gap-2">
                  {['all', 'Easy', 'Medium', 'Hard']?.map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() => setFilterDifficulty(difficulty)}
                      className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${filterDifficulty === difficulty
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                    >
                      {difficulty === 'all' ? 'All' : difficulty}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === 'problems' ? (
              filteredProblems?.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <Icon name="Search" size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No problems found</p>
                </div>
              ) : (
                filteredProblems?.map((problem) => (
                  <button
                    key={problem?.id}
                    onClick={() => {
                      onSelectProblem(problem);
                      if (window.innerWidth < 1024) {
                        onToggle();
                      }
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${selectedProblem?.id === problem?.id
                      ? 'bg-primary/10 border-2 border-primary' : 'bg-muted/50 border-2 border-transparent hover:border-primary/50'
                      }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-medium text-sm text-foreground line-clamp-2">
                        {problem?.title}
                      </h3>
                      {problem?.solved && (
                        <Icon name="CheckCircle2" size={16} className="text-success flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`px-2 py-0.5 rounded-full font-medium ${problem?.difficulty === 'Easy' ? 'bg-success/10 text-success' :
                        problem?.difficulty === 'Medium' ? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                        }`}>
                        {problem?.difficulty}
                      </span>
                      <span className="text-muted-foreground">{problem?.score} pts</span>
                    </div>
                  </button>
                ))
              )
            ) : (
              <div className="space-y-3">
                <div className="text-xs text-muted-foreground mb-2 px-1">
                  Leaderboard for: <span className="text-foreground font-medium">{selectedProblem?.title || "Select a problem"}</span>
                </div>
                {getLeaderboardData(selectedProblem?.id).map((user) => (
                  <div key={user.rank} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border">
                    <div className={`
                              w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs
                              ${user.rank === 1 ? 'bg-yellow-500/20 text-yellow-600' :
                        user.rank === 2 ? 'bg-slate-400/20 text-slate-500' :
                          user.rank === 3 ? 'bg-orange-500/20 text-orange-600' : 'bg-muted text-muted-foreground'}
                          `}>
                      {user.rank}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="text-sm font-medium text-foreground truncate">{user.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {user.rank === 1 ? 'Fastest Solution' : `Rank #${user.rank}`}
                      </div>
                    </div>
                    <div className="text-sm font-mono font-semibold text-primary">{user.time}ms</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
        />
      )}
    </>
  );
};

export default ProblemSidebar;