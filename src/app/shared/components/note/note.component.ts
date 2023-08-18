import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { TagChipsComponent } from "../tag-chips/tag-chips.component";
import { NotesService, Note } from "src/app/notes.service";

@Component({
	selector: "app-note",
	standalone: true,
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		TagChipsComponent,
	],
	template: `
		<mat-card *ngIf="note; else noteNotFound">
			<mat-card-header>
				<mat-card-title>{{ note.title }}</mat-card-title>
				<mat-card-subtitle>(ID {{ note.id }})</mat-card-subtitle>
			</mat-card-header>
			<mat-card-actions align="end">
				<button mat-icon-button>
					<mat-icon [ngClass]="{ pinned: note.isPinned }">push_pin</mat-icon>
				</button>
				<button mat-icon-button color="warn">
					<mat-icon>delete_forever</mat-icon>
				</button>
			</mat-card-actions>
			<mat-card-content>
				<p>{{ note.content }}</p>
				<app-tag-chips [tags]="note.tags" />
			</mat-card-content>
		</mat-card>
		<ng-template #noteNotFound>
			<h3>Error</h3>
			<p>Note not found</p>
		</ng-template>
	`,
	styles: [
		`
			mat-card {
				display: grid;
				grid-template-areas: "titles pin-btn" "note note";
				gap: 16px;
				justify-content: space-between;
			}
			mat-card-header {
				grid-area: titles;
				mat-card-title {
					font-family: "Oxygen";
				}
			}
			mat-card-actions {
				grid-area: pin-btn;
				mat-icon.pinned {
					transform: rotate(45deg);
					color: #3f51b5;
				}
			}
			mat-card-content {
				grid-area: note;
			}
		`,
	],
})
export class NoteComponent {
	@Input() note?: Note;

	private notesService = inject(NotesService);
}
