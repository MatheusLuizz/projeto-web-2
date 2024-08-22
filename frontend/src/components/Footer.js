import React from "react";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(
    theme => ({
        footer: {
            backgroundColor: '#00C75A',
            color: '#000',
            textAlign: 'center',
            padding: '10px',
            position: 'fixed',
            left: '0',
            bottom: '0',
            width: '100%',
            boxSizing: 'border-box'
        }
    })
);

export default function Footer(props) {

    const classes = useStyles();

    return <footer className={classes.footer}>IFPE Campus Paulista - 4  período - ADS 2024</footer>
}