import { Injectable } from "@angular/core";

import { Observable, map, of } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class NotesService {
	public allNotes: Array<Note> = [
		{
			id: "sdasdsadsa",
			isPinned: true,
			title: "A Note",
			content:
				"I am THE FIRST note! First first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first!",
			tags: ["always first"],
		},
		{
			id: "iuiuiuiuu",
			isPinned: true,
			title: "Another note",
			content: "Sadly, only second note.",
			tags: ["this is a tag", "this is also a tag"],
		},
		{
			id: "bnbnbnb",
			isPinned: false,
			title: "A note not pinned",
			content: "I am not among the first two nor am I pinned.",
			tags: ["tag not pinned"],
		},
	];

	public createNewNote(note: Note): Observable<boolean> {
		this.allNotes.push(note);
		return of(this.allNotes.includes(note) ? true : false);
	}

	public getAllNotes(): Observable<Array<Note>> {
		return of(this.allNotes);
	}

	public getPinnedNotes(): Observable<Array<Note>> {
		return this.getAllNotes().pipe(
			map((allNotes: Array<Note>) => {
				return allNotes.filter((note: Note) => {
					return note.isPinned === true;
				});
			})
		);
	}

	public updateNote(note: Note): Observable<any> {
		return of();
	}

	public deleteNote(note: Note): Observable<any> {
		return of();
	}

	public getRandomNoteId(): string {
		const newId: string = Math.random().toString(36).substring(2, 8);
		const isUnique: boolean =
			this.allNotes.filter((note: Note) => {
				return note.id === newId;
			}).length === 0;
		return isUnique ? newId : this.getRandomNoteId();
	}
}

export interface INote {
	id: string;
	isPinned: boolean;
	title: string;
	content: string;
	tags: Array<string>;
}

export class Note {
	public id: string;
	public isPinned: boolean;
	public title: string;
	public content: string;
	public tags: Array<string>;

	constructor(iNote: INote) {
		this.id = iNote.id;
		this.isPinned = iNote.isPinned;
		this.title = iNote.title;
		this.content = iNote.content;
		this.tags = iNote.tags;
	}
}
