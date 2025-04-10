import {Component} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {DynamicComponentLoaderComponent} from '../../dynamic-component-loader';
import {Widget} from '../widget';
import {DLGroup} from '../../../models/dl-parsed-form';

@Component({
  selector: 'dl-dtl-fluent-card',
  imports: [
    MatCard,
    DynamicComponentLoaderComponent
  ],
  templateUrl: './dtl-fluent-card.component.html',
  styleUrl: './dtl-fluent-card.component.scss',
  standalone: true,
})
export default class DtlFluentCardComponent extends Widget<DLGroup> {

}
