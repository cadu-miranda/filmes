import React, { useState, useEffect } from "react";
import { Container, MoviesList } from "./styles";
import { getSavedMovies, deleteMovie } from "../../utils/storage";
import Header from "../../components/Header";
import FavoritedItem from "../../components/FavoritedItem";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { ScrollView } from "react-native";

export default function Movies() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let isActive = true;

    async function getFavoritedMovies() {
      const result = await getSavedMovies("@primereact");

      if (isActive) {
        setMovies(result);
      }
    }

    if (isActive) {
      getFavoritedMovies();
    }

    return () => {
      isActive = false;
    };
  }, [isFocused]);

  async function handleDeleteMovie(id) {
    const result = await deleteMovie(id);
    setMovies(result);
  }

  function navigateToDetailsPage(item) {
    navigation.navigate("Details", { id: item.id });
  }

  return (
    <>
      <Container>
        <Header title="Meus filmes" />
        <MoviesList
          showsVerticalScrollIndicator={false}
          data={movies}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <FavoritedItem
              data={item}
              handleDeleteMovie={handleDeleteMovie}
              navigateToDetailsPage={() => navigateToDetailsPage(item)}
            />
          )}
        />
      </Container>
    </>
  );
}
