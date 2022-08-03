import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import VirtualizedList from "../components/VirtualizedList";
import ComboBox from "../components/ComboBox";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import Flow from "../components/flow";
import axios from "axios";
import { changeFactoryName } from '../redux/slices/factorySlice'

const mdTheme = createTheme(
);

function DashboardContent() {

  const startEnd1 = [
    {
      id: '1',
      name: 'Start',
    },
    {
      id: '2',
      name: 'End',
    }
  ];
  const startEnd2 = [
    {
      id: '1',
      name: 'Start',
    },
    {
      id: '2',
      name: 'End',
    },
    {
      id: '3',
      name: 'test',
    },
  ];
  const startEnd3 = [
    {
      id: '1',
      name: 'Start',
    },
    {
      id: '2',
      name: 'End',
    },
    {
      id: '3',
      name: 'test',
    },
  ];

  let serverAddress =  "http://localhost:8080";
  // let serverAddress =  "";

  const [open, setOpen] = React.useState(true);
  const [factoryList, setfactoryList] = React.useState(null);
  const [flowList, setflowList] = React.useState(null);
  const [operationList, setoperationList] = React.useState(null);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const factoryName = useSelector((state) => state.factory.factoryName);
  const dispatch = useDispatch();
  
  const getFactoryList = async () => {
    try {
      const response = await axios.get( serverAddress+"/factoryList");
      response.data.map(data =>{ 
        data['label'] = data['factoryName'];
      })
      setfactoryList(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getFlowList = async () => {
    try {
      const response = await axios.get( serverAddress+"/flowList");
      response.data.map( (data,index) =>{ 
        data['id'] = index;
        data['name'] = data['processFlowName'];
      })
      setflowList(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getOperationList = async () => {
    try {
      const response = await axios.get( serverAddress+"/operationList");
      response.data.map( (data,index)  =>{ 
        data['id'] = index;
        data['name'] = data['processOperationName'];
      })
      setoperationList(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    console.log("맨 처음 렌더링될 때 한 번만 실행");
    getFactoryList();
  }, []);
  React.useEffect(() => {
    console.log("factoryList수정시");
    getFlowList();
    getOperationList();
  }, [factoryName]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Flow Designer {factoryName}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
          <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Start / End
            </Typography>
            <VirtualizedList dataList={startEnd1}></VirtualizedList>
            <Divider sx={{ my: 1 }} />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Flow
            </Typography>
            <VirtualizedList dataList={flowList}></VirtualizedList>
            <Divider sx={{ my: 1 }} />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Operation
            </Typography>
            <VirtualizedList dataList={operationList}></VirtualizedList>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
          lg={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth={false} sx={{ mt: 4, mb: 4 ,height: "100vh" }}>
            <Grid container spacing={3}>

              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  {/* comboBox & Save Button */}
                  <Stack direction="row" spacing={2}>
                    <ComboBox dataList={factoryList} label = "Factory" onSelect={changeFactoryName} ></ComboBox>
                    <ComboBox></ComboBox>
                    <Button variant="contained">Save</Button>
                  </Stack>
                </Paper>
              </Grid>


              <Grid item xs={12} md={12} lg={12} xl={12} sx={{ height: "100vh" , weight:'100%' }}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    // height: 240
                  }}
                >
                  {/* Designer */}
                  <Flow></Flow>
                </Paper>
              </Grid>

            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));



export default function Dashboard() {
  return <DashboardContent />;
}
