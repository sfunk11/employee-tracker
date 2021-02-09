SELECT 
    role.id, role.title as Title, role.salary as Salary, 
    department.name AS Department
FROM 
    role 
INNER JOIN 
    department on department.id = role.department_id
ORDER BY id ASC;    
 