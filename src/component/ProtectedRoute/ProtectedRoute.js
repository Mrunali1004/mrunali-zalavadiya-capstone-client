import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({children}) {
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if(!token){
            navigate('/login')
            toast.error("Either Session have expired or You are not logged in. Please Login..")
        }
    },[navigate])
    return <>{children}</>
}