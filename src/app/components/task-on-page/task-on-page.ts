import { Component, inject, Input } from '@angular/core';
import { Task, TaskList } from '../interface/task'
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TasksListService } from '../../services/tasks-list-service';


@Component({
  selector: 'app-task-on-page',
  imports: [
    DatePipe,
    MatIcon
  ],
  templateUrl: './task-on-page.html',
  styleUrl: './task-on-page.scss'
})
export class TaskOnPage {
  taskListService = inject(TasksListService)

  @Input() task!: Task;
  @Input() taskList!: TaskList;


  toggleToFavoriteTask() {
    this.task.isFavorite = !this.task.isFavorite;

    this.taskListService.updateTaskFavorite(
      this.task.id,
      this.taskList.id,
      this.task.isFavorite
    )
  }

  toggleCompleteTask() {
    this.task.isCompleted = !this.task.isCompleted;
    this.taskListService.updateTaskComplete(
      this.task.id,
      this.taskList.id,
      this.task.isCompleted
    );
  }
}
