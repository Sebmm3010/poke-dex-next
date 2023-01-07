import { FC, PropsWithChildren, ReactNode } from "react"
import Head from "next/head"
import { Navbar } from '../ui/Navbar';

interface Props {
    children: ReactNode | undefined;
    title?: string;
}

const origin= (typeof window === 'undefined')?'': window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title || 'Pokemon-App'}</title>
                <meta name="author" content="Sebastian Madero" />
                <meta name="description" content={`Informacion de ${title}`} />
                <meta name="keywords" content={`${title}, pokemon, pokedex`} />
                <meta property="og:title" content={`Informacion sobre ${title}`} />
                <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
                <meta property="og:image" content={`${origin}/imgs/banner.png`} />
                <meta property="og:type" content="image" />
                <meta property="og:url" content={`/pokemon/${title}`}/>
            </Head>

            {/* Navbar */}
            <Navbar />

            <main style={{ padding: '0px 20px' }}>
                {children}
            </main>
        </>
    )
}
