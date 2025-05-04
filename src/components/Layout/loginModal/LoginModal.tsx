import React, { useState } from 'react'
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
}

interface LoginModalProps {
  open: boolean
  onClose: () => void
}

const LoginModal = ({ open, onClose }: LoginModalProps) => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(userName, password)
      onClose()
      navigate('/')
    } catch (err) {
      setError('Вход не выполнен')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography
          variant='h5'
          component='h2'
          mb={3}
          color='text.primary'
          fontWeight='bold'
        >
          Вход в систему
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label='Имя пользователя'
              variant='outlined'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />

            <TextField
              label='Пароль'
              type='password'
              variant='outlined'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />

            {error && (
              <Typography color='error' variant='body2' sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              type='submit'
              variant='contained'
              size='large'
              disabled={isLoading || userName.length === 0 || !password.length}
              endIcon={
                isLoading ? (
                  <CircularProgress size={20} color='inherit' />
                ) : null
              }
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}

export default LoginModal
