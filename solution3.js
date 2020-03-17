const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose
  .connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Could not connect to MongoDB...', err));

const CourseSchema = new Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  price: Number,
  isPublished: Boolean
});

// Course Model
const Course = mongoose.model('Course', CourseSchema);

async function getCourses() {
  const courses = await Course
    // Get all the published courses that are $15 or more,
    // or have the word 'by' in their title
    .find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }]);

  // and display them
  console.log(courses);
}

getCourses();
