import React, { useState } from 'react';
import { InsultSettings, DEFAULT_SETTINGS } from '../types';

interface NicknameModalProps {
  onSubmit: (nickname: string, settings: InsultSettings) => void;
  initialSettings: InsultSettings;
}

export const NicknameModal: React.FC<NicknameModalProps> = ({ onSubmit, initialSettings }) => {
  const [nickname, setNickname] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<InsultSettings>(initialSettings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      onSubmit(nickname.trim(), settings);
    }
  };
  
  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isNumeric = type === 'range' || name === 'paragraphCount' || name === 'fontSize';
    setSettings(prev => ({ ...prev, [name]: isNumeric ? Number(value) : value }));
  };
  
  const handleResetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const modalStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '1rem'
  };

  const contentStyle: React.CSSProperties = {
    backgroundColor: '#1a1a1a',
    border: '2px solid #7f1d1d',
    borderRadius: '0.5rem',
    padding: '1.5rem 2rem',
    maxWidth: '28rem',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#374151',
    border: '2px solid #4b5563',
    borderRadius: '0.375rem',
    padding: '0.75rem',
    color: 'white',
    outline: 'none'
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#b91c1c',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.75rem 2rem',
    borderRadius: '0.5rem',
    border: 'none',
    width: '100%',
    fontSize: '1.125rem',
    cursor: 'pointer',
    marginTop: '0.5rem'
  };

  const settingsButtonStyle: React.CSSProperties = {
    backgroundColor: '#4b5563',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.5rem 1.5rem',
    borderRadius: '0.5rem',
    border: 'none',
    width: '100%',
    cursor: 'pointer',
    marginTop: '1.5rem'
  };

  const settingsSectionStyle: React.CSSProperties = {
    marginTop: '1.5rem',
    paddingTop: '1rem',
    borderTop: '2px solid #4b5563',
    textAlign: 'left',
    color: '#d1d5db',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  };

  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#ef4444',
          marginBottom: '1rem'
        }}>
          Cadastro de Fracassado
        </h1>
        
        <p style={{
          color: '#d1d5db',
          marginBottom: '1.5rem'
        }}>
          Para começar sua jornada de auto-humilhação, precisamos de um apelido que resuma sua vergonha. Seja criativo.
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Ex: Baleia Assustada, Mingau Humano"
            style={inputStyle}
            required
          />
          
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#dc2626';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#b91c1c';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Confirmar a Minha Inutilidade
          </button>
        </form>
        
        <button
          onClick={() => setShowSettings(!showSettings)}
          style={settingsButtonStyle}
        >
          {showSettings ? 'Ocultar Configurações' : 'Exibir Configurações'}
        </button>

        {showSettings && (
          <div style={settingsSectionStyle}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#ef4444',
              textAlign: 'center',
              marginBottom: '0.5rem'
            }}>
              Personalize Sua Humilhação
            </h2>
            
            {/* Font Family */}
            <div>
              <label htmlFor="fontFamily" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Fonte do Insulto
              </label>
              <select 
                id="fontFamily" 
                name="fontFamily" 
                value={settings.fontFamily} 
                onChange={handleSettingChange}
                style={inputStyle}
              >
                <option value="'VT323', monospace">Pixel (VT323)</option>
                <option value="'Chakra Petch', sans-serif">Tech (Chakra Petch)</option>
                <option value="sans-serif">Normal (Sans-Serif)</option>
              </select>
            </div>

            {/* Font Color */}
            <div>
              <label htmlFor="fontColor" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Cor da Vergonha
              </label>
              <input 
                type="color" 
                id="fontColor" 
                name="fontColor" 
                value={settings.fontColor} 
                onChange={handleSettingChange} 
                style={{ width: '100%', height: '2.5rem', padding: '0.25rem', backgroundColor: '#374151', border: '1px solid #4b5563', borderRadius: '0.375rem' }}
              />
            </div>

            {/* Font Size */}
            <div>
              <label htmlFor="fontSize" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Tamanho da Humilhação: {settings.fontSize}rem
              </label>
              <input 
                type="range" 
                id="fontSize" 
                name="fontSize" 
                min="1" 
                max="4" 
                step="0.1" 
                value={settings.fontSize} 
                onChange={handleSettingChange} 
                style={{ width: '100%' }}
              />
            </div>

            {/* Letter Spacing */}
            <div>
              <label htmlFor="letterSpacing" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Espaço entre Letras: {settings.letterSpacing}em
              </label>
              <input 
                type="range" 
                id="letterSpacing" 
                name="letterSpacing" 
                min="0" 
                max="0.5" 
                step="0.01" 
                value={settings.letterSpacing} 
                onChange={handleSettingChange} 
                style={{ width: '100%' }}
              />
            </div>

            {/* Word Spacing */}
            <div>
              <label htmlFor="wordSpacing" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Espaço entre Palavras: {settings.wordSpacing}em
              </label>
              <input 
                type="range" 
                id="wordSpacing" 
                name="wordSpacing" 
                min="0" 
                max="1" 
                step="0.05" 
                value={settings.wordSpacing} 
                onChange={handleSettingChange} 
                style={{ width: '100%' }}
              />
            </div>

            {/* Paragraph Count */}
            <div>
              <label htmlFor="paragraphCount" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Nº de Parágrafos da Ofensa: {settings.paragraphCount}
              </label>
              <input 
                type="range" 
                id="paragraphCount" 
                name="paragraphCount" 
                min="1" 
                max="5" 
                step="1" 
                value={settings.paragraphCount} 
                onChange={handleSettingChange} 
                style={{ width: '100%' }}
              />
            </div>

            <button
              onClick={handleResetSettings}
              style={{
                backgroundColor: '#374151',
                color: '#ef4444',
                fontWeight: 'bold',
                padding: '0.5rem 1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #7f1d1d',
                width: '100%',
                cursor: 'pointer',
                marginTop: '0.5rem'
              }}
            >
              Restaurar Padrões
            </button>
          </div>
        )}
      </div>
    </div>
  );
};