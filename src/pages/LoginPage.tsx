import { Box } from '@mui/material'
import { useState } from 'react'
import LoginModal from '../components/Layout/loginModal/LoginModal'

export const LoginPage = () => {
  const [open, setOpen] = useState(true)

  return (
    <Box>
      <LoginModal open={open} onClose={() => setOpen(false)} />
    </Box>
  )
}
