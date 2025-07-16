import { inject, Injectable, signal } from '@angular/core';
import { TaskList, Task } from '../interface/task';
import { TaskService } from './task-service';


@Injectable({
  providedIn: 'root'
})
export class TasksListService {

  taskService = inject(TaskService);

  taskListData: TaskList[] = [
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
  ];

  taskLists = signal<TaskList[]>(this.taskListData)


  addList(newList: TaskList) {
    this.taskLists.update(lists => [...lists, newList]);
  }

  findListById(listId: number){
    return this.taskLists().find(list => list.id === listId);
  }


  addTaskToList(task: Task, listId: number) {
    const updateList = this.findListById(listId);

    if (!updateList) {
      return console.log('Нет списка')
    }

    updateList.tasks.push(task);
  }
}
