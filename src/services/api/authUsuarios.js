import { clearUsers } from '@/utils/indexedDataBase'

const API_URL = 'https://vps-4057595-x.dattaweb.com/users-form/login/'

/**
 * Realiza el proceso de inicio de sesión de un usuario.
 * @param {Object} loginData - Datos de inicio de sesión del usuario.
 * @param {string} loginData.username - Nombre de usuario.
 * @param {string} loginData.password - Contraseña del usuario.
 */
export const userLogin = async (loginData) => {
  try {
    // Construir los datos del formulario para la solicitud de inicio de sesión
    const formData = new URLSearchParams()
    formData.append('username', loginData.username)
    formData.append('password', loginData.password)

    // Configuración de la solicitud de inicio de sesión
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    }

    // Realizar la solicitud de inicio de sesión
    const loginResponse = await fetch(API_URL, requestOptions)

    if (!loginResponse.ok) {
      // Si la respuesta no es exitosa, lanzar un error con el detalle del error
      const errorData = await loginResponse.json()
      console.error(errorData.detail)
      throw new Error('Error al iniciar sesión')
    }

    // Si la solicitud es exitosa, devolver los datos
    const data = await loginResponse.json()
    return data
  } catch (error) {
    // Manejar cualquier error ocurrido durante el proceso
    console.error('Error:', error.message)
    return error //  Relanzar el error para que sea manejado en el contexto superior si es necesario
  }
}

/**
 * Realiza el proceso de cierre de sesión de un usuario.
 */
export const userLogout = async () => {
  try {
    // Realizar la solicitud de cierre de sesión
    /* const logoutResponse = await fetch(
      'https://vps-4057595-x.dattaweb.com/users-form/logout',
      {
        method: 'POST', // O el método HTTP adecuado para tu API de cierre de sesión
        // Puedes agregar encabezados u otros datos según los requisitos de tu API
      }
    )
    if (!logoutResponse.ok) {
      const error = await logoutResponse.json()
      console.log(error)
      throw new Error('Error al cerrar sesión')
    } */
    // limpia los valores de la base de datos 'indexedDB'
    clearUsers()

    // Redirigir al usuario a la página de inicio de sesión u otra página relevante
    window.location.href = '/' // Cambia '/login' según la ruta adecuada
  } catch (error) {
    // Manejar cualquier error ocurrido durante el proceso
    console.error('Error:', error.message)
  }
}
