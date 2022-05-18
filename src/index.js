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
  const newCourse = {
    id: courses.length + 1,
    name: request.body["name"],
    day: request.body["day"]
  };
  courses.push(newCourse);
  return response.json(courses);
});

app.put("/courses/:id", (request, response) => {
  let course  = courses[courses.findIndex(course => course.id == request.params["id"])];
  course.name = request.body["name"];
  course.day  = request.body["day"];
  return response.json(courses);
});

app.patch("/courses/:id/new-name/:name", (request, response) => {
  let course  = courses[courses.findIndex(course => course.id == request.params["id"])];
  course.name = request.params["name"];
  return response.json(courses);
});

app.delete("/courses/:id", (request, response) => {
  if(!courses.length) {
    return response.json('No classes were found, try to insert some!');
  }
  const auxCourses = Object.entries(courses).filter(([key, value]) => {
    return value["id"] != request.params["id"];
  });
  courses = [];
  Object.entries(auxCourses).map(([key, value]) => {
    courses.push({id: value[1]["id"], name: value[1]["name"]});
  });
  return response.json(courses);
});

app.listen(3333);