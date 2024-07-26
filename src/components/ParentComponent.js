import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';

const ParentComponent = () => {
    const [refreshList, setRefreshList] = useState(false);

    const handleEmployeeSaved = () => {
        setRefreshList(prev => !prev);
    };

    return (
        <div>
            <EmployeeForm onEmployeeSaved={handleEmployeeSaved} />
            <EmployeeList refreshList={refreshList} />
        </div>
    );
};

export default ParentComponent;
