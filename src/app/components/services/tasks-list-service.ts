import { Injectable, signal } from '@angular/core';
import { TaskList, Task } from '../interface/task';


@Injectable({
  providedIn: 'root'
})
export class TasksListService {


  taskListData: TaskList[] = [
    {
      id: '1',
      title: 'Done',
      tasks: [],
      position: 0,
      expanded: true,
      isImmutable: true,
      canCreateTask: false
    },
    {
      id: '2',
      title: 'Task incoming',
      tasks: [],
      position: 1,
      expanded: true,
      isImmutable: true,
      canCreateTask: true
    },
    {
      id: '3',
      title: 'Тест',
      tasks: [ {
        id: '22',
        title: 'тест задча',
        assignees: ['исполнтетль'],
        deadline: new Date(),
        stickers: [],
        isCompleted: false,
        isFavorite: false,
        author: 'user',
        createdAt: new Date(),
        location: 'задача без доски'
      } ],
      position: 1,
      expanded: true,
      canCreateTask: true
    },
  ];

  taskLists = signal<TaskList[]>(this.taskListData)

  addList(newList: TaskList) {
    this.taskLists.update(lists => [...lists, newList]);
  }

  removeList(listId: string) {
    this.taskLists.update(lists => lists.filter(item => item.id !== listId));
  }

  addTaskToList(task: Task, listId: string) {
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
