import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tasks-list',
  imports: [
    MatIcon
  ],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss'
})
export class TasksList {

  @Input() taskListTitle = '';
  @Input() taskCount = 0;
  @Input() tasks = [];
  @Input() isCollapsed = false;


  toggleList() {
    this.isCollapsed = !this.isCollapsed;
  }

}
