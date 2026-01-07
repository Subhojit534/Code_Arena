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


        if (url === '/leaderboard') {
            await mockDelay(800);
            return {
                data: mockData.leaderboard
            };
        }
        if (url === '/user/profile') {
            await mockDelay(800);
            return {
                data: mockData.userProfile
            };
        }
        if (url === '/user/dashboard') {
            await mockDelay(800);
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

        console.log(`POST request to ${url}`, data);

        if (url === '/admin/login') {
            await mockDelay(800);
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
        const backEndEnabled =
            import.meta.env.VITE_MODE === "production"
        if ((url === '/submission/test/public' || url === '/submission/test/private') && backEndEnabled) {
            const actualUrl = `${import.meta.env.VITE_BACKEND_HOST ?? 'http://localhost:30080'}${url}`
            const results = await fetch(actualUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"

                },
                body: JSON.stringify(data)
            }).then((res) => res.json()).catch((e) => console.log(e))
            console.log(results)
            return new Result(results)
        } else if (url === '/submission/test/public' || url === '/submission/test/private') {
            await mockDelay(800);
            return new Result({
                "problem_id": "69",
                "status": "SUCCESS",
                "results": [{
                    "test_id": "1",
                    "status": {
                        "message": "Test: #1 Passed",
                        "current_status": "SUCCESS",
                        "stdout": "",
                        "exec_time_ms": 10,
                        "stderr": "",
                        "completed_at": "2026-01-05T21:39:34.876312586Z"
                    },
                    "exec_result_id": "695c2f9686ced6c6f6308d93",
                }, {
                    "test_id": "2",
                    "status": {
                        "message": "Test: #2 Passed",
                        "current_status": "SUCCESS",
                        "stdout": "",
                        "stderr": "",
                        "exec_time_ms": 10,
                        "completed_at": "2026-01-05T21:39:34.87677458Z"
                    },
                    "exec_result_id": "695c2f9686ced6c6f6308d94"
                }],
                "error": ""
            })
        }

        console.warn(`Unhandled POST route: ${url}`);
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