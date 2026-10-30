import { Task } from "./types.js";
import React from 'react';

// moved to types.ts id: string; name: string; priority: string; status: string; openItems?: string[]; nextSteps?: string[]; }

const ACTIONS: Record<string, { label: string; next: string; cls?: string }[]> = {
  'pending': [{ label: 'Start', next: 'in-progress' }],
  'in-progress': [{ label: 'Complete', next: 'completed' }, { label: 'Block', next: 'blocked', cls: 'danger' }],
  'blocked': [{ label: 'Unblock', next: 'in-progress' }, { label: 'Cancel', next: 'cancelled', cls: 'secondary' }],
  'completed': [{ label: 'Reopen', next: 'in-progress', cls: 'secondary' }],
  'cancelled': [{ label: 'Reopen', next: 'in-progress', cls: 'secondary' }]
};

export function TaskTile({ task, onOpen, onTransition }: { task: Task; onOpen: (t: Task) => void; onTransition: (id: string, next: any) => void; }): React.ReactElement {
  const actions = ACTIONS[task.status] ?? [];
  return (
    <div className="tile" onClick={() => onOpen(task)}>
      <div className="title">{task.name}</div>
      <div className="meta">
        <span className={`badge priority-${task.priority}`}>{task.priority}</span>
        {task.openItems && task.openItems.length > 0 && <span className="badge" style={{ background: '#7c2d12', color: '#fed7aa' }}>{task.openItems.length} open</span>}
      </div>
      <div className="actions" onClick={e => e.stopPropagation()}>
        {actions.map(a => (
          <button key={a.label} className={a.cls ?? ''} onClick={() => onTransition(task.id, a.next)}>{a.label}</button>
        ))}
        <button className="secondary" onClick={() => onOpen(task)}>Details</button>
      </div>
    </div>
  );
}
