import React, { useEffect, useState } from 'react';

const TestConnection = () => {
    const [message, setMessage] = useState('Loading...');

    useEffect(() => {
        fetch('/api/')
            .then(res => res.json())
            .then(data => setMessage(data.message))
            .catch(err => setMessage('Error calling backend: ' + err.toString()));
    }, []);

    return (
        <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>System Connectivity Test</h1>

            <div style={{ marginTop: '20px' }}>
                <h3>Connection Status:</h3>
                <div style={{
                    padding: '15px',
                    backgroundColor: message.includes('Error') ? '#ffebee' : '#e8f5e9',
                    border: '1px solid',
                    borderColor: message.includes('Error') ? '#ffcdd2' : '#c8e6c9',
                    borderRadius: '4px',
                    color: message.includes('Error') ? '#c62828' : '#2e7d32',
                    fontWeight: 'bold'
                }}>
                    {message === 'Loading...' ? 'Checking Connection...' : (message.includes('Error') ? 'FAILED' : 'CONNECTED')}
                </div>
            </div>

            <div style={{ marginTop: '30px' }}>
                <h3>Backend Response (Test Case Output):</h3>
                <div style={{
                    backgroundColor: '#1e1e1e',
                    color: '#00ff00',
                    padding: '20px',
                    borderRadius: '8px',
                    fontFamily: 'monospace',
                    fontSize: '16px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ marginBottom: '10px', color: '#888' }}>// Response from GET /api/</div>
                    &gt; {message}
                    <div style={{ marginTop: '10px', animation: 'blink 1s step-end infinite' }}>_</div>
                </div>
            </div>

            <style>{`
                @keyframes blink { 50% { opacity: 0; } }
            `}</style>
        </div>
    );
};

export default TestConnection;
