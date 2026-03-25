import { MongoClient, Db } from 'mongodb';

let client: MongoClient | undefined;

export async function getMongoDb(): Promise<Db> {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI as string, {
      maxPoolSize: 10,
    });
    await client.connect();
  }

  return client.db(process.env.MONGODB_DATABASE);
}
