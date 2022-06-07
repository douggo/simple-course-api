const express = require('express'),
      app = express();

app.use(express.json());

let courses = [
  {id: 1, name: 'Math'     , day: 'Monday'   },
  {id: 2, name: 'Biology'  , day: 'Tuesday'  },
  {id: 3, name: 'Physics'  , day: 'Wednesday'},
  {id: 4, name: 'Chemistry', day: 'Thursday' },
  {id: 5, name: 'English'  , day: 'Friday'   }
];

app.get("/courses", (request, response) => {
  return response.json(courses);
});

app.post("/courses", (request, response) => {
  const { name, day} = request.body;
  courses.push({
    id: courses.length + 1,
    name,
    day
  });
  return response.json(courses);
});

app.put("/courses/:id", (request, response) => {
  const { id } = request.params;
  const { name, day } = request.body;
  const course  = courses[courses.findIndex(course => course.id === parseInt(id))];
  Object.assign(course, { name, day });
  return response.json(courses);
});

app.patch("/courses/:id/new-name/:name", (request, response) => {
  const { id, name } = request.params;
  const course  = courses[courses.findIndex(course => course.id === parseInt(id))];
  Object.assign(course, { name });
  return response.json(courses);
});

app.delete("/courses/:id", (request, response) => {
  if(!courses.length) {
    return response.json('No classes were found, try to insert some!');
  }
  const { id } = request.params;
  const courseIndex = courses.findIndex(course => course.id === parseInt(id));
  courses.splice(courseIndex, 1);
  return response.json(courses);
});

app.listen(3333, () => {
  console.log('Server is running');
});