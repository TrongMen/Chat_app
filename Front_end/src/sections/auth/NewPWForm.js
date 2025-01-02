import React from "react";
import FormProvider from "../../components/hook-form/FormProvider";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";

import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { RHFTextField } from "../../components/hook-form";
import { Eye, EyeSlash } from "phosphor-react";
import { NewPW } from "../../redux/slices/auth";
import { useSearchParams } from "react-router-dom";
const NewPWForm = () => {
  const [ queryParameters] = useSearchParams();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const NewPWSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Mật khẩu ít nhất 6 ký tự")
      .required("Nhập mật khẩu bắt buộc"),
    passwordConfirm: Yup.string()
      .required("Nhập mật khẩu bắt buộc")
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
  });

  const defaultValues = {
    password: "",
    passwordConfirm: "",
  };

  const methods = useForm({
    resolver: yupResolver(NewPWSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors }, // , isSubmitting, isSubmitSuccessful // nhớ mở
  } = methods;

  const onSubmit = async (data) => {
    try {
      //
      dispatch(NewPW({...data,token:queryParameters.get("token")}));
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

        <RHFTextField
          name={"password"}
          label="Nhập mật khẩu mới"
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
        <RHFTextField
          name={"passwordConfirm"}
          label="Nhập lại mật khẩu mới"
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
          Xác nhận
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default NewPWForm;
