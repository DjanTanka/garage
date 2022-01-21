require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");
const thisUser = require("./middleware/is-auth");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(isAuth);
app.use(thisUser);
app.use(cors());
app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);
const PORT = process.env.PORT || 8000
    mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.${process.env.DB_CODE}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
      )
      .then(() => {
        console.log(`mongo connect..`);
      })
      .catch((err) => {
        console.log('err at app server', err);
      });

    app.listen(PORT, (err)=>{
      if(err){
        console.log('---err', err)
      }
      console.log(`Server has been started on port ${PORT}...`);});
    