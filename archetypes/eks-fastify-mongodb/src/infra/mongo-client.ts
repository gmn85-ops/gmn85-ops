import { MongoClient, Db } from 'mongodb';

let clientPromise: Promise<MongoClient> | undefined;

async function getClient(): Promise<MongoClient> {
  if (!clientPromise) {
    clientPromise = new MongoClient(process.env.MONGODB_URI as string, {
      maxPoolSize: 30,
    }).connect();
  }

  return clientPromise;
}

export async function getMongoDb(): Promise<Db> {
  const client = await getClient();
  return client.db(process.env.MONGODB_DATABASE);
}
