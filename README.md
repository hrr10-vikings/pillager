# hrr10-vikings: Pillager

> Organizes your bookmarks by pillaging keywords from each page

## Team

  - __Product Owner__: Paul Bhorjee
  - __Scrum Master__: Ben Pochily
  - __Development Team Members__: Jason Sigmon, Kristine Yabut

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 0.10.x
- Express 4.2.x
- Underscore 1.8.x
- Firebase 2.3.x
- Bower 1.6.x
- bcrypt-nodejs 0.0.3
- jwt-simple 0.2.x
- body-parser 1.4.x

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

Additionally, you will need to obtain some keys:
- Alchemy API key - place in server/api_key.txt
- Firebase url
- JWT Secret
These two should be placed in server/config.js in accordance with the following example:
```javascript
var config = {
  'firebaseUrl': 'URL_GOES_HERE',
  'JWTSecret':  'SECRET_GOES_HERE'
};
module.exports = config;
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
