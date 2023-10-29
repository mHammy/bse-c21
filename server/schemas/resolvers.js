const User = require('../models/User');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            return User.findById(context.user.id);
        }
    }
};

module.exports = resolvers;
