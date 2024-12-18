import React from "react";
import FormProvider from "../../components/hook-form/FormProvider";
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
import { Eye, EyeSlash } from "phosphor-react";
import { Link as RouterLink } from "react-router-dom";
const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Nhập email bắt buộc")
      .email("Email không hợp lệ"),
    password: Yup.string().required("Nhập mật khẩu bắt buộc"),
  });

  const defaultValues = {
    email: "abc@gmail.com",
    password: "123",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
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

        <RHFTextField name={"email"} label="Địa chỉ email" />
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
      <Stack alignItems={"flex-end"} sx={{ my: 2 }} p={1}>
        <Link component={RouterLink} variant="body2" color={"inherit"} to={"/auth/reset-password"}>
          Quên mật khẩu ?
        </Link>
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
          Đăng nhập
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default LoginForm;
