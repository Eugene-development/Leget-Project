<script>
  import FadeIn from './FadeIn.svelte';
  import Border from './Border.svelte';
  
  /**
   * ListItem component - individual list item with title and description
   * 
   * Based on original React implementation:
   * - Uses FadeIn for viewport-triggered animation
   * - Uses Border component with top positioning for decorative line
   * - Supports optional title prop (displayed with period and space after)
   * - Uses group classes for first-child styling (no margin, hidden border)
   * 
   * @prop {string} title - Optional title displayed in bold before content
   * @prop {Snippet} children - Item content/description
   */
  let { title = '', children } = $props();
</script>

<li class="group mt-10 first:mt-0">
  <FadeIn>
    <Border class="pt-10 group-first:pt-0 group-first:before:hidden group-first:after:hidden">
      {#if title}
        <strong class="font-semibold text-neutral-950">{title}. </strong>
      {/if}
      {@render children?.()}
    </Border>
  </FadeIn>
</li>
