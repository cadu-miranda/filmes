import AsyncStorage from "@react-native-async-storage/async-storage";

// Buscar os filmes salvos

export async function getSavedMovies(key) {
  const myMovies = await AsyncStorage.getItem(key);

  let savedMovies = JSON.parse(myMovies) || [];

  return savedMovies;
}

// Salvar um novo filme

export async function saveMovie(key, newMovie) {
  let storedMovies = await getSavedMovies(key);

  // Se tiver algum filme salvo com esse mesmo ID / ou duplicado precisamos ignorar

  const hasMovie = storedMovies.some((item) => item.id === newMovie.id);

  if (hasMovie) {
    console.log("esse filme já existe na sua lista!");
    return;
  }

  storedMovies.push(newMovie);

  await AsyncStorage.setItem(key, JSON.stringify(storedMovies));
  console.log("filme salvo com sucesso!");
}

// Deletar algum filme em específico

export async function deleteMovie(id) {
  let storedMovies = await getSavedMovies("@primereact");
  let myMovies = storedMovies.filter((item) => {
    return item.id !== id;
  });

  await AsyncStorage.setItem("@primereact", JSON.stringify(myMovies));

  console.log("filme deletado com sucesso!");
  return myMovies;
}

// Filtrar algum filme já salvo

export async function hasMovie(movie) {
  let storedMovies = await getSavedMovies("@primereact");

  const hasMovie = storedMovies.find((item) => item.id === movie.id);

  if (hasMovie) {
    return true;
  }

  return false;
}
