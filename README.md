# Quzzical

## Initialize Database

Run the following command in MySql

```
CREATE DATABASE IF NOT EXISTS quzzical;
CREATE USER 'quzzical'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON quzzical.\* TO 'quzzical'@'localhost';
```

## Seed Database

MySQL command line

```
mysql> use quzzical;
mysql> source seed.sql;

```

- Or use MySql Workbench or something similar to run seed.sql

## Run Server

```
cd server
npm install
npm start
```

## Run client

```
cd client
npm install
npm start
```

- Open http://localhost:3000 to access the application
