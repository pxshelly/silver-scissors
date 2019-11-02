DROP DATABASE IF EXISTS silver_scissors; 

CREATE DATABASE silver_scissors;

\c silver_scissors; 

CREATE TABLE appointments (
  appt_id SERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL, 
  stylist TEXT NOT NULL,
  hair_service TEXT NOT NULL,
  appt_date DATE NOT NULL,
  appt_time TIME NOT NULL,
  telephone VARCHAR NOT NULL,
  textable TEXT NOT NULL,
  notes TEXT NOT NULL,
  pictures TEXT
);

CREATE TABLE requests (
  appt_id SERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL, 
  stylist TEXT NOT NULL,
  hair_service TEXT NOT NULL,
  appt_date DATE NOT NULL,
  appt_time TIME NOT NULL,
  telephone VARCHAR NOT NULL,
  textable TEXT NOT NULL,
  notes TEXT NOT NULL,
  pictures TEXT
);