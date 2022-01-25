import express from "express";
const app = express();

//data

import { createRequire } from "module";
const require = createRequire(import.meta.url); //para poder usar require

const { courses } = require("./data.json");
//console.log(courses);

//middleware para express
import { graphqlHTTP } from "express-graphql";

import bSchema from "graphql"; //CommonJS module
const { buildSchema } = bSchema;

//Schema de GraphQl
//courses(topic:String):[Course]
const schema = buildSchema(`
    type Query {
        course(id:Int!):Course
        courses(topic: String!):[Course]
        
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

let getCourse = (args) => {
  let id = args.id;
  return courses.filter((course) => (course.id = id))[0];
};
/* 
query getSingleCourse($courseID:Int!){
  course(id:$courseID){
    title
    author
    description
    topic
    url
  }
}
//----query variables
{
  "courseID": 1
}
*/

let getCourses = (args) => {
  if (args.topic) {
    let topic = args.topic;
    return courses.filter((course) => course.topic === topic);
  } else {
    return courses;
  }
};
/* 
query getCourses(
  $courseTopic:String!)
  {
  courses(topic:$courseTopic){
    id
    title
    topic
    url
  }
}
//----
{
  "courseTopic": "Javascript"
}
 */


const root = {
  course: getCourse,
  courses: getCourses,
};
//endpoint de graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(3000, () => console.log(`server on port 3000`));
