import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 8px",
    "margin-top": "60px",
    ...theme.mixins.toolbar
  }
}));

export default props => {
  const classes = useStyles();
  const data = [
    { name: 'Jan/19', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Fev/19', uv: 300, pv: 2400, amt: 2400 },
    { name: 'Mar/19', uv: 222, pv: 2400, amt: 2400 },
    { name: 'Abr/19', uv: 112, pv: 2400, amt: 2400 },
    { name: 'Mai/19', uv: 475, pv: 2400, amt: 2400 }
  ];

  const dataB = [
    {
      "name": "Jan/19",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Fev/19",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Mar/19",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Abr/19",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Mai/19",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Jun/19",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "Jul/19",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    }
  ]


  const header = val => {
    return {
      marginTop: `${val}px`
    }
  }

  return (
    <main className={classes.content} style={header(100)}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </Grid>
        <Grid item xs={12} md={1}></Grid>
        <Grid item xs={12} md={4}>
          <AreaChart width={730} height={250} data={dataB}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
          </AreaChart>
        </Grid>
      </Grid>
    </main>
  );
};
