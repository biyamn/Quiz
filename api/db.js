import mariadb from 'mysql';

export const db = mariadb.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'Quiz',
});
