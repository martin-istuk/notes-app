import { Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "",
		loadComponent: () =>
			import("./all-notes/all-notes.component").then(
				(m) => m.AllNotesComponent
			),
	},
	{
		path: "pinned-notes",
		loadComponent: () =>
			import("./pinned-notes/pinned-notes.component").then(
				(m) => m.PinnedNotesComponent
			),
	},
	{
		path: "tags",
		loadComponent: () =>
			import("./tags/tags.component").then((m) => m.TagsComponent),
	},
	{
		path: "**",
		redirectTo: "",
	},
];
