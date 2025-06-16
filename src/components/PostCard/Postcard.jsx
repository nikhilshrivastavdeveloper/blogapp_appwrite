import databaseService from "../../appwrite/database.js";
import { Link } from "react-router-dom";
import { Button } from "../index.js"
import parse from "html-react-parser";
import "./card.css"

function Postcard({ $id, title, image, content, author, date, category }) {

    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full h-full rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-all duration-300 border border-gray-300">
                {/* Image Section */}
                <div className="h-[200px] w-full">
                    <img
                        src={image === "Not Available" ? "../../images/default_image.webp" : databaseService.getFilePreview(image)}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col justify-between h-[calc(100%-200px)]">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2 capitalize text-ellipsis line-clamp-1">{title}</h2>

                    <div className="text-gray-600 text-sm mb-3 max-h-[100px] overflow-hidden capitalize" id="card-content">
                        {parse(content)}
                    </div>

                    <div className="text-sm text-gray-500 space-y-1 mb-2">
                        <p><span className="font-medium text-gray-700">Author :</span> {author}</p>
                        <p><span className="font-medium text-gray-700">Publish Date :</span> {date}</p>
                        <p><span className="font-medium text-gray-700">Category :</span> {category}</p>
                    </div>

                    <div className="mt-auto text-right pt-2 border-t border-gray-300">
                        <Button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-300">
                            Read More
                        </Button>
                    </div>
                </div>
            </div>

        </Link>
    )
}

export default Postcard;    