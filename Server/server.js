import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
const salt =10;

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'bechafiyasmine',
    database: process.env.DB_NAME || 'signup'
}); 

app.post('/register', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";

    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error hashing password" });

        const values = [
            req.body.name,
            req.body.email,
            hash
        ];

        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error("SQL Error: ", err);  // Ajoute ceci pour voir l'erreur dans le terminal
                return res.json({ Error: err.sqlMessage });
            }
            return res.json({ Status: "Success" });
        });
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ?";
    db.query(sql, [req.body.email], (err, data) => {
        if(err) return res.json({Error: "Login error in server"});

        if(data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if(err) return res.json({Error: "Password compare error"});

                if(response) {
                    return res.json({Status: "Success"});
                } else {
                    return res.json({Error: "Password not matched"});
                }
            })
        } else {
            return res.json({Error: "No email existed"});
        }
    });
});


db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Sample Route
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


