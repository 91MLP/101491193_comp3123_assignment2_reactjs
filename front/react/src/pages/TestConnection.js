import React, { useState } from 'react';
import { Container, Button, Card, Alert } from 'react-bootstrap';
import { authAPI } from '../services/api';

function TestConnection() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const testLogin = async () => {
    setError(null);
    setResult(null);

    try {
      console.log('Testing login API...');
      const response = await authAPI.login({
        email: 'test@test.com',
        password: 'test123'
      });

      console.log('Response:', response);
      setResult(JSON.stringify(response.data, null, 2));
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data || err.message);
    }
  };

  return (
    <Container className="py-4">
      <Card>
        <Card.Header>
          <h2>API Connection Test</h2>
        </Card.Header>
        <Card.Body>
          <Button onClick={testLogin} className="mb-3">
            Test Login API
          </Button>

          {result && (
            <Alert variant="success">
              <strong>Success!</strong>
              <pre>{result}</pre>
            </Alert>
          )}

          {error && (
            <Alert variant="danger">
              <strong>Error!</strong>
              <pre>{JSON.stringify(error, null, 2)}</pre>
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TestConnection;
