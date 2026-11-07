import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { PROJECTS } from '../data/portfolioData';
import {
  Cpu,
  ArrowRight,
  Layers,
  Bot,
  Zap,
  ShieldCheck,
  Check,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';

interface TechnicalArchitectureShowcaseProps {
  onSelectProject: (project: ProjectItem) => void;
}

interface ArchSystem {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  tools: string[];
  metrics: { label: string; value: string }[];
  screens: { label: string; path: string; desc: string }[];
}

export const TechnicalArchitectureShowcase: React.FC<TechnicalArchitectureShowcaseProps> = ({
  onSelectProject,
}) => {
  const [activeSystemId, setActiveSystemId] = useState<string>('flow-ops-nexus');
  const [activeScreenIndex, setActiveScreenIndex] = useState<{ [key: string]: number }>({
    'flow-ops-nexus': 0,
    'btv-bos-platform': 0,
    'ai-bos-architecture': 0,
    'atrium-hub': 0,
  });

  const systems: ArchSystem[] = [
    {
      id: 'flow-ops-nexus',
      name: 'Flow Ops (Optimal Nexus Pro)',
      badge: 'Workflow Orchestration Engine',
      tagline: 'Event-driven workflow automation, visual node builder, multi-service integrations & live telemetry',
      description:
        'Engineered the complete technical architecture and user experience for Flow Ops. Features a visual node-based workflow builder, real-time execution run logs, multi-service API webhook integration, and enterprise team workspace governance.',
      tools: ['React', 'TypeScript', 'Node.js', 'Webhooks API', 'Tailwind CSS', 'System Architecture'],
      metrics: [
        { label: 'Architecture', value: 'Event-Driven' },
        { label: 'Integration', value: 'REST & Webhooks' },
        { label: 'Telemetry', value: 'Live Runs' },
      ],
      screens: [
        { label: 'Dashboard', path: '/works/technical-architecture/flow-ops/flow-ops-dashboard.png', desc: 'Central orchestration KPIs, throughput & active pipeline status' },
        { label: 'Workflow Builder', path: '/works/technical-architecture/flow-ops/flow-ops-builder.png', desc: 'Visual node-based canvas with triggers & conditional branching' },
        { label: 'Workflows', path: '/works/technical-architecture/flow-ops/flow-ops-workflows.png', desc: 'Enterprise automation catalog & state management' },
        { label: 'Integrations', path: '/works/technical-architecture/flow-ops/flow-ops-integrations.png', desc: 'Secure credential vault & multi-service connector ecosystem' },
        { label: 'Execution Runs', path: '/works/technical-architecture/flow-ops/flow-ops-runs.png', desc: 'Real-time execution telemetry, retry policies & payload inspector' },
        { label: 'Templates', path: '/works/technical-architecture/flow-ops/flow-ops-templates.png', desc: 'Pre-configured enterprise pipelines for rapid deployment' },
        { label: 'Team & RBAC', path: '/works/technical-architecture/flow-ops/flow-ops-team.png', desc: 'Role-based access control & workspace collaboration' },
      ],
    },
    {
      id: 'btv-bos-platform',
      name: 'BTV BOS - Enterprise AI Operating System',
      badge: 'All-In-One Enterprise ERP',
      tagline: 'Consolidating CRM, project delivery, double-entry finance, IoT hardware fleet & autonomous Copilot',
      description:
        'Architected an end-to-end AI-powered business operating system consolidating customer relationship management, project timeline tracking, kanban task operations, double-entry financial accounting, IoT hardware device monitoring, and an autonomous AI Copilot.',
      tools: ['React', 'TypeScript', 'Node.js/Express', 'AI Copilot', 'PostgreSQL', 'Tailwind CSS'],
      metrics: [
        { label: 'Modules', value: '7 Core Subsystems' },
        { label: 'AI Engine', value: 'Integrated Copilot' },
        { label: 'Device Fleet', value: 'Real-Time IoT Sync' },
      ],
      screens: [
        { label: 'Dashboard', path: '/works/technical-architecture/ai-business-operating-system/btv-bos-dashboard.png', desc: 'Executive dashboard with revenue metrics & operational pipeline' },
        { label: 'Clients CRM', path: '/works/technical-architecture/ai-business-operating-system/btv-bos-clients.png', desc: 'Client account management & deal stage tracking' },
        { label: 'Projects', path: '/works/technical-architecture/ai-business-operating-system/btv-bos-projects.png', desc: 'Project milestones, delivery sprints & burn-down rates' },
        { label: 'Tasks Board', path: '/works/technical-architecture/ai-business-operating-system/btv-bos-tasks.png', desc: 'Interactive Kanban board with assignee workload distribution' },
        { label: 'Finances', path: '/works/technical-architecture/ai-business-operating-system/btv-bos-finance.png', desc: 'Invoicing, payment reconciliation & financial statements' },
        { label: 'IoT Devices', path: '/works/technical-architecture/ai-business-operating-system/btv-bos-devices.png', desc: 'Fleet telemetry tracking connected hardware devices' },
        { label: 'AI Copilot', path: '/works/technical-architecture/ai-business-operating-system/btv-bos-copilot.png', desc: 'Autonomous AI assistant executing enterprise tasks' },
      ],
    },
    {
      id: 'ai-bos-architecture',
      name: 'AI BOS - Distributed Intelligence Topology',
      badge: 'Systems Architecture & Blueprints',
      tagline: 'High-availability architecture blueprints, model routing layers & multi-agent coordination schema',
      description:
        'Formulated the core architectural specifications and distributed system topology for enterprise AI deployment. Details neural model routing layers, vector retrieval pipelines, asynchronous event queues, and multi-tenant isolation layers.',
      tools: ['System Architecture', 'Distributed Systems', 'UML Blueprints', 'Vector Pipelines', 'Cloud Topology'],
      metrics: [
        { label: 'Architecture', value: 'Distributed AI' },
        { label: 'Blueprints', value: '4 Master Schemas' },
        { label: 'Availability', value: 'High Availability' },
      ],
      screens: [
        { label: 'Schema 01: Core Topology', path: '/works/technical-architecture/ai-bos/AI-BOS-1.png', desc: 'Enterprise intelligence topology & model routing pipeline' },
        { label: 'Schema 02: Multi-Agent Hub', path: '/works/technical-architecture/ai-bos/AI-BOS-2.png', desc: 'Agent coordination protocol & distributed state sync' },
        { label: 'Schema 03: Vector Pipeline', path: '/works/technical-architecture/ai-bos/AI-BOS-3.png', desc: 'Asynchronous event queues & semantic cache retrieval' },
        { label: 'Schema 04: Cloud Cluster', path: '/works/technical-architecture/ai-bos/AI-BOS-4.png', desc: 'Zero-downtime microservices infrastructure deployment' },
      ],
    },
    {
      id: 'atrium-hub',
      name: 'Atrium - Operations & Knowledge Platform',
      badge: 'Collaborative Enterprise Hub',
      tagline: 'Real-time collaborative workspace, interactive operational canvas & multi-user knowledge graph',
      description:
        'Engineered Atrium, a real-time collaborative operations platform and knowledge graph for modern engineering teams. Features modular workspace nodes, dynamic document linking, team alignment dashboards, and low-latency state synchronization.',
      tools: ['React', 'TypeScript', 'WebSockets', 'Tailwind CSS', 'Real-time State Sync'],
      metrics: [
        { label: 'Platform', value: 'Atrium Hub' },
        { label: 'Architecture', value: 'Collaborative Graph' },
        { label: 'Interface', value: 'High-Density Dark UI' },
      ],
      screens: [
        { label: 'Workspace Canvas', path: '/works/technical-architecture/atrium/atrium-1.png', desc: 'Fluid node-based content linking and dynamic visual cards' },
        { label: 'Operations View', path: '/works/technical-architecture/atrium/atrium-2.png', desc: 'Cross-functional operational deliverables & sprint timelines' },
        { label: 'Knowledge Graph', path: '/works/technical-architecture/atrium/atrium-3.png', desc: 'Connected documentation tree & relational project links' },
        { label: 'Team Presence', path: '/works/technical-architecture/atrium/atrium-4.png', desc: 'Real-time multi-user active synchronization & permissions' },
      ],
    },
  ];

  const currentSystem = systems.find((s) => s.id === activeSystemId) || systems[0];
  const currentScreenIdx = activeScreenIndex[currentSystem.id] || 0;
  const currentScreen = currentSystem.screens[currentScreenIdx] || currentSystem.screens[0];

  const handleSetScreen = (sysId: string, idx: number) => {
    setActiveScreenIndex((prev) => ({ ...prev, [sysId]: idx }));
  };

  const handleOpenDetails = () => {
    const proj = PROJECTS.find((p) => p.id === currentSystem.id);
    if (proj) {
      onSelectProject(proj);
    }
  };

  return (
    <section aria-labelledby="technical-architecture-heading" className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.08] pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[12.4px] tracking-[0.25em] uppercase font-light text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
            <span>PRIMARY DISCIPLINE &bull; SYSTEMS ENGINEERING</span>
          </div>
          <h2
            id="technical-architecture-heading"
            className="text-2xl sm:text-4xl font-extralight tracking-tight text-zinc-950 dark:text-white"
          >
            Technical Architecture &amp; Enterprise Systems
          </h2>
          <p className="max-w-2xl text-xs sm:text-sm font-light leading-relaxed text-zinc-500 dark:text-zinc-400">
            High-scale systems engineering: distributed AI topologies, event-driven workflow automation engines, all-in-one ERPs, and real-time collaborative workspaces.
          </p>
        </div>

        {/* System Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg shrink-0">
          {systems.map((sys) => (
            <button
              key={sys.id}
              onClick={() => setActiveSystemId(sys.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-light tracking-wider uppercase transition-colors cursor-pointer ${
                activeSystemId === sys.id
                  ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm font-normal'
                  : 'text-zinc-500 hover:text-zinc-950 dark:hover:text-white'
              }`}
            >
              {sys.name.split(' - ')[0].split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive System Showcase Card */}
      <div className="rounded-2xl bg-white dark:bg-[#101014] border border-black/[0.08] dark:border-white/[0.08] shadow-xl overflow-hidden p-6 sm:p-10 space-y-8 soft-shadow">
        {/* System Header Info */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-black/[0.06] dark:border-white/[0.06]">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[12.4px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                {currentSystem.badge}
              </span>
              <span className="text-zinc-400 text-xs">&bull;</span>
              <span className="text-xs text-zinc-400 font-light">
                {currentSystem.screens.length} Verified Production Screens
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-light text-zinc-950 dark:text-white">
              {currentSystem.name}
            </h3>

            <p className="text-xs sm:text-sm font-light text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
              {currentSystem.tagline}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleOpenDetails}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-950 dark:bg-white text-white dark:text-black text-xs font-light tracking-wider uppercase hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              <span>Full Specifications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Screen Switcher Filmstrip / Tabs */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-light">
            <span>Select System View / Architecture Module:</span>
            <span className="font-mono text-[12.4px]">
              {currentScreenIdx + 1} of {currentSystem.screens.length}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {currentSystem.screens.map((scr, idx) => (
              <button
                key={idx}
                onClick={() => handleSetScreen(currentSystem.id, idx)}
                className={`px-3 py-1.5 rounded-md text-xs font-light tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  currentScreenIdx === idx
                    ? 'bg-zinc-950 dark:bg-white text-white dark:text-black font-normal'
                    : 'border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {scr.label}
              </button>
            ))}
          </div>
        </div>

        {/* High-Resolution Screen Preview Frame with Mock Browser Chrome */}
        <div className="rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950 shadow-2xl">
          {/* Browser Chrome Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-white/[0.06] text-zinc-400 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-3 font-mono text-[12.4px] text-zinc-400 hidden sm:inline">
                {currentSystem.id === 'flow-ops-nexus' && 'https://flow-optimal-nexus-pro.base44.app'}
                {currentSystem.id === 'btv-bos-platform' && 'https://btv-bos.base44.app'}
                {currentSystem.id === 'ai-bos-architecture' && 'topology://ai-bos.distributed.cluster'}
                {currentSystem.id === 'atrium-hub' && 'https://atrium-workspace.internal'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[12.4px] font-mono text-zinc-400">
                {currentScreen.label}
              </span>
              <button
                onClick={handleOpenDetails}
                className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Expand full screen"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Screen Image Container */}
          <div
            onClick={handleOpenDetails}
            className="relative w-full max-h-[580px] overflow-hidden flex items-center justify-center bg-zinc-950 cursor-pointer group"
          >
            <img
              src={currentScreen.path}
              alt={`${currentSystem.name} - ${currentScreen.label}`}
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[580px] object-contain object-top group-hover:scale-[1.01] transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-4 py-2 rounded-md bg-white text-zinc-950 text-xs font-normal tracking-wider uppercase shadow-xl flex items-center gap-1.5">
                <span>Click to View Full Specification &amp; All Screens</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Caption Bar */}
          <div className="px-4 py-3 bg-zinc-900/90 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-zinc-400">
            <p className="font-light text-zinc-300">
              <strong className="text-white font-normal">{currentScreen.label}:</strong> {currentScreen.desc}
            </p>
            <div className="flex items-center gap-2 shrink-0">
              {currentSystem.tools.slice(0, 3).map((t, idx) => (
                <span key={idx} className="text-[12.4px] font-mono text-zinc-400">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics & Technical Specifications */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
          {currentSystem.metrics.map((m, i) => (
            <div
              key={i}
              className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-black/[0.04] dark:border-white/[0.04]"
            >
              <span className="text-[12.4px] font-mono uppercase text-zinc-400 block">{m.label}</span>
              <span className="text-sm font-medium text-zinc-950 dark:text-white mt-0.5 block">{m.value}</span>
            </div>
          ))}
          <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-black/[0.04] dark:border-white/[0.04]">
            <span className="text-[12.4px] font-mono uppercase text-zinc-400 block">Screens in Suite</span>
            <span className="text-sm font-medium text-zinc-950 dark:text-white mt-0.5 block">{currentSystem.screens.length} Screens</span>
          </div>
        </div>
      </div>
    </section>
  );
};
