import { useForm } from "react-hook-form"
import databaseService from "../../appwrite/database.js"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { InputBox, Select, RTE, Button } from "../index.js";
import { useEffect, useCallback } from "react";

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, getValues, control,  formState: { errors }  } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })

    const userData = useSelector((state => state.auth.userData))
    const navigate = useNavigate()

    const onsubmit = async (data) => {
        if (post) {
            //run when user want to update post
            //slug treat as a id of post
            const file = data.image[0] ? databaseService.uploadFile(data.image[0]) : null;

            if (file) {
                databaseService.deletePost(post.featuredImage);
            }

            const dbPost = await databaseService.updatePost(post.$id, {
                ...data, featuredImage: file?.$id
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }

        } else {
            //run when user want to create new post
            const file = await databaseService.uploadFile(data.image[0])

            if (file) {
                const fileId = file.$id;
                const dbPost = await databaseService.createPost({ ...data, featuredImage: fileId, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-")
        }

        return ""
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true })
            }
        })

        return () => subscription.unsubscribe()
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <InputBox
                    className="mb-4"
                    {...register("title", { required: true })}
                    label="Title :"
                    placeholder="Title"
                />
                <InputBox
                    className="mb-4"
                    {...register("slug", { required: true })}
                    label="Slug :"
                    placeholder="Slug"
                    onInput={(e) => setValue("slug", slugTransform(e.target.value), { shouldValidate: true })}
                /> 

                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} /> 
            </div>
            <div className="w-1/3 px-2">
                <InputBox
                    className="mb-4"
                    label="Featured Image :"
                    type="file"
                    {...register("image", { required: true })}
                />
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full text-white p-[5px] rounded-[5px] hover:bg-blue-700 duration-300 transition" >{post ? "Update" : "Submit"}</Button>
                
            </div>
        </form>
    )
}

export default PostForm