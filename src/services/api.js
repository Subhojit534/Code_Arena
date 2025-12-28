// Mock API Service for standalone frontend
// This replaces the axios-based service to disconnect the backend

import Result from "models/result";

const mockDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockData = {
    leaderboard: [{
            rank: 1,
            name: "Alice Johnson",
            handle: "alice_j",
            solved: 150,
            xp: 15000,
            isCurrentUser: false
        },
        {
            rank: 2,
            name: "Bob Smith",
            handle: "bob_dev",
            solved: 145,
            xp: 14200,
            isCurrentUser: false
        },
        {
            rank: 3,
            name: "Charlie Brown",
            handle: "cbrown",
            solved: 140,
            xp: 13800,
            isCurrentUser: false
        },
        {
            rank: 42,
            name: "Demo Student",
            handle: "demostudent",
            solved: 45,
            xp: 4200,
            isCurrentUser: true
        },
    ],
    userProfile: {
        name: "Demo Student",
        handle: "demostudent",
        globalRank: 42,
        solvedProblems: ["0", "1", "4"], // IDs of solved problems
        currentStreak: 5,
        totalXP: 4200,
        skillStats: {
            "Arrays": 85,
            "Strings": 70,
            "Dynamic Programming": 40,
            "Graphs": 30,
            "Trees": 50
        },
        topicStats: [{
                topic: "Arrays",
                count: 15,
                mastery: 85
            },
            {
                topic: "Strings",
                count: 12,
                mastery: 70
            },
            {
                topic: "DP",
                count: 5,
                mastery: 40
            }
        ],
        recentActivity: [{
                id: 1,
                type: "submission",
                title: "Two Sum",
                status: "Accepted",
                timestamp: "2 hours ago",
                xp: 100
            },
            {
                id: 2,
                type: "contest",
                title: "Weekly Contest 55",
                status: "Rank #120",
                timestamp: "Yesterday",
                xp: 50
            }
        ]
    },
    dashboard: {
        name: "Demo Student",
        weeklyProgress: {
            completed: 3,
            target: 5
        },
        recentActivity: [{
            id: 1,
            type: "submission",
            title: "Two Sum",
            status: "Accepted",
            timestamp: "2 hours ago",
            xp: 100
        }, ]
    }
};

const api = {
    get: async (url) => {
        await mockDelay(500); // Simulate network latency
        console.log(`[Mock API] GET request to ${url}`);

        if (url === '/leaderboard') {
            return {
                data: mockData.leaderboard
            };
        }
        if (url === '/user/profile') {
            return {
                data: mockData.userProfile
            };
        }
        if (url === '/user/dashboard') {
            return {
                data: mockData.dashboard
            };
        }

        // Default 404 for unknown mocked routes, but we can return empty to prevent crashes
        console.warn(`[Mock API] Unhandled GET route: ${url}`);
        return Promise.reject({
            response: {
                status: 404,
                data: {
                    error: "Not Found"
                }
            }
        });
    },

    post: async (url, data) => {
        await mockDelay(800);
        console.log(`[Mock API] POST request to ${url}`, data);

        if (url === '/admin/login') {
            // Mock admin login
            if (data.id === 'admin@codearena.com' && data.password === 'Admin@2025') {
                return {
                    status: 200,
                    data: {
                        token: "mock-admin-token-123",
                        refresh_token: "mock-refresh-token"
                    }
                };
            }
            // Allow generic admin login for demo purposes if specific creds fail, or strict?
            // Let's stick to strict to match typical auth flow, but maybe allow "admin"/"admin" for ease.
            if (data.id === 'admin' && data.password === 'admin') {
                return {
                    status: 200,
                    data: {
                        token: "mock-admin-token-123",
                        refresh_token: "mock-refresh-token"
                    }
                };
            }
            return Promise.reject({
                response: {
                    status: 401,
                    data: {
                        error: "Invalid credentials"
                    }
                }
            });
        }

        if (url === '/submission/test/public' || url === '/submission/test/private') {
            // Mock code execution
            // We simulate success for any code for now, or maybe check for syntax errors? 
            // Nah, simple is best for "disconnection".

            const isSuccess = true;
            // Mocking results depending on input test cases
            // We can just mirror back the inputs saying they passed
            const results = await fetch(`http://127.0.0.1:30080/submission/test/private`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                    
                },
                body: JSON.stringify(data)
            }).then((res) => res.json())

            console.log(results)

            return new Result(results)
        }

        console.warn(`[Mock API] Unhandled POST route: ${url}`);
        return Promise.reject({
            response: {
                status: 404,
                data: {
                    error: "Not Found"
                }
            }
        });
    },

    // Add interceptors mock to avoid crashing components that access them directly (if any)
    interceptors: {
        request: {
            use: () => {}
        },
        response: {
            use: () => {}
        }
    },

    defaults: {
        headers: {
            common: {}
        }
    }
};

export default api;