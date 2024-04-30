import { useState, useEffect } from 'react'

function useGeolocation() {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Obtener la ubicación guardada del localStorage al montar el componente
    const storedLocation = JSON.parse(localStorage.getItem('userLocation'))
    if (storedLocation) {
      setLocation(storedLocation)
    }
    // Función para obtener la ubicación actual
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const newLocation = { latitude, longitude }

          // Comprobar si la nueva ubicación es diferente de la anterior
          if (
            !location ||
            newLocation.latitude !== location.latitude ||
            newLocation.longitude !== location.longitude
          ) {
            setLocation(newLocation)

            // Guardar la nueva ubicación en el localStorage
            localStorage.setItem('userLocation', JSON.stringify(newLocation))
          }
        },
        (error) => {
          setError(error.message)
        }
      )
    }

    // Obtener la ubicación actual si no hay una ubicación guardada
    if (!storedLocation) {
      getCurrentLocation()
    }

    // Establecer un intervalo para obtener la ubicación actual cada cierto tiempo
    /* const watchId = navigator.geolocation.watchPosition(
      () => {
        getCurrentLocation()
      },
      (error) => {
        setError(error.message)
      }
    )

    // Limpiar el intervalo al desmontar el componente
    return () => {
      navigator.geolocation.clearWatch(watchId)
    } */
  }, [])

  return { location, error }
}

export default useGeolocation
