<script lang="ts">
    import { personalInfo, skills, projects, experiences } from '$lib/data';
    import { calculateStaggerDelay } from '$lib/utils';
    import Icon from '@iconify/svelte';
    import { 
        ArrowRight, 
        Terminal, 
        Sparkles, 
        Briefcase, 
        Zap, 
        Trophy, 
        Cpu, 
        Layers, 
        ExternalLink,
        CheckCircle2,
        FolderGit2
    } from 'lucide-svelte';
    import BloodDrive from '$lib/components/BloodDrive.svelte';

    let { data } = $props();

    // Svelte Action for Scroll Triggered Motion Reveals
    function scrollReveal(node: HTMLElement, options: { delay?: number; threshold?: number } = {}) {
        const { delay = 0, threshold = 0.15 } = options;

        node.style.transitionDelay = `${delay}ms`;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    node.classList.add('is-visible');
                    observer.unobserve(node);
                }
            });
        }, { threshold });

        observer.observe(node);

        return {
            destroy() {
                observer.disconnect();
            }
        };
    }

    const featuredProjects = projects.filter(p => p.featured).slice(0, 2);
</script>

<div class="relative overflow-hidden min-h-screen">
    <!-- Ambient Radial Mesh Background -->
    <div class="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_28px]">
        <div class="absolute left-1/2 top-1/4 -translate-x-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-primary-500/20 dark:bg-primary-500/15 blur-[140px]"></div>
    </div>

    <!-- MAIN HERO SECTION -->
    <section class="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center text-center space-y-8 relative z-10 max-w-5xl">
        
        <!-- Status Pill -->
        <div 
            use:scrollReveal={{ delay: 0 }}
            class="motion-item fade-down inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20 shadow-sm"
        >
            <span class="size-2 rounded-full bg-emerald-500 animate-ping"></span>
            Available for Software Engineering Roles
        </div>

        <!-- High-Impact Hero Headline -->
        <h1 
            use:scrollReveal={{ delay: 100 }}
            class="motion-item fade-up font-extrabold tracking-tight text-5xl sm:text-7xl lg:text-8xl leading-[1.08] text-surface-900 dark:text-white"
        >
            <span class="bg-gradient-to-r from-surface-900 via-surface-700 to-primary-600 dark:from-white dark:via-surface-200 dark:to-primary-400 bg-clip-text text-transparent">
                {personalInfo.name}
            </span>
            <br />
            <span class="text-surface-500 dark:text-surface-400 text-2xl sm:text-4xl lg:text-5xl font-light tracking-normal block mt-3">
                {personalInfo.tagline}
            </span>
        </h1>

        <!-- About Intro -->
        <p 
            use:scrollReveal={{ delay: 200 }}
            class="motion-item fade-up text-base sm:text-xl text-surface-600 dark:text-surface-300 max-w-2xl leading-relaxed"
        >
            {personalInfo.about}
        </p>

        <!-- Action Buttons -->
        <div 
            use:scrollReveal={{ delay: 300 }}
            class="motion-item fade-up flex flex-col sm:flex-row items-center gap-4 pt-2"
        >
            <a 
                href="/projects" 
                class="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-300 bg-primary-600 rounded-2xl shadow-lg shadow-primary-500/25 hover:bg-primary-700 hover:scale-105"
            >
                Explore Projects
                <ArrowRight class="ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            
            <a 
                href="/experience" 
                class="group inline-flex items-center justify-center px-8 py-3.5 text-base font-bold transition-all duration-300 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border border-surface-200 dark:border-surface-800 rounded-2xl hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-900 dark:text-white hover:scale-105 shadow-sm"
            >
                View Experience
                <Briefcase class="ml-2 size-4 text-primary-500" />
            </a>
        </div>

        <!-- 3D PERSPECTIVE CODE TERMINAL SHOWCASE (SCROLL TRIGGERED) -->
        <div 
            use:scrollReveal={{ delay: 100 }}
            class="motion-item perspective-tilt w-full max-w-3xl mt-12 text-left"
        >
            <div class="bg-surface-950 border border-surface-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-primary-500/10">
                <!-- Terminal Bar -->
                <div class="px-4 py-3 bg-surface-900/90 border-b border-surface-800 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <span class="size-3 rounded-full bg-red-500/80"></span>
                        <span class="size-3 rounded-full bg-yellow-500/80"></span>
                        <span class="size-3 rounded-full bg-green-500/80"></span>
                        <span class="text-xs font-mono text-surface-400 ml-2">joeltan.dev — zsh</span>
                    </div>
                    <div class="flex items-center gap-2 text-xs font-mono text-surface-400">
                        <Terminal class="size-3.5 text-primary-400" />
                        <span>v2.5</span>
                    </div>
                </div>

                <!-- Code Content -->
                <div class="p-6 font-mono text-xs sm:text-sm text-surface-200 leading-relaxed overflow-x-auto space-y-2">
                    <div class="text-surface-500">// Software Engineer & Fullstack Specialist</div>
                    <div>
                        <span class="text-purple-400">const</span> <span class="text-blue-400">developer</span> = &#123;
                    </div>
                    <div class="pl-4">
                        <span class="text-amber-300">name</span>: <span class="text-emerald-400">"{personalInfo.name}"</span>,
                    </div>
                    <div class="pl-4">
                        <span class="text-amber-300">location</span>: <span class="text-emerald-400">"{personalInfo.location}"</span>,
                    </div>
                    <div class="pl-4">
                        <span class="text-amber-300">latestRole</span>: <span class="text-emerald-400">"Fullstack Developer @ Visa Inc"</span>,
                    </div>
                    <div class="pl-4">
                        <span class="text-amber-300">coreTech</span>: [<span class="text-emerald-400">"Python"</span>, <span class="text-emerald-400">"React"</span>, <span class="text-emerald-400">"TypeScript"</span>, <span class="text-emerald-400">"Docker"</span>, <span class="text-emerald-400">"Next.js"</span>],
                    </div>
                    <div class="pl-4">
                        <span class="text-amber-300">impact</span>: [<span class="text-emerald-400">"98% QA Efficiency Gain"</span>, <span class="text-emerald-400">"1st Place Hackathon Winner"</span>]
                    </div>
                    <div>&#125;;</div>
                </div>
            </div>
        </div>

    </section>

    <!-- KEY IMPACT METRICS BENTO GRID (SCROLL TRIGGERED STAGGER) -->
    <section class="container mx-auto px-4 py-16 max-w-5xl relative z-10">
        <div 
            use:scrollReveal={{ delay: 0 }}
            class="motion-item fade-up text-center mb-12"
        >
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-widest border border-primary-500/20 mb-3">
                <Zap class="size-3.5" /> High Impact Engineering
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight">
                Engineering at Scale
            </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Stat 1 -->
            <div 
                use:scrollReveal={{ delay: calculateStaggerDelay(0, 100, 100) }}
                class="motion-item fade-up p-6 rounded-3xl bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border border-surface-200 dark:border-surface-800 shadow-xl hover:border-primary-500/50 hover:scale-105 transition-all duration-500 group"
            >
                <div class="p-3 rounded-2xl bg-primary-500/10 text-primary-500 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Zap class="size-6" />
                </div>
                <div class="text-4xl font-black text-surface-900 dark:text-white tracking-tight mb-1">
                    98%
                </div>
                <div class="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-2">
                    Efficiency Gain
                </div>
                <p class="text-xs text-surface-600 dark:text-surface-400 leading-relaxed">
                    Automated test creation from 8,000 to 50 man-hours with GenAI at Visa Inc.
                </p>
            </div>

            <!-- Stat 2 -->
            <div 
                use:scrollReveal={{ delay: calculateStaggerDelay(1, 100, 100) }}
                class="motion-item fade-up p-6 rounded-3xl bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border border-surface-200 dark:border-surface-800 shadow-xl hover:border-tertiary-500/50 hover:scale-105 transition-all duration-500 group"
            >
                <div class="p-3 rounded-2xl bg-tertiary-500/10 text-tertiary-500 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Trophy class="size-6" />
                </div>
                <div class="text-4xl font-black text-surface-900 dark:text-white tracking-tight mb-1">
                    1st Place
                </div>
                <div class="text-xs font-bold uppercase tracking-wider text-tertiary-600 dark:text-tertiary-400 mb-2">
                    Hackathon Winner
                </div>
                <p class="text-xs text-surface-600 dark:text-surface-400 leading-relaxed">
                    APAC Fintech Case Competition winner for new digital revenue proposals.
                </p>
            </div>

            <!-- Stat 3 -->
            <div 
                use:scrollReveal={{ delay: calculateStaggerDelay(2, 100, 100) }}
                class="motion-item fade-up p-6 rounded-3xl bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border border-surface-200 dark:border-surface-800 shadow-xl hover:border-secondary-500/50 hover:scale-105 transition-all duration-500 group"
            >
                <div class="p-3 rounded-2xl bg-secondary-500/10 text-secondary-500 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Cpu class="size-6" />
                </div>
                <div class="text-4xl font-black text-surface-900 dark:text-white tracking-tight mb-1">
                    RAG Pipeline
                </div>
                <div class="text-xs font-bold uppercase tracking-wider text-secondary-600 dark:text-secondary-400 mb-2">
                    GenAI Search
                </div>
                <p class="text-xs text-surface-600 dark:text-surface-400 leading-relaxed">
                    Vector embeddings and LLM architecture delivered to live stakeholders in 5 months.
                </p>
            </div>

            <!-- Stat 4 -->
            <div 
                use:scrollReveal={{ delay: calculateStaggerDelay(3, 100, 100) }}
                class="motion-item fade-up p-6 rounded-3xl bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border border-surface-200 dark:border-surface-800 shadow-xl hover:border-emerald-500/50 hover:scale-105 transition-all duration-500 group"
            >
                <div class="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Layers class="size-6" />
                </div>
                <div class="text-4xl font-black text-surface-900 dark:text-white tracking-tight mb-1">
                    70%
                </div>
                <div class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                    Manual Overhead Saved
                </div>
                <p class="text-xs text-surface-600 dark:text-surface-400 leading-relaxed">
                    CI/CD automated patch management pipelines for SMBC enterprise servers.
                </p>
            </div>
        </div>
    </section>

    <!-- FEATURED PROJECTS SPOTLIGHT (SCROLL TRIGGERED) -->
    <section class="container mx-auto px-4 py-16 max-w-5xl relative z-10">
        <div 
            use:scrollReveal={{ delay: 0 }}
            class="motion-item fade-up flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
            <div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-widest border border-primary-500/20 mb-3">
                    <FolderGit2 class="size-3.5" /> Featured Works
                </div>
                <h2 class="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight">
                    Highlighted Projects
                </h2>
            </div>
            <a 
                href="/projects" 
                class="inline-flex items-center gap-1.5 text-sm font-bold text-primary-600 dark:text-primary-400 hover:gap-2 transition-all"
            >
                View all projects <ArrowRight class="size-4" />
            </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {#each featuredProjects as project, i}
                <div 
                    use:scrollReveal={{ delay: calculateStaggerDelay(i, 100, 150) }}
                    class="motion-item fade-up group bg-white dark:bg-surface-900/90 backdrop-blur-md border border-surface-200 dark:border-surface-800 rounded-3xl overflow-hidden hover:border-primary-500/50 hover:shadow-2xl transition-all duration-500 flex flex-col"
                >
                    <div class="relative aspect-video overflow-hidden bg-surface-950">
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    </div>

                    <div class="p-6 sm:p-8 flex flex-col flex-grow space-y-3">
                        <h3 class="text-2xl font-bold text-surface-900 dark:text-white group-hover:text-primary-500 transition-colors">
                            {project.title}
                        </h3>
                        <p class="text-sm text-surface-600 dark:text-surface-300 leading-relaxed line-clamp-3">
                            {project.description}
                        </p>
                        <div class="flex flex-wrap gap-2 pt-4 mt-auto">
                            {#each project.tags as tag}
                                <span class="px-2.5 py-1 rounded-full bg-surface-100 dark:bg-surface-800 text-xs font-semibold text-surface-700 dark:text-surface-300 border border-surface-200 dark:border-surface-700">
                                    {tag}
                                </span>
                            {/each}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <!-- TECH STACK MARQUEE / GRID (SCROLL TRIGGERED) -->
    <section class="container mx-auto px-4 py-16 max-w-5xl relative z-10 text-center">
        <div 
            use:scrollReveal={{ delay: 0 }}
            class="motion-item fade-up mb-10"
        >
            <p class="text-xs font-bold uppercase tracking-widest text-surface-400 mb-6">Core Technologies & Infrastructure</p>
            
            <div class="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-4xl mx-auto">
                {#each skills as skill, i}
                    <div 
                        use:scrollReveal={{ delay: calculateStaggerDelay(i % 6, 50, 40) }}
                        class="motion-item zoom-in flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/70 dark:bg-surface-900/70 backdrop-blur-md border border-surface-200 dark:border-surface-800 shadow-sm hover:scale-110 hover:border-primary-500/50 transition-all duration-300 cursor-default group"
                        title={skill.name}
                    >
                        <Icon icon={skill.icon} class="text-2xl group-hover:scale-110 transition-transform" />
                        <span class="text-xs font-bold text-surface-800 dark:text-surface-200">{skill.name}</span>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Tech for Good Section -->
        {#if data?.bloodData}
            <div 
                use:scrollReveal={{ delay: 100 }}
                class="motion-item fade-up w-full pt-8"
            >
                <BloodDrive bloodData={data.bloodData} updatedAt={data.updatedAt} />
            </div>
        {/if}
    </section>
</div>

<style>
    /* CSS Motion Utilities for Scroll Reveal */
    .motion-item {
        opacity: 0;
        will-change: transform, opacity;
        transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .fade-up {
        transform: translateY(40px);
    }

    .fade-down {
        transform: translateY(-20px);
    }

    .zoom-in {
        transform: scale(0.9);
    }

    .perspective-tilt {
        transform: perspective(1000px) rotateX(10deg) scale(0.94);
    }

    :global(.motion-item.is-visible) {
        opacity: 1;
        transform: translateY(0) rotateX(0deg) scale(1);
    }
</style>
