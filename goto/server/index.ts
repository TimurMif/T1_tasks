import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'Done' | 'In Progress' | 'To Do';
  priority: 'Low' | 'Medium' | 'High';
  category: 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';
  createdAt: string;
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

let tasks: Task[] = [];
let nextId = 1;

// Получение всех задач
app.get('/api/tasks', (req: Request, res: Response) => {
  res.json(tasks);
});

// Поиск задач по названию и дате
app.get('/api/tasks/search', (req: Request, res: Response) => {
  const { title, date } = req.query;
  
  let result = tasks;
  
  if (title) {
    result = result.filter(task => 
      task.title.toLowerCase().includes(title.toString().toLowerCase())
    );
  }
  
  if (date) {
    result = result.filter(task => 
      new Date(task.createdAt).toDateString() === new Date(date.toString()).toDateString()
    );
  }
  
  res.json(result);
});

// Создание задачи
app.post('/api/tasks', (req: Request, res: Response) => {
  const task: Task = {
    id: nextId++,
    createdAt: new Date().toISOString(),
    ...req.body
  };
  
  tasks.push(task);
  res.status(201).json(task);
});

// Обновление задачи
app.put('/api/tasks/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  tasks[index] = { ...tasks[index], ...req.body };
  res.json(tasks[index]);
});

// Удаление задачи
app.delete('/api/tasks/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.status(204).send();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});