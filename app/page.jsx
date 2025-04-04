'use client';
import { useState, useEffect } from "react";

const flashcardGroups = {
  "Colores": [
    { fr: "rouge", es: "rojo", example: "La voiture est rouge. → El coche es rojo." },
    { fr: "bleu", es: "azul", example: "Le ciel est bleu. → El cielo es azul." },
    { fr: "vert", es: "verde", example: "L’herbe est verte. → La hierba es verde." },
    { fr: "jaune", es: "amarillo", example: "Le soleil est jaune. → El sol es amarillo." },
    { fr: "noir", es: "negro", example: "Le chat est noir. → El gato es negro." },
    { fr: "blanc", es: "blanco", example: "La neige est blanche. → La nieve es blanca." },
    { fr: "gris", es: "gris", example: "Le mur est gris. → La pared es gris." },
    { fr: "orange", es: "naranja", example: "Je porte une chemise orange. → Llevo una camisa naranja." },
    { fr: "rose", es: "rosado", example: "Elle aime le rose. → A ella le gusta el rosado." },
    { fr: "marron", es: "marrón", example: "Le chocolat est marron. → El chocolate es marrón." }
  ],
  "Emociones": [
    { fr: "heureux", es: "feliz", example: "Je suis heureux. → Estoy feliz." },
    { fr: "triste", es: "triste", example: "Elle est triste. → Ella está triste." },
    { fr: "fatigué", es: "cansado", example: "Je suis fatigué. → Estoy cansado." },
    { fr: "fâché", es: "enojado", example: "Il est fâché. → Él está enojado." },
    { fr: "calme", es: "calmo", example: "Elle est calme. → Ella está tranquila." },
    { fr: "stressé", es: "estresado", example: "Je suis stressé. → Estoy estresado." },
    { fr: "amoureux", es: "enamorado", example: "Il est amoureux. → Él está enamorado." },
    { fr: "nerveux", es: "nervioso", example: "Elle est nerveuse. → Ella está nerviosa." },
    { fr: "content", es: "contento", example: "Nous sommes contents. → Estamos contentos." },
    { fr: "surpris", es: "sorprendido", example: "Tu es surpris ? → ¿Estás sorprendido?" }
  ],
  "Lugares": [
    { fr: "maison", es: "casa", example: "Je suis à la maison. → Estoy en casa." },
    { fr: "école", es: "escuela", example: "Les enfants vont à l’école. → Los niños van a la escuela." },
    { fr: "travail", es: "trabajo", example: "Il est au travail. → Él está en el trabajo." },
    { fr: "ville", es: "ciudad", example: "Paris est une belle ville. → París es una ciudad bonita." },
    { fr: "rue", es: "calle", example: "La rue est longue. → La calle es larga." },
    { fr: "hôpital", es: "hospital", example: "Elle travaille à l’hôpital. → Ella trabaja en el hospital." },
    { fr: "magasin", es: "tienda", example: "Je vais au magasin. → Voy a la tienda." },
    { fr: "restaurant", es: "restaurante", example: "Nous dînons au restaurant. → Cenamos en el restaurante." },
    { fr: "parc", es: "parque", example: "Il joue dans le parc. → Él juega en el parque." },
    { fr: "plage", es: "playa", example: "La plage est magnifique. → La playa es hermosa." }
  ],
  "Comida": [
    { fr: "pain", es: "pan", example: "Je mange du pain. → Como pan." },
    { fr: "fromage", es: "queso", example: "Il adore le fromage. → Le encanta el queso." },
    { fr: "eau", es: "agua", example: "Je bois de l’eau. → Bebo agua." },
    { fr: "lait", es: "leche", example: "Elle boit du lait. → Ella bebe leche." },
    { fr: "vin", es: "vino", example: "Nous buvons du vin. → Bebemos vino." },
    { fr: "pomme", es: "manzana", example: "La pomme est rouge. → La manzana es roja." },
    { fr: "poisson", es: "pescado", example: "Il mange du poisson. → Él come pescado." },
    { fr: "viande", es: "carne", example: "Je n’aime pas la viande. → No me gusta la carne." },
    { fr: "sucre", es: "azúcar", example: "Tu veux du sucre ? → ¿Quieres azúcar?" },
    { fr: "sel", es: "sal", example: "Le sel est sur la table. → La sal está sobre la mesa." }
  ],
  "Familia": [
    { fr: "mère", es: "madre", example: "Ma mère est gentille. → Mi madre es amable." },
    { fr: "père", es: "padre", example: "Mon père travaille beaucoup. → Mi padre trabaja mucho." },
    { fr: "frère", es: "hermano", example: "J’ai un frère. → Tengo un hermano." },
    { fr: "sœur", es: "hermana", example: "Elle a une sœur. → Ella tiene una hermana." },
    { fr: "enfant", es: "niño / hija(o)", example: "L’enfant dort. → El niño duerme." },
    { fr: "fils", es: "hijo", example: "C’est mon fils. → Es mi hijo." },
    { fr: "fille", es: "hija / niña", example: "Sa fille est petite. → Su hija es pequeña." },
    { fr: "ami", es: "amigo", example: "Il est mon meilleur ami. → Es mi mejor amigo." },
    { fr: "amie", es: "amiga", example: "C’est une bonne amie. → Es una buena amiga." },
    { fr: "famille", es: "familia", example: "J’aime ma famille. → Amo a mi familia." }
  ],
  "Números": [
    { fr: "un", es: "uno", example: "J’ai un frère. → Tengo un hermano." },
    { fr: "deux", es: "dos", example: "Elle a deux chats. → Ella tiene dos gatos." },
    { fr: "trois", es: "tres", example: "Nous avons trois enfants. → Tenemos tres hijos." },
    { fr: "quatre", es: "cuatro", example: "Il y a quatre chaises. → Hay cuatro sillas." },
    { fr: "cinq", es: "cinco", example: "Je veux cinq pommes. → Quiero cinco manzanas." },
    { fr: "six", es: "seis", example: "Il est six heures. → Son las seis." },
    { fr: "sept", es: "siete", example: "La semaine a sept jours. → La semana tiene siete días." },
    { fr: "huit", es: "ocho", example: "L’école commence à huit heures. → La escuela empieza a las ocho." },
    { fr: "neuf", es: "nueve", example: "Elle a neuf ans. → Ella tiene nueve años." },
    { fr: "dix", es: "diez", example: "Comptez jusqu’à dix ! → ¡Cuenta hasta diez!" }
  ],
  "Preguntas y conectores": [
    { fr: "quoi", es: "qué", example: "Tu fais quoi ? → ¿Qué haces?" },
    { fr: "qui", es: "quién", example: "Qui est là ? → ¿Quién está ahí?" },
    { fr: "où", es: "dónde", example: "Où est la gare ? → ¿Dónde está la estación?" },
    { fr: "quand", es: "cuándo", example: "Quand arrives-tu ? → ¿Cuándo llegas?" },
    { fr: "comment", es: "cómo", example: "Comment ça va ? → ¿Cómo estás?" },
    { fr: "pourquoi", es: "por qué", example: "Pourquoi tu ris ? → ¿Por qué te ríes?" },
    { fr: "parce que", es: "porque", example: "Je suis ici parce que j’ai faim. → Estoy aquí porque tengo hambre." },
    { fr: "et", es: "y", example: "Marie et Paul sont là. → María y Pablo están ahí." },
    { fr: "mais", es: "pero", example: "Il est fatigué mais heureux. → Está cansado pero feliz." },
    { fr: "donc", es: "entonces / por lo tanto", example: "Je suis malade, donc je reste chez moi. → Estoy enfermo, así que me quedo en casa." }
  ],
  "Verbos Comunes": [
    { fr: "être", es: "ser / estar", example: "Je suis heureux. → Yo estoy feliz." },
    { fr: "avoir", es: "tener", example: "Tu as un chat. → Tú tienes un gato." },
    { fr: "faire", es: "hacer", example: "Elle fait du sport. → Ella hace deporte." },
    { fr: "aller", es: "ir", example: "Nous allons à l’école. → Vamos a la escuela." },
    { fr: "dire", es: "decir", example: "Il dit la vérité. → Él dice la verdad." },
    { fr: "pouvoir", es: "poder", example: "Je peux venir. → Puedo venir." },
    { fr: "vouloir", es: "querer", example: "Ils veulent du café. → Ellos quieren café." },
    { fr: "savoir", es: "saber", example: "Tu sais la réponse. → Tú sabes la respuesta." },
    { fr: "devoir", es: "deber", example: "Je dois étudier. → Debo estudiar." },
    { fr: "venir", es: "venir", example: "Elle vient demain. → Ella viene mañana." }
  ],
  "frases comunes": [
    { fr: "Bonjour", es: "Buenos días / Hola", example: "Bonjour, comment allez-vous ? → Buenos días, ¿cómo está usted?" },
    { fr: "Bonsoir", es: "Buenas noches (al llegar)", example: "Bonsoir, madame. → Buenas noches, señora." },
    { fr: "Bonne nuit", es: "Buenas noches (al irse a dormir)", example: "Bonne nuit, à demain. → Buenas noches, hasta mañana." },
    { fr: "Merci", es: "Gracias", example: "Merci pour ton aide. → Gracias por tu ayuda." },
    { fr: "De rien", es: "De nada", example: "—Merci ! —De rien. → ¡Gracias! —De nada." },
    { fr: "S’il vous plaît", es: "Por favor (formal)", example: "Un café, s’il vous plaît. → Un café, por favor." },
    { fr: "Excusez-moi", es: "Disculpe", example: "Excusez-moi, où est la gare ? → Disculpe, ¿dónde está la estación?" },
    { fr: "Je suis désolé", es: "Lo siento", example: "Je suis désolé pour le retard. → Siento el retraso." },
    { fr: "Je ne comprends pas", es: "No entiendo", example: "Pardon, je ne comprends pas. → Perdón, no entiendo." },
    { fr: "Parlez-vous espagnol ?", es: "¿Habla usted español?", example: "Parlez-vous espagnol ? → ¿Habla usted español?" }
  ],

  "frases para el uso cotidiano": [
    { fr: "Comment tu t’appelles ?", es: "¿Cómo te llamas?", example: "Comment tu t’appelles ? → ¿Cómo te llamas?" },
    { fr: "Je m’appelle Juan", es: "Me llamo Juan", example: "Je m’appelle Juan. → Me llamo Juan." },
    { fr: "Comment ça va ?", es: "¿Cómo estás?", example: "Salut ! Comment ça va ? → ¡Hola! ¿Cómo estás?" },
    { fr: "Ça va bien", es: "Estoy bien", example: "Ça va bien, merci. → Estoy bien, gracias." },
    { fr: "J’ai faim", es: "Tengo hambre", example: "J’ai faim, on mange ? → Tengo hambre, ¿comemos?" },
    { fr: "J’ai soif", es: "Tengo sed", example: "Il fait chaud, j’ai soif. → Hace calor, tengo sed." },
    { fr: "Combien ça coûte ?", es: "¿Cuánto cuesta?", example: "Combien ça coûte ? → ¿Cuánto cuesta?" },
    { fr: "Où sont les toilettes ?", es: "¿Dónde están los baños?", example: "Excusez-moi, où sont les toilettes ? → Disculpe, ¿dónde están los baños?" },
    { fr: "Je suis perdu(e)", es: "Estoy perdido/a", example: "Je suis perdu, pouvez-vous m’aider ? → Estoy perdido, ¿puede ayudarme?" },
    { fr: "Je ne parle pas bien français", es: "No hablo bien francés", example: "Désolé, je ne parle pas bien français. → Perdón, no hablo bien francés." },
  ],
  "transporte y viajes": [
    { fr: "train", es: "tren", example: "Je prends le train à 9h. → Tomo el tren a las 9." },
    { fr: "avion", es: "avión", example: "L’avion décolle à midi. → El avión despega al mediodía." },
    { fr: "bus", es: "autobús", example: "Le bus est en retard. → El autobús está retrasado." },
    { fr: "voiture", es: "coche", example: "Elle conduit une voiture rouge. → Ella conduce un coche rojo." },
    { fr: "métro", es: "metro", example: "Je vais au travail en métro. → Voy al trabajo en metro." },
    { fr: "gare", es: "estación de tren", example: "La gare est près d’ici. → La estación está cerca de aquí." },
    { fr: "aéroport", es: "aeropuerto", example: "Nous allons à l’aéroport. → Vamos al aeropuerto." },
    { fr: "billet", es: "billete / boleto", example: "J’ai acheté un billet pour Paris. → Compré un billete para París." },
    { fr: "valise", es: "maleta", example: "Ma valise est lourde. → Mi maleta está pesada." },
    { fr: "carte", es: "mapa / tarjeta", example: "Tu as une carte ? → ¿Tienes un mapa?" },
  ],
  "el hogar y la casa": [
    { fr: "maison", es: "casa", example: "Ma maison est petite. → Mi casa es pequeña." },
    { fr: "chambre", es: "habitación", example: "C’est ma chambre. → Esta es mi habitación." },
    { fr: "cuisine", es: "cocina", example: "Je prépare le dîner dans la cuisine. → Preparo la cena en la cocina." },
    { fr: "salle de bain", es: "baño", example: "La salle de bain est occupée. → El baño está ocupado." },
    { fr: "salon", es: "sala de estar", example: "On regarde un film dans le salon. → Vemos una película en la sala." },
    { fr: "lit", es: "cama", example: "Je vais au lit. → Me voy a la cama." },
    { fr: "table", es: "mesa", example: "La table est ronde. → La mesa es redonda." },
    { fr: "chaise", es: "silla", example: "Il y a quatre chaises. → Hay cuatro sillas." },
    { fr: "porte", es: "puerta", example: "Ferme la porte, s’il te plaît. → Cierra la puerta, por favor." },
    { fr: "fenêtre", es: "ventana", example: "La fenêtre est ouverte. → La ventana está abierta." },

  ],
  "adjetivos comunes": [{ fr: "grand", es: "grande / alto", example: "La maison est grande. → La casa es grande." },
  { fr: "petit", es: "pequeño", example: "Mon chien est petit. → Mi perro es pequeño." },
  { fr: "beau / belle", es: "hermoso/a", example: "Elle est très belle. → Ella es muy hermosa." },
  { fr: "vieux / vieille", es: "viejo/a", example: "C’est un homme vieux. → Es un hombre viejo." },
  { fr: "jeune", es: "joven", example: "Il est encore jeune. → Él todavía es joven." },
  { fr: "rapide", es: "rápido", example: "Ce train est très rapide. → Este tren es muy rápido." },
  { fr: "lent", es: "lento", example: "Le service est lent ici. → El servicio es lento aquí." },
  { fr: "fort", es: "fuerte", example: "Tu es très fort ! → ¡Eres muy fuerte!" },
  { fr: "faible", es: "débil", example: "Je me sens faible. → Me siento débil." },
  { fr: "important", es: "importante", example: "C’est une réunion importante. → Es una reunión importante." },
  ],
  "frases con estructuras comunes": [
    { fr: "Je veux un café", es: "Quiero un café", example: "Je veux un café, s’il vous plaît. → Quiero un café, por favor." },
    { fr: "Tu as un animal ?", es: "¿Tienes una mascota?", example: "Tu as un chien ? → ¿Tienes un perro?" },
    { fr: "Il est très gentil", es: "Él es muy amable", example: "Mon voisin est très gentil. → Mi vecino es muy amable." },
    { fr: "Nous sommes en retard", es: "Estamos atrasados", example: "Nous sommes en retard pour le dîner. → Estamos atrasados para la cena." },
    { fr: "Je suis à la maison", es: "Estoy en casa", example: "Aujourd’hui, je suis à la maison. → Hoy estoy en casa." },
    { fr: "Elle parle anglais", es: "Ella habla inglés", example: "Elle parle anglais et espagnol. → Ella habla inglés y español." },
    { fr: "Je vais au travail", es: "Voy al trabajo", example: "Chaque jour, je vais au travail. → Cada día voy al trabajo." },
    { fr: "Tu veux venir ?", es: "¿Querés venir?", example: "Tu veux venir avec moi ? → ¿Querés venir conmigo?" },
    { fr: "J’aime la musique", es: "Me gusta la música", example: "J’aime la musique classique. → Me gusta la música clásica." },
    { fr: "Je n’ai pas de temps", es: "No tengo tiempo", example: "Désolé, je n’ai pas de temps. → Lo siento, no tengo tiempo." },
  ],
  "Ropa": [
    {
      fr: "chemise",
      es: "camisa",
      example: "Je porte une chemise blanche. → Llevo una camisa blanca."
    },
    {
      fr: "pantalon",
      es: "pantalón",
      example: "Il met un pantalon noir. → Él se pone un pantalón negro."
    },
    {
      fr: "robe",
      es: "vestido",
      example: "Elle porte une robe rouge. → Ella lleva un vestido rojo."
    },
    {
      fr: "manteau",
      es: "abrigo",
      example: "Je prends mon manteau, il fait froid. → Tomo mi abrigo, hace frío."
    },
    {
      fr: "chaussures",
      es: "zapatos",
      example: "Mes chaussures sont neuves. → Mis zapatos son nuevos."
    },
    {
      fr: "t-shirt",
      es: "remera / camiseta",
      example: "Il a un t-shirt bleu. → Él tiene una remera azul."
    },
    {
      fr: "veste",
      es: "chaqueta",
      example: "Elle met une veste en jean. → Ella se pone una chaqueta de jean."
    },
    {
      fr: "pull",
      es: "suéter",
      example: "Je mets un pull parce qu’il fait froid. → Me pongo un suéter porque hace frío."
    },
    {
      fr: "chaussettes",
      es: "medias / calcetines",
      example: "Je cherche mes chaussettes. → Estoy buscando mis medias."
    },
    {
      fr: "ceinture",
      es: "cinturón",
      example: "Il met une ceinture noire. → Él se pone un cinturón negro."
    }

  ],
  "animales": [
    {
      fr: "chien",
      es: "perro",
      example: "J’ai un chien très gentil. → Tengo un perro muy amable."
    },
    {
      fr: "chat",
      es: "gato",
      example: "Le chat dort sur le canapé. → El gato duerme en el sillón."
    },
    {
      fr: "oiseau",
      es: "pájaro",
      example: "L’oiseau chante tous les matins. → El pájaro canta todas las mañanas."
    },
    {
      fr: "poisson",
      es: "pez / pescado",
      example: "Nous avons un poisson rouge. → Tenemos un pez dorado."
    },
    {
      fr: "cheval",
      es: "caballo",
      example: "Elle monte son cheval au parc. → Ella monta su caballo en el parque."
    },
    {
      fr: "vache",
      es: "vaca",
      example: "La vache donne du lait. → La vaca da leche."
    },
    {
      fr: "cochon",
      es: "cerdo",
      example: "Le cochon est dans la ferme. → El cerdo está en la granja."
    },
    {
      fr: "mouton",
      es: "oveja",
      example: "Il y a dix moutons dans le champ. → Hay diez ovejas en el campo."
    },
    {
      fr: "canard",
      es: "pato",
      example: "Le canard nage dans le lac. → El pato nada en el lago."
    },
    {
      fr: "lapin",
      es: "conejo",
      example: "Le lapin mange une carotte. → El conejo come una zanahoria."
    }

  ],


};

