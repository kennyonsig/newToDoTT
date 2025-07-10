import { Routes } from '@angular/router';
import { TaskDetail } from './components/task-detail/task-detail';
import { TaskList } from './components/task-list/task-list';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path:'tasks', component: TaskList },
  { path:'tasks/:id', component: TaskDetail },
  { path: 'dashboard', component: Dashboard },
  { path:'**', redirectTo: '' },
];
