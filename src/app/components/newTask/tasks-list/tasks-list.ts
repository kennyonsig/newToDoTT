import { Component, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TaskList } from '../interface/task';
import { FormsModule } from '@angular/forms';
import { TasksListService } from '../services/tasks-list-service';

@Component({
  selector: 'app-tasks-list',
  imports: [
    MatIcon,
    FormsModule
  ],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss'
})
export class TasksList {

  @Input() taskList!: TaskList;
  @Input() canCreateTask!: boolean;
  taskListService = inject(TasksListService);

  taskCount = 0;
  taskTitle = ''
  createdTask = false
  isExpanded = true;


  toggleList() {
    this.isExpanded = !this.isExpanded;
  }

  atCreate() {
    this.createdTask = true;
  }

  addTask() {

    if (!this.taskTitle.trim()) return

    const newTask = {
      id: Math.max(...this.taskList.tasks.map(task => task.id), 0) + 1,
      title: this.taskTitle,
      assignees: [],
      deadline: null,
      stickers: [],
      isCompleted: false
    }

    this.taskTitle = '';
    this.createdTask = false;
    this.taskListService.addTaskToList(newTask, this.taskList.id)
  }
}
