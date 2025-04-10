import {MatDateFormats} from '@angular/material/core';

export const CS_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'd. M. y',
    monthYearLabel: 'MMMM y',
    dateA11yLabel: 'd. M. y',
    monthYearA11yLabel: 'MMMM y',
  }
};
