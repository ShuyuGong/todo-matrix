import Quadrant from './Quadrant';

export default function MatrixGrid({
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
  const getTasks = (key) => tasks.filter((t) => t.quadrant === key);

  return (
    <div className="matrix-container">
      <header className="page-header">
        <h1>待办矩阵</h1>
      </header>

      <div className="matrix-grid">
        <Quadrant
          quadrantKey="urgent-important"
          tasks={getTasks('urgent-important')}
          onAddTask={onAddTask}
          onDeleteTask={onDeleteTask}
          onToggleTask={onToggleTask}
          onDropTask={onDropTask}
          onAddSubtask={onAddSubtask}
          onDeleteSubtask={onDeleteSubtask}
          onToggleSubtask={onToggleSubtask}
          draggedTaskId={draggedTaskId}
        />
        <Quadrant
          quadrantKey="not-urgent-important"
          tasks={getTasks('not-urgent-important')}
          onAddTask={onAddTask}
          onDeleteTask={onDeleteTask}
          onToggleTask={onToggleTask}
          onDropTask={onDropTask}
          onAddSubtask={onAddSubtask}
          onDeleteSubtask={onDeleteSubtask}
          onToggleSubtask={onToggleSubtask}
          draggedTaskId={draggedTaskId}
        />
        <Quadrant
          quadrantKey="urgent-not-important"
          tasks={getTasks('urgent-not-important')}
          onAddTask={onAddTask}
          onDeleteTask={onDeleteTask}
          onToggleTask={onToggleTask}
          onDropTask={onDropTask}
          onAddSubtask={onAddSubtask}
          onDeleteSubtask={onDeleteSubtask}
          onToggleSubtask={onToggleSubtask}
          draggedTaskId={draggedTaskId}
        />
        <Quadrant
          quadrantKey="not-urgent-not-important"
          tasks={getTasks('not-urgent-not-important')}
          onAddTask={onAddTask}
          onDeleteTask={onDeleteTask}
          onToggleTask={onToggleTask}
          onDropTask={onDropTask}
          onAddSubtask={onAddSubtask}
          onDeleteSubtask={onDeleteSubtask}
          onToggleSubtask={onToggleSubtask}
          draggedTaskId={draggedTaskId}
        />
      </div>
    </div>
  );
}
