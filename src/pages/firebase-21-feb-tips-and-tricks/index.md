---
path: "/firebase-tips-and-tricks"
date: "Feb '21"
title: "Firebase Tips & Tricks"
author: "jhahspu"
category: "firebase"
---




### One to Many

```javascript
async function oneToMany() {
  const { uid } = await auth.currentUser;
  const ref = db.collection('accounts').doc(uid).collection('orders');
  return ref.add({ someData });
}

// Group subcollections for unified query
db.collectionGroup('orders').orderBy('date').where('data', '==', [something])
```


#####



### Many to Many

```javascript
async function manyToMany(){
  const { uid, displayName } = await auth.currentUser;
  const ref = db.collection('chats');
  const members = {
    [uid]: displayName
  };
  ref.set({members}, {merge: true});
}

const query = db.collection('chats').orderBy('members.[memeberid]')
```


#####



### Realtime Data

```javascript
// single read
query.get()

// realtime
query.onSnapshot(q=> q.docChanges().map(change => change.doc/newIndex/oldIndex/type))
```


#####



### Offline Firestore Settings
```javascript
db.enablePersistence({synchronizeTabs: true})

```


#####



### Emojis - UTF-8 Characters

(Unicode Link)[https://unicode.org/emoji/charts/full-emoji-list.html]

```javascript
const ref = db.collection('foods').doc('broccoli')
ref.set({name: '🥦'})
const query = ref.where('name', '==', '🥦')
```


#####


### Query Wild Card

```javascript
const start = 'The Fast and The Furious';
const end = start + '~';

movies
  .orderBy('title')
  .startAt(start)
  .endAt(end)

```


#####



### Auto-index Compound Queries 

```javascript
query
  .where('game', '==', 'completed')
  .where('score', '==', 123)
  .orderBy('time')

```


#####



### Write to Lists With Array Union or Remove

```javascript
const ref = db.collection('recipes')
ref.add({
  ingredients: [
    '🦑',
    '🥑',
    '🍋'
  ]
});
ref.update({
  ingredients: firebase.firestore.FieldValue.arrayUnion('🍍')
  // or
  ingredients: firebase.firestore.FieldValue.arrayRemove('🦑')
})

ref.where('ingredients', 'array-contains', '🥑')
```


#####



### Pipeline Multiple Reads Into a Concurrent Request

```javascript
const ids = [
  'a',
  'b',
  'c'
];
const readIds = (ids) => {
  const reads = ids.map(id => 
    db.collection('foo').doc(id).get()
  );
  return Promise.all(reads);
}

```


#####



### Timestamps => serverTimestamp();

```javascript
const { serverTimestamp, increment } = firebase.firestore.FieldValue;

ref.update({
  timestamp: serverTimestamp(),
  counter: increment(1)
})
```


#####



### Batch for Atomic Writes

```javascript
const batch = db.batch();

batch.set(game, {score});
batch.set(user, {lifetimeScore});

batch.commit();
```


#####



### File Storage

- use coldline buckets to save $ on storage
- storage location + download url

```javascript
const storageRef = storage.refFromURL('gs://awesome-dev.appspot.com/giphy.gif');
const storageRef = storage.refFromURL('');

```


#####



### List All Files From Bucket

```javascript
async function allFiles() {
  const dir = storage.ref('images/sample123')
  const allFiles = await storageRef.listAll();
}
```


#####



### Upload Files

```javascript
const storageRef = storage.reg('image.png');
const task = storageRef.put(someBlob);
task.on(firebase.storage.TaskEvent.STATE_CHANGED, e => {
  const progress = e.bytesTransferred / e.totalBytes;
})
```


#####



### Upload Concurrently

```javascript
const files = [...Array(20).keys()];
for (const f of files) {
  storage.ref(f).put(someFile, {customMetadata: {userId, platform}})
}

```