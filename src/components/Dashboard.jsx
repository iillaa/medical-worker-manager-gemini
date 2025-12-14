import { useState, useEffect } from 'react';
import { db } from '../services/db';
import { logic } from '../services/logic';
import { FaChevronRight, FaClipboardList, FaExclamationTriangle, FaMicroscope, FaMoon, FaSun } from 'react-icons/fa';

export default function Dashboard({ onNavigateWorker, theme = 'dark', onThemeChange }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    const workers = await db.getWorkers();
    const exams = await db.getExams();
    const computed = logic.getDashboardStats(workers, exams);
    setStats(computed);
    setLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  const toggleTheme = () => {
    if (onThemeChange) {
      onThemeChange(theme === 'dark' ? 'light' : 'dark');
    }
  };

  if (loading) return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '60vh',
      gap: '1rem'
    }}>
      <div className="loading-spinner"></div>
      <div style={{color: 'var(--text-muted)', fontWeight: 600}}>Chargement des données...</div>
      <div style={{
        width: '200px',
        height: '4px',
        backgroundColor: 'var(--bg-app)',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'var(--primary)',
          animation: 'shimmer 1.5s infinite'
        }}></div>
      </div>
    </div>
  );

  return (
    <div>
      <header style={{marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <h2>Tableau de bord</h2>
          <p>Aperçu de la situation médicale.</p>
        </div>
        
        {/* Theme Toggle Button */}
        {onThemeChange && (
          <button 
            className="btn btn-sm btn-outline"
            onClick={toggleTheme}
            style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}
          >
            {theme === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
            {theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}
          </button>
        )}
      </header>
      
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2.5rem'}}>

        {/* Due Soon - Orange/Yellow with appropriate theme colors */}
        <div className="card" style={{
          display:'flex', 
          justifyContent:'space-between', 
          alignItems:'center', 
          background: theme === 'dark' ? 'var(--warning-light)' : 'var(--warning-light)', 
          padding: '1.5rem'
        }}>
          <div>
            <h3 className="stat-card-title" style={{color:'var(--warning-text)'}}>À faire (15 jours)</h3>
            <div className="stat-card-value" style={{color:'var(--warning-border)'}}>{stats.dueSoon.length}</div>
            <p style={{margin:0, fontWeight:600, color:'var(--warning-text)'}}>Travailleurs</p>
          </div>
          <div style={{opacity: 0.8}}>
             <FaClipboardList size={60} color="var(--warning-border)" />
          </div>
        </div>
        
        {/* Overdue - Red with appropriate theme colors */}
        <div className="card" style={{
          display:'flex', 
          justifyContent:'space-between', 
          alignItems:'center', 
          background: theme === 'dark' ? 'var(--danger-light)' : 'var(--danger-light)', 
          padding: '1.5rem'
        }}>
          <div>
            <h3 className="stat-card-title" style={{color:'var(--danger-text)'}}>En Retard</h3>
            <div className="stat-card-value" style={{color:'var(--danger-border)'}}>{stats.overdue.length}</div>
            <p style={{margin:0, fontWeight:600, color:'var(--danger-text)'}}>Travailleurs</p>
          </div>
          <div style={{opacity: 0.8}}>
             <FaExclamationTriangle size={60} color="var(--danger-border)" />
          </div>
        </div>

        {/* Positive Cases - Purple with appropriate theme colors */}
        <div className="card" style={{
          display:'flex', 
          justifyContent:'space-between', 
          alignItems:'center', 
          background: theme === 'dark' ? 'var(--primary-light)' : 'var(--primary-light)', 
          padding: '1.5rem'
        }}>
          <div>
            <h3 className="stat-card-title" style={{color:'var(--primary)'}}>Suivi Médical</h3>
            <div className="stat-card-value" style={{color:'var(--primary)'}}>{stats.activePositive.length}</div>
            <p style={{margin:0, fontWeight:600, color:'var(--primary)'}}>Cas actifs</p>
          </div>
          <div style={{opacity: 0.8}}>
             <FaMicroscope size={60} color="var(--primary)" />
          </div>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem'}}>

        {/* Urgent List */}
        <div className="card" style={{padding:0, overflow:'hidden'}}>
          <div style={{
            padding:'1.5rem', 
            borderBottom:'var(--border-width) solid var(--border-color)', 
            background:'var(--surface)'
          }}>
            <h3 style={{marginBottom:0, color:'var(--text-main)'}}>Examens à prévoir</h3>
          </div>
          
          {stats.dueSoon.length === 0 && stats.overdue.length === 0 ? (
            <div style={{padding:'2rem', textAlign:'center', color:'var(--text-muted)'}}>Rien à signaler.</div>
          ) : (
            <div className="table-container" style={{border:'none', boxShadow:'none', borderRadius:0}}>
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Date Prévue</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>

                  {stats.overdue.map(w => (
                    <tr key={w.id} className="overdue-worker-row">
                      <td>
                        <div style={{fontWeight:700}}>{w.full_name}</div>
                        <span className="badge badge-red" style={{marginTop:'0.25rem'}}>En Retard</span>
                      </td>
                      <td>{w.next_exam_due}</td>
                      <td style={{textAlign:'right'}}>
                        <button className="btn btn-sm btn-outline" onClick={() => onNavigateWorker(w.id)}>
                           Voir <FaChevronRight size={10} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {stats.dueSoon.map(w => (
                    <tr key={w.id}>
                      <td style={{fontWeight:600}}>{w.full_name}</td>
                      <td>{w.next_exam_due}</td>
                      <td style={{textAlign:'right'}}>
                        <button className="btn btn-sm btn-outline" onClick={() => onNavigateWorker(w.id)}>
                           Voir <FaChevronRight size={10} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Re-tests */}
        <div className="card" style={{padding:0, overflow:'hidden'}}>
          <div style={{
            padding:'1.5rem', 
            borderBottom:'var(--border-width) solid var(--border-color)', 
            background:'var(--surface)'
          }}>
            <h3 style={{marginBottom:0, color:'var(--text-main)'}}>Contre-visites</h3>
          </div>
          
          {stats.retests.length === 0 ? (
             <div style={{padding:'2rem', textAlign:'center', color:'var(--text-muted)'}}>Aucune contre-visite prévue.</div>
          ) : (
            <div className="table-container" style={{border:'none', boxShadow:'none', borderRadius:0}}>
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Date Prévue</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {stats.retests.map(item => (
                    <tr key={item.worker.id}>
                      <td style={{fontWeight:600}}>{item.worker.full_name}</td>
                      <td>{logic.formatDate(new Date(item.date))}</td>
                      <td style={{textAlign:'right'}}>
                        <button className="btn btn-sm btn-outline" onClick={() => onNavigateWorker(item.worker.id)}>
                           Ouvrir <FaChevronRight size={10} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
