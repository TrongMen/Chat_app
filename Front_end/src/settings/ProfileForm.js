import React, { useCallback } from "react";
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
const ProfileForm = () => {
  const LoginSchema = Yup.object().shape({
    name: Yup.string().required(""),
    about: Yup.string().required(""),
    avataUrl: Yup.string().required("Avt is required").nullable(true),
  });

  const defaultValues = {
    name: "",
    about: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const values = watch();

  const handleDrop = React.useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      if (file) {
        setValue("avataUrl", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

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

        {/* RHFTextField */}
        <RHFTextField name={"name"} label="Tên" helperText={"Hi"} />
        <RHFTextField
          multiline
          rows={4}
          maxRows={5}
          name={"about"}
          label={"Mô tả"}
        />
      </Stack>

      <Stack direction={"row"} spacing={2} justifyContent={"flex-end"} p={1}>
        <Button color={"primary"} size="large" type="submit" variant="outlined">Lưu</Button>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
