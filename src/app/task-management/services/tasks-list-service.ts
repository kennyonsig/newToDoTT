import { Injectable, signal } from '@angular/core';
import { TaskList, Task } from '../../interface/task';
import { taskListMock } from './mock-task-data';


@Injectable({
  providedIn: 'root'
})
export class TasksListService {

  taskLists = signal<TaskList[]>(taskListMock)

  updateTaskProperty(
    listId: string,
    taskId: string,
    update: Partial<Task>
  ) {
    this.taskLists.update(lists => {
      const updatedLists = lists.map(list =>
        list.id !== listId ? list : {
          ...list,
          tasks: list.tasks.map(task =>
            task.id === taskId ? {...task, ...update} : task
          )
        }
      );

      if (update.isCompleted !== true) return updatedLists;

      const completedTask = this.findTaskInLists(updatedLists, listId, taskId);
      if (!completedTask) return updatedLists;

      const doneListId = updatedLists.find(list => list.title === 'Done')?.id;
      if (!doneListId) return updatedLists;

      return this.moveTaskToDoneList(updatedLists, listId, taskId, doneListId, completedTask);
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
