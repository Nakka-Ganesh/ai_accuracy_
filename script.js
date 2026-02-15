/**
 * AI Literacy Bharat - Main JavaScript
 * Interactive Demo & User Interface Logic
 */

// ==================
// Global Variables
// ==================
let currentLanguage = 'en';

// ==================
// Language Settings
// ==================
function setLanguage(lang) {
    currentLanguage = lang;
    
    // Remove active class from all language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected button
    event.target.classList.add('active');
    
    console.log(`Language set to: ${lang}`);
}

// ==================
// Example Query Functions
// ==================
function useExample(query) {
    document.getElementById('userQuery').value = query;
    processQuery();
}

// ==================
// Step 1: Process User Query
// ==================
function processQuery() {
    const query = document.getElementById('userQuery').value.trim();
    
    // Validation
    if (!query) {
        alert('Please enter a query first!');
        return;
    }
    
    // Show step 2
    document.getElementById('step2').classList.remove('hidden');
    
    // Generate clarification based on query
    const clarification = generateClarification(query);
    document.getElementById('clarificationQuestion').textContent = clarification;
    
    // Scroll to step 2
    document.getElementById('step2').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
}

// ==================
// Generate Clarification Question
// ==================
function generateClarification(query) {
    const lowerQuery = query.toLowerCase();
    
    // Health-related queries
    if (lowerQuery.includes('vaccine') || 
        lowerQuery.includes('corona') || 
        lowerQuery.includes('health') ||
        lowerQuery.includes('medicine') ||
        lowerQuery.includes('doctor')) {
        return 'Who is this health information for? (e.g., age, any medical conditions, specific concerns)';
    } 
    
    // Education-related queries
    else if (lowerQuery.includes('college') || 
             lowerQuery.includes('engineering') || 
             lowerQuery.includes('study') ||
             lowerQuery.includes('course') ||
             lowerQuery.includes('university')) {
        return 'What are you looking for? (e.g., entrance exams, budget, location preference, specific branch)';
    } 
    
    // Government scheme queries
    else if (lowerQuery.includes('scheme') || 
             lowerQuery.includes('sarkari') || 
             lowerQuery.includes('apply') ||
             lowerQuery.includes('yojana') ||
             lowerQuery.includes('government')) {
        return 'What is your situation? (e.g., your profession, income level, state/district, specific need)';
    } 
    
    // Job/Career queries
    else if (lowerQuery.includes('job') || 
             lowerQuery.includes('career') ||
             lowerQuery.includes('interview') ||
             lowerQuery.includes('salary')) {
        return 'Tell me about your background: (e.g., education, experience, preferred industry, location)';
    }
    
    // Agriculture queries
    else if (lowerQuery.includes('crop') || 
             lowerQuery.includes('farming') ||
             lowerQuery.includes('kheti') ||
             lowerQuery.includes('fasal')) {
        return 'What details can you provide? (e.g., your location, crop type, season, specific issue)';
    }
    
    // Financial queries
    else if (lowerQuery.includes('loan') || 
             lowerQuery.includes('bank') ||
             lowerQuery.includes('investment') ||
             lowerQuery.includes('paise')) {
        return 'What is your financial context? (e.g., purpose, amount, your current situation)';
    }
    
    // Default clarification
    else {
        return 'What is the purpose of this information? (e.g., personal use, school project, business decision, family member)';
    }
}

