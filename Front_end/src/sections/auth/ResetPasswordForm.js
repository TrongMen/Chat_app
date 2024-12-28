import React from "react";
import FormProvider from "../../components/hook-form/FormProvider";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Alert, Button, Stack } from "@mui/material";
import { RHFTextField } from "../../components/hook-form";
import { useDispatch } from "react-redux";
import { ForgotPassword } from "../../redux/slices/auth";
const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const ResetSchema = Yup.object().shape({
    email: Yup.string()
      .required("Nhập email bắt buộc")
      .email("Email không hợp lệ"),
  });

  const defaultValues = {
    email: "",
  };

  const methods = useForm({
    resolver: yupResolver(ResetSchema),
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
      // data = {email: data.email}
      dispatch(ForgotPassword(data));

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
          Gửi yêu cầu
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default ResetPasswordForm;
