import React from "react";
import {Link as RouterLink} from 'react-router-dom';
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
  AssignmentTurnedIn as SalesIcon
} from "@material-ui/icons";
import {Typography,
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

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
          <Typography variant="h6" noWrap>
          <Link component={RouterLink} to="/" className={classes.topHeaderLink}>
            FinEx - Excellence Empreendimentos
            </Link>
          </Typography>
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
        <Link component={RouterLink} to="/clientes">
          <ListItem button >
          <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText primary="Clientes" />
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
        <Link component={RouterLink} to="/">
          <ListItem button >
          <ListItemIcon><MoneyIcon /></ListItemIcon>
                <ListItemText primary="Contas a Receber" />
          </ListItem>
        </Link>
        </List>
        <Divider />
        <List>
        <Link component={RouterLink} to="/">
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
