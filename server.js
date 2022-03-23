//dependencies
const express = require('express');

const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//internal imports
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

const app = express();

const sessionConfig = {
   secret: process.env.SESSION_SECRET_KEY,
   cookie: {
      expires: 10 * 60 * 1000,
   },
   resave: true,
   rolling: true,
   saveUninitialized: true,
   store: new SequelizeStore({
      db: sequelize,
   }),
};

app.use(session(sessionConfig));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

const PORT = process.env.PORT || 3001;
sequelize.sync({ force: false }).then(() => {
   app.listen(PORT, () => console.log(`App is alive on PORT:${PORT}`));
});
