import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import Header from "../../components/Header";
import SliderItem from "../../components/SliderItem";
import { Feather } from "@expo/vector-icons";
import api, { key } from "../../services/api";
import { getListMovies } from "../../utils/movie";
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

  useEffect(() => {
    let isActive = true;

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

      const nowList = getListMovies(10, nowPlayingData.data.results);
      const popularList = getListMovies(5, popularMoviesData.data.results);
      const topList = getListMovies(5, topRatedData.data.results);

      setNowPlayingMovies(nowList);
      setPopularMovies(popularList);
      setTopRatedMovies(topList);
    }

    getMovies();
  }, []);

  return (
    <>
      <Container>
        <Header title="React Prime" />
        <SearchContainer>
          <Input
            placeholder="ex: Vingadores"
            placeholderTextColor="#ddd"
          ></Input>
          <SearchButton>
            <Feather name="search" size={30} color="#fff" />
          </SearchButton>
        </SearchContainer>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Title>Em cartaz</Title>
          <BannerButton activeOpacity={0.75} onPress={() => alert("teste")}>
            <Banner
              resizeMethod="resize"
              source={{
                uri: `https://image.tmdb.org/t/p/original/${nowPlayingMovies[0].poster_path}`,
              }}
            />
          </BannerButton>

          <MovieSlider
            horizontal
            showsHorizontalScrollIndicator={false}
            data={nowPlayingMovies}
            renderItem={({ item }) => <SliderItem data={item} />}
            keyExtractor={(item) => String(item.id)}
          />

          <Title>Populares</Title>

          <MovieSlider
            horizontal
            showsHorizontalScrollIndicator={false}
            data={popularMovies}
            renderItem={({ item }) => <SliderItem data={item} />}
            keyExtractor={(item) => String(item.id)}
          />

          <Title>Mais Votados</Title>

          <MovieSlider
            horizontal
            showsHorizontalScrollIndicator={false}
            data={topRatedMovies}
            renderItem={({ item }) => <SliderItem data={item} />}
            keyExtractor={(item) => String(item.id)}
          />
        </ScrollView>
      </Container>
    </>
  );
}
