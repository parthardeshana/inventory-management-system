"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CircularProgress, styled } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
//import icons
import CloseIcon from "@mui/icons-material/Close";
import CommonInput from "@/components/CommonInput";
import { Product } from "@/Redux/slices/productSlice";
import { updateProduct } from "@/Redux/slices/productSlice";
import { useDispatch } from "react-redux";

interface EditProductModalProps {
  isOpenEditProductModal: boolean;
  onClose: () => void;
  product: Product | null;
}

interface FormValues {
  category: string;
  price: number;
  quantity: number;
}

const schema = yup.object().shape({
  category: yup.string().required("Required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Required")
    .positive("Price must be positive"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Required")
    .positive("Quantity must be positive")
    .integer("Quantity must be an integer"),
});

const CloseButton = styled(Box)(() => ({
  backgroundColor: "#000000",
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  height: 50,
  width: 50,
}));

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpenEditProductModal,
  onClose,
  product,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      category: "",
      price: 0,
      quantity: 0,
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const watchedPrice = watch("price");
  const watchedQuantity = watch("quantity");
  const calculatedValue = watchedPrice * watchedQuantity;

  useEffect(() => {
    if (product) {
      reset({
        category: product.category,
        price: product.price,
        quantity: product.quantity,
      });
    }
  }, [product, reset]);

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    const updatedProduct: Product = {
      ...product!,
      category: data.category,
      price: data.price,
      quantity: data.quantity,
      value: calculatedValue, 
    };

    dispatch(updateProduct(updatedProduct));
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog
      open={isOpenEditProductModal}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: { borderRadius: 5 },
      }}
    >
      <Card sx={{ px: 4, py: 4, borderRadius: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box>
              <Typography variant="h4">Edit product</Typography>
              <Typography variant="body1">{product?.name}</Typography>
            </Box>
            <CloseButton onClick={onClose}>
              <CloseIcon sx={{ color: "primary.main", fontSize: 22 }} />
            </CloseButton>
          </Stack>

          <Box mt={4}>
            <Grid2 container spacing={4}>
              <Grid2 size={{ md: 6, sm: 12 }}>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <CommonInput
                      {...field}
                      label="Category"
                      placeholder="Category"
                      error={!!errors.category}
                      helperText={errors.category?.message}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ md: 6, sm: 12 }}>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <CommonInput
                      {...field}
                      type="number"
                      label="Price"
                      placeholder="Price"
                      error={!!errors.price}
                      helperText={errors.price?.message}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ md: 6, sm: 12 }}>
                <Controller
                  name="quantity"
                  control={control}
                  render={({ field }) => (
                    <CommonInput
                      {...field}
                      label="Quantity"
                      type="number"
                      placeholder="Quantity"
                      error={!!errors.quantity}
                      helperText={errors.quantity?.message}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ md: 6, sm: 12 }}>
                <CommonInput
                  label="Value"
                  type="number"
                  value={calculatedValue}
                  disabled={true}
                  placeholder="Value"
                />
              </Grid2>
            </Grid2>
          </Box>

          <Stack
            direction={"row"}
            spacing={2}
            justifyContent={"flex-end"}
            alignItems={"center"}
            mt={4}
          >
            <Button
              onClick={onClose}
              sx={{ textTransform: "capitalize" }}
              variant="text"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              sx={{ textTransform: "capitalize" }}
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress sx={{ color: "#ffffff", fontSize: 14 }} />
              ) : (
                "Submit"
              )}
            </Button>
          </Stack>
        </form>
      </Card>
    </Dialog>
  );
};

export default EditProductModal;
