import { useState, useEffect, useCallback } from "react";

const CONTENT = {
  vocabulary: [
    { es: "el desayuno", en: "breakfast", example: "El desayuno está listo." },
    { es: "la cena", en: "dinner", example: "¿A qué hora es la cena?" },
    { es: "el trabajo", en: "work/job", example: "Voy al trabajo cada día." },
    { es: "la tienda", en: "store/shop", example: "La tienda está cerrada." },
    { es: "el vecino", en: "neighbor", example: "Mi vecino es muy amable." },
    { es: "la semana", en: "week", example: "Esta semana estoy ocupado." },
    { es: "el tiempo", en: "time/weather", example: "¿Qué tiempo hace hoy?" },
    { es: "la ciudad", en: "city", example: "Me encanta esta ciudad." },
    { es: "el dinero", en: "money", example: "No tengo mucho dinero." },
    { es: "la familia", en: "family", example: "Mi familia es grande." },
  ],
  travel: [
    { es: "¿Dónde está el baño?", en: "Where is the bathroom?", tip: "Essential everywhere!" },
    { es: "Una mesa para dos, por favor.", en: "A table for two, please.", tip: "Great for restaurants" },
    { es: "¿Cuánto cuesta?", en: "How much does it cost?", tip: "Shopping must-know" },
    { es: "Me gustaría reservar una habitación.", en: "I'd like to book a room.", tip: "For hotels" },
    { es: "¿A qué hora sale el tren?", en: "What time does the train leave?", tip: "For transport" },
    { es: "Estoy perdido/a.", en: "I'm lost.", tip: "Add -a if you're female" },
    { es: "¿Puede hablar más despacio?", en: "Can you speak more slowly?", tip: "Very useful!" },
    { es: "La cuenta, por favor.", en: "The bill, please.", tip: "Dining essential" },
    { es: "¿Hay wifi aquí?", en: "Is there wifi here?", tip: "Modern travel need" },
    { es: "Necesito un médico.", en: "I need a doctor.", tip: "Emergency phrase" },
  ],
  grammar: [
    {
      title: "Ser vs. Estar",
      rule: "Both mean 'to be' but are used differently.",
      details: "SER: permanent traits — identity, origin, profession.\nESTAR: temporary states — location, feelings, conditions.",
      examples: ["Soy de México. (I'm from Mexico — origin)", "Estoy cansado. (I'm tired — temporary state)", "Ella es médica. (She is a doctor — profession)", "El café está frío. (The coffee is cold — condition)"],
    },
    {
      title: "Preterite Tense",
      rule: "Used for completed past actions.",
      details: "For -AR verbs: add -é, -aste, -ó, -amos, -aron\nFor -ER/-IR verbs: add -í, -iste, -ió, -imos, -ieron",
      examples: ["Comí pizza anoche. (I ate pizza last night)", "Ella habló con Juan. (She spoke with Juan)", "Fuimos al cine. (We went to the cinema)", "¿Dormiste bien? (Did you sleep well?)"],
    },
    {
      title: "Direct Object Pronouns",
      rule: "Replace the noun being acted upon.",
      details: "me (me), te (you), lo/la (him/her/it), nos (us), los/las (them)\nPlace BEFORE the conjugated verb.",
      examples: ["Lo veo. (I see it/him)", "Te llamo mañana. (I'll call you tomorrow)", "La conozco. (I know her)", "¿Me escuchas? (Are you listening to me?)"],
    },
    {
      title: "Reflexive Verbs",
      rule: "Action done to oneself — use reflexive pronouns.",
      details: "me, te, se, nos, se\nCommon: levantarse, llamarse, sentirse, ducharse",
      examples: ["Me llamo Ana. (My name is Ana)", "Se levanta a las 7. (He gets up at 7)", "Nos sentimos bien. (We feel good)", "¿Cómo te llamas? (What's your name?)"],
    },
    {
      title: "Subjunctive Mood",
      rule: "Used for wishes, doubts, emotions, and hypotheticals.",
      details: "Trigger words: quiero que, espero que, es importante que, ojalá\nFlip the vowel: -AR → -e endings, -ER/-IR → -a endings",
      examples: ["Quiero que vengas. (I want you to come)", "Espero que llueva. (I hope it rains)", "Es importante que comas. (It's important that you eat)", "Ojalá tengas suerte. (Hopefully you have luck)"],
    },
  ],
  numbers: [
    { es: "cero", en: "0" }, { es: "uno", en: "1" }, { es: "dos", en: "2" },
    { es: "tres", en: "3" }, { es: "cuatro", en: "4" }, { es: "cinco", en: "5" },
    { es: "seis", en: "6" }, { es: "siete", en: "7" }, { es: "ocho", en: "8" },
    { es: "nueve", en: "9" }, { es: "diez", en: "10" }, { es: "veinte", en: "20" },
    { es: "treinta", en: "30" }, { es: "cincuenta", en: "50" }, { es: "cien", en: "100" },
    { es: "lunes", en: "Monday" }, { es: "martes", en: "Tuesday" }, { es: "miércoles", en: "Wednesday" },
    { es: "jueves", en: "Thursday" }, { es: "viernes", en: "Friday" }, { es: "sábado", en: "Saturday" },
    { es: "domingo", en: "Sunday" }, { es: "enero", en: "January" }, { es: "febrero", en: "February" },
    { es: "marzo", en: "March" }, { es: "abril", en: "April" }, { es: "mayo", en: "May" },
    { es: "junio", en: "June" }, { es: "julio", en: "July" }, { es: "agosto", en: "August" },
  ],
};

