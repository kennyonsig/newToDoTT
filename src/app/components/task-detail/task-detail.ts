import { Component, computed, inject } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskItem } from '../../interface/task';
import { MatIconModule } from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskHeader } from '../task-header/task-header';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    TaskHeader,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss'
})
export class TaskDetail {
  taskService = inject(TaskService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  tasks = this.taskService.tasks;
  editingTaskId = this.taskService.editingTaskId;

  routeParams = toSignal(this.route.params, { initialValue: { id: null } });
  task = computed(() => {
    const id = this.routeParams().id;
    return id ? this.taskService.getTaskById(+id) : undefined;
  });

  removeTask(taskId: number) {
    this.taskService.removeTask(taskId);
    this.router.navigate(['/tasks']);
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

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
