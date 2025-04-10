import {Component} from '@angular/core';
import {Widget} from '../widget';
import {DLStringControl} from '../../../models/dl-parsed-form';
import {MatInput} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'dl-text',
  imports: [
    MatInput,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
  standalone: true,
})
export default class TextComponent extends Widget<DLStringControl> {

}