const QUIZ_QUESTIONS = [
  { q: "How do you say 'I am tired' in Spanish?", a: "Estoy cansado", options: ["Soy cansado", "Estoy cansado", "Estar cansado", "Soy cansada"] },
  { q: "Which word means 'breakfast'?", a: "el desayuno", options: ["la cena", "el almuerzo", "el desayuno", "la comida"] },
  { q: "Complete: '¿___ está el baño?'", a: "Dónde", options: ["Quién", "Cuándo", "Dónde", "Cómo"] },
  { q: "How do you say 'Monday' in Spanish?", a: "lunes", options: ["martes", "miércoles", "lunes", "viernes"] },
  { q: "'Cien' means:", a: "100", options: ["10", "50", "100", "1000"] },
  { q: "SER is used for:", a: "Permanent traits like origin", options: ["Temporary feelings", "Permanent traits like origin", "Location", "Current conditions"] },
  { q: "How do you ask 'How much does it cost?'", a: "¿Cuánto cuesta?", options: ["¿Cómo se llama?", "¿Cuánto cuesta?", "¿Dónde está?", "¿Qué hora es?"] },
  { q: "'Me llamo' literally means:", a: "I call myself", options: ["My name is given", "I call myself", "I am called by", "They name me"] },
  { q: "Preterite of 'hablar' (yo):", a: "hablé", options: ["hablo", "hablaba", "hablé", "hablaré"] },
  { q: "Which phrase means 'The bill, please'?", a: "La cuenta, por favor.", options: ["La mesa, por favor.", "El menú, por favor.", "La cuenta, por favor.", "El agua, por favor."] },
];

