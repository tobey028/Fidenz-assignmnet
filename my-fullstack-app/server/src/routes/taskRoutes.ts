import { Router } from 'express';
import { TaskService } from '../services/taskService';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { UserRole } from '../entities/User';

const router = Router();
const taskService = new TaskService();

router.use(authenticate);

router.post('/', 
  authorize(UserRole.ADMIN, UserRole.MANAGER), 
  async (req: AuthRequest, res) => {
    try {
      const task = await taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error: any) {
      console.error('Create task error:', error);
      res.status(400).json({ error: error.message });
    }
  }
);

router.get('/', async (req: AuthRequest, res) => {
  try {
    const { status, priority, assignedToId } = req.query;
    
    const filters: any = {};
    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    
    if (req.user?.role === UserRole.EMPLOYEE) {
      filters.assignedToId = req.user.userId;
    } else if (assignedToId) {
      filters.assignedToId = parseInt(assignedToId as string);
    }
    
    const tasks = await taskService.getTasks(filters);
    res.json(tasks);
  } catch (error: any) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const task = await taskService.getTaskById(parseInt(req.params.id));
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (req.user?.role === UserRole.EMPLOYEE && 
        task.assignedToId !== req.user.userId) {
      return res.status(403).json({ 
        error: 'Forbidden: You can only view your own tasks' 
      });
    }

    res.json(task);
  } catch (error: any) {
    console.error('Get task error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = await taskService.getTaskById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (req.user?.role === UserRole.EMPLOYEE && 
        task.assignedToId !== req.user.userId) {
      return res.status(403).json({ 
        error: 'Forbidden: You can only update your own tasks' 
      });
    }

    const updatedTask = await taskService.updateTask(taskId, req.body);
    res.json(updatedTask);
  } catch (error: any) {
    console.error('Update task error:', error);
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', 
  authorize(UserRole.ADMIN, UserRole.MANAGER), 
  async (req, res) => {
    try {
      await taskService.deleteTask(parseInt(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      console.error('Delete task error:', error);
      res.status(400).json({ error: error.message });
    }
  }
);

export default router;