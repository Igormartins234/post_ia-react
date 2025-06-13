import ContentGeneratorForm from "./ContentGeneratorForm"; 

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <main className="flex flex-col items-center p-4 pt-12 md:pt-20">
        <div className="w-full max-w-3xl mx-auto">

          <h1 className="text-4xl md:text-5xl font-bold text-center text-slate-900 tracking-tight">
            Gerador de Posts com IA
          </h1>
          <p className="text-center text-slate-600 mt-3 text-lg max-w-xl mx-auto">
            Crie posts para as redes sociais
          </p>

          <ContentGeneratorForm />
        </div>
        <footer className="text-center text-slate-500 mt-12 mb-6">
            <p>Criado com Next.js</p>
        </footer>
      </main>
    </div>
  );
}