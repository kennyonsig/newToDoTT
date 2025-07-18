import { Component, inject } from '@angular/core';

import { SearchInput } from '../../shared/search-input/search-input';
import { TasksList } from '../tasks-list/tasks-list';
import { TasksListService } from '../services/tasks-list-service';
import { FormsModule } from '@angular/forms';
import { NgClickOutsideDirective } from 'ng-click-outside2';


@Component({
  selector: 'app-tasks-page',
  imports: [
    TasksList,
    SearchInput,
    TasksList,
    FormsModule,
    NgClickOutsideDirective,
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

    const newList = {
      id: crypto.randomUUID(),
      title: title,
      tasks: [],
      position: Math.max(...lists.map(l => l.position), 0) + 1,
      expanded: true,
      canCreateTask:true
    }

    this.tasksListService.addList(newList)
    this.newTitle = '';
    this.isAddList = false;
  }

  findTask(taskQuery: string) {
    console.log(taskQuery)
  }

  onClickedOutside() {
    this.addNewList();
    this.isAddList = false;
  }
}
