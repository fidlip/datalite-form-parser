import {Component} from '@angular/core';
import {DynamicComponentLoaderComponent} from '../../dynamic-component-loader';
import {Widget} from '../widget';
import {DLGroup} from '../../../models/dl-parsed-form';

@Component({
  selector: 'dl-dtl-fluent-section',
  imports: [
    DynamicComponentLoaderComponent,
  ],
  templateUrl: './dtl-fluent-section.component.html',
  styleUrl: './dtl-fluent-section.component.scss',
  standalone: true,
})
export default class DtlFluentSectionComponent extends Widget<DLGroup> {

}
