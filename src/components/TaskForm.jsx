import { useState } from 'react';
import './TaskForm.css';

function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    statut: 'A faire'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.titre.trim()) {
      alert('Le titre est requis');
      return;
    }
    
    const newTask = {
      id: Date.now(),
      titre: formData.titre.trim(),
      description: formData.description.trim(),
      statut: formData.statut
    };
    
    onAddTask(newTask);
    
    setFormData({
      titre: '',
      description: '',
      statut: 'A faire'
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Ajouter une nouvelle tâche</h2>
      
      <div className="form-group">
        <label htmlFor="titre">Titre *</label>
        <input
          type="text"
          id="titre"
          name="titre"
          value={formData.titre}
          onChange={handleChange}
          placeholder="Ex: Développer la page d'accueil"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Description détaillée de la tâche..."
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="statut">Statut</label>
        <select
          id="statut"
          name="statut"
          value={formData.statut}
          onChange={handleChange}
        >
          <option value="A faire">À faire</option>
          <option value="En cours">En cours</option>
          <option value="Termine">Terminé</option>
        </select>
      </div>
      
      <button type="submit" className="submit-btn">
        Ajouter la tâche
      </button>
    </form>
  );
}

export default TaskForm;