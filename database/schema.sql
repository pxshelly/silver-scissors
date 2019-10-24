DROP DATABASE IF EXISTS silver_scissors; 

CREATE DATABASE silver_scissors;

\c silver_scissors; 

CREATE TABLE appointments (
  appointment_id SERIAL PRIMARY KEY,
  customer_name TEXT,
  employee_name TEXT,
  hair_service TEXT,
  appt_date DATE,
  appt_time TIME,
  phone_number VARCHAR,
  textable TEXT,
  notes TEXT,
  pictures TEXT
);

CREATE TABLE requests (
  requests_id SERIAL PRIMARY KEY,
  customer_name TEXT,
  employee_name TEXT,
  hair_service TEXT,
  appt_date DATE,
  appt_time TIME,
  phone_number VARCHAR,
  textable TEXT,
  notes TEXT,
  pictures TEXT
);