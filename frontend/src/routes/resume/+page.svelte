<script lang="ts">
    import { personalInfo, experiences, education, achievements } from '$lib/data';
    import { formatDate } from '$lib/utils';
    import { Printer, ExternalLink } from 'lucide-svelte';
</script>

<div class="container mx-auto px-4 py-12 flex flex-col items-center">
    
    <!-- Controls -->
    <div class="w-full max-w-[210mm] flex justify-end mb-4 no-print">
        <a href="/Joel_Tan_Resume.pdf" target="_blank" class="btn variant-filled-primary">
            <Printer class="mr-2 size-4" />
            Print / Download PDF
        </a>
    </div>

    <!-- A4 Paper Resume -->
    <div class="bg-white text-black p-[15mm] md:p-[20mm] shadow-2xl w-full max-w-[210mm] min-h-[297mm] resume-paper font-sans text-sm leading-snug">
        
        <!-- Header -->
        <header class="text-center mb-6 border-b-2 border-black pb-2">
            <h1 class="text-3xl font-bold uppercase tracking-wide mb-1">{personalInfo.name}</h1>
            <div class="flex flex-wrap justify-center gap-1.5 text-sm text-black font-medium">
                <span>{personalInfo.phone}</span>
                <span>|</span>
                <a href="mailto:{personalInfo.email}" class="hover:underline">{personalInfo.email}</a>
                <span>|</span>
                <a href={personalInfo.url} target="_blank" class="hover:underline">LinkedIn</a>
                <span>|</span>
                <a href="https://github.com/joelfatnugget" target="_blank" class="hover:underline">GitHub</a>
            </div>
        </header>

        <!-- EDUCATION -->
        <section class="mb-5">
            <h2 class="text-lg font-bold uppercase border-b border-black mb-2">Education</h2>
            <div class="space-y-3">
                {#each education as edu}
                    <div class="flex flex-col">
                        <div class="flex justify-between items-baseline font-bold">
                            <span>{edu.institution}</span>
                            <span class="text-right whitespace-nowrap">{edu.location} | {formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span>
                        </div>
                        <div class="font-medium text-black">
                            {edu.degree}
                        </div>
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
                <li><span class="font-bold">Languages:</span> Python, PHP, JavaScript, CSS, Java</li>
                <li><span class="font-bold">Tools:</span> Docker, AWS, Azure, MySQL, Git, Jenkins</li>
                <li><span class="font-bold">Certifications:</span> Heicoders AI100/200, Smartcademy Data Analytics, Google Cloud Fundamentals</li>
                <li><span class="font-bold">Frameworks & Architecture:</span> RAG, REST APIs, Microservices, SwiftUI, Node.js/Express, React</li>
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

        /* Hide everything globally by default */
        :global(body) {
            visibility: hidden;
            background: white !important;
        }

        /* Specifically hide the controls to be safe */
        .no-print, :global(nav), :global(footer) {
            display: none !important;
        }

        /* Make the resume container visible and position it at the very top */
        .resume-paper {
            visibility: visible;
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 15mm 20mm !important;
            box-shadow: none !important;
            background: white !important;
            color: black !important;
            overflow: visible !important;
        }

        /* Ensure all children of the resume are visible */
        .resume-paper * {
            visibility: visible;
        }

        /* Ensure links and text are black */
        a {
            text-decoration: none !important;
            color: black !important;
        }
        .no-print-color {
            color: black !important;
        }
        
        * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
    }
</style>
