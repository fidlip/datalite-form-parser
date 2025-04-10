import {Component} from '@angular/core';
import {Widget} from '../widget';
import {DLSelectWidget, DLStringControl} from '../../../models/dl-parsed-form';
import {MatFormField, MatOption, MatSelect} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldControl, MatLabel} from '@angular/material/form-field';

@Component({
  selector: 'dl-select',
  imports: [
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  standalone: true,
  providers: [{provide: MatFormFieldControl, useExisting: SelectComponent}],
})
export default class SelectComponent extends Widget<DLStringControl<DLSelectWidget>> {
}
