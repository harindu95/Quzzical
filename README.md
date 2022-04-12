# Quzzical

## Running the Applications

- to run the application we need to run the client and server

### Running the Client

- to run the client first navigate to the client folder
- once in the folder run the command "npm install" to download the packages
- once the download is complete you can run "npm start" to start the client

### Running the Server

## Initialize Database

```
CREATE DATABASE IF NOT EXISTS quzzical;
CREATE USER 'quzzical'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON quzzical.\* TO 'quzzical'@'localhost';
```

- Open Mysql Workbench or something similar.

```
use quzzical;
and run seed.sql
```
