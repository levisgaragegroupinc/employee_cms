DROP DATABASE IF EXISTS nameofdb_db: CREATE DATABASE nameofdb_db;

USE nameofdb_db;

CREATE TABLE nameoftable1 (
	id: INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE nameoftable2 (
	id: INT NOT NULL AUTO_INCREMENT,
	title: VARCHAR(30) NOT NULL,
	salary: DECIMAL NOT NULL,
	department_id: INT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE nameoftable3 (
	id: INT NOT NULL AUTO_INCREMENT,
	first_name: VARCHAR(30) NOT NULL,
	last_name: VARCHAR(30) NOT NULL,
	role_id: INT NOT NULL,
	manager_id: INT NOT NULL,
	PRIMARY KEY (id)
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