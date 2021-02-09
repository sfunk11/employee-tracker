SELECT 
    department.name AS Department, role.salary AS Salary
FROM 
    employee e 
LEFT JOIN 
    employee m 
ON 
    e.manager_id = m.id 
INNER JOIN 
    role 
ON 
    e.role_id = role.id 
INNER JOIN 
    department 
ON 
    role.department_id = department.id 
ORDER BY 
    department ASC