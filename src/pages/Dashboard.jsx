import { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import './Dashboard.css';

function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('taskflow_data');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [
      {
        id: 1,
        titre: "Conception de l'ontologie",
        description: "Rédiger les axiomes de base du domaine.",
        statut: "A faire"
      },
      {
        id: 2,
        titre: "Développement du composant Dashboard",
        description: "Créer l'interface principale avec les cartes de tâches",
        statut: "En cours"
      },
      {
        id: 3,
        titre: "Documentation du projet",
        description: "Rédiger le README et la documentation technique",
        statut: "Termine"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('taskflow_data', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const getTaskStats = () => {
    const stats = {
      total: tasks.length,
      todo: tasks.filter(t => t.statut === 'A faire').length,
      progress: tasks.filter(t => t.statut === 'En cours').length,
      done: tasks.filter(t => t.statut === 'Termine').length
    };
    return stats;
  };

  const stats = getTaskStats();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Tableau de bord</h1>
        <div className="stats-container">
          <div className="stat-card">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card status-todo">
            <span className="stat-value">{stats.todo}</span>
            <span className="stat-label">À faire</span>
          </div>
          <div className="stat-card status-progress">
            <span className="stat-value">{stats.progress}</span>
            <span className="stat-label">En cours</span>
          </div>
          <div className="stat-card status-done">
            <span className="stat-value">{stats.done}</span>
            <span className="stat-label">Terminé</span>
          </div>
        </div>
      </div>

      <TaskForm onAddTask={handleAddTask} />

      <div className="tasks-section">
        <h2>Liste des tâches</h2>
        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>Aucune tâche pour le moment. Ajoutez-en une !</p>
          </div>
        ) : (
          <div className="tasks-list">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;