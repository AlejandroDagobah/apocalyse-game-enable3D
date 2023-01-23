const express = require('express');
const path = require('path')

const app = express();

app.use(express.static('public'));


app.get('/', (_, res) => {
    // res.redirect('/admin');
   
    console.log(__dirname)
   // res.sendFile(path.resolve(__dirname, 'index.html'))
   //res.send(html)
   res.sendFile(path.join(__dirname, 'public', 'medieval-fantasy-book-standalone.html'));
   
});

app.listen(7777);