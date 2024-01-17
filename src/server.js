const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./config/db');

dotenv.config({ path: './config.env' });

connectDB();

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
