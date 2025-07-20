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
      canCreateTask: false,
      displayFlags: {
        showFavorite: false,
        showAssignees: true,
        showAuthor: false,
        showLocation: true,
        showCreatedAt: false,
        showDeadline: true,
        showStickers: true,
      }
    },
    {
      id: '2',
      title: 'Task incoming',
      tasks: [],
      position: 1,
      expanded: true,
      isImmutable: true,
      canCreateTask: true,
      displayFlags: {
        showFavorite: false,
        showAssignees: true,
        showAuthor: false,
        showLocation: true,
        showCreatedAt: false,
        showDeadline: true,
        showStickers: true,
      }
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
      canCreateTask: true,
      displayFlags: {
        showFavorite: false,
        showAssignees: true,
        showAuthor: false,
        showLocation: true,
        showCreatedAt: false,
        showDeadline: true,
        showStickers: true,
      }
    },
  ];

  taskLists = signal<TaskList[]>(this.taskListData)

  updateTaskProperty(
    listId: string,
    taskId: string,
    update: Partial<Task>
  ) {
    this.taskLists.update(lists => {
      const listsWithUpdatedTask = lists.map(list => {
        if (list.id !== listId) return list;

        const updatedTasks = list.tasks.map(task => {
          return task.id === taskId ? {...task, ...update} : task;
        });

        return {
          ...list,
          tasks: updatedTasks
        };
      });

      if (update.isCompleted === true) {
        const completedTask = this.findTaskInLists(listsWithUpdatedTask, listId, taskId)

        if (completedTask) {
          const doneList = listsWithUpdatedTask.find(list => list.title === 'Done');

          if (doneList) {
            return this.moveTaskToDoneList(listsWithUpdatedTask, listId, taskId, doneList.id, completedTask);
          }
        }
      }

      return listsWithUpdatedTask;
    });
  }

  findTaskInLists(lists: TaskList[], listId: string, taskId: string) {
    const list = lists.find(list => list.id === listId);
    return list?.tasks.find(task => task.id === taskId);
  }

  moveTaskToDoneList(lists: TaskList[], sourceListId: string, taskId: string, doneListId: string, task: Task): TaskList[] {
    return lists.map(list => {
      // Добавление в список завершённых
      if (list.id === doneListId) {
        return {
          ...list,
          tasks: [...list.tasks, task]
        };
      }

      // Удаление из исходного
      if (list.id === sourceListId) {
        return {
          ...list,
          tasks: list.tasks.filter(task => task.id !== taskId)
        };
      }

      return list;
    });
  }

  updateTaskFavorite(taskId: string, listId: string, isFavorite: boolean) {
    this.updateTaskProperty(listId, taskId, { isFavorite });
  }

  updateTaskComplete(taskId: string, listId: string, isCompleted: boolean) {
    this.updateTaskProperty(listId, taskId, { isCompleted });
  }

  addList(newList: TaskList) {
    this.taskLists.update(lists => [...lists, newList]);
  }

  removeList(listId: string) {
    const list = this.taskLists().find(list => list.id === listId);
    if (!list) {
      console.warn(`List ${listId} not found`);
      return;
    }

    if (list.isImmutable) {
      console.error('Cannot delete immutable list');
      return;
    }

    this.taskLists.update(lists => {
      const deletedPosition = list.position;
      return lists.filter(list => list.id !== listId)
        .map(list => ({
          ...list,
          position: list.position > deletedPosition ? list.position - 1 :list.position
        }));
    });
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
