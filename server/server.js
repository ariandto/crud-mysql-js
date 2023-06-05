import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json())
const port = 8081;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"klsroute"
})


app.get('/', (req,res) => {
    const sql = "SELECT * FROM route";
    db.query(sql, (err, result)=>{
        if(err) return res.json({Message:"Error inside server"});
        return  res.json(result)
    })
})

app.post('/student',(req, res) => {
    const sql = "INSERT INTO route (`id`,`shiptoname`,`address`,`remarks`,`area`) VALUES (?)";
    const vlaues = [
        req.body.id,
        req.body.shiptoname,
        req.body.address,
        req.body.remarks,
        req.body.area
    ]

    db.query(sql, [vlaues], (err,result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})


app.listen(port, () =>{
    console.log("Listening "+port +" is success")}
)
