import React from 'react';
import Terms from './Terms';
import style from './App.module.css';
import rick from './img/rick.jpg';

const img = <img src={rick} alt="Rick" />

function App() {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 className={style.header}>
          Urban Ricktionary
          <span className={style.flashText}>
            New!
          </span>
        </h1>

        <div className={style.wrapper} style={{ marginLeft: 'auto' }}>
          <div className={style.spinner}>
            <div>
              <div className={style.face1}>{img}</div>
              <div className={style.face2}>{img}</div>
              <div className={style.face3}>{img}</div>
              <div className={style.face4}>{img}</div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <Terms />
    </>
  );
}

export default App;
