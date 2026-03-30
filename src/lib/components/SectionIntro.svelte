<script>
  import Container from './Container.svelte';
  import FadeIn from './FadeIn.svelte';
  
  /**
   * SectionIntro component - displays section introduction with eyebrow, title and description
   * Used to introduce sections within a page
   * 
   * @prop {string} eyebrow - Small text displayed above the title (optional)
   * @prop {string} title - Main heading text (required)
   * @prop {boolean} smaller - Whether to use smaller title size (default: false)
   * @prop {boolean} invert - Whether to use inverted colors for dark backgrounds (default: false)
   * @prop {string} class - Additional CSS classes for the Container
   * @prop {Snippet} children - Description content below the title
   */
  let { 
    eyebrow = '', 
    title, 
    smaller = false, 
    invert = false, 
    class: className = '', 
    children 
  } = $props();
</script>

<Container class={className}>
  <FadeIn class="max-w-2xl">
    <h2>
      {#if eyebrow}
        <span
          class="mb-6 block font-display text-base font-semibold {invert ? 'text-white' : 'text-neutral-950'}"
        >
          {eyebrow}
        </span>
        <span class="sr-only"> - </span>
      {/if}
      <span
        class="block font-display tracking-tight text-balance {smaller ? 'text-2xl font-semibold' : 'text-4xl font-medium sm:text-5xl'} {invert ? 'text-white' : 'text-neutral-950'}"
      >
        {title}
      </span>
    </h2>
    {#if children}
      <div
        class="mt-6 text-xl {invert ? 'text-neutral-300' : 'text-neutral-600'}"
      >
        {@render children?.()}
      </div>
    {/if}
  </FadeIn>
</Container>
