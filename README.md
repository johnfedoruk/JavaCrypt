## JavaCrypt ##

![alt text](https://javacrypt.net/images/JavaCryptLogo.png "JavaCrypt")

[JavaCrypt](https://javacrypt.net) is an online chat interface that implements client side encryption.

## Motivation ##

Almost all applications implement some form of encryption; be it client side encryption or simply SSL. Unfortunately, being proprietary software, nobody can audit the quality of the implementation for many of these chat applications.

JavaCrypt doesn’t just rely on SSL. We understand fully that our servers or the servers of the certificate authorities may be a vector of attack. We implement client side encryption so no message can be parsed by a bad actor with certificate authority or server access.

## Implementation ##

Upon login, some credentials are sent in plaintext to the server. These include:
* Your username
* The chatroom you wish to join
* The unix timestamp

Additionally, a greeting message will be encrypted and sent to everyone else in the chatroom. They will attempt to decrypt the message, and should they recognise the message they will know that they are speaking to somebody who has the same key. This is used for filtering background noise.

JavaCrypt uses AES256 in CTR mode by default to encrypt each message prior to sending the message to the server. AES192 and AES128 are also available upon login for performance reasons. The messages are then decrypted by everybody else in the chatroom using the key that they chose – again, on the client side.

## Server Code ##

The server code is not going to be made available. If you are interested in using the server side code, please contact me to discuss some enterprise solutions.

## To do ##

Our todo list is available to view [here](https://github.com/johnfedoruk/JavaCrypt/blob/master/TODO.md)

## License ##

Our license is available to view [here](https://github.com/johnfedoruk/JavaCrypt/blob/master/LICENSE.md)
