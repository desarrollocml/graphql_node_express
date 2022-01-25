import express from "express";
const app = express();

import { graphqlHTTP } from "express-graphql";

import bSchema from "graphql";//CommonJS module
const { buildSchema } = bSchema;

//Schema de GraphQl
const schema = buildSchema(`
    type Query {
        message: String
    }
`);

const root = {
  message: () => "Hola Mundo 2",
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