export default function Home() {
  const categories = Object.keys(flashcardGroups);
  const [category, setCategory] = useState(categories[0]);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [answered, setAnswered] = useState(false);
  const [index, setIndex] = useState(0);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [quizMode, setQuizMode] = useState(false);
  const [quizOptions, setQuizOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timedMode, setTimedMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizFinished, setQuizFinished] = useState(false);

  const flashcards = flashcardGroups[category];
  const current = shuffledCards[index] || flashcards[index];

  useEffect(() => {
    if (!quizMode) shuffleCards();
  }, [category]);

  useEffect(() => {
    let timer;
    if (quizMode && timedMode && !quizFinished) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setQuizFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizMode, timedMode, quizFinished]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    const voices = speechSynthesis.getVoices();
    const frenchVoice = voices.find(v => v.lang === "fr-FR" && (v.name.includes("Google") || v.name.includes("Thomas")));
    if (frenchVoice) utterance.voice = frenchVoice;
    window.speechSynthesis.speak(utterance);
  };

  const generateQuiz = () => {
    const all = Object.values(flashcardGroups).flat();
    const shuffled = [...all].sort(() => Math.random() - 0.5);
    const question = shuffled[0];
    const options = [question, ...shuffled.slice(1, 4)].sort(() => Math.random() - 0.5);
    setShuffledCards([question]);
    setQuizOptions(options);
    setIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setAnswered(false);
  };

  const nextCard = () => {
    if (quizMode) {
      generateQuiz();
    } else {
      setIndex((index + 1) % flashcards.length);
    }
    setAnswered(false);
  };

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setIndex(0);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setIndex(0);
  };

  const handleOptionSelect = (option) => {
    if (answered || quizFinished) return;
    const isAnswerCorrect = option.fr === current.fr;
    setSelectedOption(option.fr);
    setIsCorrect(isAnswerCorrect);
    setScore((prev) => ({
      correct: prev.correct + (isAnswerCorrect ? 1 : 0),
      incorrect: prev.incorrect + (!isAnswerCorrect ? 1 : 0)
    }));
    setAnswered(true);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 gap-6 bg-cover bg-center text-white "
      style={{ backgroundImage: "url('/franciarev.jpg')" }}
    >
      <h1 className="text-3xl text-black font-bold text-center mb-1">Lecciones de français | 🇫🇷</h1>
      <h6 className="text-xl text-black font-semibold text-center mb-4">Por Juan Cruz Bernardini Muslera</h6>
      <a className="font-semibold" href="/sobre_frances">📘 Saber más sobre el idioma francés</a>


      <div className="flex flex-col items-center gap-4 bg-opacity-70 ">
        <button
          onClick={() => {
            setQuizMode(true);
            generateQuiz();
          }}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 font-semibold"
        >
          🎯 Modo Quiz
        </button>

        <select
          onChange={(e) => {
            setQuizMode(false);
            handleCategoryChange(e);
          }}
          value={category}
          className="p-2 border rounded text-black"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {quizMode ? (
        <>
          <div className="w-full max-w-md text-center shadow-xl p-6 border rounded-2xl bg-white bg-opacity-70 backdrop-blur-md
 text-black">
            <div className="mb-2 text-sm text-bold text-gray-600">
              ✅ Correctas: {score.correct} | ❌ Incorrectas: {score.incorrect}
            </div>
            <div className="text-sm text-gray-600 text-bold mt-2">
              <label className="mr-2">
                <input
                  type="checkbox"
                  checked={timedMode}
                  onChange={(e) => {
                    setTimedMode(e.target.checked);
                    setTimeLeft(60);
                    setQuizFinished(false);
                  }}
                />
                Modo cronometrado (60s)
              </label>
              {timedMode && !quizFinished && (
                <span className="ml-4 text-bold">⏱️ Tiempo restante: {timeLeft}s</span>
              )}
            </div>
            <p className="text-lg mb-4 text-gray-600 mt-2">¿Cómo se dice en francés?</p>
            <h2 className="text-2xl font-bold mb-4 text-black">{current.es}</h2>

            <div className="flex flex-col gap-2">
              {quizOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionSelect(opt)}
                  className={`px-4 py-2 rounded border ${selectedOption === opt.fr
                    ? opt.fr === current.fr
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-gray-100 text-black hover:bg-gray-200"
                    }`}
                >
                  {opt.fr}
                </button>
              ))}
            </div>

            {selectedOption && (
              <p className={`mt-4 font-semibold ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                {isCorrect ? "✅ Correcto" : "❌ Incorrecto"}
              </p>
            )}

            {quizFinished && (
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-black mb-2">🛑 ¡Tiempo terminado!</p>
                <button
                  onClick={() => {
                    setTimeLeft(60);
                    setScore({ correct: 0, incorrect: 0 });
                    setQuizFinished(false);
                    setSelectedOption(null);
                    generateQuiz();
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Reiniciar prueba
                </button>
              </div>
            )}
          </div>

          {!quizFinished && (
            <button
              onClick={nextCard}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Otra pregunta
            </button>
          )}
        </>
      ) : (
        <>
          <div className="w-full max-w-md text-center shadow-xl p-6 border rounded-2xl bg-white bg-opacity-70 backdrop-blur-md
 text-black">
            <h2 className="text-2xl font-bold mb-2">{current.fr}</h2>
            <button
              onClick={() => speak(current.fr)}
              className="mb-2 text-sm text-blue-600 underline hover:text-blue-800"
            >
              📢 Escuchar pronunciación
            </button>
            <p className="text-lg mb-2 text-gray-500">{current.es}</p>
            <p className="text-sm italic">{current.example}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIndex((index - 1 + flashcards.length) % flashcards.length)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Anterior
            </button>
            <button
              onClick={nextCard}
              className="bg-[#0055A4] text-white px-4 py-2 rounded hover:bg-[#004494]"
            >
              Siguiente
            </button>
            <button
              onClick={shuffleCards}
              className="bg-white text-black px-4 py-2 rounded border hover:bg-gray-100"
            >
              Mezclar tarjetas
            </button>
          </div>
        </>
      )}
    </main>
  );
}
