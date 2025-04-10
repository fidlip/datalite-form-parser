import {Component} from '@angular/core';
import {Widget} from '../widget';
import {DLStringControl} from '../../../models/dl-parsed-form';
import {MatFormField, MatInput} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {MatLabel} from '@angular/material/form-field';

@Component({
  selector: 'dl-textarea',
  imports: [
    ReactiveFormsModule,
    CdkTextareaAutosize,
    MatFormField,
    MatLabel,
    MatInput
  ],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  standalone: true,
})
export default class TextareaComponent extends Widget<DLStringControl> {

}
