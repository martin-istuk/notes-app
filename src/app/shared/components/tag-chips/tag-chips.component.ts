import { Component, Input, ElementRef, ViewChild, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
	MatAutocompleteSelectedEvent,
	MatAutocompleteModule,
} from "@angular/material/autocomplete";
import { MatChipInputEvent, MatChipsModule } from "@angular/material/chips";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TagsService } from "src/app/tags.service";

@Component({
	selector: "app-tag-chips",
	standalone: true,
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatChipsModule,
		MatIconModule,
		FormsModule,
		MatAutocompleteModule,
		ReactiveFormsModule,
	],
	template: `
		<form>
			<mat-form-field>
				<mat-label>Tags</mat-label>
				<mat-chip-grid #chipGrid aria-label="Tag selection">
					<mat-chip-row *ngFor="let tag of tags" (removed)="remove(tag)">
						{{ tag }}
						<button matChipRemove [attr.aria-label]="'remove ' + tag">
							<mat-icon>cancel</mat-icon>
						</button>
					</mat-chip-row>
				</mat-chip-grid>
				<input
					placeholder="New tag..."
					#tagInput
					[formControl]="tagCtrl"
					[matChipInputFor]="chipGrid"
					[matAutocomplete]="auto"
					[matChipInputSeparatorKeyCodes]="separatorKeysCodes"
					(matChipInputTokenEnd)="add($event)"
				/>
				<mat-autocomplete
					#auto="matAutocomplete"
					(optionSelected)="selected($event)"
				>
					<mat-option *ngFor="let tag of filteredTags | async" [value]="tag">
						{{ tag }}
					</mat-option>
				</mat-autocomplete>
			</mat-form-field>
		</form>
	`,
	styles: [
		`
			mat-form-field {
				width: 100%;
			}
		`,
	],
})
export class TagChipsComponent {
	@Input({ required: true }) tags?: Array<string>;

	private tagsService = inject(TagsService);
	public allTags: Array<string> = this.tagsService.allTags;
	separatorKeysCodes: number[] = [ENTER, COMMA];

	tagCtrl = new FormControl("");
	filteredTags: Observable<string[]>;

	@ViewChild("tagInput") tagInput: ElementRef<HTMLInputElement> | undefined;

	constructor() {
		this.filteredTags = this.tagCtrl.valueChanges.pipe(
			startWith(null),
			map((tag: string | null) => {
				return tag ? this._filter(tag) : this.allTags.slice();
			})
		);
	}

	add(event: MatChipInputEvent): void {
		const value = (event.value || "").trim();
		if (value && this.tags) {
			this.tags.push(value);
		}
		event.chipInput.clear();
		this.tagCtrl.setValue(null);
	}

	remove(tag: string): void {
		let index: number = -1;
		if (this.tags) {
			index = this.tags.indexOf(tag);
		}
		if (index >= 0 && this.tags) {
			this.tags.splice(index, 1);
		}
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		this.tags?.push(event.option.viewValue);
		if (this.tagInput) {
			this.tagInput.nativeElement.value = "";
		}
		this.tagCtrl.setValue(null);
	}

	private _filter(value: string): Array<string> {
		return this.allTags.filter((fruit) =>
			fruit.toLowerCase().includes(value.toLowerCase())
		);
	}
}
