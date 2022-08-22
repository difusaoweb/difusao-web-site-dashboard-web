import * as React from 'react'
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Paper
} from '@mui/material'

import { useAppDispatch, reduxAccessGetLoginFunction } from '../../redux'
import { Copyright } from '../../components/atoms/Copyright'

export const Login = () => {
  const dispatch = useAppDispatch()

  const [email, setEmail] = React.useState<string | null>(null)
  const [password, setPassword] = React.useState<string | null>(null)
  const [isLoadingGetLogin, setIsLoadingGetLogin] = React.useState(false)

  async function handleGetLogin() {
    if (isLoadingGetLogin || !email || !password) return
    setIsLoadingGetLogin(true)
    await dispatch(reduxAccessGetLoginFunction({ email, password }))
    setIsLoadingGetLogin(false)
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
              Difusão Web
            </Typography>
            <Typography component="h1" variant="h5">
              Fazer login
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e =>
                  setEmail(e.target.value ? String(e.target.value) : null)
                }
                value={email ?? ''}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                autoComplete="current-password"
                onChange={e =>
                  setPassword(e.target.value ? String(e.target.value) : null)
                }
                value={password ?? ''}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleGetLogin}
                disabled={isLoadingGetLogin || !email || !password}
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
