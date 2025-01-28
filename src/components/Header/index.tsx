"use client";
import React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { setIsUser } from "@/Redux/slices/userSlice"; 
import { RootState } from "@/Redux/store/store"; 

const CustomSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.primary.main,
  },
  "& .MuiSwitch-track": {
    backgroundColor: "#808080",
    opacity: 1,
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.primary.main,
    opacity: 0.5,
  },
}));

const Header = () => {
  const dispatch = useDispatch();
  const isUser = useSelector((state: RootState) => state.user.isUser); // Get the persisted `isUser` value

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setIsUser(event.target.checked)); // Correct action name: setIsUser
  };

  return (
    <Container maxWidth={false}>
      <Stack
        width={"100%"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        direction={"row"}
        spacing={6}
        py={2}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Typography>admin</Typography>
          <CustomSwitch checked={isUser} onChange={handleSwitchChange} />
          <Typography>user</Typography>
        </Stack>
        <LoginIcon sx={{ color: "#ffffff", cursor: "pointer" }} />
      </Stack>
    </Container>
  );
};

export default Header;
