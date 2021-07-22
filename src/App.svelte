<script lang="ts">
	import { onMount } from "svelte";
	import type { Project } from "./types";
	import ProjectCard from "./Project.svelte";
	import NewProjectForm from "./NewProjectForm.svelte";

	const projectsUrl = "http://localhost:4000/projects";

	let projects: Project[] = [];
	const getProjects = async () => {
		const response = await fetch(projectsUrl);
		if (!response.ok) throw new Error("Something went wrong");
		const data: Project[] = await response.json();
		projects = data;
	}

	onMount(getProjects);

	let isFormOpen = false;
	const toggleFormVisibility = () => isFormOpen = !isFormOpen;

	const emptyProject: Omit<Project, "id"> = {
		name: "",
		budget: 0,
		category: "design",
		description: "",
		dueDate: "",
	}

	let newProject = { ...emptyProject };
	let isSubmitting = false;
	const handleSubmit = async () => {
		isSubmitting = true;
		const response = await fetch(projectsUrl, { 
			method: "POST",
			body: JSON.stringify(newProject), 
			headers: { "Content-Type": "Application/JSON" } 
		});

		if (!response.ok) throw new Error("Something went wrong");
		const newProjectCreated: Project = await response.json();
		isSubmitting = false;
		newProject = {...emptyProject };
		projects = [...projects, newProjectCreated];
		isFormOpen = false;
	}
</script>

<main>
	<button on:click={toggleFormVisibility}>
		{isFormOpen ? "Close form" :"Open form"}
	</button>

	{#if isFormOpen}
		<NewProjectForm {newProject} {isSubmitting} {handleSubmit} />
	{/if}

	{#each projects as project}
		<ProjectCard {project} />
	{/each}
</main>