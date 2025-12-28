<script lang="ts">
    import { personalInfo, skills } from '$lib/data';
    import Icon from '@iconify/svelte';
    import { ArrowRight, Download } from 'lucide-svelte';
    import BloodDrive from '$lib/components/BloodDrive.svelte';

    let { data } = $props();
</script>

<div class="relative overflow-hidden">
    <!-- Rich Background Pattern -->
    <div class="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary-500 opacity-20 blur-[100px]"></div>
    </div>

    <div class="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center min-h-[60vh] md:min-h-[70vh] text-center space-y-6">
        
        <!-- Hero Text -->
        <h1 class="h1 font-bold tracking-tighter max-w-4xl text-5xl md:text-7xl lg:text-8xl animate-fade-in-up delay-100 leading-[1.1]">
            <span class="bg-gradient-to-r from-gray-900 via-gray-500 to-gray-900 dark:from-white dark:via-gray-400 dark:to-white bg-clip-text text-transparent box-decoration-clone bg-[length:200%_auto] animate-shimmer">
                {personalInfo.name}
            </span>
            <br />
            <span class="text-surface-600 dark:text-surface-400 text-2xl md:text-4xl lg:text-5xl font-light">
                {personalInfo.tagline}
            </span>
        </h1>

        <p class="text-lg md:text-xl text-surface-600 dark:text-surface-300 max-w-2xl animate-fade-in-up delay-200 leading-relaxed">
            {personalInfo.about}
        </p>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300 pt-4">
            <a href="/projects" class="group relative inline-flex items-center justify-center px-8 py-3.5 text-lg font-bold text-white transition-all duration-200 bg-primary-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 hover:bg-primary-700 hover:scale-105 shadow-lg shadow-primary-500/30">
                View Work
                <ArrowRight class="ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1" />
                <div class="absolute -inset-3 rounded-xl bg-gradient-to-r from-primary-400 to-tertiary-400 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-200" />
            </a>
            
            <a href="/resume" class="group inline-flex items-center justify-center px-8 py-3.5 text-lg font-bold transition-all duration-200 bg-transparent border-2 border-surface-300 dark:border-surface-700 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 hover:border-surface-400 dark:hover:border-surface-600 text-surface-900 dark:text-white">
                Resume
                <Download class="ml-2 size-5 transition-transform duration-300 group-hover:translate-y-1" />
            </a>
        </div>

        <!-- Tech Stack -->
        <div class="mt-16 w-full max-w-5xl animate-fade-in-up delay-500">
            <p class="text-xs font-bold uppercase tracking-widest text-surface-400 mb-6">Technologies</p>
            
            <div class="flex flex-wrap justify-center gap-8 md:gap-12 opacity-80">
                {#each skills as skill}
                    <div class="flex flex-col items-center gap-2 group transition-transform hover:-translate-y-1 duration-300">
                        <Icon icon={skill.icon} class="text-4xl md:text-5xl grayscale group-hover:grayscale-0 transition-all duration-300" />
                    </div>
                {/each}
            </div>
        </div>

        <!-- Tech for Good -->
        <div class="w-full px-4 animate-fade-in-up delay-500">
            <BloodDrive bloodData={data.bloodData} updatedAt={data.updatedAt} />
        </div>

    </div>
</div>

<style>
    /* Simple entrance animations */
    .animate-fade-in-up {
        animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0;
        transform: translateY(20px);
    }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-500 { animation-delay: 0.5s; }

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Text Shimmer Effect */
    :global(.animate-shimmer) {
        animation: shimmer 5s linear infinite;
    }
    @keyframes shimmer {
        0% {
            background-position: 0% 50%;
        }
        100% {
            background-position: 200% 50%;
        }
    }
</style>
