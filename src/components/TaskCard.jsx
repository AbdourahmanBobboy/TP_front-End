import { Link } from 'react-router-dom';
import './TaskCard.css';

function TaskCard({ task }) {
  const getStatusClass = (status) => {
    switch(status) {
      case 'A faire': return 'status-todo';
      case 'En cours': return 'status-progress';
      case 'Termine': return 'status-done';
      default: return '';
    }
  };

  return (
    <Link to={`/task/${task.id}`} className="task-card-link">
      <div className="task-card">
        <h3 className="task-title">{task.titre}</h3>
        <p className="task-description">{task.description}</p>
        <div className={`task-status ${getStatusClass(task.statut)}`}>
          {task.statut}
        </div>
      </div>
    </Link>
  );
}

export default TaskCard;