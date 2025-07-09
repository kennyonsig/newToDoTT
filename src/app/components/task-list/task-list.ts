import { Component, inject, OnInit} from '@angular/core';
import { TaskService } from '../../services/task-service';
import { MatIconModule } from '@angular/material/icon'
import { TaskItem } from '../../interface/task';
import { FormsModule } from '@angular/forms';
import { TaskHeader } from '../task-header/task-header';
import { TaskMeta } from '../task-meta/task-meta';
import { TaskForm } from '../task-form/task-form';
import { SearchInput } from '../../shared/search-input/search-input';


@Component({
  selector: 'app-task-list',
  imports: [
    MatIconModule,
    FormsModule,
    TaskHeader,
    TaskMeta,
    TaskForm,
    SearchInput,
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList implements OnInit {
  taskService = inject(TaskService);
  tasks = this.taskService.filteredTasks;
  editingTaskId = this.taskService.editingTaskId;

  isOpenForm = false;

  ngOnInit() {
    this.isOpenForm = this.hasNoTasks;
    this.taskService.setSearchQuery('');
  }

  removeTask(taskId: number) {
    this.taskService.removeTask(taskId);
  }

  toggleComplete(task: TaskItem, isCompleted: boolean) {
    this.taskService.updateTask({...task, isCompleted});
  }

  editTask(task: TaskItem) {
    this.taskService.editTask(task);
  }

  saveTask(task: TaskItem) {
    this.taskService.saveTask(task);
  }

  get hasNoTasks() {
    const savedTasks = this.taskService.getTasksStorage();
    return !savedTasks || JSON.parse(savedTasks).length === 0;
  }

  openForm() {
    this.isOpenForm = !this.isOpenForm;
  }

  findTask(searchQuery: string) {
    this.taskService.setSearchQuery(searchQuery)
  }
}
