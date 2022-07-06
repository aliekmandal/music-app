const {gql} = require('apollo-server-express');
const Post = require("./Post")

const resolvers = {
    Query: {
        hello:()=>{
            return "Hello futoid";
        },

        getAll: async () => {
            return await Post.find()
        }
    },

    Mutation : {
        createPost : async (parent , args  , context , info) => {
            const {title , description} = args.post;
            const post = await Post({title, description}).save();
            return post;
        }
    }
}

module.exports = resolvers;