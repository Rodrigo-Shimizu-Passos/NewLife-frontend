import { ViewportRuler } from '@angular/cdk/scrolling';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'text'
})
export class TextPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
   if (value == null) {
      return '-'
    }
    return value
  }

}
