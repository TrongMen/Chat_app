import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import RHFAutocomplete from "../../components/hook-form/RHFAutocomplete";

const MEMBERS = ["AB", "C", "D"];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroupForm = ({ handleClose }) => {
  const NewGroupSchema = Yup.object().shape({
    title: Yup.string().required("Nhập tên nhóm"),
    members: Yup.array().min(2, "Phải có ít nhất 2 thành viên"),
  });

  const defaultValues = {
    title: "",
    members: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema),
    defaultValues,
  });

  const {
    reset,
    //watch,
    setError,
    handleSubmit,
    //formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log("DATA ", data);
    } catch (error) {
      console.log("error obSubmit", error);
      reset();
      setError("afterSubmit", { ...error, message: error.message });
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name={"Tên nhóm"} label="Nhập tên nhóm" />
        <RHFAutocomplete
          name={"Thành viên"}
          label={"Tên thành viên"}
          multiple
          freeSolo
          options={MEMBERS.map((option) => option)}
          ChipProps={{ size: "medium" }}
        />
        <Stack
          spacing={2}
          direction={"row"}
          justifyContent={"end"}
          alignItems={"center"}
        >
          <Button  onClick={handleClose}>
            Hủy
          </Button>
          <Button type="submit" variant="contained">
            Tạo
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};
const CreateGroup = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      sx={{ p: 4 }}
    >
      {/* Title */}
      <DialogTitle sx={{mb:3}}>Tạo nhóm mới</DialogTitle>
      {/* Content */}
      <DialogContent>
        {/* Form */}

        <CreateGroupForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;
