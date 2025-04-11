import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Home() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("http://localhost:5000/")
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setName(res.data.name);
                   
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = () => {
      axios.get('http://localhost:5000/logout')
      .then(res => {
          location.reload(true);
      }).catch(err => console.log(err));
  };

  //handleDelete: A function that handles user logout.

//axios.get('http://localhost:8081/logout'):

//Sends a GET request to the /logout endpoint on the backend.

//.then(res => { location.reload(true); }):

//If the request is successful, the page is reloaded to reflect the logout state.

//.catch(err => console.log(err)):

//If an error occurs, it logs the error to the console.
  

    return (
        <div className="container mt-4">
            {auth ? (
                <div>
                    <h3>You are Authorized -- {name}</h3>
                    <button className="btn btn-danger" onClick={handleDelete}>Logout</button>
                </div>
            ) : (
                <div>
                    <h3>{message}</h3>
                    <h3>Login Now</h3>
                    <Link to="/login" className="btn btn-primary">Login</Link>
                </div>
            )}
        </div>
    );
}

export default Home;

//This React component (Home) checks if a user is authenticated when they visit the home page. It makes an API call using Axios to determine authentication status and updates the UI accordingly. If the user is authenticated, their name is displayed along with a logout button. Otherwise, an error message and a login link are shown.
