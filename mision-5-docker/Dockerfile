# Dockerfile para el backend (Misión 4 con auth)
# Usa alpine para imagen liviana (~180MB vs ~1GB con node:20)

# ── Stage 1: dependencias ──────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app

# Copiar solo los archivos de dependencias primero
# (aprovecha el cache de capas de Docker)
COPY package.json ./

RUN npm install --production

# ── Stage 2: imagen final ─────────────────────────────
FROM node:20-alpine AS runner

# Usuario no-root por seguridad (nunca corras como root en prod)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copiar dependencias del stage anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar código fuente
COPY src ./src
COPY package.json ./

# Cambiar al usuario sin privilegios
USER appuser

# Exponer el puerto (documentación; no abre el puerto por sí solo)
EXPOSE 3003

# Variable de entorno con valor por defecto (se sobreescribe en docker-compose)
ENV NODE_ENV=production
ENV PORT=3003

# Healthcheck: Docker verifica que la app esté funcionando
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -qO- http://localhost:3003/health || exit 1

# Comando de inicio
CMD ["node", "src/index.js"]
