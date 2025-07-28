import { Component, inject, Input } from '@angular/core';
import { Task, TaskList } from '../../../interface/task'
import { DatePipe, NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TasksListService } from '../../services/tasks-list-service';
import { StickerPicker } from '../../../shared/sticker-picker/sticker-picker';


@Component({
  selector: 'app-task-on-page',
  imports: [
    DatePipe,
    MatIcon,
    NgClass,
    StickerPicker
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
