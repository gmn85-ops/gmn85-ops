import Fastify from 'fastify';
import { z } from 'zod';
import { getMongoDb } from './infra/mongo-client.js';

const app = Fastify({ logger: true });

app.get('/health/live', async () => ({ status: 'ok' }));
app.get('/health/ready', async () => ({ status: 'ready' }));

const querySchema = z.object({
  documentNumber: z.string().min(3),
});

app.get('/customers', async (request, reply) => {
  const parsed = querySchema.safeParse(request.query);

  if (!parsed.success) {
    return reply.code(400).send({ message: 'Invalid query parameters' });
  }

  const db = await getMongoDb();
  const collection = db.collection('customers');
  const customer = await collection.findOne({
    documentNumber: parsed.data.documentNumber,
  });

  return reply.code(200).send({ data: customer ?? null });
});

const port = Number(process.env.PORT ?? 3000);
await app.listen({ port, host: '0.0.0.0' });
