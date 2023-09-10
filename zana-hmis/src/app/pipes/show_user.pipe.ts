import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'showUser'
})
export class ShowUserPipe implements PipeTransform {

    transform(value: String | undefined): string {

        return value!.substring(value!.indexOf('|') + 1, value!.length)
    }
}