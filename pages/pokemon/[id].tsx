import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

import { pokeApi } from '../../api/getPokemon';
import { Pokemon } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";

import confetti from "canvas-confetti";

import { Layout } from "../../components/layouts";
import { useEffect, useState } from "react";

interface Props {
  pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorite, setIsInFavorite] = useState(false);

  useEffect(() => {
    setIsInFavorite(localFavorites.existLocalStorage(pokemon.id));

  }, []);


  const handleFavorite = () => {
    localFavorites.tooglefavorite(pokemon.id);
    setIsInFavorite(!isInFavorite);

    if (isInFavorite) return;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    })
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 0,
        y: 0
      }
    })
  }

  return (
    <Layout title={`Pokemon | ${pokemon.name}`}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || 'no-image.png'}
                alt={pokemon.name}
                width='100%'
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform="capitalize">{pokemon.name}</Text>
              <Button
                color="gradient"
                ghost={!isInFavorite}
                onClick={handleFavorite}
              >
                {isInFavorite ? 'Eliminar de favoritos' : 'Guardar en favoritos'}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>

        </Grid>
      </Grid.Container>
    </Layout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  // const { data } = await  // your fetch function here 

  const pokemon151 = [...Array(151)].map((value, i) => `${i + 1}`);

  return {
    paths: pokemon151.map(id => ({
      params: { id }
    })),
    // fallback: false
    fallback: 'blocking'
  }
}


// Get static props
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  // const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);
  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {
      pokemon
    },
    revalidate: 86400
  }
}

export default PokemonPage