const express = require('express');
const app = express();
const cors = require('cors');
const {authMiddleware} = require('./middlewares/authentication-middleware');
const indexRouter = require('./routes/auth/indexRouter');
const storyRouter = require('./routes/story/storyRouter');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const bodyParser = require('body-parser'); // Fixed typo

const PORT = process.env.PORT || 3000;

const db = require('./config/mongoose-connection');

// Ensure this handles connection errors
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/auth' ,indexRouter);
app.use('/api/story',storyRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
