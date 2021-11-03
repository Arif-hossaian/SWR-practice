/* eslint-disable react/jsx-key */
import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button } from '@mui/material';
import styles from '../../styles/header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Header() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [search, setSearch] = React.useState('');
  const router = useRouter();
  const { query, pathname } = router;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (query.page) {
      let p = Number(query.page >= 1 ? query.page : 1);
      setPage(Number(p));
    }
    //console.log(query);

    if (query.limit) {
      let l = Number(query.limit) >= 10 ? query.limit : 10;
      setLimit(Number(l));
    }
  }, [query.page, query.limit]);

  const handlePagination = (pageIndex) => {
    if (pathname !== '/') return;
    let p = pageIndex >= 1 ? pageIndex : 1;
    router.replace(`?page=${p}&limit=${limit}`);
  };

  const handlePerPage = (limitNumber) => {
    if (pathname !== '/') return;
    router.replace(`?page=${1}&limit=${limitNumber}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (pathname !== '/') return;
    router.replace(`?search=${search}`);
    setSearch('');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <Link href="/" passHref>
              SWR
            </Link>
          </Typography>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Enter your search"
              style={{ marginLeft: '80px', padding: '10px' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            <input placeholder="lol" style={{ padding: '10px' }} />,
            <input placeholder="lol" style={{ padding: '10px' }} />,
            <Button variant="outlined">Add</Button>,
            <div>
              <button
                className={styles.prev}
                aria-label="prev"
                onClick={() => handlePagination(page - 1)}
              >
                <ChevronLeftIcon />
              </button>
              <span className={styles.span}>{page}</span>
              <button
                className={styles.next}
                aria-label="next"
                onClick={() => handlePagination(page + 1)}
              >
                <ChevronRightIcon />
              </button>
            </div>,
            <div>
              <label htmlFor="per-page">Per Page:</label>
              <select
                id="per-page"
                value={limit}
                onChange={(e) => handlePerPage(e.target.value)}
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </div>,
          ].map((component, index) => (
            <ListItem button key={index}>
              <ListItemText primary={component} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
