# Design Document
## AI Accuracy & Literacy Tool for Bharat

**Project Name**: AI Accuracy & Literacy Tool for Bharat  
**Version**: 1.0  
**Date**: February 15, 2026  
**Status**: Active Development

---

## Table of Contents
1. [Design Overview](#design-overview)
2. [System Architecture](#system-architecture)
3. [Component Design](#component-design)
4. [Data Design](#data-design)
5. [Interface Design](#interface-design)
6. [Algorithm Design](#algorithm-design)
7. [UI/UX Design](#uiux-design)
8. [Security Design](#security-design)
9. [Deployment Design](#deployment-design)
10. [Testing Design](#testing-design)

---

## Design Overview

### Design Philosophy

#### Core Principles

1. **Simplicity First**
   - Minimize cognitive load for first-time users
   - One primary action per screen
   - Progressive disclosure of complexity
   - Clear, jargon-free language

2. **Bharat-Centric Design**
   - Cultural sensitivity in visuals and language
   - Support for mixed languages (Hinglish, Tanglish)
   - Low-bandwidth optimization
   - Affordable device compatibility

3. **Trust Through Transparency**
   - Show how queries are improved
   - Display accuracy checks visibly
   - Cite authoritative sources
   - Clear disclaimers for sensitive topics

4. **Accessibility for All**
   - WCAG 2.1 AA compliance
   - Multi-language support
   - Screen reader friendly
   - Keyboard navigation

5. **Performance at Scale**
   - Fast response times (<15 seconds)
   - Efficient resource usage
   - Graceful degradation
   - Horizontal scalability

### Design Goals

1. **User Experience**: Intuitive interaction requiring zero training
2. **Accuracy**: 85%+ improvement through clarification
3. **Speed**: Complete workflow in <30 seconds
4. **Reliability**: 99.5% uptime
5. **Scalability**: Support 1M+ concurrent users (future)

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Layer                           │
│  (Web Browsers, Mobile Devices, Future: WhatsApp, Apps)    │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    CDN / Load Balancer                       │
│              (CloudFlare, AWS CloudFront)                    │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   Presentation Layer                         │
│        (Web Server: Nginx, Static Assets: HTML/CSS/JS)      │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   Application Layer                          │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Intent     │  │ Clarification│  │   Query      │     │
│  │   Analysis   │  │   Generator  │  │  Enhancer    │     │
│  │   Module     │  │   Module     │  │   Module     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  AI Response │  │  Accuracy    │  │   Safety     │     │
│  │   Handler    │  │  Verifier    │  │   Checker    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│           (Backend: Python Flask/FastAPI or Node.js)        │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                      Service Layer                           │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  AI Model    │  │  Language    │  │  Fact Check  │     │
│  │   Service    │  │  Detection   │  │   Service    │     │
│  │ (OpenAI/     │  │   Service    │  │  (Future)    │     │
│  │  Claude)     │  └──────────────┘  └──────────────┘     │
│  └──────────────┘                                           │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                       Data Layer                             │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  PostgreSQL  │  │    Redis     │  │ Elasticsearch│     │
│  │  (Primary    │  │   (Cache)    │  │  (Search)    │     │
│  │   Database)  │  └──────────────┘  └──────────────┘     │
│  └──────────────┘                                           │
└─────────────────────────────────────────────────────────────┘
```

### Architecture Patterns

#### 1. **Three-Tier Architecture**
- **Presentation Tier**: Static frontend (HTML/CSS/JS)
- **Application Tier**: Backend API servers (stateless)
- **Data Tier**: Databases, caches, external services

**Benefits**:
- Clear separation of concerns
- Independent scaling of each tier
- Easy to maintain and update

#### 2. **Microservices (Future)**
- Intent Analysis Service
- Clarification Service
- AI Orchestration Service
- Verification Service
- Analytics Service

**Benefits**:
- Independent deployment
- Technology flexibility
- Fault isolation

#### 3. **Event-Driven Architecture (Future)**
- Query submitted → Event published
- Workers process asynchronously
- Webhooks notify completion

**Benefits**:
- Better scalability
- Resilience to load spikes
- Decoupled components

---

## Component Design

### Frontend Components

#### 1. **Landing Page Component**

**Purpose**: First impression, value proposition

**Structure**:
```
LandingPage/
├── Hero Section
│   ├── Headline
│   ├── Tagline
│   └── CTA Buttons
├── Stats Section
│   └── Stat Cards (4x)
├── Problem Section
│   └── Problem Cards (6x)
└── Features Section
    └── Feature Cards (9x)
```

**Props**: None (static content)

**State**: None

**Design Pattern**: Presentational component

#### 2. **Interactive Demo Component**

**Purpose**: Core user interaction, workflow demonstration

**Structure**:
```
DemoComponent/
├── Language Selector
├── Example Queries
├── Step 1: User Input
│   ├── Text Area
│   └── Submit Button
├── Step 2: Clarification
│   ├── Question Display
│   ├── Answer Input
│   └── Submit Button
├── Step 3: Enhanced Query (optional display)
│   └── Query Text
├── Step 4: AI Response
│   ├── Response Text
│   ├── Safety Badges
│   └── Source Citations
└── Reset Button
```

**State**:
```javascript
{
  currentLanguage: 'en',
  userQuery: '',
  clarificationQuestion: '',
  clarificationAnswer: '',
  enhancedQuery: '',
  aiResponse: '',
  safetyChecks: [],
  currentStep: 1
}
```

**Methods**:
- `setLanguage(lang)`
- `processQuery()`
- `generateClarification(query)`
- `processClarification()`
- `buildEnhancedQuery()`
- `generateResponse()`
- `resetDemo()`

**Design Pattern**: Container component (smart component)

#### 3. **Navigation Component**

**Purpose**: Site navigation, branding

**Structure**:
```
Navigation/
├── Logo
└── Nav Links
    ├── Home
    ├── Demo
    ├── Features
    ├── Impact
    └── About
```

**Behavior**: Smooth scroll to anchors

#### 4. **Footer Component**

**Purpose**: Additional information, links

**Structure**:
```
Footer/
├── About Section
├── Quick Links
├── Get Involved
├── Contact
└── Copyright
```

### Backend Components

#### 1. **Intent Analysis Module**

**Purpose**: Detect missing context from user query

**Input**: User query string

**Processing**:
1. Language detection
2. Tokenization
3. Entity recognition (NER)
4. Intent classification
5. Context gap detection

**Output**:
```json
{
  "query": "corona vaccine safe hai?",
  "detected_language": "hinglish",
  "intent": "health_information",
  "entities": ["corona", "vaccine"],
  "missing_context": ["audience", "specific_concerns"],
  "confidence": 0.92
}
```

**Algorithm**:
```python
def analyze_intent(query):
    # Step 1: Detect language
    lang = detect_language(query)
    
    # Step 2: Identify domain
    domain = classify_domain(query)
    
    # Step 3: Extract entities
    entities = extract_entities(query)
    
    # Step 4: Detect missing context
    missing = detect_missing_context(query, domain)
    
    return IntentAnalysis(
        language=lang,
        domain=domain,
        entities=entities,
        missing_context=missing
    )
```

**Technologies**:
- spaCy for NLP
- langdetect for language detection
- Custom-trained model for domain classification

#### 2. **Clarification Generator Module**

**Purpose**: Create ONE simple question to fill context gaps

**Input**: Intent analysis result

**Processing**:
1. Select most critical missing context
2. Load question template for domain
3. Personalize question
4. Translate to user's language

**Output**:
```json
{
  "clarification_question": "Who is this health information for? (e.g., age, medical conditions)",
  "question_type": "audience_context",
  "language": "en",
  "expected_answer_format": "freeform_text"
}
```

**Question Templates** (by domain):

```python
TEMPLATES = {
    "health": {
        "audience": "Who is this health information for? (e.g., age, medical conditions)",
        "constraints": "Any specific concerns or restrictions?",
        "purpose": "Is this for general knowledge or specific action?"
    },
    "education": {
        "constraints": "What are your preferences? (e.g., budget, location, branch)",
        "purpose": "What are you looking for? (e.g., entrance exams, placements)",
        "context": "Tell me about your background (e.g., marks, stream)"
    },
    "government": {
        "context": "What is your situation? (e.g., profession, state, income)",
        "purpose": "What specific benefit do you need?",
        "constraints": "Any special category or eligibility?"
    }
    # ... more domains
}
```

**Algorithm**:
```python
def generate_clarification(intent_analysis):
    domain = intent_analysis.domain
    missing = intent_analysis.missing_context
    
    # Prioritize most critical missing context
    primary_missing = prioritize_context(missing)
    
    # Select appropriate template
    template = TEMPLATES[domain][primary_missing]
    
    # Translate if needed
    if intent_analysis.language != 'en':
        template = translate(template, intent_analysis.language)
    
    return ClarificationQuestion(
        question=template,
        context_type=primary_missing,
        language=intent_analysis.language
    )
```

#### 3. **Query Enhancement Module**

**Purpose**: Build structured, accuracy-focused AI request

**Input**: 
- Original query
- Clarification answer
- Intent analysis

**Processing**:
1. Merge original query with clarification
2. Add domain-specific instructions
3. Inject safety guidelines
4. Format for AI model

**Output**:
```json
{
  "enhanced_query": "User Query: Is corona vaccine safe?\n\nContext: For 60-year-old mother with diabetes\n\nInstructions:\n- Provide medically verified information\n- Include WHO/MoHFW sources\n- Add medical disclaimer\n- Mention common side effects\n- Suggest doctor consultation\n- Use simple language",
  "domain": "health",
  "safety_level": "high",
  "expected_sources": ["WHO", "MoHFW", "ICMR"]
}
```

**Prompt Engineering**:

```python
PROMPT_TEMPLATE = """
User Query: {original_query}

Context: {clarification_answer}

Domain: {domain}

Please provide accurate, verified information following these guidelines:
1. Cite authoritative sources (e.g., {domain_sources})
2. Include appropriate disclaimers for {domain} advice
3. Use simple, clear language (suitable for first-time AI users)
4. Provide actionable next steps
5. Mention any limitations or uncertainties
6. Flag any potentially harmful information

{domain_specific_instructions}

Response should be:
- Concise (200-300 words)
- Well-structured
- Free from jargon
- Culturally sensitive
"""

def enhance_query(original_query, clarification_answer, intent_analysis):
    domain = intent_analysis.domain
    
    # Load domain-specific instructions
    domain_instructions = DOMAIN_INSTRUCTIONS[domain]
    domain_sources = DOMAIN_SOURCES[domain]
    
    # Build enhanced query
    enhanced = PROMPT_TEMPLATE.format(
        original_query=original_query,
        clarification_answer=clarification_answer,
        domain=domain,
        domain_sources=", ".join(domain_sources),
        domain_specific_instructions=domain_instructions
    )
    
    return enhanced
```

#### 4. **AI Response Handler**

**Purpose**: Interface with AI models, stream responses

**Input**: Enhanced query

**Processing**:
1. Select appropriate AI model
2. Send request with retry logic
3. Handle streaming (if supported)
4. Parse response
5. Extract citations and disclaimers

**Output**:
```json
{
  "response_text": "Based on WHO guidelines, COVID-19 vaccines are...",
  "sources": ["https://www.who.int/...", "https://mohfw.gov.in/..."],
  "disclaimers": ["This is general information. Consult your doctor."],
  "model_used": "gpt-4-turbo",
  "response_time": 8.2,
  "tokens_used": 450
}
```

**AI Model Selection**:

```python
def select_model(domain, query_length, user_tier):
    if domain in ["health", "legal", "finance"]:
        # High-stakes domains → best model
        return "gpt-4-turbo"
    elif query_length > 500:
        # Long queries → larger context window
        return "claude-3-opus"
    elif user_tier == "free":
        # Cost optimization for free tier
        return "gpt-3.5-turbo"
    else:
        # Default
        return "gpt-4-turbo"
```

**API Integration**:

```python
async def get_ai_response(enhanced_query, model="gpt-4-turbo"):
    try:
        if model.startswith("gpt"):
            response = await openai_client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": enhanced_query}
                ],
                temperature=0.7,
                max_tokens=500,
                stream=True  # Enable streaming
            )
        elif model.startswith("claude"):
            response = await anthropic_client.messages.create(
                model=model,
                max_tokens=500,
                messages=[{"role": "user", "content": enhanced_query}],
                stream=True
            )
        
        # Process streaming response
        full_response = ""
        async for chunk in response:
            full_response += chunk.choices[0].delta.content
            yield chunk  # Stream to frontend
        
        return full_response
        
    except Exception as e:
        logger.error(f"AI API error: {e}")
        raise AIServiceException("Failed to get AI response")
```

#### 5. **Accuracy Verification Module**

**Purpose**: Check response quality, detect hallucinations

**Input**: AI response, original query, domain

**Processing**:
1. Hallucination detection
2. Source verification
3. Consistency check
4. Completeness check
5. Bias detection

**Output**:
```json
{
  "accuracy_score": 0.92,
  "checks_passed": [
    "No hallucinations detected",
    "Sources are authoritative",
    "Response is complete",
    "No obvious bias"
  ],
  "checks_failed": [],
  "warnings": [],
  "confidence": "high"
}
```

**Hallucination Detection**:

```python
def detect_hallucinations(response, domain):
    hallucinations = []
    
    # Check 1: Date consistency
    dates = extract_dates(response)
    for date in dates:
        if date > datetime.now():
            hallucinations.append(f"Future date mentioned: {date}")
    
    # Check 2: Entity verification (for known entities)
    entities = extract_entities(response)
    for entity in entities:
        if entity.type == "PERSON" and is_well_known(entity):
            if not verify_person_facts(entity, response):
                hallucinations.append(f"Incorrect information about {entity}")
    
    # Check 3: Numerical consistency
    numbers = extract_numbers(response)
    if not check_numerical_consistency(numbers, domain):
        hallucinations.append("Inconsistent numerical claims")
    
    # Check 4: Internal contradictions
    if contains_contradictions(response):
        hallucinations.append("Response contains contradictions")
    
    return hallucinations
```

**Source Verification**:

```python
TRUSTED_DOMAINS = {
    "health": ["who.int", "mohfw.gov.in", "nih.gov", "icmr.nic.in"],
    "education": ["nirfindia.org", "ugc.ac.in", "aicte-india.org"],
    "government": ["gov.in", "myscheme.gov.in", "india.gov.in"],
    "finance": ["rbi.org.in", "sebi.gov.in", "incometaxindia.gov.in"]
}

def verify_sources(response, domain):
    sources = extract_urls(response)
    verified = []
    unverified = []
    
    trusted = TRUSTED_DOMAINS.get(domain, [])
    
    for source in sources:
        domain_name = extract_domain(source)
        if any(trusted_domain in domain_name for trusted_domain in trusted):
            verified.append(source)
        else:
            unverified.append(source)
    
    return {
        "verified_sources": verified,
        "unverified_sources": unverified,
        "verification_rate": len(verified) / len(sources) if sources else 0
    }
```

#### 6. **Safety Checker Module**

**Purpose**: Ensure response is safe, appropriate, compliant

**Input**: AI response, user context

**Processing**:
1. Content filtering (harmful content)
2. Disclaimer validation
3. Age-appropriateness check
4. Regulatory compliance check

**Output**:
```json
{
  "is_safe": true,
  "concerns": [],
  "required_disclaimers": ["medical_disclaimer"],
  "disclaimers_present": true,
  "age_appropriate": true,
  "compliant": true
}
```

**Content Filtering**:

```python
HARMFUL_PATTERNS = [
    "suicide", "self-harm", "violence", "illegal activities",
    "hate speech", "discrimination", "sexual content (minors)",
    "dangerous medical advice", "illegal financial schemes"
]

def check_safety(response, context):
    concerns = []
    
    # Check for harmful content
    for pattern in HARMFUL_PATTERNS:
        if contains_pattern(response, pattern):
            concerns.append(f"Contains {pattern}")
    
    # Check disclaimers
    required_disclaimers = get_required_disclaimers(context.domain)
    present_disclaimers = extract_disclaimers(response)
    
    missing = [d for d in required_disclaimers if d not in present_disclaimers]
    if missing:
        concerns.append(f"Missing disclaimers: {missing}")
    
    # Age appropriateness
    if context.user_age and context.user_age < 18:
        if not is_age_appropriate(response, context.user_age):
            concerns.append("Content may not be age-appropriate")
    
    return {
        "is_safe": len(concerns) == 0,
        "concerns": concerns,
        "required_disclaimers": required_disclaimers,
        "disclaimers_present": len(missing) == 0
    }
```

---

## Data Design

### Database Schema

#### 1. **Queries Table**

**Purpose**: Store all user queries for analytics

```sql
CREATE TABLE queries (
    id BIGSERIAL PRIMARY KEY,
    session_id UUID NOT NULL,
    original_query TEXT NOT NULL,
    detected_language VARCHAR(10),
    intent_domain VARCHAR(50),
    clarification_question TEXT,
    clarification_answer TEXT,
    enhanced_query TEXT,
    ai_response TEXT,
    ai_model_used VARCHAR(50),
    response_time_ms INTEGER,
    accuracy_score DECIMAL(3,2),
    user_rating INTEGER CHECK (user_rating BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_flagged BOOLEAN DEFAULT FALSE,
    flag_reason TEXT
);

CREATE INDEX idx_queries_session ON queries(session_id);
CREATE INDEX idx_queries_domain ON queries(intent_domain);
CREATE INDEX idx_queries_created ON queries(created_at DESC);
CREATE INDEX idx_queries_flagged ON queries(is_flagged) WHERE is_flagged = TRUE;
```

#### 2. **Sessions Table**

**Purpose**: Track user sessions (anonymous)

```sql
CREATE TABLE sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_agent TEXT,
    device_type VARCHAR(20), -- 'mobile', 'tablet', 'desktop'
    browser VARCHAR(50),
    preferred_language VARCHAR(10),
    country_code CHAR(2),
    region VARCHAR(100),
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    queries_count INTEGER DEFAULT 0,
    is_returning BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_sessions_started ON sessions(started_at DESC);
CREATE INDEX idx_sessions_country ON sessions(country_code);
```

#### 3. **Feedback Table**

**Purpose**: Collect user feedback and issue reports

```sql
CREATE TABLE feedback (
    id BIGSERIAL PRIMARY KEY,
    query_id BIGINT REFERENCES queries(id),
    session_id UUID REFERENCES sessions(session_id),
    feedback_type VARCHAR(20), -- 'rating', 'issue_report', 'suggestion'
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    issue_category VARCHAR(50), -- 'incorrect', 'harmful', 'incomplete', 'biased'
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_reviewed BOOLEAN DEFAULT FALSE,
    reviewer_notes TEXT
);

CREATE INDEX idx_feedback_query ON feedback(query_id);
CREATE INDEX idx_feedback_type ON feedback(feedback_type);
CREATE INDEX idx_feedback_unreviewed ON feedback(is_reviewed) WHERE is_reviewed = FALSE;
```

#### 4. **Analytics Table**

**Purpose**: Aggregate daily statistics

```sql
CREATE TABLE daily_analytics (
    date DATE PRIMARY KEY,
    total_queries INTEGER DEFAULT 0,
    unique_sessions INTEGER DEFAULT 0,
    avg_response_time_ms INTEGER,
    avg_accuracy_score DECIMAL(3,2),
    avg_user_rating DECIMAL(3,2),
    queries_by_domain JSONB, -- {"health": 1234, "education": 5678, ...}
    queries_by_language JSONB,
    total_issues_reported INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Data Flow

#### Query Processing Flow

```
1. User submits query
   ↓
2. Create session (if new) → sessions table
   ↓
3. Store original query → queries table (partial)
   ↓
4. Intent analysis → update queries table (detected_language, intent_domain)
   ↓
5. Generate clarification → update queries table (clarification_question)
   ↓
6. User answers clarification → update queries table (clarification_answer)
   ↓
7. Build enhanced query → update queries table (enhanced_query)
   ↓
8. Get AI response → update queries table (ai_response, ai_model_used, response_time_ms)
   ↓
9. Verify accuracy → update queries table (accuracy_score)
   ↓
10. Display to user
   ↓
11. User rates (optional) → update queries table (user_rating)
                          → insert into feedback table
```

#### Analytics Aggregation (Nightly Job)

```python
def aggregate_daily_analytics(date):
    """
    Run nightly at 00:01 to aggregate previous day's data
    """
    data = {
        "date": date,
        "total_queries": count_queries(date),
        "unique_sessions": count_unique_sessions(date),
        "avg_response_time_ms": avg_response_time(date),
        "avg_accuracy_score": avg_accuracy(date),
        "avg_user_rating": avg_rating(date),
        "queries_by_domain": group_by_domain(date),
        "queries_by_language": group_by_language(date),
        "total_issues_reported": count_issues(date)
    }
    
    insert_daily_analytics(data)
```

### Caching Strategy

#### Redis Cache Structure

```
# Session cache (1 hour TTL)
session:{session_id} → {user_agent, device_type, preferred_language, ...}

# Query cache (for repeated queries, 24 hour TTL)
query:{query_hash} → {response, accuracy_score, timestamp}

# Clarification templates cache (1 week TTL)
clarification:{domain}:{language} → {question_templates}

# Rate limiting (1 hour sliding window)
ratelimit:{ip_address} → {count, window_start}
```

**Cache Invalidation**:
- Session cache: Auto-expire after 1 hour of inactivity
- Query cache: Invalidate if response is flagged as incorrect
- Template cache: Manual invalidation on updates

---

## Interface Design

### API Design

#### REST API Endpoints

**Base URL**: `https://api.ailiteracybharat.org/v1`

#### 1. **POST /analyze-query**

**Purpose**: Analyze user query, generate clarification

**Request**:
```json
{
  "query": "corona vaccine safe hai?",
  "session_id": "optional-uuid",
  "language_preference": "auto"
}
```

**Response**:
```json
{
  "query_id": "12345",
  "session_id": "abc-def-ghi",
  "intent_analysis": {
    "detected_language": "hinglish",
    "domain": "health",
    "entities": ["corona", "vaccine"],
    "missing_context": ["audience"]
  },
  "clarification": {
    "question": "Who is this health information for?",
    "language": "en",
    "suggestions": ["For myself", "For family member", "General information"]
  }
}
```

**Status Codes**:
- 200: Success
- 400: Invalid query (too short, malformed)
- 429: Rate limit exceeded
- 500: Server error

#### 2. **POST /submit-clarification**

**Purpose**: Submit clarification answer, get AI response

**Request**:
```json
{
  "query_id": "12345",
  "session_id": "abc-def-ghi",
  "clarification_answer": "for my 60-year-old mother with diabetes"
}
```

**Response** (Streaming):
```json
// Initial metadata
{
  "query_id": "12345",
  "status": "processing",
  "estimated_time": 10
}

// Streamed chunks
{
  "type": "content",
  "chunk": "Based on WHO guidelines, COVID-19 vaccines..."
}
{
  "type": "content",
  "chunk": " are safe for elderly individuals with..."
}

// Final response
{
  "type": "complete",
  "query_id": "12345",
  "full_response": "Based on WHO guidelines...",
  "sources": ["https://who.int/..."],
  "accuracy_score": 0.92,
  "safety_checks": {
    "passed": ["sources_verified", "no_hallucinations"],
    "warnings": ["medical_disclaimer_required"]
  },
  "processing_time_ms": 8200
}
```

#### 3. **POST /rate-response**

**Purpose**: Submit user rating/feedback

**Request**:
```json
{
  "query_id": "12345",
  "session_id": "abc-def-ghi",
  "rating": 5,
  "feedback_type": "helpful"
}
```

**Response**:
```json
{
  "status": "success",
  "message": "Thank you for your feedback!"
}
```

#### 4. **POST /report-issue**

**Purpose**: Report inaccurate or harmful response

**Request**:
```json
{
  "query_id": "12345",
  "session_id": "abc-def-ghi",
  "issue_type": "factually_incorrect",
  "description": "The vaccination age mentioned is incorrect"
}
```

**Response**:
```json
{
  "status": "success",
  "ticket_id": "ISSUE-6789",
  "message": "Issue reported. Our team will review within 24 hours."
}
```

#### 5. **GET /languages**

**Purpose**: Get list of supported languages

**Response**:
```json
{
  "languages": [
    {"code": "en", "name": "English", "native_name": "English"},
    {"code": "hi", "name": "Hindi", "native_name": "हिंदी"},
    {"code": "ta", "name": "Tamil", "native_name": "தமிழ்"},
    {"code": "te", "name": "Telugu", "native_name": "తెలుగు"}
    // ... more
  ]
}
```

#### 6. **GET /health**

**Purpose**: Health check for monitoring

**Response**:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "uptime": 3600,
  "database": "connected",
  "ai_service": "available"
}
```

### WebSocket (Future for Real-Time Streaming)

```javascript
// Connect to WebSocket
const ws = new WebSocket('wss://api.ailiteracybharat.org/stream');

// Send query
ws.send(JSON.stringify({
  type: 'query',
  query_id: '12345',
  enhanced_query: '...'
}));

// Receive streamed response
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'chunk') {
    appendToResponse(data.content);
  } else if (data.type === 'complete') {
    displayFinalResponse(data);
  }
};
```

---

## Algorithm Design

### Intent Classification Algorithm

**Approach**: Multi-label classification using pre-trained model + rule-based

```python
class IntentClassifier:
    def __init__(self):
        self.model = load_pretrained_model('distilbert-base-multilingual')
        self.domain_keywords = load_domain_keywords()
    
    def classify(self, query):
        # Step 1: Rule-based classification (fast)
        rule_based_domain = self.rule_based_classify(query)
        
        # Step 2: ML-based classification (more accurate)
        ml_based_domain = self.ml_classify(query)
        
        # Step 3: Combine results
        if rule_based_domain == ml_based_domain:
            confidence = 0.95
            domain = rule_based_domain
        else:
            confidence = 0.70
            domain = ml_based_domain  # Trust ML when in doubt
        
        return {
            "domain": domain,
            "confidence": confidence
        }
    
    def rule_based_classify(self, query):
        tokens = tokenize(query.lower())
        
        domain_scores = {}
        for domain, keywords in self.domain_keywords.items():
            score = len(set(tokens) & set(keywords))
            domain_scores[domain] = score
        
        return max(domain_scores, key=domain_scores.get)
    
    def ml_classify(self, query):
        embedding = self.model.encode(query)
        probabilities = self.model.predict_proba(embedding)
        return self.model.classes_[np.argmax(probabilities)]
```

**Domains**:
- health
- education
- government
- finance
- agriculture
- employment
- legal
- general

### Context Gap Detection Algorithm

**Approach**: Checklist-based detection per domain

```python
CONTEXT_REQUIREMENTS = {
    "health": {
        "required": ["audience"],  # Who is this for?
        "recommended": ["specific_condition", "urgency"]
    },
    "education": {
        "required": ["purpose"],  # What aspect? (admission, syllabus, etc.)
        "recommended": ["budget", "location", "branch"]
    },
    "government": {
        "required": ["context"],  # User's situation
        "recommended": ["state", "category"]
    }
}

def detect_context_gaps(query, domain):
    requirements = CONTEXT_REQUIREMENTS[domain]
    
    gaps = []
    
    # Check for required context
    for context_type in requirements["required"]:
        if not has_context(query, context_type):
            gaps.append({
                "type": context_type,
                "priority": "high"
            })
    
    # Check for recommended context
    for context_type in requirements["recommended"]:
        if not has_context(query, context_type):
            gaps.append({
                "type": context_type,
                "priority": "medium"
            })
    
    return gaps

def has_context(query, context_type):
    """
    Check if query contains specific type of context
    """
    indicators = CONTEXT_INDICATORS[context_type]
    
    tokens = tokenize(query.lower())
    return any(indicator in tokens for indicator in indicators)
```

**Context Indicators**:
```python
CONTEXT_INDICATORS = {
    "audience": ["for me", "for my", "mother", "father", "child", "myself"],
    "budget": ["₹", "rupees", "lakh", "under", "below", "affordable", "cheap"],
    "location": ["in", "near", "mumbai", "delhi", "bangalore", "my city"],
    "purpose": ["want to", "need to", "looking for", "planning to"],
    "urgency": ["urgent", "asap", "immediately", "soon", "emergency"]
}
```

### Response Quality Scoring Algorithm

**Approach**: Multi-factor scoring (0-100)

```python
def calculate_quality_score(response, query, domain):
    """
    Comprehensive quality score based on multiple factors
    """
    scores = {
        "completeness": score_completeness(response, query),
        "accuracy": score_accuracy(response, domain),
        "clarity": score_clarity(response),
        "source_quality": score_sources(response, domain),
        "safety": score_safety(response, domain)
    }
    
    # Weighted average
    weights = {
        "completeness": 0.25,
        "accuracy": 0.35,  # Most important
        "clarity": 0.15,
        "source_quality": 0.15,
        "safety": 0.10
    }
    
    total_score = sum(scores[key] * weights[key] for key in scores)
    
    return {
        "overall_score": round(total_score, 2),
        "component_scores": scores
    }

def score_completeness(response, query):
    """
    Does response address all aspects of the query?
    """
    query_aspects = extract_aspects(query)
    addressed_aspects = [a for a in query_aspects if a in response.lower()]
    
    return (len(addressed_aspects) / len(query_aspects)) * 100

def score_accuracy(response, domain):
    """
    Fact-checking, hallucination detection
    """
    hallucinations = detect_hallucinations(response, domain)
    if len(hallucinations) > 0:
        return max(0, 100 - len(hallucinations) * 30)  # -30 per hallucination
    
    return 100

def score_clarity(response):
    """
    Readability, sentence structure
    """
    import textstat
    
    # Flesch Reading Ease (higher = easier to read)
    readability = textstat.flesch_reading_ease(response)
    
    # Normalize to 0-100 (60-100 is "easy", we want that range)
    if readability >= 60:
        return 100
    else:
        return (readability / 60) * 100

def score_sources(response, domain):
    """
    Quality and relevance of cited sources
    """
    sources = extract_urls(response)
    if not sources:
        return 50  # Neutral if no sources
    
    trusted_sources = [s for s in sources if is_trusted_domain(s, domain)]
    
    return (len(trusted_sources) / len(sources)) * 100

def score_safety(response, domain):
    """
    Presence of required disclaimers, no harmful content
    """
    required_disclaimers = get_required_disclaimers(domain)
    present_disclaimers = extract_disclaimers(response)
    
    if set(required_disclaimers).issubset(set(present_disclaimers)):
        return 100
    else:
        return 70  # Penalty for missing disclaimers
```

---

## UI/UX Design

### Design System

#### Color Palette

**Primary Colors** (Indian Tricolor):
```css
:root {
  /* Saffron (Energy, Courage) */
  --primary: #FF9933;
  --primary-light: #FFB366;
  --primary-dark: #E68A2E;
  
  /* Green (Growth, Fertility) */
  --secondary: #138808;
  --secondary-light: #1AAA0A;
  --secondary-dark: #0F6906;
  
  /* Navy Blue (Truth, Faith) */
  --accent: #000080;
  --accent-light: #0000A0;
  --accent-dark: #000060;
}
```

**Neutral Colors**:
```css
:root {
  --white: #FFFFFF;
  --light-bg: #FFF5E6;  /* Warm cream */
  --light-gray: #F5F5F5;
  --medium-gray: #CCCCCC;
  --dark-gray: #666666;
  --dark: #2C3E50;
  --black: #000000;
}
```

**Semantic Colors**:
```css
:root {
  --success: #27AE60;
  --warning: #F39C12;
  --error: #E74C3C;
  --info: #3498DB;
}
```

#### Typography

**Font Stack**:
```css
body {
  font-family: 
    'Segoe UI',        /* Windows */
    'Roboto',          /* Android */
    'San Francisco',   /* macOS/iOS */
    'Helvetica Neue',  /* Fallback */
    sans-serif;
}
```

**Font Sizes** (Responsive):
```css
/* Desktop */
--font-size-xs: 0.75rem;   /* 12px */
--font-size-sm: 0.875rem;  /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;  /* 18px */
--font-size-xl: 1.25rem;   /* 20px */
--font-size-2xl: 1.5rem;   /* 24px */
--font-size-3xl: 2rem;     /* 32px */
--font-size-4xl: 2.5rem;   /* 40px */
--font-size-5xl: 3rem;     /* 48px */

/* Mobile (scale down) */
@media (max-width: 768px) {
  --font-size-3xl: 1.75rem;  /* 28px */
  --font-size-4xl: 2rem;     /* 32px */
  --font-size-5xl: 2.5rem;   /* 40px */
}
```

**Font Weights**:
```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

#### Spacing System

**8-point Grid**:
```css
--spacing-xs: 0.25rem;  /* 4px */
--spacing-sm: 0.5rem;   /* 8px */
--spacing-md: 1rem;     /* 16px */
--spacing-lg: 1.5rem;   /* 24px */
--spacing-xl: 2rem;     /* 32px */
--spacing-2xl: 3rem;    /* 48px */
--spacing-3xl: 4rem;    /* 64px */
--spacing-4xl: 6rem;    /* 96px */
```

#### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-round: 50%;
--radius-pill: 9999px;
```

#### Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

### Component Specifications

#### Button Component

**Variants**:

```html
<!-- Primary Button -->
<button class="btn btn-primary">
  Try Live Demo
</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">
  Learn More
</button>

<!-- Success Button -->
<button class="btn btn-success">
  Submit Answer →
</button>

<!-- Outline Button -->
<button class="btn btn-outline">
  Reset Demo
</button>
```

**Styles**:
```css
.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: var(--radius-pill);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: var(--secondary);
  color: white;
}

.btn-success {
  background: var(--success);
  color: white;
}

.btn-outline {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}

/* Sizes */
.btn-sm {
  padding: 0.5rem 1rem;
  font-size: var(--font-size-base);
}

.btn-lg {
  padding: 1.25rem 2.5rem;
  font-size: var(--font-size-xl);
}

/* States */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn:focus {
  outline: 3px solid var(--primary-light);
  outline-offset: 2px;
}
```

#### Card Component

**Structure**:
```html
<div class="card">
  <div class="card-icon">🎯</div>
  <h3 class="card-title">Intent Analysis</h3>
  <p class="card-description">
    Automatically detects missing context from raw user input.
  </p>
</div>
```

**Styles**:
```css
.card {
  background: white;
  padding: var(--spacing-2xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-lg);
}

.card-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--dark);
  margin-bottom: var(--spacing-md);
}

.card-description {
  font-size: var(--font-size-base);
  color: var(--dark-gray);
  line-height: 1.6;
}
```

#### Input Component

**Text Input**:
```html
<div class="input-group">
  <label for="query" class="input-label">
    Type your question:
  </label>
  <input
    type="text"
    id="query"
    class="input-field"
    placeholder="e.g., 'corona vaccine safe hai?'"
  />
  <span class="input-hint">
    You can type in any language
  </span>
</div>
```

**Textarea**:
```html
<div class="input-group">
  <label for="query" class="input-label">
    Type your question in any language:
  </label>
  <textarea
    id="query"
    class="input-field"
    rows="3"
    placeholder="e.g., 'best college engineering'"
  ></textarea>
</div>
```

**Styles**:
```css
.input-group {
  margin: var(--spacing-lg) 0;
}

.input-label {
  display: block;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--dark);
  margin-bottom: var(--spacing-sm);
}

.input-field {
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid #E0E0E0;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-family: inherit;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(255, 153, 51, 0.1);
}

.input-field::placeholder {
  color: var(--medium-gray);
}

.input-hint {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--dark-gray);
  margin-top: var(--spacing-xs);
}

/* Error state */
.input-field.error {
  border-color: var(--error);
}

.input-error {
  color: var(--error);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-xs);
}
```

### Interaction Patterns

#### Loading States

**Button Loading**:
```html
<button class="btn btn-primary loading">
  <span class="spinner"></span>
  Processing...
</button>
```

```css
.btn.loading {
  position: relative;
  pointer-events: none;
  opacity: 0.7;
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  margin-right: var(--spacing-sm);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

**Skeleton Loading** (for content):
```html
<div class="skeleton skeleton-text"></div>
<div class="skeleton skeleton-text" style="width: 80%;"></div>
<div class="skeleton skeleton-text" style="width: 60%;"></div>
```

```css
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #e0e0e0 50%,
    #f0f0f0 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
  border-radius: var(--radius-sm);
}

.skeleton-text {
  height: 1rem;
  margin-bottom: var(--spacing-sm);
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

#### Toast Notifications

```html
<div class="toast toast-success">
  <span class="toast-icon">✓</span>
  <span class="toast-message">Response rated successfully!</span>
  <button class="toast-close">&times;</button>
</div>
```

```css
.toast {
  position: fixed;
  bottom: var(--spacing-xl);
  right: var(--spacing-xl);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xl);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  animation: slideInUp 0.3s ease;
  z-index: 1000;
}

.toast-success {
  background: var(--success);
  color: white;
}

.toast-error {
  background: var(--error);
  color: white;
}

.toast-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  margin-left: var(--spacing-md);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Responsive Design

#### Breakpoints

```css
/* Mobile First Approach */

/* Extra Small (Mobile) - Default */
/* 320px - 480px */

/* Small (Large Mobile / Small Tablet) */
@media (min-width: 481px) {
  /* Styles for 481px+ */
}

/* Medium (Tablet) */
@media (min-width: 769px) {
  /* Styles for tablets */
}

/* Large (Desktop) */
@media (min-width: 1025px) {
  /* Styles for desktops */
}

/* Extra Large (Large Desktop) */
@media (min-width: 1281px) {
  /* Styles for large screens */
}
```

#### Mobile Optimizations

```css
/* Touch-friendly targets (minimum 44x44px) */
@media (max-width: 768px) {
  .btn {
    min-height: 44px;
    min-width: 44px;
  }
  
  .input-field {
    min-height: 44px;
    font-size: 16px; /* Prevent zoom on iOS */
  }
  
  /* Larger text for readability */
  body {
    font-size: 18px;
  }
  
  /* Stack columns */
  .features-grid,
  .problem-grid {
    grid-template-columns: 1fr;
  }
  
  /* Hide less important content */
  .nav-links {
    display: none;
  }
  
  /* Hamburger menu */
  .mobile-menu-btn {
    display: block;
  }
}
```

### Accessibility Design

#### Focus Indicators

```css
/* Keyboard focus */
*:focus {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
}

/* Skip to content link */
.skip-to-content {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary);
  color: white;
  padding: 8px;
  z-index: 100;
}

.skip-to-content:focus {
  top: 0;
}
```

#### ARIA Labels

```html
<!-- Button with icon -->
<button class="btn" aria-label="Close dialog">
  <span aria-hidden="true">&times;</span>
</button>

<!-- Input with error -->
<input
  type="text"
  id="email"
  aria-describedby="email-error"
  aria-invalid="true"
/>
<span id="email-error" role="alert">
  Please enter a valid email
</span>

<!-- Loading state -->
<button class="btn loading" aria-busy="true">
  Loading...
</button>
```

#### Screen Reader Text

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

```html
<button>
  <span class="sr-only">Search</span>
  <span aria-hidden="true">🔍</span>
</button>
```

### Animation Design

#### Transition Timing

```css
:root {
  --transition-fast: 150ms;
  --transition-base: 250ms;
  --transition-slow: 350ms;
  --transition-slower: 500ms;
  
  --easing-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### Micro-interactions

```css
/* Button hover */
.btn:hover {
  transform: translateY(-2px);
  transition: transform var(--transition-base) var(--easing-ease-out);
}

/* Card hover */
.card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  transition: all var(--transition-base) var(--easing-ease-out);
}

