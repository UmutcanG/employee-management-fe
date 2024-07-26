import React, { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee } from '../api/employeeApi';
import './EmployeeList.css';

const EmployeeList = ({ refreshList }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getEmployees();
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, [refreshList]);

    const handleDelete = async (id) => {
        try {
            await deleteEmployee(id);
            setEmployees(employees.filter(emp => emp.id !== id));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div className="employee-list">
            <h2>Employee List</h2>
            <ul>
                {employees.map(emp => (
                    <li key={emp.id} className="employee-item">
                        <div className="employee-info">
                            <img src={`http://localhost:8080/api/employees/photo/${emp.photoPath}`} alt={`${emp.name} ${emp.lastName}`} className="employee-photo" />
                            <strong>{emp.name} {emp.lastName}</strong> <br />
                            <span>{emp.email}</span>
                        </div>
                        <button className="delete-button" onClick={() => handleDelete(emp.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