export default function SpanishApp() {
  const [tab, setTab] = useState("home");
  const [flashIndex, setFlashIndex] = useState(0);
  const [flashCategory, setFlashCategory] = useState("vocabulary");
  const [flipped, setFlipped] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [grammarIndex, setGrammarIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedSections, setCompletedSections] = useState([]);

  const flashItems = flashCategory === "vocabulary"
    ? CONTENT.vocabulary
    : flashCategory === "travel"
    ? CONTENT.travel
    : CONTENT.numbers;

  const handleFlashNext = () => {
    setFlipped(false);
    setTimeout(() => setFlashIndex((i) => (i + 1) % flashItems.length), 150);
  };
  const handleFlashPrev = () => {
    setFlipped(false);
    setTimeout(() => setFlashIndex((i) => (i - 1 + flashItems.length) % flashItems.length), 150);
  };

  const handleQuizAnswer = (opt) => {
    if (quizSelected) return;
    setQuizSelected(opt);
    if (opt === QUIZ_QUESTIONS[quizIndex].a) setQuizScore((s) => s + 1);
  };
  const handleQuizNext = () => {
    if (quizIndex + 1 >= QUIZ_QUESTIONS.length) {
      setQuizDone(true);
      if (!completedSections.includes("quiz")) {
        setCompletedSections((c) => [...c, "quiz"]);
        setStreak((s) => s + 1);
      }
    } else {
      setQuizIndex((i) => i + 1);
      setQuizSelected(null);
    }
  };
  const resetQuiz = () => {
    setQuizIndex(0); setQuizSelected(null); setQuizScore(0); setQuizDone(false);
  };

  const tabs = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "flash", icon: "🃏", label: "Cards" },
    { id: "quiz", icon: "✏️", label: "Quiz" },
    { id: "grammar", icon: "📖", label: "Grammar" },
    { id: "chat", icon: "💬", label: "Speak" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #060606 0%, #120000 50%, #0a0000 100%)",
      fontFamily: "'Georgia', serif",
      color: "#fff5f0",
      display: "flex",
      flexDirection: "column",
      maxWidth: 480,
      margin: "0 auto",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative fire glow background */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "radial-gradient(ellipse at 50% 100%, rgba(255,60,0,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 10%, rgba(255,140,0,0.08) 0%, transparent 50%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Header */}
      <div style={{
        padding: "20px 24px 16px",
        borderBottom: "1px solid rgba(255,80,0,0.25)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "relative", zIndex: 1,
      }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: "bold", letterSpacing: 2, background: "linear-gradient(90deg, #ff4500, #ffb300)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>FUEGO 🔥</div>
          <div style={{ fontSize: 11, color: "rgba(255,245,235,0.5)", letterSpacing: 3, textTransform: "uppercase" }}>Spanish on fire</div>
        </div>
        <div style={{
          background: "rgba(255,60,0,0.15)", border: "1px solid rgba(255,60,0,0.4)",
          borderRadius: 20, padding: "6px 14px", fontSize: 13, color: "#ff6a00",
        }}>
          🔥 {streak} day streak
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "auto", position: "relative", zIndex: 1, paddingBottom: 80 }}>
        {tab === "home" && <HomeTab completedSections={completedSections} setTab={setTab} streak={streak} />}
        {tab === "flash" && (
          <FlashTab
            flashCategory={flashCategory} setFlashCategory={(c) => { setFlashCategory(c); setFlashIndex(0); setFlipped(false); }}
            flashItems={flashItems} flashIndex={flashIndex} flipped={flipped}
            setFlipped={setFlipped} handleFlashNext={handleFlashNext} handleFlashPrev={handleFlashPrev}
            completedSections={completedSections} setCompletedSections={setCompletedSections} setStreak={setStreak}
          />
        )}
        {tab === "quiz" && (
          <QuizTab
            quizDone={quizDone} quizScore={quizScore} quizIndex={quizIndex}
            quizSelected={quizSelected} handleQuizAnswer={handleQuizAnswer}
            handleQuizNext={handleQuizNext} resetQuiz={resetQuiz}
          />
        )}
        {tab === "grammar" && (
          <GrammarTab grammarIndex={grammarIndex} setGrammarIndex={setGrammarIndex} />
        )}
        {tab === "chat" && <ConversationTab />}
      </div>

      {/* Bottom nav */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 480,
        background: "rgba(4,0,0,0.97)", borderTop: "1px solid rgba(255,60,0,0.2)",
        display: "flex", zIndex: 10,
        backdropFilter: "blur(10px)",
      }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: "12px 0", background: "none", border: "none",
            color: tab === t.id ? "#ff6a00" : "rgba(255,245,235,0.35)",
            cursor: "pointer", fontSize: 11, letterSpacing: 0.5,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            transition: "color 0.2s",
          }}>
            <span style={{ fontSize: 20 }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function HomeTab({ completedSections, setTab, streak }) {
  const cards = [
    { id: "flash", icon: "🃏", title: "Flashcards", desc: "Vocabulary, travel phrases & numbers", color: "#ff4500" },
    { id: "quiz", icon: "✏️", title: "Quick Quiz", desc: "Test your knowledge, 10 questions", color: "#ff8c00" },
    { id: "grammar", icon: "📖", title: "Grammar Guide", desc: "Ser/Estar, tenses, pronouns & more", color: "#cc3300" },
    { id: "chat", icon: "💬", title: "Speak Practice", desc: "AI conversation partner in Spanish", color: "#ff4500" },
  ];
  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 28, fontWeight: "bold", lineHeight: 1.2, marginBottom: 8 }}>
          ¡Hola! 👋<br />
          <span style={{ background: "linear-gradient(90deg, #ff4500, #ffb300)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Ready to practice?</span>
        </div>
        <div style={{ fontSize: 14, color: "rgba(255,245,235,0.6)", lineHeight: 1.6 }}>
          You know the basics — now let's build fluency. Pick a mode to get started.
        </div>
      </div>

      {/* Tip of the day */}
      <div style={{
        background: "rgba(255,60,0,0.1)", border: "1px solid rgba(255,60,0,0.3)",
        borderRadius: 16, padding: "16px 20px", marginBottom: 28,
      }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "#ff6a00", marginBottom: 8 }}>🔥 Word of the Day</div>
        <div style={{ fontSize: 24, fontWeight: "bold", marginBottom: 4 }}>madrugada</div>
        <div style={{ color: "rgba(255,245,235,0.65)", fontSize: 14 }}>the early hours before dawn</div>
        <div style={{ marginTop: 8, fontSize: 13, fontStyle: "italic", color: "rgba(255,245,235,0.4)" }}>
          "Me gusta trabajar en la madrugada."
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {cards.map((c) => (
          <button key={c.id} onClick={() => setTab(c.id)} style={{
            background: `linear-gradient(135deg, ${c.color}22, ${c.color}0d)`,
            border: `1px solid ${c.color}44`,
            borderRadius: 16, padding: "18px 20px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 16, textAlign: "left",
            transition: "transform 0.15s, border-color 0.15s", color: "#fff5f0",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <div style={{ fontSize: 32 }}>{c.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 4 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: "rgba(255,245,235,0.55)" }}>{c.desc}</div>
            </div>
            {completedSections.includes(c.id) && <div style={{ color: "#ffb300", fontSize: 18 }}>✓</div>}
            <div style={{ color: "rgba(255,245,235,0.35)", fontSize: 18 }}>›</div>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 28, textAlign: "center", fontSize: 13, color: "rgba(255,245,235,0.35)" }}>
        🔥 Covering vocabulary, grammar, travel & numbers
      </div>
    </div>
  );
}

function FlashTab({ flashCategory, setFlashCategory, flashItems, flashIndex, flipped, setFlipped, handleFlashNext, handleFlashPrev, completedSections, setCompletedSections, setStreak }) {
  const item = flashItems[flashIndex];
  const categories = [
    { id: "vocabulary", label: "Vocab", icon: "💬" },
    { id: "travel", label: "Travel", icon: "✈️" },
    { id: "numbers", label: "Numbers", icon: "🔢" },
  ];

  const handleComplete = () => {
    if (!completedSections.includes("flash")) {
      setCompletedSections((c) => [...c, "flash"]);
      setStreak((s) => s + 1);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 4 }}>Flashcards</div>
      <div style={{ fontSize: 13, color: "rgba(255,245,235,0.5)", marginBottom: 20 }}>Tap card to reveal translation</div>

      {/* Category selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {categories.map((c) => (
          <button key={c.id} onClick={() => setFlashCategory(c.id)} style={{
            flex: 1, padding: "10px 0", borderRadius: 12,
            background: flashCategory === c.id ? "rgba(255,60,0,0.6)" : "rgba(255,60,0,0.1)",
            border: `1px solid ${flashCategory === c.id ? "rgba(255,60,0,0.8)" : "rgba(255,60,0,0.2)"}`,
            color: flashCategory === c.id ? "#fff" : "rgba(255,245,235,0.6)",
            cursor: "pointer", fontSize: 13, fontFamily: "Georgia, serif",
          }}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,245,235,0.5)", marginBottom: 6 }}>
          <span>Card {flashIndex + 1} of {flashItems.length}</span>
          <span>{Math.round(((flashIndex + 1) / flashItems.length) * 100)}%</span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 4, height: 4 }}>
          <div style={{
            background: "linear-gradient(90deg, #e63000, #ff6a00)",
            borderRadius: 4, height: 4,
            width: `${((flashIndex + 1) / flashItems.length) * 100}%`,
            transition: "width 0.3s",
          }} />
        </div>
      </div>

      {/* Card */}
      <div onClick={() => setFlipped(!flipped)} style={{
        minHeight: 200, borderRadius: 20, cursor: "pointer",
        background: flipped
          ? "linear-gradient(135deg, rgba(255,60,0,0.4), rgba(255,60,0,0.2))"
          : "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
        border: `1px solid ${flipped ? "rgba(255,60,0,0.6)" : "rgba(255,255,255,0.15)"}`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: 32, textAlign: "center", transition: "all 0.3s", marginBottom: 24,
      }}>
        {!flipped ? (
          <>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,245,235,0.4)", marginBottom: 16 }}>🇪🇸 Spanish</div>
            <div style={{ fontSize: 26, fontWeight: "bold", marginBottom: 12 }}>{item.es}</div>
            {item.example && <div style={{ fontSize: 13, fontStyle: "italic", color: "rgba(255,245,235,0.5)" }}>{item.example}</div>}
            {item.tip && <div style={{ fontSize: 12, color: "rgba(240,160,64,0.7)", marginTop: 8 }}>💡 {item.tip}</div>}
          </>
        ) : (
          <>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "#ff6a00", marginBottom: 16 }}>🇬🇧 English</div>
            <div style={{ fontSize: 26, fontWeight: "bold", color: "#ff6a00" }}>{item.en}</div>
          </>
        )}
        <div style={{ marginTop: 20, fontSize: 11, color: "rgba(255,245,235,0.3)" }}>
          {flipped ? "tap to see Spanish" : "tap to reveal"}
        </div>
      </div>

      {/* Nav buttons */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <button onClick={handleFlashPrev} style={{
          flex: 1, padding: "14px 0", borderRadius: 12, cursor: "pointer",
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
          color: "#fff5f0", fontSize: 15, fontFamily: "Georgia, serif",
        }}>← Prev</button>
        <button onClick={handleFlashNext} style={{
          flex: 1, padding: "14px 0", borderRadius: 12, cursor: "pointer",
          background: "linear-gradient(135deg, #e63000, #ff6a00)", border: "none",
          color: "#fff", fontSize: 15, fontWeight: "bold", fontFamily: "Georgia, serif",
        }}>Next →</button>
      </div>
      {flashIndex === flashItems.length - 1 && (
        <button onClick={handleComplete} style={{
          width: "100%", padding: "14px 0", borderRadius: 12, cursor: "pointer",
          background: "linear-gradient(135deg, #166534, #15803d)", border: "none",
          color: "#fff", fontSize: 15, fontWeight: "bold", fontFamily: "Georgia, serif",
        }}>🎉 Mark Set Complete</button>
      )}
    </div>
  );
}

