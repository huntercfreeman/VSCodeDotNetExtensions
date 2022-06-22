<script lang="ts">
	import { onMount } from "svelte";
	import type { DotNetSolutionFile } from "../../../out/FileSystem/Files/DotNetSolutionFile";
	import { MessageCategory } from "../../../out/Messages/MessageCategory";
	import { MessageReadKind } from "../../../out/Messages/Read/MessageReadKind";
	import SelectProjectFileForm from "./Components/SelectProjectFileForm.svelte";
	import { NugetPackageModel } from "../../../out/DotNet/NugetPackageModel";
	import { NugetPackageVersionModel } from "../../../out/DotNet/NugetPackageVersionModel";
	import NugetResultsDisplay from "./Components/NugetResultsDisplay.svelte";
	import NugetPackageManagerControlButtons from "./Components/NugetPackageManagerControlButtons.svelte";

	let selectedDotNetSolutionFile: DotNetSolutionFile | undefined;
	let selectedProjectFile: any;
	let nugetResults: any;
	let nugetQuery: string = "";
	let includePrerelease: boolean = false;

	function sendGetRequest() {
		if (validateGetRequest()) {
			fetch(interpolatedRequest)
				.then((response) => response.json())
				.then((result) => {
					nugetResults = result.data.map(
						(x) =>
							new NugetPackageModel(
								undefined,
								x.type,
								x.registration,
								x.id,
								x.version,
								x.description,
								x.summary,
								x.title,
								x.iconUrl,
								x.licenseUrl,
								x.projectUrl,
								x.tags,
								x.authors,
								x.owners,
								x.totalDownloads,
								x.verified,
								x.packageTypes,
								sortWrapper(x.versions).map(
									(v) =>
										new NugetPackageVersionModel(
											v.version,
											v.downloads,
											undefined
										)
								)
							)
					);
				})
				.catch((error) => {
					return [];
				});
		}
	}

	function sortWrapper(objects: any[]): any[] {
		objects.sort(
			(a: any, b: any) => -1 * a.version.localeCompare(b.version)
		);

		return objects;
	}

	function validateGetRequest(): boolean {
		if (selectedDotNetSolutionFile && selectedProjectFile && nugetQuery) {
			return true;
		}

		return false;
	}

	$: interpolatedRequest = `https://azuresearch-usnc.nuget.org/query?q=${nugetQuery}&prerelease=${includePrerelease}`;

	$: getFormattedInterpolatedRequest = (() => {
		let formattedInterpolatedRequest: string = interpolatedRequest;

		let indexOfQueryString = formattedInterpolatedRequest.indexOf("?q=");

		let website = formattedInterpolatedRequest.substring(
			0,
			indexOfQueryString
		);
		let queryString =
			formattedInterpolatedRequest.substring(indexOfQueryString);

		return {
			website: website,
			queryString: queryString,
		};
	})();

	onMount(async () => {
		window.addEventListener("message", async (event) => {
			const message = event.data;

			switch (message.messageCategory) {
				case MessageCategory.read:
					switch (message.messageReadKind) {
						case MessageReadKind.solutionIntoTreeView:
							selectedDotNetSolutionFile =
								message.dotNetSolutionFile;
							break;
						case MessageReadKind.activeDotNetSolutionFile:
							selectedDotNetSolutionFile =
								message.activeDotNetSolutionFile;
							
							selectedProjectFile = undefined;
							break;
					}
			}
		});
	});
</script>

<div class="dni_app">
	<NugetPackageManagerControlButtons />

	{#if selectedDotNetSolutionFile}
		<div style="margin-top: 4px;">
			Active solution: <em
				>{selectedDotNetSolutionFile.absoluteFilePath
					.filenameWithExtension}</em
			>
		</div>

		<hr />

		<SelectProjectFileForm
			bind:selectedProjectFile
			projectFiles={selectedDotNetSolutionFile.solutionModel.projects
							.filter(x => x.solutionFolderEntries === undefined)}
		/>

		<input style="margin-top: 4px;" bind:value={nugetQuery} />
		<div>
			includePrerelease: <input
				type="checkbox"
				bind:checked={includePrerelease}
			/>
		</div>

		<hr />

		<div>
			<div>Your source will be:</div>
			<div style="margin-left: 12px;">
				{getFormattedInterpolatedRequest.website}
			</div>
		</div>
		<div>
			<div>Your query will be:</div>
			<div style="margin-left: 12px;">
				<em>{getFormattedInterpolatedRequest.queryString}</em>
			</div>
		</div>
		<div>
			<div>The chosen Project to modify:</div>
			<div style="margin-left: 12px;">
				{selectedProjectFile?.absoluteFilePath.filenameWithExtension ??
					"undefined"}
			</div>
		</div>

		<button on:click={sendGetRequest}>Send GET Request</button>

		{#if nugetResults}
			<NugetResultsDisplay
				nugetPackageModels={nugetResults}
				{selectedProjectFile}
			/>
		{/if}
	{:else}
		<div>
			Solution is undefined
		</div>
	{/if}
</div>

<style>
	.dni_app {
		height: calc(100vh - var(--input-margin-vertical) * 2);
	}

	em {
		font-style: normal;
		color: var(--vscode-editorInfo-foreground);
	}
</style>
