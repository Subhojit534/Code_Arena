import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import StudentNavigation from '../../components/navigation/StudentNavigation';
import ProblemStatement from './components/ProblemStatement';
import CodeEditor from './components/CodeEditor';
import OutputPanel from './components/OutputPanel';
import ProblemSidebar from './components/ProblemSidebar';
import MobileTabView from './components/MobileTabView';
import { analyzeCode, estimateComplexity } from '../../utils/codeAnalysis';
import CodeReview from 'apis/code_review';
import { AIPayload } from 'models/ai';

const codeReview = new CodeReview()

const buildMaxAdjacentDiffTestCases = () => {
  const baseCases = [
    [1, 3, 8, 2, 7],
    [10, 10, 10, 10],
    [100, 1, 50, 2, 80, 3],
    [4, 9, 1, 14, 6],
    [20, 5, 15, 2, 30],
    [7, 17, 27, 37],
    [9, 4, 12, 1, 20],
    [6, 18, 3, 15, 9],
    [2, 100, 4, 90, 6],
    [11, 23, 5, 19, 7, 31]
  ];

  const generatedCases = Array.from({ length: 40 }, (_, index) => {
    const length = 5 + (index % 6);
    return Array.from({ length }, (_, position) => (((index + 7) * (position + 3)) % 121) - 60);
  });

  const allCases = [...baseCases, ...generatedCases];

  return allCases.map((values) => {
    const maxDiff = values.slice(1).reduce(
      (best, value, index) => Math.max(best, Math.abs(value - values[index])),
      0
    );

    return {
      input: `${values.length}\n${values.join(' ')}`,
      expectedOutput: String(maxDiff),
      actualOutput: null,
      status: null
    };
  });
};

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
          input: "2,7,11,15\n9\n",
          expectedOutput: "[0,1]",
          actualOutput: null,
          status: null
        },
        {
          input: "3,2,4\n6\n",
          expectedOutput: "[1,2]",
          actualOutput: null,
          status: null
        },
        {
          input: "3,3\n6\n",
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
          output: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
          explanation: "Prints numbers 1 to 10 sequentially."
        }
      ],
      publicTestCases: [
        {
          input: "",
          test_id: 1,
          expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
          actualOutput: null,
          status: null
        }
      ]
    },
    {
      id: 7,
      title: "Codeforces Style - Scoreboard Update",
      difficulty: "Easy",
      score: 120,
      submissions: 214,
      successRate: 83,
      solved: false,
      description: "You are given an integer n followed by n contest scores. Print the sum of all scores, the maximum score, and the minimum score, each on a separate line.",
      constraints: [
        "1 ≤ n ≤ 1000",
        "0 ≤ score[i] ≤ 10^6"
      ],
      examples: [
        {
          input: "5\n10 20 30 40 50",
          output: "150\n50\n10",
          explanation: "The total is 150, the maximum is 50, and the minimum is 10."
        },
        {
          input: "3\n7 7 7",
          output: "21\n7\n7",
          explanation: "All scores are equal, so sum, max, and min are easy to compute."
        }
      ],
      publicTestCases: [
        {
          input: "5\n10 20 30 40 50",
          expectedOutput: "150\n50\n10",
          actualOutput: null,
          status: null
        },
        {
          input: "4\n100 1 50 2",
          expectedOutput: "153\n100\n1",
          actualOutput: null,
          status: null
        },
        {
          input: "3\n7 7 7",
          expectedOutput: "21\n7\n7",
          actualOutput: null,
          status: null
        }
      ]
    },
    {
      id: 8,
      title: "Codeforces Style - Nearest Round Number",
      difficulty: "Easy",
      score: 130,
      submissions: 188,
      successRate: 79,
      solved: false,
      description: "For each given integer, print the nearest multiple of 10 that is greater than or equal to it. Process all numbers in the order given.",
      constraints: [
        "1 ≤ n ≤ 1000",
        "1 ≤ value ≤ 10^9"
      ],
      examples: [
        {
          input: "4\n1 9 10 21",
          output: "10\n10\n10\n30",
          explanation: "Each value is rounded up to the next multiple of 10."
        }
      ],
      publicTestCases: [
        {
          input: "4\n1 9 10 21",
          expectedOutput: "10\n10\n10\n30",
          actualOutput: null,
          status: null
        },
        {
          input: "3\n100 101 109",
          expectedOutput: "100\n110\n110",
          actualOutput: null,
          status: null
        },
        {
          input: "5\n7 8 19 20 99",
          expectedOutput: "10\n10\n20\n20\n100",
          actualOutput: null,
          status: null
        }
      ]
    },
    {
      id: 9,
      title: "9. Codeforces Style - Odd Prefix Count",
      difficulty: "Medium",
      score: 180,
      submissions: 156,
      successRate: 71,
      solved: false,
      description: "Given an array, print the number of odd values in every prefix. The i-th output line should contain the count of odd numbers among the first i elements.",
      constraints: [
        "1 ≤ n ≤ 2000",
        "-10^9 ≤ a[i] ≤ 10^9"
      ],
      examples: [
        {
          input: "6\n1 2 3 4 5 6",
          output: "1\n1\n2\n2\n3\n3",
          explanation: "Odd numbers appear at positions 1, 3, and 5."
        }
      ],
      publicTestCases: [
        {
          input: "6\n1 2 3 4 5 6",
          expectedOutput: "1\n1\n2\n2\n3\n3",
          actualOutput: null,
          status: null
        },
        {
          input: "5\n2 4 6 8 10",
          expectedOutput: "0\n0\n0\n0\n0",
          actualOutput: null,
          status: null
        },
        {
          input: "5\n9 1 8 3 7",
          expectedOutput: "1\n2\n2\n3\n4",
          actualOutput: null,
          status: null
        }
      ]
    },
    {
      id: 10,
      title: "10. Codeforces Style - Balance the Array",
      difficulty: "Medium",
      score: 210,
      submissions: 143,
      successRate: 64,
      solved: false,
      description: "Given an array, determine whether the sum of the first half is equal to the sum of the second half. Print YES if they are equal, otherwise print NO.",
      constraints: [
        "2 ≤ n ≤ 2000",
        "n is even",
        "-10^9 ≤ a[i] ≤ 10^9"
      ],
      examples: [
        {
          input: "4\n1 2 3 4",
          output: "NO",
          explanation: "The first half sums to 3 and the second half sums to 7."
        },
        {
          input: "6\n5 5 1 2 3 6",
          output: "YES",
          explanation: "The first three numbers sum to 11 and the last three also sum to 11."
        }
      ],
      publicTestCases: [
        {
          input: "4\n1 2 3 4",
          expectedOutput: "NO",
          actualOutput: null,
          status: null
        },
        {
          input: "6\n5 5 1 2 3 6",
          expectedOutput: "YES",
          actualOutput: null,
          status: null
        },
        {
          input: "8\n4 4 4 4 4 4 4 4",
          expectedOutput: "YES",
          actualOutput: null,
          status: null
        }
      ]
    },
    {
      id: 11,
      title: "1301B. Codeforces Style - Maximum Adjacent Difference",
      difficulty: "Medium",
      score: 260,
      submissions: 97,
      successRate: 49,
      solved: false,
      description: "For each array, find the maximum absolute difference between two adjacent elements and print it.",
      constraints: [
        "2 ≤ n ≤ 10^4",
        "-10^9 ≤ a[i] ≤ 10^9"
      ],
      examples: [
        {
          input: "5\n1 3 8 2 7",
          output: "6",
          explanation: "The largest adjacent gap is |8 - 2| = 6."
        }
      ],
      publicTestCases: buildMaxAdjacentDiffTestCases()
    },
    {
      id: 158,
      title: "158B. Taxi",
      difficulty: "Medium",
      score: 1200,
      submissions: 1000000,
      successRate: 55,
      solved: false,
      description: "After the lessons n groups of schoolchildren went outside and decided to visit Polycarpus to celebrate his birthday. We know that the i-th group consists of si friends (1 ≤ si ≤ 4), and they want to go to Polycarpus together. They decided to get there by taxi. Each car can carry at most four passengers. What minimum number of cars will the children need if all members of each group should ride in the same taxi (but one taxi can take more than one group)?",
      constraints: [
        "1 ≤ n ≤ 10^5",
        "1 ≤ a[i] ≤ 4"
      ],
      examples: [
        {
          input: "5\n1 2 4 3 3",
          output: "4",
          explanation: "Groups can be arranged optimally into 4 taxis."
        }
      ],
      publicTestCases: [
        {
          input: "5\n1 2 4 3 3",
          expectedOutput: "4",
          actualOutput: null,
          status: null
        },
        {
          input: "8\n2 3 4 4 2 1 3 1",
          expectedOutput: "5",
          actualOutput: null,
          status: null
        },
        {
          input: "4\n4 4 4 4",
          expectedOutput: "4",
          actualOutput: null,
          status: null
        },
        {
          input: "4\n1 1 1 1",
          expectedOutput: "1",
          actualOutput: null,
          status: null
        },
        {
          input: "6\n1 2 3 4 3 2",
          expectedOutput: "4",
          actualOutput: null,
          status: null
        },
        {
          input: "3\n2 2 2",
          expectedOutput: "2",
          actualOutput: null,
          status: null
        },
        {
          input: "7\n1 1 1 2 2 3 4",
          expectedOutput: "4",
          actualOutput: null,
          status: null
        },
        {
          input: "10\n1 1 1 1 2 2 2 3 3 4",
          expectedOutput: "5",
          actualOutput: null,
          status: null
        },
        {
          input: "1\n4",
          expectedOutput: "1",
          actualOutput: null,
          status: null
        },
        {
          input: "5\n2 2 2 2 2",
          expectedOutput: "3",
          actualOutput: null,
          status: null
        },
        {
          input: "9\n1 3 1 3 1 3 1 3 1",
          expectedOutput: "5",
          actualOutput: null,
          status: null
        }
      ]
    },
    {
      "id": 2001,
      "title": "295C Minimum Boats",
      "difficulty": "Medium",
      "score": 1200,
      "submissions": 120,
      "successRate": 52,
      "solved": false,
      "description": `One day Greg and his friends were walking in the forest. Overall there were n people walking, including Greg. Soon he found himself in front of a river. The guys immediately decided to get across the river. Luckily, there was a boat by the river bank, just where the guys were standing. We know that the boat can hold people with the total weight of at most k kilograms.

Greg immediately took a piece of paper and listed there the weights of all people in his group (including himself). It turned out that each person weights either 50 or 100 kilograms. Now Greg wants to know what minimum number of times the boat needs to cross the river to transport the whole group to the other bank. The boat needs at least one person to navigate it from one bank to the other. As the boat crosses the river, it can have any non-zero number of passengers as long as their total weight doesn't exceed k.

Also Greg is wondering, how many ways there are to transport everybody to the other side in the minimum number of boat rides. Two ways are considered distinct if during some ride they have distinct sets of people on the boat.

Help Greg with this problem.`,

      "constraints": [
        "1 ≤ n ≤ 10^5",
        "1 ≤ weight[i] ≤ 10^5",
        "1 ≤ limit ≤ 10^5"
      ],
      "examples": [
        {
          "input": "4 5\n1 2 3 4",
          "output": "3",
          "explanation": "Pair 1+4, 2+3 not possible due to limit."
        }
      ],
      "publicTestCases": [
        { "input": "1 5\n3", "expectedOutput": "1" },
        { "input": "2 5\n2 3", "expectedOutput": "1" },
        { "input": "2 5\n3 3", "expectedOutput": "2" },
        { "input": "3 3\n1 1 1", "expectedOutput": "2" },
        { "input": "4 4\n1 2 2 3", "expectedOutput": "2" },
        { "input": "5 5\n1 1 1 1 1", "expectedOutput": "3" },
        { "input": "5 5\n5 5 5 5 5", "expectedOutput": "5" },
        { "input": "6 6\n1 2 3 4 5 6", "expectedOutput": "2" },
        { "input": "4 3\n2 2 2 2", "expectedOutput": "0" },
        { "input": "4 5\n1 4 2 3", "expectedOutput": "2" },
        { "input": "3 4\n2 2 2", "expectedOutput": "2" },
        { "input": "6 7\n1 6 2 5 3 4", "expectedOutput": "3" },
        { "input": "7 10\n2 3 5 7 1 4 6", "expectedOutput": "4" },
        { "input": "5 8\n3 3 3 3 3", "expectedOutput": "3" },
        { "input": "8 10\n1 2 3 4 5 6 7 8", "expectedOutput": "4" },
        { "input": "9 9\n1 2 3 4 5 6 7 8 9", "expectedOutput": "5" },
        { "input": "10 10\n1 1 1 1 1 1 1 1 1 1", "expectedOutput": "5" },
        { "input": "4 6\n3 3 3 3", "expectedOutput": "2" },
        { "input": "6 10\n5 5 5 5 5 5", "expectedOutput": "3" },
        { "input": "5 6\n1 2 3 4 5", "expectedOutput": "3" }
      ]
    },
    {
      "id": 2002,
      "title": "Min Platforms Required",
      "difficulty": "Medium",
      "score": 1300,
      "submissions": 90,
      "successRate": 48,
      "solved": false,
      "description": "Given arrival and departure times of trains, find the minimum number of platforms required so that no train waits.",
      "constraints": [
        "1 ≤ n ≤ 10^5",
        "0 ≤ time ≤ 10^9"
      ],
      "examples": [
        {
          "input": "3\n1 3\n2 5\n4 6",
          "output": "2"
        }
      ],
      "publicTestCases": [
        { "input": "1\n1 2", "expectedOutput": "1" },
        { "input": "2\n1 3\n2 4", "expectedOutput": "2" },
        { "input": "2\n1 2\n3 4", "expectedOutput": "1" },
        { "input": "3\n1 5\n2 6\n3 7", "expectedOutput": "3" },
        { "input": "4\n1 2\n2 3\n3 4\n4 5", "expectedOutput": "1" },
        { "input": "5\n1 10\n2 3\n4 5\n6 7\n8 9", "expectedOutput": "2" },
        { "input": "3\n1 4\n2 3\n3 5", "expectedOutput": "2" },
        { "input": "4\n1 4\n2 5\n7 8\n6 9", "expectedOutput": "2" },
        { "input": "5\n1 3\n3 5\n5 7\n7 9\n9 11", "expectedOutput": "1" },
        { "input": "3\n1 10\n2 9\n3 8", "expectedOutput": "3" },
        { "input": "4\n1 2\n1 2\n1 2\n1 2", "expectedOutput": "4" },
        { "input": "3\n5 10\n6 7\n8 9", "expectedOutput": "2" },
        { "input": "6\n1 2\n2 3\n3 4\n4 5\n5 6\n6 7", "expectedOutput": "1" },
        { "input": "5\n1 5\n2 3\n3 4\n4 6\n6 7", "expectedOutput": "2" },
        { "input": "4\n2 3\n3 4\n4 5\n5 6", "expectedOutput": "1" },
        { "input": "5\n1 10\n2 9\n3 8\n4 7\n5 6", "expectedOutput": "5" },
        { "input": "3\n10 20\n15 25\n30 40", "expectedOutput": "2" },
        { "input": "4\n1 100\n2 3\n4 5\n6 7", "expectedOutput": "2" },
        { "input": "5\n1 2\n2 3\n2 3\n3 4\n4 5", "expectedOutput": "2" },
        { "input": "2\n1 100\n50 150", "expectedOutput": "2" }
      ]
    },
    {
      "id": 2003,
      "title": "Max Pair Sum Under Limit",
      "difficulty": "Medium",
      "score": 1200,
      "submissions": 70,
      "successRate": 50,
      "solved": false,
      "description": "Pair elements such that sum of each pair ≤ k. Maximize number of pairs.",
      "constraints": [
        "1 ≤ n ≤ 10^5",
        "1 ≤ a[i] ≤ 10^5"
      ],
      "examples": [
        {
          "input": "5 5\n1 2 3 4 5",
          "output": "2"
        }
      ],
      "publicTestCases": [
        { "input": "1 5\n3", "expectedOutput": "0" },
        { "input": "2 5\n2 3", "expectedOutput": "1" },
        { "input": "3 3\n1 1 1", "expectedOutput": "1" },
        { "input": "4 5\n1 2 3 4", "expectedOutput": "2" },
        { "input": "5 4\n1 1 1 1 1", "expectedOutput": "2" },
        { "input": "6 6\n1 2 3 4 5 6", "expectedOutput": "2" },
        { "input": "4 3\n2 2 2 2", "expectedOutput": "0" },
        { "input": "4 5\n1 4 2 3", "expectedOutput": "1" },
        { "input": "3 4\n2 2 2", "expectedOutput": "1" },
        { "input": "6 7\n1 6 2 5 3 4", "expectedOutput": "1" },
        { "input": "7 10\n2 3 5 7 1 4 6", "expectedOutput": "3" },
        { "input": "5 8\n3 3 3 3 3", "expectedOutput": "2" },
        { "input": "8 10\n1 2 3 4 5 6 7 8", "expectedOutput": "4" },
        { "input": "9 9\n1 2 3 4 5 6 7 8 9", "expectedOutput": "4" },
        { "input": "10 10\n1 1 1 1 1 1 1 1 1 1", "expectedOutput": "5" },
        { "input": "4 6\n3 3 3 3", "expectedOutput": "2" },
        { "input": "6 10\n5 5 5 5 5 5", "expectedOutput": "3" },
        { "input": "5 6\n1 2 3 4 5", "expectedOutput": "2" },
        { "input": "3 5\n2 2 2", "expectedOutput": "1" },
        { "input": "6 8\n1 7 2 6 3 5", "expectedOutput": "1" }
      ]
    },
    {
      "id": 2004,
      "title": "Minimum Rooms",
      "difficulty": "Medium",
      "score": 1200,
      "description": "You are given a schedule of meetings, where each meeting is represented by a pair of integers (start, end). The start time denotes when the meeting begins, and the end time denotes when the meeting finishes. All meetings take place within a shared facility that has multiple identical rooms available.\n\nYour task is to determine the minimum number of rooms required so that all meetings can be conducted without any conflicts. A conflict occurs if two meetings overlap in time and are assigned to the same room.\n\nA meeting [s1, e1] overlaps with another meeting [s2, e2] if they share any common time interval. Note that if one meeting ends exactly at the same time another meeting starts (e1 = s2), they are NOT considered overlapping, and can be scheduled in the same room.\n\nYou must assign each meeting to a room such that no two overlapping meetings share the same room, and the total number of rooms used is minimized.\n\nThis problem is a classic example of interval scheduling and can be efficiently solved using a greedy approach. One common strategy is to process all start and end times in sorted order and track how many meetings are active at any given time. The maximum number of simultaneously active meetings at any moment determines the minimum number of rooms required.\n\nAlternatively, this can also be solved using a min-heap (priority queue) where you track the earliest ending meeting currently occupying a room and reuse rooms whenever possible.\n\nThe key insight is that the answer is equal to the maximum number of overlapping intervals at any point in time.\n\nInput Format:\n- The first line contains an integer n, the number of meetings.\n- The next n lines each contain two integers s and e, representing the start and end times of a meeting.\n\nOutput Format:\n- Print a single integer: the minimum number of rooms required to accommodate all meetings without overlap.\n\nConstraints:\n- 1 ≤ n ≤ 10^5\n- 0 ≤ start < end ≤ 10^9\n\nEdge Cases to Consider:\n- All meetings completely overlap → need n rooms.\n- No meetings overlap → need only 1 room.\n- Meetings with same start time.\n- Meetings with same end time.\n- Nested intervals (one large meeting covering many smaller ones).\n\nHint:\nSort all start and end times separately and use two pointers to simulate the timeline, increasing room count when a meeting starts and decreasing when one ends. Track the maximum value reached.",
      "publicTestCases": [
        { "input": "1\n1 2", "expectedOutput": "1" },
        { "input": "2\n1 3\n2 4", "expectedOutput": "2" },
        { "input": "2\n1 2\n3 4", "expectedOutput": "1" },
        { "input": "3\n1 5\n2 6\n3 7", "expectedOutput": "3" },
        { "input": "4\n1 2\n2 3\n3 4\n4 5", "expectedOutput": "1" },
        { "input": "5\n1 10\n2 3\n4 5\n6 7\n8 9", "expectedOutput": "2" },
        { "input": "3\n1 4\n2 3\n3 5", "expectedOutput": "2" },
        { "input": "4\n1 4\n2 5\n7 8\n6 9", "expectedOutput": "2" },
        { "input": "5\n1 3\n3 5\n5 7\n7 9\n9 11", "expectedOutput": "1" },
        { "input": "3\n1 10\n2 9\n3 8", "expectedOutput": "3" },
        { "input": "4\n1 2\n1 2\n1 2\n1 2", "expectedOutput": "4" },
        { "input": "3\n5 10\n6 7\n8 9", "expectedOutput": "2" },
        { "input": "6\n1 2\n2 3\n3 4\n4 5\n5 6\n6 7", "expectedOutput": "1" },
        { "input": "5\n1 5\n2 3\n3 4\n4 6\n6 7", "expectedOutput": "2" },
        { "input": "4\n2 3\n3 4\n4 5\n5 6", "expectedOutput": "1" },
        { "input": "5\n1 10\n2 9\n3 8\n4 7\n5 6", "expectedOutput": "5" },
        { "input": "3\n10 20\n15 25\n30 40", "expectedOutput": "2" },
        { "input": "4\n1 100\n2 3\n4 5\n6 7", "expectedOutput": "2" },
        { "input": "5\n1 2\n2 3\n2 3\n3 4\n4 5", "expectedOutput": "2" },
        { "input": "2\n1 100\n50 150", "expectedOutput": "2" }
      ]
    },

    {
      "id": 2005,
      "title": "Max Non-overlapping Segments",
      "difficulty": "Medium",
      "score": 1300,
      "description": "You are given a set of segments (also called intervals), where each segment is defined by two integers: a start time and an end time. Each segment [l, r] represents an activity that begins at time l and finishes at time r.\n\nYour task is to select the maximum number of segments such that no two selected segments overlap with each other. Two segments are said to overlap if they share any common time interval. However, if one segment ends exactly at the same time another segment begins (i.e., r1 = l2), they are considered non-overlapping and can both be selected.\n\nThe goal is to maximize the number of non-overlapping segments chosen from the given set.\n\nThis is a classic greedy problem known as the Activity Selection Problem. The optimal strategy is to always pick the segment that finishes earliest among the remaining segments. By doing so, you leave as much room as possible for future segments.\n\nA common approach to solve this problem efficiently is:\n1. Sort all segments based on their ending times in ascending order.\n2. Initialize a variable to track the end time of the last selected segment.\n3. Iterate through the sorted segments:\n   - If the current segment's start time is greater than or equal to the last selected end time, select it.\n   - Update the last selected end time.\n4. Count how many segments are selected.\n\nThis greedy approach guarantees the maximum number of non-overlapping segments.\n\nInput Format:\n- The first line contains an integer n, the number of segments.\n- The next n lines each contain two integers l and r, representing the start and end of a segment.\n\nOutput Format:\n- Print a single integer: the maximum number of non-overlapping segments that can be selected.\n\nConstraints:\n- 1 ≤ n ≤ 10^5\n- 0 ≤ l < r ≤ 10^9\n\nEdge Cases to Consider:\n- All segments overlap completely → only 1 can be selected.\n- No segments overlap → all can be selected.\n- Multiple segments having the same start and end time.\n- Segments that are nested inside others.\n- Segments with identical end times.\n\nKey Insight:\nThe problem reduces to selecting intervals in such a way that each chosen interval finishes as early as possible, ensuring maximum room for subsequent selections.\n\nTime Complexity:\n- Sorting takes O(n log n)\n- Traversal takes O(n)\n- Overall complexity: O(n log n)\n\nSpace Complexity:\n- O(n) for storing intervals.\n\nHint:\nAlways prioritize the segment with the smallest end time when making a choice.",
      "publicTestCases": [
        { "input": "1\n1 2", "expectedOutput": "1" },
        { "input": "2\n1 3\n2 4", "expectedOutput": "1" },
        { "input": "2\n1 2\n3 4", "expectedOutput": "2" },
        { "input": "3\n1 5\n2 6\n3 7", "expectedOutput": "1" },
        { "input": "4\n1 2\n2 3\n3 4\n4 5", "expectedOutput": "4" },
        { "input": "5\n1 10\n2 3\n4 5\n6 7\n8 9", "expectedOutput": "4" },
        { "input": "3\n1 4\n2 3\n3 5", "expectedOutput": "2" },
        { "input": "4\n1 4\n2 5\n7 8\n6 9", "expectedOutput": "2" },
        { "input": "5\n1 3\n3 5\n5 7\n7 9\n9 11", "expectedOutput": "5" },
        { "input": "3\n1 10\n2 9\n3 8", "expectedOutput": "1" },
        { "input": "4\n1 2\n1 2\n1 2\n1 2", "expectedOutput": "1" },
        { "input": "3\n5 10\n6 7\n8 9", "expectedOutput": "2" },
        { "input": "6\n1 2\n2 3\n3 4\n4 5\n5 6\n6 7", "expectedOutput": "6" },
        { "input": "5\n1 5\n2 3\n3 4\n4 6\n6 7", "expectedOutput": "4" },
        { "input": "4\n2 3\n3 4\n4 5\n5 6", "expectedOutput": "4" },
        { "input": "5\n1 10\n2 9\n3 8\n4 7\n5 6", "expectedOutput": "1" },
        { "input": "3\n10 20\n15 25\n30 40", "expectedOutput": "2" },
        { "input": "4\n1 100\n2 3\n4 5\n6 7", "expectedOutput": "3" },
        { "input": "5\n1 2\n2 3\n2 3\n3 4\n4 5", "expectedOutput": "4" },
        { "input": "2\n1 100\n50 150", "expectedOutput": "1" }
      ]
    },
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
      // Analyze code locally
      const complexity = estimateComplexity(code, language);
      const analysisResults = analyzeCode(code, language);

      // Prepare test cases
      const tests = selectedProblem?.publicTestCases?.map((tc, index) => ({
        problem_id: String(selectedProblem.id),
        test_id: String(index + 1),
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
      const result = await api.post(`/submission/test/private`, payload);

      const isSuccess = result.status === 'SUCCESS';
      var avgTime = 0
      var totalExecutionTime = avgTime
      if (isSuccess) {
        result?.results?.forEach((result) => avgTime = avgTime + (result?.status?.exec_time_ms ?? 0))
        totalExecutionTime = avgTime
        avgTime = avgTime / result?.results.length
      }



      setOutput({
        status: isSuccess ? 'success' : 'error',
        message: isSuccess
          ? 'All public test cases passed! Ready to submit.'
          : (result.error || 'Some test cases failed. Review your code and try again.'),
        testResults: result.results,
        avgTime: Math.round(avgTime),
        totalExecutionTime: totalExecutionTime,
        complexity: complexity,
        analysisResults: analysisResults
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
    setIsRunning(true);
    setOutputVisible(true);
    setOutput(null); // Clear previous output



    try {
      // Analyze code locally
      // const complexity = estimateComplexity(code, language);

      // Prepare test cases
      const tests = selectedProblem?.publicTestCases?.map((tc, index) => ({
        problem_id: String(selectedProblem.id),
        test_id: String(index + 1),
        stdin: tc.input,
        expected_output: tc.expectedOutput
      })) || [];
      const totalTests = selectedProblem?.publicTestCases?.length
      // Base64 encode code
      const encodedCode = btoa(code);

      const payload = {
        id: String(Date.now()), // temporary ID
        problem_id: String(selectedProblem?.id),
        language: language,
        code: encodedCode,
        tests: tests
      };
      const result = await api.post(`/submission/test/private`, payload);
      const aiSummaryPromise = codeReview.getReview(new AIPayload({ code: code, language: language, message: result.error ? result.error : result.status, question: selectedProblem.description }))


      const isSuccess = result.status === 'SUCCESS';
      var avgTime = 0
      var totalExecutionTime = avgTime
      if (isSuccess) {
        result?.results?.forEach((result) => avgTime = avgTime + (result?.status?.exec_time_ms ?? 0))
        totalExecutionTime = avgTime
        avgTime = avgTime / result?.results.length
      }

      // result structure from backend: { Status: "...", Results: [...], Error: "..." }

      // Map backend results to frontend format
      // check specific enum string in backend? "Success"?

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
      let passedTests = 0
      if (!isSuccess) {
        result.results.forEach((result) => {
          if (result.status.current_status === 'SUCCESS') {
            passedTests++
          }
        });
      } else {
        passedTests = totalTests
      }


      setOutput({
        status: isSuccess ? 'success' : 'error',
        message: isSuccess ? 'Congratulations! All test cases passed.' : 'Some test cases failed.',
        submissionResults: true,
        passedTests: passedTests,
        failedTests: totalTests - passedTests,
        score: isSuccess ? selectedProblem?.score : Math.floor(passedTests / totalTests * selectedProblem?.score),
        totalScore: selectedProblem?.score,
        totalExecutionTime: totalExecutionTime,
        estimatedTimeComplexity: estimateComplexity(code),
        avgTime: Math.round(avgTime),
        aiSummaryPromise: aiSummaryPromise,
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
