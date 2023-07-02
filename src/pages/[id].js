import { Login } from '@/components/Login';
import MovieDetail from '@/components/MovieDetail';
import { getSession, useSession } from 'next-auth/react'
import React, { useState } from 'react'

const MovieDetailPage = ({ movie }) => {
    const {data:session} = useSession()
    const [showPlayer, setShowPlayer] = useState(false);

    if (!session) return <Login />;

    const trailerIndex = movie.videos.results.findIndex(
        (element) => element.type === "Trailer"
    );

    const trailerURL = `https://www.youtube.com/watch?v=${movie.videos?.results[trailerIndex]?.key}`;

    return (
        <div>
            <MovieDetail
                movie={movie}
                showPlayer={showPlayer}
                setShowPlayer={setShowPlayer}
                trailerURL={trailerURL}
            />
        </div>
    )
}

export async function getServerSideProps(ctx) {

    const session = await getSession(ctx)
    const { id } = ctx.query

    const request = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
    ).then((response) => response.json());

    return {
        props: {
            session: session,
            movie: request
        }
    }
}

export default MovieDetailPage