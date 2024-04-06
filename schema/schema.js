const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
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
    fields: {
        personal: {
            type: PersonalType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(_, args) {
                return axios.get('http://localhost:3000/Personals/' + args.id)
                    .then(res => res.data);
            }
        },
        personals: {
            type: new GraphQLList(PersonalType),
            resolve() {
                return axios.get('http://localhost:3000/Personals')
                    .then(res => res.data);
            }
        }
    }
});


const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPersonal: {
            type: PersonalType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                mail: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLInt },
                gender: { type: GraphQLString },
            },
            resolve(_, args) {
                return axios.post('http://localhost:3000/Personals', {
                    name: args.name,
                    mail: args.mail,
                    age: args.age,
                })
                    .then(res => res.data);
            }
        },
        updatePersonal: {
            type: PersonalType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                mail: { type: GraphQLString },
                age: { type: GraphQLInt },
                gender: { type: GraphQLString },
            },
            resolve(_, args) {
                return axios.patch('http://localhost:3000/Personals/' + args.id, args)
                    .then(res => res.data);
            }
        },
        deletePersonal: {
            type: PersonalType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(_, args) {
                return axios.delete('http://localhost:3000/Personals/' + args.id)
                    .then(res => res.data);
            },
        },
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation  
});
