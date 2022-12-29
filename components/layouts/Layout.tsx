import { FC, PropsWithChildren, ReactNode } from "react"
import Head from "next/head"
import { Navbar } from '../ui/Navbar';

interface Props {
    children: ReactNode | undefined;
    title?: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title || 'Pokemon-App'}</title>
                <meta name="author" content="Sebastian Madero" />
                <meta name="description" content={`Informacion de ${title || 'xxx'}`} />
                <meta name="keywords" content={`${title || 'xxx'}, pokemon, pokedex`} />
            </Head>

            {/* Navbar */}
            <Navbar/>

            <main  style={{padding:'0px 20px'}}>
                {children}
            </main>
        </>
    )
}
