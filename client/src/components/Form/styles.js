import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    margin: "10px 0",
    padding: "10px",
    border: "1px solid #008DDA",
    color: "#008DDA",
    content: "Upload Image",
    cursor: "pointer",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#008DDA",
      color: "white",
    },
  },
  inputButton: {
    display: "none",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  buttonContainer: {
    width: "97%",
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
  },
}));

export default useStyles;
