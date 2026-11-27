export function evaluateAnswer(answer,question,role,type){
 const a=(answer||'').trim().toLowerCase();
 const words=a.split(/\s+/).filter(Boolean); const q=question.toLowerCase();
 const roleTerms=role.toLowerCase().split(/[^a-z0-9+#.]+/).filter(x=>x.length>2);
 const relevant=roleTerms.filter(x=>a.includes(x)).length;
 const technicalTerms=['api','database','testing','performance','security','scalability','algorithm','data structure','react','node','sql','mongodb','git','deployment','debug','architecture','trade-off'];
 const tech=technicalTerms.filter(x=>a.includes(x)).length;
 const clarity=Math.min(100,40+Math.min(40,words.length*1.5)+(a.includes('because')?10:0)+(a.includes('example')?10:0));
 const relevance=Math.min(100,45+relevant*12+(q.includes('tell')&&words.length>50?15:0));
 const technical=type==='HR'?Math.min(100,55+tech*5):Math.min(100,40+tech*8+(words.length>45?15:0));
 const overall=Math.round((relevance+clarity+technical)/3);
 const feedback=overall>=75?'Strong answer. Add one concrete result or metric to make it more convincing.':overall>=55?'Relevant start. Improve structure and include a specific example or technical decision.':'Too brief or generic. Use a clear situation, action, and result structure.';
 return {relevance,clarity,technical,overall,feedback};
}
export const interviewQuestions={HR:['Tell me about yourself and why you want this role.','Describe a challenge you faced and how you handled it.','Tell me about a time you worked in a team with different opinions.','What is one weakness you are actively improving?','Why should we hire you?'],Technical:['Explain a project you built and the key technical decisions you made.','How would you design a scalable web application for many users?','How do you debug a production issue?','Explain an API/database decision you made and its trade-offs.','How do you ensure code quality and testing?'],Mixed:['Tell me about yourself and a project you are proud of.','How would you design and secure a REST API?','Describe a difficult teamwork situation and its outcome.','How would you improve the performance of a React/Node application?','Why are you a good fit for this role, and what would you learn first?']};
