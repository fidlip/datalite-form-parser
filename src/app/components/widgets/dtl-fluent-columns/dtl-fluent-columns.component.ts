import {Component} from '@angular/core';
import {Widget} from '../widget';
import {DLColumnsWidget, DLGroup} from '../../../models/dl-parsed-form';
import {DynamicComponentLoaderComponent} from '../../dynamic-component-loader';

@Component({
  selector: 'dl-dtl-fluent-columns',
  imports: [
    DynamicComponentLoaderComponent
  ],
  templateUrl: './dtl-fluent-columns.component.html',
  styleUrl: './dtl-fluent-columns.component.scss',
  standalone: true,
})
export default class DtlFluentColumnsComponent extends Widget<DLGroup<DLColumnsWidget>> {

  protected columnWidths!: string;

  override setup() {
    super.setup();

    const columns = (<DLGroup>this.formElement).widget.config?.columns;
    if (columns && columns.length > 0) {
      this.columnWidths = columns.map((column) => `${column.width}fr`).join(' ');
    }
  }

}
