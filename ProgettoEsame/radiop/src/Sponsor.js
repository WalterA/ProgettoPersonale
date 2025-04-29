import React from 'react';


const Sponsor = () => {
  return (
    <div className="sponsor-container">
      <div className="row">
        <div className="col sponsor-col">
          <div className="sponsor-divella">
            <h2>Divella</h2>
            <iframe
              src="https://www.divella.it/it/prodotto/biscotti-assortiti"
              width="100%"
              height="400"
              title="Anteprima Divella"
              style={{ border: '1px solid #ccc' }}
            ></iframe>
          </div>
        </div>
        <div className="col sponsor-col">
          <div className="sponsor-saporidellamurgia">
            <h2>Sapori della Murgia</h2>
            <iframe
              src="https://www.saporidellamurgia.com/prodotti/catering/menu-barese-x-20.html"
              width="100%"
              height="400"
              title="Anteprima Sapori della Murgia"
              style={{ border: '1px solid #ccc' }}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsor;
