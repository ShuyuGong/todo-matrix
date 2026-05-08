import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

const quadrantConfig = {
  'urgent-important': {
    title: '紧急且重要',
    subtitle: '立即做',
    accentColor: '#C9A89A',
    bgColor: '#F0E6E0',
  },
  'urgent-not-important': {
    title: '紧急不重要',
    subtitle: '可以寻求帮助',
    accentColor: '#A8B5C4',
    bgColor: '#E6EBF0',
  },
  'not-urgent-important': {
    title: '重要不紧急',
    subtitle: '计划做',
    accentColor: '#B5C4A8',
    bgColor: '#EBF0E6',
  },
  'not-urgent-not-important': {
    title: '不紧急不重要',
    subtitle: '以后做',
    accentColor: '#C4A8C0',
    bgColor: '#F0E6EF',
  },
};

export default function Quadrant({
  quadrantKey,
  tasks,
  onAddTask,
  onDeleteTask,
  onToggleTask,
  onDropTask,
  onAddSubtask,
  onDeleteSubtask,
  onToggleSubtask,
  draggedTaskId,
}) {
  const config = quadrantConfig[quadrantKey];
  const completedCount = tasks.filter((t) => t.completed).length;
  const isDragOver = draggedTaskId && tasks.every((t) => t.id !== draggedTaskId);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onDropTask(taskId, quadrantKey);
    }
  };

  return (
    <div
      className="quadrant"
      style={{ backgroundColor: config.bgColor }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div
        className="quadrant-header"
        style={{ borderBottomColor: config.accentColor }}
      >
        <div className="quadrant-title-row">
          <div
            className="quadrant-dot"
            style={{ backgroundColor: config.accentColor }}
          />
          <h3 className="quadrant-title">{config.title}</h3>
        </div>
        <div className="quadrant-meta">
          <span className="quadrant-subtitle">{config.subtitle}</span>
          <span className="quadrant-count">
            {completedCount}/{tasks.length}
          </span>
        </div>
      </div>

      <div className={`quadrant-tasks ${isDragOver ? 'drag-over' : ''}`}>
        {tasks.length === 0 ? (
          <div className="quadrant-empty">
            <span>暂无任务</span>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onToggle={onToggleTask}
              onDragStart={(e, id) => {
                e.dataTransfer.setData('text/plain', id);
                e.dataTransfer.effectAllowed = 'move';
              }}
              onAddSubtask={onAddSubtask}
              onDeleteSubtask={onDeleteSubtask}
              onToggleSubtask={onToggleSubtask}
            />
          ))
        )}
      </div>

      <TaskForm onAdd={(text) => onAddTask(quadrantKey, text)} />
    </div>
  );
}
