import { Component } from '@angular/core';

import { SearchInput } from '../../../shared/search-input/search-input';
import { Task, TaskList } from '../interface/task';
import { TasksList } from '../tasks-list/tasks-list';

@Component({
  selector: 'app-tasks-page',
  imports: [
    TasksList,
    SearchInput,
    TasksList
  ],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss'
})
export class TasksPage {

  pageTitle = 'My Tasks';


  taskLists: TaskList[] = [
    {
      id: 1,
      title: 'Task incoming',
      tasks: [],
      position: 0,
      collapsed: false,
      isImmutable: true
    },
    {
      id: 2,
      title: 'Done',
      tasks: [],
      position: 1,
      collapsed: false,
      isImmutable: true
    },
    {
      id: 3,
      title: 'тест',
      tasks: [],
      position: 2,
      collapsed: false
    },
  ];

}
