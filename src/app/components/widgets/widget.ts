import {merge, of} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {DLElement} from '../../models/dl-parsed-form';
import {Component, DestroyRef, inject, Input, OnInit, signal} from '@angular/core';

@Component({
  selector: 'dl-widget',
  template: ""
})
export class Widget<ELM extends DLElement> implements OnInit {
  @Input() formElement!: ELM;

  errorMessage = signal('');
  destroyRef = inject(DestroyRef)

  ngOnInit() {
    this.setup();
  }

  setup() {
    const control = this.formElement.formControl;
    merge(of(null), control.statusChanges, control.valueChanges)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateErrorMessage());

  }

  updateErrorMessage() {
    const control = this.formElement.formControl;
    if (control.hasError('required')) {
      this.errorMessage.set('Povinné pole');
    } else if (control.hasError('pattern')) {
      const patternErrorMessage = this.formElement.widget.validationMessages?.pattern;
      this.errorMessage.set(patternErrorMessage ?? 'Zadejte platnou hodnotu');
    } else {
      this.errorMessage.set('');
    }
  }
}
