<script lang="ts">
  import type { Project } from "./types";

  export let project: Project;
</script>

<article>
  <h2>{project.name}</h2>
	<p>{project.description}</p>
</article>
