import { useState } from 'react';

export default function TaskCard({
  task,
  onDelete,
  onToggle,
  onDragStart,
  onAddSubtask,
  onDeleteSubtask,
  onToggleSubtask,
}) {
  const [expanded, setExpanded] = useState(false);
  const [subtaskText, setSubtaskText] = useState('');

  const subtasks = task.subtasks || [];
  const hasSubtasks = subtasks.length > 0;

  const handleAddSubtask = (e) => {
    e.preventDefault();
    const trimmed = subtaskText.trim();
    if (!trimmed) return;
    onAddSubtask(task.id, trimmed);
    setSubtaskText('');
  };

  return (
    <div
      className={`task-card ${task.completed ? 'completed' : ''}`}
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      <label className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="checkmark"></span>
      </label>
      <span className="task-text">{task.text}</span>

      {(hasSubtasks || expanded) && (
        <span className="task-badge">{subtasks.length}</span>
      )}

      <button
        className={`task-expand ${expanded ? 'expanded' : ''}`}
        onClick={() => setExpanded(!expanded)}
        aria-label={expanded ? '收起备注' : '展开备注'}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 4.5L6 8.5L10 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        className="task-delete"
        onClick={() => onDelete(task.id)}
        aria-label="删除任务"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {expanded && (
        <div className="task-subtasks" onClick={(e) => e.stopPropagation()}>
          {subtasks.map((sub) => (
            <div
              key={sub.id}
              className={`subtask-item ${sub.completed ? 'completed' : ''}`}
            >
              <button
                className="subtask-dot"
                onClick={() => onToggleSubtask(task.id, sub.id)}
                aria-label={sub.completed ? '标记未完成' : '标记完成'}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <circle
                    cx="5"
                    cy="5"
                    r="4"
                    fill={sub.completed ? 'var(--text-tertiary)' : 'none'}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
              <span className="subtask-text">{sub.text}</span>
              <button
                className="subtask-delete"
                onClick={() => onDeleteSubtask(task.id, sub.id)}
                aria-label="删除备注"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))}
          <form className="subtask-form" onSubmit={handleAddSubtask}>
            <input
              type="text"
              placeholder="添加备注，如：截止 5.10 / 对接人：张经理"
              value={subtaskText}
              onChange={(e) => setSubtaskText(e.target.value)}
            />
          </form>
        </div>
      )}
    </div>
  );
}
