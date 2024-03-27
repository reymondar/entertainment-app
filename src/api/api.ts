
const token = process.env.BEARER_TOKEN
const baseURL = process.env.BASE_URL
const API_KEY = process.env.API_KEY

const loginUser = async (data: any) => {
   try {

      //Primer paso, creamos el token
      const tokenCall = await fetch(`${baseURL}/3/authentication/token/new`, {
         headers: {         
            Authorization: `Bearer ${token} `
         }
      })

      if (!tokenCall.ok) throw new Error('No pudimos establecer una conexión segura con TMDB');
      
      const tokenCallParse = await tokenCall.json()
      
      const dbToken = tokenCallParse.request_token
      
      //Segundo paso, lo verificamos con los datos del form
      const login = await fetch(`${baseURL}/3/authentication/token/validate_with_login`,{
         method: 'POST',
         headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${token} `
         },
         body: JSON.stringify({
            'username': data.username,
            'password': data.password,
            'request_token': dbToken
         })
      })
      
      const user = await login.json()
      
      if (!user.success) throw new Error(user.status_message)

      //tercer paso, creamos la sesionId
      const sessionId = await fetch(`${baseURL}/3/authentication/session/new`,{
         method:'POST',
         headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${token} `
         },
         body: JSON.stringify({
            'request_token': dbToken
         })
      })

      const sessionIdRes = await sessionId.json()
      
      if(!sessionIdRes.success) throw new Error(sessionIdRes.status_message)
      
      return sessionIdRes

   }
   catch (error: any) {
      throw new Error(error.message)
   }
}

//login como invitado
const loginGuest = async () => {
   try {
      const sessionId = await fetch(`${baseURL}/3/authentication/guest_session/new`,{
         headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${token} `
         }
      })

      const sessionIdRes = await sessionId.json()

      if(!sessionIdRes.success) throw new Error(sessionIdRes.status_message)
      
      return sessionIdRes

   }
   catch (error: any) {
      throw new Error(error.message)
   }
}


//Buscamos la watchlist
const modifyWatchList = async (type: string, id: string, operation: boolean) => {
   try {
      //Buscamos el id que esté en la memoria
      const sessionId = session()
      console.log(sessionId)

      const modify = await fetch(`${baseURL}/3/account/{account_id}/watchlist?api_key=${API_KEY}&${sessionId}`,{
         method: 'POST',
         headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${token} `
         },
         body: JSON.stringify({
            "media_type": type,
            "media_id": id,
            "watchlist": operation
         })
      })

      const modifyRes = await modify.json()
      console.log(modifyRes)
      if(!modifyRes.success) throw new Error(modifyRes)

      return modifyRes
   }
   catch (error: any) {
      throw new Error(error.message)
   }
}


const getWatchList = async (type: string) => {
   try {
      const sessionId = session()

      console.log(sessionId)

      if(!sessionId) throw new Error('Not Logged in')
      
      const list = await fetch(`${baseURL}/3/account/{account_id}/watchlist/${type}?api_key=${API_KEY}&${sessionId}`, {
         headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${token} `
         }
      })

      if(!list.ok) throw new Error(String(list.status))
      
      const parsedList = await list.json()

      return parsedList.results
   }
   catch (error: any) {
      throw new Error(error.message)
   }
}



const session = () => { 
   const sessionId = localStorage.getItem('sessionId')
   const guestSessionId = localStorage.getItem('guestSessionId')
  
   if (sessionId) return `session_id=${sessionId}` 
   if (guestSessionId) return `guest_session_id=${guestSessionId}`
   else return null
}


export default  {
   loginUser, 
   loginGuest,
   modifyWatchList,
   getWatchList
}