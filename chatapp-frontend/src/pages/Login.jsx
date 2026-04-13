import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/validators";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <Container component={"main"} maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            padding: "2rem",
            borderRadius: "20px",
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 8px 32px rgba(102, 126, 234, 0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isLogin ? (
            <>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "2rem",
                }}
              >
                Welcome Back
              </Typography>
              <form
                style={{
                  width: "100%",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  size="medium"
                  value={username.value}
                  onChange={username.changeHandler}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      "&:hover fieldset": {
                        borderColor: "#667eea",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#667eea",
                        boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
                      },
                    },
                  }}
                />

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  size="medium"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      "&:hover fieldset": {
                        borderColor: "#667eea",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#667eea",
                        boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
                      },
                    },
                  }}
                />

                <Button
                  sx={{
                    marginTop: "2rem",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    fontWeight: 700,
                    padding: "0.75rem",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
                    },
                  }}
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : "Login"}
                </Button>

                <Divider sx={{ my: 2, fontWeight: 600 }}>OR</Divider>

                <Button
                  disabled={isLoading}
                  fullWidth
                  sx={{
                    borderRadius: "12px",
                    color: "#667eea",
                    borderColor: "#667eea",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(102, 126, 234, 0.08)",
                      borderColor: "#764ba2",
                    },
                  }}
                  variant="outlined"
                  onClick={toggleLogin}
                >
                  Create New Account
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "2rem",
                }}
              >
                Join ChatHub
              </Typography>
              <form
                style={{
                  width: "100%",
                }}
                onSubmit={handleSignUp}
              >
                <Stack position={"relative"} width={"120px"} margin={"auto"} marginBottom="2rem">
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      objectFit: "cover",
                      border: "4px solid #667eea",
                      boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      width: "36px",
                      height: "36px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                        boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>

                {avatar.error && (
                  <Typography
                    m={"1rem auto"}
                    width={"fit-content"}
                    display={"block"}
                    color="error"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  margin="normal"
                  size="medium"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      "&:hover fieldset": {
                        borderColor: "#667eea",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#667eea",
                        boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
                      },
                    },
                  }}
                />

                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  size="medium"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      "&:hover fieldset": {
                        borderColor: "#667eea",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#667eea",
                        boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
                      },
                    },
                  }}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  size="medium"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      "&:hover fieldset": {
                        borderColor: "#667eea",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#667eea",
                        boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
                      },
                    },
                  }}
                />

                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  size="medium"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      "&:hover fieldset": {
                        borderColor: "#667eea",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#667eea",
                        boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
                      },
                    },
                  }}
                />

                <Button
                  sx={{
                    marginTop: "2rem",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    fontWeight: 700,
                    padding: "0.75rem",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
                    },
                  }}
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
                </Button>

                <Divider sx={{ my: 2, fontWeight: 600 }}>OR</Divider>

                <Button
                  disabled={isLoading}
                  fullWidth
                  sx={{
                    borderRadius: "12px",
                    color: "#667eea",
                    borderColor: "#667eea",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(102, 126, 234, 0.08)",
                      borderColor: "#764ba2",
                    },
                  }}
                  variant="outlined"
                  onClick={toggleLogin}
                >
                  Login to Account
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
