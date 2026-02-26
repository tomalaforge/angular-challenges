import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

//La template que tengo hay ahora mismo es poco reutilizable porque cuando queramos añadir otro tipo de card
//tenemos que poner más condiciones de if y más imágenes en el img y añadir más condiciones de if en la funcion de addNewItem

/*
Esto se hace con:

<ng-content> para contenido estático

<ng-template> + ngTemplateOutlet para contenido dinámico
*/
@Component({
  selector: 'app-card',
  template: `
    <div class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <!--Eliminamos los if-->
      <!-- @if (type() === CardType.TEACHER) {
        <img ngSrc="assets/img/teacher.png" width="200" height="200" />
      }
      @if (type() === CardType.STUDENT) {
        <img ngSrc="assets/img/student.webp" width="200" height="200" />
      } -->
      <!--ponermos un <ng-content>; contenido proyectado imagen-->
      <ng-content>
        <!-- ng-content; hueco donde el padre mete aqui html tal cual, en este caso las img que pasamos dentro del app-card cuando lo llamamos
         en teacher, student o city (el img se "inyecta" dentro del ng-content)-->
      </ng-content>

      <section>
        @for (item of list(); track item) {
          <!-- <app-list-item
            [name]="item.firstName"
            [id]="item.id"
            [type]="type()"></app-list-item> -->
          <!--el ng-container lo que hace es en este caso 
          repetir un template (la definida en el teacher, student y city) 
          para cada elemento de la lista que pasemos al card (de esta forma el card no sabe nada por asi decirlo, solo 
          sabe que tiene que representar una template de forma repetida-->
          <ng-container
            [ngTemplateOutlet]="itemTemplate()"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="onAdd()">
        Add
      </button>
    </div>
  `,
  imports: [CommonModule, ListItemComponent, NgOptimizedImage],
})
export class CardComponent {
  //Input que permite que el padre decida como se ve cada item de la lista
  //@Input() itemTemplate!: TemplateRef<any>;
  //Usamos un input signal mejor -> en el ngContainer se llama con () por ser un signal:
  readonly itemTemplate = input<TemplateRef<any> | null>(null);
  //Input signal para recibir una funcion
  readonly onAdd = input<() => void>();

  // private teacherStore = inject(TeacherStore);
  // private studentStore = inject(StudentStore);

  readonly list = input<any[] | null>(null);
  // readonly type = input.required<CardType>();
  // readonly customClass = input('');

  CardType = CardType;

  // addNewItem() {
  //   const type = this.type();
  //   if (type === CardType.TEACHER) {
  //     this.teacherStore.addOne(randTeacher());
  //   } else if (type === CardType.STUDENT) {
  //     this.studentStore.addOne(randStudent());
  //   }
  // }
}
