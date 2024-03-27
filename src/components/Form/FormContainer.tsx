import React, { useState } from "react"
import MultiForm from "./Form"
import { FormProps } from "../../types"
import * as styles from "./Form.module.scss"
import Modal from "../modal/Modal"

const FormContainer = (props: FormProps) => {

   const [isOpen, setIsOpen] = useState(false)

   return(
      <>
         {!isOpen && <Modal setIsOpen={setIsOpen} />}
         <div className={styles.container}>
            <h1>{props.type.charAt(0).toUpperCase() + props.type.slice(1)}</h1>
            <MultiForm setIsOpen={setIsOpen} {...props} />
            {props.type == 'login' 
            ?
            <div className={styles.link}>
               <h2>Dont have an account?</h2><a>Sign up</a>
            </div>
            :
            <div className={styles.link}>
               <h2>Already have an account?</h2><a>Login</a>
            </div>
            }
         </div>
      </>
   )
}
 
export default FormContainer