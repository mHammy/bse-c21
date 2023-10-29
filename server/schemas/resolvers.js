const User = require('../models/User');
const bcrypt = require('bcrypt'); 

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            return User.findById(context.user._id).populate('savedBooks');
        },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new Error('No user found with this email address');
            }

            const isValid = await user.isCorrectPassword(password);
            
            if (!isValid) {
                throw new Error('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },

        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            
            if (!user) {
                throw new Error('Error creating user');
            }
            
            const token = signToken(user);
            
            return { token, user };
        },

        saveBook: async (parent, { bookDetails }, context) => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }

            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: bookDetails } },
                { new: true, runValidators: true }
            ).populate('savedBooks');

            return updatedUser;
        },

        removeBook: async (parent, { bookId }, context) => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }

            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            ).populate('savedBooks');

            return updatedUser;
        }
    }
};

module.exports = resolvers;
