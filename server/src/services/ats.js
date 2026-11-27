const skills=['javascript','typescript','react','node.js','node','express','mongodb','mongoose','sql','python','java','c++','git','docker','aws','azure','rest api','graphql','html','css','tailwind','redux','next.js','testing','jest','communication','leadership','problem solving','data structures','algorithms','system design'];
const stop=new Set(['the','and','for','with','that','this','from','your','you','our','are','job','role','work','will','have','has','into','about','their','using','required','skills','experience','years','team']);
const normalize=s=>(s||'').toLowerCase().replace(/[^a-z0-9+#. ]/g,' ');
export function analyzeATS(resume, jd, role){
 const r=normalize(resume), j=normalize(jd+' '+role);
 const matchedSkills=skills.filter(x=>r.includes(x));
 const jdSkills=skills.filter(x=>j.includes(x));
 const missingSkills=jdSkills.filter(x=>!r.includes(x));
 const words=[...new Set(j.split(/\s+/).map(w=>w.trim()).filter(w=>w.length>4&&!stop.has(w)))];
 const keywordMatches=words.filter(w=>r.includes(w)).slice(0,25);
 const skillScore=jdSkills.length?Math.round(matchedSkills.filter(x=>jdSkills.includes(x)).length/jdSkills.length*70):35;
 const keywordScore=words.length?Math.round(keywordMatches.length/Math.min(words.length,25)*30):15;
 const score=Math.min(100,skillScore+keywordScore);
 const suggestions=[];
 if(missingSkills.length) suggestions.push(`Add evidence for: ${missingSkills.slice(0,8).join(', ')}.`);
 if(!r.includes('achievement')&&!r.includes('improved')&&!r.includes('%')) suggestions.push('Use measurable achievements and impact metrics in experience bullets.');
 if(!r.includes('project')) suggestions.push('Add 2–3 relevant projects aligned with the target role.');
 if(!r.includes('github')&&!r.includes('linkedin')) suggestions.push('Include portfolio/GitHub/LinkedIn links when relevant.');
 if(score<70) suggestions.push('Mirror important job-description terminology naturally in your resume.');
 return {score,matchedSkills:matchedSkills.filter(x=>jdSkills.includes(x)).slice(0,20),missingSkills:missingSkills.slice(0,20),keywordMatches,suggestions};
}
