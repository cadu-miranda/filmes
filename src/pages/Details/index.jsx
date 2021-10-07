import React, { useState, useEffect } from "react";
import { ScrollView, Modal, Text } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Stars from "react-native-stars";
import { useNavigation, useRoute } from "@react-navigation/native";
import Genres from "../../components/Genres";
import ModalLink from "../../components/ModalLink";
import { saveMovie, hasMovie, deleteMovie } from "../../utils/storage";
import api, { key } from "../../services/api";
import {
  Container,
  Header,
  HeaderButton,
  Banner,
  ButtonLink,
  Title,
  ContentArea,
  Rate,
  GenresList,
  Description,
} from "./styles";

export default function Details() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState({});
  const [openLink, setOpenLink] = useState(false);
  const [favoritedMovie, setFavoritedMovie] = useState(false);

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

        const isFavorite = await hasMovie(response.data);

        setFavoritedMovie(isFavorite);
      }
    }

    if (isActive) {
      getMovie();
    }

    return () => {
      isActive = false;
    };
  }, []);

  async function handleFavoriteMovie(movie) {
    if (favoritedMovie) {
      await deleteMovie(movie.id);
      setFavoritedMovie(false);

      alert("Filme removido da sua lista.");
    } else {
      await saveMovie("@primereact", movie);
      setFavoritedMovie(true);
      alert("Filme salvo na sua lista.");
    }
  }

  return (
    <>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header>
            <HeaderButton
              activeOpacity={0.75}
              onPress={() => navigation.goBack()}
            >
              <Feather name="arrow-left" size={28} color="#fff" />
            </HeaderButton>
            <HeaderButton onPress={() => handleFavoriteMovie(movie)}>
              <Ionicons
                name={favoritedMovie ? "bookmark" : "bookmark-outline"}
                size={28}
                color="#fff"
              />
            </HeaderButton>
          </Header>

          <Banner
            resizeMethod="resize"
            source={{
              uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
            }}
          />

          {movie.homepage ? (
            <>
              <ButtonLink
                activeOpacity={0.75}
                onPress={() => setOpenLink(true)}
              >
                <Feather name="link" size={24} color="#fff" />
              </ButtonLink>
            </>
          ) : null}

          <Title numberOfLines={2}>{movie.title}</Title>

          <ContentArea>
            <Stars
              default={Number(movie.vote_average / 2)}
              count={5}
              half
              starSize={20}
              fullStar={<Ionicons name="md-star" size={24} color="#e7a74e" />}
              emptyStar={
                <Ionicons name="md-star-outline" size={24} color="#e7a74e" />
              }
              halfStar={
                <Ionicons name="md-star-half" size={24} color="#e7a74e" />
              }
              disable
            />
            <Rate>{`${movie.vote_average}/10`}</Rate>
          </ContentArea>
          <GenresList
            data={movie?.genres}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <Genres data={item} />}
          />

          <ScrollView showsVerticalScrollIndicator={false}>
            <Title>Descrição</Title>
            {movie?.overview ? (
              <Description>{movie?.overview}</Description>
            ) : (
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "bold",
                  paddingBottom: 8,
                  paddingLeft: 14,
                  paddingRight: 14,
                  marginTop: 8,
                }}
              >
                Sem descrição.
              </Text>
            )}
          </ScrollView>

          <Modal animationType="slide" transparent visible={openLink}>
            <ModalLink
              link={movie?.homepage}
              title={movie?.title}
              closeModal={() => setOpenLink(false)}
            />
          </Modal>
        </ScrollView>
      </Container>
    </>
  );
}
