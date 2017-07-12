'use strict';

// Weather Example
// See https://wit.ai/sungkim/weather/stories and https://wit.ai/docs/quickstart
const Wit = require('node-wit').Wit;
const FB = require('./facebook.js');
const Config = require('./const.js');

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

// Bot actions
const actions = {
  say(sessionId, context, message, cb) {
    console.log(message);

    // Bot testing mode, run cb() and return
    if (require.main === module) {
      cb();
      return;
    }

    // Our bot has something to say!
    // Let's retrieve the Facebook user whose session belongs to from context
    // TODO: need to get Facebook user name
    const recipientId = context._fbid_;
    if (recipientId) {
      // Yay, we found our recipient!
      // Let's forward our bot response to her.
      FB.fbMessage(recipientId, message, (err, data) => {
        if (err) {
          console.log(
            'Oops! An error occurred while forwarding the response to',
            recipientId,
            ':',
            err
          );
        }

        // Let's give the wheel back to our bot
        cb();
      });
    } else {
      console.log('Oops! Couldn\'t find user in context:', context);
      // Giving the wheel back to our bot
      cb();
    }
  },
  merge(sessionId, context, entities, message, cb) {
    // Retrieve the location entity and store it into a context field
    const loc = firstEntityValue(entities, 'location');
    if (loc) {
      context.loc = loc; // store it in context
    }

    cb(context);
  },

  error(sessionId, context, error) {
    console.log(error.message);
  },

  // fetch-weather bot executes
  ['fetch-weather'](sessionId, context, cb) {
    // Here should go the api call, e.g.:
    // context.forecast = apiCall(context.loc)
    context.forecast = 'sunny';
    cb(context);
  },
  ['get-accountbalance'](sessionId, context, cb) {
    // Here should go the api call, e.g.:
    // context.forecast = apiCall(context.loc)
    context.balance = 'your account balance is $1000;';
    cb(context);
  }, 
  ['get-username']({sessionId, context, entities, cb}) {
    const recipientId = sessions[sessionId].fbid;
    const name = sessions[sessionId].name;
    if(recipientId) {
      return new Promise(function(resolve, reject) {
        if (!name) {
          return requestUserName(recipientId)
          .then((json) => {
			  context.userName = json;
			  cb(context);
            /* context.userName = json.first_name;
            sessions[sessionId].name = json.first_name;
            resolve(context); */
          })
          .catch((err) => {
            console.error('Oops! An error occurred while asking the name of the user: ',
              err.stack || err);
          });
        } else {
          // Retrieve the name of the user 
          context.userName = "User";
		  cb(context);
          //return resolve(context);
        }
      });
    } else {
      console.error('Oops! Couldn\'t find user for session:', sessionId);
      // Giving the wheel back to our bot
      return Promise.resolve()
    } 
  },
	const requestUserName = (id) => {
	const qs = 'access_token=' + encodeURIComponent(FB_PAGE_TOKEN);
		return fetch('https://graph.facebook.com/v2.9/' + encodeURIComponent(id) +'?' + qs)
		.then(rsp => rsp.json())
		.then(json => {
		if (json.error && json.error.message) {
			throw new Error(json.error.message);
		}
		return json;
		});
	};,  
};


const getWit = () => {
  return new Wit(Config.WIT_TOKEN, actions);
};

exports.getWit = getWit;

// bot testing mode
// http://stackoverflow.com/questions/6398196
if (require.main === module) {
  console.log("Bot testing mode.");
  const client = getWit();
  client.interactive();
}