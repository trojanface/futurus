create table Users (
user_id INT NOT NULL auto_increment, 
user_firstName varchar(200) Not null,
user_lastName varchar(200),
user_admin_level INT NOT NULL,
user_date_created datetime,
primary key (user_id));

create table Departments (
dept_id Int not null auto_increment,
dept_name varchar(200) not null,
dept_date_created datetime,
primary key (dept_id)
);

create table Products (
prod_id int not null auto_increment,
prod_name varchar(200) not null,
prod_cost int not null,
prod_price int not null,
prod_department int not null,
primary key (prod_id),
foreign key (prod_department) references Departments(dept_id)
);

create table Inventory (
inv_id int not null auto_increment,
inv_product_type int not null,
inv_transaction_num int,
primary key (inv_id),
foreign key (inv_product_type) references Products(prod_id)
);

create table Transactions (
trans_id int not null auto_increment,
trans_date datetime not null,
trans_user int,
primary key(trans_id),
foreign key (trans_user) references Users(user_id)
);