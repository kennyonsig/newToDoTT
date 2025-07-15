import { Component } from '@angular/core';
import { TasksList } from '../tasks-list/tasks-list';
import { SearchInput } from '../../../shared/search-input/search-input';

@Component({
  selector: 'app-tasks-page',
  imports: [
    TasksList,
    SearchInput
  ],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss'
})
export class TasksPage {

  pageTitle = 'My Tasks';

  taskListIncoming = 'Task incoming';
  taskListDone = 'Done';

}
