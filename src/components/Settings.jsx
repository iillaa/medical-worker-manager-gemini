import { useState, useRef } from 'react';
import { db } from '../services/db';
import { FaSave, FaLock, FaDownload, FaUpload } from 'react-icons/fa';

export default function Settings({ currentPin, onPinChange }) {
  const [pin, setPin] = useState(currentPin);
  const [msg, setMsg] = useState('');
  const fileRef = useRef();

  const handleSave = async () => {
    if (pin.length !== 4 || isNaN(pin)) {
      setMsg('Le PIN doit être composé de 4 chiffres.');
      return;
    }
    await db.saveSettings({ pin });
    onPinChange(pin);
    setMsg('Paramètres sauvegardés !');
    setTimeout(() => setMsg(''), 3000);
  };

  const download = (filename, data) => {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportEncrypted = async () => {
    const pw = prompt("Entrez un mot de passe pour chiffrer l'export:");
    if (!pw) return;
    const enc = await db.exportDataEncrypted(pw);
    download('medical-export-encrypted.json', enc);
  };

  const handleExportPlain = async () => {
    const plain = await db.exportData();
    download('medical-export.json', plain);
  };

  const handleImportEncrypted = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const pw = prompt("Entrez le mot de passe pour déchiffrer l'import:");
    if (!pw) return;
    const text = await file.text();
    const ok = await db.importDataEncrypted(text, pw);
    setMsg(ok ? "Données importées (chiffrées)." : "Échec de l'import chiffré");
    setTimeout(() => setMsg(''), 3000);
  };

  const handleImportPlain = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    const ok = await db.importData(text);
    setMsg(ok ? 'Données importées.' : "Échec de l'import");
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Paramètres</h2>

      <div className="card" style={{ maxWidth: '500px' }}>
        <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaLock /> Sécurité
        </h3>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Code PIN (4 chiffres)</label>
          <input
            type="text"
            maxLength="4"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            style={{
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              width: '100%',
              fontSize: '1.2rem',
              letterSpacing: '0.2rem',
              textAlign: 'center'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={handleSave}>
            <FaSave /> Enregistrer
          </button>

          <button className="btn btn-outline" onClick={handleExportPlain} title="Exporter (plain)">
            <FaDownload /> Exporter
          </button>

          <button className="btn btn-outline" onClick={handleExportEncrypted} title="Exporter (chiffré)">
            <FaDownload /> Exporter chiffré
          </button>

          <label className="btn btn-outline" style={{ cursor: 'pointer' }} title="Importer (plain)">
            <FaUpload /> Importer
            <input type="file" ref={fileRef} onChange={handleImportPlain} style={{ display: 'none' }} />
          </label>

          <label className="btn btn-outline" style={{ cursor: 'pointer' }} title="Importer (chiffré)">
            <FaUpload /> Importer chiffré
            <input type="file" onChange={handleImportEncrypted} style={{ display: 'none' }} />
          </label>
        </div>

        <div style={{ marginTop: '1rem' }}>
          {msg && <p style={{ color: msg.includes('import') ? 'var(--success)' : 'var(--danger)' }}>{msg}</p>}
        </div>
      </div>
    </div>
  );
}
