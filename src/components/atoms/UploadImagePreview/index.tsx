import * as React from 'react'
import { Box, IconButton, Avatar } from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface UploadImagePreviewProps {
  open: boolean
  setOpen(open: boolean): void
  url: string
  alt: string
}
export const UploadImagePreview = ({
  open,
  setOpen,
  url,
  alt
}: UploadImagePreviewProps) => {
  const theme = useTheme()
  return (
    <IconButton onClick={() => setOpen(true)} sx={{ p: 0 }} size="large">
      <Avatar
        alt="alt"
        src={url}
        sx={{ width: 200, height: 200 }}
        variant="rounded"
      />
    </IconButton>
    // <Box>
    //   <img
    //     onClick={() => setOpen(true)}
    //     // alt={alt}
    //     loading="lazy"
    //     width="200"
    //     height="200"
    //     style={{
    //       width: 200,
    //       height: 200,
    //       borderRadius: 5,
    //       backgroundImage: `url(${url})`,
    //       backgroundRepeat: 'no-repeat',
    //       backgroundSize: 'cover',
    //       backgroundPosition: '50% 50%',
    //       marginRight: 10,
    //       borderWidth: 1,
    //       borderStyle: 'solid',
    //       ...theme.
    //     }}
    //   />
    // </Box>
  )
}
