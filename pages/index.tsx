import { Grid } from "@nextui-org/react";
import { NextPage, GetStaticProps } from "next";
import { pokeApi } from "../api";
import { Layout } from "../components/layouts";
import { PokemonList, SmallPokemon } from "../interfaces";
import { PokeCardItem } from '../components/pokemon/PokeCardItem';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Pokemon-App">

      <Grid.Container gap={1} justify='flex-start'>
        {pokemons.map((pokemon) => (
          <PokeCardItem key={pokemon.id} pokemon={pokemon}/>
        ))
        }
      </Grid.Container>

    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg
  const { data } = await pokeApi.get<PokemonList>('/pokemon?limit=151');
  const pokemons: SmallPokemon[] = data.results.map((pokemon, i) => ({
    ...pokemon,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }));


  return {
    props: {
      pokemons
    }
  }
}

export default HomePage;