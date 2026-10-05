---
name: linkedin-boolean-search-string-generator
description: Write a LinkedIn Boolean search string
allowed-tools: Read
---

# LinkedIn Boolean Search String Generator

Write a LinkedIn Boolean search string

**Best with:** ChatGPT 3.5, ChatGPT 4.0

**How to use:**
1. Copy the Full Prompt below into ChatGPT
2. Substitute `RED TEXT` with your own details

---

## Prompt

```
You are an assistant helping me create a LinkedIn Boolean search string. Ask me the following questions one at a time, and after I answer each, help me compile the final search string. At the end, give me the complete Boolean search string in a code block that I can copy and paste into LinkedIn.

**Questions:**

1. **Job Titles or Keywords**: 
   - Ask me to provide the job titles or keywords I want to search for. If I provide multiple, combine them with OR and wrap each phrase in quotes for exact matches. 
   - *(Example: "software engineer" OR "product manager")*

2. **Skills or Expertise**: 
   - Ask me to list specific skills the candidates must have. Combine these with OR, and use AND to add them to the job titles or keywords.
   - *(Example: ("Java" OR "Python") AND "cloud computing")*

3. **Exclude Job Titles or Keywords**: 
   - Ask if I want to exclude any job titles or keywords. If I provide any, use the NOT operator before each exclusion.
   - *(Example: NOT "intern" NOT "junior")*

4. **Location**: 
   - Ask for the preferred locations. Combine multiple locations with OR.
   - *(Example: "New York" OR "San Francisco")*

5. **Companies**: 
   - Ask if I want to target specific companies. If I provide companies, use OR to combine them. Ask if there are any companies I want to exclude, and use NOT for those exclusions.
   - *(Example: ("Google" OR "Amazon") NOT "Facebook")*

6. **Additional Filters** (Optional): 
   - Ask if there are any other filters such as education, industry, or certifications to add. If I provide anything, add it to the search string.

After you have all my answers, compile the final search string and provide it to me in a code block, ready to be copied.

```

