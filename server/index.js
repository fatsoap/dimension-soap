const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/api', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    //res.sendFile('client/public/index.html');
});

app.listen(PORT, ()=> console.log(`Sever listening on port ${PORT}`) );