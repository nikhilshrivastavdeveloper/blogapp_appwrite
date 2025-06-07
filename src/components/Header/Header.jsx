import { LogoutBtn, Container, Logo, Button, Offcanvas } from "../index.js"
import { useSelector } from "react-redux"
import {Link, NavLink } from "react-router-dom"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

function Header() {
    const authStatus = useSelector(state => state.auth.status)

    const [togglebtn, setToggleBtn] = useState(false)

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
         {
            name: "All Posts",
            slug: "/all-posts",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus // false -> true || true -> false 
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus // false -> true || true -> false
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus, //false || true
        }
    ]

    return (
        <header className='shadow bg-[#E0FFE0]'>
            <Container>
                <div className="flex items-center justify-between sm:py-[10px]">
                    <div>
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>

                    {/* hamburger icon is here */}
                    <div className="block sm:hidden">
                        <Button className="px-[10px] py-[5px] rounded-[5px] text-white" onClick={() => setToggleBtn(true)}>
                            <FontAwesomeIcon icon={faBars} />
                        </Button>
                    </div>

                    {/* offcanvas is here */}
                    <Offcanvas status={togglebtn} setStatus={setToggleBtn} links={navItems} authStatus={authStatus} />

                    <nav className='hidden sm:block'>
                        <ul className='flex items-center ml-auto'>
                            {
                                navItems.map((item) => (
                                    item.active &&
                                    <li key={item.name} className="mx-[2px]">
                                        <NavLink to={item.slug} className={({ isActive }) => `${isActive ? "px-6 py-2 duration-200 bg-[#118df3] rounded-full" : ""} inline-block px-6 py-2 duration-200 hover:bg-[#BBDEFB] rounded-full`}>
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ))
                            }
                            {
                                authStatus && <li> <LogoutBtn /> </li>
                            }
                        </ul>
                    </nav>
                </div>
            </Container>
        </header>
    )
}

export default Header