import { makeStyles } from "@material-ui/core/styles";


export function defaultPageStyle () {
  return (
    makeStyles(theme => ({
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        "margin-top": "70px"
      },
      toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "0 8px",
        "margin-top": "70px",
        ...theme.mixins.toolbar
      }
    }))
  )
}


export function defaultClass() {

  return {
    content: {
      flexGrow: 1,
      padding: 10,
      "margin-top": "70px"
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "0 8px",
      "margin-top": "70px"
    },
    party_title:{
      "margin-bottom": "-10px"
    },
    add_sale_detail: {
      "margin-bottom": "20px"
    },
    table_cell_so_detail_h: {
      "font-size": "1.3em"
      
    },
    text_bold: {
      "font-weight": "bold",
      "margin-top": "70px"
    }
  }
}

export function loginClass(){
  return {
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random?building)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: "100px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: 10
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 15,
    },
    submit: {
        height: 60,
        margin: "24px 0px 16px",
    },
  }
}
