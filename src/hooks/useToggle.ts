import { useState } from 'react'

// 토글 훅 (개별 동작)
const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => setIsOpen(!isOpen)

  return {
    isOpen,
    handleToggle
  }
}

export default useToggle
