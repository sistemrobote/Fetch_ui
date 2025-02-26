import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginInputs } from "../models/user";
import { apiLoginService } from "../api/userService";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const { setIsAuthorized } = useAuth();
  const [unathorizedError, setUnathorizedError] = useState("");
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginInputs> = useCallback(
    (data) => {
      try {
        apiLoginService.login(data.email, data.password).then((response) => {
          if (response === "OK") {
            setIsAuthorized(true);
            navigate("/dashboard");
          }
        });
      } catch (error) {
        if (
          error &&
          typeof error === "object" &&
          "errorCode" in error &&
          error.errorCode === "401"
        ) {
          setUnathorizedError("Unauthorized: Incorrect credentials.");
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    },
    [navigate, setIsAuthorized]
  );

  return (
    <Box
      sx={{
        width: 320,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        textAlign: "center",
        bgcolor: "background.paper",
        mx: "auto",
        mt: 5,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Login
        </Typography>
        <TextField
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
          label="Email"
          fullWidth
          variant="outlined"
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          {...register("password", { required: "Password is required" })}
          sx={{ mb: 2 }}
          label="Password"
          fullWidth
          variant="outlined"
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button sx={{ mb: 2 }} type="submit" variant="outlined">
          Submit
        </Button>
      </form>
      {unathorizedError && <Alert severity="error">{unathorizedError}</Alert>}
    </Box>
  );
};
