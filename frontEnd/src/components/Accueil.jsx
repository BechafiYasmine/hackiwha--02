import { useState } from 'react';
import { AlertCircle, HandHeart } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';



export default function Accueil() {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSubmit = async (e) => { 
    e.preventDefault();
  
    try {
      const res = await axios.post('http://localhost:5000/questions', {
        question,
        category: 'General', // You can replace this or add a select input
      });
  
      if (res.data.Status === 'Success') {
        setSubmitted(true);
        setQuestion('');
        setTimeout(() => setSubmitted(false), 4000); // Optional reset
      }
    } catch (err) {
      console.error("Error submitting question:", err.response?.data || err.message);
      alert("Erreur lors de l'envoi de votre question.");
    }
  };
  


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Navbar avec icône */}
      <nav className="bg-white shadow-lg py-4">
        <div className="container mx-auto flex items-center justify-between px-6">
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <HandHeart className="h-8 w-8 text-purple-600 mr-2" />
              <img src="/logo-takafoul.png" alt="Logo Takafoul" className="h-10" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-2">
                Takafoul
              </span>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-blue-800 hover:text-purple-600 font-medium transition-colors">
              Accueil
            </Link>
            <Link to="#a-propos" className="text-blue-800 hover:text-purple-600 font-medium transition-colors">
              À Propos
            </Link>
            <Link to="#services" className="text-blue-800 hover:text-purple-600 font-medium transition-colors">
              Services
            </Link>
            <Link to="/contact" className="text-blue-800 hover:text-purple-600 font-medium transition-colors">
              Contact
            </Link>
          </div>

          {/* Bouton Connexion */}
          <div className="hidden md:flex">
            <Link 
              to="/login" 
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors shadow-md"
            >
              Connexion
            </Link>
          </div>

          {/* Menu Mobile */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-blue-800 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Menu Mobile Ouvert */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white py-4 px-6 space-y-3 border-t border-blue-100">
            <Link to="/" className="block py-2 text-blue-800 hover:text-purple-600">Accueil</Link>
            <Link to="#a-propos" className="block py-2 text-blue-800 hover:text-purple-600">À Propos</Link>
            <Link to="#services" className="block py-2 text-blue-800 hover:text-purple-600">Services</Link>
            <Link to="/contact" className="block py-2 text-blue-800 hover:text-purple-600">Contact</Link>
            <div className="pt-2 border-t border-blue-100">
              <Link 
                to="/register" 
                className="block py-2 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700"
              >
                Connexion
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Section Hero */}
      <section className="relative h-96 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Bienvenue sur Takafoul</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Plateforme collaborative de santé solidaire pour enfants neuroatypiques
          </p>
        </div>
      </section>

      {/* Contenu Principal */}
      <main className="container mx-auto px-4 py-12">
        {/* Section À Propos */}
        <section id="a-propos" className="bg-white rounded-xl shadow-lg p-8 mb-12 border-l-8 border-purple-500">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">À Propos de Takafoul</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-blue-900 mb-4">
                Takafoul, qui signifie solidarité en arabe, est une plateforme dédiée à l'accompagnement des enfants
                atteints d'autisme ou de trisomie 21. Notre mission est de créer un espace interactif et collaboratif
                entre professionnels de santé, parents et aidants familiaux.
              </p>
              <p className="text-blue-900">
                Nous croyons en la force de la communauté et de la collaboration pour améliorer le bien-être et le
                développement de ces enfants exceptionnels.
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-100">
              <img 
                src="/about-image.jpg" 
                alt="Enfants jouant ensemble" 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Section Services */}
        <section id="services" className="mb-16">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Nos Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Suivi Médical",
                description: "Tableaux de bord personnalisés avec évaluations périodiques et rapports d'évolution.",
                icon: "📊",
                color: "bg-blue-100"
              },
              {
                title: "Réseau d'Entraide",
                description: "Espace d'échange entre familles et professionnels pour partager conseils et expériences.",
                icon: "🤝",
                color: "bg-purple-100"
              },
              {
                title: "Coordination des Soins",
                description: "Gestion centralisée des rendez-vous et activités thérapeutiques.",
                icon: "🗓️",
                color: "bg-blue-100"
              },
              {
                title: "Ressources Éducatives",
                description: "Accès à des documents et guides pratiques pour les parents et accompagnateurs.",
                icon: "📚",
                color: "bg-purple-100"
              },
              {
                title: "Questions aux Experts",
                description: "Posez vos questions à notre réseau de professionnels spécialisés.",
                icon: "💬",
                color: "bg-blue-100"
              },
              {
                title: "Alertes Personnalisées",
                description: "Notifications pour les rendez-vous importants et les étapes clés.",
                icon: "🔔",
                color: "bg-purple-100"
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className={`${service.color} p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500`}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">{service.title}</h3>
                <p className="text-blue-900">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Formulaire de Questions */}
        <section className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 border-t-4 border-purple-500">
    <h3 className="text-2xl font-bold text-center text-blue-800 mb-6">
      Une question pour nos experts ?
    </h3>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="question" className="block text-blue-800 font-medium mb-2">
          Posez votre question
        </label>
        <textarea
          id="question"
          rows={5}
          className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Écrivez votre question ici..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
      >
        Envoyer ma question
      </button>
       
       

      {submitted && (
        <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-center">
          <AlertCircle className="mr-2 text-green-600" />
          Votre question a bien été envoyée à nos experts.
        </div>
      )}
    </form>
  </section>
      </main>

      {/* Pied de Page */}
      <footer className="bg-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <HandHeart className="h-6 w-6 text-white mr-2" />
                <img src="/logo-takafoul-white.png" alt="Takafoul" className="h-8" />
              </div>
              <p className="mt-2 text-blue-200">Solidarité et accompagnement pour tous</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4">Navigation</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-blue-200 hover:text-white">Accueil</Link></li>
                  <li><Link to="#a-propos" className="text-blue-200 hover:text-white">À Propos</Link></li>
                  <li><Link to="#services" className="text-blue-200 hover:text-white">Services</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Contact</h4>
                <ul className="space-y-2">
                  <li className="text-blue-200">contact@takafoul.com</li>
                  <li className="text-blue-200">+33 1 23 45 67 89</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Réseaux</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-blue-200 hover:text-white text-xl">📱</a>
                  <a href="#" className="text-blue-200 hover:text-white text-xl">📘</a>
                  <a href="#" className="text-blue-200 hover:text-white text-xl">📸</a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-700 mt-8 pt-6 text-center text-blue-300">
            <p>© 2025 Takafoul. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}