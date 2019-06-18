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

export const xdefaultPageStyle = theme => {
    const style = {
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
    }
    return (
        style
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
    }
  }
}