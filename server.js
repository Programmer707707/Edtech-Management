const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes');
const bodyParser = require('body-parser');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));



const swaggerDocs = require('./swagger'); 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/api/auth', authRoutes); 
app.use('/api/courses', courseRoutes); 
app.use('/api/students', studentRoutes); 
app.use('/api/reviews', reviewRoutes);
app.use('/api/quizzes', quizRoutes);


app.get('/', (req, res) => {
  res.send('Edtech API Management - Backend');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
