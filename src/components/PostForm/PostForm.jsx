import { useForm } from "react-hook-form"
import databaseService from "../../appwrite/database.js"
import { useSelector } from "react-redux"
import { InputBox, Select, RTE, Button, RadioBox } from "../index.js";
import { useEffect, useCallback } from "react";
import DOMPurify from 'dompurify';
import { toastSuccess } from "../toastify.js";
import { ToastContainer, Bounce } from 'react-toastify';

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, getValues, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || ""
        }
    })

    const userData = useSelector((state) => state.auth.userData)
    const date = new Date().toLocaleDateString('IN-hi') // current date

    const onsubmit = async (data) => {
        //slug treat as a id of post             
        data = { ...data, content: DOMPurify.sanitize(data.content) } // second layer of protection to prevent xss

        try {
            if (post) {
                //run when user want to update post
                const file = data.image?.length > 0 && await databaseService.uploadFile(data.image[0])

                if (file) {
                    databaseService.deletePost(post.image);
                }

                const dbPost = await databaseService.updatePost(post.$id, {
                    ...data, image: !file ? post.image : file.$id
                })

                if (dbPost) {
                    toastSuccess('Post Update Successfully')
                }

            } else {
                //run when user want to create new post
                const file = data.image?.length > 0 && await databaseService.uploadFile(data.image[0])

                const fileId = file ? file.$id : "Not Available"
                const dbPost = await databaseService.createPost({ ...data, image: fileId, userID: userData.$id, author: userData.name, date });

                if (dbPost) {
                    toastSuccess('Post Created Successfully')
                }
            }
        } catch (err) {
            console.log(err)
        } finally {
            reset()
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value.trim().toLowerCase().replace(/[^a-zA-Z\s]+/g, "-").replace(/\s/g, "-")
        }

        return ""
    }, [])

    //check user uploaded file
    const checkFile = (data) => {
        console.log(data)
        if (!data || data.length === 0) return true // if data variable have no data mean user don't want to upload any file that's why we return true so that validation error doesn't occur

        const fileSizeAllow = 10485760

        if (data[0].size > fileSizeAllow) {
            return false
        }

        return true
    }

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true })
            }
        })

        return () => subscription.unsubscribe()
    }, [watch])

    // if (loader) {
    //     return <Loader />
    // }

    return (
        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col lg:flex-row gap-6 p-4 rounded-xl bg-white">

            {/* here is a toast container */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            {/* Left Section */}
            <div className="lg:w-1/3 w-full space-y-4">
                <InputBox
                    {...register("title", {
                        required: "Please fill out this field",
                        pattern: {
                            value: /^[a-zA-Z0-9\s\-:,'?!]+$/,
                            message: "Only letters, numbers, spaces, and basic punctuation (: , ' ? !) are allowed."
                        }
                    })}
                    label="Title :"
                    placeholder="Title"
                />
                {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}

                <InputBox
                    {...register("slug", { required: "Please fill out this field" })}
                    label="Slug :"
                    placeholder="Slug"
                    onInput={(e) => setValue("slug", slugTransform(e.target.value), { shouldValidate: true })}
                />
                {errors.slug && <p className="text-red-600 text-sm">{errors.slug.message}</p>}

                <Select
                    options={["Technology", "Sport", "Travel", "Food", "Health", "Finance", "Business", "Environment", "Motivation"]}
                    label="Category :"
                    {...register("category", { required: "Please fill out this field" })}
                />
                {errors.category && <p className="text-red-600 text-sm">{errors.category.message}</p>}

            </div>

            {/* Right Section */}
            <div className="lg:w-2/3 w-full space-y-4">
                <InputBox
                    label="Blog Image (Optional) :"
                    type="file"
                    accept=".jpg,.png,.jpeg,.avif"
                    {...register("image", {
                        required: false,
                        validate: (value) => checkFile(value) || "File Size must be under 10MB"
                    })}
                />
                {errors.image && <p className="text-red-600 text-sm">{errors.image.message}</p>}

                <RadioBox
                    options={["Yes", "No"]}
                    label="Comment Allow :"
                    {...register("comments", { required: "Please fill out this field" })}
                />
                {errors.comments && <p className="text-red-600 text-sm">{errors.comments.message}</p>}

                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                {errors.content && <p className="text-red-600 text-sm">{errors.content.message}</p>}

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : "bg-blue-600"}
                    className="w-full text-white py-2 rounded-lg hover:bg-blue-700 duration-300 transition"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>

    )
}

export default PostForm