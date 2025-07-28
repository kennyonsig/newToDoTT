import { Component, inject } from '@angular/core';

import { SearchInput } from '../../../shared/search-input/search-input';
import { TasksList } from '../tasks-list/tasks-list';
import { TasksListService } from '../../services/tasks-list-service';
import { FormsModule } from '@angular/forms';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import { AutoFocus } from '../../../directives/auto-focus';


@Component({
  selector: 'app-tasks-page',
  imports: [
    TasksList,
    SearchInput,
    TasksList,
    FormsModule,
    NgClickOutsideDirective,
    AutoFocus,
  ],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss'
})
export class TasksPage {
  pageTitle = 'My Tasks';
  isAddList= false;
  tasksListService = inject(TasksListService);
  newTitle = '';

  taskLists = this.tasksListService.taskLists;

  toggleAddList() {
    this.isAddList = !this.isAddList;
  }

  addNewList() {
    const title = this.newTitle.trim();
    if (!title) return;

    const lists = this.taskLists();

    const nextPosition = lists.length > 0
      ? Math.max(...lists.map(list => list.position)) + 1
      : 1;

    const newList = {
      id: crypto.randomUUID(),
      title: title,
      tasks: [],
      position: nextPosition,
      expanded: true,
      canCreateTask: true,
      displayFlags: {
        showFavorite: false,
        showAssignees: true,
        showAuthor: false,
        showLocation: true,
        showCreatedAt: false,
        showDeadline: true,
        showStickers: true,
      }
    }

    this.tasksListService.addList(newList)
    this.newTitle = '';
    this.isAddList = false;
  }

  // TODO findTask
  findTask(taskQuery: string) {
    console.log(taskQuery)
  }

  onClickedOutside() {
    this.addNewList();
    this.isAddList = false;
  }
}
