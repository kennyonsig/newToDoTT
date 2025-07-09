import { computed, effect, Injectable, signal } from '@angular/core';
import { TaskItem } from '../interface/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks = signal<TaskItem[]>([]);
  storageKey = 'tasks';
  editingTaskId = signal<number | null>(null);
  searchQuery = signal('');

  constructor() {
    this.loadFromStorage();

    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.tasks()));
    });
  }

  loadFromStorage() {
    const savedTasks = localStorage.getItem(this.storageKey);
    if (savedTasks) {
      try {
        this.tasks.set(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Failed to parse saved tasks', error);
        this.tasks.set([]);
      }
    }
  }

  addTask(task: TaskItem) {
    this.tasks.update(tasks => [...tasks, task]);
  }

  removeTask(id: number) {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
    if (this.editingTaskId() === id) {
      this.editingTaskId.set(null);
    }
  }

  updateTask(updateTask: TaskItem) {
    this.tasks.update(tasks =>
      tasks.map(task => task.id === updateTask.id ? updateTask : task)
    );
  }

  getTasksStorage() {
    return localStorage.getItem(this.storageKey)
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
    return this.tasks().find(t => t.id === id);
  }

  filteredTasks = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.tasks();

    return this.tasks().filter(task =>
      task.title.toLowerCase().includes(query));
  });

  setSearchQuery(query: string) {
    this.searchQuery.set(query);
  }
}
