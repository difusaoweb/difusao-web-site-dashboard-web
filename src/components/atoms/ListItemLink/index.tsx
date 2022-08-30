import * as React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from 'react-router-dom'

import styles from './index.module.scss'

interface ListItemLinkProps {
  icon?: React.ReactElement
  primary: string
  to: string
}
export const ListItemLink = (props: ListItemLinkProps) => {
  const { icon, primary, to } = props

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(
        function Link(itemProps, ref) {
          return (
            <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />
          )
        }
      ),
    [to]
  )

  return (
    <ListItem button component={renderLink} className={styles.menuEditar}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  )
}
