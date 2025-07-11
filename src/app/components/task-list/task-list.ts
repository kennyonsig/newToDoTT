import { Component, computed, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { MatIconModule } from '@angular/material/icon'
import { TaskItem } from '../../interface/task';
import { FormsModule } from '@angular/forms';
import { TaskHeader } from '../task-header/task-header';
import { TaskMeta } from '../task-meta/task-meta';
import { TaskForm } from '../task-form/task-form';
import { SearchInput } from '../../shared/search-input/search-input';
import { RouterLink } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';
import { TuiAnimated } from '@taiga-ui/cdk';

@Component({
  selector: 'app-task-list',
  imports: [
    MatIconModule,
    FormsModule,
    TaskHeader,
    TaskMeta,
    TaskForm,
    SearchInput,
    RouterLink,
    MatTooltip,
    TuiAnimated
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList implements OnInit {
  taskService = inject(TaskService);
  tasks = this.taskService.filteredTasks;
  editingTaskId = this.taskService.editingTaskId;
  valueTip = 'Добавить задачу'
  isOpenForm = false;
  hasNoTasks = computed(() => this.taskService.allTasks().length === 0);

  ngOnInit() {
    this.isOpenForm = this.hasNoTasks();
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

  openForm() {
    this.isOpenForm = !this.isOpenForm;
  }

  findTask(searchQuery: string) {
    this.taskService.setSearchQuery(searchQuery)
  }
}
