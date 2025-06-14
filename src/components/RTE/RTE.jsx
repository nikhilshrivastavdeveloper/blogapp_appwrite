import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import config from "../../conf/conf.js";
import { useState } from "react";

function RTE({ name = "content", label, control, defaultValue = "" }) {
      const [isEditorLoad, setEditorLoad] = useState(false)

    return (
        <div className="w-full">
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            {!isEditorLoad && <div className="text-center text-[20px]">Loading...</div>}

            <Controller
                name={name}
                control={control}
                rules={{
                    required: "Blog content is required" // rules props to add validation on control component
                }}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey={config.RTEapi}
                        initialValue={defaultValue}
                        onInit={() => setEditorLoad(true)}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}

export default RTE;