function QuizTab({ quizDone, quizScore, quizIndex, quizSelected, handleQuizAnswer, handleQuizNext, resetQuiz }) {
  const q = QUIZ_QUESTIONS[quizIndex];

  if (quizDone) {
    const pct = Math.round((quizScore / QUIZ_QUESTIONS.length) * 100);
    return (
      <div style={{ padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>
          {pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "📚"}
        </div>
        <div style={{ fontSize: 28, fontWeight: "bold", marginBottom: 8, color: "#ff6a00" }}>Quiz Complete!</div>
        <div style={{ fontSize: 48, fontWeight: "bold", marginBottom: 8 }}>{quizScore}/{QUIZ_QUESTIONS.length}</div>
        <div style={{ fontSize: 16, color: "rgba(255,245,235,0.6)", marginBottom: 32 }}>
          {pct >= 80 ? "¡Excelente! You're doing great!" : pct >= 60 ? "¡Bien hecho! Keep practicing!" : "¡Sigue practicando! You'll get there!"}
        </div>
        <div style={{
          background: "rgba(255,60,0,0.15)", border: "1px solid rgba(255,60,0,0.3)",
          borderRadius: 16, padding: 20, marginBottom: 24, textAlign: "left",
        }}>
          <div style={{ fontSize: 13, color: "#ff6a00", marginBottom: 8, fontWeight: "bold" }}>Your Score</div>
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 4, height: 8 }}>
            <div style={{
              background: pct >= 80 ? "linear-gradient(90deg, #166534, #4ade80)" : pct >= 60 ? "linear-gradient(90deg, #ff8c00, #ff6a00)" : "linear-gradient(90deg, #e63000, #ff6a00)",
              borderRadius: 4, height: 8, width: `${pct}%`, transition: "width 1s",
            }} />
          </div>
          <div style={{ marginTop: 8, fontSize: 13, color: "rgba(255,245,235,0.6)" }}>{pct}% correct</div>
        </div>
        <button onClick={resetQuiz} style={{
          width: "100%", padding: "16px 0", borderRadius: 14, cursor: "pointer",
          background: "linear-gradient(135deg, #e63000, #ff6a00)", border: "none",
          color: "#fff", fontSize: 16, fontWeight: "bold", fontFamily: "Georgia, serif",
        }}>Try Again</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: "bold" }}>Quick Quiz</div>
          <div style={{ fontSize: 13, color: "rgba(255,245,235,0.5)" }}>Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}</div>
        </div>
        <div style={{
          background: "rgba(255,60,0,0.2)", border: "1px solid rgba(255,60,0,0.4)",
          borderRadius: 20, padding: "6px 14px", fontSize: 14, fontWeight: "bold", color: "#ff6a00",
        }}>
          {quizScore} pts
        </div>
      </div>

      {/* Progress */}
      <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 4, height: 4, marginBottom: 28 }}>
        <div style={{
          background: "linear-gradient(90deg, #e63000, #ff6a00)", borderRadius: 4, height: 4,
          width: `${(quizIndex / QUIZ_QUESTIONS.length) * 100}%`, transition: "width 0.3s",
        }} />
      </div>

      {/* Question */}
      <div style={{
        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 16, padding: "24px 20px", marginBottom: 24, textAlign: "center",
        minHeight: 100, display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ fontSize: 18, lineHeight: 1.5, fontWeight: "bold" }}>{q.q}</div>
      </div>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {q.options.map((opt) => {
          let bg = "rgba(255,255,255,0.05)";
          let border = "rgba(255,255,255,0.1)";
          let color = "#fff5f0";
          if (quizSelected) {
            if (opt === q.a) { bg = "rgba(22,101,52,0.4)"; border = "rgba(74,222,128,0.6)"; color = "#4ade80"; }
            else if (opt === quizSelected) { bg = "rgba(200,30,30,0.3)"; border = "rgba(248,113,113,0.6)"; color = "#f87171"; }
          }
          return (
            <button key={opt} onClick={() => handleQuizAnswer(opt)} style={{
              padding: "16px 20px", borderRadius: 12, cursor: quizSelected ? "default" : "pointer",
              background: bg, border: `1px solid ${border}`, color, textAlign: "left",
              fontSize: 15, fontFamily: "Georgia, serif", transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              {quizSelected && opt === q.a && <span>✓</span>}
              {quizSelected && opt === quizSelected && opt !== q.a && <span>✗</span>}
              {opt}
            </button>
          );
        })}
      </div>

      {quizSelected && (
        <button onClick={handleQuizNext} style={{
          width: "100%", marginTop: 20, padding: "16px 0", borderRadius: 14, cursor: "pointer",
          background: "linear-gradient(135deg, #e63000, #ff6a00)", border: "none",
          color: "#fff", fontSize: 16, fontWeight: "bold", fontFamily: "Georgia, serif",
        }}>
          {quizIndex + 1 >= QUIZ_QUESTIONS.length ? "See Results" : "Next Question →"}
        </button>
      )}
    </div>
  );
}

