import { Component, Input } from '@angular/core';
import { TaskItem } from '../../interface/task';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-task-meta',
  imports: [
    DatePipe,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './task-meta.html',
  styleUrl: './task-meta.scss'
})
export class TaskMeta {
  @Input() task!: TaskItem;
}
