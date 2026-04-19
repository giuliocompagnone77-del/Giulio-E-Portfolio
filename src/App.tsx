import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Wrench, Monitor, Languages, Mail, ChevronDown, Hammer, Fish, Activity, Send } from 'lucide-react';

export default function App() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [2.0, 1.6]);
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(10px)", "blur(0px)"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0]);

  const currentDate = new Date().toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const mailtoSubject = encodeURIComponent(`Richiesta del servizio compilata in data - ${currentDate}`);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `mailto:giuliocompagnone77@gmail.com?subject=${mailtoSubject}`;
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=giuliocompagnone77@gmail.com&su=${mailtoSubject}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-lime-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className="font-bold text-xl tracking-tight">Giulio<span className="text-lime-500">.</span></a>
          <div className="hidden md:flex gap-6 text-sm font-medium text-zinc-400">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#chi-sono" className="hover:text-white transition-colors">Chi sono</a>
            <a href="#competenze" className="hover:text-white transition-colors">Competenze</a>
            <a href="#contatti" className="hover:text-white transition-colors">Contatti</a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(132,204,22,0.15)_0%,_transparent_60%)]" />
          
          <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                Tecnica, Dedizione, <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-lime-600">
                  Problem Solving
                </span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed">
                Giovane studente-aspirante imprenditore, jolly dell' informatica con esperienza pratica sul campo.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#contatti" className="px-8 py-3 bg-lime-600 hover:bg-lime-700 text-white rounded-full font-medium transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contattami
                </a>
                <a href="#chi-sono" className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-medium transition-colors flex items-center justify-center">
                  Scopri di più
                </a>
              </div>
            </motion.div>
          </div>
          
        </section>

        {/* Chi Sono */}
        <section id="chi-sono" className="py-24 px-6 bg-zinc-900/50 relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">Chi sono</h2>
                <div className="space-y-4 text-zinc-400 leading-relaxed">
                  <p>
                    Sono nato e cresciuto a <strong>Napoli</strong>.<br />
                    Fin da piccolo, affiancando i miei nonni, ho sviluppato una forte manualità e una profonda curiosità per capire come funzionano le cose.
                  </p>
                  <p>
                    Questa curiosità si è presto trasformata in una passione per la tecnologia e l'informatica.
                    Non mi accontento della teoria mi piace mettere le mani in pasta, risolvere problemi reali.
                  </p>
                  <p>
                    Sono una persona pratica, motivata a imparare continuamente e pronta a mettermi in gioco in nuove sfide professionali.
                  </p>
                </div>
              </motion.div>
              <motion.div
                ref={imageRef}
                style={{ scale, opacity, filter }}
                className="relative"
              >
                <div className="aspect-square relative flex items-end justify-center">
                  {/* Luce posteriore (backlight) per far risaltare il soggetto e fondere i colori */}
                  <div className="absolute inset-0 bg-lime-500/20 blur-[80px] rounded-full transform scale-90 z-0"></div>
                  
                  <motion.img 
                    style={{ scale: imageScale }}
                    src="https://i.ibb.co/TBMwNWBM/32629be5-bf95-4665-90f4-660eb73ea565-1-removebg-preview.png" 
                    alt="La mia foto" 
                    className="object-contain w-full h-full origin-bottom drop-shadow-[0_10px_40px_rgba(132,204,22,0.4)] sepia-[.25] hue-rotate-[45deg] saturate-[.75] contrast-[1.25] brightness-[0.85] relative z-10 rounded-2xl mt-72"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Competenze */}
        <section id="competenze" className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Competenze</h2>
              <p className="text-zinc-400">Un mix unico di abilità digitali.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-zinc-900 border border-white/5 hover:border-lime-500/30 transition-colors"
              >
                <div className="w-12 h-12 bg-lime-500/10 rounded-xl flex items-center justify-center text-lime-500 mb-6">
                  <Monitor className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Informatica</h3>
                <ul className="space-y-2 text-zinc-400">
                  <li>• Buone conoscenze di web design e programmazione</li>
                  <li>• Esperienza come giovane imprenditore al BMT (Borsa Mediterranea del Turismo)</li>
                  <li>• Conoscenza generale PC</li>
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-2xl bg-zinc-900 border border-white/5 hover:border-lime-500/30 transition-colors"
              >
                <div className="w-12 h-12 bg-lime-500/10 rounded-xl flex items-center justify-center text-lime-500 mb-6">
                  <Languages className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Lingue</h3>
                <ul className="space-y-2 text-zinc-400">
                  <li>• Italiano (Madrelingua)</li>
                  <li>• Inglese, attestato Cambridge B1 (Buone conoscenze della lingua)</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>


        {/* Obiettivi */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-12 md:p-20 rounded-3xl overflow-hidden border border-lime-500/20 shadow-2xl"
            >
              {/* Sfondo Immagine (effetto cover sfocato per riempire gli spazi) */}
              <div 
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: "url('https://i.ibb.co/chzT6CzL/Screenshot-20250821-155528-Foto-2.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(16px) sepia(0.2) hue-rotate(45deg) saturate(0.9) brightness(0.4)"
                }}
              >
              </div>
              {/* Sfondo Immagine Principale (contain per vedere tutto il corpo) */}
              <div 
                className="absolute inset-0 z-0 scale-[1.15]"
                style={{
                  backgroundImage: "url('https://i.ibb.co/chzT6CzL/Screenshot-20250821-155528-Foto-2.jpg')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  filter: "blur(1px) sepia(0.2) hue-rotate(45deg) saturate(0.9) brightness(0.8)"
                }}
              >
              </div>
              {/* Overlay scuro aggiuntivo */}
              <div className="absolute inset-0 bg-zinc-950/40 z-0"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-lime-900/20 z-0 mix-blend-overlay"></div>

              {/* Contenuto in primo piano */}
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Il mio obiettivo</h2>
                <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed italic font-medium">
                  "Costruire una carriera solida nel mondo dell'informatica e della tecnologia, portando il mio approccio pratico e continuando a imparare ogni giorno, unendo la teoria alla risoluzione di problemi reali."
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contatti */}
        <section id="contatti" className="py-24 px-6 bg-zinc-900/50 border-t border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Lavoriamo insieme</h2>
            <p className="text-zinc-400 mb-8">
              Cerchi una persona affidabile, con mentalità pratica e tanta voglia di fare? Parliamone.
            </p>
            
            <div className="flex flex-col items-center gap-8">
              <div className="inline-flex items-center gap-4 p-4 pr-6 rounded-xl bg-zinc-950 border border-white/5">
                <div className="w-10 h-10 bg-lime-500/10 rounded-lg flex items-center justify-center text-lime-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-zinc-500">Email</div>
                  <div className="font-medium">giuliocompagnone77@gmail.com</div>
                </div>
              </div>
              
              <a 
                href={`mailto:giuliocompagnone77@gmail.com?subject=${mailtoSubject}`}
                onClick={handleContactClick}
                className="inline-flex items-center gap-2 px-8 py-4 bg-lime-600 hover:bg-lime-500 text-white rounded-full font-medium transition-all hover:scale-105 active:scale-95 shadow-lg shadow-lime-500/20"
              >
                <Send className="w-5 h-5" />
                Contattami
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-zinc-500 text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} Giulio. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}
