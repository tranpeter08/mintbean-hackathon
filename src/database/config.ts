const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

// check the MongoDB URI
if (typeof MONGODB_URI !== 'string') {
  throw new Error('Define the MONGODB_URI environmental variable');
}

// check the MongoDB DB
if (typeof MONGODB_DB !== 'string') {
  throw new Error('Define the MONGODB_DB environmental variable');
}

enum DbCollectionName {
  POLL = 'poll',
  OPTION = 'option',
  BALLOT = 'ballot',
}

export {MONGODB_URI, MONGODB_DB, DbCollectionName};
