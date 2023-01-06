import { Card, Grid } from "@nextui-org/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC } from "react"

interface Props{
  pokemons:number[]
}
export const FavoritePokemonCard:FC<Props > = ({pokemons}) => {

  const router=useRouter();
  const handleNavigate=(id:number)=>{
    router.push(`/pokemon/${id}`)
  }

  return (
    <Grid.Container gap={2} direction='row' justify='flex-start'>
      {
        pokemons.map(id => (
          <Grid xs={6} sm={2} xl={1} key={id}>
            {/* <Link href={''}> */}
              <Card hoverable clickable css={{ padding: 10 }} onClick={()=>handleNavigate(id)}>
                <Card.Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                  width={'100%'}
                  height={'140px'}
                />
              </Card>            
            {/* </Link> */}
          </Grid>
        ))
      }
    </Grid.Container>
  )
}
