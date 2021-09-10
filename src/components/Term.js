import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { Fieldset } from '@react95/core'
import { Hourglass } from 'react95';
import { useBonzi } from './agents/Bonzi';
import { useClippy } from './agents/Clippy';
import bonziImage from '../img/bonzi.png';

const Terms = (props) => {
  const { term } = props;

  const [loading, setLoading] = useState(false);
  const bonzi = useBonzi();
  const clippy = useClippy();

  const speak = useCallback(() => {
    setLoading(true);

    // Load bonzi
    clippy.hide();
    bonzi.show();
    
    // Request voice
    axios.get('/api/bonzi', { responseType: 'blob', params: { text: term.example } })
      .then((response) => {
        const audio = new Audio(window.URL.createObjectURL(response.data));
        audio.preload = 'metadata';
        audio.addEventListener('ended', () => {
          bonzi.hide();
          
          setTimeout(() => {
            clippy.show();
          }, 2000);
        });
        audio.play();
        bonzi.speak(term.example);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });    
  }, [term, bonzi, clippy]);

  return (
    <Fieldset key={term._id} legend={term.word} style={{ margin: '1.5rem 0' }}>
      <div style={{ marginBottom: '1rem' }}>{term.definition}</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flexGrow: 1 }}>
          <em>{term.example}</em>
        </div>
        <div style={{ flexShrink: 1, marginLeft: 15, alignSelf: 'flex-end' }}>
          {
            loading ? (
              <Hourglass size={28.5} />
            ) : (
              <div onClick={speak} style={{ cursor: 'pointer' }}>
                <img width={25} src={bonziImage} alt="Bonzi Speak" />
              </div>
            )
          }
        </div>
      </div>
    </Fieldset>
  );
};

export default Terms;