const NodeCache = require('node-cache');
const { v4: uuidv4 } = require('uuid');

// Create an instance of NodeCache
const cache = new NodeCache();

let userController = {};

// Create a new user
userController.createUser = async (req, res) => {
    try {
        const { username, age, hobbies } = req.body;
        if (!username || !age || !hobbies) {
            return res.status(400).json({ error: 'Username, age and hobbies are required' });
        }
        const userId = uuidv4();
        const newUser = { id: userId, username, age, hobbies: hobbies || [] };

        // Get current users from cache
        const users = await cache.get('users') || {};
        users[userId] = newUser;

        // Set updated users back to cache
        await cache.set('users', users);

        res.status(201).json(newUser);
    } catch (err) {
        res.json({
            state: -1,
            message: err.message || "error"
        })
    }
};

// Get all users
userController.getAllUsers = async (req, res) => {
    try {
        const users = await cache.get('users');
        if (!users) {
            return res.status(404).json({ error: 'No users found' });
        }
        res.json(Object.values(users));
    } catch (err) {
        res.json({
            state: -1,
            message: err.message || "error"
        })
    }
}

// Get user by userId
userController.getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const users = await cache.get('users');
        if (!users || !users[userId]) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(users[userId]);
    } catch (err) {
        res.json({
            state: -1,
            message: err.message || "error"
        })
    }
};

// Update an existing user
userController.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, age, hobbies } = req.body;
        if (!username || !age || !hobbies) {
            return res.status(400).json({ error: 'Username, age and hobbies are required' });
        }
        const users = await cache.get('users');
        if (!users || !users[userId]) {
            return res.status(404).json({ error: 'User not found' });
        }
        const updatedUser = { id: userId, username, age, hobbies: hobbies || [] };
        users[userId] = updatedUser;
        await cache.set('users', users);
        res.json(updatedUser);
    } catch (err) {
        res.json({
            state: -1,
            message: err.message || "error"
        })
    }
};

// Delete an existing user
userController.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const users = await cache.get('users');
        if (!users || !users[userId]) {
            return res.status(404).json({ error: 'User not found' });
        }
        delete users[userId];
        await cache.set('users', users);
        res.status(204).send();
    } catch (err) {
        res.json({
            state: -1,
            message: err.message || "error"
        })
    }
};

module.exports = userController;