'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const corsProxy = require('cors-anywhere');
const webpack = require('webpack');
const mongoose = require('mongoose');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');

const app = express();
const compiler = webpack(webpackConfig);
const port = 3000;
const corsPort = 3002;
const corsHost = 'localhost';

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/training');
const Employee = mongoose.model('Employee', {
    firstName: String,
    lastName: String,
    phone: String
});

app.use(
    webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true }
    })
);
app.use(webpackHotMiddleware(compiler));

app.get('/employees', (req, res) => {
    Employee.find()
        .select('-__v')
        .then(employees => res.json(employees));
});

app.delete('/employee/:id', (req, res) => {
    const id = req.params.id;
    Employee.deleteOne({ _id: id }).then(() => res.sendStatus(200));
});

app.post('/employee', (req, res) => {
    const { firstName, lastName, phone } = req.body;
    if (firstName && lastName) {
        const employee = new Employee({ firstName, lastName, phone });
        employee.save().then(res.json(employee));
    } else {
        res.status(500).send({ error: 'firstName, lastName required!' });
    }
});

app.put('/employee', (req, res) => {
    const { _id, firstName, lastName, phone } = req.body;
    Employee.findById(_id).then(employee => {
        if (employee) {
            employee.firstName = firstName
                ? firstName
                : employee.firstName;
            employee.lastName = lastName ? lastName : employee.lastName;
            employee.phone = phone ? phone : employee.phone;
            employee.save().then(res.json(employee));
        } else {
            res.status(500).send({ error: 'employee not found!' });
        }
    });
});

app.listen(port, function() {
    console.log(
        `==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`
    );
});

corsProxy
    .createServer({
        originWhitelist: [], // Allow all origins
        requireHeader: ['origin', 'x-requested-with'],
        removeHeaders: ['cookie', 'cookie2']
    })
    .listen(corsPort, corsHost, function() {
        console.log(
            'Running CORS Anywhere on ' + corsHost + ':' + corsPort
        );
    });
