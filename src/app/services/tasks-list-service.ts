import { Injectable, signal } from '@angular/core';
import { TaskList, Task } from '../components/interface/task';


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

  updateTaskProperty(
    listId: string,
    taskId: string,
    update: Partial<Task>
  ) {
    this.taskLists.update(lists =>
      lists.map(list =>
        list.id === listId
          ? {
            ...list,
            tasks: list.tasks.map(task =>
              task.id === taskId ? { ...task, ...update } : task
            )
          }
          : list
      )
    );
  }

  updateTaskFavorite(taskId: string, listId: string, isFavorite: boolean) {
    this.updateTaskProperty(listId, taskId, { isFavorite });
    console.log(taskId, isFavorite);
  }

  updateTaskComplete(taskId: string, listId: string, isCompleted: boolean) {
    this.updateTaskProperty(listId, taskId, { isCompleted });
    console.log(taskId, isCompleted);
  }

  addList(newList: TaskList) {
    this.taskLists.update(lists => [...lists, newList]);
  }

  removeList(listId: string) {
    const list = this.taskLists().find(l => l.id === listId);
    if (!list) {
      console.warn(`List ${listId} not found`);
      return;
    }

    if (list.isImmutable) {
      console.error('Cannot delete immutable list');
      return;
    }
    this.taskLists.update(lists => lists.filter(item => item.id !== listId));
  }

  addTaskToList(task: Task, listId: string) {
    const targetList = this.taskLists().find(l => l.id === listId);

    if (!targetList) {
      console.warn(`List ${listId} not found`);
      return;
    }

    if (targetList.isImmutable && !targetList.canCreateTask) {
      console.error('Cannot add tasks to immutable list');
      return;
    }

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
