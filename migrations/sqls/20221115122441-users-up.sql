CREATE TABLE users ( 
id  serial primary key NOT NULL,
firstName varchar (50)  NOT NULL,
lastName varchar (50)  NOT NULL,
password_digest VARCHAR(256) NOT NULL
);
