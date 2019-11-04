const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const { getAppts, getApptDetails, makeAppt, editAppt, removeAppt } = require('./controllers');

app.use(express.static(path.join(__dirname, '../dist/')));
app.use(bodyParser.json());

app.get('/schedule/:date', getAppts);
app.post('/appointment', makeAppt);
app.get('/appointment/:id', getApptDetails);
app.put('/appointment/update/:id', editAppt);
app.delete('/appointment/delete/:id', removeAppt);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => console.log(`Server listening on ${port}`));