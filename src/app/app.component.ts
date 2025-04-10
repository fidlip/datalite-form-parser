import {Component} from '@angular/core';
import {FormComponent} from './components/form/form.component';
import {FormSchemaLoaderService} from './services/form-schema-loader.service';
import {Subject} from 'rxjs';

import {DLForm} from './models/dl-parsed-form';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {MatCard} from '@angular/material/card';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';

type Json = { [key: string]: Json | string };

@Component({
  selector: 'app-root',
  imports: [FormComponent, NgxJsonViewerModule, MatCard],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected formData$!: Subject<DLForm>;

  protected formValuesJSON!: Json;

  constructor(formDataLoader: FormSchemaLoaderService) {
    formDataLoader.load();
    this.formData$ = formDataLoader.dlForm$;
    this.formData$.subscribe(data => {
      this.formValuesJSON = this.prepareJSONFromControlValues(data.rootFormControl);
      data.rootFormControl?.valueChanges.subscribe(value => {
        this.formValuesJSON = this.prepareJSONFromControlValues(data.rootFormControl);
      })
    });
  }

  private prepareJSONFromControlValues(control: AbstractControl): Json {
    if (control instanceof FormGroup || control instanceof FormArray) {
      let result: Json = {};
      Object.entries(control.controls).forEach(([key, control]) => {
        result = Object.assign(result, {[key]: this.prepareJSONFromControlValues(control)});
      });
      return this.flattenOneLevelJSON(result);
    } else if (control instanceof FormControl) {
      return control.value;
    } else {
      throw "Unrecognized control type";
    }
  }

  private flattenOneLevelJSON(json: Json) {
    const result: Json = {};
    for (const key in json) {
      if (json[key] instanceof Object) {
        for (let flattenedKey in json[key]) {
          result[flattenedKey] = json[key][flattenedKey];
          delete json[key][flattenedKey];
        }
      } else {
        result[key] = json[key];
      }
    }
    return result;
  }
}
