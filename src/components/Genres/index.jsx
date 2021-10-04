import React from "react";
import { Container, Genre } from "./styles";

export default function Genres({ data }) {
  return (
    <>
      <Container>
        <Genre>{data.name}</Genre>
      </Container>
    </>
  );
}
