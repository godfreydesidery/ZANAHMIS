import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'dateTime'
})
export class ShowDateTimePipe implements PipeTransform {

    transform(value: Date): string {


        var str = value.toString()
        var str1 = str.substring(0, str.length - 9)
        var str2 = str.substring(str.length - 9, str.length)

        str1 = str1.replaceAll(',','-')
        str2 = str2.replaceAll(',',':')

        return str.replace(',','-').replace(',','-').replace(',',':').replace(',',':').replace(',',':')
    }
}