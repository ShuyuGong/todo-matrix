import { useState, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import MatrixGrid from './components/MatrixGrid';
import './App.css';

const STORAGE_KEY = 'todo-matrix-tasks';

const sampleTasks = [
  {
    id: '1',
    text: '完成项目汇报 PPT',
    quadrant: 'urgent-important',
    completed: false,
    createdAt: Date.now(),
    subtasks: [
      { id: 's1', text: '截止：本周五 18:00', completed: false },
      { id: 's2', text: '对接人：李总监', completed: false },
    ],
  },
  {
    id: '2',
    text: '回复客户邮件',
    quadrant: 'urgent-important',
    completed: true,
    createdAt: Date.now() - 10000,
    subtasks: [],
  },
  {
    id: '3',
    text: '预定下周会议场地',
    quadrant: 'urgent-not-important',
    completed: false,
    createdAt: Date.now() - 20000,
    subtasks: [
      { id: 's3', text: '预算：≤500元/天', completed: false },
    ],
  },
  {
    id: '4',
    text: '学习新技术栈',
    quadrant: 'not-urgent-important',
    completed: false,
    createdAt: Date.now() - 30000,
    subtasks: [],
  },
  {
    id: '5',
    text: '整理桌面文件',
    quadrant: 'not-urgent-not-important',
    completed: false,
    createdAt: Date.now() - 40000,
    subtasks: [],
  },
];

export default function App() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, sampleTasks);
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const handleAddTask = useCallback((quadrant, text) => {
    const newTask = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      text,
      quadrant,
      completed: false,
      createdAt: Date.now(),
      subtasks: [],
    };
    setTasks((prev) => [...prev, newTask]);
  }, [setTasks]);

  const handleDeleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, [setTasks]);

  const handleToggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, [setTasks]);

  const handleDropTask = useCallback(
    (taskId, newQuadrant) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, quadrant: newQuadrant } : t))
      );
      setDraggedTaskId(null);
    },
    [setTasks]
  );

  const handleAddSubtask = useCallback((taskId, text) => {
    const newSubtask = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      text,
      completed: false,
    };
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, subtasks: [...(t.subtasks || []), newSubtask] } : t
      )
    );
  }, [setTasks]);

  const handleDeleteSubtask = useCallback((taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, subtasks: (t.subtasks || []).filter((s) => s.id !== subtaskId) }
          : t
      )
    );
  }, [setTasks]);

  const handleToggleSubtask = useCallback((taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              subtasks: (t.subtasks || []).map((s) =>
                s.id === subtaskId ? { ...s, completed: !s.completed } : s
              ),
            }
          : t
      )
    );
  }, [setTasks]);

  return (
    <div className="app">
      <MatrixGrid
        tasks={tasks}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onToggleTask={handleToggleTask}
        onDropTask={handleDropTask}
        onAddSubtask={handleAddSubtask}
        onDeleteSubtask={handleDeleteSubtask}
        onToggleSubtask={handleToggleSubtask}
        draggedTaskId={draggedTaskId}
      />
    </div>
  );
}
