import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class TagsService {
	public allTags: Array<string> = [
		"Reddd",
		"Greennn",
		"Blueee",
		"always first",
		"this is a tag",
		"this is also a tag",
		"tag not pinned",
	];

	public addNewTag(tag: string): void {
		this.allTags.push(tag);
	}

	public removeTag(tag: string): void {
		const index: number = this.allTags.indexOf(tag);
		this.allTags.splice(index, 1);
	}
}
