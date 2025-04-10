import {Component} from '@angular/core';
import {Widget} from '../widget';
import {DLStringControl} from '../../../models/dl-parsed-form';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'dl-date',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatIconButton,
  ],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
})
export default class DateComponent extends Widget<DLStringControl> {

  minDate: Date = new Date();

  get date(): Date | null {
    const value = this.formElement.formControl.value as string;
    return value ? this.parseDate(value) : null;
  }

  set date(date: Date | null) {
    const formatted = date ? this.formatDate(date) : '';
    this.formElement.formControl.setValue(formatted);
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value;
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('cs-CZ');
  }

  private parseDate(value: string): Date | null {
    const [day, month, year] = value.split('.').map(part => parseInt(part.trim(), 10));
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
  }
}
