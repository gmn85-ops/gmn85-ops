import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { Logger } from '@aws-lambda-powertools/logger';
import { z } from 'zod';
import { getMongoDb } from './infra/mongo-client.js';

const logger = new Logger({ serviceName: 'customer-query-lambda' });

const querySchema = z.object({
  documentNumber: z.string().min(3),
});

export async function handler(
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyStructuredResultV2> {
  const parsed = querySchema.safeParse(event.queryStringParameters ?? {});

  if (!parsed.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid query parameters' }),
    };
  }

  const db = await getMongoDb();
  const collection = db.collection('customers');

  const customer = await collection.findOne({
    documentNumber: parsed.data.documentNumber,
  });

  logger.info('Customer query executed', {
    documentNumber: parsed.data.documentNumber,
    found: !!customer,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ data: customer ?? null }),
  };
}
