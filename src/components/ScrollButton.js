import React from 'react'
import { FaAngleDoubleUp } from 'react-icons/fa'
import { useUserContext } from '../context/userContext'

const ScrollButton = () => {
  const { height } = useUserContext()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      className={
        height > window.innerHeight + 200
          ? 'scroll-btn show-scroll-btn'
          : 'scroll-btn'
      }
      onClick={scrollToTop}
    >
      <FaAngleDoubleUp />
    </button>
  )
}
export default ScrollButton
