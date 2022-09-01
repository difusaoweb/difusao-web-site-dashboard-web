import * as React from 'react'
import { Box, Typography, Grid, Button } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

import styles from './index.module.scss'
import { PageContainer } from '../../components/atoms/PageContainer'
import { ServiceList } from '../../components/ecosystems/ServiceList'

export const ServiceListPage: React.FC = () => {
  return (
    <PageContainer title="Serviços">
      <>
        <Box className={styles.pageTopBar}>
          <Box className={styles.box}>
            <Typography component="h1" className={styles.titlePage}>
              Lista de serviços
            </Typography>
          </Box>
          <Box className={styles.box2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              href="/servicos/adicionar"
            >
              Novo Serviço
            </Button>
          </Box>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ServiceList />
          </Grid>
        </Grid>
      </>
    </PageContainer>
  )
}
