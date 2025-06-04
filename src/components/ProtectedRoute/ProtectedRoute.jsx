import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children, authentication = true }) {
//     const authStatus = useSelector((state) => state.auth.status)
//     const navigate = useNavigate()
//     const [loader, setLoader] = useState(true)

//     useEffect(() => {
//         // true && true
//         if (authentication && !authStatus){
//             //if user have account but not login so redirect it on login page
//             navigate("/login")
//         } else if (!authentication && !authStatus) {
//             //if user have no account and no login so redirect it on signup page
//             navigate("/signup")
//         }

//         setLoader(false)
//     }, [authStatus, authentication, navigate])

//     return loader ? <div>Loading...</div> : children
// }

function ProtectedRoute({children}){
    const authStatus = useSelector((state) => state.auth.status);

    return authStatus ? children : <Navigate to="/login" />
}

export default ProtectedRoute