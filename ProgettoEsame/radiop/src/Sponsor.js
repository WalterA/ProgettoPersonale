import React from 'react';

const Sponsor = () => {
  const containerStyle = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '32px',
    color: '#374151',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '32px',
    marginBottom: '32px',
  };

  const cardStyle = {
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'box-shadow 0.3s ease',
  };

  const divellaCardStyle = {
    ...cardStyle,
    background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
  };

  const murgiaCardStyle = {
    ...cardStyle,
    background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>I Nostri Sponsor</h1>
      
      <div style={gridStyle}>
        {/* Banner Divella */}
        <div style={divellaCardStyle}>
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9a3412' }}>Divella</h2>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                backgroundColor: '#fed7aa', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ea580c' }}>D</span>
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              padding: '16px', 
              marginBottom: '16px', 
              boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)' 
            }}>
              <h3 style={{ fontWeight: '600', fontSize: '1.125rem', marginBottom: '8px', color: '#374151' }}>
                Biscotti Assortiti Premium
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '12px' }}>
                Scopri la nostra selezione di biscotti artigianali, 
                perfetti per ogni momento della giornata.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#ea580c', fontWeight: 'bold', fontSize: '1.125rem' }}>€12.99</span>
                <span style={{ 
                  backgroundColor: '#dcfce7', 
                  color: '#16a34a', 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}>
                  Disponibile
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => window.open('https://www.divella.it/it/prodotto/biscotti-assortiti', '_blank')}
              style={{
                width: '100%',
                backgroundColor: '#f97316',
                color: 'white',
                fontWeight: '600',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#ea580c'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#f97316'}
            >
              <span>Visita il Sito</span>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        </div>

        {/* Banner Sapori della Murgia */}
        <div style={murgiaCardStyle}>
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#065f46' }}>Sapori della Murgia</h2>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                backgroundColor: '#bbf7d0', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <span style={{ fontSize: '1.5rem' }}>🌿</span>
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              padding: '16px', 
              marginBottom: '16px', 
              boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)' 
            }}>
              <h3 style={{ fontWeight: '600', fontSize: '1.125rem', marginBottom: '8px', color: '#374151' }}>
                Menù Barese per 20 Persone
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '12px' }}>
                Catering tradizionale pugliese con specialità locali 
                e ingredienti freschi della Murgia.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#059669', fontWeight: 'bold', fontSize: '1.125rem' }}>€280.00</span>
                <span style={{ 
                  backgroundColor: '#dbeafe', 
                  color: '#2563eb', 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}>
                  Su Ordinazione
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => window.open('https://www.saporidellamurgia.com/prodotti/catering/menu-barese-x-20.html', '_blank')}
              style={{
                width: '100%',
                backgroundColor: '#10b981',
                color: 'white',
                fontWeight: '600',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
            >
              <span>Scopri il Menù</span>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Banner aggiuntivo orizzontale */}
      <div style={{
        background: 'linear-gradient(90deg, #f3e8ff 0%, #fdf2f8 50%, #fef2f2 100%)',
        borderRadius: '12px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        padding: '24px'
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: '16px' 
        }}>
          <div style={{ textAlign: window.innerWidth < 768 ? 'center' : 'left' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>
              Partnership Esclusiva
            </h3>
            <p style={{ color: '#6b7280' }}>
              Prodotti di qualità selezionati dai migliori fornitori locali
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                backgroundColor: '#fed7aa', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '4px' 
              }}>
                <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#ea580c' }}>D</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Divella</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                backgroundColor: '#bbf7d0', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '4px' 
              }}>
                <span style={{ fontSize: '1.125rem' }}>🌿</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Sapori</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsor;