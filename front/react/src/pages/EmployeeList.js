import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { employeeAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

function EmployeeList() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 搜索过滤器
  const [searchFilters, setSearchFilters] = useState({
    department: '',
    position: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    filterEmployees();
  }, [employees, searchFilters]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await employeeAPI.getAllEmployees();

 
      const employeesData = response.data.data || [];
      console.log('📊 Fetched employees:', employeesData);

      setEmployees(Array.isArray(employeesData) ? employeesData : []);
    } catch (err) {
      console.error('❌ Error fetching employees:', err);
      setError('Failed to load employees. Please try again.');
      setEmployees([]); 
    } finally {
      setLoading(false);
    }
  };

  const filterEmployees = () => {
  
    if (!Array.isArray(employees)) {
      console.warn('⚠️ employees is not an array:', employees);
      setFilteredEmployees([]);
      return;
    }

    let filtered = [...employees];

    if (searchFilters.department) {
      filtered = filtered.filter((emp) =>
        emp.department?.toLowerCase().includes(searchFilters.department.toLowerCase())
      );
    }

    if (searchFilters.position) {
      filtered = filtered.filter((emp) =>
        emp.position?.toLowerCase().includes(searchFilters.position.toLowerCase())
      );
    }

    setFilteredEmployees(filtered);
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setSearchFilters({
      department: '',
      position: '',
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeAPI.deleteEmployee(id);
        fetchEmployees();
      } catch (err) {
        console.error('Error deleting employee:', err);
        setError('Failed to delete employee. Please try again.');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Employee Management</h1>
        <div>
          <span className="me-3">Welcome, {user?.username || 'User'}</span>
          <Button variant="outline-secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="mb-4 bg-light p-3 rounded">
        <h5>Search Employees</h5>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                placeholder="Search by department"
                value={searchFilters.department}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                placeholder="Search by position"
                value={searchFilters.position}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Col>
          <Col md={4} className="d-flex align-items-end">
            <Button
              variant="secondary"
              onClick={clearFilters}
              className="mb-3"
            >
              Clear Filters
            </Button>
          </Col>
        </Row>
      </div>

      <div className="mb-3">
        <Button
          variant="primary"
          onClick={() => navigate('/employees/add')}
        >
          Add New Employee
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>${employee.salary?.toLocaleString()}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/employees/${employee._id}`)}
                  >
                    View
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/employees/edit/${employee._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="text-muted">
        Showing {filteredEmployees.length} of {employees.length} employees
      </div>
    </Container>
  );
}

export default EmployeeList;
