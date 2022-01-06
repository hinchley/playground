import express from 'express';
import session from 'express-session';
import override from 'method-override';

import home  from './routes/home.js';
import notes from './routes/notes.js';
import tags  from './routes/tags.js';
import admin from './routes/admin.js';

import { isNotAuth } from './services/auth.js';

const app = express();

app.set('view engine', 'ejs');

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(session({
  secret: process.env.SESSION_PASSWORD || 'password',
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

app.use('/', home);
app.use('/notes', notes);
app.use('/tags', tags);
app.use('/admin', isNotAuth, admin);

app.listen(3000, () => console.log('Listening...'));