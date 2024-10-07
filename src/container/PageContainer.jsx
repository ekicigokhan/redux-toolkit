import { Container } from "@mui/material";
import React from "react";

export default function PageContainer({ children }) {
  return <Container maxWidth="xl">{children}</Container>;
}
