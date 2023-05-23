import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors());
const port = 8081;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"nodejs"
})

app.get('/', (req,res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, result)=>{
        if(err) return res.json({Message:"Error inside server"});
        return  res.json(result)
    })
})

app.listen(port, () =>{
    console.log("Listening "+port +" is success")}
)
