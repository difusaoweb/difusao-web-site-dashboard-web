import * as React from 'react'
import { Box, Typography, Grid, Button } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

import styles from './index.module.scss'
import { PageContainer } from '../../components/atoms/PageContainer'
import { UserList } from '../../components/ecosystems/UserList'

export const UserListPage: React.FC = () => {
  return (
    <PageContainer title="Usuários">
      <>
        <Box className={styles.pageTopBar}>
          <Box className={styles.box}>
            <Typography component="h1" className={styles.titlePage}>
              Lista de usuários
            </Typography>
          </Box>
          <Box className={styles.box2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              href="/usuarios/adicionar"
            >
              Novo Usuário
            </Button>
          </Box>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <UserList />
          </Grid>
        </Grid>
      </>
    </PageContainer>
  )
}
