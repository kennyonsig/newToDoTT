import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { TaskItem } from '../../interface/task';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm {
  taskService = inject(TaskService)

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    deadline: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.taskForm.invalid) return;

    const newTask: TaskItem = {
      id: Date.now(),
      title: this.taskForm.value.title!,
      description: this.taskForm.value.description ?? '',
      isCompleted: false,
      createdAt: new Date(),
      deadLine: new Date(this.taskForm.value.deadline!),
    };

    this.taskService.addTask(newTask);
    this.taskForm.reset();
  }
}
