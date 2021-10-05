import React, { useState, useEffect } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import Header from "../../components/Header";
import SliderItem from "../../components/SliderItem";
import { Feather } from "@expo/vector-icons";
import api, { key } from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import { getListMovies, generateRandomMovieBanner } from "../../utils/movie";
import {
  Container,
  Input,
  SearchButton,
  SearchContainer,
  Title,
  BannerButton,
  Banner,
  MovieSlider,
} from "./styles";

export default function Home() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [movieBanner, setMovieBanner] = useState({});
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    let isActive = true;
    const abortController = new AbortController();

    async function getMovies() {
      const [nowPlayingData, popularMoviesData, topRatedData] =
        await Promise.all([
          api.get("/movie/now_playing", {
            params: {
              api_key: key,
              language: "pt-BR",
              page: 1,
            },
          }),
          api.get("/movie/popular", {
            params: {
              api_key: key,
              language: "pt-BR",
              page: 1,
            },
          }),
          api.get("/movie/top_rated", {
            params: {
              api_key: key,
              language: "pt-BR",
              page: 1,
            },
          }),
        ]);

      if (isActive) {
        const nowList = getListMovies(10, nowPlayingData.data.results);
        const popularList = getListMovies(5, popularMoviesData.data.results);
        const topList = getListMovies(5, topRatedData.data.results);

        setMovieBanner(
          nowPlayingData.data.results[
            generateRandomMovieBanner(nowPlayingData.data.results)
          ]
        );

        setNowPlayingMovies(nowList);
        setPopularMovies(popularList);
        setTopRatedMovies(topList);
        setLoading(false);
      }
    }

    getMovies();

    return () => {
      isActive = false;
      abortController.abort();
    };
  }, []);

  function navigateToDetailsPage(item) {
    navigation.navigate("Details", { id: item.id });
  }

  function handleMovieSearch() {
    if (input === "") return;

    navigation.navigate("Search", { name: input });
    setInput("");
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
    <>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header title="React Prime" />
          <SearchContainer>
            <Input
              placeholder="ex: vingadores..."
              placeholderTextColor="#ddd"
              value={input}
              onChangeText={(value) => setInput(value)}
            ></Input>
            <SearchButton onPress={handleMovieSearch}>
              <Feather name="search" size={30} color="#fff" />
            </SearchButton>
          </SearchContainer>

          <Title>Em cartaz</Title>
          <BannerButton
            activeOpacity={0.75}
            onPress={() => navigateToDetailsPage(movieBanner)}
          >
            <Banner
              resizeMethod="resize"
              source={{
                uri: `https://image.tmdb.org/t/p/original/${movieBanner?.poster_path}`,
              }}
            />
          </BannerButton>

          <MovieSlider
            horizontal
            showsHorizontalScrollIndicator={false}
            data={nowPlayingMovies}
            renderItem={({ item }) => (
              <SliderItem
                data={item}
                navigateToDetailsPage={() => navigateToDetailsPage(item)}
              />
            )}
            keyExtractor={(item) => String(item.id)}
          />

          <Title>Populares</Title>
          <MovieSlider
            horizontal
            showsHorizontalScrollIndicator={false}
            data={popularMovies}
            renderItem={({ item }) => (
              <SliderItem
                data={item}
                navigateToDetailsPage={() => navigateToDetailsPage(item)}
              />
            )}
            keyExtractor={(item) => String(item.id)}
          />

          <Title>Mais Votados</Title>
          <MovieSlider
            horizontal
            showsHorizontalScrollIndicator={false}
            data={topRatedMovies}
            renderItem={({ item }) => (
              <SliderItem
                data={item}
                navigateToDetailsPage={() => navigateToDetailsPage(item)}
              />
            )}
            keyExtractor={(item) => String(item.id)}
          />
        </ScrollView>
      </Container>
    </>
  );
}
