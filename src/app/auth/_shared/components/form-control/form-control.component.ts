import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, forwardRef, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-form-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormControlComponent),
      multi: true,
    },
  ],
})
export class FormControlComponent implements OnInit, ControlValueAccessor {
  @Input() type!: string;
  @Input() initialValue!: string;
  @Input() iconPath!: string;
  @Input() placeholder!: string;
  @Input() invalidInput!: boolean;
  formControl!: FormControl;
  formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.formControl = this.formBuilder.control(this.initialValue || '');
    this.formControl.valueChanges.subscribe((value) => {
      this.onInputChange(value);
    });
  }

  onInputChange(value: string) {}

  onInputTouched() {}

  registerOnChange(fn: any): void {
    this.onInputChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onInputTouched = fn;
  }
  writeValue(obj: any): void {}
}
