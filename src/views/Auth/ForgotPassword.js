import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Config from '../../config';

import axios from 'axios';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
            Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (email == "")
        {
            setError("Please input all fields");
            setTimeout(() => setError(""), 5000);
            return;
        }

        axios.post(Config.SERVER_URL + '/api/admin-auth/forgot-password',
            {
                email: email
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )
        .then(response => {
            console.log('Success:', response);
            setError("");
            //history.push("/auth/reset-password");
        })
        .catch(error => {
            if (error.response) {
                setError(error.response.data.error);
                setTimeout(() => setError(""), 5000);
                console.error(error.response.data.error);
            } else {
                console.error(error);
            }
        });
    };  

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Forgot Password
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => setEmail(event.target.value)}
            />
            {
                error != "" && 
                <div>
                    <text style={{ fontSize: 16, color: 'red' }}>
                    { error }
                    </text> 
                </div>
            }
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Send Reset Password Email
            </Button>
            <Grid container>
                <Grid item xs>
                <Link href="/auth/sign-in" variant="body2">
                    Back to Sign In?
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
        </Container>
    );
}