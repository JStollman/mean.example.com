//Sitewide configuration
var config = {};

//Session configuration object
config.session = {};

//Cookie configuration object
config.cookie = {};

//Establish a connection to the local database
config.mongodb = 'mongodb://localhost/mean-cms';

//Create a renadom string to sign the session data
//Bigger is better, more entropy is better
//The is OK for dev, change for production
config.session.secret = 'BaBaBooey';

//Define the domain for which this cookie is to be set
config.cookie.domain = 'localhost:3000';

module.exports = config;