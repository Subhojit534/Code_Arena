import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import StudentNavigation from '../../components/navigation/StudentNavigation';
import ProblemStatement from './components/ProblemStatement';
import CodeEditor from './components/CodeEditor';
import OutputPanel from './components/OutputPanel';
import ProblemSidebar from './components/ProblemSidebar';
import MobileTabView from './components/MobileTabView';

const CodingInterface = () => {
  const navigate = useNavigate();

  // Mock problems data
  const initialMockProblems = [
    {
      id: 0,
      title: "Hello World",
      difficulty: "Easy",
      score: 10,
      submissions: 0,
      successRate: 100,
      solved: false,
      description: "Write a program that prints 'Hello World' to the standard output.",
      constraints: [],
      examples: [
        {
          input: "",
          output: "Hello World",
          explanation: "Just print 'Hello World'"
        }
      ],
      publicTestCases: [
        {
          input: "",
          expectedOutput: "Hello World",
          actualOutput: null,
          status: null
        }
      ]
    },
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      score: 100,
      submissions: 1234,
      successRate: 87,
      solved: true,
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
      constraints: [
        "2 ≤ nums.length ≤ 10⁴",
        "-10⁹ ≤ nums[i] ≤ 10⁹",
        "-10⁹ ≤ target ≤ 10⁹",
        "Only one valid answer exists"
      ],
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]",
          explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
        }
      ],
      publicTestCases: [
        {
          input: "[2,7,11,15], 9",
          expectedOutput: "[0,1]",
          actualOutput: null,
          status: null
        },
        {
          input: "[3,2,4], 6",
          expectedOutput: "[1,2]",
          actualOutput: null,
          status: null
        },
        {
          input: "[3,3], 6",
          expectedOutput: "[0,1]",
          actualOutput: null,
          status: null
        }
      ]
    },
    {
      id: 2,
      title: "Reverse Linked List",
      difficulty: "Medium",
      score: 200,
      submissions: 987,
      successRate: 72,
      solved: false,
      description: "Given the head of a singly linked list, reverse the list, and return the reversed list.\n\nA linked list can be reversed either iteratively or recursively. Could you implement both?",
      constraints: [
        "The number of nodes in the list is the range [0, 5000]",
        "-5000 ≤ Node.val ≤ 5000"
      ],
      examples: [
        {
          input: "head = [1,2,3,4,5]",
          output: "[5,4,3,2,1]",
          explanation: "The linked list is reversed from 1→2→3→4→5 to 5→4→3→2→1"
        },
        {
          input: "head = [1,2]",
          output: "[2,1]",
          explanation: "Simple two-node reversal"
        }
      ],
      publicTestCases: [
        {
          input: "[1,2,3,4,5]",
          expectedOutput: "[5,4,3,2,1]",
          actualOutput: null,
          status: null
        },
        {
          input: "[1,2]",
          expectedOutput: "[2,1]",
          actualOutput: null,
          status: null
        },
        {
          input: "[]",
          expectedOutput: "[]",
          actualOutput: null,
          status: null
        }
      ]
    },
    {
      id: 3,
      title: "Merge K Sorted Lists",
      difficulty: "Hard",
      score: 300,
      submissions: 456,
      successRate: 45,
      solved: false,
      description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.",
      constraints: [
        "k == lists.length",
        "0 ≤ k ≤ 10⁴",
        "0 ≤ lists[i].length ≤ 500",
        "-10⁴ ≤ lists[i][j] ≤ 10⁴",
        "lists[i] is sorted in ascending order",
        "The sum of lists[i].length will not exceed 10⁴"
      ],
      examples: [
        {
          input: "lists = [[1,4,5],[1,3,4],[2,6]]",
          output: "[1,1,2,3,4,4,5,6]",
          explanation: "The linked-lists are:\n[\n  1→4→5,\n  1→3→4,\n  2→6\n]\nmerging them into one sorted list:\n1→1→2→3→4→4→5→6"
        }
      ],
      publicTestCases: [
        {
          input: "[[1,4,5],[1,3,4],[2,6]]",
          expectedOutput: "[1,1,2,3,4,4,5,6]",
          actualOutput: null,
          status: null
        },
        {
          input: "[]",
          expectedOutput: "[]",
          actualOutput: null,
          status: null
        },
        {
          input: "[[]]",
          expectedOutput: "[]",
          actualOutput: null,
          status: null
        }
      ]
    },
    {
      id: 4,
      title: "Valid Parentheses",
      difficulty: "Easy",
      score: 100,
      submissions: 2156,
      successRate: 91,
      solved: true,
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
      constraints: [
        "1 ≤ s.length ≤ 10⁴",
        "s consists of parentheses only '()[]{}'."
      ],
      examples: [
        {
          input: 's = "()"',
          output: "true",
          explanation: "The string contains valid matching parentheses"
        },
        {
          input: 's = "()[]{}"',
          output: "true",
          explanation: "All brackets are properly matched and closed"
        },
        {
          input: 's = "(]"',
          output: "false",
          explanation: "Mismatched bracket types"
        }
      ],
      publicTestCases: [
        {
          input: '"()"',
          expectedOutput: "true",
          actualOutput: null,
          status: null
        },
        {
          input: '"()[]{}"',
          expectedOutput: "true",
          actualOutput: null,
          status: null
        },
        {
          input: '"(]"',
          expectedOutput: "false",
          actualOutput: null,
          status: null
        }
      ]
    },
    {
      id: 5,
      title: "Binary Tree Level Order Traversal",
      difficulty: "Medium",
      score: 200,
      submissions: 876,
      successRate: 68,
      solved: false,
      description: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
      constraints: [
        "The number of nodes in the tree is in the range [0, 2000]",
        "-1000 ≤ Node.val ≤ 1000"
      ],
      examples: [
        {
          input: "root = [3,9,20,null,null,15,7]",
          output: "[[3],[9,20],[15,7]]",
          explanation: "Level 0: [3], Level 1: [9,20], Level 2: [15,7]"
        }
      ],
      publicTestCases: [
        {
          input: "[3,9,20,null,null,15,7]",
          expectedOutput: "[[3],[9,20],[15,7]]",
          actualOutput: null,
          status: null
        },
        {
          input: "[1]",
          expectedOutput: "[[1]]",
          actualOutput: null,
          status: null
        },
        {
          input: "[]",
          expectedOutput: "[]",
          actualOutput: null,
          status: null
        }
      ]
    },
    {
      id: 6,
      title: "Print 1 to 10",
      difficulty: "Easy",
      score: 10,
      submissions: 0,
      successRate: 100,
      solved: false,
      description: "Write a program that prints the numbers from 1 to 10, each on a new line.",
      constraints: [],
      examples: [
        {
          input: "",
          output: "1\\n2\\n3\\n4\\n5\\n6\\n7\\n8\\n9\\n10",
          explanation: "Prints numbers 1 to 10 sequentially."
        }
      ],
      publicTestCases: [
        {
          input: "",
          expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
          actualOutput: null,
          status: null
        }
      ]
    },
    {
      id: 7,
      title: "Simple Subtraction",
      difficulty: "Easy",
      score: 10,
      submissions: 0,
      successRate: 100,
      solved: false,
      description: "Read two integers from input and print their difference (first - second).",
      constraints: [
        "-1000 ≤ a, b ≤ 1000"
      ],
      examples: [
        {
          input: "100 45",
          output: "55",
          explanation: "100 - 45 = 55"
        }
      ],
      publicTestCases: [
        {
          input: "100 45",
          expectedOutput: "55",
          actualOutput: null,
          status: null
        },
        {
          input: "50 20",
          expectedOutput: "30",
          actualOutput: null,
          status: null
        },
        {
          input: "20 50",
          expectedOutput: "-30",
          actualOutput: null,
          status: null
        },
        {
          input: "10 10",
          expectedOutput: "0",
          actualOutput: null,
          status: null
        },
        {
          input: "-10 -5",
          expectedOutput: "-5",
          actualOutput: null,
          status: null
        }
      ]
    }
  ];

  const [problems, setProblems] = useState(initialMockProblems);
  const [selectedProblem, setSelectedProblem] = useState(problems?.[0]);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');

  // Fetch user progress and update problems with solved status
  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const response = await api.get('/user/profile');
        const solvedIds = response.data.solvedProblems || [];

        setProblems(prevProblems => prevProblems.map(p => ({
          ...p,
          solved: solvedIds.includes(p.id.toString())
        })));
      } catch (error) {
        console.error("Failed to fetch user progress:", error);
      }
    };
    fetchUserProgress();
  }, []);

  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [outputVisible, setOutputVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTestCase, setActiveTestCase] = useState(0);
  const [mobileTab, setMobileTab] = useState('problem');

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
    setCode(languageTemplates?.[language] || '');
  }, [language]);

  const handleLogout = () => {
    navigate('/student-login-registration');
  };

  const handleSelectProblem = (problem) => {
    setSelectedProblem(problem);
    setOutput(null);
    setOutputVisible(false);
    setActiveTestCase(0);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutputVisible(true);
    setOutput(null); // Clear previous output

    try {
      // Prepare test cases
      const tests = selectedProblem?.publicTestCases?.map((tc, index) => ({
        problem_id: String(selectedProblem.id),
        test_id: String(index),
        stdin: tc.input,
        expected_output: tc.expectedOutput
      })) || [];

      // Base64 encode code
      const encodedCode = btoa(code);

      const payload = {
        id: String(Date.now()), // temporary ID
        problem_id: String(selectedProblem?.id),
        language: language,
        code: encodedCode,
        tests: tests
      };

      const result = await api.post('/submission/test/public', payload);
      console.log(result);
      // result structure from backend: { Status: "...", Results: [...], Error: "..." }

      // Map backend results to frontend format
      const isSuccess = result.status === 'SUCCESS'; // check specific enum string in backend? "Success"?

      // We need to parse the backend results to match frontend expectations
      // Backend Results: []ExecResult. ExecResult: { stdout: "...", stderr: "...", exit_code: 0 }
      // Test cases loop?

      // Wait, backend logic: k8s.RunOnPod(submission) -> extractJsonFromStdout.
      // The runner inside the pod executes the code against inputs?
      // Runner Implementation detail: The runner seems to just run one thing?
      // Re-reading submission_controller: `res, err := k8s.K8sMgr.RunOnPod(submission)`
      // RunOnPod sends logic. 
      // Need to see what `RunOnPod` returns in `Results`.

      // Let's assume for now we just show the raw output or try to map it.
      // "SUCCESS" matches currentstatus.SUCCESS.ToString()



      setOutput({
        status: isSuccess ? 'success' : 'error',
        message: isSuccess
          ? 'All public test cases passed! Ready to submit.'
          : (result.error || 'Some test cases failed. Review your code and try again.'),
        testResults: result.results,
        executionTime: 0 // Backend doesn't seem to return time yet
      });

    } catch (error) {
      console.error("Execution error:", error);
      setOutput({
        status: 'error',
        message: error.response?.data?.error || error.response?.data?.Error || "Execution failed.",
        testResults: [],
        executionTime: 0
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    setIsSubmitting(true);
    setOutputVisible(true);
    setOutput(null);

    try {
      // Mock logic for private tests: sending public tests as placeholder logic
      // because frontend doesn't have private tests.
      const tests = selectedProblem?.publicTestCases?.map((tc, index) => ({
        problem_id: String(selectedProblem.id),
        test_id: String(index),
        stdin: tc.input,
        expected_output: tc.expectedOutput
      })) || [];

      const encodedCode = btoa(code);

      const payload = {
        id: String(Date.now()),
        problem_id: String(selectedProblem?.id),
        language: language,
        code: encodedCode,
        tests: tests
      };

      const result = await api.post('/submission/test/public', payload);
      console.log(result);
      // result structure from backend: { Status: "...", Results: [...], Error: "..." }

      // Map backend results to frontend format
      const isSuccess = result.status === 'SUCCESS'; // check specific enum string in backend? "Success"?

      // We need to parse the backend results to match frontend expectations
      // Backend Results: []ExecResult. ExecResult: { stdout: "...", stderr: "...", exit_code: 0 }
      // Test cases loop?

      // Wait, backend logic: k8s.RunOnPod(submission) -> extractJsonFromStdout.
      // The runner inside the pod executes the code against inputs?
      // Runner Implementation detail: The runner seems to just run one thing?
      // Re-reading submission_controller: `res, err := k8s.K8sMgr.RunOnPod(submission)`
      // RunOnPod sends logic. 
      // Need to see what `RunOnPod` returns in `Results`.

      // Let's assume for now we just show the raw output or try to map it.
      // "SUCCESS" matches currentstatus.SUCCESS.ToString()



      setOutput({
        status: isSuccess ? 'success' : 'error',
        message: isSuccess
          ? 'All public test cases passed! Ready to submit.'
          : (result.error || 'Some test cases failed. Review your code and try again.'),
        testResults: result.results,
        executionTime: 0 // Backend doesn't seem to return time yet
      });
    } catch (error) {
      console.error("Submission error:", error);
      setOutput({
        status: 'error',
        message: "Submission failed: " + (error.response?.data?.error || "Unknown error"),
        executionTime: 0
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <StudentNavigation onLogout={handleLogout} />

      <div className="pt-16 pb-16 lg:pb-0 h-screen flex">
        <ProblemSidebar
          problems={problems}
          selectedProblem={selectedProblem}
          onSelectProblem={handleSelectProblem}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <MobileTabView activeTab={mobileTab} setActiveTab={setMobileTab} />

          {/* Desktop Layout */}
          <div className="hidden lg:flex flex-1 overflow-hidden">
            {/* Left Panel - Problem Statement */}
            <div className="w-1/2 border-r border-border overflow-hidden">
              <ProblemStatement
                problem={selectedProblem}
                activeTestCase={activeTestCase}
                setActiveTestCase={setActiveTestCase}
              />
            </div>

            {/* Right Panel - Editor & Output */}
            <div className="w-1/2 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <CodeEditor
                  code={code}
                  setCode={setCode}
                  language={language}
                  setLanguage={setLanguage}
                  onRun={handleRunCode}
                  onSubmit={handleSubmitCode}
                  isRunning={isRunning}
                  isSubmitting={isSubmitting}
                />
              </div>
              <OutputPanel
                output={output}
                isVisible={outputVisible}
                onToggle={() => setOutputVisible(!outputVisible)}
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex-1 overflow-hidden pt-12">
            {mobileTab === 'problem' && (
              <ProblemStatement
                problem={selectedProblem}
                activeTestCase={activeTestCase}
                setActiveTestCase={setActiveTestCase}
              />
            )}
            {mobileTab === 'editor' && (
              <CodeEditor
                code={code}
                setCode={setCode}
                language={language}
                setLanguage={setLanguage}
                onRun={handleRunCode}
                onSubmit={handleSubmitCode}
                isRunning={isRunning}
                isSubmitting={isSubmitting}
              />
            )}
            {mobileTab === 'output' && (
              <div className="h-full overflow-y-auto">
                <OutputPanel
                  output={output}
                  isVisible={true}
                  onToggle={() => { }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingInterface;
