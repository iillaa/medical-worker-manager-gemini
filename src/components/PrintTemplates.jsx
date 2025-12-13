import React from 'react';
import { format } from 'date-fns';

export default function PrintTemplates({ type, data }) {
  if (!data) return null;

  return (
    <div className="printable-area">
      {type === 'convocation' && <Convocation worker={data} />}
      {type === 'certificate' && <Certificate worker={data.worker} exam={data.exam} />}
    </div>
  );
}

function Convocation({ worker }) {
  const today = format(new Date(), 'dd/MM/yyyy');
  
  return (
    <div className="print-template">
       <div className="print-header">
         <h2>SERVICE DE SANTÉ AU TRAVAIL</h2>
         <p>Convocations / Visites Médicales</p>
       </div>

       <div style={{textAlign:'right', margin:'1cm 0'}}>
         Le {today}
       </div>

       <div className="print-title">CONVOCATION</div>

       <div className="print-body">
         <p>Monsieur/Madame <strong>{worker.full_name}</strong>,</p>
         <p>Matricule: <strong>{worker.national_id}</strong></p>
         <p>Poste: <strong>{worker.job_role}</strong></p>
         
         <p style={{marginTop:'1cm'}}>
           Vous êtes prié(e) de vous présenter au Service Médical pour votre visite médicale périodique obligatoire.
         </p>

         <p>
           <strong>Date limite:</strong> {worker.next_exam_due}
         </p>

         <p style={{marginTop:'1cm'}}>
           Veuillez vous munir de votre carnet de santé (si applicable).
         </p>
       </div>

       <div className="print-footer">
         <div>
           <p>Le Responsable RH</p>
         </div>
         <div>
           <p>Le Médecin du Travail</p>
         </div>
       </div>
    </div>
  );
}

function Certificate({ worker, exam }) {
  const today = format(new Date(), 'dd/MM/yyyy');
  const resultDate = exam?.lab_result?.date || today;

  return (
    <div className="print-template">
       <div className="print-header">
         <h2>SERVICE DE SANTÉ AU TRAVAIL</h2>
         <p>Certificat d'Aptitude</p>
       </div>

       <div style={{textAlign:'right', margin:'1cm 0'}}>
         Fait à [Ville], le {today}
       </div>

       <div className="print-title">CERTIFICAT D'APTITUDE MÉDICALE</div>

       <div className="print-body">
         <p>Je soussigné, Docteur <strong>{exam?.physician_name || '....................'}</strong>, Médecin du travail,</p>
         
         <p>Certifie avoir examiné ce jour:</p>
         
         <div style={{marginLeft:'1cm', margin:'1cm 0', border:'1px solid #ccc', padding:'0.5cm'}}>
            <p>Nom et Prénom: <strong>{worker.full_name}</strong></p>
            <p>Matricule: <strong>{worker.national_id}</strong></p>
            <p>Poste de travail: <strong>{worker.job_role}</strong></p>
         </div>

         <p>
           Et déclare que l'intéressé(e) est reconnu(e):
         </p>

         <h3 style={{textAlign:'center', fontSize:'1.5rem', margin:'1cm 0'}}>
           APTE
         </h3>

         <p>
           À exercer sa fonction de manipulateur de denrées alimentaires (Cuisine/Restauration).
         </p>
         
         <p style={{fontSize:'0.9rem', color:'#666'}}>
           * Vu le résultat négatif de l'examen copro-parasitologique du {resultDate}.
         </p>
         
         <p>
           Prochaine visite avant le: <strong>{worker.next_exam_due}</strong>
         </p>
       </div>

       <div className="print-footer">
         <div style={{textAlign:'center', width:'100%'}}>
           <p>Cachet et Signature du Médecin</p>
           <br /><br /><br />
         </div>
       </div>
    </div>
  );
}
