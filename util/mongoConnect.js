import { MongoClient } from "mongodb";

let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB;

let catchedClient = null;
let catchedDb = null;

if (!uri) {
  throw new Error("Please define the mongodb uri environment variable");
}

if (!dbName) {
  throw new Error("Please define the mongodb db environment variable ");
}

export async function connectToDatabase() {
  if (catchedClient && catchedDb) {
    return { client: catchedClient, db: catchedDb };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = await client.db(dbName);
  catchedClient = client;
  catchedDb = db;

  return { client, db };
}
