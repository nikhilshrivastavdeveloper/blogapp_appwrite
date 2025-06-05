import databaseService from "../../appwrite/database.js";
import { Link } from "react-router-dom";

function Postcard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full h-full bg-gray-100 rounded-[5px] border-[1px] border-black/50'>
                <div className='w-1/1 h-1/2 justify-center mb-4 bg-white rounded-tl-[5px] rounded-tr-[5px]'>
                    <img src={databaseService.getFilePreview(featuredImage)} alt={title}
                        className='rounded-tl-[5px] rounded-tr-[5px] object-cover w-full h-full border-black/50' />
                </div>
                <div className="p-[5px]">
                    <h2
                        className='text-xl font-bold'
                    >{title}</h2>
                </div>
            </div>
        </Link>
    )
}

export default Postcard;    