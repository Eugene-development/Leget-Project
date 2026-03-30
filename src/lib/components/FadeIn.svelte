<script>
  import { getContext, onMount } from 'svelte';
  
  /**
   * FadeIn component - animates children when they enter the viewport
   * Uses IntersectionObserver for viewport detection
   * Respects prefers-reduced-motion preference
   * Supports stagger context from parent FadeInStagger component
   * 
   * Based on original React implementation using Framer Motion
   * - Animates opacity from 0 to 1
   * - Animates translateY from 24px to 0 (unless reduced motion is preferred)
   * - Uses viewport margin of -200px for earlier trigger
   * - Triggers once (doesn't re-animate when scrolling back)
   * 
   * @prop {string} class - Additional CSS classes
   * @prop {Snippet} children - Child content
   */
  let { class: className = '', children, ...restProps } = $props();
  
  // State for tracking visibility and animation
  let isInView = $state(false);
  let prefersReducedMotion = $state(false);
  let element = $state(null);
  
  // Get stagger context from parent FadeInStagger (if exists)
  // Context provides: { isVisible, delay, registerChild }
  const staggerContext = getContext('fadeInStagger');
  const isInStaggerGroup = !!staggerContext;
  
  // Get stagger index for calculating delay
  let staggerIndex = $state(0);
  
  // Register with stagger parent on mount
  onMount(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion = mediaQuery.matches;
    
    // Listen for changes to the preference
    const handleChange = (e) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleChange);
    
    // Register with stagger context if in a stagger group
    if (isInStaggerGroup && staggerContext.registerChild) {
      staggerIndex = staggerContext.registerChild();
    }
    
    // Set up IntersectionObserver for viewport detection
    // Only use observer if NOT in a stagger group (stagger group handles its own observation)
    let observer = null;
    
    if (!isInStaggerGroup && element) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              isInView = true;
              // Once visible, stop observing (once: true behavior from original)
              observer?.unobserve(entry.target);
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
    }
    
    return () => {
      observer?.disconnect();
      mediaQuery.removeEventListener('change', handleChange);
    };
  });
  
  // When in stagger group, visibility is controlled by parent's isVisible state
  $effect(() => {
    if (isInStaggerGroup && staggerContext?.isVisible) {
      isInView = true;
    }
  });
  
  // Calculate delay based on stagger context
  const staggerDelay = $derived(
    isInStaggerGroup && staggerContext 
      ? staggerIndex * staggerContext.delay 
      : 0
  );
  
  // Computed styles for animation
  const animationStyles = $derived.by(() => {
    if (prefersReducedMotion) {
      // No animation for reduced motion preference - show content immediately
      return {
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'none'
      };
    }
    
    return {
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateY(0)' : 'translateY(24px)',
      // Duration 0.5s matches original Framer Motion transition
      transition: `opacity 0.5s ease ${staggerDelay}s, transform 0.5s ease ${staggerDelay}s`
    };
  });
</script>

<div 
  bind:this={element}
  class={className}
  style:opacity={animationStyles.opacity}
  style:transform={animationStyles.transform}
  style:transition={animationStyles.transition}
  {...restProps}
>
  {@render children?.()}
</div>
