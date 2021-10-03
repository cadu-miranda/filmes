import React from "react";
import { Container, Input, SearchButton, SearchContainer } from "./styles";

import Header from "../../components/Header";
import { Feather } from "@expo/vector-icons";

export default function Home() {
  return (
    <>
      <Container>
        <Header title="React Prime" />
        <SearchContainer>
          <Input
            placeholder="Nome do filme"
            placeholderTextColor="#ddd"
          ></Input>
          <SearchButton>
            <Feather name="search" size={30} color="#fff" />
          </SearchButton>
        </SearchContainer>
      </Container>
    </>
  );
}
