import React, { useEffect } from 'react'
import { FaWindowClose } from 'react-icons/fa'
import { useUserContext } from '../context/userContext'

export default function Alert() {
  const { alert, toggleAlert } = useUserContext()
  const { isShown, msg, type } = alert

  useEffect(() => {
    console.log('useeffect call')
    if (isShown) {
      console.log('interval call')
      const interval = setInterval(() => {
        toggleAlert()
      }, 5000)
      return () => {
        clearInterval(interval)
      }
    }
  }, [isShown, toggleAlert])

  let alertState = 'alert-container'
  if (isShown) {
    alertState += ' alert-show'
    if (type === 'danger') alertState += ' alert-danger'
  }

  return (
    <div className={alertState}>
      <div className='alert'>
        <p>{msg}</p>
        <button className='alert-close' onClick={() => toggleAlert()}>
          <FaWindowClose />
        </button>
      </div>
    </div>
  )
}
