const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
} = require('graphql');


const PersonalType = new GraphQLObjectType({
    name: 'Personal',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        mail: { type: GraphQLString },
        age: { type: GraphQLInt },
        gender: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields:{
        personal:{
            type: PersonalType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
              //  return personals.find(person => person.id === args.id);
              return axios.get('http://localhost:3000/Personals/'+args.id).
              then(res=>res.data);
            }
        },
        personals:{
            type: new GraphQLList(PersonalType),
            resolve(parent, args) {
              //  return personals;
              return axios.get('http://localhost:3000/Personals').
              then(res=>res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
