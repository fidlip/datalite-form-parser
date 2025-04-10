import {Component, Input, OnChanges, SimpleChanges, ViewChild, ViewContainerRef} from '@angular/core';
import {Widget} from './widgets/widget';
import {DLElement} from '../models/dl-parsed-form';

@Component({
  selector: 'dl-dynamic-component-loader',
  standalone: true,
  template: `
    <ng-container #container></ng-container>`,
  // styles: ':host {width: 100%;}'
})
export class DynamicComponentLoaderComponent implements OnChanges {
  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;

  /**
   * Element config passed to component.
   */
  @Input() formElement!: DLElement;

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['formElement']) {
      let componentName = this.formElement?.widget?.type;
      if (componentName) {
        await this.loadComponent(componentName);
      } else {
        console.warn(`No widget defined for schema element`, this.formElement);
      }
    }
  }

  private async loadComponent(componentName: string) {
    this.container?.clear();

    try {
      let componentPath = `${componentName}/${componentName}`;
      console.info(`Loading component ${componentName}`);
      const {default: componentClass} = await import(`./widgets/${componentPath}.component.ts`);
      const componentRef = this.container.createComponent<Widget<DLElement>>(componentClass);

      if (this.formElement && componentRef.instance && typeof componentRef.instance == 'object' && 'formElement' in componentRef.instance) {
        (componentRef.instance as any).formElement = this.formElement;
      }
      if (componentRef.instance.setup) {
        componentRef.instance.setup();
      }
    } catch (error) {
      console.error(`Error loading component: ${componentName}`, error);
    }
  }
}
