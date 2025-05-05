import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

export const RegistrationBox = () => {
  const context = useAuth()
  const { register } = context
  const navigate = useNavigate()

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Пароли не совпадают')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      await register(userName, password, email)
      navigate('/')
    } catch (err) {
      let errorMessage = 'Ошибка регистрации'

      if (err instanceof Error) {
        errorMessage = err.message

        if (errorMessage.includes('non alphanumeric')) {
          errorMessage = 'Пароль должен содержать спецсимволы'
        }
      }

      setError(errorMessage)
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
        Регистрация
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
            label='Email'
            type='email'
            variant='outlined'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <TextField
            label='Подтвердите пароль'
            type='password'
            variant='outlined'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            disabled={isLoading || !userName || !password || !confirmPassword}
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
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
        </Stack>
      </form>

      <Box mt={3} textAlign='center'>
        <Typography variant='body2' sx={{ color: 'black' }}>
          Уже есть аккаунт?{' '}
          <Link
            href='/login'
            onClick={(e) => {
              e.preventDefault()
              navigate('/login')
            }}
            sx={{ cursor: 'pointer' }}
          >
            Войти
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}
