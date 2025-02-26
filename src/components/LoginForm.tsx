// import  { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  //   const { register, handleSubmit, formState: { errors } } = useForm();
  //   const [loading, setLoading] = useState(false);

  //   const onSubmit = (data) => {
  //     console.log(" onSubmit data::>>>", data)
  //     setLoading(true);
  //     setTimeout(() => {
  //       console.log("Login Data:", data);
  //       setLoading(false);
  //     }, 2000);
  //   };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  console.log(watch("email")); // watch input value by passing the name of it

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
          {...register("email", { required: true })}
          error={!!errors.email}
          label="Email"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          {...register("password", { required: true })}
          error={!!errors.password}
          sx={{ mb: 2 }}
          label="Password"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </Box>
  );
};
