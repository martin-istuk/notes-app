import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Note, NotesService } from "../notes.service";
import { Observable } from "rxjs";

import { NoteComponent } from "../shared/components/note/note.component";

@Component({
	selector: "app-all-notes",
	standalone: true,
	imports: [CommonModule, NoteComponent],
	template: `
		<h1>All notes</h1>
		<div class="container-all-notes">
			<app-note *ngFor="let note of notes$ | async" [note]="note" />
		</div>
	`,
	styles: [
		`
			@import "../shared/styles/mixins.scss";

			h1 {
				font-family: "Oxygen";
			}

			.container-all-notes {
				display: grid;
				gap: 20px;
				margin: 20px;
				@include min-window-width(500px) {
					grid-template-columns: repeat(3, 1fr);
				}
			}
		`,
	],
})
export class AllNotesComponent {
	private notesService = inject(NotesService);
	public notes$: Observable<Array<Note>> = this.notesService.getAllNotes();
}
