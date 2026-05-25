import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './TaskDetail.css';

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTasks = localStorage.getItem('taskflow_data');
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      const foundTask = tasks.find(t => t.id === parseInt(id));
      setTask(foundTask || null);
    }
    setLoading(false);
  }, [id]);

  const getStatusClass = (status) => {
    switch(status) {
      case 'A faire': return 'detail-status-todo';
      case 'En cours': return 'detail-status-progress';
      case 'Termine': return 'detail-status-done';
      default: return '';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'A faire': return '⏰';
      case 'En cours': return '⚙️';
      case 'Termine': return '✅';
      default: return '📋';
    }
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (!task) {
    return (
      <div className="error-container">
        <div className="error-card">
          <h2>❌ Tâche non trouvée</h2>
          <p>La tâche avec l'ID {id} n'existe pas.</p>
          <Link to="/" className="back-button">Retour au tableau de bord</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="task-detail">
      <div className="detail-container">
        <Link to="/" className="back-button">
          ← Retour aux tâches
        </Link>
        
        <div className="detail-card">
          <div className="detail-header">
            <h1>{task.titre}</h1>
            <div className={`detail-status ${getStatusClass(task.statut)}`}>
              {getStatusIcon(task.statut)} {task.statut}
            </div>
          </div>
          
          <div className="detail-info">
            <div className="info-item">
              <label>ID de la tâche :</label>
              <span>#{task.id}</span>
            </div>
            
            <div className="info-item">
              <label>Description :</label>
              <p className="description-text">
                {task.description || "Aucune description fournie pour cette tâche."}
              </p>
            </div>
            
            <div className="info-item">
              <label>Date de création :</label>
              <span>{new Date(task.id).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
          
          <div className="detail-actions">
            <button onClick={() => navigate(-1)} className="action-button back-button-detail">
              ↩️ Retour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;