// ==================
// Step 2: Process Clarification
// ==================
function processClarification() {
    const answer = document.getElementById('clarificationAnswer').value.trim();
    
    // Validation
    if (!answer) {
        alert('Please provide an answer to continue!');
        return;
    }
    
    const originalQuery = document.getElementById('userQuery').value;
    
    // Show step 3
    document.getElementById('step3').classList.remove('hidden');
    
    // Generate enhanced query
    const enhanced = buildEnhancedQuery(originalQuery, answer);
    document.getElementById('enhancedQuery').textContent = enhanced;
    
    // Show step 4 after a delay
    setTimeout(() => {
        document.getElementById('step4').classList.remove('hidden');
        generateResponse(originalQuery, answer);
        document.getElementById('step4').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 1000);
}

// ==================
// Build Enhanced Query
// ==================
function buildEnhancedQuery(originalQuery, context) {
    return `${originalQuery}

Context: ${context}

Please provide:
✓ Accurate, verified information with sources
✓ Consider safety and local regulations
✓ Include disclaimers for medical/financial/legal advice
✓ Provide actionable next steps
✓ Use simple language (suitable for first-time AI users)`;
}

// ==================
// Step 4: Generate AI Response
// ==================
function generateResponse(query, context) {
    const lowerQuery = query.toLowerCase();
    let response = '';
    let checks = [];
    
    // Health/Vaccine Response
    if (lowerQuery.includes('vaccine') || lowerQuery.includes('corona')) {
        response = `Based on your context (${context}), here's verified information about COVID-19 vaccines:

✓ All WHO-approved vaccines are safe and effective
✓ For elderly individuals with diabetes, vaccines are recommended with doctor consultation
✓ Common side effects: mild fever, fatigue (1-2 days)
✓ Serious complications are extremely rare (1 in million)

⚠️ Important: This is general information. Please consult your doctor before vaccination.

Sources: WHO, Ministry of Health & Family Welfare, ICMR

Next Steps:
1. Consult your family doctor
2. Check CoWIN portal for vaccination centers
3. Carry medical records if you have any`;
        
        checks = [
            'Cross-verified with WHO guidelines',
            'Checked against MoHFW data',
            'Medical disclaimer included',
            'No promotional content detected',
            'Sources cited properly'
        ];
    } 
    
    // Education/College Response
    else if (lowerQuery.includes('college') || lowerQuery.includes('engineering')) {
        response = `Based on your requirements (${context}), here's accurate guidance:

Top factors to consider:
• NIRF Rankings (Government-verified)
• Placement records (check official websites)
• Accreditation (NAAC/NBA)
• Fee structure vs. your budget
• Location and hostel facilities

${context.toLowerCase().includes('jee') ? '✓ For JEE: Focus on NITs, IITs, IIITs based on your rank' : ''}

Reliable Resources:
• NIRF India Rankings: nirfindia.org
• JoSAA Counseling: josaa.nic.in
• College websites (official .edu.in or .ac.in)

Next steps:
1. Check JoSAA/state counseling dates
2. Visit college websites for authentic data
3. Talk to current students/alumni
4. Verify placements independently

⚠️ Beware of fake rankings and promises. Always verify from official sources.`;
        
        checks = [
            'Verified against NIRF rankings',
            'Checked for promotional bias',
            'Included official resources only',
            'Warning about misinformation added',
            'Actionable steps provided'
        ];
    } 
    
    // Government Scheme Response
    else if (lowerQuery.includes('scheme') || lowerQuery.includes('sarkari')) {
        response = `Based on your situation (${context}), here's how to find and apply for government schemes:

Finding Relevant Schemes:
• Visit: myscheme.gov.in (official portal)
• State government websites
• PM India portal: pmindia.gov.in

Common Categories:
✓ Education & Scholarship
✓ Employment & Skill Development
✓ Agriculture & Farmer Welfare
✓ Women & Child Development
✓ Senior Citizens Benefits

Application Process:
1. Check eligibility criteria carefully
2. Gather required documents (Aadhaar, income certificate, etc.)
3. Apply through official portals only
4. Save application number/receipt
5. Track status regularly

⚠️ Important:
• No government scheme asks for money to apply
• Beware of fake agents and middlemen
• Apply directly through official websites

Need help? Call: 1800-XXX-XXXX (Citizen Helpline)`;
        
        checks = [
            'Official government portals cited',
            'Fraud prevention warnings included',
            'Step-by-step process provided',
            'Verified against myscheme.gov.in',
            'Helpline information added'
        ];
    } 
    
    // Default Response
    else {
        response = `Based on your context (${context}), here's what you need to know:

[This is a demonstration response showing how accurate, contextualized information would be provided.]

The actual system would:
✓ Verify facts against trusted sources
✓ Provide relevant, specific examples
✓ Include disclaimers where needed
✓ Cite authoritative references
✓ Flag potential misinformation
✓ Offer actionable next steps

Your enhanced query has been processed to ensure:
• Clear intent understanding
• Proper context incorporation
• Accuracy-focused response generation
• Safety and compliance checks

This demonstrates how our tool transforms ambiguous queries into reliable, verified information.`;
        
        checks = [
            'Intent clarity verified',
            'Context properly incorporated',
            'Response structure validated',
            'Bias check completed',
            'Language accessibility confirmed'
        ];
    }
    
    // Display response
    document.getElementById('aiResponse').textContent = response;
    
    // Display safety checks
    displaySafetyChecks(checks);
}

// ==================
// Display Safety Checks
// ==================
function displaySafetyChecks(checks) {
    const checksList = document.getElementById('safetyChecks');
    checksList.innerHTML = '';
    
    checks.forEach(check => {
        const li = document.createElement('li');
        li.textContent = check;
        li.style.marginBottom = '0.3rem';
        checksList.appendChild(li);
    });
}

// ==================
// Reset Demo
// ==================
function resetDemo() {
    // Clear inputs
    document.getElementById('userQuery').value = '';
    document.getElementById('clarificationAnswer').value = '';
    
    // Hide steps 2, 3, 4
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step3').classList.add('hidden');
    document.getElementById('step4').classList.add('hidden');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================
// Smooth Scrolling for Navigation
// ==================
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });
    
    console.log('AI Literacy Bharat - Website Loaded Successfully! 🇮🇳');
});

// ==================
// Utility Functions
// ==================

// Track user interactions (for analytics - to be implemented)
function trackInteraction(eventType, data) {
    // This would send data to analytics service
    console.log(`Event: ${eventType}`, data);
}

// Format text for better readability
function formatText(text) {
    return text.trim().replace(/\s+/g, ' ');
}

// Validate user input
function validateInput(input, minLength = 5) {
    return input && input.trim().length >= minLength;
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setLanguage,
        useExample,
        processQuery,
        generateClarification,
        processClarification,
        buildEnhancedQuery,
        generateResponse,
        resetDemo
    };
}