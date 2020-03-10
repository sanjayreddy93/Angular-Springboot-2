import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalize'
})
export class Capitalize implements PipeTransform{
    transform(value: string){
       var words  =  value.split(' ');
       for(var i=0;i < words.length;i++){
            words[i] = words[i].substring(0,1).toUpperCase() + words[i].substr(1).toLocaleLowerCase();
       }
       return words.join(' ');
    }
}