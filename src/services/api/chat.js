const API_URL = 'https://vps-4057595-x.dattaweb.com/chat/conversaciones/'

export const getChats = async (id1, id2) => {
  const response = await fetch(API_URL + id1 + '/' + id2, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.ok) {
    const responseData = await response.json()
    console.log(responseData)
    return responseData
  } else {
    const error = await response.json()
    console.log(error)
    return error
  }
}
