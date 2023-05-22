const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res)=>{
    res.sendFile(`${__dirname}/dist/index.html`)
})

app.listen(PORT, function () {
    console.log(`Server is starting on port ${PORT}!`);
});
