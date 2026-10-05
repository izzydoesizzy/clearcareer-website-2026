import { useState } from "react";

const tabs = [
  { id: "claude-projects", label: "Claude Projects" },
  { id: "claude-code", label: "Claude Code Skills" },
  { id: "chatgpt", label: "ChatGPT Custom GPT" },
  { id: "any-ai", label: "Any AI Tool" },
];

export default function InstallGuide() {
  const [active, setActive] = useState("claude-projects");

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active === tab.id
                ? "bg-blue text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {active === "claude-projects" && <ClaudeProjectsTab />}
        {active === "claude-code" && <ClaudeCodeTab />}
        {active === "chatgpt" && <ChatGPTTab />}
        {active === "any-ai" && <AnyAITab />}
      </div>
    </div>
  );
}

function StepList({ steps }: { steps: { title: string; desc: string }[] }) {
  return (
    <div className="space-y-4">
      {steps.map((item, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue text-xs font-bold text-white">
            {i + 1}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-navy">{item.title}</h4>
            <p className="mt-0.5 text-sm text-gray-500">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Badge({ text, color = "blue" }: { text: string; color?: "blue" | "green" }) {
  const colors = color === "green"
    ? "bg-green-50 text-green-700 border-green-200"
    : "bg-blue-50 text-blue-700 border-blue-200";
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors}`}>
      {text}
    </span>
  );
}

function ClaudeProjectsTab() {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Badge text="Recommended" color="green" />
        <Badge text="Free tier works" />
      </div>
      <p className="mb-6 text-sm text-gray-500">
        Claude Projects let you upload all your prompt files and resume as persistent context.
        Every conversation in the project automatically has access to all 50 frameworks.
      </p>
      <StepList
        steps={[
          {
            title: "Create a free Claude account",
            desc: "Go to claude.ai and sign up. The free tier works fine.",
          },
          {
            title: 'Create a new Project',
            desc: 'Click "Projects" in the left sidebar, then "Create Project." Name it anything you like.',
          },
          {
            title: "Add custom instructions",
            desc: "Download the Project Instructions file above and paste its contents into the \"Custom Instructions\" box in your project settings.",
          },
          {
            title: "Upload the 6 prompt files",
            desc: 'Click "Add Project Knowledge" and upload all 6 prompt category files. These are the 50 frameworks Claude will reference.',
          },
          {
            title: "Upload your resume",
            desc: "Add your resume (PDF, DOCX, or TXT) as Project Knowledge too. This lets Claude reference your actual experience.",
          },
          {
            title: "Start a conversation",
            desc: 'Open a new chat in the project and ask for help. Try: "Write me a professional summary for a Senior PM role."',
          },
        ]}
      />
    </div>
  );
}

function ClaudeCodeTab() {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Badge text="For developers" />
        <Badge text="50 slash commands" />
      </div>
      <p className="mb-6 text-sm text-gray-500">
        Claude Code is Anthropic&apos;s CLI tool for developers. Skills are slash commands you can invoke
        from the terminal. Each of the 50 prompts becomes its own <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">/skill-name</code> command.
      </p>
      <StepList
        steps={[
          {
            title: "Download the skills package",
            desc: "Click the button below to download the zip file containing all 50 skills.",
          },
          {
            title: "Extract to your project",
            desc: 'Unzip the file and copy the folders into your project\'s .claude/skills/ directory. Create the directory if it doesn\'t exist.',
          },
          {
            title: "Open Claude Code in your project",
            desc: "Run 'claude' in your terminal from the project directory. The skills will be automatically detected.",
          },
          {
            title: "Use any skill with /skill-name",
            desc: 'Type / in Claude Code to see all available skills. For example: /write-a-professional-summary or /salary-negotiation-scripts',
          },
        ]}
      />
      <div className="mt-6">
        <a
          href="/downloads/nova/vault-claude-skills.zip"
          download
          className="inline-flex items-center gap-2 rounded-lg bg-blue px-5 py-2.5 text-sm font-bold text-white shadow hover:bg-blue-dark"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Claude Code Skills (.zip)
        </a>
        <p className="mt-2 text-xs text-gray-400">50 SKILL.md files organized in 6 category folders</p>
      </div>

      <div className="mt-6 rounded-lg bg-gray-50 border border-gray-200 p-4">
        <p className="text-xs font-semibold text-gray-500 mb-2">Directory structure after extraction:</p>
        <pre className="text-xs text-gray-600 font-mono leading-relaxed">{`.claude/skills/
├── resume/           (7 skills)
├── linkedin/         (10 skills)
├── interview/        (8 skills)
├── networking/       (9 skills)
├── market-research/  (9 skills)
└── negotiation/      (7 skills)`}</pre>
      </div>
    </div>
  );
}

function ChatGPTTab() {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Badge text="Requires ChatGPT Plus ($20/mo)" />
      </div>
      <p className="mb-6 text-sm text-gray-500">
        Create a Custom GPT that has all 50 frameworks built in. Every conversation
        will automatically use the career strategist system prompt.
      </p>
      <StepList
        steps={[
          {
            title: "Go to ChatGPT",
            desc: "Open chat.openai.com and sign in. You need a Plus subscription to create Custom GPTs.",
          },
          {
            title: 'Create a new GPT',
            desc: 'Click your profile icon > "My GPTs" > "Create a GPT." Name it "Career Prompt Vault" or whatever you like.',
          },
          {
            title: "Add instructions",
            desc: 'Switch to the "Configure" tab. Download the Project Instructions file from above and paste its contents into the "Instructions" box.',
          },
          {
            title: "Upload knowledge files",
            desc: 'Under "Knowledge," upload all 6 prompt category files. These give the GPT access to all 50 frameworks.',
          },
          {
            title: "Upload your resume",
            desc: "Also upload your resume under Knowledge. This lets the GPT reference your real experience when generating content.",
          },
          {
            title: "Save and start chatting",
            desc: 'Click "Save" (choose "Only me" for private use). Open your new GPT and start asking for career help.',
          },
        ]}
      />
    </div>
  );
}

function AnyAITab() {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Badge text="Works everywhere" color="green" />
      </div>
      <p className="mb-6 text-sm text-gray-500">
        Every prompt in the Vault works as a simple copy-paste into any AI tool: Gemini, Perplexity,
        Copilot, Mistral, or anything else. No setup required.
      </p>
      <StepList
        steps={[
          {
            title: "Open any AI chat",
            desc: "Go to your preferred AI tool (Gemini, Perplexity, Copilot, etc.).",
          },
          {
            title: "Upload your resume first",
            desc: "Most AI tools let you upload files. Add your resume so it has context about your background.",
          },
          {
            title: "Browse prompts above and click Copy",
            desc: "Scroll up to the prompt viewer. Find the prompt you need, expand it, and click the Copy button.",
          },
          {
            title: "Paste, customize, and send",
            desc: "Paste the prompt into your AI chat. Replace any [brackets] with your own details. Hit send.",
          },
        ]}
      />
      <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
        <p className="text-sm text-amber-800">
          <span className="font-semibold">Tip:</span> For company research and salary data, use an AI tool
          with web search (Perplexity, ChatGPT with browsing, or Gemini). They&apos;ll pull live data
          instead of relying on training data.
        </p>
      </div>
    </div>
  );
}
