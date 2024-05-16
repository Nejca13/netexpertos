import { clearUsers } from '@/utils/indexedDataBase'

const API_URL = 'https://vps-4057595-x.dattaweb.com/users-form/'

/**
 * Realiza el proceso de inicio de sesión de un usuario.
 * @param {Object} loginData - Datos de inicio de sesión del usuario.
 * @param {string} loginData.username - Nombre de usuario.
 * @param {string} loginData.password - Contraseña del usuario.
 */
export const userLogin = async (
  loginData,
  setErrorMessage,
  setIsLoading,
  setLoadingMessage
) => {
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
    const loginResponse = await fetch(API_URL + 'login1/', requestOptions)

    if (!loginResponse.ok) {
      // Si la respuesta no es exitosa, lanzar un error con el detalle del error
      const errorData = await loginResponse.json()
      console.error(errorData.detail)
      setIsLoading(false)
      setErrorMessage(errorData.detail)
      throw new Error('Error al iniciar sesión')
    }

    // Si la solicitud es exitosa, devolver los datos
    const data = await loginResponse.json()
    setLoadingMessage(data.message)

    return true
  } catch (error) {
    // Manejar cualquier error ocurrido durante el proceso

    return error //  Relanzar el error para que sea manejado en el contexto superior si es necesario
  }
}

export const userLogout = async () => {
  try {
    clearUsers()
    window.location.href = '/' // Cambia '/login' según la ruta adecuada
  } catch (error) {
    // Manejar cualquier error ocurrido durante el proceso
    console.error('Error:', error.message)
  }
}

export const verifyCode = async (data) => {
  const formData = new URLSearchParams()
  formData.append('username', data.username)
  formData.append('otp', data.otp)
  try {
    const response = await fetch(API_URL + 'login2/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    })

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      const error = await response.json()
      console.log(error.detail)
      throw error
    }
  } catch (error) {}
}
