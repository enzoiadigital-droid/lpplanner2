
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  CheckCircle2, 
  XCircle, 
  Star, 
  ShieldCheck, 
  ArrowRight,
  PieChart,
  Activity,
  ClipboardCheck,
  CloudMoon,
  LayoutDashboard,
  Dumbbell,
  Calendar,
  Sparkles,
  Zap,
  Target,
  CreditCard,
  Wallet,
  Mail,
  FileText,
  Smartphone,
  Printer
} from 'lucide-react';

// --- Reusable Reveal Component ---
const Reveal: React.FC<{ 
  children: React.ReactNode; 
  animation?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
  className?: string;
  triggerOnce?: boolean;
}> = ({ children, animation = 'up', delay = 0, className = "", triggerOnce = true }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible]);

  const active = triggerOnce ? hasAnimated : isVisible;
  
  return (
    <div 
      ref={ref}
      className={`reveal-base ${active ? 'reveal-active' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Intersection Observer Hook ---
const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting] as const;
};

const ScrollItem: React.FC<{ 
  title: string; 
  icon: React.ReactNode; 
  desc: string; 
  tag: string;
  isLast?: boolean;
}> = ({ title, icon, desc, tag, isLast }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });

  return (
    <div 
      ref={ref}
      className={`relative flex flex-col items-center text-center transition-all duration-1000 ease-out py-12 md:py-20 ${
        isVisible ? 'opacity-100 scale-100 blur-0' : 'opacity-10 scale-95 blur-[4px]'
      }`}
    >
      {!isLast && (
        <div className="absolute top-[60%] bottom-[-40%] w-px bg-gradient-to-b from-purple-500/10 to-transparent hidden md:block"></div>
      )}

      {/* Imagem redimensionada para caber na tela sem vazar */}
      <div className={`relative mb-0 transition-all duration-700 ${isVisible ? 'rotate-0' : 'rotate-1'}`}>
        <div className={`relative z-10 w-[90vw] max-w-[320px] sm:max-w-[550px] md:max-w-[850px] flex items-center justify-center transition-all duration-700`}>
          {icon}
        </div>
      </div>

      {/* Espaçamento reduzido drasticamente entre a imagem e o texto */}
      <div className="max-w-xl px-4 mt-2 sm:mt-4 relative z-20">
        <span className={`text-[10px] md:text-xs font-black tracking-[0.3em] uppercase mb-1 block transition-colors duration-700 ${isVisible ? 'text-purple-400' : 'text-slate-600'}`}>
          {tag}
        </span>
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 italic font-serif leading-tight">
          {title}
        </h3>
        <p className="text-slate-400 text-lg md:text-2xl font-light leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-b from-[#1a0b2e] to-[#0d0415]">
      <div className="absolute inset-0 hero-glow pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <Reveal animation="up">
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-extrabold text-white mb-8 leading-tight tracking-tight px-2">
            Organize seu 2026 em <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-purple-200 italic font-serif">poucos minutos por dia</span>
          </h1>
        </Reveal>
        <Reveal animation="up" delay={150}>
          <p className="text-base sm:text-lg md:text-2xl text-white max-w-2xl mx-auto mb-10 font-light leading-relaxed opacity-90 px-4">
            Um Planner prático pra você organizar sua vida sem se cobrar o tempo todo, e finalmente sentir paz com a própria rotina.
          </p>
        </Reveal>
        
        <Reveal animation="scale" delay={300} className="relative mb-10 flex justify-center px-4">
           <img 
             src="http://criadorinteligente.com.br/wp-content/uploads/2025/12/IMG_6148.png" 
             alt="Planner 2026" 
             className="w-full max-w-[280px] md:max-w-[420px] rounded-3xl animate-float"
           />
        </Reveal>

        <Reveal animation="up" delay={450} className="flex flex-col sm:flex-row items-center justify-center gap-6 px-4">
          <a 
            href="#oferta" 
            className="btn-shine w-full sm:w-auto px-6 sm:px-12 py-5 sm:py-7 bg-gradient-to-br from-purple-500 via-purple-700 to-indigo-900 text-white rounded-3xl font-black text-sm sm:text-xl shadow-[0_20px_40px_rgba(168,85,247,0.3)] transform hover:scale-105 transition-all flex items-center justify-center gap-4 group whitespace-nowrap"
          >
            QUERO ORGANIZAR MEU 2026
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform shrink-0" />
          </a>
          <div className="text-slate-400 text-xs sm:text-sm flex items-center gap-2 font-bold bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-sm whitespace-nowrap">
            <ShieldCheck size={18} className="text-green-500" /> Compra 100% segura
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const SectionPain: React.FC = () => {
  const items = [
    {
      title: "Vive com a sensação de que está sempre atrasada",
      desc: "Nunca sabe o que fazer primeiro e termina o dia cansada, com a impressão de que não rendeu."
    },
    {
      title: "Já tentou se organizar várias vezes, mas não conseguiu manter",
      desc: "Começa animada, mas logo abandona porque o plano não se encaixa na sua rotina real."
    },
    {
      title: "Se sente sobrecarregada só de pensar em tudo que precisa dar conta",
      desc: "Compromissos, metas, tarefas… tudo fica misturado na cabeça."
    },
    {
      title: "Vive no improviso, apagando incêndio todos os dias",
      desc: "Sem clareza, sem método e sempre reagindo aos problemas em vez de se antecipar."
    }
  ];

  return (
    <section id="sobre" className="py-32 bg-gradient-to-b from-[#0d0415] to-[#1a0b2e] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <Reveal animation="up">
          <div className="text-center mb-24">
            <span className="text-red-500 font-black tracking-[0.3em] uppercase text-xs mb-4 block">A realidade atual</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-8 italic font-serif leading-tight">Sinceramente, se você hoje...</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-red-600 to-transparent mx-auto rounded-full"></div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {items.map((item, idx) => (
            <Reveal key={idx} animation="up" delay={idx * 100}>
              <div className="group relative bg-[#1a0b2e]/40 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[48px] hover:bg-[#251240]/60 transition-all duration-500 h-full overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-red-500/10 transition-colors"></div>
                <div className="flex flex-col gap-8">
                  <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 border border-red-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <XCircle size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-red-100 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const SectionBenefits: React.FC = () => {
  const items = [
    {
      title: "Passa a ter clareza do que é prioridade",
      desc: "Você sabe exatamente o que precisa fazer, quando fazer e o que pode esperar — sem culpa."
    },
    {
      title: "Segue um método simples, possível e feito pra vida real",
      desc: "Nada engessado ou impossível de manter. Um sistema que acompanha a sua rotina."
    },
    {
      title: "Organiza metas, compromissos e tarefas em um só lugar",
      desc: "Tudo deixa de ficar solto na cabeça e passa a ter um lugar claro e visual."
    },
    {
      title: "Para de viver no improviso e começa a se sentir no controle",
      desc: "Você deixa de apenas reagir ao dia e passa a conduzir sua rotina con mais leveza."
    }
  ];

  return (
    <section id="beneficios" className="py-32 bg-gradient-to-b from-[#1a0b2e] to-[#0d0415] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-900/10 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <Reveal animation="up">
          <div className="text-center mb-24">
            <span className="text-green-400 font-black tracking-[0.3em] uppercase text-xs mb-4 block">A nova jornada</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-8 italic font-serif leading-tight">Com o Planner 2026 você...</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-green-500 to-transparent mx-auto rounded-full"></div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {items.map((item, idx) => (
            <Reveal key={idx} animation="up" delay={idx * 100}>
              <div className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[48px] hover:bg-white/[0.07] transition-all duration-500 h-full overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-green-500/10 transition-colors"></div>
                <div className="flex flex-col gap-8">
                  <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 border border-green-500/20 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                    <CheckCircle2 size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-green-100 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Deliverables: React.FC = () => {
  const items = [
    { 
      title: "Planejamento Anual", 
      icon: <img src="http://criadorinteligente.com.br/wp-content/uploads/2025/12/anual.png" alt="Planejamento Anual" className="w-full h-auto rounded-xl" />, 
      desc: "Tenha uma visão macro de todo o seu ano.", 
      tag: "PLANEJAMENTO" 
    },
    { 
      title: "Planejamento Mensal", 
      icon: <img src="http://criadorinteligente.com.br/wp-content/uploads/2025/12/mensal.png" alt="Planejamento Mensal" className="w-full h-auto rounded-xl" />, 
      desc: "Organize seus meses com foco e clareza.", 
      tag: "PLANEJAMENTO" 
    },
    { 
      title: "Planejamento Semanal", 
      icon: <img src="http://criadorinteligente.com.br/wp-content/uploads/2025/12/semanal.png" alt="Planejamento Semanal" className="w-full h-auto rounded-xl" />, 
      desc: "Sua semana sob controle, sem correria.", 
      tag: "PLANEJAMENTO" 
    },
    { 
      title: "Planejamento Diário", 
      icon: <img src="http://criadorinteligente.com.br/wp-content/uploads/2025/12/diario.png" alt="Planejamento Diário" className="w-full h-auto rounded-xl" />, 
      desc: "Foque no que importa no seu dia a dia.", 
      tag: "PLANEJAMENTO" 
    },
    { 
      title: "Roda da Vida", 
      icon: <img src="http://criadorinteligente.com.br/wp-content/uploads/2025/12/roda1.png" alt="Roda da Vida" className="w-full h-auto rounded-xl" />, 
      desc: "Analise todas as áreas e descubra onde focar.", 
      tag: "AUTOAVALIAÇÃO" 
    },
    { 
      title: "Vision Board", 
      icon: <img src="http://criadorinteligente.com.br/wp-content/uploads/2025/12/vision1.png" alt="Vision Board" className="w-full h-auto rounded-xl" />, 
      desc: "Visualize seu futuro com clareza total.", 
      tag: "INSPIRAÇÃO" 
    },
    { 
      title: "Metas Anuais", 
      icon: <img src="http://criadorinteligente.com.br/wp-content/uploads/2025/12/metas1.png" alt="Metas Anuais" className="w-full h-auto rounded-xl" />, 
      desc: "Defina o que realmente importa este ano.", 
      tag: "PROPÓSITO" 
    },
    { 
      title: "Plano de Ação", 
      icon: <img src="http://criadorinteligente.com.br/wp-content/uploads/2025/12/plano-de-acao1.png" alt="Plano de Ação" className="w-full h-auto rounded-xl" />, 
      desc: "Estratégia prática para suas metas.", 
      tag: "EXECUÇÃO" 
    },
    { 
      title: "Checklist Objetivos", 
      icon: <img src="http://criadorinteligente.com.br/wp-content/uploads/2025/12/checklist1.png" alt="Checklist" className="w-full h-auto rounded-xl" />, 
      desc: "Quebre sonhos em tarefas menores.", 
      tag: "FOCO TOTAL" 
    },
    { 
      title: "Habit Tracker", 
      icon: <img src="http://criadorinteligente.com.br/wp-content/uploads/2025/12/habit1.png" alt="Habit Tracker" className="w-full h-auto rounded-xl" />, 
      desc: "Monitore sua evolução todos os dias.", 
      tag: "CONSISTÊNCIA" 
    },
    { 
      title: "Financeiro", 
      icon: <img src="http://criadorinteligente.com.br/wp-content/uploads/2025/12/financeiro1.png" alt="Financeiro" className="w-full h-auto rounded-xl" />, 
      desc: "Domine seu dinheiro com planilhas práticas.", 
      tag: "ESTABILIDADE" 
    },
    { 
      title: "Treinos", 
      icon: <img src="http://criadorinteligente.com.br/wp-content/uploads/2025/12/treino1.png" alt="Treinos" className="w-full h-auto rounded-xl" />, 
      desc: "Organize sua rotina fitness mensal.", 
      tag: "SAÚDE" 
    },
    { 
      title: "Organização Master", 
      icon: <img src="http://criadorinteligente.com.br/wp-content/uploads/2025/12/organizacao3.png" alt="Organização Master" className="w-full h-auto rounded-xl" />, 
      desc: "Visões completa da sua rotina.", 
      tag: "ESTRUTURA", 
      isLast: true 
    },
  ];

  return (
    <section id="entrega" className="py-24 relative bg-[#0d0415] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-500/5 to-transparent hidden md:block"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal animation="up">
          <div className="flex flex-col items-center text-center mb-16 px-2">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-purple-900/40 border border-purple-500/30 rounded-full mb-8">
              <Sparkles size={18} className="text-purple-400" />
              <span className="text-purple-200 text-[10px] sm:text-xs font-black tracking-widest uppercase">O que você vai receber</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold text-white mb-0 italic font-serif leading-tight">
              Tour pelo Planner
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          {items.map((item, idx) => (
            <ScrollItem key={idx} {...item} />
          ))}
        </div>

        <Reveal animation="scale" className="mt-12 text-center px-4">
            <a 
              href="#oferta" 
              className="btn-shine inline-flex items-center justify-center gap-4 sm:gap-6 bg-white text-[#1a0b2e] px-8 sm:px-16 py-6 sm:py-8 rounded-[30px] sm:rounded-[40px] font-black text-xl sm:text-2xl shadow-[0_30px_60px_rgba(255,255,255,0.1)] hover:scale-105 transition-all group w-full sm:w-auto"
            >
              GARANTIR MINHA EXPERIÊNCIA <Target className="group-hover:rotate-12 transition-transform shrink-0" />
            </a>
        </Reveal>
      </div>
    </section>
  );
};

const HowToReceive: React.FC = () => {
  const steps = [
    {
      title: "Assim que a compra é confirmada, você recebe um e-mail com link de download",
      desc: "",
      icon: <Mail className="text-purple-400" size={32} />
    },
    {
      title: "Formato digital (PDF)",
      desc: "Arquivo leve, organizado e compatível com diferentes dispositivos, pronto para uso ao longo de todo o ano.",
      icon: <FileText className="text-purple-400" size={32} />
    },
    {
      title: "Use onde preferir",
      desc: "Escolha como deseja usar o planner: digitalmente ou impresso, de acordo com sua rotina e preferência pessoal.",
      icon: <Smartphone className="text-purple-400" size={32} />
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-[#0d0415] to-[#1a0b2e]">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal animation="up">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 italic font-serif leading-tight">Como você recebe o Planner 2026</h2>
            <div className="w-24 h-2 bg-purple-500 mx-auto rounded-full"></div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, idx) => (
            <Reveal key={idx} animation="up" delay={idx * 200}>
              <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] h-full flex flex-col items-center text-center group hover:bg-white/10 transition-all transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-purple-900/30 rounded-3xl flex items-center justify-center mb-8 border border-purple-500/20 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-white font-bold text-xl mb-4 leading-tight">{step.title}</h3>
                {step.desc && <p className="text-slate-400 font-medium leading-relaxed">{step.desc}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing: React.FC = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    setCurrentDate(date.toLocaleDateString('pt-BR', options).toUpperCase());
  }, []);

  const benefits = [
    "Planejamento Anual, Mensal, Semanal e Diário",
    "Roda da Vida & Vision Board",
    "Metas Anuais & Plano de Ação",
    "Checklist de Objetivos & Foco Total",
    "Habit Tracker (Rastreador de Hábitos)",
    "Controle Financeiro & Planilhas",
    "Cronograma Academia & Treinos",
    "Download Imediato em PDF Premium"
  ];

  return (
    <section id="oferta" className="py-32 relative overflow-hidden bg-gradient-to-b from-[#0d0415] to-[#1a0b2e]">
      <div className="max-w-2xl mx-auto px-4 relative z-10">
        <Reveal animation="scale">
          <div className="bg-white rounded-[40px] sm:rounded-[4rem] p-6 sm:p-10 md:p-16 text-center shadow-[0_50px_120px_rgba(0,0,0,0.5)] border border-white/20 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full -mr-32 -mt-32 blur-3xl transition-transform duration-1000 group-hover:scale-150"></div>

            <div className="flex flex-col items-center mb-10 relative z-10">
              <div className="bg-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg shadow-purple-600/20 mb-6 inline-block">
                <span className="text-white font-black text-[10px] sm:text-xs md:text-sm tracking-[0.2em] uppercase">
                  OFERTA EXCLUSIVA 2026
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-red-600 font-black text-[10px] sm:text-xs md:text-sm tracking-widest uppercase bg-red-50 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl border border-red-100 shadow-sm">
                <Zap size={18} className="fill-red-600 shrink-0" />
                VÁLIDO ATÉ {currentDate}
              </div>
            </div>

            <h2 className="text-[#1a0b2e] font-black text-2xl sm:text-4xl md:text-5xl mb-10 italic font-serif leading-tight">Escolha investir em você</h2>

            <div className="mb-12">
              <p className="text-slate-400 line-through text-lg sm:text-2xl font-medium mb-2 opacity-60">
                De R$ 89,90 por apenas
              </p>
              <div className="flex items-center justify-center text-[#1a0b2e]">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold mr-2 tracking-tighter">R$</span>
                <span className="text-6xl sm:text-8xl md:text-[11rem] font-black leading-none tracking-tighter font-sans">
                  37,90
                </span>
              </div>
              <p className="text-purple-600 font-black tracking-[0.3em] text-[10px] sm:text-xs uppercase mt-4">Acesso Imediato • Pagamento Único</p>
            </div>

            <div className="grid grid-cols-1 gap-y-4 sm:gap-y-6 mb-12 text-left max-w-lg mx-auto">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-50 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 border border-green-200 shadow-sm">
                    <CheckCircle2 size={16} className="text-green-600" />
                  </div>
                  <p className="text-[#1a0b2e]/90 font-bold text-sm sm:text-lg md:text-xl tracking-tight leading-tight">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="px-1 sm:px-2">
              <a 
                href="https://pay.hotmart.com/M103597285Q?bid=1767126568241" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine flex items-center justify-center gap-3 sm:gap-5 w-full py-6 sm:py-8 bg-gradient-to-br from-purple-500 via-purple-700 to-indigo-900 text-white rounded-[30px] sm:rounded-[40px] font-black text-lg sm:text-2xl md:text-3xl shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:shadow-[0_25px_65px_rgba(79,70,229,0.5)] transition-all transform hover:-translate-y-2 group overflow-hidden px-4"
              >
                <span className="leading-tight">GARANTIR MEU ACESSO AGORA</span>
                <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform duration-300 shrink-0 hidden sm:block" />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 opacity-60 px-2">
              <div className="flex items-center gap-2 text-[9px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                <ShieldCheck size={16} className="shrink-0" /> 7 Dias de Garantia
              </div>
              <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></div>
              <div className="flex items-center gap-2 text-[9px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                <CreditCard size={16} className="shrink-0" /> Checkout Seguro
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    { name: "Camila Ferreira", role: "Vestibulanda de Medicina", text: "Eu sempre tentei usar planner, mas nunca durava mais de um mês. Esse foi o primeiro que não me fez sentir culpada.", img: "https://picsum.photos/id/64/100/100" },
    { name: "Larissa Gomes", role: "Vestibulanda de Direito", text: "O que mais me ajudou foi a forma simples de organizar a rotina. Não é confuso, não é cheio de coisa inútil.", img: "https://picsum.photos/id/65/100/100" },
    { name: "Beatriz Nogueira", role: "Estudante", text: "Minha rotina era completamente bagunçada. Comecei a organizar meus dias de um jeito mais leve e realista.", img: "https://picsum.photos/id/66/100/100" },
    { name: "Mariana Lopes", role: "Medicina", text: "As metas ficam claras e possíveis. Hoje sinto que tenho mais controle do meu tempo e até consigo descansar.", img: "https://picsum.photos/id/177/100/100" },
    { name: "Julia Pacheco", role: "Estudante", text: "Me sinto mais organizada e menos ansiosa. Esse planner me ajudou a criar constância, não perfeição.", img: "https://picsum.photos/id/342/100/100" }
  ];

  return (
    <section className="py-32 bg-[#0d0415]/80">
      <div className="max-w-7xl mx-auto px-4">
        <Reveal animation="up">
          <div className="text-center mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 italic font-serif leading-tight">💬 Quem já usa, aprova</h2>
            <div className="flex justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={28} className="fill-yellow-500 text-yellow-500 shrink-0" />)}
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((t, idx) => (
            <Reveal key={idx} animation="scale" delay={idx * 150}>
              <div className="bg-white/5 border border-white/5 p-8 sm:p-10 rounded-[40px] relative backdrop-blur-sm flex flex-col h-full hover:bg-white/10 transition-colors group">
                <p className="text-slate-300 italic text-base sm:text-lg leading-relaxed mb-10 flex-1">"{t.text}"</p>
                <div className="flex items-center gap-5 border-t border-white/5 pt-8 mt-2">
                  <img src={t.img} alt={t.name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-[20px] border-2 border-purple-500 group-hover:scale-110 transition-transform object-cover" />
                  <div>
                    <h4 className="text-white font-bold text-base sm:text-lg leading-tight">{t.name}</h4>
                    <p className="text-purple-400 text-[10px] sm:text-xs uppercase font-black tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Guarantee: React.FC = () => {
  return (
    <section className="py-32 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-y border-white/5 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Reveal animation="up">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-purple-600/20 rounded-full mb-10 border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.3)]">
            <ShieldCheck size={48} className="text-purple-400 sm:w-14 sm:h-14" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-8 italic font-serif uppercase tracking-tight">7 Dias de Garantia Total</h2>
          <p className="text-slate-300 text-lg sm:text-xl md:text-2xl leading-relaxed font-light font-sans max-w-3xl mx-auto px-2">
            Se em até 7 dias você sentir que ele não é pra você, basta me enviar um e-mail e eu devolvo 100% do seu dinheiro. <span className="text-purple-400 font-bold italic">Risco zero para sua decisão.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
};

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const questions = [
    { 
      q: "Não tenho dinheiro, e agora?", 
      a: "Não se preocupe, você pode optar por dividir o valor no cartão de crédito, parcelados em até 6X." 
    },
    { 
      q: "O planner é digital ou físico?", 
      a: "Este é um produto 100% digital. Você receberá o acesso imediate por e-mail para utilizar no celula, tablet ou computador. Se você quiser imprimir, ele é totalmente adaptado impressão." 
    },
    { 
      q: "É compatível com quais dispositivos?", 
      a: "Qualquer dispositivo que leia PDF, como tablets, smartphones e computadores." 
    },
    { 
      q: "Posso começar em qualquer mês?", 
      a: "Sim, o planner é totalmente personalizável para o seu ritmo." 
    },
    { 
      q: "Como recebo o produto?", 
      a: "Logo após a confirmação do pagamento, você receberá um e-mail com o link de download e instruções." 
    },
    { 
      q: "O pagamento é único ou mensal?", 
      a: "Pagamento único! Você paga uma vez e tenta acesso vitalício ao Planner 2026." 
    }
  ];

  return (
    <section id="faq" className="py-32 bg-[#0d0415]">
      <div className="max-w-3xl mx-auto px-4">
        <Reveal animation="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 italic font-serif">Dúvidas Frequentes</h2>
          </div>
        </Reveal>

        <div className="space-y-6">
          {questions.map((q, idx) => (
            <Reveal key={idx} animation="up" delay={idx * 100}>
              <div className="border border-white/10 rounded-[24px] sm:rounded-[30px] overflow-hidden bg-white/5 backdrop-blur-sm transition-all hover:border-purple-500/30">
                <button 
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full p-6 sm:p-8 text-left flex justify-between items-center hover:bg-white/5 transition-colors group gap-4"
                >
                  <span className="font-bold text-white text-lg sm:text-xl">{q.q}</span>
                  <ChevronDown className={`transition-transform duration-500 text-purple-400 shrink-0 ${openIdx === idx ? 'rotate-180' : ''}`} />
                </button>
                {openIdx === idx && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-slate-400 text-base sm:text-lg leading-relaxed border-t border-white/5 pt-6">
                    {q.a}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-black/60">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-slate-500 text-xs sm:text-sm mb-10">© 2026 Planner Digital. Todos os direitos reservados.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10 text-slate-500 text-[10px] sm:text-xs font-black uppercase tracking-widest underline decoration-purple-500/20">
          <a href="#oferta" className="hover:text-purple-400 transition-colors">Políticas de Privacidade</a>
          <a href="#oferta" className="hover:text-purple-400 transition-colors">Termos de Uso</a>
        </div>
      </div>
    </footer>
  );
};

const PurchaseNotification: React.FC = () => {
  const names = ["Ana", "Mariana", "Emily", "Camila", "Beatriz", "Juliana", "Larissa", "Renata", "Fernanda", "Natália"];
  const [currentName, setCurrentName] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setCurrentName(names[Math.floor(Math.random() * names.length)]);
      setVisible(true);
      setTimeout(() => setVisible(false), 4500);
      setTimeout(trigger, Math.floor(Math.random() * 8000) + 8000);
    };
    setTimeout(trigger, 3000);
  }, []);

  return (
    <div className={`fixed bottom-4 sm:bottom-8 left-4 sm:left-8 z-[100] transition-all duration-1000 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
      <div className="bg-green-600 p-4 sm:p-5 rounded-[24px] sm:rounded-[30px] shadow-[0_30px_60px_rgba(0,128,0,0.4)] flex items-center gap-4 sm:gap-5 max-w-[280px] sm:max-w-[340px] border border-white/20 backdrop-blur-sm">
        <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white/20 rounded-[15px] sm:rounded-[20px] flex items-center justify-center shrink-0">
          <CheckCircle2 size={24} className="text-white sm:w-30 sm:h-30" />
        </div>
        <div className="flex flex-col">
          <p className="text-white text-xs sm:text-base font-bold leading-tight">
            {currentName} <span className="font-normal text-green-50">acabou de garantir o</span> <span className="text-white font-black underline decoration-white/30">Planner 2026</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-purple-500 selection:text-white bg-[#0d0415]">
      <Hero />
      <SectionPain />
      <SectionBenefits />
      <Deliverables />
      <HowToReceive />
      <Pricing />
      <Testimonials />
      <Guarantee />
      <FAQ />
      
      <section className="py-40 text-center bg-gradient-to-t from-purple-900/10 to-transparent">
        <Reveal animation="up">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold text-white mb-10 italic font-serif leading-tight">Sua rotina nova começa agora.</h2>
            <p className="text-slate-400 mb-16 text-lg sm:text-xl md:text-3xl font-light leading-relaxed">Não deixe seu 2026 para o improviso. Junte-se a centenas de mulheres que escolheram a paz.</p>
            <a 
              href="https://pay.hotmart.com/M103597285Q?bid=1767126568241" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center justify-center gap-4 sm:gap-6 px-10 sm:px-16 py-6 sm:py-8 bg-gradient-to-br from-purple-500 via-purple-700 to-indigo-900 text-white rounded-[30px] sm:rounded-[40px] font-black text-xl sm:text-2xl transition-all transform hover:scale-105 shadow-2xl shadow-purple-950 w-full sm:w-auto"
            >
              GARANTIR MEU PLANNER <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform shrink-0 hidden sm:block" />
            </a>
          </div>
        </Reveal>
      </section>

      <Footer />
      <PurchaseNotification />
    </div>
  );
}
