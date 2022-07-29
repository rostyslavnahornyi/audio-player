import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionRegister } from "../../redux/actions/creators/auth";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { createSelector } from "reselect";
import { STATUSES } from "../../utils/constants";
import { useForm } from "react-hook-form";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const authState = createSelector(
    (state) => state.auth,
    (auth) => auth
);

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const { status, authToken } = useSelector(authState);

    const [error, setError] = useState(false);

    const submitHandler = ({ email, password }) => {
        dispatch(actionRegister(email, password));
        reset();
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setError(false);
    };

    if (status === STATUSES.SUCCESS) {
        setTimeout(() => {
            return navigate("/login");
        }, 2000);
    }

    if (authToken) return <Navigate to="/" />;
    return (
        <ThemeProvider theme={theme}>
            <Snackbar
                open={error || status === "FAIL"}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    Password must exist numbers and letters!
                </Alert>
            </Snackbar>
            <Snackbar
                open={status === STATUSES.SUCCESS}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Now you can LOGIN
                </Alert>
            </Snackbar>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {status === STATUSES.PENDING ? (
                        <CircularProgress />
                    ) : (
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                    )}

                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit(submitHandler)}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            autoFocus
                            type={"email"}
                            {...register("email", { required: true })}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            {...register("password", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                },
                            })}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    {"Already have an account? Login"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Register;
