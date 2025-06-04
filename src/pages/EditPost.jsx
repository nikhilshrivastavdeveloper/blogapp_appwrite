import { useState, useEffect } from "react";
import { Container, PostForm } from "../components/index.js";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/database.js";

function EditPost() {
    const [post, setPost] = useState(null)
    const navigate = useNavigate()
    const { slug } = useParams()

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate("/")
        }

    }, [slug, navigate])

    return post && (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    )
}

export default EditPost;