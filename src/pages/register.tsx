import React from "react"
import { FormField } from "../types"
import FormContainer from "../components/Form/FormContainer"

const RegisterItems: FormField[] = [
   {
      name: 'username',
      label: 'Username',
      type: 'username'
   },
   {
      name: 'password',
      label: 'Password',
      type: 'password'
   }   
]

const Register = () => <FormContainer type="register" items={RegisterItems} />

export default Register 