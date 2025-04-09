require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const mongoString = process.env.DATABASE_URL;
const { User } = require('./models');

mongoose.set("strictQuery", false);
mongoose.connect(mongoString);

const PORT = process.env.PORT || 3000;

const database = mongoose.connection;

database.on('error', (error) => {
    console.log("MongoDB connection error:", error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();

// ✅ CORS fix: allow frontend to access backend APIs
app.use(cors({
    origin: 'http://localhost:3000', // Frontend origin
    credentials: true, // Allow cookies/authorization headers
}));

// ✅ Handle preflight OPTIONS requests
app.options('*', cors());

app.use(express.json());

const { userroute, authroute, paymentroute, serviceroute, adminroute, cartroute } = require('./routes');

app.use('/api/v1', authroute);
app.use('/api', userroute);
app.use('/api', serviceroute);
app.use('/api', adminroute);
app.use('/api', cartroute);
app.use('/api/payment', paymentroute);


// ✅ Simple test route
app.get('/', (req, res) => {
    res.send("Server started Successfully");
});

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});
