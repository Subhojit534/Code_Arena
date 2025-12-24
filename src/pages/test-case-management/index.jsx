import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavigation from '../../components/navigation/AdminNavigation';
import NavigationBreadcrumbs from '../../components/navigation/NavigationBreadcrumbs';
import ProblemSelector from './components/ProblemSelector';
import TestCaseList from './components/TestCaseList';
import TestCaseEditor from './components/TestCaseEditor';
import BulkImportModal from './components/BulkImportModal';
import TestExecutionPreview from './components/TestExecutionPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TestCaseManagement = () => {
    const navigate = useNavigate();
    const [selectedProblem, setSelectedProblem] = useState('');
    const [testCases, setTestCases] = useState([]);
    const [showEditor, setShowEditor] = useState(false);
    const [editingTestCase, setEditingTestCase] = useState(null);
    const [showBulkImport, setShowBulkImport] = useState(false);
    const [previewTestCase, setPreviewTestCase] = useState(null);
    const [formData, setFormData] = useState({
        description: '',
        input: '',
        expectedOutput: '',
        isPublic: true,
        priority: 'medium'
    });
    const [errors, setErrors] = useState({});

    const problems = [
        {
            id: 'prob-001',
            title: 'Two Sum',
            difficulty: 'Easy',
            testCaseCount: 5
        },
        {
            id: 'prob-002',
            title: 'Reverse Linked List',
            difficulty: 'Medium',
            testCaseCount: 8
        },
        {
            id: 'prob-003',
            title: 'Binary Tree Maximum Path Sum',
            difficulty: 'Hard',
            testCaseCount: 12
        },
        {
            id: 'prob-004',
            title: 'Valid Parentheses',
            difficulty: 'Easy',
            testCaseCount: 6
        },
        {
            id: 'prob-005',
            title: 'Merge K Sorted Lists',
            difficulty: 'Hard',
            testCaseCount: 10
        }
    ];

    const mockTestCases = {
        'prob-001': [
            {
                id: 'tc-001',
                description: 'Basic two element array',
                input: '[2, 7]\n9',
                expectedOutput: '[0, 1]',
                isPublic: true,
                priority: 'high'
            },
            {
                id: 'tc-002',
                description: 'Array with multiple valid pairs',
                input: '[3, 2, 4]\n6',
                expectedOutput: '[1, 2]',
                isPublic: true,
                priority: 'high'
            },
            {
                id: 'tc-003',
                description: 'Large array with target at end',
                input: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n19',
                expectedOutput: '[8, 9]',
                isPublic: true,
                priority: 'medium'
            },
            {
                id: 'tc-004',
                description: 'Edge case with negative numbers',
                input: '[-1, -2, -3, -4, -5]\n-8',
                expectedOutput: '[2, 4]',
                isPublic: false,
                priority: 'high'
            },
            {
                id: 'tc-005',
                description: 'Large dataset performance test',
                input: '[1, 2, 3, ..., 10000]\n19999',
                expectedOutput: '[9998, 9999]',
                isPublic: false,
                priority: 'low'
            }
        ],
        'prob-002': [
            {
                id: 'tc-006',
                description: 'Single node list',
                input: '[1]',
                expectedOutput: '[1]',
                isPublic: true,
                priority: 'high'
            },
            {
                id: 'tc-007',
                description: 'Two node list',
                input: '[1, 2]',
                expectedOutput: '[2, 1]',
                isPublic: true,
                priority: 'high'
            },
            {
                id: 'tc-008',
                description: 'Multiple nodes',
                input: '[1, 2, 3, 4, 5]',
                expectedOutput: '[5, 4, 3, 2, 1]',
                isPublic: true,
                priority: 'medium'
            }
        ]
    };

    useEffect(() => {
        if (selectedProblem) {
            setTestCases(mockTestCases?.[selectedProblem] || []);
            setShowEditor(false);
            setEditingTestCase(null);
        }
    }, [selectedProblem]);

    const handleLogout = () => {
        navigate('/admin-login');
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData?.description?.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData?.input?.trim()) {
            newErrors.input = 'Input data is required';
        }

        if (!formData?.expectedOutput?.trim()) {
            newErrors.expectedOutput = 'Expected output is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors)?.length === 0;
    };

    const handleSubmit = (e) => {
        e?.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (editingTestCase) {
            setTestCases(testCases?.map(tc =>
                tc?.id === editingTestCase?.id
                    ? { ...tc, ...formData }
                    : tc
            ));
        } else {
            const newTestCase = {
                id: `tc-${Date.now()}`,
                ...formData
            };
            setTestCases([...testCases, newTestCase]);
        }

        resetForm();
    };

    const handleEdit = (testCase) => {
        setEditingTestCase(testCase);
        setFormData({
            description: testCase?.description,
            input: testCase?.input,
            expectedOutput: testCase?.expectedOutput,
            isPublic: testCase?.isPublic,
            priority: testCase?.priority
        });
        setShowEditor(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (testCaseId) => {
        if (window.confirm('Are you sure you want to delete this test case?')) {
            setTestCases(testCases?.filter(tc => tc?.id !== testCaseId));
        }
    };

    const handleToggleVisibility = (testCaseId) => {
        setTestCases(testCases?.map(tc =>
            tc?.id === testCaseId
                ? { ...tc, isPublic: !tc?.isPublic }
                : tc
        ));
    };

    const handleBulkImport = (importedTestCases) => {
        const newTestCases = importedTestCases?.map((tc, index) => ({
            id: `tc-${Date.now()}-${index}`,
            ...tc
        }));
        setTestCases([...testCases, ...newTestCases]);
    };

    const resetForm = () => {
        setFormData({
            description: '',
            input: '',
            expectedOutput: '',
            isPublic: true,
            priority: 'medium'
        });
        setErrors({});
        setShowEditor(false);
        setEditingTestCase(null);
    };

    const publicTestCasesCount = testCases?.filter(tc => tc?.isPublic)?.length;
    const privateTestCasesCount = testCases?.filter(tc => !tc?.isPublic)?.length;

    return (
        <div className="min-h-screen bg-background">
            <AdminNavigation onLogout={handleLogout} />
            <NavigationBreadcrumbs />
            <div className="pt-16 lg:pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">Test Case Management</h1>
                                <p className="text-muted-foreground">
                                    Create and manage public and private test cases with secure visibility controls
                                </p>
                            </div>

                            {selectedProblem && (
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowBulkImport(true)}
                                        iconName="Upload"
                                        iconPosition="left"
                                    >
                                        Bulk Import
                                    </Button>
                                    {!showEditor && (
                                        <Button
                                            variant="default"
                                            onClick={() => setShowEditor(true)}
                                            iconName="Plus"
                                            iconPosition="left"
                                        >
                                            New Test Case
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>

                        {selectedProblem && (
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-card rounded-lg border border-border p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Icon name="FileText" size={20} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-foreground">{testCases?.length}</p>
                                            <p className="text-xs text-muted-foreground">Total Test Cases</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-card rounded-lg border border-border p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                            <Icon name="Eye" size={20} className="text-accent" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-foreground">{publicTestCasesCount}</p>
                                            <p className="text-xs text-muted-foreground">Public Test Cases</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-card rounded-lg border border-border p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                                            <Icon name="EyeOff" size={20} className="text-destructive" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-foreground">{privateTestCasesCount}</p>
                                            <p className="text-xs text-muted-foreground">Private Test Cases</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <ProblemSelector
                            problems={problems}
                            selectedProblem={selectedProblem}
                            onProblemChange={setSelectedProblem}
                            loading={false}
                        />

                        {selectedProblem && (
                            <>
                                {showEditor && (
                                    <TestCaseEditor
                                        formData={formData}
                                        onChange={setFormData}
                                        onSubmit={handleSubmit}
                                        onCancel={resetForm}
                                        isEditing={!!editingTestCase}
                                        errors={errors}
                                    />
                                )}

                                <TestCaseList
                                    testCases={testCases}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onToggleVisibility={handleToggleVisibility}
                                />

                                {testCases?.length > 0 && (
                                    <div className="bg-card rounded-lg border border-border p-6">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Icon name="Info" size={20} className="text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-base font-semibold text-foreground mb-2">Test Case Security Guidelines</h3>
                                                <ul className="space-y-2 text-sm text-muted-foreground">
                                                    <li className="flex items-start gap-2">
                                                        <Icon name="CheckCircle" size={16} className="text-accent flex-shrink-0 mt-0.5" />
                                                        <span>Public test cases (maximum 3 recommended) help students understand problem requirements</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <Icon name="CheckCircle" size={16} className="text-accent flex-shrink-0 mt-0.5" />
                                                        <span>Private test cases ensure comprehensive evaluation without revealing edge cases</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <Icon name="CheckCircle" size={16} className="text-accent flex-shrink-0 mt-0.5" />
                                                        <span>All test case execution happens securely on the backend with no frontend code execution</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <Icon name="CheckCircle" size={16} className="text-accent flex-shrink-0 mt-0.5" />
                                                        <span>Students only see pass/fail status and scores for private test cases</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {!selectedProblem && (
                            <div className="bg-card rounded-lg border border-border p-12 text-center">
                                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                    <Icon name="FileText" size={40} className="text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mb-3">Select a Problem to Begin</h2>
                                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                                    Choose a coding problem from the dropdown above to create and manage its test cases with secure visibility controls
                                </p>
                                <div className="flex items-center justify-center gap-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => navigate('/problem-management')}
                                        iconName="Code"
                                        iconPosition="left"
                                    >
                                        Manage Problems
                                    </Button>
                                    <Button
                                        variant="default"
                                        onClick={() => navigate('/admin-dashboard')}
                                        iconName="LayoutDashboard"
                                        iconPosition="left"
                                    >
                                        Go to Dashboard
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showBulkImport && (
                <BulkImportModal
                    isOpen={showBulkImport}
                    onClose={() => setShowBulkImport(false)}
                    onImport={handleBulkImport}
                />
            )}
            {previewTestCase && (
                <TestExecutionPreview
                    testCase={previewTestCase}
                    onClose={() => setPreviewTestCase(null)}
                />
            )}
        </div>
    );
};

export default TestCaseManagement;