/* Input focus */
.input-field:focus {
  transform: scale(1.01);
  transition: all var(--transition-fast) var(--easing-ease-out);
}
```

#### Page Transitions

```css
/* Fade in on load */
.fade-in {
  animation: fadeIn var(--transition-slow) var(--easing-ease-in);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Slide up on scroll */
.slide-up {
  animation: slideUp var(--transition-slow) var(--easing-ease-out);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Security Design

### Authentication Flow (Future Phase)

```
1. User requests authentication
   ↓
2. System sends OTP to email/phone
   ↓
3. User enters OTP
   ↓
4. System verifies OTP
   ↓
5. Generate JWT token (24-hour expiry)
   ↓
6. Return token to client
   ↓
7. Client stores in httpOnly cookie (not localStorage)
   ↓
8. Include token in Authorization header for API requests
   ↓
9. Server validates token on each request
   ↓
10. If expired, refresh or re-authenticate
```

**JWT Payload**:
```json
{
  "sub": "user_id_12345",
  "session_id": "abc-def-ghi",
  "tier": "free",
  "iat": 1678886400,
  "exp": 1678972800
}
```

### Input Validation & Sanitization

**Frontend Validation**:
```javascript
function validateQuery(query) {
  // Length check
  if (query.length < 5) {
    return { valid: false, error: "Query too short (minimum 5 characters)" };
  }
  if (query.length > 500) {
    return { valid: false, error: "Query too long (maximum 500 characters)" };
  }
  
  // Basic sanitization
  const sanitized = query.trim().replace(/<script.*?>.*?<\/script>/gi, '');
  
  // Check for suspicious patterns
  if (containsSQLKeywords(sanitized)) {
    return { valid: false, error: "Invalid characters detected" };
  }
  
  return { valid: true, sanitized };
}
```

**Backend Validation**:
```python
from bleach import clean
from sql_metadata import Parser

def validate_and_sanitize(query):
    # HTML sanitization
    sanitized = clean(query, tags=[], strip=True)
    
    # SQL injection detection
    if Parser(sanitized).tables:
        raise ValidationError("SQL keywords detected")
    
    # XSS prevention
    sanitized = html.escape(sanitized)
    
    # Length validation
    if len(sanitized) < 5 or len(sanitized) > 500:
        raise ValidationError("Invalid query length")
    
    return sanitized
```

### Rate Limiting

**Token Bucket Algorithm**:
```python
class RateLimiter:
    def __init__(self, redis_client):
        self.redis = redis_client
    
    def check_rate_limit(self, identifier, limit=10, window=3600):
        """
        Check if request is within rate limit
        
        Args:
            identifier: IP address or user ID
            limit: Maximum requests per window
            window: Time window in seconds
        
        Returns:
            (allowed: bool, remaining: int, reset_time: int)
        """
        key = f"ratelimit:{identifier}"
        current_time = int(time.time())
        
        # Get current count
        pipe = self.redis.pipeline()
        pipe.zremrangebyscore(key, 0, current_time - window)
        pipe.zcard(key)
        pipe.zadd(key, {current_time: current_time})
        pipe.expire(key, window)
        
        results = pipe.execute()
        count = results[1]
        
        if count >= limit:
            reset_time = int(self.redis.zrange(key, 0, 0)[0]) + window
            return False, 0, reset_time
        
        remaining = limit - count - 1
        reset_time = current_time + window
        
        return True, remaining, reset_time
```

**Rate Limit Headers**:
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1678886400
```

### Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https://api.ailiteracybharat.org;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
">
```

### HTTPS & TLS Configuration

**Nginx Configuration**:
```nginx
server {
    listen 443 ssl http2;
    server_name ailiteracybharat.org;
    
    # SSL Certificate
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # TLS 1.3 only
    ssl_protocols TLSv1.3;
    ssl_ciphers 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384';
    
    # HSTS (force HTTPS for 1 year)
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    
    # Additional security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name ailiteracybharat.org;
    return 301 https://$server_name$request_uri;
}
```

---

## Deployment Design

### Infrastructure Architecture

```
┌─────────────────────────────────────────────┐
│         CloudFlare CDN & DDoS Protection    │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│         AWS/GCP Load Balancer (ELB/ALB)     │
└─────┬──────────────────────────────┬────────┘
      │                              │
      ▼                              ▼
┌─────────────┐              ┌─────────────┐
│  Web Server │              │  Web Server │
│   Instance  │              │   Instance  │
│   (Nginx)   │              │   (Nginx)   │
└──────┬──────┘              └──────┬───────┘
       │                            │
       │         ┌──────────────────┘
       │         │
       ▼         ▼
┌─────────────────────────────────────────────┐
│      Application Servers (Auto-scaling)     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ App Pod  │  │ App Pod  │  │ App Pod  │  │
│  │(Python/  │  │(Python/  │  │(Python/  │  │
│  │ Node.js) │  │ Node.js) │  │ Node.js) │  │
│  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────┘
       │                │              │
       ├────────────────┼──────────────┤
       ▼                ▼              ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ PostgreSQL  │  │    Redis    │  │Elasticsearch│
│  (Primary)  │  │   Cluster   │  │   Cluster   │
└─────────────┘  └─────────────┘  └─────────────┘
       │
       ▼
┌─────────────┐
│ PostgreSQL  │
│  (Replica)  │
└─────────────┘
```

### Deployment Environments

#### Development
- **Purpose**: Local development, testing
- **Infrastructure**: Docker Compose
- **Database**: Local PostgreSQL
- **Domain**: localhost:3000

#### Staging
- **Purpose**: Pre-production testing, QA
- **Infrastructure**: AWS/GCP (1 instance)
- **Database**: Shared PostgreSQL
- **Domain**: staging.ailiteracybharat.org

#### Production
- **Purpose**: Live user traffic
- **Infrastructure**: AWS/GCP (multi-instance, auto-scaling)
- **Database**: PostgreSQL (primary + replica)
- **Domain**: ailiteracybharat.org

### Docker Configuration

**Dockerfile**:
```dockerfile
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Run application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4", "--timeout", "30", "app:app"]
```

**docker-compose.yml** (Development):
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/ailiteracy
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - db
      - redis
    volumes:
      - ./app:/app

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: ailiteracy
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### CI/CD Pipeline

**GitHub Actions** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: pip install -r requirements.txt -r requirements-dev.txt
      - name: Run tests
        run: pytest tests/ --cov=app --cov-report=xml
      - name: Run linter
        run: flake8 app/
      - name: Security check
        run: bandit -r app/

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker image
        run: docker build -t ailiteracy:${{ github.sha }} .
      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker tag ailiteracy:${{ github.sha }} ailiteracy/app:latest
          docker push ailiteracy/app:latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.PROD_HOST }}
          username: ${{ secrets.PROD_USER }}
          key: ${{ secrets.PROD_SSH_KEY }}
          script: |
            cd /opt/ailiteracy
            docker-compose pull
            docker-compose up -d
            docker system prune -f
