import React, { FC } from 'react'
import { Card, Grid, Row, Text } from '@nextui-org/react'
import { SmallPokemon } from '../../interfaces'
import { useRouter } from 'next/router'

interface Props {
    pokemon: SmallPokemon
}

export const PokeCardItem: FC<Props> = ({ pokemon }) => {
    const { id, name, img } = pokemon;

    const router = useRouter();
    const handleClick = () => {
        router.push(`/pokemon/${id}`);
    }

    return (
        <Grid xs={6} sm={3} md={2} xl={1} key={id}>
            <Card
                onClick={handleClick}
                hoverable
                clickable>
                <Card.Body>
                    <Card.Image
                        src={img}
                        width="100%"
                        height={140}
                    />
                </Card.Body>
                <Card.Footer>
                    <Row justify="space-between">
                        <Text transform="capitalize">{name}</Text>
                        <Text>#{id}</Text>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
    )
}
