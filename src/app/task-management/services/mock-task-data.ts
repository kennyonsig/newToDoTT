import { TaskList } from "../../interface/task";

export const taskListMock: TaskList[] = [
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
    id: "list-1",
    title: "Текущие задачи",
    tasks: [
      {
        id: "task-1",
        title: "Исправить баг на мобильной версии",
        assignees: ["user-1", "user-2"],
        deadline: new Date("2023-12-15"),
        stickers: [
          { type: "device", value: "mobile" },
          { type: "priority", value: "major" },
          { type: "taskType", value: "bug" }
        ],
        isCompleted: false,
        isFavorite: true,
        author: "user-3",
        createdAt: new Date("2023-11-20"),
        location: "Офис",
        parentListId: "list-1"
      },
      {
        id: "task-2",
        title: "Сверстать новую страницу",
        assignees: ["user-4"],
        stickers: [
          { type: "device", value: "web" },
          { type: "taskType", value: "layout" }
        ],
        isCompleted: false,
        isFavorite: false,
        author: "user-1",
        createdAt: new Date("2023-11-25"),
        location: "Удалённо",
        parentListId: "list-1"
      }
    ],
    position: 2,
    expanded: true,
    canCreateTask: true,
    displayFlags: {
      showFavorite: true,
      showAssignees: true,
      showAuthor: true,
      showLocation: true,
      showCreatedAt: true,
      showDeadline: true,
      showStickers: true
    }
  },
  {
    id: "list-2",
    title: "Выполнено",
    tasks: [
      {
        id: "task-3",
        title: "Обновить документацию",
        assignees: ["user-5"],
        stickers: [
          { type: "priority", value: "low" }
        ],
        isCompleted: true,
        isFavorite: false,
        author: "user-2",
        createdAt: new Date("2023-11-10"),
        location: "Офис",
        parentListId: "list-2"
      }
    ],
    position: 3,
    expanded: false,
    canCreateTask: false,
    isImmutable: true,
    displayFlags: {
      showFavorite: false,
      showAssignees: true,
      showAuthor: false,
      showLocation: false,
      showCreatedAt: true,
      showDeadline: false,
      showStickers: false
    }
  }
];
