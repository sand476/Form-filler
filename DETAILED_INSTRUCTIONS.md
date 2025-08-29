# Detailed Instructions for Q&A Collection System

## 🚀 How to Run the System

### Step 1: Quick Start (5 minutes)
1. **Download all files** to your computer
2. **Open `index.html`** in any web browser (Chrome, Firefox, Safari, Edge)
3. **Test the system**:
   - Enter `Q101` in the question code field
   - Click "Find Question"
   - Fill in the 3 answer fields
   - Click "Submit Answers"
   - You'll see a "Thank You" message

### Step 2: Set Up Google Sheets Backend (15 minutes)

#### A. Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Blank" to create a new spreadsheet
3. Name it "Q&A Collection System"
4. Keep this tab open

#### B. Create Google Apps Script
1. In your Google Sheet, click **Extensions** → **Apps Script**
2. A new tab will open with the Apps Script editor
3. Delete any existing code in the editor
4. Copy the entire content from `google-apps-script.js`
5. Paste it into the Apps Script editor
6. Click **Save** (Ctrl+S or Cmd+S)
7. Name the project "Q&A Collection Backend"

#### C. Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Click **Select type** → **Web app**
3. Set the following:
   - **Description**: Q&A Collection System v2
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Click **Authorize access** if prompted
6. **Copy the Web App URL** (you'll need this)

#### D. Initialize the Sheet
1. In the Apps Script editor, click the **Run** button next to `setupWebApp`
2. Click **Review permissions** if prompted
3. Check the execution log for success message
4. Go back to your Google Sheet
5. You should see a new sheet called "QAResponses" with blue headers

**If you get an error:**
- Make sure you're running `setupWebApp()` and not `doPost()`
- Check that you have permission to edit the spreadsheet
- Try running `testSetup()` to diagnose issues

#### E. Connect Frontend to Backend
1. Open `index.html` in a text editor (Notepad, VS Code, etc.)
2. Find this line: `const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your actual Web App URL
4. Save the file
5. Refresh the browser page

## 📝 How to Add Module-Based Questions with Sub-Questions

### Understanding the Structure
The system supports module-based questions where each module has:
- **Main Question**: The primary question
- **3 Sub-Questions**: Specific aspects to address

### Method 1: Simple Module Questions (Recommended)

#### Step 1: Plan Your Modules
Decide on your modules, for example:
- **Module 1**: Leadership Skills (Q101-Q103)
- **Module 2**: Problem Solving (Q104-Q106)
- **Module 3**: Communication (Q107-Q109)
- **Module 4**: Teamwork (Q110-Q112)

#### Step 2: Create Questions
For each module, create 3 related questions:

**Example - Leadership Module:**
```javascript
'Q101': 'Describe your leadership style and how it has evolved over time.',
'Q102': 'What leadership challenges have you faced and how did you overcome them?',
'Q103': 'How do you motivate and inspire team members to achieve their best?'
```

**Example - Problem Solving Module:**
```javascript
'Q104': 'Walk us through a complex problem you solved step by step.',
'Q105': 'How do you approach problems when you don\'t have all the information?',
'Q106': 'Describe a time when your initial solution failed and how you adapted.'
```

### Method 2: Advanced Module Structure with Sub-Questions

#### Step 1: Create Module-Based Question Format
Modify the questions to include sub-questions within each main question:

**Example Structure:**
```javascript
'Q101': 'Leadership Assessment: Please address the following aspects of your leadership experience: 1) Your leadership philosophy and style, 2) A challenging leadership situation you handled, 3) How you develop and mentor team members.',
'Q102': 'Problem-Solving Approach: Describe your problem-solving methodology covering: 1) How you analyze and break down complex problems, 2) Your decision-making process under pressure, 3) How you learn from failed solutions.',
'Q103': 'Communication Skills: Explain your communication effectiveness in: 1) Presenting ideas to senior management, 2) Resolving conflicts between team members, 3) Adapting communication style for different audiences.'
```

#### Step 2: Update Answer Labels
You can customize the answer labels to match your sub-questions:

**In the HTML, change the labels:**
```html
<label for="answer1" class="answer-label">Leadership Philosophy:</label>
<label for="answer2" class="answer-label">Challenging Situation:</label>
<label for="answer3" class="answer-label">Team Development:</label>
```

### Method 3: Dynamic Module System (Advanced)

#### Step 1: Create Module Configuration
Add this to your JavaScript in `index.html`:

```javascript
// Module configuration
const moduleConfig = {
    'LEADERSHIP': {
        name: 'Leadership Assessment',
        questions: {
            'Q101': {
                main: 'Leadership Philosophy and Style',
                sub1: 'Describe your core leadership principles',
                sub2: 'How has your leadership style evolved?',
                sub3: 'What leadership challenges have you overcome?'
            },
            'Q102': {
                main: 'Team Motivation and Development',
                sub1: 'How do you motivate team members?',
                sub2: 'Describe your mentoring approach',
                sub3: 'How do you handle underperforming team members?'
            }
        }
    },
    'PROBLEM_SOLVING': {
        name: 'Problem Solving and Decision Making',
        questions: {
            'Q103': {
                main: 'Complex Problem Analysis',
                sub1: 'How do you break down complex problems?',
                sub2: 'Describe your decision-making process',
                sub3: 'How do you handle uncertainty in problem-solving?'
            }
        }
    }
};
```

#### Step 2: Update the Question Display Function
Replace the `findQuestion()` function with this enhanced version:

```javascript
function findQuestion() {
    const code = questionCodeInput.value.trim().toUpperCase();
    
    if (!code) {
        showError('Please enter a question code.');
        return;
    }

    showLoading(true);
    errorMessage.style.display = 'none';

    setTimeout(() => {
        // Check if it's a module-based question
        const moduleQuestion = findModuleQuestion(code);
        
        if (moduleQuestion) {
            // Display module question with sub-questions
            displayModuleQuestion(moduleQuestion);
        } else {
            // Display regular question
            const question = questionsDatabase[code];
            if (question) {
                questionText.textContent = question;
                questionSection.style.display = 'block';
                thankYou.style.display = 'none';
                questionCodeInput.disabled = true;
                findQuestionBtn.disabled = true;
            } else {
                showError('Question code not found. Please check the code and try again.');
            }
        }
        
        showLoading(false);
    }, 1000);
}

function findModuleQuestion(code) {
    for (const moduleKey in moduleConfig) {
        const module = moduleConfig[moduleKey];
        if (module.questions[code]) {
            return {
                code: code,
                module: module,
                question: module.questions[code]
            };
        }
    }
    return null;
}

function displayModuleQuestion(moduleQuestion) {
    const { code, module, question } = moduleQuestion;
    
    // Update question text
    questionText.innerHTML = `
        <h3>${module.name}</h3>
        <h4>${question.main}</h4>
        <p><strong>Please address the following three aspects:</strong></p>
        <ol>
            <li>${question.sub1}</li>
            <li>${question.sub2}</li>
            <li>${question.sub3}</li>
        </ol>
    `;
    
    // Update answer labels
    document.querySelector('label[for="answer1"]').textContent = question.sub1;
    document.querySelector('label[for="answer2"]').textContent = question.sub2;
    document.querySelector('label[for="answer3"]').textContent = question.sub3;
    
    // Show the question section
    questionSection.style.display = 'block';
    thankYou.style.display = 'none';
    questionCodeInput.disabled = true;
    findQuestionBtn.disabled = true;
}
```

## 📋 Complete Example: 40 Module-Based Questions

Here's a complete example you can use as a template:

```javascript
const questionsDatabase = {
    // LEADERSHIP MODULE (Q101-Q110)
    'Q101': 'Leadership Philosophy: Describe your core leadership principles, how your style has evolved, and key leadership challenges you\'ve overcome.',
    'Q102': 'Team Motivation: Explain how you motivate team members, your mentoring approach, and how you handle underperforming individuals.',
    'Q103': 'Strategic Leadership: Describe your strategic thinking process, how you align team goals with organizational objectives, and your approach to change management.',
    'Q104': 'Decision Making: Explain your decision-making framework, how you handle conflicting priorities, and your approach to risk assessment.',
    'Q105': 'Communication Leadership: Describe how you communicate vision to teams, handle difficult conversations, and build consensus among stakeholders.',
    'Q106': 'Crisis Leadership: Share how you lead during crises, maintain team morale under pressure, and make quick but informed decisions.',
    'Q107': 'Innovation Leadership: Explain how you foster creativity, encourage new ideas, and balance innovation with operational stability.',
    'Q108': 'Cross-functional Leadership: Describe leading diverse teams, managing stakeholders from different departments, and achieving cross-functional goals.',
    'Q109': 'Performance Management: Explain your approach to setting expectations, providing feedback, and developing team capabilities.',
    'Q110': 'Leadership Development: Describe how you develop leadership skills in others, create succession plans, and build leadership pipelines.',

    // PROBLEM SOLVING MODULE (Q111-Q120)
    'Q111': 'Complex Problem Analysis: Explain your systematic approach to breaking down complex problems, identifying root causes, and developing solutions.',
    'Q112': 'Data-Driven Decision Making: Describe how you use data to inform decisions, analyze trends, and validate assumptions.',
    'Q113': 'Creative Problem Solving: Explain your approach to thinking outside the box, generating alternative solutions, and overcoming mental blocks.',
    'Q114': 'Risk Assessment: Describe your risk evaluation process, how you weigh pros and cons, and your approach to uncertainty.',
    'Q115': 'Implementation Planning: Explain how you plan solution implementation, anticipate obstacles, and ensure successful execution.',
    'Q116': 'Learning from Failure: Describe how you analyze failed solutions, extract lessons learned, and apply insights to future problems.',
    'Q117': 'Collaborative Problem Solving: Explain how you involve others in problem-solving, leverage diverse perspectives, and build consensus.',
    'Q118': 'Time Management in Problem Solving: Describe how you prioritize problems, manage time constraints, and balance quality with speed.',
    'Q119': 'Technology in Problem Solving: Explain how you leverage technology, tools, and systems to enhance problem-solving effectiveness.',
    'Q120': 'Continuous Improvement: Describe your approach to refining solutions, measuring outcomes, and driving ongoing optimization.',

    // COMMUNICATION MODULE (Q121-Q130)
    'Q121': 'Presentation Skills: Describe your approach to preparing presentations, engaging audiences, and delivering impactful messages.',
    'Q122': 'Written Communication: Explain your writing process, how you adapt tone for different audiences, and ensure clarity in written materials.',
    'Q123': 'Active Listening: Describe your listening techniques, how you ensure understanding, and respond appropriately to others.',
    'Q124': 'Conflict Resolution: Explain your approach to resolving conflicts, facilitating difficult conversations, and finding common ground.',
    'Q125': 'Stakeholder Communication: Describe how you communicate with different stakeholders, manage expectations, and build relationships.',
    'Q126': 'Feedback Delivery: Explain your approach to giving constructive feedback, receiving criticism, and fostering open communication.',
    'Q127': 'Cross-cultural Communication: Describe your experience with diverse audiences, cultural sensitivity, and adapting communication styles.',
    'Q128': 'Crisis Communication: Explain how you communicate during crises, maintain transparency, and manage information flow.',
    'Q129': 'Influence and Persuasion: Describe your techniques for influencing others, building credibility, and gaining buy-in.',
    'Q130': 'Digital Communication: Explain your approach to virtual communication, using digital tools effectively, and maintaining engagement online.',

    // TEAMWORK MODULE (Q131-Q140)
    'Q131': 'Team Collaboration: Describe your approach to working with diverse teams, building trust, and fostering collaboration.',
    'Q132': 'Role Flexibility: Explain how you adapt to different team roles, support others, and contribute to team success.',
    'Q133': 'Team Building: Describe your experience building cohesive teams, creating positive culture, and developing team dynamics.',
    'Q134': 'Remote Teamwork: Explain your approach to virtual collaboration, maintaining team connections, and ensuring productivity.',
    'Q135': 'Cross-functional Teams: Describe working with teams from different departments, managing dependencies, and achieving shared goals.',
    'Q136': 'Team Performance: Explain how you contribute to team success, measure performance, and drive continuous improvement.',
    'Q137': 'Mentoring and Coaching: Describe your approach to developing others, sharing knowledge, and supporting team growth.',
    'Q138': 'Conflict Management: Explain how you handle team conflicts, mediate disputes, and maintain positive relationships.',
    'Q139': 'Team Recognition: Describe how you acknowledge contributions, celebrate successes, and motivate team members.',
    'Q140': 'Team Innovation: Explain how you foster creativity in teams, encourage new ideas, and drive innovation initiatives.'
};
```

## 🔧 Customization Options

### 1. Change Answer Labels
To make the answer fields more specific to your sub-questions:

```html
<!-- In the HTML section, update these labels -->
<label for="answer1" class="answer-label">Aspect 1:</label>
<label for="answer2" class="answer-label">Aspect 2:</label>
<label for="answer3" class="answer-label">Aspect 3:</label>
```

### 2. Add Module Instructions
You can add module-specific instructions:

```javascript
// Add this to your JavaScript
const moduleInstructions = {
    'LEADERSHIP': 'Please provide specific examples from your experience.',
    'PROBLEM_SOLVING': 'Focus on your systematic approach and methodology.',
    'COMMUNICATION': 'Include both successes and learning experiences.',
    'TEAMWORK': 'Emphasize collaboration and team outcomes.'
};
```

### 3. Customize Question Display
You can enhance the question display with formatting:

```javascript
function displayEnhancedQuestion(code, question) {
    const module = getModuleFromCode(code);
    const instructions = moduleInstructions[module] || '';
    
    questionText.innerHTML = `
        <div class="module-header">
            <h3>${module} Module</h3>
            <p class="instructions">${instructions}</p>
        </div>
        <div class="question-content">
            <h4>Question:</h4>
            <p>${question}</p>
        </div>
    `;
}
```

## 📊 Data Structure for Module Questions

When using module-based questions, your Google Sheets will contain:

| Timestamp | Question Code | Question Text | Answer 1 | Answer 2 | Answer 3 |
|-----------|---------------|---------------|----------|----------|----------|
| 2024-01-15 | Q101 | Leadership Philosophy: Describe your core leadership principles... | [Aspect 1 response] | [Aspect 2 response] | [Aspect 3 response] |

## 🎯 Best Practices

### 1. Question Design
- **Be Specific**: Each sub-question should focus on a distinct aspect
- **Use Action Words**: Start with verbs like "Describe," "Explain," "Share"
- **Include Context**: Provide enough background for meaningful responses
- **Balance Length**: Keep questions concise but comprehensive

### 2. Module Organization
- **Logical Grouping**: Group related questions together
- **Progressive Complexity**: Start with basic concepts, move to advanced
- **Consistent Structure**: Use similar patterns across modules
- **Clear Boundaries**: Ensure each module has distinct focus areas

### 3. Response Analysis
- **Structured Data**: Each response addresses specific aspects
- **Comparable Responses**: Similar structure allows for analysis
- **Rich Insights**: Multiple perspectives on each topic
- **Actionable Data**: Responses can inform decisions and improvements

## 🚨 Troubleshooting

### Common Issues and Solutions

**1. "Cannot read properties of undefined (reading 'postData')" Error**
- **Cause**: You're trying to run `doPost()` manually instead of `setupWebApp()`
- **Solution**: 
  - Run `setupWebApp()` to initialize the sheet
  - Run `testSetup()` to verify everything is working
  - Only `doPost()` is called automatically when the web app receives data

**2. Questions not displaying properly**
- Check that question codes match exactly (case-sensitive)
- Verify the questionsDatabase object syntax
- Ensure no missing commas or quotes

**3. Module questions not working**
- Verify the module configuration structure
- Check that all functions are properly defined
- Ensure JavaScript console shows no errors

**4. Data not saving correctly**
- Verify Google Apps Script URL is correct
- Check that the Apps Script is deployed and accessible
- Ensure proper permissions are set

**5. Answer labels not updating**
- Check that the label selectors match your HTML
- Verify the displayModuleQuestion function is called
- Ensure DOM elements are properly selected

**6. Google Apps Script Setup Issues**
- **Permission Denied**: Make sure you're the owner of the spreadsheet
- **Sheet Not Found**: Run `setupWebApp()` to create the QAResponses sheet
- **Web App Not Deployed**: Deploy as web app with "Anyone" access
- **URL Not Working**: Copy the exact web app URL from the deployment

## 📞 Support

If you need help:
1. Check the browser console for JavaScript errors
2. Verify all file paths and URLs are correct
3. Test with simple questions first
4. Review the setup instructions in `SETUP_INSTRUCTIONS.md`

---

**Ready to implement module-based questions!** 🎉

Follow these instructions step by step, and you'll have a powerful Q&A collection system with structured, module-based questions that provide rich, actionable insights.
