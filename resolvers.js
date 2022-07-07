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
        },

        updatePost : async (parent , args  , context , info) => {
            const {id }=  args;
            const {title , description} = args.post;
            const post = await Post.findByIdAndUpdate(
                id,
                {title, description}, 
                {new : true});
            return post;
        },

        deletePost: async(parent , args  , context , info) => {
            const {id} = args;
            await Post.findByIdAndDelete(id);
            return "Deleted"; 
        }
    }
}

module.exports = resolvers;