import React, { useState, useEffect } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import api, { key } from "../../services/api";
import { Container, Header, HeaderButton, Banner } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text } from "react-native";

export default function Details() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState({});

  useEffect(() => {
    let isActive = true;

    async function getMovie() {
      const response = await api
        .get(`/movie/${route.params?.id}`, {
          params: {
            api_key: key,
            language: "pt-BR",
          },
        })
        .catch((e) => console.log(e));

      if (isActive) {
        setMovie(response.data);
      }
    }

    if (isActive) {
      getMovie();
    }

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <>
      <Container>
        <Header>
          <HeaderButton
            activeOpacity={0.75}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={28} color="#fff" />
          </HeaderButton>
          <HeaderButton>
            <Ionicons name="bookmark" size={28} color="#fff" />
          </HeaderButton>
        </Header>
      </Container>
    </>
  );
}
