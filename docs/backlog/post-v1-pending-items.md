# Pendientes posteriores a Golden Path Backend NoSQL v1.0

## A. Pendientes para aprobación/publicación
1. Aprobación del Chapter de Desarrollo Backend.
2. Aprobación del frente de Integración/Arquitectura.
3. Validación y aprobación del frente de Data.
4. Revisión de Seguridad sobre IAM, PrivateLink, imágenes y supply chain.
5. Revisión de Cloud/DevOps sobre módulos Terraform y Bitbucket Pipelines.
6. Publicación de lineamientos de Integración y Data en el repositorio/portal corporativo oficial.

## B. Pendientes técnicos v1.1
1. Validar y fijar imagen base exacta Node.js 24 UBI 9 aprobada por Seguridad/Cloud.
2. Validar Fastify 5 con el Chapter Backend y convertirlo en estándar definitivo o mantenerlo como Golden Path recomendado.
3. Validar `curl-minimal` en imágenes corporativas y política de actualización/CVE.
4. Definir estrategia estándar API Gateway / ALB / VPC Link / Service Discovery según tipo de consumidor.
5. Evaluar `x86_64` vs `ARM64` mediante benchmark Java y Node.js.
6. Definir estrategia de Dynatrace para Lambda y validar si aplica únicamente a determinados workloads productivos.
7. Evaluar a futuro runtime/init-container Dynatrace en Fargate versus build-time injection.
8. Completar manejo estándar de errores, DTOs y respuesta corporativa en los cinco arquetipos.
9. Incorporar OpenAPI base y validación contract-first.
10. Incorporar pruebas unitarias e integración reales en cada arquetipo.
11. Incorporar métricas y tracing estandarizados en cada lenguaje.
12. Incorporar graceful shutdown y manejo de readiness completo en Java Spring Boot.
13. Añadir políticas IAM mínimas y ejemplos `MONGODB-AWS` completos en Terraform.
14. Añadir integración opcional AWS Secrets Manager para SCRAM.
15. Añadir autoscaling Fargate parametrizado.
16. Añadir reserved/provisioned concurrency Lambda cuando aplique.
17. Definir estrategia de remote state/locking Terraform según estándar corporativo existente.
18. Definir estrategia de versionado y publicación de módulos Terraform.
19. Convertir Bitbucket Pipeline de referencia en templates reutilizables corporativos.
20. Añadir escaneo de IaC, contenedores, dependencias y SBOM según herramientas aprobadas.

## C. Información pendiente de Data para el caso Chatbot
1. Atlas tier.
2. Región Atlas/AWS.
3. Versión MongoDB.
4. Topología y cantidad de clusters.
5. Databases y colecciones involucradas.
6. Queries iniciales.
7. Índices existentes.
8. TPS promedio.
9. TPS máximo/pico.
10. p95 objetivo.
11. p99 objetivo.
12. Tamaño promedio de documento/respuesta.
13. Tamaño máximo de respuesta.
14. Volumen actual y crecimiento esperado.
15. Ratio de lectura/escritura.
16. Requerimientos de consistencia.
17. RTO y RPO.
18. Requerimientos de clasificación/protección de datos.

## D. Validaciones del primer piloto
1. Seleccionar un servicio real del Chatbot como piloto.
2. Ejecutar PoC de IAM `MONGODB-AWS` desde Lambda y Fargate.
3. Validar PrivateLink end-to-end.
4. Ejecutar pruebas de carga sin Dynatrace y con Dynatrace en el artefacto Fargate productivo.
5. Medir CPU, memoria, p95, p99, throughput, conexiones y pool wait.
6. Definir valores iniciales de `maxPoolSize`, timeouts, Lambda memory/concurrency o Fargate CPU/memory/autoscaling.
7. Validar alarmas y dashboards.
8. Elaborar runbook productivo.

## E. Gobierno y evolución
1. Versionar Golden Path mediante Semantic Versioning.
2. Definir owner técnico del Golden Path.
3. Definir periodicidad de revisión de runtimes y base images.
4. Crear proceso de excepción/desviación.
5. Crear scorecard de cumplimiento para nuevos servicios.
6. Integrar los arquetipos con el catálogo/portal de desarrolladores cuando corresponda.
7. Definir política de deprecación de versiones antiguas del Golden Path.
