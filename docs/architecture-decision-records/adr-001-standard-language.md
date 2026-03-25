# ADR-001 - Lenguaje y runtime estándar para servicios de consulta MongoDB

## Estado
Aceptado

## Contexto
Se requiere un patrón reusable para futuros servicios de consulta hacia MongoDB desplegados tanto en AWS Lambda como en microservicios sobre Amazon EKS.

## Decisión
Se adopta **TypeScript sobre Node.js 22** como estándar base para ambos modelos de cómputo.

## Motivos
- Un solo lenguaje para Lambda y EKS.
- Integración natural con el driver oficial de MongoDB.
- Productividad alta para equipos de integración y backend.
- Tipado fuerte para contratos, DTOs, validaciones y repositorios.
- Excelente soporte para observabilidad en Lambda mediante Powertools.
- Menor fricción para compartir librerías entre workloads serverless y contenedores.

## Excepciones permitidas
Se puede evaluar **Go** únicamente para servicios de altísima concurrencia o footprint muy reducido, siempre que exista justificación de rendimiento/operación.

## Consecuencias
- Todos los nuevos arquetipos deberán exponer health endpoints, métricas, logging estructurado y una capa de acceso a datos desacoplada.
- La lógica de acceso a MongoDB se centraliza en librerías compartidas o módulos internos reutilizables.
