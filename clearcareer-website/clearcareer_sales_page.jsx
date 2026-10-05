import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend, LineChart, Line, CartesianGrid, Tooltip } from "recharts";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
* { box-sizing: border-box; }
input[type=range] { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: 3px; outline: none; cursor: pointer; }
input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 10px; background: #34E090; cursor: pointer; border: 3px solid #07080C; box-shadow: 0 0 8px #34E09044; }
input[type=range]::-moz-range-thumb { width: 20px; height: 20px; border-radius: 10px; background: #34E090; cursor: pointer; border: 3px solid #07080C; }`;

const c = {
  bg: "#07080C", surface: "#0D0F15", card: "#12141C", elevated: "#181B25",
  border: "#1E2233",
  accent: "#34E090", accentSoft: "#34E09012", accentMid: "#1F8A55",
  warn: "#E0A834", danger: "#E05434", dangerSoft: "#E0543410",
  info: "#349AE0", purple: "#8E5CE0",
  text: "#D8DCE8", dim: "#6A7190", muted: "#404860", faint: "#2A2F42",
  white: "#F4F5F8",
};

const fmt = n => { if (n >= 1e6) return `$${(n/1e6).toFixed(1)}M`; if (n >= 1e3) return `$${Math.round(n/1e3)}K`; return `$${n.toLocaleString()}`; };
const fmtF = n => `$${n.toLocaleString()}`;

const sources = [
  { id:1, t:"Glassdoor Economic Research, \"Layoffs Cast a Long Shadow,\" Sept 2025", u:"https://www.glassdoor.com/blog/layoffs-cast-a-long-shadow/" },
  { id:2, t:"HR Dive, \"Layoffs lead to decline in Glassdoor ratings,\" Sept 2025", u:"https://www.hrdive.com/news/layoffs-lead-to-decline-in-glassdoor-ratings/760738/" },
  { id:3, t:"CareerArc Employer Branding Study, 2022 / CBIZ, 2025", u:"https://www.cbiz.com/insights/article/outplacement-services-for-all" },
  { id:4, t:"Aberdeen Group Report, 2021 / CBIZ, 2025", u:"https://www.cbiz.com/insights/article/outplacement-services-for-all" },
  { id:5, t:"BLS, 2023 / CBIZ, 2025", u:"https://www.cbiz.com/insights/article/outplacement-services-for-all" },
  { id:6, t:"Jobago.ai, \"Maximising ROI: Outplacement for CEOs,\" 2025", u:"https://www.jobago.ai/post/maximising-roi-the-unknown-benefits-of-outplacement-services-for-ceos" },
  { id:7, t:"SparkEffect, \"Beyond Compliance: Strategic Outplacement,\" 2025", u:"https://sparkeffect.com/blog/beyond-compliance-how-strategic-outplacement-services-transform-workforce-reductions-into-competitive-advantages/" },
  { id:8, t:"WSJ / American Management Association; Insperity", u:"https://www.insperity.com/blog/providing-outplacement/" },
  { id:9, t:"IMPACT Group, \"Outplacement Services Cost,\" 2025", u:"https://impactgrouphr.com/blog/outplacement-services-cost" },
  { id:10, t:"Ontario ESA, Part XV: Termination and Severance", u:"https://www.ontario.ca/document/your-guide-employment-standards-act-0/termination-employment" },
  { id:11, t:"Hicks Morley, Dec 2025 (July 2025 ESA amendment)", u:"https://hicksmorley.com/2025/12/01/updated-employer-obligations-for-mass-terminations/" },
  { id:12, t:"Glassdoor / SJ Hemley Marketing, 2025", u:"https://sjhemleymarketing.com/blog/glassdoor-reviews-what-they-say-about-your-staffing-firm-and-why-it-matters/" },
  { id:13, t:"Gallup, 2024 (disengaged employees cost 34% of salary)", u:"https://www.glassdoor.com/blog/layoffs-cast-a-long-shadow/" },
  { id:14, t:"Research and Markets / Mordor Intelligence, 2025", u:"https://www.mordorintelligence.com/industry-reports/outplacement-market" },
  { id:15, t:"ClearCareer participant survey, 58 respondents, Dec 2024", u:null },
  { id:16, t:"Market rate research: FindMyProfession, ResumeSpice, Fiverr, PARWCC, Career Sidekick, 2025-2026", u:"https://www.findmyprofession.com/career-advice/resume-writing-service-cost/" },
];

const R = ({ ids }) => { const a = Array.isArray(ids)?ids:[ids]; return <span>{a.map((id,i)=><a key={id} href={`#ref-${id}`} style={{ fontSize:10, color:c.accent, textDecoration:"none", verticalAlign:"super", lineHeight:0, cursor:"pointer", padding:"0 1px" }} onClick={e=>{e.preventDefault();document.getElementById(`ref-${id}`)?.scrollIntoView({behavior:"smooth",block:"center"})}}>[{id}]</a>)}</span>; };
const Pull = ({ children, color=c.accent }) => <div style={{ borderLeft:`3px solid ${color}`, paddingLeft:24, margin:"32px 0", fontSize:19, fontFamily:"'Playfair Display'", color:c.white, lineHeight:1.45, fontStyle:"italic" }}>{children}</div>;
const Chapter = ({ n, title }) => <div style={{ display:"flex", alignItems:"baseline", gap:14, margin:"52px 0 18px" }}><span style={{ fontFamily:"'Playfair Display'", fontSize:14, color:c.accent, fontWeight:600 }}>{n}</span><h2 style={{ fontFamily:"'Playfair Display'", fontSize:26, fontWeight:600, margin:0, color:c.white, lineHeight:1.25 }}>{title}</h2></div>;
const Hr = () => <div style={{ height:1, background:c.border, margin:"48px 0" }} />;

const glassdoor = [{p:"Before",r:3.66},{p:"Day 1",r:3.49},{p:"30d",r:3.49},{p:"90d",r:3.48},{p:"180d",r:3.47},{p:"1yr",r:3.50},{p:"2yr",r:3.55}];
const gaps = [{g:"Personalization",i:2,cc:5},{g:"Deliverables",i:1.5,cc:5},{g:"Modern Methods",i:2,cc:4.5},{g:"AI Tools",i:1.5,cc:4.5},{g:"Engagement",i:2,cc:4},{g:"Emotional Support",i:2.5,cc:4.5},{g:"Reporting",i:2,cc:4},{g:"Speed",i:2,cc:4}];
const landing = [{r:"< 2 wks",c:3},{r:"2-4 wks",c:7},{r:"1 mo",c:7},{r:"2 mo",c:8},{r:"3-6 mo",c:9},{r:"7-12 mo",c:2},{r:"1-2 yr",c:1}];

const perEmp = [
  { label:"Litigation risk", sub:"per departing employee", low:3000, med:10000, high:25000, red:0.35 },
  { label:"EI premium increase", sub:"annual increase per claim", low:2000, med:4500, high:7000, red:0.26 },
];
const orgCosts = [
  { label:"Employer brand damage", sub:"Glassdoor drop → fewer applicants → higher recruiting", low:10000, med:40000, high:120000, red:0.50 },
  { label:"Survivor productivity", sub:"Remaining team disengages, output declines", low:15000, med:60000, high:150000, red:0.40 },
  { label:"Voluntary turnover", sub:"Remaining employees start looking", low:10000, med:50000, high:100000, red:0.31 },
];
const calcTiers = [
  { key:"starter", label:"Starter", price:1500, eff:0.55 },
  { key:"essentials", label:"Essentials", price:3000, eff:0.70 },
  { key:"complete", label:"Complete", price:5000, eff:1.00 },
  { key:"executive", label:"Executive", price:8000, eff:1.30 },
];

const valueStack = [
  { item:"Professional resume rewrite", rate:"$500–$1,500" },
  { item:"Full LinkedIn profile overhaul", rate:"$400–$800" },
  { item:"3 coaching sessions (@ $200/hr)", rate:"$600" },
  { item:"Target company research (25-30)", rate:"$300–$500" },
  { item:"Outreach system (email + LinkedIn)", rate:"$300" },
  { item:"STAR story bank (10-12 stories)", rate:"$400" },
  { item:"Custom interview prep (15-20 Q's)", rate:"$300–$600" },
  { item:"Salary negotiation framework", rate:"$300–$500" },
  { item:"AI prompt library (30+)", rate:"$200" },
  { item:"Peer cohort access + accountability", rate:"$500" },
  { item:"Ongoing support (included)", rate:"$300" },
];

export default function SalesPage() {
  const [faq, setFaq] = useState(null);
  const [emp, setEmp] = useState(10);
  const [risk, setRisk] = useState("med");
  const [cTier, setCTier] = useState("complete");

  const ct = calcTiers.find(t=>t.key===cTier);
  const orgScale = Math.max(Math.sqrt(emp/10), 0.25);
  const calc = useMemo(()=>{
    const peT = perEmp.reduce((s,i)=>s+i[risk],0)*emp;
    const peA = perEmp.reduce((s,i)=>s+i[risk]*i.red,0)*emp*ct.eff;
    const oT = orgCosts.reduce((s,i)=>s+i[risk],0)*orgScale;
    const oA = orgCosts.reduce((s,i)=>s+i[risk]*i.red,0)*orgScale*ct.eff;
    const totalRisk = Math.round(peT+oT);
    const totalAvoided = Math.round(peA+oA);
    const investment = emp*ct.price;
    const net = totalAvoided-investment;
    const pct = totalRisk>0?Math.round((investment/totalRisk)*100):0;
    return { peT:Math.round(peT), oT:Math.round(oT), totalRisk, totalAvoided, investment, net, pct };
  },[emp,risk,cTier]);

  const allBars = [...perEmp.map(i=>({name:i.label,risk:i[risk]*emp,avoided:Math.round(i[risk]*i.red*ct.eff*emp)})),...orgCosts.map(i=>({name:i.label.replace("Employer brand damage","Brand damage"),risk:Math.round(i[risk]*orgScale),avoided:Math.round(i[risk]*i.red*ct.eff*orgScale)}))];

  return (
    <div style={{ background:c.bg, minHeight:"100vh", color:c.text, fontFamily:"'DM Sans',sans-serif", overflowX:"hidden", maxWidth:"100vw" }}>
      <style>{fonts}</style>

      {/* Cover */}
      <div style={{ padding:"56px 36px 48px", borderBottom:`1px solid ${c.border}`, background:`linear-gradient(180deg,${c.surface},${c.bg})` }}>
        <div style={{ maxWidth:640 }}>
          <div style={{ fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:c.accent, marginBottom:14, fontWeight:600 }}>The Soft Landing Program · ClearCareer</div>
          <h1 style={{ fontFamily:"'Playfair Display'", fontSize:36, fontWeight:700, margin:0, lineHeight:1.15, color:c.white }}>
            What happens to your people after the layoff matters more than you think.
          </h1>

          {/* Dream Outcome */}
          <div style={{ background:c.card, borderRadius:14, padding:22, border:`1px solid ${c.accent}33`, marginTop:24 }}>
            <div style={{ fontSize:11, color:c.accent, textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:600, marginBottom:8 }}>Imagine this</div>
            <p style={{ fontSize:15, color:c.text, lineHeight:1.7, margin:0 }}>
              The layoff goes smoothly. Nobody sues. Your Glassdoor rating stays intact. The remaining team trusts leadership more than before. And three months later, your departing employees are sending you thank-you notes — because they landed somewhere better, with a system that actually helped them get there.
            </p>
            <p style={{ fontSize:14, color:c.dim, lineHeight:1.7, margin:"12px 0 0" }}>
              That's what the Soft Landing Program is designed to do.
            </p>
          </div>

          <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginTop:20 }}>
            {[{v:"120+",l:"Professionals coached"},{v:"9.5/10",l:"Recommendation score"},{v:"4.8/5",l:"Overall rating"},{v:"87%",l:"Rated 'significantly better'"}].map((s,i)=>(
              <div key={i} style={{ background:c.card, borderRadius:10, padding:"12px 16px", border:`1px solid ${c.border}` }}>
                <div style={{ fontFamily:"'Playfair Display'", fontSize:22, color:c.accent, fontWeight:700 }}>{s.v}</div>
                <div style={{ fontSize:10, color:c.dim, marginTop:2 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize:10, color:c.muted, marginTop:8 }}>ClearCareer participant survey, 58 respondents <R ids={15}/></div>
        </div>
      </div>

      <div style={{ padding:"0 36px 60px", maxWidth:720, overflowX:"hidden" }}>

        {/* 01: Stakes */}
        <Chapter n="01" title="The real cost of how you say goodbye" />
        <p style={{ fontSize:15, color:c.dim, lineHeight:1.75 }}>
          Glassdoor's research team analyzed thousands of employer reviews alongside layoff data from 2021 to 2025. After a layoff, an employer's overall rating drops 4% on average.<R ids={1}/> Even employees who <em>survived</em> the layoff posted ratings that dropped by 0.16 stars.<R ids={2}/> Ratings remain depressed for over two years.<R ids={1}/> Glassdoor estimated the total fallout at <strong style={{ color:c.danger }}>$20.8 billion</strong> in lost productivity and increased attrition across the companies studied.<R ids={1}/>
        </p>
        <div style={{ background:c.card, borderRadius:14, padding:22, border:`1px solid ${c.border}`, margin:"24px 0" }}>
          <div style={{ fontSize:12, color:c.white, fontWeight:600, marginBottom:12 }}>Glassdoor Rating After a Layoff</div>
          <div style={{ height:200 }}>
            <ResponsiveContainer><LineChart data={glassdoor}>
              <CartesianGrid stroke={c.border} strokeDasharray="3 3"/><XAxis dataKey="p" tick={{fill:c.dim,fontSize:10}} axisLine={{stroke:c.border}} tickLine={false}/>
              <YAxis domain={[3.4,3.7]} tick={{fill:c.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{background:c.card,border:`1px solid ${c.border}`,borderRadius:8,fontSize:11,color:c.text}}/>
              <Line type="monotone" dataKey="r" stroke={c.danger} strokeWidth={3} dot={{fill:c.danger,r:4}}/>
            </LineChart></ResponsiveContainer>
          </div>
          <div style={{ fontSize:10, color:c.muted, marginTop:4 }}>Source: Glassdoor Economic Research, Sept 2025 <R ids={1}/></div>
        </div>
        <p style={{ fontSize:15, color:c.dim, lineHeight:1.75 }}>
          Companies with poor reviews receive up to 30% fewer job applicants.<R ids={12}/> The way you handle this moment echoes for years.
        </p>

        {/* 02: ROI */}
        <Chapter n="02" title="The math that justifies the investment" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:12, margin:"20px 0" }}>
          {[{v:"30%",l:"Less litigation",s:"with outplacement",r:6,co:c.accent},{v:"72%",l:"Better brand perception",s:"among departing employees",r:3,co:c.info},{v:"26%",l:"Lower EI costs",s:"faster reemployment",r:4,co:c.warn},{v:"2.5×",l:"Faster landing",s:"with professional support",r:9,co:c.purple}].map((d,i)=>(
            <div key={i} style={{ background:c.card, borderRadius:12, padding:16, border:`1px solid ${c.border}` }}>
              <div style={{ fontFamily:"'Playfair Display'", fontSize:28, color:d.co, fontWeight:700 }}>{d.v}</div>
              <div style={{ fontSize:12, color:c.white, fontWeight:500, marginTop:3 }}>{d.l}</div>
              <div style={{ fontSize:11, color:c.dim, marginTop:2 }}>{d.s} <R ids={d.r}/></div>
            </div>
          ))}
        </div>
        <p style={{ fontSize:15, color:c.dim, lineHeight:1.75 }}>
          Companies with structured outplacement see 40% fewer legal claims.<R ids={6}/> Remaining employees who see colleagues treated well report 15% higher engagement.<R ids={6}/> Those who don't start quietly searching — voluntary turnover spikes 30% within six months.<R ids={7}/>
        </p>
        <Pull color={c.warn}>The question isn't whether you can afford outplacement. It's whether you can afford not to offer it.</Pull>

        {/* 03: Why Traditional Fails */}
        <Chapter n="03" title="Why the traditional model is failing" />
        <p style={{ fontSize:15, color:c.dim, lineHeight:1.75 }}>
          The outplacement market is worth $5.65 billion<R ids={14}/> — yet only about 40% of employees offered outplacement actually use it.<R ids={8}/> Because the standard experience is a portal login, pre-recorded webinars, and a coach juggling 75-100 people.<R ids={7}/>
        </p>
        <div style={{ background:c.card, borderRadius:14, padding:22, border:`1px solid ${c.border}`, margin:"22px 0" }}>
          <div style={{ fontSize:12, color:c.white, fontWeight:600, marginBottom:12 }}>What employees say about traditional outplacement:</div>
          {[{t:"30 days access to online resources that were very general and not really useful.",f:"LHH user, thelayoff.com"},{t:"Both were old and out of touch, with cookie cutter ideas.",f:"Challenger Gray user, thelayoff.com"},{t:"Companies need to stop wasting their money on these outdated outplacement companies.",f:"LHH user, thelayoff.com"}].map((q,i)=>(
            <div key={i} style={{ padding:"12px 0", borderBottom:i<2?`1px solid ${c.border}`:"none" }}>
              <div style={{ fontSize:13, color:c.text, fontStyle:"italic", lineHeight:1.5 }}>"{q.t}"</div>
              <div style={{ fontSize:10, color:c.muted, marginTop:3 }}>— {q.f}</div>
            </div>
          ))}
        </div>
        <div style={{ height:280, margin:"20px 0 6px" }}>
          <ResponsiveContainer><RadarChart data={gaps} outerRadius={100}>
            <PolarGrid stroke={c.border}/><PolarAngleAxis dataKey="g" tick={{fill:c.dim,fontSize:9,fontFamily:"'DM Sans'"}}/>
            <Radar name="Industry Avg" dataKey="i" stroke={c.danger} fill={c.danger} fillOpacity={0.1} strokeWidth={2}/>
            <Radar name="Soft Landing Program" dataKey="cc" stroke={c.accent} fill={c.accent} fillOpacity={0.1} strokeWidth={2}/>
            <Legend wrapperStyle={{fontSize:10}}/>
          </RadarChart></ResponsiveContainer>
        </div>

        {/* 04: The Soft Landing Difference */}
        <Chapter n="04" title="The Soft Landing Program" />
        <p style={{ fontSize:15, color:c.dim, lineHeight:1.75 }}>
          Built from 120+ direct engagements. We don't hand people a portal. We build each person a complete, ready-to-use job search system — and we do it <em>with</em> them. They walk away with 20+ finished assets, not homework.
        </p>

        {/* Time to first value */}
        <div style={{ background:`linear-gradient(135deg,${c.accentSoft},${c.card})`, borderRadius:14, padding:22, border:`1px solid ${c.accentMid}44`, margin:"20px 0" }}>
          <div style={{ fontSize:11, color:c.accent, textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:600, marginBottom:6 }}>Your employees feel the difference within 24 hours</div>
          <p style={{ fontSize:14, color:c.dim, lineHeight:1.65, margin:0 }}>
            The AI Intake Interview is the first thing each person completes. It reflects their achievements back to them — often surfacing accomplishments they'd forgotten or undervalued. Confidence starts rebuilding before the first coaching session even starts. Core assets are delivered within 10 business days.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:12, margin:"16px 0" }}>
          {[{i:"🛠",t:"Done-with-you assets",d:"Every deliverable is built collaboratively. AI extracts achievements. Coach refines them. The person owns the system."},{i:"👥",t:"Private peer cohort",d:"Your employees join a structured cohort — separated by company for confidentiality. Accountability, motivation, and social proof."},{i:"🤖",t:"AI-powered, human-guided",d:"AI handles research, drafting, and optimization. Coaches handle strategy, mindset, and nuance. Both together."},{i:"📊",t:"Transparent to you",d:"Weekly reports show who's active, what's been built, and where each person stands. No black box."}].map((d,i)=>(
            <div key={i} style={{ background:c.card, borderRadius:12, padding:18, border:`1px solid ${c.border}` }}>
              <div style={{ fontSize:20, marginBottom:6 }}>{d.i}</div>
              <div style={{ fontSize:13, color:c.white, fontWeight:600, marginBottom:4 }}>{d.t}</div>
              <div style={{ fontSize:12, color:c.dim, lineHeight:1.5 }}>{d.d}</div>
            </div>
          ))}
        </div>

        {/* 05: Evidence */}
        <Chapter n="05" title="What 58 past participants tell us" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:12, margin:"18px 0" }}>
          {[{v:"9.5/10",l:"Recommendation"},{v:"4.8/5",l:"Overall rating"},{v:"84%",l:"Confidence increase"},{v:"87%",l:"'Significantly better'"}].map((s,i)=>(
            <div key={i} style={{ textAlign:"center", background:c.card, borderRadius:12, padding:"16px 12px", border:`1px solid ${c.border}` }}>
              <div style={{ fontFamily:"'Playfair Display'", fontSize:28, color:c.accent, fontWeight:700 }}>{s.v}</div>
              <div style={{ fontSize:11, color:c.dim, marginTop:3 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize:10, color:c.muted, textAlign:"center", marginBottom:16 }}><R ids={15}/></div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:12, margin:"0 0 16px" }}>
          <div style={{ background:c.card, borderRadius:12, padding:18, border:`1px solid ${c.border}` }}>
            <div style={{ fontSize:12, color:c.white, fontWeight:600, marginBottom:8 }}>Time to Land</div>
            <div style={{ height:160 }}><ResponsiveContainer><BarChart data={landing}>
              <XAxis dataKey="r" tick={{fill:c.dim,fontSize:8}} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={40}/>
              <YAxis tick={{fill:c.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <Bar dataKey="c" fill={c.accent} radius={[4,4,0,0]} barSize={24}/>
            </BarChart></ResponsiveContainer></div>
            <div style={{ fontSize:10, color:c.dim }}>37/58 (64%) had landed. 46% within 4 weeks.<R ids={15}/></div>
          </div>
          <div style={{ background:c.card, borderRadius:12, padding:18, border:`1px solid ${c.border}` }}>
            <div style={{ fontSize:12, color:c.white, fontWeight:600, marginBottom:8 }}>Top Resources (out of 5)</div>
            {[{n:"Resume support",s:4.5},{n:"Email templates",s:4.4},{n:"LinkedIn",s:4.4},{n:"Accountability",s:4.4},{n:"Motivation",s:4.4},{n:"AI prompts",s:4.2}].map((r,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"4px 0" }}>
                <div style={{ flex:1, fontSize:11, color:c.text }}>{r.n}</div>
                <div style={{ width:100, height:5, background:c.faint, borderRadius:2, overflow:"hidden" }}><div style={{ height:"100%", width:`${(r.s/5)*100}%`, background:c.accent, borderRadius:2 }}/></div>
                <div style={{ fontSize:11, color:c.accent, fontWeight:600, width:24, textAlign:"right" }}>{r.s}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background:c.card, borderRadius:14, padding:20, border:`1px solid ${c.accent}33` }}>
          {[{t:"I got a job in 2 weeks after two years of looking. Izzy helps you build and grow long-term."},{t:"The emotional support of a community with a good leader is priceless."},{t:"This journey has been a booster for my confidence!"},{t:"Community accountability and resources are huge!!"}].map((q,i)=>(
            <div key={i} style={{ padding:"10px 0", borderBottom:i<3?`1px solid ${c.border}`:"none" }}>
              <div style={{ fontSize:13, color:c.text, fontStyle:"italic", lineHeight:1.5 }}>"{q.t}"</div>
              <div style={{ fontSize:10, color:c.muted, marginTop:2 }}>— Soft Landing participant <R ids={15}/></div>
            </div>
          ))}
        </div>

        {/* 06: When to explore */}
        <Chapter n="06" title="When is the right time to explore this?" />
        <p style={{ fontSize:15, color:c.dim, lineHeight:1.75 }}>
          Most companies don't think about outplacement until the layoff is happening. The right time is <strong style={{ color:c.white }}>before you need it.</strong>
        </p>
        <div style={{ background:c.card, borderRadius:14, padding:20, border:`1px solid ${c.border}`, margin:"20px 0" }}>
          {["Your company is growing fast and workforce changes are inevitable","You're in an industry undergoing AI-driven restructuring","You've done layoffs before and the experience was painful for everyone","You care about your Glassdoor rating and your ability to hire great people","You want a partner already in place — not scrambling when the moment arrives"].map((item,i)=>(
            <div key={i} style={{ display:"flex", gap:8, padding:"8px 0", borderBottom:i<4?`1px solid ${c.border}`:"none" }}>
              <span style={{ color:c.accent, flexShrink:0 }}>→</span>
              <span style={{ fontSize:13, color:c.dim, lineHeight:1.5 }}>{item}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize:15, color:c.dim, lineHeight:1.75 }}>
          In Ontario, mass termination rules trigger at 50+ employees within four weeks, requiring 8-16 weeks of notice.<R ids={10}/> As of July 2025, employers must provide a new Career Supports information sheet.<R ids={11}/>
        </p>
        <Pull color={c.info}>We offer a zero-cost retainer: name ClearCareer as your preferred provider. When a transition happens, we activate within 48 hours. You pay nothing until employees engage.</Pull>

        {/* 07: Calculator */}
        <Chapter n="07" title="Calculate your risk" />
        <p style={{ fontSize:15, color:c.dim, lineHeight:1.75, marginBottom:20 }}>Adjust the inputs to see the hidden costs of your scenario — and how a small investment protects against them.</p>

        <div style={{ marginBottom:24 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:6 }}>
            <span style={{ fontSize:13, color:c.text, fontWeight:500 }}>Employees being laid off</span>
            <span style={{ fontFamily:"'Playfair Display'", fontSize:28, color:c.accent, fontWeight:700 }}>{emp}</span>
          </div>
          <input type="range" min={1} max={50} value={emp} onChange={e=>setEmp(Number(e.target.value))} style={{ background:`linear-gradient(to right,${c.accent} 0%,${c.accent} ${((emp-1)/49)*100}%,${c.faint} ${((emp-1)/49)*100}%,${c.faint} 100%)` }}/>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:c.muted, marginTop:3 }}><span>1</span><span>50</span></div>
        </div>

        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:13, color:c.text, fontWeight:500, marginBottom:8 }}>Risk level</div>
          <div style={{ display:"flex", gap:8 }}>
            {[{k:"low",l:"Low",s:"Small exit",co:c.accent},{k:"med",l:"Medium",s:"Mid-size layoff",co:c.warn},{k:"high",l:"High",s:"Major, public",co:c.danger}].map(r=>(
              <div key={r.k} onClick={()=>setRisk(r.k)} style={{ flex:1, padding:"10px 12px", borderRadius:12, cursor:"pointer", background:risk===r.k?`${r.co}15`:c.card, border:`2px solid ${risk===r.k?r.co:c.border}` }}>
                <div style={{ fontSize:13, fontWeight:600, color:risk===r.k?r.co:c.dim }}>{r.l}</div>
                <div style={{ fontSize:10, color:c.muted, marginTop:2 }}>{r.s}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:13, color:c.text, fontWeight:500, marginBottom:8 }}>Soft Landing tier</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:8 }}>
            {calcTiers.map(t=>(<div key={t.key} onClick={()=>setCTier(t.key)} style={{ padding:"10px 12px", borderRadius:12, cursor:"pointer", background:cTier===t.key?c.accentSoft:c.card, border:`2px solid ${cTier===t.key?c.accent:c.border}` }}>
              <div style={{ fontSize:12, fontWeight:600, color:cTier===t.key?c.accent:c.dim }}>{t.label}</div>
              <div style={{ fontSize:13, color:cTier===t.key?c.accent:c.dim, fontWeight:700 }}>{fmtF(t.price)}<span style={{ fontWeight:400,fontSize:10 }}>/person</span></div>
            </div>))}
          </div>
        </div>

        <div style={{ background:c.card, borderRadius:16, padding:22, border:`1px solid ${c.border}`, marginBottom:10 }}>
          <div style={{ textAlign:"center", marginBottom:18 }}>
            <div style={{ fontSize:11, color:c.dim, marginBottom:6 }}>Your estimated total hidden risk</div>
            <div style={{ fontFamily:"'Playfair Display'", fontSize:40, color:c.danger, fontWeight:700, lineHeight:1 }}>{fmt(calc.totalRisk)}</div>
            <div style={{ display:"flex", justifyContent:"center", gap:16, marginTop:8 }}>
              <span style={{ fontSize:10, color:c.muted }}><span style={{ color:c.danger }}>●</span> {fmtF(calc.peT)} per-employee</span>
              <span style={{ fontSize:10, color:c.muted }}><span style={{ color:c.warn }}>●</span> {fmtF(calc.oT)} organizational</span>
            </div>
          </div>
          <div style={{ marginBottom:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
              <span style={{ fontSize:11, color:c.accent, fontWeight:500 }}>Your investment</span>
              <span style={{ fontSize:13, color:c.accent, fontWeight:700 }}>{fmtF(calc.investment)}</span>
            </div>
            <div style={{ height:22, background:c.faint, borderRadius:6, overflow:"hidden" }}><div style={{ height:"100%", width:`${Math.max(calc.pct,2)}%`, background:c.accent, borderRadius:6, transition:"width 0.4s" }}/></div>
          </div>
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
              <span style={{ fontSize:11, color:c.danger, fontWeight:500 }}>Hidden risk</span>
              <span style={{ fontSize:13, color:c.danger, fontWeight:700 }}>{fmtF(calc.totalRisk)}</span>
            </div>
            <div style={{ height:22, background:c.faint, borderRadius:6, overflow:"hidden" }}><div style={{ height:"100%", width:"100%", background:`linear-gradient(90deg,${c.danger},${c.danger}88)`, borderRadius:6 }}/></div>
          </div>
          <div style={{ textAlign:"center", marginTop:12, fontSize:12, color:c.dim }}>Your investment is <strong style={{ color:c.accent }}>{calc.pct}%</strong> of the risk it protects against.</div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:10 }}>
          <div style={{ background:c.card, borderRadius:12, padding:"14px 10px", border:`1px solid ${c.accent}33`, textAlign:"center" }}>
            <div style={{ fontSize:9, color:c.accent, textTransform:"uppercase", letterSpacing:"0.05em", fontWeight:600 }}>You Invest</div>
            <div style={{ fontFamily:"'Playfair Display'", fontSize:22, color:c.accent, fontWeight:700, marginTop:3 }}>{fmt(calc.investment)}</div>
          </div>
          <div style={{ background:c.card, borderRadius:12, padding:"14px 10px", border:`1px solid ${c.border}`, textAlign:"center" }}>
            <div style={{ fontSize:9, color:c.text, textTransform:"uppercase", letterSpacing:"0.05em", fontWeight:600 }}>Risk Reduced</div>
            <div style={{ fontFamily:"'Playfair Display'", fontSize:22, color:c.white, fontWeight:700, marginTop:3 }}>{fmt(calc.totalAvoided)}</div>
          </div>
          <div style={{ background:calc.net>0?c.accentSoft:c.dangerSoft, borderRadius:12, padding:"14px 10px", border:`1px solid ${calc.net>0?c.accent:c.danger}33`, textAlign:"center" }}>
            <div style={{ fontSize:9, color:calc.net>0?c.accent:c.danger, textTransform:"uppercase", letterSpacing:"0.05em", fontWeight:600 }}>Net Protection</div>
            <div style={{ fontFamily:"'Playfair Display'", fontSize:22, color:calc.net>0?c.accent:c.danger, fontWeight:700, marginTop:3 }}>{fmt(Math.abs(calc.net))}</div>
          </div>
        </div>

        <div style={{ background:c.card, borderRadius:14, padding:18, border:`1px solid ${c.border}`, marginBottom:28 }}>
          <div style={{ fontSize:12, color:c.white, fontWeight:600, marginBottom:10 }}>Risk breakdown</div>
          <div style={{ height:200 }}>
            <ResponsiveContainer><BarChart data={allBars} layout="vertical" margin={{left:0}}>
              <XAxis type="number" tick={{fill:c.dim,fontSize:9}} tickFormatter={v=>fmt(v)} axisLine={false} tickLine={false}/>
              <YAxis type="category" dataKey="name" tick={{fill:c.dim,fontSize:9}} axisLine={false} tickLine={false} width={110}/>
              <Tooltip contentStyle={{background:c.elevated,border:`1px solid ${c.border}`,borderRadius:8,fontSize:11,color:c.text}} formatter={v=>fmtF(v)}/>
              <Bar dataKey="risk" name="Total risk" fill={c.danger} radius={[0,4,4,0]} barSize={12} fillOpacity={0.3}/>
              <Bar dataKey="avoided" name="Reduced" fill={c.accent} radius={[0,4,4,0]} barSize={12}/>
            </BarChart></ResponsiveContainer>
          </div>
        </div>

        {/* 08: Programs + Value Stack */}
        <Chapter n="08" title="What your people receive" />
        <p style={{ fontSize:15, color:c.dim, lineHeight:1.75, marginBottom:14 }}>
          Each person gets a complete, functional job search system — not a platform login. Here's what that includes at the Complete tier and what it would cost to purchase each piece individually:<R ids={16}/>
        </p>

        <div style={{ background:c.card, borderRadius:14, padding:20, border:`1px solid ${c.border}`, marginBottom:20 }}>
          <div style={{ fontSize:12, color:c.white, fontWeight:600, marginBottom:12 }}>Soft Landing Complete — Value Stack</div>
          {valueStack.map((v,i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:`1px solid ${c.border}`, fontSize:13 }}>
              <span style={{ color:c.text }}>{v.item}</span>
              <span style={{ color:c.dim, fontWeight:500, whiteSpace:"nowrap", paddingLeft:12 }}>{v.rate}</span>
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0 4px", fontSize:14 }}>
            <span style={{ color:c.dim, fontWeight:600 }}>Purchased separately</span>
            <span style={{ color:c.dim, fontWeight:700 }}>$4,100–$5,900</span>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", fontSize:16 }}>
            <span style={{ color:c.accent, fontWeight:700 }}>Soft Landing Complete</span>
            <span style={{ color:c.accent, fontWeight:700, fontFamily:"'Playfair Display'", fontSize:22 }}>$5,000</span>
          </div>
          <div style={{ fontSize:11, color:c.muted, marginTop:6 }}>Per activated employee. You only pay for people who engage.</div>
        </div>

        {/* All tiers */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))", gap:10, marginBottom:14 }}>
          {[
            { name:"Soft Landing\nStarter", price:"$1,500", dur:"30 days · 1 session", best:"1-3 person exits",
              items:["AI Intake Interview","Resume rewrite","LinkedIn headline + about","10 target companies","3 job titles identified","Job search tracker"], color:c.dim },
            { name:"Soft Landing\nEssentials", price:"$3,000", dur:"60 days · 2 sessions", best:"Mid-level professionals",
              items:["Everything in Starter, plus:","Full LinkedIn overhaul","15 companies + 5 job titles","AI cover letter template","AI prompt library","Extended tracker"], color:c.info },
            { name:"Soft Landing\nComplete", price:"$5,000", dur:"90 days · 3 sessions", best:"Senior professionals", featured:true,
              items:["Everything in Essentials, plus:","15-20 CAR achievements","25-30 target companies","Outreach system","STAR story bank (10-12)","Salary negotiation framework"], color:c.accent },
            { name:"Soft Landing\nExecutive", price:"$8,000", dur:"6 months · 5 sessions", best:"Directors, VPs, C-suite",
              items:["Everything in Complete, plus:","LinkedIn content system","Full AI library (30+ prompts)","Executive networking templates","Priority same-day support","Alumni cohort included"], color:c.purple },
          ].map((t,i)=>(
            <div key={i} style={{ background:c.card, borderRadius:14, padding:18, border:`1px solid ${t.featured?c.accent+"55":c.border}`, position:"relative" }}>
              {t.featured && <div style={{ position:"absolute", top:-8, left:"50%", transform:"translateX(-50%)", background:c.accent, color:c.bg, fontSize:8, fontWeight:700, padding:"2px 10px", borderRadius:8, letterSpacing:"0.08em", whiteSpace:"nowrap" }}>RECOMMENDED</div>}
              <div style={{ fontFamily:"'Playfair Display'", fontSize:13, color:t.color, fontWeight:600, whiteSpace:"pre-line", lineHeight:1.2 }}>{t.name}</div>
              <div style={{ fontFamily:"'Playfair Display'", fontSize:26, color:c.white, fontWeight:700, margin:"3px 0" }}>{t.price}</div>
              <div style={{ fontSize:10, color:c.dim, marginBottom:8 }}>per activated employee · {t.dur}</div>
              {t.items.map((item,j)=>(
                <div key={j} style={{ fontSize:11, color:j===0&&i>0?c.dim:c.text, padding:"3px 0", lineHeight:1.35 }}>
                  {j===0&&i>0?item:<><span style={{ color:t.color, marginRight:5, fontSize:9 }}>+</span>{item}</>}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:8 }}>
          {[{l:"5-9 employees",d:"10% off"},{l:"10-19 employees",d:"15% off"},{l:"20+ employees",d:"Custom"}].map((v,i)=>(
            <div key={i} style={{ background:c.card, borderRadius:10, padding:"10px 14px", border:`1px solid ${c.border}`, display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:11, color:c.dim }}>{v.l}</span><span style={{ fontSize:12, color:c.accent, fontWeight:600 }}>{v.d}</span>
            </div>
          ))}
        </div>

        {/* 09: Guarantees + Bonuses */}
        <Chapter n="09" title="Our guarantees" />

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:12, marginBottom:20 }}>
          <div style={{ background:c.card, borderRadius:14, padding:22, border:`1px solid ${c.accent}55` }}>
            <div style={{ fontSize:11, color:c.accent, textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:600, marginBottom:8 }}>The Satisfaction Guarantee</div>
            <p style={{ fontSize:14, color:c.text, lineHeight:1.6, margin:0 }}>
              If you're not satisfied with the quality of the work after the first participant's deliverables are complete, we'll revise everything — no questions asked.
            </p>
            <p style={{ fontSize:12, color:c.dim, lineHeight:1.5, marginTop:10 }}>
              We've never had to use this. Our 9.5/10 recommendation score exists because we over-deliver. But you should feel zero risk trying us.
            </p>
          </div>
          <div style={{ background:c.card, borderRadius:14, padding:22, border:`1px solid ${c.accent}55` }}>
            <div style={{ fontSize:11, color:c.accent, textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:600, marginBottom:8 }}>The Activation Guarantee</div>
            <p style={{ fontSize:14, color:c.text, lineHeight:1.6, margin:0 }}>
              You never pay for employees who don't engage. Period. If someone doesn't complete intake and attend their kickoff, they're not activated and you're not billed.
            </p>
            <p style={{ fontSize:12, color:c.dim, lineHeight:1.5, marginTop:10 }}>
              Industry average engagement is 40%. Our cohort model drives dramatically higher activation — but the risk is ours, not yours.
            </p>
          </div>
        </div>

        {/* Bonuses */}
        <div style={{ background:c.card, borderRadius:14, padding:22, border:`1px solid ${c.purple}44`, marginBottom:20 }}>
          <div style={{ fontSize:11, color:c.purple, textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:600, marginBottom:6 }}>Included with every engagement</div>
          <div style={{ fontFamily:"'Playfair Display'", fontSize:20, color:c.white, fontWeight:600, marginBottom:14 }}>The Transition Toolkit</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:10 }}>
            {[
              { t:"Layoff Communication Playbook", d:"Internal announcement template, manager talking points, FAQ for remaining team.", v:"$500 value" },
              { t:"Glassdoor Response Guide", d:"Templates for responding to negative reviews post-layoff. Protect your employer brand.", v:"$300 value" },
              { t:"Manager Notification Script", d:"One-page script with dos and don'ts for the person delivering the news.", v:"$200 value" },
            ].map((b,i)=>(
              <div key={i} style={{ background:c.elevated, borderRadius:10, padding:14, border:`1px solid ${c.border}` }}>
                <div style={{ fontSize:12, color:c.white, fontWeight:600, marginBottom:3 }}>{b.t}</div>
                <div style={{ fontSize:11, color:c.dim, lineHeight:1.4, marginBottom:6 }}>{b.d}</div>
                <div style={{ fontSize:10, color:c.purple, fontWeight:600 }}>{b.v}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize:12, color:c.dim, marginTop:12 }}>Total value: <strong style={{ color:c.purple }}>$1,000</strong> — included free with every Soft Landing engagement.</div>
        </div>

        {/* 10: How it works */}
        <Chapter n="10" title="You only pay for people who engage" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:10 }}>
          {[{n:"01",t:"Sign the agreement",d:"Simple B2B contract. Net 30 terms. No retainer. No setup costs."},{n:"02",t:"Employees activate",d:"Each person gets their AI Intake link. Billing begins only when they complete it and attend kickoff."},{n:"03",t:"We deliver, you see results",d:"Assets built within 10 business days. Weekly reports. Complete transparency."}].map((s,i)=>(
            <div key={i} style={{ background:c.card, borderRadius:12, padding:18, border:`1px solid ${c.border}` }}>
              <div style={{ fontFamily:"'Playfair Display'", fontSize:15, color:c.accent, fontWeight:700, marginBottom:6 }}>{s.n}</div>
              <div style={{ fontSize:13, color:c.white, fontWeight:600, marginBottom:4 }}>{s.t}</div>
              <div style={{ fontSize:12, color:c.dim, lineHeight:1.5 }}>{s.d}</div>
            </div>
          ))}
        </div>

        {/* Scarcity */}
        <div style={{ background:c.card, borderRadius:10, padding:"12px 16px", border:`1px solid ${c.border}`, marginTop:16, display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:14, flexShrink:0 }}>⏳</span>
          <span style={{ fontSize:12, color:c.dim }}>We maintain a small client roster to protect our 10:1 coach-to-participant ratio. If we're at capacity when you reach out, we'll let you know our next availability.</span>
        </div>

        {/* 11: Add-ons */}
        <Chapter n="11" title="Additional support" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:10 }}>
          {[{t:"Manager Coaching",p:"$750/session",d:"60-min deep session preparing the manager to deliver layoff news with empathy. Goes beyond the free script."},{t:"Survivor Workshop",p:"$1,500",d:"90-min virtual workshop for the remaining team. Processing change, maintaining morale. Up to 20 people."},{t:"Ongoing Support",p:"Included",d:"All participants receive continued cohort access, async support, and group calls. No extra charge. No expiry."}].map((a,i)=>(
            <div key={i} style={{ background:c.card, borderRadius:12, padding:16, border:`1px solid ${c.border}` }}>
              <div style={{ fontSize:13, color:c.white, fontWeight:600 }}>{a.t}</div>
              <div style={{ fontSize:15, color:c.purple, fontWeight:700, fontFamily:"'Playfair Display'", margin:"4px 0 8px" }}>{a.p}</div>
              <div style={{ fontSize:12, color:c.dim, lineHeight:1.5 }}>{a.d}</div>
            </div>
          ))}
        </div>

        {/* 12: FAQ */}
        <Chapter n="12" title="Questions you're probably asking" />
        {[
          {q:"What are your placement rates?",a:"Of 58 surveyed participants, 64% had landed at time of survey. We lead with deliverables — a complete job search system built with each person — not placement guarantees. And our Satisfaction Guarantee means if you're not happy with the quality, we revise everything."},
          {q:"What if someone doesn't engage?",a:"Our AI intake creates an early win that pulls people in. The cohort creates accountability. We report engagement weekly. If someone doesn't activate, you're not billed — that's the Activation Guarantee."},
          {q:"How are you different from LHH or Randstad?",a:"Personalization. We build every asset with each person rather than handing them a platform. Our ratio is ~10:1 vs. their 75-100:1. Each company gets a private cohort. And you only pay for people who engage."},
          {q:"Do you have coaching certifications?",a:"We don't hold a formal certification. Our work is grounded in 120+ engagements and a 9.5/10 recommendation score. We connect you with past participants on request."},
          {q:"How quickly can you start?",a:"48 hours from contract signing. AI Intake link on day one. Core assets delivered within 10 business days. Most large firms take 2-4 weeks."},
          {q:"What reporting do we get?",a:"Weekly reports: intake status, assets completed, sessions attended, engagement level, and current status per participant. You always know where your investment is going."},
        ].map((f,i)=>(
          <div key={i} style={{ borderBottom:`1px solid ${c.border}` }}>
            <div onClick={()=>setFaq(faq===i?null:i)} style={{ padding:"14px 0", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:14, color:c.white, fontWeight:500, paddingRight:14 }}>{f.q}</span>
              <span style={{ color:c.accent, fontSize:18, fontWeight:300, flexShrink:0, transition:"transform 0.2s", transform:faq===i?"rotate(45deg)":"none" }}>+</span>
            </div>
            {faq===i && <div style={{ fontSize:13, color:c.dim, lineHeight:1.6, paddingBottom:14 }}>{f.a}</div>}
          </div>
        ))}

        {/* About */}
        <Hr/>
        <div style={{ fontSize:10, letterSpacing:"0.15em", textTransform:"uppercase", color:c.accent, marginBottom:8, fontWeight:600 }}>About ClearCareer</div>
        <p style={{ fontSize:14, color:c.dim, lineHeight:1.7 }}>
          The Soft Landing Program was built by Izzy Piyale-Sheard. 14+ years across SaaS, ed-tech, and career services. 120+ professionals coached. 3,500+ workshop attendees at U of T, Microsoft, and more.
        </p>
        <p style={{ fontSize:13, color:c.accent, marginTop:10 }}>linkedin.com/in/izzydoesizzy · joinclearcareer.com</p>

        {/* CTA */}
        <div style={{ background:`linear-gradient(135deg,${c.accentSoft},${c.card})`, borderRadius:16, padding:32, border:`1px solid ${c.accentMid}55`, textAlign:"center", margin:"36px 0" }}>
          <div style={{ fontFamily:"'Playfair Display'", fontSize:24, fontWeight:700, color:c.white, marginBottom:8, lineHeight:1.25 }}>Ready to give your people a soft landing?</div>
          <p style={{ fontSize:13, color:c.dim, marginBottom:20 }}>Book a 20-minute call. No pitch deck, no pressure.</p>
          <div style={{ display:"inline-block", padding:"12px 30px", background:c.accent, color:c.bg, fontWeight:600, fontSize:14, borderRadius:10, cursor:"pointer" }}>Book a Call →</div>
        </div>

        {/* References */}
        <div style={{ borderTop:`1px solid ${c.border}`, padding:"28px 0 16px" }}>
          <div style={{ fontSize:10, color:c.dim, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:14, fontWeight:600 }}>References</div>
          {sources.map(s=>(
            <div key={s.id} id={`ref-${s.id}`} style={{ display:"flex", gap:8, padding:"4px 0", fontSize:10, lineHeight:1.5 }}>
              <span style={{ color:c.accent, fontWeight:600, flexShrink:0, width:22 }}>[{s.id}]</span>
              <span style={{ color:c.dim }}>{s.t}{s.u && <>{" "}<a href={s.u} target="_blank" rel="noopener noreferrer" style={{ color:c.accentMid, textDecoration:"underline", wordBreak:"break-all" }}>{s.u.replace("https://","").substring(0,55)}{s.u.length>63?"…":""}</a></>}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop:`1px solid ${c.border}`, padding:"16px 0", textAlign:"center" }}>
          <div style={{ fontSize:10, color:c.muted }}>The Soft Landing Program · ClearCareer · Toronto, Canada</div>
          <div style={{ fontSize:10, color:c.muted, marginTop:3 }}>joinclearcareer.com · linkedin.com/in/izzydoesizzy</div>
        </div>
      </div>
    </div>
  );
}
