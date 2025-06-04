import databaseService from "../appwrite/database.js";
import { useState, useEffect } from "react";
import { Container, Postcard } from "../components/index.js";

function AllPost() {
    const [allPost, setAllPost] = useState([]);

    useEffect(() => {
        databaseService.getPosts().then((posts) => {
            if (posts) {
                setAllPost(posts.documents)
            }
        })
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                   {
                    allPost.length > 0 ? (
                        allPost.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <Postcard  {...post} />
                            </div>
                        ))
                    ) : "No post is available to Read"
                   }
                </div>
            </Container>
        </div>
    )
}

export default AllPost;