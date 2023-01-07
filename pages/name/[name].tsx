import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

import { pokeApi } from '../../api/getPokemon';
import { Pokemon } from "../../interfaces";
import { localFavorites } from "../../utils";

import confetti from "canvas-confetti";

import { Layout } from "../../components/layouts";
import { useEffect, useState } from "react";
import { PokemonList, SmallPokemon } from '../../interfaces/pokemon-list';

interface Props {
    pokemon: Pokemon
}

const PokemonNamePage: NextPage<Props> = ({ pokemon }) => {

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


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    // const { data } = await  // your fetch function here 

    const {data} = await pokeApi.get<PokemonList>('/pokemon?limit=151');
    const pokemons151: string[] = data.results.map(pokemon=>pokemon.name);
    
    // const pokemon151=data;

    return {
        paths: pokemons151.map(name=>({
            params:{name}
        })),
        fallback: false
    }
}


// Get static props
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string };

    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${name}`);


    return {
        props: {
            pokemon: data
        }
    }
}


export default PokemonNamePage;