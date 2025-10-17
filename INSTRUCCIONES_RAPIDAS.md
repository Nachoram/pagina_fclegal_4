# 🚀 Instrucciones Rápidas - Refactorización de API Completada

## ✅ ¿Qué se hizo?

Se implementó un sistema robusto y configurable para manejar las URLs de las APIs, eliminando URLs hardcodeadas.

## ⚡ Acción Inmediata Requerida

### Paso 1: Identifica el puerto de tu backend

Busca en tu proyecto de backend el puerto donde corre. Ejemplos comunes:
- `3001`
- `3007` (el que mostraba el error)
- `8000`
- `5000`

**¿Cómo encontrarlo?**
- Busca archivos como `server.js`, `index.js`, `app.py`, `main.py`
- Busca líneas como: `app.listen(3007)`, `PORT = 3007`, o `server.listen(PORT)`
- O ejecuta tu backend y mira la consola

### Paso 2: Actualiza el archivo `.env.local`

Abre el archivo `.env.local` en la raíz del proyecto y cambia el puerto:

```env
# Si tu backend corre en el puerto 3007 (según tu error original):
NEXT_PUBLIC_API_URL=http://localhost:3007

# O si corre en otro puerto, por ejemplo 3001:
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Paso 3: Reinicia el servidor de desarrollo

**⚠️ ESTO ES OBLIGATORIO - Las variables de entorno solo se leen al iniciar**

```bash
# 1. Ve a la terminal donde corre Next.js
# 2. Presiona Ctrl+C para detener el servidor
# 3. Ejecuta nuevamente:
npm run dev
```

### Paso 4: Busca y reemplaza URLs hardcodeadas

Si aún tienes el error, busca en tu código cualquier llamada `fetch` con URLs hardcodeadas.

**❌ Busca código como este:**
```typescript
fetch('http://localhost:3007/api/endpoint')
fetch('http://localhost:3007/')
```

**✅ Reemplázalo con:**
```typescript
import { apiGet } from '@/lib/api'

const data = await apiGet('/api/endpoint')
```

**O alternativa simple:**
```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL
fetch(`${apiUrl}/api/endpoint`)
```

## 📁 Archivos Creados para ti

1. **`.env.local`** - Configuración de variables de entorno (YA EXISTE)
2. **`.env.example`** - Plantilla de ejemplo (YA EXISTE)
3. **`lib/api.ts`** - Utilidades para llamadas a la API (USA ESTE)
4. **`docs/API_CONFIGURATION.md`** - Documentación completa
5. **`components/examples/ApiExample.tsx`** - Componente de ejemplo
6. **`CAMBIOS_API_REFACTORIZACION.md`** - Resumen detallado de cambios

## 🔍 Cómo Usar las Utilidades

### Ejemplo Simple - GET Request

```typescript
import { apiGet } from '@/lib/api'

// En un componente o función
const fetchData = async () => {
  try {
    const data = await apiGet('/api/users')
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### Ejemplo Simple - POST Request

```typescript
import { apiPost } from '@/lib/api'

const createData = async () => {
  try {
    const result = await apiPost('/api/users', {
      name: 'Juan',
      email: 'juan@example.com'
    })
    console.log('Creado:', result)
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### Verificar Configuración (Debugging)

```typescript
import { logApiConfig, checkApiHealth } from '@/lib/api'

// Mostrar configuración en consola
logApiConfig()

// Verificar que el backend responde
const isHealthy = await checkApiHealth()
console.log('Backend funcionando:', isHealthy)
```

## 🐛 Si Sigues Viendo el Error 404

### Checklist:

- [ ] ¿Actualizaste el puerto en `.env.local`?
- [ ] ¿Reiniciaste el servidor de desarrollo? (Ctrl+C y `npm run dev`)
- [ ] ¿Tu backend está corriendo?
- [ ] ¿El puerto en `.env.local` coincide con el puerto del backend?
- [ ] ¿Buscaste en el código URLs hardcodeadas con `fetch('http://localhost`?

### Buscar URLs Hardcodeadas

Ejecuta estos comandos en la terminal para buscar:

```bash
# Buscar 'localhost' en archivos TypeScript/JavaScript
grep -r "localhost" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" .

# Buscar 'fetch(' en el código
grep -r "fetch(" --include="*.ts" --include="*.tsx" .
```

O usa el buscador de VS Code:
1. Presiona `Ctrl+Shift+F`
2. Busca: `fetch(`
3. Revisa cada resultado

## 📚 Documentación Completa

Para más detalles, lee:
- **`CAMBIOS_API_REFACTORIZACION.md`** - Resumen completo de todos los cambios
- **`docs/API_CONFIGURATION.md`** - Guía completa con ejemplos
- **`lib/api.ts`** - Código fuente con comentarios

## 🎯 Resumen de 30 Segundos

1. **Abre `.env.local`**
2. **Cambia `3000` por el puerto de TU backend** (probablemente `3007`)
3. **Reinicia el servidor**: Ctrl+C y `npm run dev`
4. **Si el error persiste**: Busca `fetch('http://localhost` en tu código y reemplázalo

## ❓ ¿Necesitas Ayuda?

Si después de seguir estos pasos sigues teniendo problemas:

1. Abre la consola del navegador (F12)
2. Ejecuta en la consola de tu código:
   ```typescript
   import { logApiConfig } from '@/lib/api'
   logApiConfig()
   ```
3. Revisa qué URL aparece
4. Verifica que esa URL coincida con donde corre tu backend

---

**¡Listo!** Con estos cambios, tu proyecto ahora tiene un sistema robusto y configurable para las APIs. 🎉

