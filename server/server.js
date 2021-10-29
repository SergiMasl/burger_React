var fs = require('fs');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

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





server.listen(5000, '127.0.0.1')

//npm install express