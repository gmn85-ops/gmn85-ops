import Fastify from 'fastify';
import { MongoClient } from 'mongodb';
import { z } from 'zod';

const app = Fastify({ logger: true });
const client = new MongoClient(process.env.MONGODB_URI!, {
  maxPoolSize: Number(process.env.MONGODB_MAX_POOL_SIZE ?? 20),
  connectTimeoutMS: Number(process.env.MONGODB_CONNECT_TIMEOUT_MS ?? 5000),
  serverSelectionTimeoutMS: Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS ?? 5000)
});
await client.connect();
const db = client.db(process.env.MONGODB_DATABASE);

app.get('/health/live', async () => ({ status: 'UP' }));
app.get('/health/ready', async () => ({ status: 'UP' }));

app.get('/customers/:id', async (request, reply) => {
  const parsed = z.object({ id: z.string().min(1) }).safeParse(request.params);
  if (!parsed.success) return reply.code(400).send({ code: 'INVALID_REQUEST' });
  const document = await db.collection(process.env.MONGODB_COLLECTION!).findOne(
    { businessId: parsed.data.id },
    { maxTimeMS: Number(process.env.MONGODB_MAX_TIME_MS ?? 3000) }
  );
  return document ? { data: document } : reply.code(404).send({ data: null });
});

const shutdown = async () => { await app.close(); await client.close(); process.exit(0); };
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

await app.listen({ host: '0.0.0.0', port: Number(process.env.PORT ?? 8080) });
