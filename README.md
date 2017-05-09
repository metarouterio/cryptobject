# cryptobject
[![CircleCI](https://circleci.com/gh/astronomerio/cryptobject.svg?style=svg)](https://circleci.com/gh/astronomerio/cryptobject)

cryptobject provides AES256 encryption to every string value in an object.

# Installation
`npm install --save cryptobject`

# Usage
To use cryptobject, simply import the package and call one of `encryptor`
or `decryptor` to create a function capable of applying encryption or decryption
to an object.

### without es6 imports
```javascript
const cryptobject = require('cryptobject').default;
const { encryptor, decryptor } = cryptobject;

const obj = { 'key': 'value' };

const passphrase = 'testpass';

const encrypt = encryptor(passphrase);
const encryptedObject = encrypt(obj);

const decrypt = decryptor(passphrase);
const decrytpedObject = decrypt(encryptedObject);
```

### with es6 imports (babel)
```javascript
import cryptobject from 'cryptobject';
const { encryptor, decryptor } = cryptobject;

const obj = { 'key': 'value' };

const passphrase = 'testpass';

const encrypt = encryptor(passphrase);
const encryptedObject = encrypt(obj);

const decrypt = decryptor(passphrase);
const decrytpedObject = decrypt(encryptedObject);
```

# License
MIT
