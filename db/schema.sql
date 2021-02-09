DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

create table department (
    id varchar(10) unique not null,
    name varchar(30) not null,
    primary key (id)
);

create table role (
    id int auto_increment not null,
    title varchar(50) not null,
    salary decimal (10,2) not null,
    department_id varchar(10) not null,
    primary key (id)
);

create table employee (
    id int AUTO_INCREMENT not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int null,
    primary key (id)
);