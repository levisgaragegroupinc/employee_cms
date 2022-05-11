USE employees_db;

INSERT INTO
	department (name)
VALUES
	("Accounting"),("Benchtop Assembly & Test"),("Business Intelligence"),("Common Platform"),("Contractor"),("DFM Engineering"),("Encapsulation"),("Emerging Markets"),("Environmental Instruments"),("Laboratory"),("Marketing"),("Research"),("Sales"),("Software"),("Support"),("Telemetry"),("Executive"),("Facilities"),("Failure Analysis"),("Professional Services"),("Information Technology"),("Inventory"),("Kitchen"),("Logistics"),("Machine Shop"),("Operations"),("People Operations"),("Purchasing"),("Repairs");

SELECT * FROM department;

INSERT INTO
	role (title, salary, department_id)
VALUES
	("Business Process Analyst" 70000, 10),("Payroll Specialist", 70000, 10),("Project Manager", 720000, 12),("Continuous Improvement Manager", 80000, 12),("Data Scientist", 90000, 13),("UI/UX Lead", 100000, 13),("Sales Coordinator", 50000, 17),("Director Emerging Markets", 80000, 17),("Director of Instruments", 93000, 18),("Firmware Intern", 60000, 18);

SELECT * FROM role;

INSERT INTO
	employee (fisrt_name, last_name, role_id, manager_id)
VALUES
	("Jessica", "Day", 100, 1008),("Staci", "Basheer", 101, 1008),("Dillsi", "Flinn", 102, 1008),("Tamsin", "Kinley", 103, 1008),("Jamie", "Jolley", 104, 1008),("Erin", "Ryen", 105, 1008),("Melissa", "McNanny", 106, 1008),("Ping", "Deleon", 107, 1001),("Anthony", "Larsen", 108, 1008),("Ollie", "Sabin", 109, 1008);

SELECT
	employee.first_name,
	employee.last_name,
	role.title,
	department.name,
	role.solary,
	employee.manager_id
FROM
	employee
	LEFT JOIN role ON employee.role_id = role.id
	LEFT JOIN department ON department.id = role.department_id;