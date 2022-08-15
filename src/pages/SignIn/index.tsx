import * as React from 'react'
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Paper
} from '@mui/material'
import { useDispatch } from 'react-redux'

import { Copyright } from '../../components/atoms/Copyright'
import { getLogIn } from '../../redux'

export function SignIn() {
  const dispatch = useDispatch()
  const [isLoadingSignIn, setIsLoadingSignIn] = React.useState(false)
  const [email, setEmail] = React.useState<string | null>(
    'johnsistema@gmail.com'
  )
  const [password, setPassword] = React.useState<string | null>(
    'johnsistemaPASS123'
  )

  async function handleSignIn() {
    if (email && password) {
      setIsLoadingSignIn(true)
      await dispatch(getLogIn({ email, password }))

      setIsLoadingSignIn(false)
    }
  }

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90vh'
        }}
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography component="h3" variant="body1">
              John Sistema
            </Typography>
            <Typography component="h1" variant="h5">
              Fazer login
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Nome de usuário ou email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => setEmail(String(e.target.value))}
                value={email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordword"
                label="Senha"
                type="password"
                autoComplete="current-password"
                onChange={e => setPassword(String(e.target.value))}
                value={password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSignIn}
                disabled={isLoadingSignIn || !email || !password}
              >
                Acessar
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
      <Copyright />
    </>
  )
}
