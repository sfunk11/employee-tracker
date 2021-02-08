SELECT 
    e.id, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, 
    department.name AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager 
FROM 
    employee e 
LEFT JOIN 
    employee m 
ON 
    e.manager_id = m.id 
INNER JOIN 
    role 
ON e.role_id = role.id 
INNER JOIN 
    department 
ON 
    role.department_id = department.id 
WHERE role.title = ?
ORDER BY e.id ASC