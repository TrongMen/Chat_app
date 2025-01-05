import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { Button, Stack } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFCode from "../../components/hook-form/RHFCode";
import { useDispatch } from "react-redux";
import { VerifyEmail } from "../../redux/slices/auth";
import { useSelector } from "react-redux";
const VerifyForm = () => {
  const dispatch = useDispatch();
  const {email} = useSelector((state) => state.auth);
  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required("Nhập mã OTP"),
    code2: Yup.string().required("Nhập mã OTP"),
    code3: Yup.string().required("Nhập mã OTP"),
    code4: Yup.string().required("Nhập mã OTP"),
    code5: Yup.string().required("Nhập mã OTP"),
    code6: Yup.string().required("Nhập mã OTP"),
  });
  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const { handleSubmit, 
    //formState 
  } = methods;

  const onSubmit = async (data) => {
    try {
      dispatch(
        VerifyEmail({
          email,
          otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <RHFCode
          keyName="code"
          inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
        />
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
            Xác thực
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default VerifyForm;
