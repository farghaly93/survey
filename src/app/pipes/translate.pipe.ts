import { Pipe } from '@angular/core';
import { ClientServices } from '../clientServices.servise';
import arabic from "../../../backend/translation-arabic.json";

@Pipe({
    name: 'translate'
})
export class TranslatePipe {
    constructor(private clientServices: ClientServices) {}
  transform(val, args) {
     return val;
   // if(args === 'english' || typeof val !== 'string') {
    //    return val;
    //  }
    //  else if (args === 'arabic') {
      //    const value = val.toLowerCase();
      //   const word = arabic[value];
       //      if(!word) {
                 return val;
      //       }else {
       //         return word;
     //        }
    //  }
  }
}