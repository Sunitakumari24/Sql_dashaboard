require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("MySQL connected successfully!");
  }
});



app.get("/api/data", (req, res) => {
  const query = "SELECT * FROM mdl_assign_grades";

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});



app.get("/students", (req, res) => {
  const query = `
    SELECT COUNT(DISTINCT userid) as total_students
    FROM mdl_assign_grades
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});



app.get("/summary", (req, res) => {
  const query = `
    SELECT 
      COUNT(DISTINCT userid) as total_students,
      MAX(grade) as highest_mark,
      AVG(CASE WHEN grade >= 0 THEN grade END) as average_marks
    FROM mdl_assign_grades
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});



app.get("/pass-fail", (req, res) => {
  const query = `
    SELECT 
      COUNT(*) as total_students,
      SUM(CASE WHEN student_avg >= 40 THEN 1 ELSE 0 END) as pass_count,
      SUM(CASE WHEN student_avg < 40 OR student_avg IS NULL THEN 1 ELSE 0 END) as fail_count
    FROM (
        SELECT 
            userid,
            AVG(CASE WHEN grade >= 0 THEN grade END) as student_avg
        FROM mdl_assign_grades
        GROUP BY userid
    ) as subquery
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});