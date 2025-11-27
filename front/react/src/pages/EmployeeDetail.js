import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { employeeAPI } from '../services/api';

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await employeeAPI.getEmployee(id);

      // 后端返回格式: { status: "success", data: {...} }
      const employeeData = response.data.data || response.data;
      console.log('📊 Fetched employee:', employeeData);

      setEmployee(employeeData);
    } catch (err) {
      console.error('❌ Error fetching employee:', err);
      setError('Failed to load employee details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeAPI.deleteEmployee(id);
        navigate('/employees');
      } catch (err) {
        console.error('Error deleting employee:', err);
        setError('Failed to delete employee. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={() => navigate('/employees')}>Back to List</Button>
      </Container>
    );
  }

  if (!employee) {
    return (
      <Container className="py-4">
        <Alert variant="warning">Employee not found.</Alert>
        <Button onClick={() => navigate('/employees')}>Back to List</Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h2>Employee Details</h2>
          <div>
            <Button
              variant="warning"
              className="me-2"
              onClick={() => navigate(`/employees/edit/${id}`)}
            >
              Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            {employee.profilePicture && (
              <Col md={12} className="text-center mb-4">
                <img
                  src={employee.profilePicture}
                  alt={`${employee.first_name} ${employee.last_name}`}
                  style={{ maxWidth: '200px', borderRadius: '10px' }}
                />
              </Col>
            )}
          </Row>

          <Row>
            <Col md={6}>
              <div className="mb-3">
                <strong>First Name:</strong>
                <p>{employee.first_name}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <strong>Last Name:</strong>
                <p>{employee.last_name}</p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="mb-3">
                <strong>Email:</strong>
                <p>{employee.email}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <strong>Position:</strong>
                <p>{employee.position}</p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="mb-3">
                <strong>Department:</strong>
                <p>{employee.department}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <strong>Salary:</strong>
                <p>${employee.salary?.toLocaleString()}</p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="mb-3">
                <strong>Date of Joining:</strong>
                <p>{employee.date_of_joining ? new Date(employee.date_of_joining).toLocaleDateString() : 'N/A'}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <strong>Employee ID:</strong>
                <p>{employee._id}</p>
              </div>
            </Col>
          </Row>

          <div className="mt-4">
            <Button variant="secondary" onClick={() => navigate('/employees')}>
              Back to List
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EmployeeDetail;
