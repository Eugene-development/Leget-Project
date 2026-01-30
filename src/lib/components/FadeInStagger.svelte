<script>
  import { setContext, onMount } from 'svelte';
  
  /**
   * FadeInStagger component - provides stagger animation context for child FadeIn components
   * 
   * Based on original React implementation using Framer Motion:
   * - Uses context to communicate with child FadeIn components
   * - Provides stagger delay (0.2s default, 0.12s when faster=true)
   * - Uses IntersectionObserver to detect when group enters viewport
   * - Children animate sequentially based on their registration order
   * 
   * @prop {boolean} faster - When true, uses 0.12s delay instead of 0.2s
   * @prop {string} class - Additional CSS classes
   * @prop {Snippet} children - Child FadeIn components
   */
  let { faster = false, class: className = '', children, ...restProps } = $props();
  
  // State for tracking visibility
  let isVisible = $state(false);
  let element = $state(null);
  
  // Counter for registering children and assigning stagger indices
  let childCount = 0;
  
  /**
   * Register a child FadeIn component and return its stagger index
   * Each child calls this on mount to get its position in the stagger sequence
   */
  function registerChild() {
    const index = childCount;
    childCount++;
    return index;
  }
  
  // Calculate stagger delay based on faster prop
  // faster=true: 0.12s, faster=false: 0.2s (matches original Framer Motion staggerChildren)
  const delay = $derived(faster ? 0.12 : 0.2);
  
  // Set up context for child FadeIn components
  // Context provides:
  // - isVisible: reactive state indicating if the group is in viewport
  // - delay: the stagger delay between children
  // - registerChild: function for children to get their stagger index
  setContext('fadeInStagger', {
    get isVisible() { return isVisible; },
    get delay() { return delay; },
    registerChild
  });
  
  // Set up IntersectionObserver on mount
  onMount(() => {
    if (!element) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
            // Once visible, stop observing (once: true behavior from original)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        // Match original viewport margin: '0px 0px -200px'
        rootMargin: '0px 0px -200px 0px'
      }
    );
    
    observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  });
</script>

<div 
  bind:this={element}
  class={className}
  {...restProps}
>
  {@render children?.()}
</div>
