import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
  Payment as PaymentIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  LocationCity as LocationCityIcon,
  AttachMoney as MoneyIcon,
  Settings as SettingsIcon,
  AssignmentTurnedIn as SalesIcon,
  Domain as DomainIcon,
  AccountCircle
} from "@material-ui/icons";
import {
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Drawer,
  AppBar,
  Toolbar,
  CssBaseline
} from "@material-ui/core";
import clsx from "clsx";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useSelector, useDispatch} from 'react-redux';

import {logout} from '../Auth/AuthActions';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  topHeaderLink: {
    color: '#fff'
  }
}));

export default props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [cOpen, cSetOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const popen = Boolean(anchorEl);
  const authState = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  function handleLogout (){
    dispatch(logout());
    setAnchorEl(null);
  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }


  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }
  function handleClick() {
    cSetOpen(!cOpen);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            
              FinEx - Excellence Empreendimentos
            
          </Typography>
          
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={popen}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem onClick={handleClose}>Minha Conta</MenuItem>
              </Menu>
            </div>
          
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />

        <List>
          <Link component={RouterLink} to="/">
            <ListItem button >
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link component={RouterLink} to="/obras">
            <ListItem button >
              <ListItemIcon><LocationCityIcon /></ListItemIcon>
              <ListItemText primary="Obras" />
            </ListItem>
          </Link>
          <Link component={RouterLink} to="/pessoa/cliente">
            <ListItem button >
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Clientes" />
            </ListItem>
          </Link>
          <Link component={RouterLink} to="/pessoa/fornecedor">
            <ListItem button >
              <ListItemIcon><DomainIcon /></ListItemIcon>
              <ListItemText primary="Fornecedores" />
            </ListItem>
          </Link>
          <Link component={RouterLink} to="/payables">
            <ListItem button >
              <ListItemIcon><PaymentIcon /></ListItemIcon>
              <ListItemText primary="Conrtas a Pagar" />
            </ListItem>
          </Link>
          <Link component={RouterLink} to="/vendas">
            <ListItem button >
              <ListItemIcon><SalesIcon /></ListItemIcon>
              <ListItemText primary="Vendas" />
            </ListItem>
          </Link>
          <Link component={RouterLink} to="/receivables">
            <ListItem button >
              <ListItemIcon><MoneyIcon /></ListItemIcon>
              <ListItemText primary="Contas a Receber" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link component={RouterLink} to="/settings">
            <ListItem button >
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Configurações" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </React.Fragment>
  );
}
