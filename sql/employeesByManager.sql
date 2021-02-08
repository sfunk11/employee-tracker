SELECT 
e.id, e.first_name, e.last_name, role.title, 
department.name AS department, role.salary, 
concat(m.first_name, ' ' ,  m.last_name) AS manager
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
WHERE 
    e.manager_id = ?;