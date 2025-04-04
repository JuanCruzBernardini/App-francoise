export default function SobreFrances() {
  return (

    <main
      className="flex flex-col items-center justify-center min-h-screen p-8 bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/frenchflag.jpg')" }}
    >

      <div className="max-w-2xl text-center bg-white bg-opacity-70 backdrop-blur-md
 rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-[#0055A4]">📘 El idioma francés</h1>

        <p className="mb-4 text-gray-800">
          El francés es una lengua romance derivada del latín vulgar que hablaban los soldados romanos.
        </p>

        <h2 className="text-2xl font-semibold mb-2 text-[#EF4135]">📜 Origen</h2>
        <p className="mb-4 text-gray-800">
          Se desarrolló en la región de la Galia (actual Francia) tras la caída del Imperio Romano,
          influenciado por lenguas celtas y germánicas como el franco.
        </p>

        <h2 className="text-2xl font-semibold mb-2 text-[#EF4135]">🌍 Hoy en día</h2>
        <p className="mb-4 text-gray-800">
          Es lengua oficial en más de 29 países y una de las más estudiadas en el mundo. Se habla en:
        </p>

        <ul className="list-disc list-inside text-left mb-6 text-gray-800">
          <li>Francia</li>
          <li>Bélgica</li>
          <li>Suiza</li>
          <li>Canadá (especialmente Quebec)</li>
          <li>Varios países de África occidental</li>
        </ul>

        <p className="italic text-gray-600 mb-6">
          El francés es considerado uno de los idiomas más bellos y diplomáticos del mundo.
        </p>

        <a href="/" className="inline-block bg-[#0055A4] text-white px-4 py-2 rounded hover:bg-[#004494] transition">
          ⬅ Volver al inicio
        </a>
      </div>
    </main>
  );
}
