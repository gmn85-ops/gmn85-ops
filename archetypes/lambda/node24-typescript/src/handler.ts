import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { MongoClient } from 'mongodb';
import { Logger } from '@aws-lambda-powertools/logger';
import { z } from 'zod';

const logger = new Logger({ serviceName: process.env.SERVICE_NAME ?? 'mongodb-query' });
const schema = z.object({ id: z.string().min(1) });
let client: MongoClient | undefined;

async function db() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI!, {
      maxPoolSize: Number(process.env.MONGODB_MAX_POOL_SIZE ?? 10),
      connectTimeoutMS: Number(process.env.MONGODB_CONNECT_TIMEOUT_MS ?? 5000),
      serverSelectionTimeoutMS: Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS ?? 5000)
    });
    await client.connect();
  }
  return client.db(process.env.MONGODB_DATABASE);
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const parsed = schema.safeParse(event.pathParameters ?? {});
  if (!parsed.success) return { statusCode: 400, body: JSON.stringify({ code: 'INVALID_REQUEST' }) };

  const database = await db();
  const document = await database.collection(process.env.MONGODB_COLLECTION!).findOne(
    { businessId: parsed.data.id },
    { maxTimeMS: Number(process.env.MONGODB_MAX_TIME_MS ?? 3000) }
  );

  logger.info('MongoDB query completed', { found: Boolean(document) });
  return { statusCode: document ? 200 : 404, body: JSON.stringify({ data: document ?? null }) };
};
