# Lineamientos a publicar — Frente de Integración / Backend

## 1. Alcance
Aplica a servicios backend que consuman MongoDB/NoSQL dentro del Golden Path corporativo sobre AWS Lambda o ECS Fargate.

## 2. Plataformas permitidas
- Lambda: Java 21, Node.js 24.x + TypeScript, Python 3.13.
- ECS Fargate: Java 21 y Node.js 24.x + TypeScript.
- Python no está permitido dentro del Golden Path ECS/Fargate.

## 3. Patrón de diseño obligatorio
`Entry Point -> Application/Use Case -> Domain -> Repository Interface -> MongoDB Adapter`.

El Controller/Handler no accederá directamente al driver MongoDB.

## 4. Contratos
- APIs HTTP deberán contar con contrato formal.
- OpenAPI es el mecanismo recomendado.
- Se recomienda contract-first.
- El contrato externo no expondrá el modelo físico de MongoDB.

## 5. Acceso a MongoDB
- Utilizar driver oficial.
- Reutilizar `MongoClient` y pool.
- No crear conexiones por request.
- Externalizar pool y timeouts.
- Consultas múltiples deberán utilizar límites/paginación.
- Queries críticas deberán incluir timeout y estar soportadas por índices adecuados.

## 6. Seguridad
- IAM + `MONGODB-AWS` es el patrón preferente.
- SCRAM solo cuando IAM no sea viable y sus credenciales deberán residir en Secrets Manager.
- Prohibidas credenciales embebidas en código, Dockerfiles o repositorio.
- Aplicar mínimo privilegio.

## 7. ECS Fargate
- Task Role separado de Task Execution Role.
- Runtime no-root.
- Logs a stdout/stderr.
- `SIGTERM` y graceful shutdown.
- Container health check desde Task Definition.
- Liveness no deberá depender de MongoDB.
- No utilizar tag `latest` en producción.

## 8. Node.js
- Node.js 24.x.
- TypeScript obligatorio para nuevos servicios del Golden Path.
- Fastify 5 es el framework HTTP baseline de ECS Fargate v1.0.

## 9. Java
- Java 21.
- Spring Boot baseline para ECS Fargate HTTP.
- UBI 9 Minimal baseline corporativo.
- Lambda Java deberá evitar frameworks pesados salvo necesidad justificada.

## 10. Python
- Python 3.13 únicamente en Lambda.

## 11. Observabilidad
- Logging estructurado obligatorio.
- Correlation ID obligatorio.
- Métricas de request, errores y latencia.
- Métricas MongoDB recomendadas.
- CloudWatch como baseline.
- Dynatrace solo en producción y sin dependencia funcional del código.

## 12. CI/CD e infraestructura
- Bitbucket Pipelines obligatorio.
- Terraform obligatorio.
- OIDC Bitbucket -> AWS recomendado.
- Build, tests, scans, `terraform fmt`, `validate`, `plan` y smoke test forman parte del pipeline.

## 13. Criterio Lambda vs Fargate
Lambda: cargas variables, stateless, consulta acotada y ejecución corta.
Fargate: carga sostenida, múltiples endpoints, workers o mayor control del runtime/conexiones.

## 14. Excepciones
Toda desviación a un control obligatorio/no permitido deberá documentarse y aprobarse mediante el proceso de Arquitectura correspondiente.
