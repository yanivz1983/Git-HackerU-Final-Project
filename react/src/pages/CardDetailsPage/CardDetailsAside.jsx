import React from "react";
import { useMediaQuery } from "@mui/material";
import LeftCommercialAside from "../home/LeftCommercialAside";
import RightCommercialAside from "../home/RightCommercialAside";

const CardDetailsAside = () => {
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("xl"));

  return (
    <>
      {isLargeScreen && <LeftCommercialAside />}
      {isLargeScreen && <RightCommercialAside />}
    </>
  );
};

export default CardDetailsAside;
