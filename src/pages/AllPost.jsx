import databaseService from "../appwrite/database.js";
import { useState, useEffect } from "react";
import { Container, Postcard, NoContent, Loader } from "../components/index.js";

function AllPost() {
    const [allPost, setAllPost] = useState([]);

    const [loader, setLoader] = useState(true)

    useEffect(() => {
        databaseService.getPosts().then((posts) => {
            if (posts) {
                setAllPost(posts.documents)
            }
        }).finally(() => {
            setLoader(false)
        })
    }, [])

    if (loader) return <Loader />

    return (
        <div className='w-full py-5'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        allPost.length > 0 ? (
                            allPost.map((post) => (
                                <div key={post.$id} className='w-1/1 sm:w-1/2 md:w-1/3 lg:w-1/4 py-[5px] sm:p-[5px] sm:py-[10px] min-h-full'>
                                    <Postcard  {...post} />
                                </div>
                            ))
                        ) : <NoContent />
                    }
                </div>
            </Container>
        </div>
    )
}

export default AllPost;