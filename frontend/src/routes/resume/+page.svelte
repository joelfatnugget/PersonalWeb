<script lang="ts">
    import { personalInfo, experiences, skills, education, achievements } from '$lib/data';
    import { formatDate } from '$lib/utils';
    import { Printer, ExternalLink } from 'lucide-svelte';

    function printResume() {
        window.print();
    }
    
    // Helper to format skills as a comma-separated string for the "Proficient in..." line
    const skillList = skills.map(s => s.name).join(', ');
</script>

<div class="container mx-auto px-4 py-12 flex flex-col items-center">
    
    <!-- Controls -->
    <div class="w-full max-w-[210mm] flex justify-end mb-4 no-print">
        <button class="btn variant-filled-primary" onclick={printResume}>
            <Printer class="mr-2 size-4" />
            Print / PDF
        </button>
    </div>

    <!-- A4 Paper Resume -->
    <div class="bg-white text-black p-[15mm] md:p-[20mm] shadow-2xl w-full max-w-[210mm] min-h-[297mm] resume-paper font-sans text-sm leading-snug">
        
        <!-- Header -->
        <header class="text-center mb-6 border-b-2 border-black pb-2">
            <h1 class="text-3xl font-bold uppercase tracking-wide mb-1">{personalInfo.name}</h1>
            <div class="flex flex-wrap justify-center gap-1 text-sm text-black font-medium">
                <span>+65 90605085</span> <!-- Hardcoded from Resume context as it's not in personalInfo object -->
                <span>|</span>
                <a href="mailto:{personalInfo.email}" class="hover:underline">{personalInfo.email}</a>
                <span>|</span>
                <a href={personalInfo.url || '#'} class="hover:underline">LinkedIn</a> <!-- Assuming URL exists or fallback -->
                <span>|</span>
                <a href="https://github.com/joelfatnugget" class="hover:underline">GitHub</a>
            </div>
        </header>

        <!-- EDUCATION -->
        <section class="mb-5">
            <h2 class="text-lg font-bold uppercase border-b border-black mb-2">Education</h2>
            <div class="space-y-3">
                {#each education as edu}
                    <div class="flex flex-col">
                        <div class="flex justify-between items-baseline font-bold">
                            <span>{edu.institution} ({edu.degree})</span>
                            <span class="text-right whitespace-nowrap">{edu.location} | {formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                        </div>
                        {#if edu.description}
                            <div class="text-black">
                                {#each edu.description as desc}
                                    <span>{desc}</span>{/each}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </section>

        <!-- EXPERIENCE -->
        <section class="mb-5">
            <h2 class="text-lg font-bold uppercase border-b border-black mb-2">Experience</h2>
            <div class="space-y-4">
                {#each experiences as job}
                    <div>
                        <div class="flex justify-between items-baseline font-bold">
                            <a 
                                href="/experience#{job.id}" 
                                class="group relative inline-flex items-center gap-2 transition-all duration-300 ease-out hover:text-primary-600 origin-left no-print-color"
                            >
                                <!-- Interactive Highlight (Web Only) -->
                                <span class="absolute -inset-x-2 -inset-y-1 bg-primary-100/50 dark:bg-primary-900/20 rounded-lg scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 no-print"></span>
                                
                                <span class="relative z-10 border-b border-dotted border-black/30 group-hover:border-transparent transition-colors">
                                    {job.company} ({job.role})
                                </span>
                                
                                <ExternalLink class="relative z-10 size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary-500 no-print" />
                            </a>
                            <span class="whitespace-nowrap">{formatDate(job.startDate)} – {formatDate(job.endDate)}</span>
                        </div>
                        
                        <ul class="list-disc list-outside ml-5 mt-1 space-y-0.5 text-black">
                            {#each job.description as item}
                                <li>{item}</li>
                            {/each}
                        </ul>
                    </div>
                {/each}
            </div>
        </section>

        <!-- SKILLS & INTERESTS -->
        <section class="mb-5">
            <h2 class="text-lg font-bold uppercase border-b border-black mb-2">Skills & Interests</h2>
            <ul class="list-disc list-outside ml-5 space-y-1">
                <li>
                    <span class="font-bold">Proficient in:</span> {skillList}
                </li>
                <li>
                    <span>Graduated from Heicoders AI100 & AI200 (Python Programming and Data Visualisation | Applied Machine Learning) and Smartcademy Data Analytics Course</span>
                </li>
            </ul>
        </section>

        <!-- ACHIEVEMENTS -->
        <section class="mb-5">
            <h2 class="text-lg font-bold uppercase border-b border-black mb-2">Achievements</h2>
            <ul class="list-disc list-outside ml-5 space-y-1">
                {#each achievements as achievement}
                    <li>{achievement}</li>
                {/each}
            </ul>
        </section>

    </div>
</div>

<style>
    /* Print Styles */
    @media print {
        @page {
            margin: 0;
            size: auto;
        }
        :global(nav), :global(footer), .no-print {
            display: none !important;
        }
        :global(body) {
            background: white !important;
            color: black !important;
        }
        :global(main) {
            padding: 0 !important;
            margin: 0 !important;
            min-height: auto !important;
            overflow: visible !important;
        }
        .resume-paper {
            display: block !important;
            box-shadow: none !important;
            padding: 15mm 20mm !important; /* Standard margin */
            margin: 0 !important;
            width: 100% !important;
            max-width: none !important;
            min-height: 0 !important;
            background: white !important;
        }
        a {
            text-decoration: none !important;
            color: black !important;
        }
        .no-print-color {
            color: black !important;
        }
    }
</style>
