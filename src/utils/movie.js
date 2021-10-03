// Gerar lista de filmes com o tamanho desejado.

export function getListMovies(size, movies) {
  let popularMovies = [];

  for (let i = 0, l = size; i < l; i++) {
    popularMovies.push(movies[i]);
  }

  return popularMovies;
}
