# Configuración de API - CF Legal

## Variables de Entorno

Este proyecto utiliza variables de entorno para configurar las URLs de las APIs de manera robusta y flexible.

## Archivo `.env.local`

El archivo `.env.local` contiene la configuración local del proyecto. **Este archivo NO se sube a Git** por razones de seguridad.

### Variable: `NEXT_PUBLIC_API_URL`

- **Propósito**: Define la URL base para todas las llamadas API desde el cliente
- **Prefijo `NEXT_PUBLIC_`**: Necesario para que Next.js exponga la variable al navegador
- **Valor por defecto**: `http://localhost:3000`

### ⚠️ IMPORTANTE: Reiniciar el Servidor de Desarrollo

**Después de modificar el archivo `.env.local`, DEBES:**

1. Detener el servidor de desarrollo presionando `Ctrl+C` en la terminal
2. Reiniciar el servidor con el comando: `npm run dev`
3. Next.js **solo lee las variables de entorno al iniciar**, no en caliente

### 🔍 Verificar el Puerto de tu Backend

Debes verificar en qué puerto está corriendo tu backend y ajustar el valor en `.env.local`:

```env
# Si tu backend corre en el puerto 3001
NEXT_PUBLIC_API_URL=http://localhost:3001

# Si tu backend corre en el puerto 3007
NEXT_PUBLIC_API_URL=http://localhost:3007

# Si tu backend corre en el puerto 8000
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Cómo Usar la Variable en el Código

### ❌ INCORRECTO (URL Hardcodeada)

```typescript
// NO HAGAS ESTO - URL hardcodeada
const response = await fetch('http://localhost:3007/api/endpoint')
```

### ✅ CORRECTO (Usando Variable de Entorno)

```typescript
// Ejemplo 1: Llamada simple
const apiUrl = process.env.NEXT_PUBLIC_API_URL
const response = await fetch(`${apiUrl}/api/endpoint`)

// Ejemplo 2: Con manejo de errores
async function fetchData() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    
    if (!apiUrl) {
      console.error('NEXT_PUBLIC_API_URL no está definida en .env.local')
      return null
    }
    
    const response = await fetch(`${apiUrl}/api/endpoint`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error al hacer fetch:', error)
    return null
  }
}

// Ejemplo 3: Con opciones adicionales
async function postData(payload: any) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  
  const response = await fetch(`${apiUrl}/api/endpoint`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  
  return response.json()
}
```

### Ejemplo de Función Check (Mencionada en el Problema)

Si tienes una función `check` que hace polling o verifica el estado del servidor:

```typescript
// ✅ FORMA CORRECTA
async function check() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  
  if (!apiUrl) {
    console.warn('API URL no configurada')
    return false
  }
  
  try {
    const response = await fetch(`${apiUrl}/health`)
    return response.ok
  } catch (error) {
    console.error('Error en check:', error)
    return false
  }
}
```

## Solución de Problemas

### Error: `GET http://localhost:3007/ 404 (Not Found)` en bucle

Este error indica que hay una llamada `fetch` intentando conectarse a `http://localhost:3007/` repetidamente.

**Posibles causas:**

1. URL hardcodeada en el código
2. Puerto incorrecto en `.env.local`
3. Backend no está corriendo
4. La ruta del endpoint no existe

**Pasos para solucionarlo:**

1. Busca en el código cualquier `fetch('http://localhost:3007')` y reemplázalo con la variable de entorno
2. Verifica que tu backend esté corriendo en el puerto correcto
3. Actualiza `.env.local` con el puerto correcto
4. Reinicia el servidor de desarrollo (`Ctrl+C` y luego `npm run dev`)

## Verificar que la Variable Está Disponible

Puedes verificar que la variable de entorno está cargada correctamente agregando esto temporalmente en tu código:

```typescript
console.log('API URL configurada:', process.env.NEXT_PUBLIC_API_URL)
```

Si ves `undefined`, significa que:
- El archivo `.env.local` no existe
- La variable no tiene el prefijo `NEXT_PUBLIC_`
- No has reiniciado el servidor de desarrollo

## Para Producción

En producción (por ejemplo, Vercel), debes:

1. Ir a la configuración de tu proyecto
2. Agregar la variable de entorno `NEXT_PUBLIC_API_URL` con la URL de tu API de producción
3. Ejemplo: `NEXT_PUBLIC_API_URL=https://api.cflegal.cl`