const SCENARIOS = [
  { id: "cafe", label: "☕ Café", prompt: "You are a friendly Spanish-speaking barista at a cozy café in Madrid. The user is a customer practicing their Spanish. Keep responses short (2-4 sentences). Speak mostly in Spanish but occasionally add English hints in parentheses when the user seems confused. Gently correct grammar mistakes by repeating the correct form naturally in your reply. Start by greeting the customer and asking what they'd like." },
  { id: "market", label: "🛒 Market", prompt: "You are a friendly vendor at a Spanish market selling fruit and vegetables. The user is practicing their Spanish. Keep responses short (2-4 sentences). Speak mostly in Spanish but add English hints in parentheses when helpful. Gently correct grammar mistakes by modeling the correct form. Start by greeting and asking what they're looking for." },
  { id: "hotel", label: "🏨 Hotel", prompt: "You are a polite hotel receptionist in Barcelona. The user is checking in and practicing Spanish. Keep responses short (2-4 sentences). Speak mostly in Spanish with English hints in parentheses when helpful. Gently correct grammar mistakes naturally. Start by welcoming the guest." },
  { id: "friend", label: "👥 Friend Chat", prompt: "You are a friendly Spanish-speaking native who is helping someone practice conversational Spanish. Be casual, warm and fun. Keep responses short (2-4 sentences). Speak mostly in Spanish, adding English hints in parentheses when helpful. Correct grammar mistakes gently by using the right form in your reply. Start by introducing yourself and asking how they are." },
];

