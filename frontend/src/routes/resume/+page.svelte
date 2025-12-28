<script lang="ts">
    import { personalInfo, experiences, skills } from '$lib/data';
    import { Printer, ExternalLink } from 'lucide-svelte';

    function printResume() {
        window.print();
    }
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
    <div class="bg-white text-black p-[20mm] shadow-2xl w-full max-w-[210mm] min-h-[297mm] resume-paper">
        
        <!-- Header -->
        <header class="border-b-2 border-gray-800 pb-4 mb-6">
            <h1 class="text-4xl font-bold uppercase tracking-wide">{personalInfo.name}</h1>
            <p class="text-xl text-gray-600 mt-1">{personalInfo.title}</p>
            
            <div class="flex flex-wrap gap-4 text-sm mt-4 text-gray-600">
                <span>{personalInfo.email}</span>
                <span>•</span>
                <span>{personalInfo.location}</span>
                <span>•</span>
                <a href="https://linkedin.com" class="hover:underline">LinkedIn</a>
                <span>•</span>
                <a href="https://github.com" class="hover:underline">GitHub</a>
            </div>
        </header>

        <!-- Experience Section -->
        <section class="mb-8">
            <h2 class="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1">Experience</h2>
            
            <div class="space-y-6">
                {#each experiences as job}
                    <div class="group">
                        <div class="flex justify-between items-baseline">
                            <!-- Deep Link to Experience Page -->
                            <a 
                                href="/experience#{job.id}" 
                                class="text-lg font-bold group-hover:text-primary-600 flex items-center gap-2 transition-colors"
                                title="View details on Experience page"
                            >
                                {job.role}
                                <ExternalLink class="size-3 opacity-0 group-hover:opacity-100 transition-opacity no-print" />
                            </a>
                            <span class="font-mono text-sm text-gray-600">{job.startDate} — {job.endDate}</span>
                        </div>
                        <div class="text-md font-semibold text-gray-700 mb-2">{job.company}, {job.location}</div>
                        <ul class="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                            {#each job.description as item}
                                <li>{item}</li>
                            {/each}
                        </ul>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Skills Section -->
        <section class="mb-8">
            <h2 class="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1">Technical Skills</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h3 class="font-bold text-sm uppercase text-gray-500 mb-2">Frontend</h3>
                    <div class="flex flex-wrap gap-2">
                        {#each skills.filter(s => s.category === 'frontend') as skill}
                            <span class="text-sm border border-gray-300 px-2 py-0.5 rounded">{skill.name}</span>
                        {/each}
                    </div>
                </div>
                <div>
                    <h3 class="font-bold text-sm uppercase text-gray-500 mb-2">Backend & Tools</h3>
                    <div class="flex flex-wrap gap-2">
                        {#each skills.filter(s => s.category !== 'frontend') as skill}
                            <span class="text-sm border border-gray-300 px-2 py-0.5 rounded">{skill.name}</span>
                        {/each}
                    </div>
                </div>
            </div>
        </section>

        <!-- Education (Placeholder) -->
        <section>
            <h2 class="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1">Education</h2>
            <div>
                <div class="flex justify-between items-baseline">
                    <h3 class="font-bold">Bachelor of Science in Computer Science</h3>
                    <span class="font-mono text-sm text-gray-600">2018 — 2022</span>
                </div>
                <div class="text-sm text-gray-700">University of Technology</div>
            </div>
        </section>

    </div>
</div>

<style>
    /* Print Styles */
    @media print {
        :global(body), :global(nav), :global(footer), .no-print {
            display: none !important;
        }
        .resume-paper {
            display: block !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: none !important;
        }
        :global(main) {
            padding: 0 !important;
            margin: 0 !important;
        }
    }
</style>
