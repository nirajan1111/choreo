import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

import './../styles/Form.css'
function Form({ route, method }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await api.post(route, { username, password });
            console.log(response.status);
            if (response.status === 200||response.status===201) { 
                console.log(method)
                if (method === 'login') {
                    console.log(response.data);
                    localStorage.setItem(ACCESS_TOKEN, response.data.access);
                    localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                    navigate('/');
                }
                else if (method === 'register') {
                    navigate('/login');
                }
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} >
                <input className="form-input" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className="form-input" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="form-button" type="submit">{loading ? 'Loading...' : method}</button>
            </form>
        </div>
    )

}
export default Form;