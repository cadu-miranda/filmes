// Gerar lista de filmes com o tamanho desejado.

export function getListMovies(size, movies) {
  let popularMovies = [];

  for (let i = 0, l = size; i < l; i++) {
    popularMovies.push(movies[i]);
  }

  return popularMovies;
}

// Gerar um número aleatório com base no tamanho da lista de filmes que for passada.

export function generateRandomMovieBanner(moviesSize) {
  return Math.floor(Math.random() * moviesSize.length);
}
