import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {DynamicComponentLoaderComponent} from '../dynamic-component-loader';
import {DLForm} from '../../models/dl-parsed-form';

@Component({
  selector: 'dl-form',
  imports: [
    DynamicComponentLoaderComponent
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  public formDataResolved: DLForm | undefined;

  @Input('form-data') set formData(value: Observable<DLForm>) {
    value?.subscribe(value => {
      this.formDataResolved = value;
    });
  };

}
