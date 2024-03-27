import React from "react"
import MultiForm from "../components/Form/Form"
import { FormField } from "../types"
import FormContainer from "../components/Form/FormContainer"

const loginItems: FormField[] = [
   {
      name: 'username',
      label: 'Username',
      type: 'text'
   },
   {
      name: 'password',
      label: 'Password',
      type: 'password'
   }   
]

const Login = () => <FormContainer type='login' items={loginItems} />


export default Login