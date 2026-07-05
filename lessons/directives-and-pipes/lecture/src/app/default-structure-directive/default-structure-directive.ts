import {Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-default-structure-directive',
  imports: [CommonModule],
  templateUrl: './default-structure-directive.html',
  styleUrls: ['./default-structure-directive.css']
})
export class DefaultStructureDirective {
  readonly showSmile = signal(true);
  readonly orderStatus = signal('shipped');

  students: IStudent[] = [
    { id: 1, name: 'Анна Иванова', grade: '5' },
    { id: 2, name: 'Борис Петров', grade: '4' },
    { id: 3, name: 'Виктор Сидоров', grade: '3' }
  ];

  public toggleShowSmile(value: boolean) {
    this.showSmile.set(value);
  }

  public changeOrderStatus(value: string) {
    this.orderStatus.set(value);
  }

  public trackByFn(index: number, item: IStudent) {
    return item.id;
  }
}

interface IStudent {
  id: number;
  name: string;
  grade: string;
}
