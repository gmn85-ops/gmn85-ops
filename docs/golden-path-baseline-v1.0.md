# Backend NoSQL Golden Path — Línea Base v1.0

## Estado
**Baseline técnico generado — pendiente de revisión y aprobación de Chapters/Frentes.**

## Arquetipos disponibles

### AWS Lambda
1. Java 21 + MongoDB Driver.
2. Node.js 24.x + TypeScript + MongoDB Driver.
3. Python 3.13 + PyMongo.

### Amazon ECS Fargate
4. Java 21 + Spring Boot + UBI 9 Minimal.
5. Node.js 24.x + TypeScript + Fastify 5 + UBI 9 Node.js Minimal.

## Capacidades transversales definidas
- Repository/Adapter Pattern.
- Reutilización de `MongoClient`.
- Configuración de pool/timeouts externalizada.
- IAM + `MONGODB-AWS` como autenticación preferente.
- AWS PrivateLink como conectividad productiva preferente cuando Atlas lo soporte.
- Logs a stdout/stderr.
- CloudWatch baseline.
- Dynatrace solo PROD.
- ECS health checks desde Task Definition.
- `curl-minimal` como herramienta de health check en runtime Fargate v1.0.
- Terraform obligatorio.
- Bitbucket Pipelines obligatorio.
- OIDC Bitbucket -> AWS como mecanismo CI/CD preferente.

## Terraform generado
- `terraform/modules/lambda-service`
- `terraform/modules/ecs-fargate-service`

Los módulos son baseline y deben completarse con políticas IAM, load balancer/API integration, autoscaling y convenciones de remote state corporativas antes de uso productivo.

## Pipeline generado
- `pipelines/bitbucket-pipelines.reference.yml`

Es un flujo de referencia y no debe copiarse a Producción sin adaptar las imágenes de CI, herramientas de quality/security y roles OIDC corporativos.

## Dynatrace
Para Fargate se mantienen dos variantes de runtime:
- Base Non-Prod.
- Dynatrace build-time injection para PROD.

El artefacto funcional debe ser el mismo entre ambientes; cambia únicamente la imagen/runtime instrumentado.

## Parámetros que NO fija la v1.0
- MongoDB `maxPoolSize` productivo.
- Lambda memory/concurrency definitivos.
- Fargate CPU/memory definitivos.
- Desired/max Task Count.
- Autoscaling thresholds.
- p95/p99.

Se deben definir por implementación mediante NFR y pruebas de performance.

## Estado de madurez
La línea base v1.0 constituye un **starter técnico y arquitectura de referencia**, no una librería certificada para Producción. La promoción a Golden Path productivo requiere cerrar el backlog de validaciones indicado en `docs/backlog/post-v1-pending-items.md`.
