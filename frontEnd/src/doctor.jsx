import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Doctor() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
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
      .then(() => {
        navigate("/login");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Espace Docteur</h2>
        {auth ? (
          <>
            <h3 className="text-xl text-green-600 mb-4">Bienvenue, Dr. {name}</h3>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Se déconnecter
            </button>
          </>
        ) : (
          <>
            <h3 className="text-red-500 mb-2">{message}</h3>
            <p className="mb-4 text-gray-600">Veuillez vous connecter pour accéder à votre espace</p>
            <Link to="/login" className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
              Se connecter
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Doctor;
