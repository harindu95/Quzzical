# Quzzical

## Initialize Database

```
CREATE DATABASE IF NOT EXISTS quzzical;
CREATE USER 'quzzical'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON quzzical.\* TO 'quzzical'@'localhost';
```
