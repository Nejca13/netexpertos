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
      throw new Error('Error al iniciar sesión')
    }

    // Obtener los datos del usuario después del inicio de sesión exitoso
    const userDataResponse = await fetch(
      'https://vps-4057595-x.dattaweb.com/clientes'
    )
    if (!userDataResponse.ok) {
      throw new Error('Error al obtener los datos del usuario')
    }

    // Parsear los datos del usuario en formato JSON
    const userData = await userDataResponse.json()
    // Buscar el usuario correspondiente al nombre de usuario proporcionado
    const user = userData.find((item) => item.correo === loginData.username)
    if (!user) {
      throw new Error('Usuario no encontrado')
    }
    return user
  } catch (error) {
    // Manejar cualquier error ocurrido durante el proceso
    console.error('Error:', error.message)
  }
}

/**
 * Realiza el proceso de cierre de sesión de un usuario.
 */
export const userLogout = async () => {
  try {
    // Realizar la solicitud de cierre de sesión
    const logoutResponse = await fetch(
      'https://vps-4057595-x.dattaweb.com/users-form/logout',
      {
        method: 'POST', // O el método HTTP adecuado para tu API de cierre de sesión
        // Puedes agregar encabezados u otros datos según los requisitos de tu API
      }
    )
    if (!logoutResponse.ok) {
      console.log('error')
      throw new Error('Error al cerrar sesión')
    }

    // Eliminar los datos del usuario del almacenamiento local (si es necesario)
    // Por ejemplo, puedes limpiar el sessionStorage o localStorage
    sessionStorage.removeItem('user')
    // localStorage.removeItem('user')  // Si guardaste el usuario en el localStorage

    // Redirigir al usuario a la página de inicio de sesión u otra página relevante
    window.location.href = '/' // Cambia '/login' según la ruta adecuada
  } catch (error) {
    // Manejar cualquier error ocurrido durante el proceso
    console.error('Error:', error.message)
  }
}