import { Pipe } from '@angular/core';

@Pipe({
    name: 'trim'
})
export class TrimPipe {
  transform(val, args) {
    if (args === undefined) {
      return val;
    }

    if (val.length > args) {
      return val.trim(args);
    } else {
      return val;
    }
  }
}