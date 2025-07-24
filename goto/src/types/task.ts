export type Task = {
  id: number;
  title: string;
  description?: string;
  status: 'Done' | 'In Progress' | 'To Do';
  priority: 'Low' | 'Medium' | 'High';
  category: 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';
  createdAt: string;
};

export interface TasksState {
  tasks: Task[];
  nextId: number;
}
