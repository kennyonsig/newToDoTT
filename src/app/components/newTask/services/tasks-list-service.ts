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
      title: 'Done',
      tasks: [],
      position: 0,
      expanded: true,
      isImmutable: true,
      canCreateTask: false
    },
    {
      id: 2,
      title: 'Task incoming',
      tasks: [],
      position: 1,
      expanded: true,
      isImmutable: true,
      canCreateTask: true
    },
  ];

  taskLists = signal<TaskList[]>(this.taskListData)

  addList(newList: TaskList) {
    this.taskLists.update(lists => [...lists, newList]);
  }

  addTaskToList(task: Task, listId: number) {
    this.taskLists.update(lists =>
      lists.map(list =>
        list.id === listId
          ? {
            ...list,
            tasks: [...list.tasks, task]
            }
          : list
      )
    );
  }
}
