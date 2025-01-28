"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "@/Redux/slices/productSlice";
import { RootState, AppDispatch } from "@/Redux/store/store";
import { styled } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
//import icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import EditProductModal from "@/components/EditProductModal";
import { Product } from "@/Redux/slices/productSlice";

function createData(
  name: string,
  category: string,
  price: number,
  quantity: number,
  value: number
) {
  return { name, category, price, quantity, value };
}

const StyledCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#233325",
  minHeight: "100%",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  display: "flex",
  gap: 20,
}));

const StyledTableCell = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: "#000000",
  maxWidth: "max-content",
  padding: theme.spacing(1),
  borderRadius: 10,
  fontSize: 14,
}));

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.product);
  const isUser = useSelector((state: RootState) => state.user.isUser);  

  useEffect(() => {
      dispatch(getProducts());
  }, []);

  const rows = useMemo(() => {
    return products.map((product) => {
      const price = parseFloat(product.price.toString().replace("$", ""));
      const totalValue = price * product.quantity;

      return createData(
        product.name,
        product.category,
        price,
        product.quantity,
        totalValue
      );
    });
  }, [products]);

  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalStoreValue = products.reduce((acc, product) => {
      const price = parseFloat(product.price.toString().replace("$", ""));
      const quantity = product.quantity;
      return acc + price * quantity;
    }, 0);

    const outOfStocks = products.filter(
      (product) => product.quantity === 0
    ).length;
    const categories = new Set(products.map((product) => product.category));
    const numberOfCategories = categories.size;

    return { totalProducts, totalStoreValue, outOfStocks, numberOfCategories };
  }, [products]);

  const [isOpenEditProductModal, setIsEditProductModal] =
    useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const inventory_stats_card = [
    {
      icon: <ShoppingCartIcon sx={{ color: "#ffffff", fontSize: 40 }} />,
      name: "Total product",
      count: `${stats.totalProducts}`,
    },
    {
      icon: <CurrencyExchangeIcon sx={{ color: "#ffffff", fontSize: 40 }} />,
      name: "Total store vaulue",
      count: `${stats.totalStoreValue}`,
    },
    {
      icon: <RemoveShoppingCartIcon sx={{ color: "#ffffff", fontSize: 40 }} />,
      name: "Out of stocks",
      count: `${stats.outOfStocks}`,
    },
    {
      icon: <CategoryIcon sx={{ color: "#ffffff", fontSize: 40 }} />,
      name: "No of Category",
      count: `${stats.numberOfCategories}`,
    },
  ];

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditProductModal(true);
  };


  return (
    <Container maxWidth={false}>
      <Typography fontSize={38}>Inventory stats</Typography>
      <Box mt={2}>
        <Grid2 container spacing={2}>
          {inventory_stats_card.map((ele, index) => {
            return (
              <Grid2 key={index} size={{ md: 3, sm: 12 }}>
                <StyledCard>
                  {ele.icon}
                  <Box>
                    <Typography variant="body1">{ele.name}</Typography>
                    <Typography mt={1} variant="h4" fontWeight={"700"}>
                      {ele.count}
                    </Typography>
                  </Box>
                </StyledCard>
              </Grid2>
            );
          })}
        </Grid2>
      </Box>

      <Box mt={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <StyledTableCell>Name</StyledTableCell>
                </TableCell>
                <TableCell align="left">
                  <StyledTableCell>Category</StyledTableCell>
                </TableCell>
                <TableCell align="left">
                  <StyledTableCell>Price</StyledTableCell>
                </TableCell>
                <TableCell align="left">
                  <StyledTableCell>Quantity</StyledTableCell>
                </TableCell>
                <TableCell align="left">
                  <StyledTableCell>Value</StyledTableCell>
                </TableCell>
                <TableCell align="left">
                  <StyledTableCell>Action</StyledTableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    <Typography>{row.name}</Typography>
                  </TableCell>
                  <TableCell align="left" scope="row">
                    <Typography>{row.category}</Typography>
                  </TableCell>
                  <TableCell align="left" scope="row">
                    <Typography>$ {row.price}</Typography>
                  </TableCell>
                  <TableCell align="left" scope="row">
                    <Typography>{row.quantity}</Typography>
                  </TableCell>
                  <TableCell align="left" scope="row">
                    <Typography>$ {row.value}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                      <Tooltip title="Edit">
                        <EditIcon
                          onClick={isUser ? undefined : () => handleEditProduct(row)}
                          sx={{
                            color: isUser ? "gray" : "success.main",
                            cursor: isUser ? "not-allowed" : "pointer",
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="View">
                        <RemoveRedEyeIcon
                            sx={{
                              color: isUser ? "gray" : "secondary.main",
                              cursor: isUser ? "not-allowed" : "pointer",
                            }}
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <DeleteIcon
                            sx={{
                              color: isUser ? "gray" : "error.main",
                              cursor: isUser ? "not-allowed" : "pointer",
                            }}
                        />
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <EditProductModal
        isOpenEditProductModal={isOpenEditProductModal}
        product={selectedProduct}
        onClose={() => setIsEditProductModal(false)}
      />
    </Container>
  );
}
