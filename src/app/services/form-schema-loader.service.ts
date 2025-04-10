import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {DLFormSchema, DLFormSchemaLayoutElement, DLFormSchemaProperty} from '../models/dl-form-schema';
import {FormBuilder, FormControl, FormRecord, NonNullableFormBuilder, ValidatorFn, Validators} from '@angular/forms';
import {DLElement, DLElementTypes, DLForm, DLGroup, DLSelectWidget, DLStringControl} from '../models/dl-parsed-form';


/**
 * Service to load json schema from file.
 */
@Injectable({
  providedIn: 'root'
})
export class FormSchemaLoaderService {

  public readonly dlForm$: Subject<DLForm> = new ReplaySubject(1);
  private readonly jsonUrl = 'assets/schema.json';
  private formSchema$: Subject<DLFormSchema> = new ReplaySubject(1);
  private formSchema!: DLFormSchema;
  private formBuilder: NonNullableFormBuilder = new FormBuilder().nonNullable;

  constructor(private http: HttpClient) {
    this.subscribeToSchema();
  }

  load(jsonUrl = this.jsonUrl): Observable<DLFormSchema> {
    const formSchema$ = this.http.get<DLFormSchema>(this.jsonUrl);
    formSchema$.subscribe(schema =>
      this.formSchema$.next(schema)
    );
    return formSchema$;
  }

  private subscribeToSchema(): void {
    this.formSchema$.subscribe({
      next: (schema) => {
        this.formSchema = schema;
        try {
          this.dlForm$.next(this.parseSchema(schema));
        } catch (error) {
          console.error("Error parsing schema");
        }
      },
      error: (error) => {
        console.error("Error reading schema");
      }
    })
  }

  private parseSchema(schema: DLFormSchema): DLForm {
    const dlForm = new DLForm;
    const dlGroup = this.parseObjectElement(schema);
    dlForm.rootFormControl = dlGroup.formControl;
    dlForm.rootElement = dlGroup;
    return dlForm;
  }


  private parseItemRecords(keys: Array<string | DLFormSchemaLayoutElement>, elements: DLElement[]): FormRecord<FormControl<string>> {
    return this.formBuilder.record(Object.fromEntries(elements.map((item, index) => {
        let key: any = keys[index];
        if (typeof key !== "string") {
          key = index;
        }
        return [key, item?.formControl];
      }
    )));
  }

  private parseObjectElement(objectElement: DLFormSchema): DLGroup {
    if (objectElement.type !== 'object') {
      throw ("Root element of schema is expected to be 'object'");
    }

    const items = objectElement.layout.map(item => {
      return this.parseLayoutElement(item);
    });

    return {
      type: DLElementTypes.group,
      widget: {type: objectElement.widget.type},
      formControl: this.parseItemRecords(objectElement.layout, items),
      items,
    };
  }

  private parseLayoutElement(element: DLFormSchemaLayoutElement): DLGroup {
    const items = element.items.map(item => {
      return this.parseLayoutElementItem(item);
    });

    const dlGroup: DLGroup = {
      type: DLElementTypes.group,
      formControl: this.parseItemRecords(element.items, items),
      widget: {type: element.widget.type},
      items
    };

    if (element.config) {
      dlGroup.widget.config = element.config;
    }

    return dlGroup;
  }

  private parseLayoutElementItem(item: DLFormSchemaLayoutElement | string): DLElement {
    if (typeof item === 'string') {
      const property = this.resolveLayoutItem(item);
      return this.parseProperty(item, property);
    } else {
      if (item?.type === "layout") {
        return this.parseLayoutElement(item);
      } else {
        throw (`Unexpected item type ${item?.type}`);
      }
    }
  }

  private resolveLayoutItem(item: string): DLFormSchemaProperty {
    return this.formSchema.properties[item];
  }

  private parseProperty(propertyName: string, property: DLFormSchemaProperty): DLStringControl {
    switch (property.type) {
      case 'string':
        const options: ValidatorFn[] = [];
        const required = this.formSchema.required.includes(propertyName);
        if (property.pattern) options.push(Validators.pattern(property.pattern));
        if (required) options.push(Validators.required);
        const control: DLStringControl = {
          type: DLElementTypes.string,
          required,
          formControl: this.formBuilder.control('', options),
          title: property.title,
          widget: {type: property.widget.type, config: property.config},
        };
        if (property.oneOf) (<DLStringControl<DLSelectWidget>>control).widget.options = property.oneOf;
        if (property.widget.validationMessages) (<DLStringControl>control).widget.validationMessages = property.widget.validationMessages;
        return control;
      default:
        throw (`Unexpected item type ${property.type}`);
    }

  }

}
