import React from 'react';

interface InsultButtonProps {
  onClick: () => void;
  isLoading: boolean;
  label: string;
  subLabel: string;
}

const LoadingSpinner: React.FC = () => (
  <div style={{
    width: '2rem',
    height: '2rem',
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderTop: '4px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }} />
);

export const InsultButton: React.FC<InsultButtonProps> = ({ onClick, isLoading, label, subLabel }) => {
  const buttonStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#1a1a1a',
    border: '2px solid #7f1d1d',
    borderRadius: '0.5rem',
    padding: '3rem 1rem',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    opacity: isLoading ? 0.5 : 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: 'bold',
    color: '#ef4444',
    fontSize: '1.5rem',
    margin: 0
  };

  const subLabelStyle: React.CSSProperties = {
    color: '#9ca3af',
    fontSize: '1.125rem',
    margin: '0.5rem 0 0 0'
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      style={buttonStyle}
      onMouseOver={(e) => {
        if (!isLoading) {
          e.currentTarget.style.backgroundColor = 'rgba(127, 29, 29, 0.3)';
        }
      }}
      onMouseOut={(e) => {
        if (!isLoading) {
          e.currentTarget.style.backgroundColor = '#1a1a1a';
        }
      }}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <p style={labelStyle}>{label}</p>
          <p style={subLabelStyle}>{subLabel}</p>
        </div>
      )}
    </button>
  );
};