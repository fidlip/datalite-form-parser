import {AbstractControl, FormControl, FormGroup} from '@angular/forms';


/**
 * Connects widgets configuration with reactive representation of the form.
 */
export interface DLForm {
  rootElement: DLGroup;
  rootFormControl: AbstractControl;
}

export class DLForm implements DLForm {

}


export enum DLElementTypes {
  group = 'group', string = 'string',
}

export interface DLElement<FC extends AbstractControl = AbstractControl, W extends DLWidget = DLWidget> {
  type: DLElementTypes;
  widget: W;
  formControl: FC;
}


export interface DLGroup<W extends DLGroupWidget = DLGroupWidget> extends DLElement<FormGroup, W> {
  type: DLElementTypes.group;
  items: DLElement[];
}

export interface DLStringControl<W extends DLWidget = DLWidget> extends DLElement<FormControl<String>, W> {
  type: DLElementTypes.string;
  title: string;
  required?: boolean;
  pattern?: string;
}

interface DLWidget {
  type: string;
  config?: {}
  validationMessages?: { pattern: string };
}

export interface DLGroupWidget extends DLWidget {
  config?: {
    columns?: DLColumn[];
    innerPageLayout?: boolean;
  };
}

interface DLColumn {
  width: number;
  content: number[];
}


export interface DLSectionWidget extends DLGroupWidget {
}

export interface DLCardWidget extends DLGroupWidget {
}

export interface DLColumnsWidget extends DLGroupWidget {
}


interface DLControlWidget extends DLWidget {
}

export interface DLTextWidget extends DLControlWidget {
}

export interface DLSelectWidget extends DLControlWidget {
  options: DLSelectOption[];
}

interface DLSelectOption {
  const: string;
  title: string;
}

export interface DLDateWidget extends DLControlWidget {

}

export interface DLTextAreaWidget extends DLControlWidget {

}
