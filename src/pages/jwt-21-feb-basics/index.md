---
path: "/jwt-basics"
date: "Feb '21"
title: "JWT Basics"
author: "jhahspu"
category: "jwt"
---


### Refresh Tokens

- JWTs are meant to be short lived (minutes)
- Refresh tokens are long lived(days or months)
- Refresh tokens can be used to create new JWTs
- Need to be stored securely


#####


### RSA Verification

- login on Google, Facebook, Twitter, etc and obtain a JWT
- use the JWT to register the user 


#####


### JWT Hacks / Exploits

+ XSS (cross-site-scriptin)
  - steal cookie and impersonate user
  - when JWT is stored in localStorage or JS has access to cookie
  - Fix: store cookie as httponly
+ CSRF (cross-site request forgery)
  - when sending request all cookies from the domain are sent
  - Fix: __custom request header__ or __samesite cookie flag__
+ JWT specification allows a 'none' algorithm
  - Decode header, replace `"alg": "RS256"` with `"alg": "none"` and re-hash the header + strip off the signature
  - Fix: Don't allow "none" -- `if (algorithm == none) return error` 
+ Flip semantics between RSA(RS) and HMAC(HS)
  - HMAC uses a shared secret
  - Public keys are public
  - Mix and match public/private keys
  - Fix: Have a clear def between public and private keys, when storing -> looking them up



### Storing JWT

- secure httponly cookies


#####


### Authorization

#### Usage

```javascript
router.route('/todos').get((req, res) => {
  const decodeJWT = _decodeJWT(req);
  if (!_authorized(decodeJWT, 'RETRIEVE_TODO')) {
    _sendUnauthorized(res);
    return;
  }
  todo.retrieveAll(decodeJWT.sub, 'true' === req.query.completed)
    .then((todos) => {
      res.send(_convertTodos(todos));
    })
    .catch((err) => {
      _handleDatabaseError(res, err);
    })
})
```


#### Decode JWT

```javascript
function _decodeJWT(req) {
  const authorization = req.header('Authorization');
  if (authorization === null || typeof authorization === 'undefined') {
    return null;
  }

  const encodedJWT = authorization.substr('JWT '.length);
  if (encodedJWT === null || typeof encodedJWT === 'undefined') {
    return null;
  }

  return jwt.decode(encodedJWT);
}
```


#### Decode Function

```javascript
function decode(encodedJWT) {
  try {
    const parts = encodedJWT.split('.');
    if (parts.length != 3) return null;

    const header = JSON.parse(Buffer.from(parts[0]), 'base64'));
    const payload = Buffer.from(parts[1], 'base64');

    // verify header key id matches application
    if (header.kid !== config.passport.applicationId) return null;

    let verified = false;
    const schema - header['alg'];
    switch (schema) {
      case 'RS256':
      case 'RS384':
      case 'RS512':
        verified = jwa(schema).verify(parts[0] + '.' + parts[1], parts[2], localStorage.publicKey);
        break;
      default:
        verified = false;
    }

    if (!verified) return null;

    const decodedJWT = JSON.parse(payload);
    const now = Math.round(new Date().getTime() / 1000);

    // JWT not expired
    if (decodedJWT.exp && decodedJWT.exp < now) return null;

    // JWT not before
    if (decodedJWT.nbf && decodedJWT.nbf > now) return null;

    return decodedJWT;

  } catch (error) {
    return null;
  }
}
```


#### Check role

```javascript
function _authorized(decodedJWT, role) {
  if (decodedJWT !== null) return false;

  if (isValid(decodedJWT)) return false;

  if (assertIdentity(decodedJWT, 'roles', role)) return false;

  if (assertIdentity(decodedJWT, 'applicationId', config.passport.applicationId)) return false;
}
```


#####


### Structure

#### Header

```json
{
  "typ": "JWT",
  "alg": "RS256"
}
```

#### Body 

- __iss__: issuer - who generated the token
- __exp__: expiration - sec since Jan 1st 1970
- __nbf__: not before
- __aud__: audience: who is it for - app id / client id
- __sub__: subject: who am I, or __uuid__
- __++ other custom claims__

```json
{
  "iss": "website.com",
  "exp": "1300819380",
  "nbf": "",
  "aud": "1242g2f-5453-2342-3543-2352nm23n",
  "sub": "1414n1b-1n1n-342n-43nn-33nfsfsdf",
  "name": "John Q",
  "roles": ["user", "admin"]
}
```

#### Signature

- RSA/HMAC signature

```sql
select * from todos where user_id = 'uuid provided by jot'
```


#####


### JWT [jot]

- JSON Web Tokens
- Signed with public/private key pair
- Can be validated by App API without calling User API
- Contains roles
- Portable unit of identity



```sql
CREATE TABLE todos (
  id IN NOT NULL,
  text TEXT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (id)
)
```


```sql
SELECT * FROM todos WHERE user_id=42

CREATE TABLE todos (
  id IN NOT NULL,
  text TEXT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT todos_fk_1 FOREIGN KEY (user_id)
    REFERENCES users(id) ON DELETE CASCADE
)
```