```

### Monitoring & Alerting

**Prometheus Configuration** (`prometheus.yml`):
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'ailiteracy-app'
    static_configs:
      - targets: ['app:8000']
    metrics_path: /metrics

  - job_name: 'nginx'
    static_configs:
      - targets: ['nginx:9113']

  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']
```

**Grafana Dashboards**:
1. **Application Metrics**:
   - Request rate
   - Response time (p50, p95, p99)
   - Error rate
   - Active users

2. **Infrastructure Metrics**:
   - CPU usage
   - Memory usage
   - Disk I/O
   - Network traffic

3. **Business Metrics**:
   - Queries per hour
   - Average accuracy score
   - User satisfaction (ratings)
   - Domain distribution

**Alert Rules**:
```yaml
groups:
  - name: ailiteracy_alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status="5xx"}[5m]) > 0.05
        for: 5m
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value }} errors/sec"

      - alert: SlowResponseTime
        expr: http_request_duration_seconds{quantile="0.95"} > 10
        for: 5m
        annotations:
          summary: "Slow response time"
          description: "95th percentile response time is {{ $value }} seconds"

      - alert: DatabaseDown
        expr: up{job="postgres"} == 0
        for: 1m
        annotations:
          summary: "Database is down"
          description: "PostgreSQL is not responding"
```

