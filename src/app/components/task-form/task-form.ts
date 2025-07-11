import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { TaskItem } from '../../interface/task';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';


function minDateValidator(control: AbstractControl): ValidationErrors | null {
  const selectedDate = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return selectedDate < today ? { minDate: true } : null;
}

@Component({
  selector: 'app-task-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm {
  taskService = inject(TaskService)
  today = new Date().toISOString().slice(0, 16);

  @Output() closeForm = new EventEmitter<void>();

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    deadline: new FormControl(this.today, [
      Validators.required,
      minDateValidator])
  });

  onSubmit() {
    if (this.taskForm.invalid) return;

    const newTask: TaskItem = {
      id: Date.now(),
      title: this.taskForm.value.title!,
      description: this.taskForm.value.description ?? '',
      isCompleted: false,
      inProgress: false,
      createdAt: new Date(),
      deadLine: new Date(this.taskForm.value.deadline!),
    };

    this.taskService.addTask(newTask);
    this.taskForm.reset({
      deadline: this.today
    });
  }
}
