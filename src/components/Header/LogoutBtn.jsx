import authService from "../../appwrite/auth.js"
import { logout } from "../../../app/authSlice.js"
import { useDispatch } from "react-redux"
import {Button} from "../index.js";

function LogoutBtn(){
    const dispatch = useDispatch()

    const logoutHandler = async () => {
        try{
            const res = await authService.logout()
            dispatch(logout())
        }catch(err){
            console.log(err)
        }
    }

        return (
            <Button 
            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-700 rounded-full'
            onClick={logoutHandler}>
                Logout
            </Button>
        )
}

export default LogoutBtn