---

## Testing Design

### Test Strategy

#### Test Pyramid

```
         /\
        /  \  E2E Tests (5%)
       /────\
      /      \  Integration Tests (20%)
     /────────\
    /          \  Unit Tests (75%)
   /────────────\
```

### Unit Tests

**Intent Classifier Tests**:
```python
import pytest
from app.modules.intent_analyzer import IntentClassifier

@pytest.fixture
def classifier():
    return IntentClassifier()

def test_health_domain_classification(classifier):
    query = "corona vaccine safe hai?"
    result = classifier.classify(query)
    
    assert result["domain"] == "health"
    assert result["confidence"] > 0.8

def test_education_domain_classification(classifier):
    query = "best engineering college in Mumbai"
    result = classifier.classify(query)
    
    assert result["domain"] == "education"
    assert result["confidence"] > 0.8

def test_mixed_language_handling(classifier):
    query = "sarkari scheme kaise apply kare"
    result = classifier.classify(query)
    
    assert result["detected_language"] == "hinglish"
    assert result["domain"] == "government"
```

**Clarification Generator Tests**:
```python
from app.modules.clarification import ClarificationGenerator

def test_health_clarification_generation():
    gen = ClarificationGenerator()
    intent = {
        "domain": "health",
        "missing_context": ["audience"],
        "language": "en"
    }
    
    result = gen.generate(intent)
    
    assert "Who is this" in result["question"]
    assert result["language"] == "en"

def test_education_clarification_generation():
    gen = ClarificationGenerator()
    intent = {
        "domain": "education",
        "missing_context": ["constraints"],
        "language": "en"
    }
    
    result = gen.generate(intent)
    
    assert ("budget" in result["question"].lower() or 
            "location" in result["question"].lower())
```

