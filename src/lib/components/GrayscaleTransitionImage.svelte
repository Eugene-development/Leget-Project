<script>
  /**
   * GrayscaleTransitionImage component - displays an image that transitions from grayscale to color
   * 
   * The image starts in grayscale and transitions to full color on hover.
   * Uses CSS filter: grayscale() for the effect with smooth transition.
   * 
   * Based on original React implementation using Framer Motion scroll-based animation,
   * simplified to hover-based transition for Svelte.
   * 
   * @prop {string} src - Image source URL (required)
   * @prop {string} alt - Image alt text (required for accessibility)
   * @prop {string} class - Additional CSS classes
   * @prop {any} ...restProps - All other standard img attributes (width, height, loading, etc.)
   * 
   * Requirements: 3.4 - Animate transition from grayscale to color on hover
   */
  let { 
    src,
    alt = '',
    class: className = '',
    ...restProps 
  } = $props();
  
  // Track hover state for grayscale transition
  let isHovered = $state(false);
</script>

<div 
  class="group relative"
  role="img"
  aria-label={alt}
  onmouseenter={() => isHovered = true}
  onmouseleave={() => isHovered = false}
>
  <!-- Main image with grayscale filter that transitions on hover -->
  <img
    {src}
    {alt}
    class="{className}"
    style:filter={isHovered ? 'grayscale(0)' : 'grayscale(1)'}
    style:transition="filter 0.3s ease"
    {...restProps}
  />
</div>
