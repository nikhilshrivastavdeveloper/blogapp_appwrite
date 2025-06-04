import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { LogoutBtn, Button } from "../index.js"

function Offcanvas({ status, setStatus, links, authStatus }) {
  return (
    <>
      <div className={`w-[60%] bg-gray-300 p-[20px] z-[9999] fixed top-0 ${status ? "right-0" : "right-[-60%]"} duration-300 h-screen`}>

        <div className="flex justify-end mb-[10px]">
          <Button className="px-[10px] py-[5px] rounded-[5px]" onClick={() => setStatus(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </div>

        <hr />

        <div>
          <ul className="h-[200px] flex flex-col justify-between items-center mt-[15px]">
            {
              links.map((item) => (
                item.active &&
                <li key={item.name} onClick={() => setStatus(false)}>
                  <NavLink to={item.slug} className={({isActive}) => isActive ? "px-6 py-2 duration-200 bg-[#118df3] rounded-full" : ""}>
                     {item.name}
                  </NavLink>
                </li>
              ))
            }
            {
              authStatus && <li> <LogoutBtn /> </li>
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default Offcanvas;