### Integration Tests

**API Endpoint Tests**:
```python
import pytest
from app import create_app

@pytest.fixture
def client():
    app = create_app('testing')
    with app.test_client() as client:
        yield client

def test_analyze_query_endpoint(client):
    response = client.post('/api/v1/analyze-query', json={
        "query": "corona vaccine safe?",
        "language_preference": "en"
    })
    
    assert response.status_code == 200
    data = response.get_json()
    assert "query_id" in data
    assert "clarification" in data
    assert data["intent_analysis"]["domain"] == "health"

def test_submit_clarification_endpoint(client):
    # First, analyze query
    response1 = client.post('/api/v1/analyze-query', json={
        "query": "best college for engineering"
    })
    query_id = response1.get_json()["query_id"]
    
    # Then, submit clarification
    response2 = client.post('/api/v1/submit-clarification', json={
        "query_id": query_id,
        "clarification_answer": "in Mumbai, under 10 lakh fees"
    })
    
    assert response2.status_code == 200
    data = response2.get_json()
    assert "full_response" in data
    assert "sources" in data
    assert "accuracy_score" in data

def test_rate_limiting(client):
    # Send 11 requests (limit is 10)
    for i in range(11):
        response = client.post('/api/v1/analyze-query', json={
            "query": f"test query {i}"
        })
    
    # Last request should be rate limited
    assert response.status_code == 429
    assert "Rate limit exceeded" in response.get_json()["error"]
```

