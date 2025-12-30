<script lang="ts">
	import { page } from '$app/stores';
    // import { AppBar } from '@skeletonlabs/skeleton';

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/experience', label: 'Experience' },
        { href: '/projects', label: 'Projects' },
        { href: '/applications', label: 'Applications' },
        { href: '/resume', label: 'Resume' },
    ];
</script>

<div class="p-4 bg-transparent backdrop-blur-sm fixed top-0 w-full z-50 transition-all duration-300 flex justify-between items-center">
	<!-- {#snippet lead()} -->
        <a href="/" class="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
            Joel<span class="text-primary-500">.</span>Tan
        </a>
	<!-- {/snippet} -->

	<!-- {#snippet trail()} -->
    <div class="flex items-center gap-4">
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-6">
            {#each navLinks as link}
                <a 
                    href={link.href} 
                    class="text-sm font-medium transition-colors hover:text-primary-500 {$page.url.pathname === link.href ? 'text-primary-500 font-bold' : 'text-surface-600 dark:text-surface-300'}"
                >
                    {link.label}
                </a>
            {/each}
        </nav>
    </div>
	<!-- {/snippet} -->
</div>
