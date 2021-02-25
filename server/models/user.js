//MooseDB
const mongoose = require('mongoose');
const DATABASE_URI = process.env.DATABASE_URI;
mongoose.connect(DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.once('open', () => {
    console.log(DATABASE_URI);
    console.log('Database open success.');
})

db.on('error', (err) => {
    console.log(err);
})

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    animal: String,
    profileimage: String
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	// bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    // 	callback(null, isMatch);
	// });
    if(candidatePassword === hash){
        callback(null, true);
    } else {
        callback(null, false);
    }
}

module.exports.createUser = async function(newUser, callback){
	// bcrypt.genSalt(10, function(err, salt) {
    // 	bcrypt.hash(newUser.password, salt, function(err, hash) {
   	// 		newUser.password = hash;
   	// 		newUser.save(callback);
    // 	});
	// });
    let user = await User.findOne({username: newUser.username });
    if(user){
        callback('username has been used.', null);
    } else {
        user = await User.findOne({email: newUser.email});
        if(user){
            callback('email has been used.', null);
        } else {
            newUser.save(callback); 
        }        
    }    
}