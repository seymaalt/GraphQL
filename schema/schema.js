const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
} = require('graphql');

const personals = [
    { id: '1', name: 'John Doe', mail: 'john@example.com', age: 30, gender: 'Male' },
    { id: '2', name: 'Jane Smith', mail: 'jane@example.com', age: 25, gender: 'Female' },
    { id: '3', name: 'Bob Johnson', mail: 'bob@example.com', age: 35, gender: 'Male' },
];

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
                return personals.find(person => person.id === args.id);
            }
        },
        personals:{
            type: new GraphQLList(PersonalType),
            resolve(parent, args) {
                return personals;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
