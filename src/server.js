const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const appController = require('./controllers/app-controller');
const { numberOfPagesValidation } = require('./middlewares/number-of-pages-validation');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

app.get('/:numberOfPages', numberOfPagesValidation, appController.getNews);
app.get('/', numberOfPagesValidation, appController.getNews);

module.exports = {
  app: app,
};
