import { NextPage } from "next";
import { Button } from '@nextui-org/react';
import { Layout } from "../components/layouts";

const HomePage: NextPage = () => {
  return (
    <Layout title="Pokemon-App">
      <Button color="gradient">
        Hola mundo
      </Button>
    </Layout>
  )
}

export default HomePage;