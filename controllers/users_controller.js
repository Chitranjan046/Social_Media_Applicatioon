const User = require('../models/user');
const bcrypt = require('bcrypt');

// Render the user profile page
module.exports.profile = async (req, res) => {
    const userId = req.cookies.user_id;
    if (!userId) {
        return res.redirect('/users/sign-in');
    }

    try {
        // First, try to get the user data from the cache
        const user = await getUserFromCache(userId);

        if (!user) {
            // If user data is not in cache, fetch it from the database
            const user = await User.findById(userId).exec();

            if (!user) {
                return res.redirect('/users/sign-in');
            }

            // Cache the user data for future use
            cacheUser(userId, user);
        }

        return res.render('user_profile', {
            title: "User Profile",
            user: user
        });
    } catch (error) {
        console.log('Error in fetching user data:', error);
        return res.redirect('/users/sign-in');
    }
};

// Render the sign-up page
module.exports.signUp = (req, res) => {
    return res.render('user_sign_up', {
        title: "Cpx | Sign Up"
    });
};

// Render the sign-in page
module.exports.signIn = (req, res) => {
    return res.render('user_sign_in', {
        title: "Cpx | Sign In"
    });
};

// Get the sign-up data
module.exports.create = async (req, res) => {
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: req.body.email }).exec();

        if (existingUser) {
            return res.redirect('back');
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create the user
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        return res.redirect('/users/sign-in');
    } catch (error) {
        console.log('Error in creating user:', error);
        return res.redirect('back');
    }
};

// Sign in and create a session for the user
module.exports.createSession = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).exec();

        if (!user) {
            return res.redirect('back');
        }

        // Compare the hashed password
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return res.redirect('back');
        }

        res.cookie('user_id', user.id);
        return res.redirect('/users/profile');
    } catch (error) {
        console.log('Error in signing in:', error);
        return res.redirect('back');
    }
};

// Function to get user data from cache
async function getUserFromCache(userId) {
    // Implementation of cache retrieval (e.g., using Redis)
    // ...
    return null; // Return null if not found in cache
}

// Function to cache user data
async function cacheUser(userId, user) {
    // Implementation of cache storage (e.g., using Redis)
    // ...
}
