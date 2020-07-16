DROP DATABASE IF EXISTS company_DB;
CREATE database company_DB;

USE company_DB;

CREATE TABLE department (
  id INT PRIMARY KEY,
  name varchar(30)
);

CREATE TABLE role (
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
department_id INT

);

CREATE TABLE employees (
id INT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30)
role_id INT
manager_id INT
);

