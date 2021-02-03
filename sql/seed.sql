use company_db;

insert into department (id,name)
values ("SALES","sales"),("ACCT","accounting"),("DES","design"),("QA","quality assurance"),("DEV","development"), ("PM","project management"), ("TO","tech ops"), ("CS","customer success");

insert into role (title,salary,department_id)
values ("Sales Manager", 150000, "SALES"),
    ("Business Development Representative", 75500, "SALES"),
    ("Solutions Consultant", 125000, "SALES"),
    ("Accountant", 125000,"ACCT"),
    ("Accounting Analyst", 80000, "ACCT"),
    ("Design Manager", 140000, "DES"),
    ("UI/UX Designer", 110000, "DES"),
    ("Manager of Quality Assurance", 145000, "QA"),
    ("Quality Assurance Engineer", 90000, "QA"),
    ("Application Development Manager", 145000, "DEV"),
    ("Platform Development Manager", 145000, "DEV"),
    ("Application Developer", 120000, "DEV"),
    ("Platform Developer", 120000, "DEV"),
    ("Project Director", 145000, "PM"),
    ("Senior Project Manager", 120000, "PM"),
    ("Project Manager", 80000, "PM"),
    ("Tech Ops Manager", 130000, "TO"),
    ("System Admin", 110000, "TO"),
    ("Tech Support Specialist - Tier 1", 50000, "TO"),
    ("Tech Support Specialist - Tier 2", 75000, "TO"),
    ("Account Management Director", 140000, "CS"),
    ("Customer Success Manager", 90000, "CS"),
    ("Reporting Analyst", 65000, "CS"),
    ("Program Manager", 125000, "CS");

    insert into employee (first_name, last_name, role_id)
    values ("Dave", "Parkinson", 1), ("Noah", "Smith", 2), ("Tom", "Woods",3) ,("Karen", "Jones", 4), ("Amy", "Van Dalen", 5),
		("Jane", "Thalen",6), ("Carrie", "Claiborn", 7), ("Matt", "Bond", 7), ("James", "Wood", 10), ("Eric", "Venet", 12), 
        ("Brendan", "Thomas", 12), ("Patrick", "Bailey", 14), ("Cruiser", "Jolly", 15), ("Robert", "Pisa", 16);
    
    
        


