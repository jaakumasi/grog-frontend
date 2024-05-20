import { Component, Input, OnInit, forwardRef, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-form-control',
  standalone: true,
  imports: [ReactiveFormsModule],
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
  @Input() formControlName!: string;
  @Input() initialValue!: string;
  @Input() validators!: any[];
  @Input() iconPath!: string;
  @Input() placeholder!: string;
  formControl!: FormControl;
  formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.formControl = this.formBuilder.control(this.initialValue || '');
    this.formControl.valueChanges.subscribe((value) => {
      console.log(value)
      this.onInputChange(value);
    });
  }

  onInputChange(value: string) {}

  registerOnChange(fn: any): void {
    this.onInputChange = fn;
  }
  registerOnTouched(fn: any): void {}
  writeValue(obj: any): void {}
}
