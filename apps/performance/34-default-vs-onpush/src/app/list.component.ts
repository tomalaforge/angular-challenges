import { CDFlashingDirective } from "@angular-challenges/shared/directives";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatDivider, MatList, MatListItem } from "@angular/material/list";


@Component({
    selector: 'list-component',
    imports: [
        MatList,
        MatListItem,
        MatDivider,
        CDFlashingDirective
    ],
    template: `
        <mat-list class="flex w-full">
            @if (names.length === 0) {
                <div class="empty-list-label">Empty list</div>
            }
            @for (name of names; track name) {
                <mat-list-item cd-flash class="text-orange-500">
                <div class="flex justify-between">
                    <h3 title="Name">
                    {{ name }}
                    </h3>
                </div>
                </mat-list-item>
            }
            @if (names.length !== 0) {
                <mat-divider></mat-divider>
            }
        </mat-list>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {

    @Input() names!: string[];

}