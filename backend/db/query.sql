--CREATE A USER TABLE

CREATE TABLE `users`(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL
    
)


--CREATE A PRODUCT TABLE

CREATE TABLE `products`(
    Id int NOT NULL  AUTO_INCREMENT PRIMARY KEY UNIQUE,
    product_name varchar(255) NOT NULL,
    product_description varchar(255) NOT NULL,
    product_price  varchar(255) NOT NULL
)