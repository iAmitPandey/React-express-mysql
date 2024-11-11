import mysql from "mysql";
import dbConfig from "../config/db.config.js";

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
    return;
  }
  console.log("Successfully connected to the database.");

  const createTutorialTable = `
    CREATE TABLE IF NOT EXISTS tutorials (
      id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(255),
      published BOOLEAN DEFAULT false
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `;

  connection.query(createTutorialTable, (err, result) => {
    if (err) {
      console.error("Error creating tutorials table:", err);
    } else {
      console.log("Tutorials table ensured to exist or created successfully.");
    }
  });
});

export default connection;
