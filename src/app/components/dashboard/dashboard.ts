import { Component, inject } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/task-service';
import { TaskHeader } from '../task-header/task-header';
import { TaskItem } from '../../interface/task';
import { TaskMeta } from '../task-meta/task-meta';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    CdkDropList,
    TaskHeader,
    CdkDrag,
    TaskMeta,
    RouterLink
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  taskService = inject(TaskService);
  //TODO #1 - сохранние в storage при перемещении.
  //TODO #2 - изменение статуса при перемещении
  tasks = this.taskService.tasks;
  progressTasks = this.taskService.progressTasks;
  completedTasks = this.taskService.completedTasks;

  editingTaskId = this.taskService.editingTaskId;

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

  drop(event: CdkDragDrop<TaskItem[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      return
    }

    transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

  }
}
