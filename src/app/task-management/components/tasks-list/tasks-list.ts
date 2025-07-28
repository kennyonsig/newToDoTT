import { Component, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TaskList } from '../../../interface/task';
import { FormsModule } from '@angular/forms';
import { TasksListService } from '../../services/tasks-list-service';
import { TaskOnPage } from '../task-on-page/task-on-page';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import { AutoFocus } from '../../../directives/auto-focus';
import { NgClass } from '@angular/common';



@Component({
  selector: 'app-tasks-list',
  imports: [
    MatIcon,
    FormsModule,
    TaskOnPage,
    NgClickOutsideDirective,
    AutoFocus,
    NgClass,
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
  showDisplayFlagMenu = false


  flagOptions= [
    { key: 'showFavorite', label: 'Избранное' },
    { key: 'showCreatedAt', label: 'Дата создания' },
    { key: 'showDeadline', label: 'Дедлайн' },
    { key: 'showAssignees', label: 'Исполнители' },
    { key: 'showAuthor', label: 'Автор' },
    { key: 'showLocation', label: 'Расположение' },
    { key: 'showStickers', label: 'Стикеры' }
  ] as const;

  toggleList() {
    this.isExpanded = !this.isExpanded;
  }

  openListMenu() {
    this.isListMenuOpen = !this.isListMenuOpen;
  }

  openDisplayFlagMenu() {
    this.showDisplayFlagMenu = !this.showDisplayFlagMenu;
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
      stickers: [],
      isCompleted: false,
      isFavorite: false,
      author: 'user',
      createdAt: new Date(),
      location: 'Задача без доски',
      parentListId: this.taskList.id,
    }

    this.taskTitle = '';
    this.tasksListService.addTaskToList(newTask, this.taskList.id)
  }

  removeList(listId: string) {
    this.tasksListService.removeList(listId);
    this.isListMenuOpen = false;
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

    this.showDisplayFlagMenu = false;
  }

  toggleDisplayFlag(flagName: keyof TaskList['displayFlags']) {
    this.taskList.displayFlags[flagName] = !this.taskList.displayFlags[flagName];
  }

  //TODO up/down list
  upList() {

  }

  downList() {

  }
}
