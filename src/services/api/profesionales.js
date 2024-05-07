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
    throw error
  }
}

// Función para crear un nuevo profesional
export const createProfesional = async (data) => {
  const [nombre, apellido] = data.nombre_apellido.split(' ')
  const newData = {
    rol: 'Profesional',
    nombre: nombre, // Puedes asignar el nombre y apellido según sea necesario
    apellido: apellido,
    numero: data.telefono,
    correo: data.correo,
    password: data.password,
    ubicacion: data.ubicacion,
    calificacion: 0,
    experiencia_laboral_años: data.experiencia_laboral_años
      ? parseInt(data.experiencia_laboral_años)
      : 0,
    recomendaciones: 0,
    fotos_trabajos: data.fotos_trabajos,
    foto_perfil: data.foto_perfil,
    horarios_atencion: `de ${data.horario_apertura} - a ${data.horario_cierre}`,
    nacimiento: data.nacimiento,
    rubro_nombre: data.rubro_nombre,
    profesion_nombre: data.profesion_nombre,
    acerca_de_mi: data.acerca_de_mi,
    fecha_registro: new Date().toISOString(), // Obtener la fecha actual en formato ISO
  }
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    }

    const response = await fetch(API_URL, options)

    if (response.ok) {
      console.log('Usuario creado exitosamente')
      return true
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

export const getFilteredAndSortedProfessionalsByDistance = async (
  data,
  setErrorMessage
) => {
  try {
    const response = await fetch(
      API_URL +
        `cercanos/${data.profesion}?latitud=${data.latitud}&longitud=${data.longitud}&page=1&page_size=10`
    )
    if (!response.ok) {
      const error = await response.json()
      console.log(error)
      throw new Error('Error en la solicitud')
    }
    const result = await response.json()

    console.log(result.profesionales_cercanos)
    if (result.profesionales_cercanos.length === 0) {
      setErrorMessage('No hay profesionales cerca')
    }
    return result
  } catch (error) {
    console.log(error)
    throw error
  }
}
