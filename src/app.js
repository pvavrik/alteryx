import express from 'express';
import bodyParser from 'body-parser';
import jwt from'jsonwebtoken';
import routes from './routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3030;
app.listen(port);

console.log('Listening at port: ' + port);

module.exports = app;
