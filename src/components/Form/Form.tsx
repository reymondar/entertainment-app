import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { FormProps, FormField } from "../../types"
import * as styles from './Form.module.scss'
import apis from '../../api/api'
import { navigate } from "gatsby"

type Inputs = {
  username: 'username' | 'password',
  password: string
}


const MultiForm = ({type, items}: FormProps ) => {

  const [isLoading, setIsLoading] = useState(false)

   const {
      register, 
      handleSubmit,
      watch,   
      formState: { errors },
      setError
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
      setIsLoading(true)

      try { 
        const sessionId = await apis.loginUser(data)
        
        localStorage.setItem('sessionId',sessionId.session_id)
        
        navigate("/")
      }
      catch (error: any) {
        if (error.message === 'Invalid username and/or password: You did not provide a valid login.') setError('root', {type: 'credentials', message: 'You did not provide a valid login.'})
        else setError('root', {type: 'server', message: 'Something unexpected happened. Please try again later.'})   
      }

      setIsLoading(false)
    }
  
    const handleGuest = async () => {
      try {
        const sessionId = await apis.loginGuest()

        localStorage.setItem('guestSessionId',sessionId.guest_session_id)

        navigate("/")
      } 
      catch (error: any) {
        setError('root', {type: 'server', message: 'Something unexpected happened. Please try again later.'})   
      }
    }
    
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
         {items.map((item: FormField, i: number) => {
            return <input 
                      className={styles.inputs}
                      key={i} 
                      defaultValue="" {...register(item.name, { required: true} )}
                      type={item.type}
                      placeholder={item.label}
                    />
         })}
        {errors.root && <p className={styles.error}>{errors.root.message}</p>}
        {!isLoading
        ?
        <button type="submit">{type == 'login' ? 'Login to your account' : 'Create an account'}</button>
        :
        <button disabled={isLoading}>Loading...</button>
        }
        {!isLoading
        ?
        <button onClick={handleGuest} style={{'marginTop':'1rem'}}>{"Enter as Guest"}</button>
        :
        <button disabled={isLoading}>Loading...</button>
        }
      </form>
    )
}

export default MultiForm 