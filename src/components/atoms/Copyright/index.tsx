import * as React from 'react'
import { Typography, Link } from '@mui/material'

export const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
      component="small"
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        my: 2
      }}
    >
      &copy; {new Date().getFullYear()}&nbsp;
      <Link
        color="inherit"
        href="https://difusaoweb.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Difusão Web
      </Link>
    </Typography>
  )
}
