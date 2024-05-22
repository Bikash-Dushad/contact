const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');

// Initialize the app
const app = express();
const PORT = 4000;

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', './views');
// Use Routes
app.use('/', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
