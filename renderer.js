// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const $ = require('jquery');

// fetch tweets
const Twitter = require('twitter');
const client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

var count = 0;
var tweets = [];
var timerId;
var TIMER_TWEET_INTERVAL = 7500;

function fetchTweets() {
  let d = new $.Deferred;
  client.get('statuses/home_timeline', {count: 200}, function(error, tweets, response) {
    if (!error) {
      this.tweets = tweets;
      d.resolve();
    } else {
      d.reject(error);
    }
  });
  return d.promise();
}

function repaint() { // setIntervalで呼ばれる
  updateContent(this.tweets[count]);
  count++;
}

function updateContent(tweet) {
  $('#text').html(tweet.text);
  $('#name').html(tweet.user.name);
  $('#screen_name').html('@' + tweet.user.screen_name);
  $('#image').attr('src', tweet.user.profile_image_url);
}

fetchTweets().done(function() {
  this.timerId = setInterval(repaint, TIMER_TWEET_INTERVAL);
  registerKeyEvents();
}).fail(function(error) {
  console.error('Error in fetchTweets(): ' + error);
});

function registerKeyEvents() {
  $(document).keydown(function(e) {
    switch(e.which) {
      case 37:
        count--;
        updateContent(window.tweets[count]);
        break;
      case 39:
        count++;
        updateContent(window.tweets[count]);
        break;
      default:
        return;
    }
    e.preventDefault();
  });
}
