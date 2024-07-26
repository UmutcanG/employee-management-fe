import React, { useState, useEffect } from 'react';
import { addEmployee, updateEmployee, uploadEmployeePhoto } from '../api/employeeApi';
import './EmployeeForm.css';

const EmployeeForm = ({ selectedEmployee, onEmployeeSaved }) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        if (selectedEmployee) {
            setName(selectedEmployee.name);
            setLastName(selectedEmployee.lastName);
            setEmail(selectedEmployee.email);
            setDepartment(selectedEmployee.department);
        } else {
            setName('');
            setLastName('');
            setEmail('');
            setDepartment('');
        }
    }, [selectedEmployee]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const employee = { name, lastName, email, department };
        try {
            let savedEmployee;
            if (selectedEmployee) {
                savedEmployee = await updateEmployee(selectedEmployee.id, employee);
            } else {
                savedEmployee = await addEmployee(employee);
            }
            if (photo) {
                const formData = new FormData();
                formData.append('file', photo);
                await uploadEmployeePhoto(savedEmployee.id, formData);
            }
            if (typeof onEmployeeSaved === 'function') {
                onEmployeeSaved();
            }
            setName('');
            setLastName('');
            setEmail('');
            setDepartment('');
            setPhoto(null);
        } catch (error) {
            console.error('Error saving employee:', error);
        }
    };

    return (
        <div className="employee-form">
            <h2>{selectedEmployee ? 'Update Employee' : 'Add Employee'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Department:</label>
                    <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Photo:</label>
                    <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                </div>
                <button type="submit" className="submit-button">Save</button>
            </form>
        </div>
    );
};

export default EmployeeForm;
