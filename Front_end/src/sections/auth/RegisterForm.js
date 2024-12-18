import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
} from "@mui/material";
import { RHFTextField } from "../../components/hook-form";
import FormProvider from "../../components/hook-form/FormProvider";
import { Eye, EyeSlash } from "phosphor-react";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .required("Nhập email bắt buộc")
      .email("Email không hợp lệ"),
    password: Yup.string().required("Nhập mật khẩu bắt buộc"),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "abc@gmail.com",
    password: "123",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", { ...error, message: error.message });
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack p={1} spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <RHFTextField name={"firstName"} label="First Name"/>
            <RHFTextField name={"lastName"} label="Last Name"/>

        </Stack>
        <RHFTextField name={"email"} label="Email"/>
        <RHFTextField
                  name={"password"}
                  label="Mật khẩu"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        >
                          {showPassword ? <Eye /> : <EyeSlash />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

      </Stack>
      <Stack p={1}>
        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "text.primary",

            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          }}
        >
          Tạo tài khoản
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default RegisterForm;