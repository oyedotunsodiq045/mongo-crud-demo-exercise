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
    // Get all the published frontend and backend courses,
    // .find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } })
    .find({ isPublished: true })
    .or([{ tags: 'frontend' }, { tags: 'backend' }])
    // sort them by their price in a descending order,
    // .sort('-price')
    .sort({ price: -1 })
    // pick only their name and author,
    // .select('name author');
    .select({ name: 1, author: 1 });

  // and display them
  console.log(courses);
}

getCourses();
