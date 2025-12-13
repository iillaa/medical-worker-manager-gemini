import { useState, useEffect } from 'react';
import { db } from './services/db';
import Dashboard from './components/Dashboard';
import WorkerList from './components/WorkerList';
import WorkerDetail from './components/WorkerDetail'; // We might need this or just modal
import PinLock from './components/PinLock';
import Settings from './components/Settings';
import { FaUserMd, FaUsers, FaChartLine, FaCog } from 'react-icons/fa';

function App() {
  const [view, setView] = useState('dashboard'); // dashboard, workers, settings
  const [loading, setLoading] = useState(true);
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const [isLocked, setIsLocked] = useState(true);
  const [pin, setPin] = useState("0011"); // Default PIN

  const initApp = async () => {
    setLoading(true);
    await db.init();
    const settings = await db.getSettings();
    if (settings.pin) {
        setPin(settings.pin);
    }
    setLoading(false);
  };

  useEffect(() => {
    initApp();
  }, []);

  const navigateToWorker = (id) => {
    setSelectedWorkerId(id);
    setView('worker-detail');
  };

  if (loading) return <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>Chargement...</div>;

  if (isLocked) {
      return <PinLock correctPin={pin} onUnlock={() => setIsLocked(false)} />;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar no-print">
        <div className="brand">
          <FaUserMd size={28} />
          <span>GestMed Travail</span>
        </div>
        
        <nav style={{display:'flex', flexDirection:'column', gap:'0.25rem'}}>
          <div 
            className={`nav-item ${view === 'dashboard' ? 'active' : ''}`}
            onClick={() => setView('dashboard')}
          >
            <FaChartLine /> Tableau de bord
          </div>
          <div 
            className={`nav-item ${view === 'workers' || view === 'worker-detail' ? 'active' : ''}`}
            onClick={() => { setView('workers'); setSelectedWorkerId(null); }}
          >
            <FaUsers /> Travailleurs
          </div>
          <div 
            className={`nav-item ${view === 'settings' ? 'active' : ''}`}
            onClick={() => setView('settings')}
          >
            <FaCog /> Paramètres
          </div>
        </nav>
        
        <div style={{marginTop: 'auto', padding: '1.5rem 1rem', borderTop:'1px solid var(--border)', textAlign: 'center'}}>
           <div style={{fontSize:'0.65rem', textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--text-muted)', marginBottom:'0.25rem'}}>
             Réalisé par
           </div>
           <div style={{fontFamily:'"Times New Roman", serif', fontStyle:'italic', fontWeight:'700', color:'var(--primary)', fontSize:'0.95rem'}}>
             Dr. Kibeche Ali Dia Eddine
           </div>
           <div style={{fontSize:'0.6rem', color:'var(--text-muted)', marginTop:'0.5rem', opacity: 0.7}}>
             v1.0
           </div>
        </div>
      </aside>

      <main className="main-content">
        <div className="container">
          {view === 'dashboard' && (
            <Dashboard onNavigateWorker={navigateToWorker} />
          )}
          {view === 'workers' && (
            <WorkerList onNavigateWorker={navigateToWorker} />
          )}
          {view === 'worker-detail' && selectedWorkerId && (
            <WorkerDetail 
              workerId={selectedWorkerId} 
              onBack={() => setView('workers')} 
            />
          )}
          {view === 'settings' && (
            <Settings currentPin={pin} onPinChange={setPin} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
