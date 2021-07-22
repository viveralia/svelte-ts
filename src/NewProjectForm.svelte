<script type="ts">
  import type { Project } from "./types";

  export let newProject: Omit<Project, "id">;
  export let isSubmitting: boolean;
  export let handleSubmit: () => Promise<void>;
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input required type="text" placeholder="Name" bind:value={newProject.name} />
  <input required type="text" placeholder="Description" bind:value={newProject.description} />
  <input required type="text" placeholder="Category" bind:value={newProject.category} />
  <input required type="number" placeholder="Budget" bind:value={newProject.budget} />
  <input required type="text" placeholder="Due date" bind:value={newProject.dueDate} />
  <button type="submit" disabled={isSubmitting}>
    {isSubmitting ? "Loading..." : "Add new project"}
  </button>
</form>