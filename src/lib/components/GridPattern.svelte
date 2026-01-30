<script>
  import { onMount } from 'svelte';
  
  /**
   * GridPattern component - decorative SVG background pattern
   * Renders a grid of parallelogram shapes as a background element
   * Supports interactive mode where blocks appear on mouse hover
   * 
   * Based on original React implementation using Framer Motion
   * - Displays static blocks at predefined positions
   * - In interactive mode, adds animated blocks on mouse hover
   * - Uses unique IDs for pattern definitions
   * 
   * @prop {number} yOffset - Vertical offset for the pattern (default: 0)
   * @prop {boolean} interactive - Enable mouse hover interactivity (default: false)
   * @prop {string} class - Additional CSS classes
   */
  let { 
    yOffset = 0, 
    interactive = false, 
    class: className = '',
    ...restProps 
  } = $props();
  
  // Generate unique ID for pattern definition
  let id = $state('');
  let svgElement = $state(null);
  let currentBlock = $state(null);
  let counter = $state(0);
  let hoveredBlocks = $state([]);
  
  // Static blocks at predefined positions [x, y]
  const staticBlocks = [
    [1, 1],
    [2, 2],
    [4, 3],
    [6, 2],
    [7, 4],
    [5, 5],
  ];
  
  // Generate unique ID on mount (client-side only)
  onMount(() => {
    id = crypto.randomUUID();
    
    if (!interactive) {
      return;
    }
    
    function onMouseMove(event) {
      if (!svgElement) {
        return;
      }
      
      const rect = svgElement.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;
      
      // Check if mouse is within SVG bounds
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        return;
      }
      
      // Calculate grid position
      x = x - rect.width / 2 - 32;
      y = y - yOffset;
      x += Math.tan(32 / 160) * y;
      x = Math.floor(x / 96);
      y = Math.floor(y / 160);
      
      // Skip if same block as current
      if (currentBlock?.[0] === x && currentBlock?.[1] === y) {
        return;
      }
      
      currentBlock = [x, y];
      
      // Add new hovered block with unique key
      const key = counter++;
      const block = [x, y, key];
      
      // Filter out duplicate positions, keeping only the newest
      hoveredBlocks = [...hoveredBlocks, block].filter(
        (b) => !(b[0] === x && b[1] === y && b[2] !== key)
      );
    }
    
    window.addEventListener('mousemove', onMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  });
  
  /**
   * Remove a hovered block after its animation completes
   * @param {number} key - The unique key of the block to remove
   */
  function removeHoveredBlock(key) {
    hoveredBlocks = hoveredBlocks.filter((b) => b[2] !== key);
  }
  
  /**
   * Calculate transform for a block at position (x, y)
   * @param {number} x - Grid x position
   * @param {number} y - Grid y position
   */
  function getBlockTransform(x, y) {
    return `translate(${-32 * y + 96 * x} ${160 * y})`;
  }
</script>

<svg 
  bind:this={svgElement} 
  aria-hidden="true" 
  class={className}
  {...restProps}
>
  {#if id}
    <rect width="100%" height="100%" fill="url(#{id})" stroke-width="0" />
  {/if}
  
  <svg x="50%" y={yOffset} stroke-width="0" class="overflow-visible">
    <!-- Static blocks -->
    {#each staticBlocks as block}
      <path
        transform={getBlockTransform(block[0], block[1])}
        d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
      />
    {/each}
    
    <!-- Hovered blocks with fade animation -->
    {#each hoveredBlocks as block (block[2])}
      <path
        transform={getBlockTransform(block[0], block[1])}
        d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
        class="hovered-block"
        onanimationend={() => removeHoveredBlock(block[2])}
      />
    {/each}
  </svg>
  
  {#if id}
    <defs>
      <pattern
        {id}
        width="96"
        height="480"
        x="50%"
        patternUnits="userSpaceOnUse"
        patternTransform="translate(0 {yOffset})"
        fill="none"
      >
        <path d="M128 0 98.572 147.138A16 16 0 0 1 82.883 160H13.117a16 16 0 0 0-15.69 12.862l-26.855 134.276A16 16 0 0 1-45.117 320H-116M64-160 34.572-12.862A16 16 0 0 1 18.883 0h-69.766a16 16 0 0 0-15.69 12.862l-26.855 134.276A16 16 0 0 1-109.117 160H-180M192 160l-29.428 147.138A15.999 15.999 0 0 1 146.883 320H77.117a16 16 0 0 0-15.69 12.862L34.573 467.138A16 16 0 0 1 18.883 480H-52M-136 480h58.883a16 16 0 0 0 15.69-12.862l26.855-134.276A16 16 0 0 1-18.883 320h69.766a16 16 0 0 0 15.69-12.862l26.855-134.276A16 16 0 0 1 109.117 160H192M-72 640h58.883a16 16 0 0 0 15.69-12.862l26.855-134.276A16 16 0 0 1 45.117 480h69.766a15.999 15.999 0 0 0 15.689-12.862l26.856-134.276A15.999 15.999 0 0 1 173.117 320H256M-200 320h58.883a15.999 15.999 0 0 0 15.689-12.862l26.856-134.276A16 16 0 0 1-82.883 160h69.766a16 16 0 0 0 15.69-12.862L29.427 12.862A16 16 0 0 1 45.117 0H128" />
      </pattern>
    </defs>
  {/if}
</svg>

<style>
  /* Animation for hovered blocks - fade in then out */
  .hovered-block {
    animation: block-fade 1s ease-out forwards;
  }
  
  @keyframes block-fade {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
