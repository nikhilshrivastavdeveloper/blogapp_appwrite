import { useState, useEffect } from "react";
import databaseService from "../appwrite/database.js";
import { useSelector } from "react-redux";
import { Container, Postcard, Loader } from "../components/index.js";

function Home() {
    const [posts, setPosts] = useState([])
    // const [loading, setLoading] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authStatus) {
            databaseService.getPosts()
                .then((data) => setPosts(data.documents)) // here i solve a bug
                .catch((err) => console.log(err))
                // .finally(() => setLoading(false))
        }
        //  else {
        //     setLoading(false)
        // }
    }, [authStatus])


    // if (loading) {
    //     return <Loader />
    // }

    if (!authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Here is No post available to read
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home;