import { Component, Input } from '@angular/core';
import { Task } from '../interface/task'
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

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

  @Input() task!: Task;

  // TODO edit favorite
  toggleToFavoriteTask(taskId: string) {

    if (this.task.isFavorite) {
      this.task.isFavorite = false;
      console.log('del from fav');
      return;
    }
    console.log(taskId);
    this.task.isFavorite = true;
  }

  // TODO edit complete
  toggleCompleteTask(taskId: string) {
    if (this.task.isCompleted) {
      this.task.isCompleted = false;
      console.log('!done');
      return;
    }
    console.log(taskId);
    this.task.isCompleted = true;
  }

}
