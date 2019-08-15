import { Pipe } from '@angular/core';

@Pipe({
    name: 'ceil'
})
export class CeilPipe {
  transform(val, args) {
      return Math.ceil(val);
  }
}