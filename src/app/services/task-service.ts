import { computed, effect, Injectable, signal } from '@angular/core';
import { TaskItem } from '../interface/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks = signal<TaskItem[]>([]);
  progressTasks = signal<TaskItem[]>([]);
  completedTasks = signal<TaskItem[]>([]);
  editingTaskId = signal<number | null>(null);
  searchQuery = signal('');

  allTasks = computed(() => [
    ...this.tasks(),
    ...this.progressTasks(),
    ...this.completedTasks(),
  ]);

  filteredTasks = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this. allTasks();

    return this.allTasks().filter(task =>
      task.title.toLowerCase().includes(query));
  });

  storageKey = ['tasks', 'progress', 'completed'];

  constructor() {
    this.loadFromStorage();

    effect(() => {
      localStorage.setItem(this.storageKey[0], JSON.stringify(this.tasks()));
      localStorage.setItem(this.storageKey[1], JSON.stringify(this.progressTasks()));
      localStorage.setItem(this.storageKey[2], JSON.stringify(this.completedTasks()));
    });
  }

  loadFromStorage() {
    const savedTasks = localStorage.getItem(this.storageKey[0]);
    const savedProgress = localStorage.getItem(this.storageKey[1]);
    const savedCompleted = localStorage.getItem(this.storageKey[2]);

    if (savedTasks) this.tasks.set(JSON.parse(savedTasks));
    if (savedProgress) this.progressTasks.set(JSON.parse(savedProgress));
    if (savedCompleted) this.completedTasks.set(JSON.parse(savedCompleted));
  }

  addTask(task: TaskItem) {
    this.tasks.update(tasks => [...tasks, task]);
  }

  updateTaskSignal(updater: (tasks: TaskItem[]) => TaskItem[]) {
    this.tasks.update(updater);
    this.progressTasks.update(updater);
    this.completedTasks.update(updater);
  }

  removeTask(id: number) {
    this.updateTaskSignal(tasks => tasks.filter(task => task.id !== id));

    if (this.editingTaskId() === id) {
      this.editingTaskId.set(null);
    }
  }

  updateTask(updateTask: TaskItem) {
    this.updateTaskSignal(tasks =>
      tasks.map(task => task.id === updateTask.id ? updateTask : task)
    );
  }

  saveTask(task: TaskItem): void {
    this.updateTask(task);
    this.editingTaskId.set(null);
  }

  editTask(task: TaskItem) {
    const currentEditingId = this.editingTaskId()

    if (currentEditingId === task.id) {
      this.updateTask(task);
      this.editingTaskId.set(null);
      return;
    }

    if (currentEditingId !== null) {
      const currentTask = this.tasks().find(t => t.id === currentEditingId);
      if (currentTask) this.updateTask(currentTask);
      this.editingTaskId.set(task.id);
      return;
    }

    this.editingTaskId.set(task.id);
  }

  getTaskById(id: number) {
    return this.allTasks().find(task => task.id === id);
  }

  setSearchQuery(query: string) {
    this.searchQuery.set(query);
  }
}
