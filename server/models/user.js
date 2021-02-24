//MooseDB
const mongoose = require('mongoose');
const DATABASE_URI = process.env.DATABASE_URI;
mongoose.connect(DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.once('open', () => {
    console.log('Database open success.');
})

db.on('error', (err) => {
    console.log(err);
})

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    animal: String
})

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

module.exports.createUser = function(newUser, callback){
	// bcrypt.genSalt(10, function(err, salt) {
    // 	bcrypt.hash(newUser.password, salt, function(err, hash) {
   	// 		newUser.password = hash;
   	// 		newUser.save(callback);
    // 	});
	// });
    newUser.save(callback);
}