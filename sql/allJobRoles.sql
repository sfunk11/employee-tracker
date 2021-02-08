SELECT 
    role.id, role.title, role.salary, department.name AS Department
FROM 
    role 
INNER JOIN 
    department on department.id = role.department_id
ORDER BY id ASC;    
 