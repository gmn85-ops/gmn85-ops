# Decisiones cerradas — Backend NoSQL Golden Path v1.0

## DEC-01 — Plataformas y runtimes
- AWS Lambda: Java 21, Node.js 24.x + TypeScript, Python 3.13.
- Amazon ECS: exclusivamente ECS sobre AWS Fargate.
- ECS Fargate: Java 21 y Node.js 24.x + TypeScript.
- Python no forma parte del Golden Path ECS/Fargate.

## DEC-02 — Patrón lógico
Todos los runtimes implementarán el mismo patrón lógico:

`Entry Point -> Application/Use Case -> Domain -> Repository Interface -> MongoDB Adapter -> MongoDB Driver`

El compute no define la arquitectura funcional.

## DEC-03 — MongoDB
- Driver oficial MongoDB obligatorio.
- Acceso mediante Repository/Adapter Pattern.
- `MongoClient` reutilizable; prohibido crear un cliente por request.
- Connection pool y timeouts externalizados.
- Pool productivo definido mediante performance test y capacidad real de Atlas.

## DEC-04 — Autenticación y red
- Mecanismo preferente: AWS IAM + `MONGODB-AWS`.
- Lambda utiliza Execution Role.
- Fargate utiliza Task Role.
- SCRAM + AWS Secrets Manager solo cuando IAM no sea viable.
- AWS PrivateLink es el patrón preferente de conectividad productiva hacia MongoDB Atlas cuando el tier lo soporte.

## DEC-05 — ECS Fargate Java
- Java 21.
- Spring Boot como baseline inicial para servicios HTTP.
- Red Hat UBI 9 Minimal como imagen base v1.0.
- Runtime no-root.
- logs a stdout/stderr.
- `SIGTERM` y graceful shutdown.
- Health check gestionado desde ECS Task Definition.
- Se incorpora `curl-minimal` como utilidad técnica de health check.

## DEC-06 — ECS Fargate Node.js
- Node.js 24.x.
- TypeScript obligatorio para nuevos servicios del Golden Path.
- Fastify 5 como framework HTTP estándar v1.0.
- Red Hat UBI 9 Node.js 24 Minimal como runtime base.
- Runtime no-root, stdout/stderr y graceful shutdown.

## DEC-07 — Health checks
- Liveness y readiness son conceptos separados.
- Liveness no dependerá de MongoDB ni de otras dependencias externas.
- La Task Definition realizará el container health check.
- Para Java se utilizarán endpoints Spring Boot Actuator o aliases corporativos equivalentes.
- Para Node.js se utilizarán `/health/live` y `/health/ready`.

## DEC-08 — Observabilidad
- Logging estructurado y Correlation ID obligatorios en todos los ambientes.
- CloudWatch Logs será baseline operativo.
- Dynatrace estará habilitado únicamente en Producción.
- Dynatrace no será dependencia funcional de la aplicación.
- Para ECS v1.0 se mantiene build-time injection como patrón corporativo productivo.

## DEC-09 — CI/CD e IaC
- Bitbucket Pipelines es la plataforma CI/CD.
- Terraform es obligatorio para infraestructura.
- OIDC Bitbucket -> AWS IAM Role es el mecanismo preferente de autenticación del pipeline.
- Se evitarán access keys AWS persistentes cuando OIDC sea viable.

## DEC-10 — Dimensionamiento
Los arquetipos no fijarán valores productivos rígidos de pool, concurrencia, CPU, memoria o autoscaling. Estos parámetros se determinarán por implementación en función de Atlas tier, TPS, p95/p99, payload y pruebas de performance.

## DEC-11 — Contratos
Para APIs HTTP se utilizará OpenAPI y se recomienda contract-first. El contrato no expondrá el documento físico de MongoDB.

## DEC-12 — Artefactos
La v1.0 incluye cinco Golden Paths:
1. Lambda Java 21.
2. Lambda Node.js 24 + TypeScript.
3. Lambda Python 3.13.
4. ECS Fargate Java 21.
5. ECS Fargate Node.js 24 + TypeScript.
