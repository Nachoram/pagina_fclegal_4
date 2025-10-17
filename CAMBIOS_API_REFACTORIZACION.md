# 📋 Resumen de Cambios - Refactorización de API

## ✅ Problema Solucionado

Se ha implementado un sistema robusto y configurable para manejar las URLs de las APIs, eliminando las URLs hardcodeadas que causaban el error:

```
GET http://localhost:3007/ 404 (Not Found)
```

## 📁 Archivos Creados

### 1. `.env.local` (Raíz del proyecto)
- **Propósito**: Archivo de configuración local para variables de entorno
- **Contenido**: Define `NEXT_PUBLIC_API_URL=http://localhost:3000`
- **Importante**: Este archivo NO se sube a Git (seguridad)

### 2. `.env.example` (Raíz del proyecto)
- **Propósito**: Plantilla de ejemplo para otros desarrolladores
- **Uso**: Otros pueden copiar este archivo como `.env.local` y configurar sus propios valores

### 3. `lib/api.ts`
- **Propósito**: Utilidades centralizadas para llamadas a la API
- **Funciones incluidas**:
  - `getApiUrl()`: Obtiene la URL de la API
  - `isApiConfigured()`: Verifica si la API está configurada
  - `apiGet()`, `apiPost()`, `apiPut()`, `apiDelete()`: Métodos HTTP
  - `apiFetch()`: Método genérico para fetch
  - `checkApiHealth()`: Health check de la API
  - `logApiConfig()`: Muestra configuración en consola (debugging)

### 4. `docs/API_CONFIGURATION.md`
- **Propósito**: Documentación completa sobre cómo usar las variables de entorno
- **Incluye**: Ejemplos de código, solución de problemas, mejores prácticas

## 🔧 Cómo Usar

### Configuración Inicial

1. **Verifica que existe el archivo `.env.local`** en la raíz del proyecto
   
2. **Identifica el puerto de tu backend**:
   - Revisa tu código de backend
   - O ejecuta tu backend y verifica en qué puerto corre

3. **Actualiza `.env.local`** con el puerto correcto:
   ```env
   # Si tu backend corre en puerto 3007:
   NEXT_PUBLIC_API_URL=http://localhost:3007
   
   # Si tu backend corre en puerto 3001:
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **⚠️ IMPORTANTE: Reinicia el servidor de desarrollo**:
   ```bash
   # Detén el servidor (Ctrl+C en la terminal)
   # Luego reinicia:
   npm run dev
   ```

### Uso en el Código

#### ❌ ANTES (Incorrecto - URL hardcodeada):
```typescript
const response = await fetch('http://localhost:3007/api/endpoint')
```

#### ✅ DESPUÉS (Correcto - Usando las utilidades):

**Opción 1: Usando las funciones de `lib/api.ts`** (Recomendado)
```typescript
import { apiGet, apiPost } from '@/lib/api'

// GET request
const data = await apiGet('/api/users')

// POST request
const result = await apiPost('/api/users', { name: 'John', email: 'john@example.com' })
```

**Opción 2: Usando la variable de entorno directamente**
```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL
const response = await fetch(`${apiUrl}/api/endpoint`)
```

**Opción 3: Health Check**
```typescript
import { checkApiHealth } from '@/lib/api'

const isHealthy = await checkApiHealth()
if (isHealthy) {
  console.log('✅ API funcionando correctamente')
} else {
  console.error('❌ API no responde')
}
```

## 🔍 Verificar Configuración

Para verificar que todo está configurado correctamente, puedes agregar temporalmente en cualquier componente:

```typescript
import { logApiConfig } from '@/lib/api'

// En un useEffect o al cargar el componente
useEffect(() => {
  logApiConfig() // Muestra la configuración en la consola
}, [])
```

## ⚠️ Recordatorios Importantes

### 1. Reiniciar el Servidor
**Cada vez que modifiques `.env.local`, DEBES reiniciar el servidor:**
```bash
# Presiona Ctrl+C para detener
# Luego ejecuta:
npm run dev
```

### 2. Verificar el Puerto del Backend
- El puerto predeterminado en `.env.local` es `3000`
- Si tu backend corre en otro puerto (por ejemplo `3007`), **debes actualizar `.env.local`**
- Verifica en el código de tu backend o en la consola cuando lo ejecutas

### 3. El Prefijo `NEXT_PUBLIC_`
- **Es obligatorio** para que Next.js exponga la variable al navegador
- Sin este prefijo, la variable solo estará disponible en el servidor

### 4. Producción
Cuando despliegues a producción (por ejemplo, Vercel):
1. Ve a la configuración de tu proyecto
2. Agrega la variable de entorno `NEXT_PUBLIC_API_URL` con la URL de producción
3. Ejemplo: `NEXT_PUBLIC_API_URL=https://api.cflegal.cl`

## 📚 Documentación Adicional

Para más información, consulta:
- `docs/API_CONFIGURATION.md` - Documentación completa con ejemplos
- `lib/api.ts` - Código fuente con comentarios detallados
- `.env.example` - Plantilla de configuración

## 🐛 Solución de Problemas

### Problema: Sigo viendo el error 404
**Soluciones:**
1. Verifica que reiniciaste el servidor de desarrollo
2. Verifica que el backend está corriendo
3. Verifica que el puerto en `.env.local` es el correcto
4. Busca en tu código si aún hay algún `fetch` con URL hardcodeada

### Problema: `process.env.NEXT_PUBLIC_API_URL` es undefined
**Soluciones:**
1. Verifica que el archivo `.env.local` existe en la raíz del proyecto
2. Verifica que la variable tiene el prefijo `NEXT_PUBLIC_`
3. Reinicia el servidor de desarrollo (Ctrl+C y `npm run dev`)

### Problema: No sé en qué puerto corre mi backend
**Soluciones:**
1. Busca en el código del backend archivos como `server.js`, `index.js`, `main.py`, etc.
2. Busca líneas como `app.listen(3007)` o `PORT = 3007`
3. Ejecuta tu backend y mira en la consola qué puerto indica
4. Verifica el archivo `package.json` del backend en la sección `scripts`

## 📧 Próximos Pasos

1. **Localiza el código con la URL hardcodeada**: 
   - Busca en tu proyecto llamadas `fetch` con URLs hardcodeadas
   - Reemplázalas usando las funciones de `lib/api.ts`

2. **Configura el puerto correcto**:
   - Identifica el puerto de tu backend
   - Actualiza `.env.local`
   - Reinicia el servidor

3. **Prueba la configuración**:
   - Usa `logApiConfig()` para verificar
   - Haz una llamada de prueba con `checkApiHealth()`

---

**Fecha de implementación**: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
**Autor**: Refactorización automática de API

