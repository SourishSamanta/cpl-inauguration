import { useEffect, useState, useRef } from "react";
import { HiScissors } from "react-icons/hi2";

const bootSequence = [
    ">>> INITIALIZING CODING PREMIER LEAGUE 2026",
    ">>> LOCATING TALENT... [OK]",
    ">>> COMPILING RULES... [OK]",
    "",
    "STATUS: LOCKED | Waiting for Admin Authentication... Press Enter!",
];

export default function App() {
    const [lines, setLines] = useState([]);
    const [step, setStep] = useState(0);
    const [bootStarted, setBootStarted] = useState(false);
    const [bootComplete, setBootComplete] = useState(false);

    const [unlocked, setUnlocked] = useState(false);
    const [loading, setLoading] = useState(0);

    const [cut, setCut] = useState(false);
    const [showRibbon, setShowRibbon] = useState(true);

    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    const [showFinal, setShowFinal] = useState(false);
    const [phase, setPhase] = useState("terminal");

    const [muted, setMuted] = useState(false);

    const audioRef = useRef(null);

    /* 🎀 Ribbon Cut */
    useEffect(() => {
        if (cut) {
            setTimeout(() => setShowRibbon(false), 1200);
            setBootStarted(true);
        }
    }, [cut]);

    /* 🖥 Boot */
    useEffect(() => {
        if (bootStarted && step < bootSequence.length) {
            const t = setTimeout(() => {
                setLines((prev) => [...prev, bootSequence[step]]);
                setStep((prev) => prev + 1);
            }, 500);
            return () => clearTimeout(t);
        }

        if (bootStarted && step === bootSequence.length) {
            setBootComplete(true);
        }
    }, [bootStarted, step]);

    /* 🖱 Mouse */
    useEffect(() => {
        const handleMove = (e) => {
            setMouse({ x: e.pageX, y: e.pageY });
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    /* ⌨️ ENTER */
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Enter" && bootComplete && !unlocked) {
                triggerLaunch();
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [bootComplete, unlocked]);

    /* 🚀 Launch */
    const triggerLaunch = () => {
        setUnlocked(true);

        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                setLines((prev) => [
                    ...prev,
                    `[SYS] Injecting module_${i}.dll ... OK`,
                ]);
            }, i * 60);
        }

        setTimeout(() => {
            setLines((prev) => [
                ...prev,
                "",
                ">>> ACCESS GRANTED: ADMIN DETECTED",
                ">>> DEPLOYING TO ALL TERMINALS...",
            ]);

            startLoading();
        }, 1200);
    };

    /* ⚙️ Loading */
    const startLoading = () => {
        let i = 0;

        const interval = setInterval(() => {
            i += 5;
            setLoading(i);

            if (i >= 100) {
                clearInterval(interval);

                setTimeout(() => {
                    setLines([]);
                    setShowFinal(true);

                    // 🔊 START MUSIC HERE
                    if (audioRef.current) {
                        audioRef.current.muted = muted;
                        audioRef.current.play().catch(() => {});
                    }

                    setTimeout(() => {
                        setShowFinal(false);
                        setPhase("slide");
                        runSequence();
                    }, 3000);
                }, 500);
            }
        }, 100);
    };

    /* 🎬 Sequence */
    const runSequence = () => {
        setTimeout(() => setPhase("welcome"), 800);
        setTimeout(() => setPhase("launched"), 3500);
        setTimeout(() => setPhase("tagline"), 6500);
    };

    return (
        <div style={styles.screen}>
            {/* 🎵 AUDIO */}
            <audio ref={audioRef} src="/inaugration.mpeg" loop />

            {/* 🔊 SOUND BUTTON */}
            {phase !== "terminal" && (
                <button
                    onClick={() => {
                        setMuted(!muted);
                        if (audioRef.current) {
                            audioRef.current.muted = !muted;
                        }
                    }}
                    style={styles.soundBtn}
                >
                    {muted ? "🔇" : "🔊"}
                </button>
            )}

            {/* 🎀 Ribbon */}
            {showRibbon && (
                <>
                    <div id="ribbon" onClick={() => setCut(true)}>
                        <div className={`bow ${cut ? "cut" : ""}`}></div>
                        <div className={`ribbon--l ${cut ? "cut" : ""}`}></div>
                        <div className={`ribbon--r ${cut ? "cut" : ""}`}></div>
                    </div>
                    <HiScissors
                        style={{
                            position: "absolute",
                            left: mouse.x - 10,
                            top: mouse.y - 28,
                            
                            zIndex: 1000,
                            pointerEvents: "none",
                        }}
                        size={60}
                        color="white"
                    />
                </>
            )}

            {/* 🖥 TERMINAL */}
            <div
                style={{
                    ...styles.window,
                    transform:
                        phase !== "terminal"
                            ? "translateY(-120vh)"
                            : "translateY(0)",
                    transition: "transform 1s ease-in-out",
                }}
            >
                <div style={styles.topBar}>
                    <div style={styles.buttons}>
                        <span
                            style={{ ...styles.circle, background: "#ff5f56" }}
                        />
                        <span
                            style={{ ...styles.circle, background: "#ffbd2e" }}
                        />
                        <span
                            style={{ ...styles.circle, background: "#27c93f" }}
                        />
                    </div>
                    <div style={styles.title}>cpl@system:~</div>
                </div>

                <div style={styles.terminal}>
                    {!showFinal &&
                        lines.map((line, i) => <div key={i}>{line}</div>)}

                    {!showFinal && !unlocked && bootComplete && (
                        <div style={styles.cursor}>▋ Press Enter</div>
                    )}

                    {!showFinal && unlocked && loading < 100 && (
                        <div>
                            System Load: [{"#".repeat(loading / 5)}
                            {".".repeat(20 - loading / 5)}] {loading}%
                        </div>
                    )}

                    {showFinal && (
                        <div style={styles.finalCenter}>
                            <div style={styles.finalText}>CPL IS LIVE 🚀</div>
                        </div>
                    )}
                </div>
            </div>

            {/* 🎬 FULLSCREEN */}
            {phase !== "terminal" && (
                <div style={styles.fullscreen}>
                    <video
                        src="/final.mp4"
                        autoPlay
                        playsInline
                        muted
                        loop
                        style={styles.bgVideo}
                    />
                    {phase === "welcome" && (
                        <h1 style={styles.bigText}>
                            Welcome to Coding Premier League
                        </h1>
                    )}

                    {phase === "launched" && (
                        <h1 style={styles.bigText}>
                            Event Successfully Launched 🚀
                        </h1>
                    )}

                    {phase === "tagline" && (
                        <>
                            <h1 style={styles.bigText}>
                                Event Successfully Launched 🚀
                            </h1>
                            <p style={styles.tagline}>
                                Build • Compete • Dominate • Innovate
                            </p>
                        </>
                    )}
                </div>
            )}

            {/* CSS unchanged */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        body { margin: 0; cursor: none; font-family: 'Share Tech Mono', monospace; }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes fadeScale { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
        </div>
    );
}

const styles = {
    screen: {
        background: "#0d0d0d57",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    window: {
        width: "80%",
        maxWidth: "1000px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 0 40px rgba(0,255,150,0.2)",
    },

    topBar: {
        background: "#1e1e1e",
        padding: "10px",
        display: "flex",
        alignItems: "center",
    },

    buttons: {
        display: "flex",
        gap: "6px",
        marginRight: "10px",
    },

    circle: {
        width: "12px",
        height: "12px",
        borderRadius: "50%",
    },

    title: {
        color: "#aaa",
        fontSize: "14px",
    },

    terminal: {
        background: "black",
        color: "#00ff9f",
        padding: "20px",
        fontSize: "18px",
        textShadow: "0 0 6px #00ff9f",
        minHeight: "400px",
    },

    cursor: {
        animation: "blink 1s infinite",
    },

    finalCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },

    finalText: {
        fontSize: "40px",
        textShadow: "0 0 20px #00ff9f",
        animation: "fadeScale 1s ease",
    },

    fullscreen: {
        position: "absolute",
        zIndex: 5,
        top: 0,
        width: "100%",
        height: "100%",
        background: "radial-gradient(circle at center, #001a12c7, #000000c4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#00ff9f",
    },

    bgVideo: {
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.2,
        objectFit: "cover",
        top: 0,
        left: 0,
        zIndex: -1, // ✅ PUSH VIDEO TO BACK
    },

    bigText: {
        fontSize: "60px",
        textShadow: "0 0 30px #00ff9f",
        animation: "fadeScale 1s ease",
    },

    tagline: {
        marginTop: "20px",
        fontSize: "22px",
        animation: "fadeUp 1.5s ease forwards",
    },

    soundBtn: {
        position: "absolute",
        top: "20px",
        right: "20px",
        zIndex: 1000,
        fontSize: "24px",
        background: "black",
        color: "#00ff9f",
        border: "1px solid #00ff9f",
        padding: "8px 12px",
        cursor: "pointer",
    },
};
