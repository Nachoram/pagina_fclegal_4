/**
 * API Utilities - CF Legal
 * 
 * Este archivo centraliza todas las configuraciones y utilidades relacionadas con las llamadas API.
 * 
 * IMPORTANTE: Después de modificar .env.local, debes:
 * 1. Detener el servidor de desarrollo (Ctrl+C)
 * 2. Reiniciar con: npm run dev
 * 3. Next.js solo lee las variables de entorno al iniciar
 * 
 * CONFIGURACIÓN:
 * - Verifica en qué puerto corre tu backend
 * - Ajusta NEXT_PUBLIC_API_URL en .env.local si es necesario
 * - Ejemplo: Si tu backend corre en puerto 3007, usa:
 *   NEXT_PUBLIC_API_URL=http://localhost:3007
 */

/**
 * Obtiene la URL base de la API desde las variables de entorno
 * @returns URL base de la API o undefined si no está configurada
 */
export function getApiUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_API_URL
}

/**
 * Verifica si la URL de la API está configurada correctamente
 * @returns true si está configurada, false si no
 */
export function isApiConfigured(): boolean {
  const apiUrl = getApiUrl()
  return apiUrl !== undefined && apiUrl !== ''
}

/**
 * Interfaz para opciones de fetch personalizadas
 */
interface ApiFetchOptions extends RequestInit {
  endpoint: string
}

/**
 * Realiza una llamada fetch a la API usando la URL base configurada
 * 
 * @example
 * // GET request
 * const data = await apiFetch({ endpoint: '/api/users' })
 * 
 * @example
 * // POST request
 * const result = await apiFetch({
 *   endpoint: '/api/users',
 *   method: 'POST',
 *   body: JSON.stringify({ name: 'John' })
 * })
 * 
 * @param options Opciones de fetch incluyendo el endpoint
 * @returns Promise con la respuesta de la API
 * @throws Error si la API no está configurada o si la llamada falla
 */
export async function apiFetch<T = any>(
  options: ApiFetchOptions
): Promise<T> {
  const apiUrl = getApiUrl()
  
  if (!apiUrl) {
    console.error(
      '❌ NEXT_PUBLIC_API_URL no está definida en .env.local\n' +
      '   Por favor:\n' +
      '   1. Verifica que existe el archivo .env.local en la raíz del proyecto\n' +
      '   2. Agrega: NEXT_PUBLIC_API_URL=http://localhost:TU_PUERTO\n' +
      '   3. Reinicia el servidor de desarrollo (Ctrl+C y npm run dev)'
    )
    throw new Error('API URL no configurada. Revisa la consola para más información.')
  }

  const { endpoint, ...fetchOptions } = options
  
  // Asegurarse de que el endpoint comienza con /
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  
  const url = `${apiUrl}${normalizedEndpoint}`

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    })

    if (!response.ok) {
      throw new Error(
        `Error en la API: ${response.status} ${response.statusText} - ${url}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Error al hacer fetch a la API:', error)
    throw error
  }
}

/**
 * Realiza una llamada GET a la API
 * 
 * @example
 * const users = await apiGet('/api/users')
 * 
 * @param endpoint Endpoint de la API (ejemplo: '/api/users')
 * @param options Opciones adicionales de fetch
 * @returns Promise con los datos de la respuesta
 */
export async function apiGet<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  return apiFetch<T>({
    endpoint,
    method: 'GET',
    ...options,
  })
}

/**
 * Realiza una llamada POST a la API
 * 
 * @example
 * const newUser = await apiPost('/api/users', { name: 'John', email: 'john@example.com' })
 * 
 * @param endpoint Endpoint de la API
 * @param data Datos a enviar en el body
 * @param options Opciones adicionales de fetch
 * @returns Promise con los datos de la respuesta
 */
export async function apiPost<T = any>(
  endpoint: string,
  data: any,
  options?: RequestInit
): Promise<T> {
  return apiFetch<T>({
    endpoint,
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  })
}

/**
 * Realiza una llamada PUT a la API
 * 
 * @example
 * const updated = await apiPut('/api/users/123', { name: 'John Updated' })
 * 
 * @param endpoint Endpoint de la API
 * @param data Datos a enviar en el body
 * @param options Opciones adicionales de fetch
 * @returns Promise con los datos de la respuesta
 */
export async function apiPut<T = any>(
  endpoint: string,
  data: any,
  options?: RequestInit
): Promise<T> {
  return apiFetch<T>({
    endpoint,
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
  })
}

/**
 * Realiza una llamada DELETE a la API
 * 
 * @example
 * await apiDelete('/api/users/123')
 * 
 * @param endpoint Endpoint de la API
 * @param options Opciones adicionales de fetch
 * @returns Promise con los datos de la respuesta
 */
export async function apiDelete<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  return apiFetch<T>({
    endpoint,
    method: 'DELETE',
    ...options,
  })
}

/**
 * Verifica el estado de la API (health check)
 * 
 * @example
 * const isHealthy = await checkApiHealth()
 * if (isHealthy) {
 *   console.log('API está funcionando correctamente')
 * }
 * 
 * @param healthEndpoint Endpoint de health check (por defecto '/health' o '/')
 * @returns Promise<boolean> true si la API responde correctamente
 */
export async function checkApiHealth(
  healthEndpoint: string = '/health'
): Promise<boolean> {
  const apiUrl = getApiUrl()
  
  if (!apiUrl) {
    console.warn('⚠️ API URL no configurada - verifica .env.local')
    return false
  }

  try {
    const url = `${apiUrl}${healthEndpoint}`
    const response = await fetch(url, {
      method: 'GET',
      // Timeout después de 5 segundos
      signal: AbortSignal.timeout(5000),
    })
    
    return response.ok
  } catch (error) {
    console.error('❌ Health check falló:', error)
    return false
  }
}

/**
 * Muestra información de configuración de la API en la consola (útil para debugging)
 */
export function logApiConfig(): void {
  const apiUrl = getApiUrl()
  console.log('='.repeat(50))
  console.log('📋 Configuración de API - CF Legal')
  console.log('='.repeat(50))
  console.log('API URL:', apiUrl || '❌ NO CONFIGURADA')
  console.log('Estado:', isApiConfigured() ? '✅ Configurada' : '❌ Falta configurar')
  
  if (!isApiConfigured()) {
    console.log('\n⚠️  ACCIÓN REQUERIDA:')
    console.log('1. Crea/verifica el archivo .env.local en la raíz del proyecto')
    console.log('2. Agrega: NEXT_PUBLIC_API_URL=http://localhost:TU_PUERTO')
    console.log('3. Reinicia el servidor de desarrollo (Ctrl+C y npm run dev)')
  }
  
  console.log('='.repeat(50))
}

