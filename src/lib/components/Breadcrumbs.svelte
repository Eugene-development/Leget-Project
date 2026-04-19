<script>
  /**
   * Breadcrumbs component - displays navigation breadcrumbs
   *
   * @prop {Array<{label: string, href?: string}>} items - Breadcrumb items.
   *   The last item is treated as the current page (no link, aria-current).
   */
  let { items = [] } = $props();
</script>

{#if items.length > 0}
  <nav aria-label="Breadcrumb">
    <ol class="flex flex-wrap items-center gap-x-2 font-display text-sm font-semibold text-neutral-500">
      {#each items as item, i}
        {@const isLast = i === items.length - 1}
        <li class="flex items-center gap-x-2">
          {#if !isLast && item.href}
            <a
              href={item.href}
              class="transition hover:text-neutral-950"
            >
              {item.label}
            </a>
            <!-- Separator -->
            <svg
              aria-hidden="true"
              class="size-3 shrink-0 text-neutral-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          {:else}
            <span class="text-neutral-950" aria-current="page">{item.label}</span>
          {/if}
        </li>
      {/each}
    </ol>
  </nav>
{/if}
