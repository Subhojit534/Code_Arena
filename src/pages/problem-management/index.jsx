import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavigation from '../../components/navigation/AdminNavigation';
import NavigationBreadcrumbs from '../../components/navigation/NavigationBreadcrumbs';
import ProblemsList from './components/ProblemsList';
import ProblemEditor from './components/ProblemEditor';
import BulkOperationsBar from './components/BulkOperations';
import MobileTabView from './components/MobileTabView';

const ProblemManagement = () => {
    const navigate = useNavigate();
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [mobileView, setMobileView] = useState('list');
    const [selectedProblems, setSelectedProblems] = useState([]);

    const mockProblems = [
        {
            id: 1,
            title: "Two Sum",
            difficulty: "easy",
            category: "arrays",
            tags: ["array", "hash-table"],
            status: "published",
            createdAt: "2025-12-15T10:30:00",
            languages: ["c", "cpp", "python", "java", "go", "rust"],
            statement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
            constraints: "• 2 ≤ nums.length ≤ 10^4\n• -10^9 ≤ nums[i] ≤ 10^9\n• -10^9 ≤ target ≤ 10^9\n• Only one valid answer exists\n• Time limit: 2 seconds\n• Memory limit: 256 MB",
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
            templates: {
                python: "def twoSum(nums, target):\n    # Write your code here\n    pass",
                cpp: "vector<int> twoSum(vector<int>& nums, int target) {\n    // Write your code here\n}",
                java: "public int[] twoSum(int[] nums, int target) {\n    // Write your code here\n}"
            }
        },
        {
            id: 2,
            title: "Reverse Linked List",
            difficulty: "medium",
            category: "trees",
            tags: ["linked-list", "recursion"],
            status: "published",
            createdAt: "2025-12-14T14:20:00",
            languages: ["c", "cpp", "python", "java"],
            statement: "Given the head of a singly linked list, reverse the list, and return the reversed list.\n\nYou can solve this problem iteratively or recursively.",
            constraints: "• The number of nodes in the list is in the range [0, 5000]\n• -5000 ≤ Node.val ≤ 5000\n• Time limit: 1 second\n• Memory limit: 128 MB",
            examples: [
                {
                    input: "head = [1,2,3,4,5]",
                    output: "[5,4,3,2,1]",
                    explanation: "The linked list is reversed from 1->2->3->4->5 to 5->4->3->2->1"
                }
            ],
            templates: {
                python: "def reverseList(head):\n    # Write your code here\n    pass",
                cpp: "ListNode* reverseList(ListNode* head) {\n    // Write your code here\n}"
            }
        },
        {
            id: 3,
            title: "Binary Tree Maximum Path Sum",
            difficulty: "hard",
            category: "trees",
            tags: ["tree", "depth-first-search", "dynamic-programming"],
            status: "draft",
            createdAt: "2025-12-13T09:15:00",
            languages: ["cpp", "python", "java"],
            statement: "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.\n\nThe path sum of a path is the sum of the node's values in the path.\n\nGiven the root of a binary tree, return the maximum path sum of any non-empty path.",
            constraints: "• The number of nodes in the tree is in the range [1, 3 * 10^4]\n• -1000 ≤ Node.val ≤ 1000\n• Time limit: 3 seconds\n• Memory limit: 512 MB",
            examples: [
                {
                    input: "root = [1,2,3]",
                    output: "6",
                    explanation: "The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6."
                }
            ],
            templates: {
                python: "def maxPathSum(root):\n    # Write your code here\n    pass"
            }
        },
        {
            id: 4,
            title: "Longest Substring Without Repeating Characters",
            difficulty: "medium",
            category: "strings",
            tags: ["string", "sliding-window", "hash-table"],
            status: "published",
            createdAt: "2025-12-12T16:45:00",
            languages: ["c", "cpp", "python", "java", "go"],
            statement: "Given a string s, find the length of the longest substring without repeating characters.\n\nA substring is a contiguous non-empty sequence of characters within a string.",
            constraints: "• 0 ≤ s.length ≤ 5 * 10^4\n• s consists of English letters, digits, symbols and spaces\n• Time limit: 2 seconds\n• Memory limit: 256 MB",
            examples: [
                {
                    input: 's = "abcabcbb"',
                    output: "3",
                    explanation: 'The answer is "abc", with the length of 3.'
                },
                {
                    input: 's = "bbbbb"',
                    output: "1",
                    explanation: 'The answer is "b", with the length of 1.'
                }
            ],
            templates: {
                python: "def lengthOfLongestSubstring(s):\n    # Write your code here\n    pass",
                cpp: "int lengthOfLongestSubstring(string s) {\n    // Write your code here\n}"
            }
        },
        {
            id: 5,
            title: "Merge K Sorted Lists",
            difficulty: "hard",
            category: "sorting",
            tags: ["linked-list", "divide-and-conquer", "heap"],
            status: "archived",
            createdAt: "2025-12-10T11:30:00",
            languages: ["cpp", "python", "java"],
            statement: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.",
            constraints: "• k == lists.length\n• 0 ≤ k ≤ 10^4\n• 0 ≤ lists[i].length ≤ 500\n• -10^4 ≤ lists[i][j] ≤ 10^4\n• lists[i] is sorted in ascending order\n• Time limit: 3 seconds",
            examples: [
                {
                    input: "lists = [[1,4,5],[1,3,4],[2,6]]",
                    output: "[1,1,2,3,4,4,5,6]",
                    explanation: "The linked-lists are merged into one sorted list."
                }
            ],
            templates: {
                python: "def mergeKLists(lists):\n    # Write your code here\n    pass"
            }
        },
        {
            id: 6,
            title: "Valid Parentheses",
            difficulty: "easy",
            category: "strings",
            tags: ["string", "stack"],
            status: "published",
            createdAt: "2025-12-11T13:20:00",
            languages: ["c", "cpp", "python", "java", "go", "rust"],
            statement: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
            constraints: "• 1 ≤ s.length ≤ 10^4\n• s consists of parentheses only '()[]{}'\n• Time limit: 1 second\n• Memory limit: 128 MB",
            examples: [
                {
                    input: 's = "()"',
                    output: "true",
                    explanation: "The string contains valid parentheses."
                },
                {
                    input: 's = "()[]{}"',
                    output: "true",
                    explanation: "All brackets are properly closed."
                },
                {
                    input: 's = "(]"',
                    output: "false",
                    explanation: "Brackets are not closed in the correct order."
                }
            ],
            templates: {
                python: "def isValid(s):\n    # Write your code here\n    pass",
                cpp: "bool isValid(string s) {\n    // Write your code here\n}",
                java: "public boolean isValid(String s) {\n    // Write your code here\n}"
            }
        }
    ];

    const [problems, setProblems] = useState(mockProblems);

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('rememberAdmin');
        navigate('/admin-login');
    };

    const handleCreateNew = () => {
        setSelectedProblem(null);
        setMobileView('editor');
    };

    const handleSelectProblem = (problem) => {
        setSelectedProblem(problem);
        setMobileView('editor');
    };

    const handleSaveProblem = (problemData) => {
        if (problemData?.id && problems?.find(p => p?.id === problemData?.id)) {
            setProblems(problems?.map(p => p?.id === problemData?.id ? problemData : p));
        } else {
            setProblems([{ ...problemData, id: Date.now(), createdAt: new Date()?.toISOString() }, ...problems]);
        }
        setSelectedProblem(null);
        setMobileView('list');
    };

    const handleDeleteProblem = () => {
        if (selectedProblem && window.confirm('Are you sure you want to delete this problem?')) {
            setProblems(problems?.filter(p => p?.id !== selectedProblem?.id));
            setSelectedProblem(null);
            setMobileView('list');
        }
    };

    const handleCancelEdit = () => {
        setSelectedProblem(null);
        setMobileView('list');
    };

    const handleBulkAction = (action) => {
        console.log('Bulk action:', action, 'on', selectedProblems?.length, 'problems');
        setSelectedProblems([]);
    };

    const handleClearSelection = () => {
        setSelectedProblems([]);
    };

    return (
        <div className="min-h-screen bg-background">
            <AdminNavigation onLogout={handleLogout} />
            <div className="pt-16">
                <NavigationBreadcrumbs />

                <div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-7rem)] flex">
                    <div className={`w-full lg:w-96 ${mobileView === 'list' ? 'block' : 'hidden lg:block'}`}>
                        <ProblemsList
                            problems={problems}
                            selectedProblem={selectedProblem}
                            onSelectProblem={handleSelectProblem}
                            onCreateNew={handleCreateNew}
                        />
                    </div>

                    <div className={`flex-1 ${mobileView === 'editor' ? 'block' : 'hidden lg:block'}`}>
                        <ProblemEditor
                            problem={selectedProblem}
                            onSave={handleSaveProblem}
                            onCancel={handleCancelEdit}
                            onDelete={handleDeleteProblem}
                        />
                    </div>
                </div>

                <MobileTabView
                    activeView={mobileView}
                    onViewChange={setMobileView}
                />

                <BulkOperationsBar
                    selectedCount={selectedProblems?.length}
                    onBulkAction={handleBulkAction}
                    onClearSelection={handleClearSelection}
                />
            </div>
        </div>
    );
};

export default ProblemManagement;