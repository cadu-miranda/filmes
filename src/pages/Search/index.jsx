import React, { useState, useEffect } from "react";
import api, { key } from "../../services/api";
import { Container, MoviesList } from "./styles";
import SearchItem from "../../components/SearchItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator, Text } from "react-native";

export default function Search() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function getMovieSearch() {
      const response = await api.get("/search/movie", {
        params: {
          query: route?.params?.name,
          api_key: key,
          language: "pt-BR",
          page: 1,
        },
      });

      if (isActive) {
        setMovie(response.data.results);
        setLoading(false);
      }
    }

    if (isActive) {
      getMovieSearch();
    }

    return () => {
      isActive = false;
    };
  }, []);

  function navigateToDetailsPage(item) {
    navigation.navigate("Details", { id: item.id });
  }

  if (loading) {
    return (
      <>
        <Container>
          <ActivityIndicator size="large" color="#fff" />
        </Container>
      </>
    );
  }

  return (
    <Container>
      {movie.length !== 0 ? (
        <MoviesList
          data={movie}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <SearchItem
              data={item}
              navigateToDetailsPage={() => navigateToDetailsPage(item)}
            />
          )}
        />
      ) : (
        <Text
          style={{
            top: "42.5%",
            color: "#fff",
            textAlign: "center",
            fontSize: 18,
          }}
        >
          {`Nenhum filme encontrado.\nTente novamente!`}
        </Text>
      )}
    </Container>
  );
}
