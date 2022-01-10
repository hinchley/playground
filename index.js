import express from 'express';
import session from 'express-session';
import override from 'method-override';

import config from './config.js';
import routes from './routes.js';

const app = express();

app.set('view engine', 'ejs');

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(session({
  secret: config.session.password,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    sameSite: true
  }
}));

app.use(override('_method'));
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals = {
    host: req.headers.host,
    isAuth: req.session.isAuth
  };

  next();
});

app.use(routes);

app.use((err, req, res, next) => {
  if (! err) { return next(); }
  if (! err.message) { err.message = 'Not Happy'; }
  if (! err.statusCode) { err.statusCode = 500; }

  res.status(err.statusCode).send(`${err.statusCode}: ${err.message}`);
});

app.use((req, res) => {
  res.status(404).send('404: Not Found');
});

app.listen(3000, () => console.log('Listening...'));