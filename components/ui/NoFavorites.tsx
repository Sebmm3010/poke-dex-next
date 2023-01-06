import { Container, Text, Image } from '@nextui-org/react'
import React from 'react'

export const NoFavorites = () => {
    return (
        <Container css={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 100px)',
            alignItems: 'center',
            alignSelf: 'center'
        }}
        >
            <Text h1>No hay favoritos puto</Text>
            <Image
                src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'
                alt='pokemon'
                height={250}
                width={250}
                css={{
                    opacity: 0.1
                }}
            />
        </Container>
    )
}
