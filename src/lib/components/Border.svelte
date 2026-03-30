<script>
  /**
   * Border component - displays a decorative line with positioning
   * Supports left or top positioning with optional color inversion
   * 
   * @prop {string} as - HTML tag to render (default: 'div')
   * @prop {string} class - Additional CSS classes
   * @prop {'left' | 'top'} position - Position of the decorative line (default: 'top')
   * @prop {boolean} invert - Invert colors for dark backgrounds (default: false)
   * @prop {Snippet} children - Child content
   */
  let { 
    as = 'div', 
    class: className = '', 
    position = 'top', 
    invert = false,
    children,
    ...restProps
  } = $props();

  // Base classes for the pseudo-elements
  const baseClasses = 'relative before:absolute after:absolute';
  
  // Color classes based on invert prop
  const colorClasses = $derived(
    invert 
      ? 'before:bg-white after:bg-white/10'
      : 'before:bg-neutral-950 after:bg-neutral-950/10'
  );
  
  // Position-specific classes
  const positionClasses = $derived(
    position === 'top'
      ? 'before:top-0 before:left-0 before:h-px before:w-6 after:top-0 after:right-0 after:left-8 after:h-px'
      : 'before:top-0 before:left-0 before:h-6 before:w-px after:top-8 after:bottom-0 after:left-0 after:w-px'
  );
</script>

<svelte:element 
  this={as} 
  class="{baseClasses} {colorClasses} {positionClasses} {className}"
  {...restProps}
>
  {@render children?.()}
</svelte:element>
