import express from 'express';
import override from 'method-override';

import home  from './routes/home.js';
import notes from './routes/notes.js';
import admin from './routes/admin.js';

const app = express();

app.set('view engine', 'ejs');

app.use(override('_method'));
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.use('/', home);
app.use('/notes', notes);
app.use('/admin', admin);

app.listen(3000, () => console.log('Listening...'));