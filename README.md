# TimerTweetViewerElectron

<p align="center">
    <img src="./screen_shot.png" width="500" />
</p>

Timeline monitor.

## To Use

### Setup

```bash
git clone git@github.com:keisei1092/TimerTweetViewerElectron.git
cd TimerTweetViewerElectron
yarn install
```

### Prepare access credentials

```bash
vim twitter_credentials.js
```

then write:

```javascript
twitterClidentials = {
  consumer_key: '(YOUR_CONSUMER_KEY)',
  consumer_secret: '(YOUR_CONSUMER_SECRET)',
  access_token_key: '(YOUR_ACCESS_TOKEN_KEY)',
  access_token_secret: '(YOUR_ACCESS_TOKEN_SECRET)'
};
```

### Start

```bash
yarn start
```
