const { request } = require('express');
const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
// create connection 

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'calculator'

});

// connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('mysql Connected...')
});

const app = express();

app.use(cors({
    origin: '*'
}))
app.use(express.json())
// create DB

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE calculator';
    db.query(sql, (err, result) => {
        if(err)throw err;
        console.log(result);
        res.send('Database created...');
    });
});

// create table
app.get('/get-data', (req, res) => {
    let sql = 'SELECT * FROM putvalue';
    db.query(sql, (err, result) =>{
        if(err)throw new Error('Failed');
        res.json({data: result});
    });
});

// insert data into table
app.post('/insertValue', (req, res) => {
    let PutValue = {result:req.body.calc || parseInt(Math.random() * 20)};
    let sql = 'INSERT INTO PutValue SET ?';
    let query = db.query(sql, PutValue, (err, result) => {
        if(err)throw err;
        console.log(result);
        res.send('PutValue added Successfully...');
    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    let sql = 'DELETE FROM PutValue WHERE id IN (?)';
    let query = db.query(sql, id, (err, result) => {
        if(err)throw err;
        console.log(result);
        res.send('deleted successfully...');
    })
})


app.listen('4000',()=>{
    console.log('server started on port 3000');
});


