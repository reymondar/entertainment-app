import React, { useState } from "react";
import * as styles from './Modal.module.scss'

const Modal = () => {
   
   const [isOpen, setIsOpen] = useState(false)

   return(
      <div className={styles.container}>
         <div className={styles.modal}>
            <div className={styles.wrapper}> 
            <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className={styles.checkmark__circle} cx="26" cy="26" r="25" fill="none"/> <path className={styles.checkmark__check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            </div>
            <p>Accediste como: INVITADO</p>
         <button>Continuar</button>
         </div>
      </div>
   )
}

export default Modal