function ConversationTab() {
  const [scenario, setScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [listening, setListening] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [micError, setMicError] = useState(null);
  const [voiceSupported] = useState(() => "SpeechRecognition" in window || "webkitSpeechRecognition" in window);
  const recognitionRef = useState(null);

  // iOS requires audio to be unlocked by a user gesture first
  const unlockAudio = () => {
    if (audioUnlocked) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    ctx.resume().then(() => setAudioUnlocked(true));
    // Also prime speechSynthesis with a silent utterance
    const utt = new SpeechSynthesisUtterance("");
    window.speechSynthesis.speak(utt);
    setAudioUnlocked(true);
  };

  const speak = (text) => {
    if (!speakerOn || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/\(.*?\)/g, "").trim();
    const utt = new SpeechSynthesisUtterance(clean);
    utt.lang = "es-ES";
    utt.rate = 0.85;
    utt.pitch = 1.0;
    utt.volume = 1.0;
    const trySpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      const spanish = voices.find(v => v.lang.startsWith("es")) || voices[0];
      if (spanish) utt.voice = spanish;
      utt.onstart = () => setSpeaking(true);
      utt.onend = () => setSpeaking(false);
      utt.onerror = (e) => { setSpeaking(false); };
      window.speechSynthesis.speak(utt);
    };
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = trySpeak;
    } else { trySpeak(); }
  };

  const startListening = () => {
    setMicError(null);
    // iOS Safari needs explicit getUserMedia permission first
    navigator.mediaDevices?.getUserMedia({ audio: true })
      .then(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) { setMicError("Speech recognition not supported on this browser."); return; }
        const recognition = new SpeechRecognition();
        recognition.lang = "es-ES";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognitionRef[0] = recognition;
        recognition.onresult = (e) => {
          const transcript = e.results[0][0].transcript;
          setInput(prev => prev ? prev + " " + transcript : transcript);
        };
        recognition.onend = () => setListening(false);
        recognition.onerror = (e) => {
          setMicError("Mic error: " + e.error + ". Check Settings > Safari > Microphone.");
          setListening(false);
        };
        recognition.start();
        setListening(true);
      })
      .catch(() => {
        setMicError("Microphone blocked. Go to Settings > Safari > Microphone and set to Allow.");
        setListening(false);
      });
  };

  const stopListening = () => {
    if (recognitionRef[0]) { recognitionRef[0].stop(); }
    setListening(false);
  };

  const startScenario = async (sc) => {
    setScenario(sc);
    setMessages([]);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: sc.prompt,
          messages: [{ role: "user", content: "Start the conversation." }],
        }),
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "¡Hola!";
      setMessages([{ role: "assistant", text }]);
      if (speakerOn) speak(text);
    } catch {
      setMessages([{ role: "assistant", text: "Lo siento, something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user", text: userMsg }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const apiMessages = newMessages.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: scenario.prompt,
          messages: apiMessages,
        }),
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "...";
      setMessages(prev => [...prev, { role: "assistant", text }]);
      if (speakerOn) speak(text);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Lo siento, error. Try again." }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  if (!scenario) {
    return (
      <div style={{ padding: 24 }}>
        <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 4 }}>Speak Practice</div>
        <div style={{ fontSize: 13, color: "rgba(255,245,235,0.5)", marginBottom: 24 }}>
          Choose a scenario and chat with an AI native speaker. It'll correct your mistakes naturally!
        </div>
        <div style={{
          background: "rgba(255,60,0,0.1)", border: "1px solid rgba(255,60,0,0.3)",
          borderRadius: 14, padding: "14px 16px", marginBottom: 16, fontSize: 13,
          color: "rgba(255,245,235,0.75)", lineHeight: 1.6,
        }}>
          💡 <strong style={{ color: "#ff6a00" }}>How it works:</strong> Type <em>or speak</em> in Spanish using the 🎤 mic button. The AI will respond in Spanish, gently correct mistakes, and keep the conversation going.
        </div>

        {!audioUnlocked && (
          <button onClick={unlockAudio} style={{
            width: "100%", padding: "16px", borderRadius: 14, cursor: "pointer", marginBottom: 16,
            background: "linear-gradient(135deg, #e63000, #ff6a00)", border: "none",
            color: "#fff", fontSize: 15, fontWeight: "bold", fontFamily: "Georgia, serif",
          }}>
            🔊 Tap here first to enable audio & mic
          </button>
        )}

        {micError && (
          <div style={{
            background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.4)",
            borderRadius: 12, padding: "12px 16px", marginBottom: 16, fontSize: 13,
            color: "#fca5a5",
          }}>⚠️ {micError}</div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {SCENARIOS.map((sc) => (
            <button key={sc.id} onClick={() => { unlockAudio(); startScenario(sc); }} style={{
              background: "linear-gradient(135deg, rgba(230,48,0,0.2), rgba(230,48,0,0.08))",
              border: "1px solid rgba(230,48,0,0.35)", borderRadius: 16,
              padding: "20px", cursor: "pointer", textAlign: "left", color: "#fff5f0",
              fontFamily: "Georgia, serif", transition: "transform 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <div style={{ fontSize: 22, marginBottom: 6 }}>{sc.label}</div>
              <div style={{ fontSize: 13, color: "rgba(255,245,235,0.55)" }}>
                {sc.id === "cafe" && "Order drinks, ask about the menu, make small talk"}
                {sc.id === "market" && "Buy produce, ask prices, practice numbers"}
                {sc.id === "hotel" && "Check in, ask for help, navigate the lobby"}
                {sc.id === "friend" && "Casual chat about your day, hobbies, plans"}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 140px)" }}>
      {/* Chat header */}
      <div style={{
        padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <button onClick={() => { setScenario(null); window.speechSynthesis && window.speechSynthesis.cancel(); }} style={{
          background: "none", border: "none", color: "rgba(255,245,235,0.5)",
          cursor: "pointer", fontSize: 18, padding: 0, fontFamily: "Georgia, serif",
        }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: "bold", display: "flex", alignItems: "center", gap: 8 }}>
            {scenario.label}
            {speaking && <span style={{ fontSize: 11, color: "#4ade80", animation: "pulse 1.2s infinite" }}>🔊 speaking...</span>}
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,245,235,0.45)" }}>AI will correct your Spanish naturally</div>
        </div>
        <button onClick={() => { setSpeakerOn(s => { if (s) window.speechSynthesis && window.speechSynthesis.cancel(); return !s; }); }} title="Toggle speaker" style={{
          background: speakerOn ? "rgba(26,92,58,0.3)" : "rgba(255,255,255,0.08)",
          border: `1px solid ${speakerOn ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.15)"}`,
          borderRadius: 20, padding: "5px 12px", fontSize: 16, color: speakerOn ? "#4ade80" : "rgba(255,245,235,0.3)",
          cursor: "pointer",
        }}>{speakerOn ? "🔊" : "🔇"}</button>
        <button onClick={() => startScenario(scenario)} style={{
          background: "rgba(255,60,0,0.2)", border: "1px solid rgba(255,60,0,0.4)",
          borderRadius: 20, padding: "5px 12px", fontSize: 11, color: "#ff6a00",
          cursor: "pointer", fontFamily: "Georgia, serif",
        }}>↺ Reset</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px" }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start",
            marginBottom: 14,
          }}>
            {m.role === "assistant" && (
              <div style={{
                width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #1a5c3a, #166534)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, marginRight: 8, flexShrink: 0, marginTop: 2,
              }}>🇪🇸</div>
            )}
            <div style={{
              maxWidth: "75%",
              background: m.role === "user"
                ? "linear-gradient(135deg, #e63000, #ff6a00)"
                : "rgba(255,255,255,0.07)",
              border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.1)",
              borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              padding: "12px 16px", fontSize: 14, lineHeight: 1.6, color: "#fff5f0",
            }}>
              {m.text}
              {m.role === "assistant" && speakerOn && (
                <div onClick={() => speak(m.text)} style={{
                  marginTop: 6, fontSize: 11, color: "rgba(255,245,235,0.35)",
                  cursor: "pointer", userSelect: "none",
                }}>🔊 tap to replay</div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #1a5c3a, #166534)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
            }}>🇪🇸</div>
            <div style={{
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "18px 18px 18px 4px", padding: "12px 16px",
            }}>
              <div style={{ display: "flex", gap: 4 }}>
                {[0,1,2].map(j => (
                  <div key={j} style={{
                    width: 6, height: 6, borderRadius: "50%", background: "#ff6a00",
                    animation: "bounce 1.2s infinite", animationDelay: `${j * 0.2}s`,
                  }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={el => { if (el) el.scrollIntoView({ behavior: "smooth" }); }} />
      </div>

      {/* Phrases helper */}
      <div style={{ padding: "0 16px 8px" }}>
        <button onClick={() => setShowTip(t => !t)} style={{
          background: "none", border: "none", color: "rgba(255,245,235,0.4)",
          cursor: "pointer", fontSize: 11, fontFamily: "Georgia, serif", letterSpacing: 0.5,
        }}>
          💡 {showTip ? "Hide" : "Show"} helpful phrases
        </button>
        {showTip && (
          <div style={{
            background: "rgba(26,92,58,0.15)", border: "1px solid rgba(26,92,58,0.3)",
            borderRadius: 12, padding: "10px 14px", marginTop: 8, fontSize: 12,
            color: "rgba(255,245,235,0.7)", lineHeight: 2,
          }}>
            <div>¿Puede repetir? — Can you repeat?</div>
            <div>No entiendo — I don't understand</div>
            <div>¿Cómo se dice...? — How do you say...?</div>
            <div>Más despacio, por favor — Slower, please</div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{
        padding: "10px 16px 16px", borderTop: "1px solid rgba(255,255,255,0.08)",
        display: "flex", gap: 10, alignItems: "flex-end",
      }}>
        {voiceSupported && (
          <button
            onClick={listening ? stopListening : startListening}
            title={listening ? "Stop listening" : "Speak in Spanish"}
            style={{
              width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
              background: listening
                ? "linear-gradient(135deg, #dc2626, #ef4444)"
                : "rgba(255,255,255,0.1)",
              border: listening ? "2px solid rgba(255,100,100,0.6)" : "1px solid rgba(255,255,255,0.15)",
              cursor: "pointer", fontSize: 18,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
              animation: listening ? "pulse 1.2s infinite" : "none",
            }}
          >
            {listening ? "⏹" : "🎤"}
          </button>
        )}
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={listening ? "🎤 Listening... speak in Spanish" : "Escribe en español... (or English if stuck)"}
          rows={1}
          style={{
            flex: 1, background: listening ? "rgba(220,38,38,0.1)" : "rgba(255,255,255,0.07)",
            border: listening ? "1px solid rgba(220,38,38,0.4)" : "1px solid rgba(255,255,255,0.15)",
            borderRadius: 20, padding: "10px 16px", color: "#fff5f0", fontSize: 14,
            fontFamily: "Georgia, serif", resize: "none", outline: "none",
            transition: "all 0.2s",
          }}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()} style={{
          width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
          background: input.trim() && !loading ? "linear-gradient(135deg, #e63000, #ff6a00)" : "rgba(255,255,255,0.1)",
          border: "none", cursor: input.trim() && !loading ? "pointer" : "default",
          color: "#fff", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.2s",
        }}>→</button>
      </div>
      <style>{`
        @keyframes bounce { 0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)} }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,0.4)} 50%{box-shadow:0 0 0 8px rgba(220,38,38,0)} }
      `}</style>
    </div>
  );
}

function GrammarTab({ grammarIndex, setGrammarIndex }) {
  const rule = CONTENT.grammar[grammarIndex];
  return (
    <div style={{ padding: 24 }}>
      <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 4 }}>Grammar Guide</div>
      <div style={{ fontSize: 13, color: "rgba(255,245,235,0.5)", marginBottom: 20 }}>5 essential rules for intermediate learners</div>

      {/* Topic pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {CONTENT.grammar.map((g, i) => (
          <button key={i} onClick={() => setGrammarIndex(i)} style={{
            padding: "8px 14px", borderRadius: 20, cursor: "pointer", fontSize: 12,
            background: grammarIndex === i ? "rgba(255,60,0,0.5)" : "rgba(255,60,0,0.1)",
            border: `1px solid ${grammarIndex === i ? "rgba(255,60,0,0.8)" : "rgba(255,60,0,0.2)"}`,
            color: grammarIndex === i ? "#fff" : "rgba(255,245,235,0.6)",
            fontFamily: "Georgia, serif",
          }}>{g.title}</button>
        ))}
      </div>

      {/* Rule card */}
      <div style={{
        background: "rgba(255,60,0,0.1)", border: "1px solid rgba(255,60,0,0.4)",
        borderRadius: 20, padding: 24, marginBottom: 20,
      }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "#ff6a00", marginBottom: 10 }}>📐 The Rule</div>
        <div style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>{rule.title}</div>
        <div style={{ fontSize: 14, color: "rgba(255,245,235,0.8)", lineHeight: 1.6, marginBottom: 16 }}>{rule.rule}</div>
        <div style={{
          background: "rgba(0,0,0,0.3)", borderRadius: 12, padding: 16,
          fontSize: 13, color: "rgba(255,245,235,0.7)", lineHeight: 1.8, whiteSpace: "pre-line",
        }}>{rule.details}</div>
      </div>

      {/* Examples */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "#ff6a00", marginBottom: 12 }}>🗣 Examples</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {rule.examples.map((ex, i) => {
            const [es, en] = ex.split(" (");
            return (
              <div key={i} style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12, padding: "14px 16px",
              }}>
                <div style={{ fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>{es}</div>
                <div style={{ fontSize: 13, color: "rgba(255,245,235,0.55)" }}>({en}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => setGrammarIndex((i) => Math.max(0, i - 1))} disabled={grammarIndex === 0} style={{
          flex: 1, padding: "14px 0", borderRadius: 12, cursor: "pointer",
          background: grammarIndex === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)", color: grammarIndex === 0 ? "rgba(255,245,235,0.2)" : "#fff5f0",
          fontSize: 15, fontFamily: "Georgia, serif",
        }}>← Prev</button>
        <button onClick={() => setGrammarIndex((i) => Math.min(CONTENT.grammar.length - 1, i + 1))} disabled={grammarIndex === CONTENT.grammar.length - 1} style={{
          flex: 1, padding: "14px 0", borderRadius: 12, cursor: "pointer",
          background: grammarIndex === CONTENT.grammar.length - 1 ? "rgba(255,255,255,0.03)" : "linear-gradient(135deg, #e63000, #ff6a00)",
          border: "none", color: grammarIndex === CONTENT.grammar.length - 1 ? "rgba(255,245,235,0.2)" : "#fff",
          fontSize: 15, fontWeight: "bold", fontFamily: "Georgia, serif",
        }}>Next →</button>
      </div>
    </div>
  );
}


