# Arquitectura de referencia

## Objetivo
Definir un patrón base para servicios de consulta hacia MongoDB en dos modalidades:
- AWS Lambda para cargas event-driven o APIs de baja a media complejidad.
- Microservicios en Amazon EKS para cargas persistentes, mayor control operativo y escalamiento continuo.

## Principios
1. Un solo stack de desarrollo: TypeScript + Node.js 22.
2. Separación por capas: API / aplicación / dominio / infraestructura.
3. Repositorio Mongo desacoplado de la capa HTTP.
4. Observabilidad obligatoria desde el inicio.
5. Configuración por variables de entorno y secretos externos.
6. Health, readiness y timeouts definidos por estándar.
7. Infraestructura versionada mediante IaC.

## Patrón lógico

### Componentes comunes
- **Controller / Handler**: expone el contrato de entrada.
- **Use case / Service**: orquesta la consulta.
- **Repository**: abstrae MongoDB.
- **Mongo client provider**: crea/reutiliza conexión.
- **Schemas / DTOs**: validación de entrada y salida.
- **Observability**: logs, métricas, tracing.

### Variante Lambda
- API Gateway o invocación directa.
- Reutilización del `MongoClient` fuera del handler.
- Pensado para consultas idempotentes y respuestas rápidas.

### Variante EKS
- Servicio HTTP sobre Fastify.
- Readiness/liveness endpoints.
- Horizontal scaling con HPA.
- Secretos vía External Secrets / AWS Secrets Manager.

## Decisiones de diseño
- Framework recomendado para microservicio: **Fastify**.
- Validación recomendada: **Zod**.
- Logging recomendado: JSON estructurado.
- Driver Mongo: oficial `mongodb`.
- Contenedores: imagen mínima Node.js LTS.

## Cuándo usar Lambda
- Bajo volumen inicial.
- Necesidad de time-to-market rápido.
- Servicio sencillo, orientado a lectura.
- Patrón event-driven o API de consulta puntual.

## Cuándo usar EKS
- Necesidad de throughput sostenido.
- Requerimiento de múltiples endpoints o composición mayor.
- Necesidad de mayor control de red, sidecars, mTLS o service mesh.
- Procesos con warm capacity constante.
