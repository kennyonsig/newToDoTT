import { Component, Input } from '@angular/core';
import { Task } from '../interface/task'

@Component({
  selector: 'app-task-on-page',
  imports: [],
  templateUrl: './task-on-page.html',
  styleUrl: './task-on-page.scss'
})
export class TaskOnPage {

  @Input() task!: Task;



}
