import { Component, inject, Input } from '@angular/core';
import { Task, TaskList } from '../../../interface/task'
import { DatePipe, NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TasksListService } from '../../services/tasks-list-service';


@Component({
  selector: 'app-task-on-page',
  imports: [
    DatePipe,
    MatIcon,
    NgClass
  ],
  templateUrl: './task-on-page.html',
  styleUrl: './task-on-page.scss'
})
export class TaskOnPage {
  taskListService = inject(TasksListService)

  @Input() task!: Task;
  @Input() taskList!: TaskList;

  taskData= [
    { key: 'assignees', displayKey: 'showAssignees' },
    { key: 'author', displayKey: 'showAuthor'},
    { key: 'location', displayKey: 'showLocation' },
    { key: 'stickers', displayKey: 'showStickers' },
  ] as const;


  toggleToFavoriteTask() {
    const newState = !this.task.isFavorite;

    this.taskListService.updateTaskFavorite(
      this.task.id,
      this.taskList.id,
      newState
    )
  }

  toggleCompleteTask() {
    const newState = !this.task.isCompleted;
    this.taskListService.updateTaskComplete(
      this.task.id,
      this.taskList.id,
      newState
    );
  }
}
