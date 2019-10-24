const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const { makeAppointment } = require('./controllers');

app.use(express.static(path.join(__dirname, '../dist/')));
app.use(bodyParser.json());

app.post('/schedule/appointments', makeAppointment);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => console.log(`Server listening on ${port}`));