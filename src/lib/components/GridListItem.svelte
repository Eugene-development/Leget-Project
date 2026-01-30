<script>
  import FadeIn from './FadeIn.svelte';
  import Border from './Border.svelte';
  
  /**
   * GridListItem component - individual item in a GridList with title and description
   * 
   * Based on original React implementation:
   * - Uses FadeIn for entrance animation
   * - Uses Border with left position for decorative line
   * - Supports invert prop for dark backgrounds
   * - Title is displayed with a period after it
   * 
   * @prop {string} title - The title of the item (required)
   * @prop {string} class - Additional CSS classes
   * @prop {boolean} invert - Invert colors for dark backgrounds (default: false)
   * @prop {Snippet} children - Description content
   */
  let { 
    title, 
    class: className = '', 
    invert = false,
    children,
    ...restProps
  } = $props();
  
  // Text color classes based on invert prop
  const textClasses = $derived(
    invert
      ? 'text-neutral-300 before:bg-white after:bg-white/10'
      : 'text-neutral-600 before:bg-neutral-950 after:bg-neutral-100'
  );
  
  // Title color classes based on invert prop
  const titleClasses = $derived(
    invert ? 'text-white' : 'text-neutral-950'
  );
</script>

<li
  class="text-base {textClasses} {className}"
  {...restProps}
>
  <FadeIn>
    <Border position="left" class="pl-8" {invert}>
      <strong class="font-semibold {titleClasses}">
        {title}.
      </strong>{' '}
      {@render children?.()}
    </Border>
  </FadeIn>
</li>
