import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

function App() {
  const [stage, setStage] = useState<'countdown' | 'spotlight' | 'curtains' | 'reveal'>('countdown');
  const [countdown, setCountdown] = useState(5);
  const [showRat, setShowRat] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [showCurtains, setShowCurtains] = useState(false);
  const [showSecondSpeech, setShowSecondSpeech] = useState(false);
  const [showRibbonButton, setShowRibbonButton] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);

  useEffect(() => {
    // Countdown stage
    if (stage === 'countdown' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (stage === 'countdown' && countdown === 0) {
      // Move to spotlight stage
      setTimeout(() => {
        setStage('spotlight');
        // Rat enters after stage is set
        setTimeout(() => setShowRat(true), 1000);
        // First speech bubble appears after rat
        setTimeout(() => setShowSpeechBubble(true), 2500);
        // Auto-transition to curtains stage after 5 seconds
        setTimeout(() => {
          setStage('curtains');
          setShowSpeechBubble(false);
          setShowCurtains(true);
          // Second speech bubble appears
          setTimeout(() => setShowSecondSpeech(true), 1000);
          // Ribbon button appears
          setTimeout(() => setShowRibbonButton(true), 2000);
        }, 6000);
      }, 500);
    }
  }, [stage, countdown]);

  const handleContinue = () => {
    setCurtainOpen(true);
    setStage('reveal');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="film-grain"></div>
      </div>

      {/* Countdown Stage */}
      {stage === 'countdown' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="countdown-circle">
              <div className="countdown-glow"></div>
              <div className="countdown-number">
                {countdown || '✨'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spotlight Stage - Dark with spotlight on rat */}
      {stage === 'spotlight' && (
        <>
          <div className="spotlight-stage">
            {/* Spotlight effect */}
            <div className="spotlight-container">
              <div className="spotlight"></div>
              <div className="spotlight-particles">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={`particle particle-${i}`}></div>
                ))}
              </div>
            </div>

            {/* Rat Character */}
            {showRat && (
              <div className="rat-container">
                <img 
                  src="/24889b63-2a23-4c1d-bdeb-c6bc764031e5.png" 
                  alt="Cute rat character" 
                  className="rat-image"
                />
                
                {/* Paw prints trail */}
                <div className="paw-prints">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className={`paw-print paw-print-${i}`}>🐾</div>
                  ))}
                </div>

                {/* First Speech bubble */}
                {showSpeechBubble && (
                  <div className="speech-bubble">
                    <div className="speech-content">
                      <Sparkles className="speech-icon" />
                      <p>Oyee Chuiyaa,</p>
                      <p>Tere liye ek suprise hai ....GAWAR!!!!</p>
                    </div>
                    <div className="speech-tail"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Curtains Stage - Lights on with curtains */}
      {stage === 'curtains' && (
        <>
          {/* Stage background with lights on */}
          <div className="stage-background lights-on">
            <div className="stage-floor"></div>
            
            {/* Spotlight effect - dimmed */}
            <div className="spotlight-container">
              <div className="spotlight dimmed"></div>
              <div className="spotlight-particles">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={`particle particle-${i}`}></div>
                ))}
              </div>
            </div>

            {/* Curtains */}
            {showCurtains && (
              <>
                <div className={`curtain-left ${curtainOpen ? 'curtain-open-left' : ''}`}></div>
                <div className={`curtain-right ${curtainOpen ? 'curtain-open-right' : ''}`}></div>
              </>
            )}
          </div>

          {/* Rat Character */}
          {showRat && (
            <div className="rat-container">
              <img 
                src="/24889b63-2a23-4c1d-bdeb-c6bc764031e5.png" 
                alt="Cute rat character" 
                className="rat-image"
              />

              {/* Second Speech bubble */}
              {showSecondSpeech && (
                <div className="speech-bubble">
                  <div className="speech-content">
                    <Sparkles className="speech-icon" />
                    <p>oyee ....Isse open toh ker</p>
                  </div>
                  <div className="speech-tail"></div>
                </div>
              )}
            </div>
          )}

          {/* Ribbon Button */}
          {showRibbonButton && !curtainOpen && (
            <div className="ribbon-button-container">
              <button 
                onClick={handleContinue}
                className="ribbon-button"
              >
                <span>✨ Open Curtains ✨</span>
              </button>
            </div>
          )}
        </>
      )}

      {/* Reveal Stage - Birthday Card */}
      {stage === 'reveal' && (
        <>
          {/* Stage background with lights on */}
          <div className="stage-background lights-on">
            <div className="stage-floor"></div>
            
            {/* Curtains - opened */}
            <div className="curtain-left curtain-open-left"></div>
            <div className="curtain-right curtain-open-right"></div>
          </div>

          {/* Rat Character - moved up */}
          <div className="rat-container rat-moved-up">
            <img 
              src="/24889b63-2a23-4c1d-bdeb-c6bc764031e5.png" 
              alt="Cute rat character" 
              className="rat-image"
            />
          </div>

          {/* Birthday Card Reveal */}
          <div className="birthday-card">
            <div className="card-content">
              <h1 className="rainbow-text">
                🎊 HAPPY BIRTHDAY! 🎊
              </h1>
              <div className="birthday-message">
                <p>
                  <Heart className="inline mr-2 text-pink-400" />
                  May your special day be filled with wonder, laughter, and all the magic life has to offer!
                </p>
                <p>
                  Here's to another year of adventures, dreams coming true, and moments that make your heart sing! 
                </p>
                <p className="signature">
                  🌟 With love and birthday wishes 🌟
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;