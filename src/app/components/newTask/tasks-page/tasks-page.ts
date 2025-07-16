import { Component, inject } from '@angular/core';

import { SearchInput } from '../../../shared/search-input/search-input';
import { TasksList } from '../tasks-list/tasks-list';
import { TasksListService } from '../services/tasks-list-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks-page',
  imports: [
    TasksList,
    SearchInput,
    TasksList,
    FormsModule
  ],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss'
})
export class TasksPage {

  pageTitle = 'My Tasks';

  isAddList= false;

  tasksListService = inject(TasksListService)

  taskLists = this.tasksListService.taskLists

  newTitle = ''

  addList() {
    this.isAddList = !this.isAddList;
  }

  addNewList() {

    const title = this.newTitle.trim();
    if (!title) return;

    const lists = this.taskLists();

    const newList = {
      id: Math.max(...lists.map(l => l.id), 0) + 1,
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

}
