import { RingLoader } from "react-spinners";

function Loader(){
  return (
    <div className="h-screen bg-black  flex justify-around items-center flex-col overflow-hidden fixed z-[99999] top-0 w-[100%] left-0 ">
      <RingLoader color="#36d7b7" size={175} />
      <h1 className='text-[#36d7b7] text-[25px]'>BigBlog</h1>
    </div>
  )
}

export default Loader;