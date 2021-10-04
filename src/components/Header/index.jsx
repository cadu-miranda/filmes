import React from "react";
import { Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Container, MenuButton, Title } from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function Header({ title }) {
  const navigation = useNavigation();

  return (
    <>
      <Container>
        <MenuButton onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={32} color="#fff" />
        </MenuButton>
        <Title>{title}</Title>
      </Container>
    </>
  );
}
