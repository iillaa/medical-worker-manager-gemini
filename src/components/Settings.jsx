import { useState } from 'react';
import { db } from '../services/db';
import { FaSave, FaLock } from 'react-icons/fa';

export default function Settings({ currentPin, onPinChange }) {
  const [pin, setPin] = useState(currentPin);
  const [msg, setMsg] = useState('');

  const handleSave = async () => {
    if (pin.length !== 4 || isNaN(pin)) {
        setMsg("Le PIN doit être composé de 4 chiffres.");
        return;
    }
    await db.saveSettings({ pin });
    onPinChange(pin);
    setMsg("Paramètres sauvegardés !");
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div>
      <h2 style={{marginBottom:'1.5rem'}}>Paramètres</h2>
      
      <div className="card" style={{maxWidth:'500px'}}>
        <h3 style={{marginTop:0, display:'flex', alignItems:'center', gap:'0.5rem'}}>
            <FaLock /> Sécurité
        </h3>
        <div style={{marginBottom:'1rem'}}>
            <label style={{display:'block', marginBottom:'0.5rem', fontWeight:'500'}}>Code PIN (4 chiffres)</label>
            <input 
                type="text" 
                maxLength="4" 
                value={pin} 
                onChange={(e) => setPin(e.target.value)}
                style={{
                    padding:'0.5rem', 
                    borderRadius:'4px', 
                    border:'1px solid var(--border)', 
                    width:'100%',
                    fontSize:'1.2rem',
                    letterSpacing:'0.2rem',
                    textAlign:'center'
                }}
            />
        </div>
        
        <button className="btn btn-primary" onClick={handleSave}>
            <FaSave /> Enregistrer
        </button>
        
        {msg && <p style={{marginTop:'1rem', color: msg.includes('sauvegardés') ? 'var(--success)' : 'var(--danger)'}}>{msg}</p>}
      </div>
    </div>
  );
}
