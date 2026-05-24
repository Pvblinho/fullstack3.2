# 🟣 MISIÓN 5 — "El servidor murió"

## Contexto
> "El servidor de producción se cayó. El nuevo dev no sabe cómo levantar
>  el proyecto porque faltan dependencias. Dockeriza todo para que
>  'funcione en cualquier máquina'."

## Objetivo
Dockerizar el backend de la Misión 4 (con auth).

## Archivos a crear
```
mision-5-docker/
├── Dockerfile            ← imagen del backend
├── docker-compose.yml    ← orquestación (app + futuro DB)
├── .dockerignore         ← qué no copiar a la imagen
└── README.md             ← este archivo
```

## Comandos importantes

```bash
# Construir la imagen
docker build -t mision-backend .

# Correr el contenedor
docker run -p 3003:3003 mision-backend

# Con docker-compose (recomendado)
docker-compose up --build

# En background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener todo
docker-compose down
```

## Criterios de éxito
1. ✅ `docker-compose up` levanta todo sin errores
2. ✅ La imagen pesa menos de 200MB (usa node:alpine)
3. ✅ El .dockerignore excluye node_modules
4. ✅ Las variables de entorno se pasan por el compose, no hardcodeadas
5. ✅ Si el proceso muere, Docker lo reinicia (restart: unless-stopped)

## Pregunta de reflexión
¿Por qué usamos `node:20-alpine` y no `node:20`?
¿Qué es un multi-stage build y cuándo usarlo?
