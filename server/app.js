const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to localhost mongodb database

// mongoose.connect('mongodb://localhost/bus-gql')
// mongoose.connection.once('open', () => {
//     console.log('Database connected');
// });


// connect to atlas mongodb database
mongoose.connect('mongodb://Admin:nkDDHHRe1yvulaSw@bus-shard-00-00-swsqn.mongodb.net:27017,bus-shard-00-01-swsqn.mongodb.net:27017,bus-shard-00-02-swsqn.mongodb.net:27017/bus-gql?ssl=true&replicaSet=Bus-shard-0&authSource=admin&retryWrites=true')

mongoose.connection.once('open', () => {
    console.log('Database connected');
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
