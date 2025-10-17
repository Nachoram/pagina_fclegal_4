/**
 * COMPONENTE DE EJEMPLO - Uso de API con Variables de Entorno
 * 
 * Este archivo muestra cómo usar correctamente las utilidades de API
 * con las variables de entorno configuradas.
 * 
 * ⚠️ IMPORTANTE:
 * - Este es un archivo de EJEMPLO, no forma parte de la aplicación en producción
 * - Úsalo como referencia para implementar tus propias llamadas a la API
 * - Después de modificar .env.local, reinicia el servidor (Ctrl+C y npm run dev)
 */

'use client'

import { useState, useEffect } from 'react'
import { 
  apiGet, 
  apiPost, 
  checkApiHealth, 
  logApiConfig,
  isApiConfigured 
} from '@/lib/api'

export default function ApiExample() {
  const [healthStatus, setHealthStatus] = useState<boolean | null>(null)
  const [isConfigured, setIsConfigured] = useState<boolean>(false)

  useEffect(() => {
    // Verificar configuración al montar el componente
    setIsConfigured(isApiConfigured())
    
    // Mostrar configuración en consola (útil para debugging)
    logApiConfig()

    // Verificar el estado de la API
    checkHealth()
  }, [])

  const checkHealth = async () => {
    try {
      const isHealthy = await checkApiHealth('/health')
      setHealthStatus(isHealthy)
      
      if (isHealthy) {
        console.log('✅ API funcionando correctamente')
      } else {
        console.warn('⚠️ API no responde correctamente')
      }
    } catch (error) {
      console.error('❌ Error al verificar health de API:', error)
      setHealthStatus(false)
    }
  }

  // Ejemplo 1: GET request
  const fetchUsers = async () => {
    try {
      const users = await apiGet('/api/users')
      console.log('Usuarios obtenidos:', users)
      return users
    } catch (error) {
      console.error('Error al obtener usuarios:', error)
    }
  }

  // Ejemplo 2: POST request
  const createUser = async () => {
    try {
      const newUser = await apiPost('/api/users', {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        role: 'user'
      })
      console.log('Usuario creado:', newUser)
      return newUser
    } catch (error) {
      console.error('Error al crear usuario:', error)
    }
  }

  // Ejemplo 3: Fetch con manejo de errores completo
  const fetchWithErrorHandling = async () => {
    try {
      if (!isApiConfigured()) {
        throw new Error('API no está configurada. Verifica .env.local')
      }

      const data = await apiGet('/api/endpoint')
      console.log('Datos obtenidos:', data)
      
      // Procesar los datos aquí
      return data
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error específico:', error.message)
      } else {
        console.error('Error desconocido:', error)
      }
      
      // Mostrar mensaje al usuario
      alert('Hubo un error al conectar con el servidor. Por favor, intenta más tarde.')
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">
          🔧 Componente de Ejemplo - API
        </h1>
        <p className="text-gray-600 mb-4">
          Este componente muestra cómo usar las utilidades de API con variables de entorno.
        </p>
        
        {/* Estado de Configuración */}
        <div className="mb-4 p-4 rounded-lg bg-white border-2 border-gray-200">
          <h2 className="font-semibold mb-2 text-gray-800">Estado de Configuración</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${isConfigured ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className="text-sm">
                API URL: {isConfigured ? '✅ Configurada' : '❌ No configurada'}
              </span>
            </div>
            {isConfigured && (
              <div className="text-xs text-gray-500 ml-5">
                URL: {process.env.NEXT_PUBLIC_API_URL}
              </div>
            )}
          </div>
        </div>

        {/* Estado de Health Check */}
        <div className="mb-4 p-4 rounded-lg bg-white border-2 border-gray-200">
          <h2 className="font-semibold mb-2 text-gray-800">Health Check</h2>
          <div className="flex items-center gap-2">
            {healthStatus === null ? (
              <>
                <span className="w-3 h-3 rounded-full bg-gray-400 animate-pulse"></span>
                <span className="text-sm">Verificando...</span>
              </>
            ) : healthStatus ? (
              <>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-sm">✅ API respondiendo correctamente</span>
              </>
            ) : (
              <>
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="text-sm">❌ API no responde</span>
              </>
            )}
          </div>
          <button 
            onClick={checkHealth}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Verificar nuevamente
          </button>
        </div>

        {/* Mensajes de Advertencia */}
        {!isConfigured && (
          <div className="mb-4 p-4 rounded-lg bg-yellow-50 border-2 border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Acción Requerida</h3>
            <ol className="text-sm text-yellow-700 list-decimal list-inside space-y-1">
              <li>Verifica que existe el archivo <code className="bg-yellow-100 px-1 rounded">.env.local</code> en la raíz</li>
              <li>Agrega: <code className="bg-yellow-100 px-1 rounded">NEXT_PUBLIC_API_URL=http://localhost:TU_PUERTO</code></li>
              <li>Reinicia el servidor de desarrollo (Ctrl+C y <code className="bg-yellow-100 px-1 rounded">npm run dev</code>)</li>
            </ol>
          </div>
        )}
      </div>

      {/* Ejemplos de Uso */}
      <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Ejemplos de Uso</h2>
        
        <div className="space-y-4">
          <div>
            <button
              onClick={fetchUsers}
              disabled={!isConfigured}
              className={`px-4 py-2 rounded text-white font-medium ${
                isConfigured 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Ejemplo: GET /api/users
            </button>
            <p className="text-xs text-gray-500 mt-1">
              Obtener lista de usuarios (abre la consola para ver el resultado)
            </p>
          </div>

          <div>
            <button
              onClick={createUser}
              disabled={!isConfigured}
              className={`px-4 py-2 rounded text-white font-medium ${
                isConfigured 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Ejemplo: POST /api/users
            </button>
            <p className="text-xs text-gray-500 mt-1">
              Crear un nuevo usuario (abre la consola para ver el resultado)
            </p>
          </div>

          <div>
            <button
              onClick={fetchWithErrorHandling}
              disabled={!isConfigured}
              className={`px-4 py-2 rounded text-white font-medium ${
                isConfigured 
                  ? 'bg-purple-500 hover:bg-purple-600' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Ejemplo: Fetch con manejo de errores
            </button>
            <p className="text-xs text-gray-500 mt-1">
              Llamada con manejo completo de errores (abre la consola)
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Abre la consola del navegador (F12) para ver los logs y 
            resultados de las llamadas a la API.
          </p>
        </div>
      </div>

      {/* Código de Ejemplo */}
      <div className="mt-6 bg-gray-900 text-gray-100 rounded-lg p-6">
        <h3 className="font-bold mb-3 text-white">📝 Código de Ejemplo</h3>
        <pre className="text-xs overflow-x-auto">
{`// Importar las utilidades
import { apiGet, apiPost, checkApiHealth } from '@/lib/api'

// Ejemplo 1: GET request
const users = await apiGet('/api/users')

// Ejemplo 2: POST request
const newUser = await apiPost('/api/users', {
  name: 'Juan Pérez',
  email: 'juan@example.com'
})

// Ejemplo 3: Health check
const isHealthy = await checkApiHealth()
if (isHealthy) {
  console.log('✅ API funcionando')
}`}
        </pre>
      </div>
    </div>
  )
}

