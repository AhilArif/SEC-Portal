const express = require('express');
const port = 3000;

const app = express();
const bodyParser = require('body-parser');
// 
require('./db');
require('./models/User');
require('./models/Form');
require('./models/Notification');
//
const authRoutes = require('./routes/AuthRoutes');
const requireToken = require('./Middlewares/AuthTokenRequired');
//
app.use(bodyParser.json());
app.use(authRoutes);
//

app.get('/', requireToken, (req, res) => {
    console.log(req.user);
    res.send(req.user);
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})