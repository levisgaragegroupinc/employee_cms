DROP DATABASE IF EXISTS employees_db: CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id: INT NOT NULL AUTO_INCREMENT = 10,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id: INT NOT NULL AUTO_INCREMENT = 100,
    title: VARCHAR(30) NOT NULL,
    salary: DECIMAL NOT NULL,
    department_id: INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE employee (
    id: INT NOT NULL AUTO_INCREMENT = 1000,
    first_name: VARCHAR(30) NOT NULL,
    last_name: VARCHAR(30) NOT NULL,
    role_id: INT NOT NULL,
    manager_id: INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (manager_id) REFERENCES employee(id),
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- - department

-- 	- id: INT PRIMARY KEY

-- 	- name: VARCHAR(30) to hold department name

-- - role

-- 	- id: INT PRIMARY KEY

-- 	- title: VARCHAR(30) to hold role title

-- 	- salary: DECIMAL to hold role salary

-- 	- department_id: INT to hold reference to department role belongs to

-- - employee

-- 	- id: INT PRIMARY KEY

-- 	- first_name: VARCHAR(30) to hold employee first name

-- 	- last_name: VARCHAR(30) to hold employee last name

-- 	- role_id: INT to hold reference to employee role

-- 	- manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)