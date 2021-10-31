var fs = require('fs');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const express = require ('express');
const app = express();
const cors = require('cors');

//const nanoid = nanolib.nanoid;

app.use(cors())

function getOrders() {
    let rawdata = fs.readFileSync('orders.json')
    return JSON.parse(rawdata);
}

app.post('/', jsonParser, async(req, res) => {
    const formData = req.body;
    const oldOrders = getOrders();
    oldOrders.push(formData);
    fs.writeFileSync('./orders.json', JSON.stringify(oldOrders))
    return res.status(200).json({ message: 'success' });
})

function getQuestions() {
    let rawdata = fs.readFileSync('questions.json')
    return JSON.parse(rawdata);
}

app.get("/", (req, res) => {
    setTimeout(()=> {res.json(getQuestions())}, 2000)
    
})





app.listen(5000, () => {
    console.log(`Example app listening at http://localhost:5000}`)
})

