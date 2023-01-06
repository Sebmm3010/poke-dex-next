import { useState, useEffect } from 'react';
import { Layout } from "../../components/layouts"
import { FavoritePokemonCard, NoFavorites } from "../../components/ui"
import { localFavorites } from "../../utils";

const FavortiePage = () => {
  const [pokemons, setPokemons] = useState<number[]>([]);

  useEffect(() => { setPokemons(localFavorites.pokemons) }, []);


  return (
    <Layout title="Pokemon | Favoritos">
      {pokemons.length === 0
        ? <NoFavorites />
        : <FavoritePokemonCard pokemons={pokemons}/>
      }
    </Layout>
  )
}

export default FavortiePage