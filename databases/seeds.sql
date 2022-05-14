USE employees_db;

INSERT INTO
    department (name)
VALUES
    ("Accounting"),("Benchtop Assembly & Test"),("Business Intelligence"),("Common Platform"),("Contractor"),("DFM Engineering"),("Encapsulation"),("Emerging Markets"),("Environmental Instruments"),("Laboratory"),("Marketing"),("Research"),("Sales"),("Software"),("Support"),("Telemetry"),("Executive"),("Facilities"),("Failure Analysis"),("Professional Services"),("Information Technology"),("Inventory"),("Kitchen"),("Logistics"),("Machine Shop"),("Operations"),("People Operations"),("Purchasing"),("Repairs");

INSERT INTO
    role (title, salary, department_id)
VALUES
    ("Business Process Analyst", 70000, 1),("Payroll Specialist", 70000, 1),("Project Manager", 720000, 3),("Continuous Improvement Manager", 80000, 3),("Data Scientist", 90000, 4),("UI/UX Lead", 100000, 4),("Sales Coordinator", 50000, 8),("Director Emerging Markets", 80000, 8),("Director of Instruments", 93000, 9),("Firmware Intern", 60000, 9);

INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Jessica", "Day", 1, null),("Staci", "Basheer", 2, null),("Dillsi", "Flinn", 3, null),("Tamsin", "Kinley", 4, null),("Jamie", "Jolley", 5, null),("Erin", "Ryen", 6, null),("Melissa", "McNanny", 7, null),("Ping", "Deleon", 8, null),("Anthony", "Larsen", 9, null),("Ollie", "Sabin", 10, null);
