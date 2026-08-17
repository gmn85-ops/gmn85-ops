# Lineamientos a publicar — Frente de Data / MongoDB

## 1. Alcance
Aplica a bases MongoDB Atlas consumidas por servicios backend construidos sobre el Golden Path corporativo.

## 2. Ownership
Data es responsable principal de:
- modelo documental;
- definición/evolución de colecciones;
- índices;
- capacidad y tier de Atlas;
- políticas de retención cuando correspondan;
- validación de performance de queries;
- lineamientos de consistencia y disponibilidad de datos.

## 3. Conectividad
- Para producción se recomienda AWS PrivateLink cuando el tier/región de Atlas lo permita.
- No se permitirá acceso público irrestricto.
- Cualquier excepción de conectividad pública deberá estar restringida y aprobada.

## 4. Autenticación
- IAM + `MONGODB-AWS` es el mecanismo preferente para workloads AWS.
- Data deberá registrar/mantener el principal IAM correspondiente en Atlas y otorgar únicamente los permisos requeridos.
- SCRAM se usará solo como alternativa controlada.

## 5. Diseño de consultas
Toda nueva consulta deberá identificar:
- colección objetivo;
- campos de filtro;
- proyección requerida;
- cardinalidad esperada;
- paginación/límite;
- índice que soporta la consulta;
- timeout esperado;
- tamaño esperado de respuesta.

No se aprobarán consultas abiertas sin límite para endpoints de servicio.

## 6. Índices
- Cada query crítica deberá tener evaluación explícita de índice.
- Los índices deberán revisarse ante cambios significativos de volumen o patrones de consulta.
- No se crearán índices únicamente desde el código de aplicación en producción salvo mecanismo gobernado por Data.

## 7. Connection capacity
El `maxPoolSize` del servicio no será definido por Data de forma aislada ni por Backend de forma aislada.

Se dimensionará considerando:
- tier Atlas;
- límite/capacidad de conexiones;
- número máximo de Tasks Fargate o concurrencia Lambda;
- número de réplicas/nodos;
- TPS;
- p95/p99;
- pruebas de carga.

## 8. NFR mínimos por implementación
Data deberá proporcionar o validar, cuando aplique:
- Atlas tier;
- región;
- versión MongoDB;
- topología/cluster;
- database y colecciones;
- volumen actual;
- crecimiento esperado;
- TPS promedio y máximo;
- p95 y p99 objetivo;
- tamaño promedio/máximo de documentos y respuestas;
- ratio lectura/escritura;
- RTO/RPO;
- requerimientos de consistencia.

## 9. Timeouts
Las queries de servicio deberán operar con límites de tiempo definidos. Los valores serán acordados según NFR y comportamiento de la consulta.

## 10. Cambios de esquema
Los cambios incompatibles en documentos o campos consumidos por servicios deberán coordinarse con Backend/Integración y contar con estrategia de compatibilidad/migración.

## 11. Datos sensibles
El modelo y las respuestas deberán cumplir las políticas corporativas de clasificación y minimización de datos. Los servicios solo recuperarán los campos necesarios para su caso de uso.

## 12. Pruebas
Antes de producción, Data participará en:
- validación de queries;
- revisión de índices;
- pruebas de integración;
- pruebas de carga/performance;
- evaluación de utilización del cluster y conexiones.

## 13. Gobierno
Las excepciones a índices, conectividad, autenticación o límites de consulta deberán quedar documentadas y contar con aprobación de los responsables de Data y Arquitectura correspondientes.
