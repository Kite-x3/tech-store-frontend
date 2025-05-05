import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Link,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

const LoginBox = () => {
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
      navigate('/')
    } catch (err) {
      setError('Неверные учетные данные')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      sx={{
        width: '22vw',
        mx: 'auto',
        mt: 8,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Typography
        variant='h4'
        component='h1'
        mb={3}
        color='text.primary'
        fontWeight='bold'
        textAlign='center'
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
          />

          <TextField
            label='Пароль'
            type='password'
            variant='outlined'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          {error && (
            <Typography color='error' variant='body2'>
              {error}
            </Typography>
          )}

          <Button
            type='submit'
            variant='contained'
            size='large'
            disabled={isLoading || !userName || !password}
            endIcon={
              isLoading ? <CircularProgress size={20} color='inherit' /> : null
            }
            fullWidth
            sx={{
              py: 1.5,
              fontWeight: 'bold',
              textTransform: 'none',
            }}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </Button>
        </Stack>
      </form>

      <Box mt={3} textAlign='center'>
        <Typography variant='body2' sx={{ color: 'black' }}>
          Нет аккаунта?{' '}
          <Link
            href='/register'
            onClick={(e) => {
              e.preventDefault()
              navigate('/register')
            }}
            sx={{ cursor: 'pointer' }}
          >
            Зарегистрироваться
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default LoginBox
