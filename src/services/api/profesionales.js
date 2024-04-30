const API_URL = 'https://vps-4057595-x.dattaweb.com/profesionales/'

// Función para obtener todos los profesionales
export const getAllProfesionales = async () => {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('Error en la solicitud')
    }
    return await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}

// Función para crear un nuevo profesional
export const createProfesional = async (data) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    const response = await fetch(API_URL, options)

    if (response.ok) {
      console.log('Usuario creado exitosamente')
    } else {
      const errorData = await response.json() // Captura el cuerpo de la respuesta si hay error

      console.error(
        `Error en la solicitud: ${response.status} `,
        response.statusText,
        errorData // Imprime también los detalles del error si están disponibles
      )
    }
  } catch (error) {
    console.error('Error creando usuario:', error)
  }
}

// Funcion para obtener profesionales filtrados por profesion y ordenados desde el mas cerca al mas lejos

export const getFilteredAndSortedProfessionalsByDistance = async (data) => {
  try {
    const response = await fetch(
      API_URL +
        `?profesion=${data.profesion}&latitud=${data.latitud}&longitud=${data.longitud}`
    )
    if (!response.ok) {
      throw new Error('Error en la solicitud')
    }
    const onj = await response.json()
    const res = onj.filter((prof) => {
      return /\d/.test(prof.ubicacion)
    })
    console.log(res)
    return res
  } catch (error) {
    console.error('Error:', error)
  }
}
