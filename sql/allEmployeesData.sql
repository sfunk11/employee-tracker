SELECT 
    employee.first_name AS FirstName, employee.last_name AS LastName, 
    role.title AS Title, role.salary as Salary, department.name AS Department,
    CONCAT(e.first_name, ' ' ,e.last_name) AS Manager 
FROM
    employee 
INNER JOIN 
    role on role.id = employee.role_id 
 INNER JOIN 
    department on department.id = role.department_id 
 left join 
    employee e on employee.manager_id = e.id;