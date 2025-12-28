<script lang="ts">
    import { socials } from '$lib/data';
    import Icon from '@iconify/svelte';
</script>

<footer class="bg-surface-100-800-token p-10 mt-auto">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="text-center md:text-left">
            <p class="font-bold text-lg">Joel Tan</p>
        </div>

        <div class="flex gap-4">
            {#each socials as social}
                <a 
                    href={social.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    class="btn-icon btn-icon-sm variant-soft-surface hover:variant-filled-primary transition-colors"
                    aria-label={social.platform}
                >
                    <Icon icon={social.icon} class="text-xl" />
                </a>
            {/each}
        </div>
    </div>
</footer>
