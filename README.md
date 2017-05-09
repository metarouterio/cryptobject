# cryptobject
[![CircleCI](https://circleci.com/gh/astronomerio/cryptobject.svg?style=svg)](https://circleci.com/gh/astronomerio/cryptobject)

cryptobject provides AES256 encryption to every string value in an object.

# Installation
`npm install --save cryptobject`

# Usage
To use cryptobject, simply import the package and call one of `encrypt`
or `decrypt` to create encrypt or decrypt an object.

### Usage
```javascript
const { encrypt, decrypt } = require('cryptobject')('passphrase');

const obj = { 'key': 'value' };

const encryptedObject = encrypt(obj);
const decrytpedObject = decrypt(encryptedObject);
```

# License
MIT
