'use strict';

// Wit.ai parameters
const WIT_TOKEN = "AECLS3TPMDBZPFIDGGBR4PTQTJAHT7DX";//process.env.WIT_TOKEN;
if (!WIT_TOKEN) {
  throw new Error('missing WIT_TOKEN');
}

// Messenger API parameters
const FB_PAGE_TOKEN = "EAAWLj8DzgvEBAEMZCJZCPz7ly0riWjxtIUqHleAcUewlrqoEZBiIGHqkw9KEIESvpYZCF6SgJZAVfRxOtW8fdnRR4i6e7ZBxZAxPY7VaSoilSyl3ZC79rwnq7temSBsmMhDAbB4JKAf1obuPK1i8S9BJYuGLRMIURx3NekkBfr9zLQZDZD";

var FB_VERIFY_TOKEN = "12345";
if (!FB_VERIFY_TOKEN) {
  FB_VERIFY_TOKEN = "just_do_it";
}

module.exports = {
  WIT_TOKEN: WIT_TOKEN,
  FB_PAGE_TOKEN: FB_PAGE_TOKEN,
  FB_VERIFY_TOKEN: FB_VERIFY_TOKEN,
};