import React from 'react';

interface DisclaimerModalProps {
  onAccept: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ onAccept }) => {
  const modalStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
    maxWidth: '48rem',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)'
  };

  const warningStyle: React.CSSProperties = {
    backgroundColor: 'rgba(127, 29, 29, 0.3)',
    border: '1px solid #b91c1c',
    borderRadius: '0.5rem',
    padding: '1rem',
    margin: '2rem 0'
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#b91c1c',
    color: 'white',
    fontWeight: 'bold',
    padding: '2rem 1.5rem',
    borderRadius: '0.5rem',
    border: 'none',
    width: '100%',
    fontSize: '1.5rem',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(220, 38, 38, 0.5)',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#ef4444',
          marginBottom: '1.5rem',
          textShadow: '0 0 8px rgba(255, 0, 0, 0.5)'
        }}>
          AVISO IMPORTANTE!
        </h1>
        
        <p style={{
          color: '#d1d5db',
          marginBottom: '1.5rem',
          fontSize: '1.125rem',
          lineHeight: '1.6'
        }}>
          Este aplicativo foi projetado para ser agressivo, ofensivo e humilhante. O conteúdo é intencionalmente grosseiro e pode ser considerado humor negro por alguns. Não é para os fracos de coração.
        </p>
        
        <div style={warningStyle}>
          <p style={{
            color: '#fcd34d',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            lineHeight: '1.8'
          }}>
            Se você tem problemas de autoestima, depressão, transtornos alimentares ou qualquer outra condição de saúde mental,{' '}
            <strong style={{
              color: '#ef4444',
              textTransform: 'uppercase',
              fontSize: '1.5rem',
              display: 'block',
              marginTop: '0.5rem'
            }}>
              NÃO USE ESTE APP.
            </strong>
          </p>
        </div>
        
        <p style={{
          color: '#9ca3af',
          marginBottom: '2rem'
        }}>
          Ao continuar, você confirma que entende a natureza deste aplicativo, concorda com os termos de ser verbalmente destruído e assume total responsabilidade por sua experiência.
        </p>
        
        <button
          onClick={onAccept}
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
          Entendo Perfeitamente o Conteúdo e Assumo os Riscos da Humilhação
        </button>
      </div>
    </div>
  );
};