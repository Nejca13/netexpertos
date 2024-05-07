export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('UserDataDB', 1)

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      const objectStore = db.createObjectStore('users', {
        keyPath: 'id',
        autoIncrement: true,
      })
      objectStore.createIndex('username', 'username', { unique: true })
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

export const addUser = async (userData) => {
  const db = await openDatabase()
  const transaction = db.transaction(['users'], 'readwrite')
  const objectStore = transaction.objectStore('users')
  const request = objectStore.put(userData)

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

export const getUser = async () => {
  const db = await openDatabase()
  const transaction = db.transaction(['users'], 'readonly')
  const objectStore = transaction.objectStore('users')
  const request = objectStore.openCursor()

  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      const cursor = event.target.result
      if (cursor) {
        resolve(cursor.value) // Retorna el valor del primer objeto encontrado
      } else {
        resolve(null) // Retorna null si no se encontró ningún objeto
      }
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

export const clearUsers = async () => {
  const db = await openDatabase()
  const transaction = db.transaction(['users'], 'readwrite')
  const objectStore = transaction.objectStore('users')
  const request = objectStore.clear()

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve()
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}
