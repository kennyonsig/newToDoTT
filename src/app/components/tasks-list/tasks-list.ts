import { AfterViewInit, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TaskList } from '../interface/task';
import { FormsModule } from '@angular/forms';
import { TasksListService } from '../services/tasks-list-service';
import { TaskOnPage } from '../task-on-page/task-on-page';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import { AutoFocus } from '../../directives/auto-focus';


@Component({
  selector: 'app-tasks-list',
  imports: [
    MatIcon,
    FormsModule,
    TaskOnPage,
    NgClickOutsideDirective,
    AutoFocus,
  ],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss'
})
export class TasksList {

  @Input() taskList!: TaskList;
  @Input() canCreateTask!: boolean;
  tasksListService = inject(TasksListService);
  isListMenuOpen = false;
  taskTitle = '';
  createdTask = false;
  isExpanded = true;
  startUpdate = false;

  toggleList() {
    this.isExpanded = !this.isExpanded;
  }

  atCreate() {
    this.createdTask = true;
  }

  addTask() {

    if (!this.taskTitle.trim()) return

    const newTask = {
      id: crypto.randomUUID(),
      title: this.taskTitle,
      assignees: [],
      deadline: null,
      stickers: [],
      isCompleted: false,
      isFavorite: false,
      author: 'user',
      createdAt: new Date(),
      location: 'Задача без доски',
    }

    this.taskTitle = '';
    this.tasksListService.addTaskToList(newTask, this.taskList.id)
  }

  removeList(listId: string) {
    this.tasksListService.removeList(listId);
    this.isListMenuOpen = false;
  }

  openListMenu() {
    this.isListMenuOpen = !this.isListMenuOpen;
  }

  startUpdateTaskTitle() {
    this.startUpdate = !this.startUpdate;
    this.isListMenuOpen = false;
  }
  // TODO updateTaskTitle
  updateTaskTitle() {
    console.log('Updated title:', this.taskList.title);
    this.startUpdate = false;
  }

  onClickedOutside() {
    this.isListMenuOpen = false;

    if (this.startUpdate) {
      this.updateTaskTitle();
    }

    if (this.createdTask) {
      this.addTask();
      this.createdTask = false;
    }
  }
}
