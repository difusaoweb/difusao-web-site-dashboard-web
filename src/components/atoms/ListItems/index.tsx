import * as React from 'react'
import {
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Collapse
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  Apps as AppsIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  People as PeopleIcon
} from '@mui/icons-material'
import { useLocation } from 'react-router-dom'

export const ListItems = () => {
  const { pathname } = useLocation()

  const [selectedIndex, setSelectedIndex] = React.useState(pathname)
  const [selectedIndexCollapse, setSelectedIndexCollapse] = React.useState<
    string | null
  >(null)
  const [itemCollapsed, setItemCollapsed] = React.useState<string | null>(null)

  function handleSetItemCollapse(index: string) {
    setItemCollapsed(itemCollapsed == index ? null : index)
  }

  React.useEffect(() => {
    function onSetCollapse() {
      switch (pathname) {
        case '/produtos':
          setSelectedIndexCollapse('/produtos')
          setItemCollapsed('/produtos')
          break
        case '/produtos/adicionar':
          setSelectedIndexCollapse('/produtos')
          setItemCollapsed('/produtos')
          break
        case '/usuarios':
          setSelectedIndexCollapse('/usuarios')
          setItemCollapsed('/usuarios')
          break
        case '/usuarios/adicionar':
          setSelectedIndexCollapse('/usuarios')
          setItemCollapsed('/usuarios')
          break
      }
    }
    onSetCollapse()
  }, [])

  return (
    <>
      <ListItemButton component="a" href="/" selected={selectedIndex === '/'}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndexCollapse === '/produtos'}
        onClick={() => handleSetItemCollapse('/produtos')}
      >
        <ListItemIcon>
          <AppsIcon />
        </ListItemIcon>
        <ListItemText primary="Produtos" />
        {itemCollapsed === '/produtos' ? (
          <ExpandLessIcon />
        ) : (
          <ExpandMoreIcon />
        )}
      </ListItemButton>
      <Collapse timeout="auto" unmountOnExit in={itemCollapsed === '/produtos'}>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            component="a"
            href="/produtos"
            selected={selectedIndex === '/produtos'}
          >
            <ListItemText primary="Lista" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            component="a"
            href="/produtos/adicionar"
            selected={selectedIndex === '/produtos/adicionar'}
          >
            <ListItemText primary="Adicionar" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton
        selected={selectedIndexCollapse === '/usuarios'}
        onClick={() => handleSetItemCollapse('/usuarios')}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuários" />
        {itemCollapsed === '/usuarios' ? (
          <ExpandLessIcon />
        ) : (
          <ExpandMoreIcon />
        )}
      </ListItemButton>
      <Collapse timeout="auto" unmountOnExit in={itemCollapsed === '/usuarios'}>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            component="a"
            href="/usuarios"
            selected={selectedIndex === '/usuarios'}
          >
            <ListItemText primary="Lista" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            component="a"
            href="/usuarios/adicionar"
            selected={selectedIndex === '/usuarios/adicionar'}
          >
            <ListItemText primary="Adicionar" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  )
}
