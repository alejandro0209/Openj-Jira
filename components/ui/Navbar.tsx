import NextLink from "next/link";
import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useContext } from 'react';
import { UIContext } from "@/context/ui";


export const Navbar = () => {

  const { openSideMenu } = useContext(UIContext)


  return (
    <AppBar position='sticky' elevation={0}>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          onClick={openSideMenu}
        >
          <MenuOutlinedIcon />
        </IconButton>
        <Link underline="none" color="white" component={ NextLink } href="/"> 
          <Typography variant="h6">Open Jira</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  )
}
