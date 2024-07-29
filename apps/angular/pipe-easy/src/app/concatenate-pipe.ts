import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'concatenate',
    standalone: true
})

export class ConcatenatePipe implements PipeTransform{
    transform(name: string, index: number) {
        return `${name} - ${index}`;
    }
}