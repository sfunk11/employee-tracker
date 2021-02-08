SELECT 
    employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee 
    FROM employee 
    ORDER BY Employee ASC;