const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const graphQLSchema=require("./schema/schema");
const app = express();

app.use('/graphql', graphqlHTTP({
    schema: graphQLSchema, 
    graphiql: true
}));   



app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});