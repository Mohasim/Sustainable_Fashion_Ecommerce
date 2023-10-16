'use client'
import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ProfileIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportIcon from '@mui/icons-material/Support';
import LogoutIcon from '@mui/icons-material/Logout';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { Menu, SvgIcon, Tooltip } from '@mui/material';
import { Button } from '@mui/base';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import InputAdornment from '@mui/material/InputAdornment';


const DRAWER_WIDTH = 200;



const PLACEHOLDER_LINKS = [
  { text: 'Settings', icon: SettingsIcon },
  { text: 'Support', icon: SupportIcon },
  { text: 'Logout', icon: LogoutIcon },
];



export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const matches = useMediaQuery('(max-width:600px)');

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };
  const LINKS = [
    { text: 'Home', href: '/', icon: HomeIcon },
    { text: 'Wishlist', href: '/wishlist', icon: StarIcon, action: () => {console.log('Wishlist Clicked')} },
    { text: 'Profile', href: '/profile', icon: ProfileIcon, action: () => {console.log('Profile Clicked')} },
    // { text: 'Menu', href:'', icon: MenuIcon, action: toggleDrawer(true) },
  ];
  
  
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar position="fixed" sx={{ zIndex: 2000}} >
            <Toolbar sx={{ backgroundColor: 'background.paper',justifyContent:'space-between' }}>
                <Button  href="/"  >
                  <SvgIcon sx={{
                    width: '8rem',
                    height: '4rem',
                    mr: 1,
                  }}>
                    {/* Logo goes Here */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 283 64"><path fill="black" d="M141 16c-11 0-19 7-19 18s9 18 20 18c7 0 13-3 16-7l-7-5c-2 3-6 4-9 4-5 0-9-3-10-7h28v-3c0-11-8-18-19-18zm-9 15c1-4 4-7 9-7s8 3 9 7h-18zm117-15c-11 0-19 7-19 18s9 18 20 18c6 0 12-3 16-7l-8-5c-2 3-5 4-8 4-5 0-9-3-11-7h28l1-3c0-11-8-18-19-18zm-10 15c2-4 5-7 10-7s8 3 9 7h-19zm-39 3c0 6 4 10 10 10 4 0 7-2 9-5l8 5c-3 5-9 8-17 8-11 0-19-7-19-18s8-18 19-18c8 0 14 3 17 8l-8 5c-2-3-5-5-9-5-6 0-10 4-10 10zm83-29v46h-9V5h9zM37 0l37 64H0L37 0zm92 5-27 48L74 5h10l18 30 17-30h10zm59 12v10l-3-1c-6 0-10 4-10 10v15h-9V17h9v9c0-5 6-9 13-9z"/></svg>
                  </SvgIcon>
                  {/* <Typography variant="h6" noWrap component="div" color="black">
                    Sustainable Fashion
                  </Typography> */}
                </Button>
                {/* <Toolbar sx={{ 
                  backgroundColor: 'background.paper', 
                  justifyContent: 'center',
                  }}
                  >
                    <TextField
                      variant="outlined"
                      placeholder="Search..."
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Toolbar> */}
                
                <Toolbar sx={{ 
                  backgroundColor: 'background.paper', 
                  justifyContent: 'end',
                  }}>
                    {!matches && (
                      <List sx={{display: 'flex', gap:1}}>
                      {LINKS.map(({ text, href, icon: Icon,action }) => (
                        <Tooltip title={text} placement="bottom">
                          <ListItem key={href} disablePadding>
                            <ListItemButton component={Link} href={href} sx={{width:'50px'}} onClick={action}>
                              <ListItemIcon>
                                <Icon />
                              </ListItemIcon>
                              {/* <ListItemText primary={text} sx={{color:'black'}}/> */}
                            </ListItemButton>
                          </ListItem>
                          </Tooltip>
                      ))}
                     
                      {/* <Tooltip title="Menu" placement="bottom">
                      <MenuIcon sx={{color:'black'}} />
                      </Tooltip> */}
                    </List>
                    )}
                  
                  {matches && (
                    <List sx={{display: 'flex', gap:1}}>
                    <Button onClick={toggleDrawer(true)}>
                      <MenuIcon sx={{color:'black'}} />
                    </Button>
                    <SwipeableDrawer 
                      anchor='right'
                      open={drawerOpen}
                      onClose={toggleDrawer(false)}
                      onOpen={toggleDrawer(true)}
                      sx={{zIndex: 2000}}
                    >
                      <List>
                        {LINKS.map(({ text, href, icon: Icon ,action}) => (
                          <ListItem key={href} disablePadding>
                            <ListItemButton component={Link} href={href} >
                              <ListItemIcon>
                                <Icon />
                              </ListItemIcon>
                              <ListItemText primary={text} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </SwipeableDrawer>
                  </List>
                  )}
                  
                </Toolbar>
            </Toolbar>
            
          </AppBar>
          <Drawer
            sx={{
              width: DRAWER_WIDTH,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH,
                boxSizing: 'border-box',
                top: ['48px', '56px', '64px'],
                height: 'auto',
                bottom: 0,
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Divider />
         
            <Divider sx={{ mt: 'auto' }} />
            <List>
              {PLACEHOLDER_LINKS.map(({ text, icon: Icon }) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              ml: `${DRAWER_WIDTH}px`,
              mt: ['48px', '56px', '64px'],
              p: 3,
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