### End-to-End Tests

**Selenium Tests** (Web UI):
```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_complete_workflow():
    driver = webdriver.Chrome()
    driver.get("http://localhost:3000")
    
    try:
        # Step 1: Enter query
        query_input = driver.find_element(By.ID, "userQuery")
        query_input.send_keys("corona vaccine safe hai?")
        
        analyze_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Analyze')]")
        analyze_button.click()
        
        # Step 2: Wait for clarification
        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.ID, "clarificationQuestion"))
        )
        
        clarification_input = driver.find_element(By.ID, "clarificationAnswer")
        clarification_input.send_keys("for my 60-year-old mother")
        
        submit_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Submit')]")
        submit_button.click()
        
        # Step 3: Wait for response
        WebDriverWait(driver, 30).until(
            EC.visibility_of_element_located((By.ID, "aiResponse"))
        )
        
        response = driver.find_element(By.ID, "aiResponse").text
        assert len(response) > 100  # Response should be substantial
        assert "WHO" in response or "vaccine" in response  # Should contain relevant info
        
    finally:
        driver.quit()
```

### Performance Tests

**Load Testing with Locust**:
```python
from locust import HttpUser, task, between

class AILiteracyUser(HttpUser):
    wait_time = between(1, 3)
    
    @task(3)
    def analyze_query(self):
        self.client.post("/api/v1/analyze-query", json={
            "query": "best college engineering",
            "language_preference": "en"
        })
    
    @task(2)
    def submit_clarification(self):
        # Assume query_id from previous request
        self.client.post("/api/v1/submit-clarification", json={
            "query_id": "12345",
            "clarification_answer": "in Mumbai under 10L"
        })
    
    @task(1)
    def rate_response(self):
        self.client.post("/api/v1/rate-response", json={
            "query_id": "12345",
            "rating": 5
        })

# Run: locust -f tests/performance/locustfile.py --host=http://localhost:8000
```

**Expected Results**:
- 100 concurrent users: < 1 second avg response
- 500 concurrent users: < 3 seconds avg response
- 1000 concurrent users: < 5 seconds avg response
- Error rate: < 1%

---

**Document Version**: 1.0  
**Last Updated**: February 15, 2026  
**Next Review**: May 15, 2026  
**Document Owner**: Technical Lead, AI Literacy Bharat

---

*End of Design Document*