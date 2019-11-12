DROP DATABASE IF EXISTS silver_scissors; 

CREATE DATABASE silver_scissors;

\c silver_scissors; 

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR NOT NULL,
  user_type VARCHAR NOT NULL,
  fb_id VARCHAR NULL,
  fb_access_token VARCHAR NULL,
  email VARCHAR NULL,
  telephone BIGINT NULL
);

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) NULL,
  customer_name VARCHAR NOT NULL, 
  stylist VARCHAR NOT NULL,
  hair_service VARCHAR NOT NULL,
  appt_date DATE NOT NULL,
  appt_time TIME NOT NULL,
  telephone BIGINT NOT NULL,
  textable VARCHAR NOT NULL,
  notes VARCHAR NULL,
  pictures VARCHAR NULL,
  price SMALLINT NULL,
  duration VARCHAR NULL,
  appt_status VARCHAR NULL,
  approved_by VARCHAR NULL
);