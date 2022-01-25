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
  return courses.filter(course => course.id = id )[0];
};

const root = {
  course: getCourse,
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
