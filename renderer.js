// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const $ = require('jquery');

// fetch tweets
const Twitter = require('twitter');
const client = new Twitter(twitterClidentials);

var count = 0;
var tweets = [];
var timerId;
var TIMER_TWEET_INTERVAL = 7500;
const FETCH_TWEET_COUNT = 200;

function fetchTweets() {
  let d = new $.Deferred;
  client.get('statuses/home_timeline', {count: FETCH_TWEET_COUNT}, function(error, tweets, response) {
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
  if (count == FETCH_TWEET_COUNT - 1) {
    location.reload();
  }
  updateContent(this.tweets[count]);
  count++;
}

function updateContent(tweet) {
  $('#text').html(tweet.text);
  $('#name').html(tweet.user.name);
  $('#screen_name').html('@' + tweet.user.screen_name);
  $('#image').attr('src', tweet.user.profile_image_url);
  refreshAnchorTag();
}

function refreshAnchorTag() {
  $('.jsRefreshAnchorTag').html(function(_, text) {
    var url = text.match(/(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g);
    $.each(url, function(i, v) {
        text = text.replace(v, '<a href="' + v + '">' + v + '</a>');        
    });
    return text;
});
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

window.changeCount = function() {
  count = FETCH_TWEET_COUNT - 2;
};

window.showCount = function() {
  console.log(count);
};
