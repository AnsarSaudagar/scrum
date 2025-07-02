import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterOfWords'
})
export class FirstLetterOfWordsPipe implements PipeTransform {

  transform(value: string | null): string {
    if (!value) {
      return '';
    }

    const words = value.split(' ');
    const firstLetters = words.map(word => {
      return word.length > 0 ? word.charAt(0).toUpperCase() : '';
    });

    return firstLetters.join('');
  }
}