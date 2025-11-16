import React, { useState, useEffect, useCallback } from 'react';
import { InsultType, InsultSettings, DEFAULT_SETTINGS } from './types';
import { generateInsult } from './services/geminiService';
import { DisclaimerModal } from './components/DisclaimerModal';
import { NicknameModal } from './components/NicknameModal';
import { InsultButton } from './components/InsultButton';

const DEFAULT_INSULT = "O Espelho do Seu Fracasso Está Esperando!\nClique no Botão!\nVeja o Quão Patético Você É!";

const App: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [settings, setSettings] = useState<InsultSettings>(DEFAULT_SETTINGS);
  const [insult, setInsult] = useState<string>(DEFAULT_INSULT);
  const [loadingType, setLoadingType] = useState<InsultType | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);
  const [showNicknameModal, setShowNicknameModal] = useState<boolean>(false);

  useEffect(() => {
    const registered = localStorage.getItem('isRegistered');
    const storedNickname = localStorage.getItem('nickname');
    const storedStartDate = localStorage.getItem('startDate');
    const storedSettings = localStorage.getItem('insultSettings');

    if (storedSettings) {
      try {
        setSettings(JSON.parse(storedSettings));
      } catch (e) {
        console.error("Failed to parse settings, using default.", e);
        setSettings(DEFAULT_SETTINGS);
      }
    }

    if (registered === 'true' && storedNickname && storedStartDate) {
      setIsRegistered(true);
      setNickname(storedNickname);
      setStartDate(storedStartDate);
    } else {
      setShowDisclaimer(true);
    }
  }, []);

  const handleAcceptDisclaimer = () => {
    setShowDisclaimer(false);
    setShowNicknameModal(true);
  };

  const handleSetNickname = (name: string, newSettings: InsultSettings) => {
    const today = new Date().toISOString();
    localStorage.setItem('isRegistered', 'true');
    localStorage.setItem('nickname', name);
    localStorage.setItem('startDate', today);
    localStorage.setItem('insultSettings', JSON.stringify(newSettings));
    setNickname(name);
    setStartDate(today);
    setSettings(newSettings);
    setIsRegistered(true);
    setShowNicknameModal(false);
  };

  const resetApp = () => {
    localStorage.removeItem('isRegistered');
    localStorage.removeItem('nickname');
    localStorage.removeItem('startDate');
    
    setIsRegistered(false);
    setNickname('');
    setStartDate(null);
    setInsult(DEFAULT_INSULT);
    setShowDisclaimer(true);
  };

  const handleGenerateInsult = useCallback(async (type: InsultType) => {
    if (!nickname || !startDate || loadingType) return;

    setLoadingType(type);
    setInsult('Gerando seu atestado de inutilidade...');

    let timeElapsed = '';
    const start = new Date(startDate);
    const today = new Date();

    switch (type) {
      case InsultType.Daily:
        const days = ['Domingo, o dia da preguiça sagrada', 'Segunda-feira, o início do seu sofrimento', 'Terça-feira, o dia mais inútil', 'Quarta-feira, o pico da sua mediocridade', 'Quinta-feira, a pré-desculpa', 'Sexta-feira, dia de encher o bucho', 'Sábado, o sofá te chama'];
        timeElapsed = days[today.getDay()];
        break;
      case InsultType.Weekly:
        const diffTimeW = Math.abs(today.getTime() - start.getTime());
        const diffWeeks = Math.floor(diffTimeW / (1000 * 60 * 60 * 24 * 7)) + 1;
        timeElapsed = diffWeeks.toString();
        break;
      case InsultType.Monthly:
        let diffMonths = (today.getFullYear() - start.getFullYear()) * 12;
        diffMonths -= start.getMonth();
        diffMonths += today.getMonth();
        timeElapsed = (diffMonths <= 0 ? 1 : diffMonths + 1).toString();
        break;
      case InsultType.Annual:
        const diffYears = today.getFullYear() - start.getFullYear() + 1;
        timeElapsed = diffYears.toString();
        break;
    }

    const newInsult = await generateInsult(type, nickname, timeElapsed, settings.paragraphCount);
    setInsult(newInsult);
    setLoadingType(null);
  }, [nickname, startDate, loadingType, settings]);
  
  const getPeriod = (periodType: 'week' | 'month' | 'year'): number => {
      if (!startDate) return 1;
      const start = new Date(startDate);
      const today = new Date();
      
      switch(periodType){
          case 'week':
            const diffTimeW = Math.abs(today.getTime() - start.getTime());
            return Math.floor(diffTimeW / (1000 * 60 * 60 * 24 * 7)) + 1;
          case 'month':
            let diffMonths = (today.getFullYear() - start.getFullYear()) * 12;
            diffMonths -= start.getMonth();
            diffMonths += today.getMonth();
            return diffMonths <= 0 ? 1 : diffMonths + 1;
          case 'year':
            return today.getFullYear() - start.getFullYear() + 1;
      }
  }

  if (!isRegistered) {
    if (showDisclaimer) return <DisclaimerModal onAccept={handleAcceptDisclaimer} />;
    if (showNicknameModal) return <NicknameModal onSubmit={handleSetNickname} initialSettings={settings} />;
    return null;
  }

  const insultStyle: React.CSSProperties = {
    fontFamily: settings.fontFamily,
    fontSize: `${settings.fontSize}rem`,
    color: settings.fontColor,
    letterSpacing: `${settings.letterSpacing}em`,
    wordSpacing: `${settings.wordSpacing}em`,
    lineHeight: settings.fontSize > 2.5 ? '1.2' : 'normal',
  };

  const appStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: 'black',
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/cracks.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '1rem'
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '72rem',
    margin: '0 auto'
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '1rem'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#b91c1c',
    textShadow: '0 0 10px rgba(255, 0, 0, 0.6)',
    marginBottom: '0.5rem'
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    color: '#9ca3af',
    marginTop: '0.5rem'
  };

  const insultContainerStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    border: '2px dashed #4b5563',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    minHeight: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem',
    backdropFilter: 'blur(10px)'
  };

  const defaultInsultStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    color: '#ef4444',
    textAlign: 'center'
  };

  const buttonsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1rem'
  };

  const resetButtonStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    backgroundColor: 'rgba(127, 29, 29, 0.5)',
    border: '1px solid #b91c1c',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    color: 'white',
    cursor: 'pointer',
    marginBottom: '2rem'
  };

  return (
    <div style={appStyle}>
      <div style={containerStyle}>
        <header style={headerStyle}>
          <h1 style={titleStyle}>Fundo do Poço Fitness</h1>
          <p style={subtitleStyle}>
            Bem-vindo ao seu pior pesadelo, <span style={{color: '#ef4444', fontWeight: 'bold'}}>{nickname}</span>!
          </p>
        </header>
        
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '2rem'}}>
          <button onClick={resetApp} style={resetButtonStyle}>
            Resetar
          </button>
        </div>

        <main>
          <div style={insultContainerStyle}>
            {insult === DEFAULT_INSULT ? (
              <div style={defaultInsultStyle}>
                <p>O Espelho do Seu Fracasso Está Esperando!</p>
                <p style={{animation: 'blink 1s infinite'}}>Clique no Botão!</p>
                <p>Veja o Quão Patético Você É!</p>
              </div>
            ) : (
              <p style={{...insultStyle, textAlign: 'center', whiteSpace: 'pre-wrap'}}>
                {insult}
              </p>
            )}
          </div>

          <div style={buttonsGridStyle}>
            <InsultButton
              label="O Mijão Do Dia"
              subLabel="Sua Dose Diária De Nojo."
              isLoading={loadingType === InsultType.Daily}
              onClick={() => handleGenerateInsult(InsultType.Daily)}
            />
            <InsultButton
              label="Relatório De Bosta Semanal"
              subLabel={`Revendo Sua ${getPeriod('week')}ª Semana De Fracasso.`}
              isLoading={loadingType === InsultType.Weekly}
              onClick={() => handleGenerateInsult(InsultType.Weekly)}
            />
            <InsultButton
              label="Fracasso Mensal"
              subLabel={`Seu ${getPeriod('month')}º Mês De Vergonha.`}
              isLoading={loadingType === InsultType.Monthly}
              onClick={() => handleGenerateInsult(InsultType.Monthly)}
            />
            <InsultButton
              label="Lixo Anual"
              subLabel={`Seu ${getPeriod('year')}º Ano No Poço.`}
              isLoading={loadingType === InsultType.Annual}
              onClick={() => handleGenerateInsult(InsultType.Annual)}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;