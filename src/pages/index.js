import Image from 'next/image'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { getSession, useSession } from 'next-auth/react'
import { Login } from '@/components/Login'
import Navbar from '@/components/Navbar'
import requests from '@/utils/request'
import Hero from '@/components/Hero'
import Row from '@/components/Row'

const inter = Inter({ subsets: ['latin'] })

export default function Home({
  moviePosters,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}) {

  const { data: session } = useSession()
  if (!session) return <Login />


  return (
    <>
      <header>
        <title>Netflix</title>
      </header>
      <main className='relative bg-gradient-to-b from-gray-900/10 to-[#010511]'>
        <Hero moviePosters={moviePosters} />
        <section className="container pb-32">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)

  const [
    moviePosters,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchMoviePosters).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      session: session,
      moviePosters: moviePosters.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    }
  }
}
