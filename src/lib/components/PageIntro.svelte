<script>
  import Container from './Container.svelte';
  import FadeIn from './FadeIn.svelte';
  import Breadcrumbs from './Breadcrumbs.svelte';

  /**
   * PageIntro component - displays page introduction with breadcrumbs (or eyebrow), title and description
   * Used at the top of pages to introduce the content
   *
   * @prop {string} eyebrow - Small text displayed above the title (optional, legacy)
   * @prop {Array<{label: string, href?: string}>} breadcrumbs - Breadcrumb items (takes priority over eyebrow)
   * @prop {string} title - Main heading text (required)
   * @prop {boolean} centered - Whether to center-align the content (default: false)
   * @prop {Snippet} children - Description content below the title
   */
  let { eyebrow = '', breadcrumbs = [], title, centered = false, children } = $props();
</script>

<Container class="mt-24 sm:mt-32 lg:mt-40 {centered ? 'text-center' : ''}">
  <FadeIn>
    {#if breadcrumbs.length > 0}
      <div class="mb-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>
    {:else if eyebrow}
      <span class="mb-6 block font-display text-base font-semibold text-neutral-950">
        {eyebrow}
      </span>
      <span class="sr-only"> - </span>
    {/if}
    <h1>
      <span
        class="block max-w-5xl font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-6xl {centered ? 'mx-auto' : ''}"
      >
        {title}
      </span>
    </h1>
    {#if children}
      <div
        class="mt-6 max-w-3xl text-xl text-neutral-600 {centered ? 'mx-auto' : ''}"
      >
        {@render children?.()}
      </div>
    {/if}
  </FadeIn>
</Container>
