# 🔴 SOLUCIÓN PARA ERROR 500 - Next.js

## 🚨 Problema Actual

Estás recibiendo errores **500 (Internal Server Error)** en tu servidor Next.js en el puerto 3007:

```
GET http://localhost:3007/ 500 (Internal Server Error)
GET http://localhost:3007/_next/static/chunks/main.js 500
GET http://localhost:3007/_next/static/chunks/react-refresh.js 500
GET http://localhost:3007/_next/static/chunks/pages/_app.js 500
```

**¿Qué significa?** 
- ✅ Tu servidor SÍ está corriendo en el puerto 3007
- ❌ Hay un ERROR en tu código del lado del servidor que impide que Next.js compile correctamente

## 🔍 PASO 1: Encuentra el Error en los Logs del Servidor

**El error específico DEBE estar en la terminal donde ejecutaste `npm run dev`**

### Instrucciones:

1. Ve a la terminal/consola donde está corriendo tu servidor Next.js
2. Busca mensajes de error en color rojo
3. Busca líneas que digan:
   - `Error:`
   - `SyntaxError:`
   - `ReferenceError:`
   - `TypeError:`
   - Stack traces con rutas de archivo

### Ejemplo de cómo se ve un error típico:

```
Error: Cannot find module 'next-themes'
  at app/layout.tsx:5:24
```

O:

```
SyntaxError: Unexpected token
  at app/page.tsx:120:15
```

## 🛠️ PASO 2: Soluciones Comunes

### Solución A: Problema con `next-themes`

Veo que tienes `next-themes` en tu código. Si el error menciona `next-themes`, ejecuta:

```bash
npm install next-themes
```

Luego reinicia el servidor:
```bash
# Ctrl+C para detener
npm run dev
```

### Solución B: Cache corrupto de Next.js

A veces Next.js tiene problemas con su cache. Límpiala:

```bash
# Detén el servidor (Ctrl+C)
# Luego ejecuta:
Remove-Item -Recurse -Force .next
npm run dev
```

### Solución C: Dependencias faltantes o corruptas

Reinstala todas las dependencias:

```bash
# Detén el servidor (Ctrl+C)
# Borra node_modules
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstala
npm install

# Reinicia
npm run dev
```

### Solución D: Problema con el puerto 3007

Si Next.js está intentando usar el puerto 3007 y otro proceso ya lo está usando:

```bash
# Mata todos los procesos de Node
taskkill /F /IM node.exe

# Reinicia el servidor
npm run dev
```

## 🔧 PASO 3: Verifica los Archivos Modificados

Según Git, tienes cambios en:
- `app/layout.tsx`
- `app/page.tsx`
- `components/theme-provider.tsx`
- `package.json`
- `package-lock.json`

### Opción 1: Revierte los cambios temporalmente

Si quieres probar si los cambios recientes causaron el problema:

```bash
# Guarda tus cambios (por si acaso)
git stash

# Prueba el servidor
npm run dev

# Si funciona, el problema está en tus cambios recientes
# Para recuperar tus cambios:
git stash pop
```

### Opción 2: Verifica importaciones

Abre cada archivo y verifica que:
- Todas las importaciones existen
- No hay comillas sin cerrar
- No hay llaves `{}` sin cerrar
- No hay paréntesis sin cerrar

## 📋 PASO 4: Proceso de Diagnóstico Completo

Ejecuta estos comandos uno por uno:

```powershell
# 1. Detén todos los servidores Node
taskkill /F /IM node.exe

# 2. Limpia el cache de Next.js
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# 3. Limpia node_modules (opcional, solo si lo anterior no funciona)
# Remove-Item -Recurse -Force node_modules
# Remove-Item package-lock.json
# npm install

# 4. Reinicia el servidor y OBSERVA LOS LOGS
npm run dev
```

## 🎯 ¿Cómo Saber si se Solucionó?

Cuando el servidor inicie correctamente, verás algo como:

```
✓ Ready in 2.5s
○ Local:    http://localhost:3007
○ Network:  use --experimental-https

✓ Compiled in 1.2s
```

Y en el navegador, tu página cargará sin errores 500.

## 📞 Si Aún No Funciona

Por favor, copia y pega aquí:

1. **El error COMPLETO de la terminal** (donde corre `npm run dev`)
2. **Los últimos cambios que hiciste** antes de que apareciera el error
3. **Cualquier mensaje que mencione archivos específicos**

## 🔴 ACCIÓN INMEDIATA

**Ejecuta esto AHORA en PowerShell:**

```powershell
# Navega a tu proyecto
cd C:\Users\ignac\pagina_fclegal_2

# Mata todos los procesos Node
taskkill /F /IM node.exe

# Limpia cache
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Reinicia
npm run dev
```

**Luego:**
1. Observa la terminal donde corre `npm run dev`
2. Copia CUALQUIER mensaje de error que aparezca en rojo
3. Envíamelo para ayudarte a solucionarlo

---

## 📝 Nota Importante sobre las Variables de Entorno

Ya actualicé tu `.env.local` para usar el puerto 3007. Sin embargo, **esto NO solucionará el error 500**. El error 500 es un problema en tu código, no en la configuración de API.

Una vez que soluciones el error 500:
1. Reinicia el servidor
2. Las utilidades de API en `lib/api.ts` funcionarán correctamente
3. Tu aplicación cargará sin problemas

