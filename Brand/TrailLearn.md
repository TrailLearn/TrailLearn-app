
# TrailLearn - Features Specification (Consolidated)

## 🎯 Application Goal

The objective of this application is to facilitate orientation and support for young people and students worldwide, while ensuring their integration into foreign countries.

This mobile and web application will include features such as profile and member management, chats and forums, recommendations and notification feeds for important information regarding CVs, scholarships, application opportunities, international integration, subscription management, support fundraising, and much more.

---

## 👥 Dual Profile System Architecture

**CRITICAL**: TrailLearn implements a **dual profile system** similar to Udemy's student/instructor model. Every user account has TWO profile types:

### Profile Types

**1. Trailler Profile (Student)** - Active by default
- **Automatically created** upon registration
- **Primary functions**:
  - Search and save scholarships
  - Access forums (read/post based on subscription)
  - Find and request mentors
  - Use AI Career Coach and goal management
  - Access country integration guides
  - Attend events and webinars
  - Track administrative checklists
- **Color theme**: Deep Blue (#2563EB)
- **Icon**: Student/graduation cap icon
- **Always accessible** regardless of mentor status

**2. Mentor Profile** - Must be activated/unlocked
- **Optional activation** through application process
- **Requires**:
  - Application submission (5-10 minutes)
  - Admin review (3-5 business days)
  - Optional interview (15 minutes)
  - Approval by operations team
- **Primary functions**:
  - Mentor dashboard with performance metrics
  - Manage mentees and sessions
  - Set availability and capacity
  - Track earnings and bonuses
  - Access mentor resources and training
  - Respond to mentoring requests
  - Build reputation through ratings and reviews
- **Color theme**: Emerald Green (#10B981)
- **Icon**: Mentor/teacher icon
- **Unlocked after approval** only

### Profile Switching Mechanism

**UI Component**: Profile Switcher (persistent in top navigation)

**Location**: Between main menu and user avatar in top navigation bar

**States**:

**State 1: Mentor NOT Activated**
```
[🔒 Become a Mentor] (outlined button, gray)
```
- Click opens modal with mentor benefits and "Start Application" CTA
- Visible to all users who haven't activated mentor profile

**State 2: In Trailler Mode (Mentor Activated)**
```
[👨‍🎓 Trailler Mode ▼] (blue filled button with dropdown)
```
- Dropdown menu shows:
  - ✓ Trailler Mode (current, blue checkmark)
  - Switch to Mentor Mode → (arrow icon)
  - Manage Profiles (settings icon)

**State 3: In Mentor Mode**
```
[👨‍🏫 Mentor Mode ▼] (3) (green filled button with notification badge)
```
- Notification badge shows pending mentee requests count
- Dropdown menu shows:
  - Switch to Trailler Mode → (arrow icon)
  - ✓ Mentor Mode (current, green checkmark)
  - Mentor Dashboard (link, if not already there)
  - Manage Profiles (settings icon)

**Switching Behavior**:
- One-click toggle between modes
- Page refreshes to appropriate dashboard
- Mode persists across sessions (stored in user preferences)
- Mobile: Swipe gesture alternative + confirmation toast
- Smooth transition animation (200ms)

**Navigation Changes by Mode**:

**Trailler Mode Navigation**:
```
Dashboard | Scholarships | Opportunities | Forums | Mentors | Events | Integration Guide
```

**Mentor Mode Navigation**:
```
Dashboard | My Mentees | Availability | Earnings | Resources
```

### Business Logic Rules

1. **Profile Creation**:
   - Trailler profile: Created automatically on registration
   - Mentor profile: Created only when user submits application

2. **Access Control**:
   - Trailler features: Available to all authenticated users
   - Mentor features: Available only if `mentor_activated = true AND mentor_profiles.status = 'approved'`
   - Admin can suspend mentor profile without deleting account

3. **Data Isolation**:
   - Trailler data (favorites, goals, checklists) accessible in both modes
   - Mentor data (mentees, earnings, sessions) accessible only in mentor mode
   - RLS policies enforce access based on `active_profile_mode`

4. **Switching Rules**:
   - Can switch from Trailler → Mentor only if mentor activated
   - Can always switch from Mentor → Trailler
   - Switching updates `profiles.active_profile_mode`
   - Notifications filtered by active mode

5. **Subscription Implications**:
   - Subscription tier applies to trailler profile
   - Mentor earnings separate from subscription
   - Premium mentors may get priority visibility (future feature)

---

## 📋 Core Features

### a. Scholarship Search Abroad

**Description**: Enable traillers to search, filter, view, save, and track scholarships at foreign or local schools with AI-powered data collection and admin validation.

The feature must provide a paginated list, advanced filters, detailed scholarship cards, and a favorites system whose access depends on the subscription type.

**Data Collection Strategy**: Hybrid approach using:
- Manual curation (admin-verified, high trust)
- Web scraping (government sites like DAAD, Campus France)
- API integration (open-source scholarship APIs)
- Community submissions (user-contributed, admin-validated)

**Veracity Tags**: All scholarships tagged by source (manual, scraped, api, community) for transparency.

**Objectives for traillers**:
- Quickly find relevant scholarships according to their profile
- Trust the data source (transparent veracity tags)
- Not miss scholarship deadlines
- Save/track their favorite scholarships

**Technical Documentation**: See `Development/ScholarshipDataPipeline.md` for complete implementation details.

---

### a.2. Opportunities Search (Entrance Exams & Application Deadlines)

**Description**: Enable traillers to search, filter, view, save, and track academic opportunities including:
- Entrance exams (Concours Mines-Ponts, GRE, GMAT, etc.)
- School application opening/closing dates
- Language test deadlines (TOEFL, IELTS, DELF, TCF)
- Interview periods and document submission deadlines

The feature provides a calendar-integrated view, advanced filters, countdown timers, and reminder functionality.

**Data Collection Strategy**: AI-powered web analysis using:
- **Crawl4AI** for intelligent web scraping of school websites
- Schema-based LLM extraction (GPT-4/Claude) with confidence scoring
- Auto-approval for high-confidence extractions (≥0.85)
- Admin validation for lower-confidence data
- Traditional web scraping for structured sites

**AI Confidence Scoring**: Each opportunity includes an AI confidence score (0.00-1.00):
- ≥0.85: Auto-approved (high confidence)
- 0.70-0.84: Pending admin review (medium confidence)
- <0.70: Requires manual verification (low confidence)

**Opportunity Types**:
- Application deadlines (school admissions)
- Entrance exams (national/international)
- Language tests (TOEFL, IELTS, etc.)
- Interviews and oral exams
- Document submission deadlines
- Orientation sessions

**Objectives for traillers**:
- Discover entrance exam dates and registration windows
- Track application opening/closing dates for target schools
- Set reminders for critical deadlines
- Integrate deadlines with calendar (export .ics)
- View opportunities in calendar format

**Technical Documentation**: See `Development/OpportunitiesDataPipeline.md` for complete implementation details including Crawl4AI integration, database schema, and cron job configuration.

---

### b. Social & Cultural Integration (Destination City)

**Description**: Enable a trailler arriving in a new city/country to integrate quickly and smoothly through:

1. **Arrival Concierge Service** (airport/station pickup, transfer, housing assistance)

2. **Access to Local Groups** (forums, WhatsApp, events)

3. **Directory of Useful Contacts** (housing, transport, health, emergencies)

4. **Local Sponsor** (mentor, ambassador) for on-ground support

**Note**: This feature combines structured content, human connection, and workflows (checklists + tasks) until the goal is achieved: housing found and effective installation.

**Objectives for traillers**:
- Understand what to do and in what order upon arrival
- Have a human contact on-site (sponsor/ambassador)
- Quickly join the local community (groups, events)
- Find housing quickly (leads, visits, applications)
- Have verified contacts (health, security, transport)

**Overall Decision**: V1 for last item in backlog due to trust reasons. Interesting when we have proven ourselves and people trust this application. Connection will necessarily be controlled by administrators.

---

### c. Job Search Support (Alerts, Queues, Bonuses)

**Description**: A two-sided marketplace connecting traillers seeking employment with mentors who can support them through the hiring process.

**How it works**:

**Trailler Side**:
- Create job alerts by country, field, and specialty (e.g., Cyber, Cloud, Data)
- Alerts are placed in specialized queues visible to relevant mentors
- Service fee: €10 subscription + commission on successful contract signing
- Commission varies by mentor profile and expertise
- Traillers with Premium/Pro subscriptions may have reduced/waived fees
- Support includes: application prep, interview practice, CV/cover letter review
- Transparent pricing: commission known upfront before engagement

**Mentor Side**:
- Subscribe to specialty queues matching their expertise (Cyber, Cloud, Data, etc.)
- Receive qualified alerts when traillers post in their specialties
- View trailler CV and profile before accepting to support
- Provide guidance through entire hiring process
- Earn commission on successful contract signatures (permanent, internship, work-study)
- Commission amount is configurable per mentor based on expertise/experience
- Can also leverage company internal co-optation bonuses in addition to platform commission

**Admin Side**:
- Configure commission rates and mentor bonuses
- Validate contract signatures (proof of employment)
- Approve/refuse payment releases
- Monitor for fraud and quality control
- Set global pricing policies

**Objectives**:
- **Trailler**: Get expert support until contract signing, transparent pricing, access to mentor network, leverage co-optation opportunities
- **Mentor**: Monetize expertise, receive qualified leads matching specialization, earn performance-based income
- **Platform**: Create value exchange, ensure quality through validation, sustainable revenue model

---

### d. Administrative Process Assistance (Checklists by Destination)

**Description**: Offer, for each destination (country/city/school), a structured checklist of administrative steps to complete (visa, health insurance, housing, school/university registration, banking, transportation pass, telephony/SIM, health/CPAM, CAF, etc.) with:

- Local recommendations (useful offices, addresses, hours, official links)
- Practical tips (best times, documents to prepare, pitfalls to avoid)
- Clear step-by-step explanations (deadlines, average costs, prerequisites)
- Programmable reminders (D-30/D-7/D-1) and .ics export

**Note**: This is a feature for which we will need to find a way to get internet users to contribute, to create cards for free without necessarily knowing why we're doing it. We could use Google forms that we'll send to people to fill in information about their city, and then we'll have a function to extract this data to classify them into cards in our application. This is a feature that will bring crowds to the application; people coming to France will have the information that they must use this application where they will have everything as information.

**Objectives**:
- Know what to do, in what order and with which documents
- Reduce stress and errors (missed appointments, incomplete file)
- Save time with useful addresses and local tips
- Not miss deadlines (visa, registration, validations)

---

### e. Chats & Forums (Thematic: Scholarships, Cities, Schools, Careers...)

**Description**: Offer discussion spaces for traillers and mentors to ask questions, share resources and get answers around themes (e.g., Scholarships, destination city, school, career field).

**Trailler Perspective**:
- Ask questions and seek advice from community
- Share experiences and resources
- Connect with peers in similar situations
- Report inappropriate content

**Mentor Perspective**:
- Share expertise and guidance
- Answer questions in their specialty areas
- Build reputation through helpful contributions
- Moderate forums they own/manage

**Platform Features**:
- Each forum has a topic and an owner/moderator (second only after TrailLearn admin)
- Discussion threads within forums
- Content reporting and moderation (deletion/ban/lock)
- Forum creation requires approval request
- Smart suggestions: Before creating a forum, system suggests existing similar forums (Microsoft-style)
- If similar forums exist, user invited to join; if they insist on creating new one, must provide justification
- Admin sees flag if similar forum exists to make informed approval decision

**Sub-features**:
1. **Platform Chat Implementation** (V2)
2. **Communities, Forums Implementation** (V1)

**Objectives**:
- **Traillers**: Discuss and find answers quickly, organize exchanges by themes (scholarship, visa, housing, school), report dangerous content
- **Mentors**: Share expertise, build reputation, engage with community, moderate responsibly
- **Platform**: Reduce spam, ensure quality content, prevent forum proliferation

---

### f. News Feed & Recommendations Subscription

**Description**: Enable traillers to subscribe to thematic feeds and receive a personalized feed (in-app) as well as a weekly email (and/or SMS) with:

- New scholarships matching their profile
- Upcoming deadlines (D-30/D-7/D-1)
- Events not to miss
- Recommendations (mentors, forums, relevant checklists)

The trailler chooses their themes, channels (email, SMS, WhatsApp, In-App), and frequencies (immediate, daily, weekly). Fine-grained preference management and unsubscribe option.

**Sub-features**:
1. **Email Notifications**
2. **Subscribe to Thematic Feeds**

**Objectives**:
- Be kept informed without having to search manually
- Miss zero important deadlines
- Receive useful recommendations (targeted to their profile/destination)

---

### g. AI Orientation & Career Recommendations (IKIGAI-driven)

**Description**: An AI-powered orientation system that provides personalized career guidance and recommendations based on the user's IKIGAI profile and target environment.

**Core Concept - IKIGAI Framework**:
The AI analyzes four dimensions:
- **What I love** (passions, interests)
- **My talents** (skills, strengths)
- **What the world needs** (market demand, societal needs)
- **What I can be paid for** (viable careers, earning potential)

**Two-Way Reasoning**:
1. **Goal → Location**: "I want career X ⇒ where is it most favorable?" (which city/country/region?)
2. **Location → Goal**: "I want to evolve in [city/country] ⇒ which career is most suitable?"

**Recommendations Include**:
- **Training paths**: Schools, masters, bootcamps, MOOCs relevant to goals
- **Career positions**: Data/AI/Cyber/Cloud positions matching profile and market
- **Certifications**: Relevant certifications (AWS, Azure, GCP, etc.) prioritized by value
- **Growth careers**: Careers with high growth potential in target environment
- **Environment analysis**: City/region/country analysis (language requirements, cost of living, market tension, visa policies, salary ranges, growth sectors)

**Environment Context**:
- Language requirements and proficiency needed
- Cost of living and target salary alignment
- Market demand (job availability, competition)
- Visa/immigration policies
- Cultural fit considerations
- Growth sectors in the region

**User Interaction**:
- Subscribe to AI orientation service
- Complete IKIGAI assessment (questionnaire + profile analysis)
- Set preferences: target environments, career interests, constraints (budget, language, timeline)
- Receive 3+ concrete action paths with detailed steps
- Update preferences anytime to get revised recommendations
- Get career sheets, school recommendations, certification roadmaps

**Objectives**:
- Clarify career direction based on personal profile and market realities
- Understand which careers align with IKIGAI and target environment
- Obtain actionable paths (not just abstract advice)
- Know which certifications to prioritize and why
- Visualize career-environment fit in both directions
- Make informed decisions about education and location

---

### h. Events (Webinars & Bootcamps)

**Description**: Enable traillers to discover, register for, and participate in webinars/bootcamps organized by the platform or partners.

**Trailler Perspective**:
- Browse upcoming events (theme, date, speakers)
- Register in 1 minute
- Receive automatic reminders (D-1/H-1 by email/SMS)
- Access replays and resources (slides, links) after event

**Mentor Perspective** (via MLM feature):
- Host webinars and bootcamps
- Earn points and reputation
- Attract potential mentees
- Build community presence

**Platform Features**:
- Events page (list of upcoming events)
- Detailed event cards + registration form
- Automatic reminders (D-1/H-1 by email/SMS)
- Replay accessibility after event (if available)
- Integration with calendar system

**Objectives**:
- **Traillers**: Quickly see what's happening soon, register easily, receive useful reminders, access replays
- **Mentors**: Share expertise, attract students, build reputation
- **Platform**: Engage community, provide value, capture registrations

---

### i. AI Coach & Smart Goal Management System

**Description**: An intelligent coaching system that helps students transform intentions into executable actions through automated goal creation, smart reminders, and continuous support.

**Core Capabilities**:

1. **Automatic Goal Creation**:
   - AI analyzes user profile, destination, and timelines
   - Automatically generates and schedules goals in student's calendar
   - Categories: Administrative, Academic, Career, Personal

2. **Goal Types & Sources**:
   - **Administrative goals**: Visa applications, document preparation, insurance/CAF/CPAM appointments, residence permits, tax declarations
   - **Academic goals**: Course registration, exam prep, project deadlines, assignment submissions
   - **Career goals**: CV design/improvement, application submissions, interview prep, skill development, certification study
   - **Scholarship goals**: Application deadlines, document gathering, essay writing
   - **User-created goals**: Custom SMART goals defined by student

3. **Smart Assistance Features**:
   - **Next Best Action (NBA)**: AI suggests the most impactful next step based on priorities, deadlines, and dependencies
   - **Smart reminders**: Context-aware notifications (if delay detected, close deadline, inactivity)
   - **Improvement proposals**: Action plans, templates, checklists, resources to help achieve goals
   - **Automatic rescheduling**: Conflict detection and resolution suggestions
   - **Progress tracking**: Visual progress indicators and milestone completion

4. **AI Support & Templates**:
   - CV/cover letter templates and improvement suggestions
   - Mock interview scenarios and feedback
   - Application essay guidance
   - Document checklists with examples
   - Resource recommendations (articles, courses, tools)

5. **Integration with Other Modules**:
   - **Scholarships**: Deadlines automatically become goals with document prep tasks
   - **Administrative checklists**: Checklist items become trackable goals
   - **Employment module**: Mock interviews, application tracking as goals
   - **Events**: Event registrations create "attend/watch replay" goals
   - **Mentor collaboration**: Optional goal sharing with mentor for joint tracking

6. **Calendar Integration**:
   - Centralized calendar view (monthly/weekly/task views)
   - .ics export for external calendars
   - Time zone handling
   - Quiet hours respect
   - In-app, email, and SMS reminders

**User Workflow**:
1. Student completes profile with destination, timeline, and goals
2. AI generates initial goal set automatically
3. Student can add, edit, or remove goals
4. AI suggests Next Best Action daily/weekly
5. Smart reminders keep student on track
6. Templates and resources provided for each goal
7. Progress tracked and visualized
8. Mentor can be invited to collaborate on specific goals

**Objectives**:
- Know what to do, when, and how without forgetting anything
- Transform abstract intentions into concrete planned actions
- Receive actionable advice (templates, checklists, resources) to progress
- Continuous tracking with proactive assistance
- Reduce cognitive load through automation
- Conflict resolution and priority management
- Measurable progress and achievement visibility

---

### j. Mentoring System (Two-Sided Matching & Support)

**Description**: A comprehensive mentoring platform connecting traillers with expert mentors for personalized guidance and support.

**Mentor Perspective**:

**Mentor Onboarding & Profile**:
- Submit mentor application with credentials
- Define areas of expertise (Data, AI, Cyber, Cloud, specific industries, etc.)
- Set monthly capacity (number of traillers they can actively mentor)
- Configure availability slots and scheduling preferences
- Specify languages spoken and timezone
- Upload portfolio, certifications, references
- Pass validation process (admin review + optional interview)
- Complete background check (for ambassadors/on-ground support)

**Mentor Capabilities**:
- Receive AI-matched trailler requests based on expertise and availability
- View trailler profile, goals, and background before accepting
- Accept/decline mentoring requests
- Manage active mentees (dashboard view)
- Communicate via dedicated mentoring threads
- Provide various support types (see below)
- Track mentee progress and goals
- Earn reputation through reviews and ratings
- Receive compensation for certain services (job placement, premium support)

**Mentor Support Types**:
- **Competition coaching**: Entrance exams, competitive selections
- **Interview preparation**: School admissions, hiring processes
- **CV/Cover letter review**: Professional document improvement
- **Application file preparation**: Scholarship applications, school applications
- **Academic orientation**: Field selection, school recommendations
- **Professional orientation**: Career path guidance, industry insights
- **Certification guidance**: Which certifications to pursue, study strategies
- **Skill development**: Learning roadmaps, resource recommendations

**Trailler Perspective**:

**Finding a Mentor**:
- AI recommends 3+ mentors based on:
  - Profile match (trailler's field of interest and mentor's expertise)
  - Target environment (country/city/language/timezone alignment)
  - Objective match (trailler's goals and mentor's specialties)
  - Availability (mentor capacity and scheduling fit)
  - Ratings and reviews (mentor reputation)
- Browse mentor profiles with expertise, availability, reviews
- Request introduction to preferred mentor(s)
- Mentor accepts or declines (with reason if declined)

**Working with a Mentor**:
- Dedicated mentoring thread for centralized communication
- Share goals and progress with mentor (optional from AI Coach)
- Schedule sessions based on mentor availability
- Receive personalized guidance and advice
- Access templates and resources shared by mentor
- Track support plan and milestones
- Leave reviews and ratings after interactions

**Support Delivery**:
- **Mini support plan**: Mentor and trailler agree on goals, timeline, deliverables
- **Structured communication**: Dedicated thread with advice fields, document sharing, session notes
- **Resource sharing**: Mentor provides templates, examples, study materials
- **Accountability**: Regular check-ins and progress reviews
- **Flexibility**: Adjust plan based on progress and changing needs

**Platform Features**:
- AI matching algorithm considering multiple factors
- Capacity management (mentors can't be over-booked)
- Rating and review system (quality control)
- Communication tools (messaging, video calls for V2)
- Document sharing and collaboration
- Session scheduling and reminders
- Payment processing (for paid services)
- Dispute resolution and quality monitoring

**Objectives**:
- **Traillers**: Get expert-matched guidance, comprehensive support, structured learning, accountability, access to insider knowledge
- **Mentors**: Share expertise, earn income/reputation, manage capacity effectively, build mentee network, give back to community
- **Platform**: Ensure quality matches, prevent mentor burnout, facilitate valuable exchanges, create sustainable marketplace

---

### k. Social Integration Assistance (TrailLearn Ambassador Program)

**Description**: Enable local TrailLearn ambassadors to support traillers during their arrival and first steps in a new city through on-ground assistance.

**Ambassador Perspective**:

**Ambassador Onboarding**:
- Apply to become ambassador with local knowledge proof
- Submit identity verification documents
- Provide criminal background check (security requirement)
- Define service area (city/neighborhood coverage)
- Set availability and capacity
- Choose service packages to offer
- Pass admin validation and background screening

**Services Provided** (by package tier):
- **Airport/station pickup** (optional, premium package)
- **Local orientation tour**: Transport system, key landmarks, campus/neighborhood familiarization
- **Administrative guidance**: Where to get SIM card, open bank account, register with health services
- **Housing assistance**: Neighborhood recommendations, accompany to viewings (basic), help schedule visits, provide local insights
- **Practical tips**: Best transport routes, shopping areas, emergency contacts, cultural norms

**Compensation & Gamification**:
- Service fee based on package tier
- Points and badges for completions
- Ratings affect future assignment priority
- Upgrade levels unlock higher-tier packages
- Anti-fraud: Trailler validates checklist of completed services before payment release

**Trailler Perspective**:

**Requesting Ambassador**:
- Select destination city
- Choose service package (basic orientation / airport pickup + orientation / full support with housing help)
- See ambassador profiles with ratings and reviews
- Request specific ambassador or auto-match
- Transparent pricing by package

**Experience**:
- Meet ambassador at agreed location (airport, station, or city center)
- Receive guided orientation tour
- Get practical advice and local contacts
- Visit key administrative locations
- Receive housing search support (if included in package)
- Complete service validation checklist
- Rate and review ambassador

**Quality Control**:
- Checklist validation (trailler confirms services received)
- Rating system (1-5 stars + written review)
- Admin anti-fraud controls
- Ambassador payment released only after validation
- Dispute resolution process

**Objectives**:
- **Traillers**: Smooth arrival experience, local knowledge transfer, practical assistance, housing support, trusted human contact on ground
- **Ambassadors**: Earn income, help community, build reputation, flexible work
- **Platform**: Ensure safety, quality service delivery, fraud prevention, build trust

**Note**: This feature is placed at end of V1 backlog due to trust and safety requirements. Requires established platform reputation before full launch. All ambassador connections controlled by admin validation.

---

### l. Forum Creation & Management by Segments

**Description**: Enable TrailLearn Ambassadors and community leaders to create and manage segmented community spaces with admin oversight.

**Forum Creator/Owner Perspective**:

**Forum Creation Process**:
1. Submit forum creation request with:
   - Forum topic and purpose
   - Target segment/audience
   - Proposed rules and guidelines
   - Justification (why this forum is needed)
2. System suggests existing similar forums (smart duplication prevention)
3. Option to join existing forum or proceed with justification
4. Admin reviews request with duplicate flag indicator
5. Status: Pending → Approved or Rejected (with feedback)

**Forum Moderation Capabilities** (Object-scoped RBAC):

**Forum Owner/Moderator Powers** (for their forum only):
- Edit forum description, rules, and settings
- Delete inappropriate posts/threads
- Lock/unlock threads
- Pin important threads to top
- Ban users from the forum (forum-specific, not platform-wide)
- Grant/revoke moderator roles to other users (for this forum)
- Create announcement threads
- Manage forum-specific tags

**Thread Moderator Powers** (for specific thread):
- Delete/edit posts within thread
- Lock/pin the thread
- Ban users from parent forum (escalation)
- Mark best answers/helpful posts

**Event Feed Moderator Powers**:
- Publish/edit/delete event announcements
- Manage event registrations
- Pin event announcements
- Ban users from parent forum

**Community Member Perspective**:

**As Forum Member**:
- Create new threads within forums
- Reply to existing threads
- Subscribe to forum notifications
- Register for events posted in forum
- Report inappropriate content
- Upvote/mark helpful posts

**As Visitor** (non-member):
- Read public forums
- Request to join private forums
- View forum rules and description

**Segmentation Options** (cumulative):

1. **Geographic Corridor**:
   - Origin country → Host country/city
   - Example: "Cameroon → France", "India → Germany", "Morocco → Canada"

2. **Academic Path**:
   - Education level: Bachelor, Master, Doctorate
   - Discipline: Computer Science, Engineering, Business, Medicine, etc.
   - Example: "Master in Data Science", "PhD Engineering"

3. **Institution**:
   - Specific school or program
   - Example: "UT Troyes Alumni", "M2 Data Science Paris", "HEC MBA"

4. **Professional Activity**:
   - Job role + location
   - Example: "Junior Data Analysts IDF", "Cyber SecOps Montreal", "Cloud Engineers Berlin"

**Admin Perspective**:

**Approval Workflow**:
- Review creation requests with context:
  - Duplicate forum flag (if similar forums exist)
  - Creator reputation and history
  - Segment validity and demand
  - Proposed rules alignment with platform policies
- Approve, reject, or request modifications
- Provide feedback to creator

**Ongoing Management**:
- Global moderation powers (override forum mods)
- Delete any forum/thread/post
- Appoint/remove moderators globally
- Ban users platform-wide
- Set global forum policies
- Monitor forum health metrics (activity, reports, engagement)
- Archive inactive forums
- Handle escalated disputes

**Objectives**:
- **Forum Creators**: Build niche communities, establish leadership, moderate effectively, engage specific audiences
- **Members**: Find relevant peer groups, get targeted advice, network with similar profiles, access specialized knowledge
- **Platform**: Prevent forum proliferation, ensure quality moderation, distribute moderation workload, maintain safety, enable community scaling

---

### m. MLM Marketing & Mentor Gamification (Referral Codes, Score, Badges)

**Description**: Implement a non-financial MLM-style referral program focused on mentors to drive user acquisition, animate community, and reward quality contributions.

**Mentor Perspective**:

**Referral System**:
- Unique referral code assigned (e.g., MENTOR-ABC123)
- Tracked referral link (e.g., https://app.traillearn.com/?ref=MENTOR-ABC123)
- Dashboard showing referral stats and conversions
- Share link via social media, email, forums, events

**Point-Based Scoring System**:

Mentors earn points across multiple axes:

1. **Invites & Registrations**:
   - Points for each successful registration via referral code
   - Bonus for activated users (completed profile, first action)
   - Higher points for invited mentors (more valuable)

2. **Reviews & Ratings**:
   - Points based on rating scores (1-5 stars)
   - Weighted by volume (more reviews = more credibility)
   - Recency factor (recent reviews weighted higher)
   - Bonus for written reviews with detail

3. **Content Contribution**:
   - Useful forum posts (upvotes/marks as helpful)
   - Created guides and resources (views, saves, shares)
   - Answered questions (accepted answers)
   - Tutorial creation and documentation

4. **Event Hosting**:
   - Webinars and bootcamps organized
   - Attendance rate bonus
   - Post-event ratings and feedback
   - Replay views and engagement

5. **AI Contribution**:
   - Feedback on AI recommendations (quality signals)
   - Data labeling and validation (IKIGAI refinement)
   - Resource tagging and categorization
   - Success story sharing (career outcomes)

6. **Partnership Development**:
   - Schools, associations, or recruiters brought to platform
   - Partnership activation and engagement
   - Requires admin validation before points awarded

7. **Second-Level Referrals** (Optional, 1 level max):
   - Light points for mentors invited by your referrals
   - Encourages mentor network growth
   - Disabled by default (legal compliance check required)

**Badge & Status Progression**:
- **Bronze** (0-999 points): Basic mentor access
- **Silver** (1,000-4,999 points): Priority in matching, profile badge
- **Gold** (5,000-14,999 points): Featured mentor status, bonus capacity slots
- **Platinum** (15,000+ points): VIP status, exclusive events access, early feature access

**Benefits by Status**:
- **Priority matching**: Higher rank in AI recommendations
- **Increased visibility**: Featured on mentor discovery pages
- **Capacity bonuses**: Ability to mentor more students
- **Premium features**: Early access to new tools, beta features
- **Discounts**: Reduced platform fees or subscription discounts
- **Exclusive access**: VIP community, direct admin contact, special events

**Trailler Perspective**:

**Using Referral Codes**:
- Enter mentor referral code during registration
- Potential benefits: Discount on first subscription, bonus features trial
- See which mentor referred them (builds initial connection)

**Benefiting from High-Status Mentors**:
- Discover top-rated mentors with badges (Bronze → Platinum)
- Trust signals through gamification status
- Access to mentors with proven track records

**Platform Perspective**:

**Viral Growth Mechanism**:
- Incentivize mentors to invite students and other mentors
- Track attribution and conversion funnels
- A/B test referral incentives
- Monitor referral quality (not just quantity)

**Quality Control**:
- Points can be reduced for negative behaviors (spam, low ratings)
- Admin review of partnership claims
- Anti-fraud detection (fake referrals, review manipulation)
- Decay mechanism for inactive mentors (points expire if no activity)

**Legal Compliance** (CRITICAL):
- **Non-financial model**: No multi-level cash commissions (pyramid scheme avoidance)
- **Value-based rewards**: Points → product benefits, not direct money
- **Single-level preferred**: Second-level referrals optional and requires legal validation
- **Transparent rules**: Clear point calculation and redemption policies
- **Regional compliance**: Check MLM regulations in EU, US, target markets

**Objectives**:
- **Mentors**: Recognition, status, increased visibility, tangible benefits, community leadership
- **Traillers**: Discover quality mentors, trust through reputation, referral benefits
- **Platform**: Viral user acquisition, community engagement, quality content creation, sustainable growth, mentor retention

**Important Note**: All financial aspects require legal review before implementation. Default to non-financial rewards (status, access, visibility) to avoid pyramid scheme regulations.

---

### n. Automatic Student Calendar (Administrative & Academic Lifecycle)

**Description**: A centralized, intelligent calendar system that automatically creates and maintains events and reminders for student administrative obligations and academic milestones, personalized by destination country/region/city.

**Calendar Categories**:

1. **Immigration & Residence**:
   - VLS-TS validation deadlines (France-specific)
   - Residence permit application/renewal
   - Prefecture appointments
   - Visa expiration warnings
   - Work authorization renewals

2. **Student Aid & Benefits**:
   - Scholarship application deadlines
   - Housing aid (CAF) application and renewal (France)
   - Student transport pass purchase periods
   - Health insurance enrollment/renewal (CPAM, mutuelle)
   - Student status validation deadlines

3. **Tax & Financial**:
   - Tax declaration periods (by country)
   - Income reporting deadlines
   - Scholarship income declaration
   - Bank document requirements (proof of enrollment, etc.)

4. **Academic Milestones**:
   - University registration/re-enrollment periods
   - Tuition payment deadlines
   - Course selection windows
   - Exam periods
   - Certificate/transcript request deadlines
   - Graduation requirements tracking

5. **Health & Insurance**:
   - Health check appointments (mandatory for some visas)
   - Insurance policy renewals
   - Vaccination requirements
   - Medical certificate deadlines

6. **Housing & Utilities**:
   - Lease renewal periods
   - Housing deposit returns
   - Utility contract management
   - DORM/residence application periods

**Auto-Generation Logic**:

**Profile-Based**:
- Extract destination country, city, region from user profile
- Identify education level (bachelor, master, PhD)
- Determine arrival date and expected duration
- Consider nationality (affects visa requirements)

**Template Application**:
- Apply country/city-specific calendar template
- Adjust dates based on user's arrival date
- Calculate deadlines based on regulatory timelines
- Add buffer time before critical deadlines

**Dynamic Updates**:
- Monitor for regulation changes (visa policies, deadlines)
- Update affected events automatically
- Notify users of changes to their calendar

**Integration with Other Modules**:

1. **Administrative Checklists**: Checklist items become calendar events with deadlines
2. **AI Coach Goals**: Calendar deadlines trigger goal creation and reminders
3. **Scholarships**: Application deadlines auto-added to calendar
4. **Events**: Webinar/bootcamp registrations appear on calendar
5. **Mentoring**: Session scheduling integrated

**Reminder System**:

**Multi-Channel**:
- In-app notifications
- Email reminders
- SMS alerts (for critical deadlines)
- Push notifications (mobile PWA/app)

**Smart Timing**:
- D-30 (1 month before): Early warning
- D-7 (1 week before): Preparation reminder
- D-1 (1 day before): Final reminder
- Customizable: Users can adjust reminder preferences

**Time Zone Handling**:
- Automatic timezone detection
- Deadlines shown in local time
- Handles DST changes

**Quiet Hours**:
- Respect user's quiet hours settings
- No notifications during sleep hours
- Emergency override for truly critical deadlines

**Calendar Features**:

**Views**:
- Monthly calendar view (traditional grid)
- Weekly agenda view (detailed)
- Task/deadline list view (sorted by urgency)
- Timeline view (visual gantt-style)

**Filtering**:
- Filter by category (immigration, academic, financial)
- Show only upcoming (next 30/60/90 days)
- Completed vs pending items
- Critical vs routine deadlines

**Actions**:
- Mark task/event as complete
- Snooze reminder (reschedule)
- Export to .ics (Google Calendar, Outlook, Apple Calendar)
- Share calendar view with mentor
- Print monthly view

**Collaboration**:
- Share specific events with mentor for support
- Mentor can see trailler's calendar (with permission)
- Add notes/documents to calendar events
- Track completion status with mentor oversight

**Objectives**:
- Miss no critical deadline (legal, academic, financial consequences avoided)
- Reduce cognitive load (automatic generation, no manual entry)
- Centralized visibility (everything in one place)
- Personalized to destination (not generic global calendar)
- Proactive assistance (reminders before it's too late)
- Integration across platform (unified experience)
- Peace of mind (trust that nothing falls through cracks)

---

### o. Feedback, Ratings & Status System (Gamification + Quality Control)

**Description**: A comprehensive feedback and gamification system enabling traillers to rate experiences, earn status progression, and unlock benefits while preventing abuse.

**Rating Targets**:

1. **Mentors / Ambassadors** (after real interaction):
   - 1-5 star rating
   - Written review (optional but encouraged)
   - Specific criteria: Expertise, Communication, Helpfulness, Responsiveness
   - Context captured: Service type, duration, topic

2. **Platform Overall**:
   - Overall experience rating
   - Module-specific ratings (Scholarship search, AI Coach, Forums, etc.)
   - Feedback collection for improvements
   - NPS (Net Promoter Score) surveys

**Trailler Gamification System**:

**Point Earning Activities**:
- Complete profile sections (+50 points)
- Write helpful reviews (+20 points per review)
- Attend events (+15 points)
- Achieve goals via AI Coach (+10-50 points based on goal complexity)
- Contribute to forums (helpful posts) (+5-15 points)
- Successful scholarship applications (+100 points)
- Refer other students (+25 points per signup)
- Complete administrative checklists (+30 points)

**Status Progression**:
- **Bronze** (0-499 points): New member, base features
- **Silver** (500-1,999 points): Active member, 5% subscription discount
- **Gold** (2,000-4,999 points): Engaged member, 10% discount, priority support
- **Platinum** (5,000+ points): Elite member, 15% discount, exclusive features, beta access

**Benefits by Status**:

| Benefit | Free | Plus | Pro |
|---------|------|------|-----|
| **Bronze Status** | Base features | All Plus features | All Pro features |
| **Silver Status** | 5% Plus discount | 5% Pro discount | Priority support access |
| **Gold Status** | 10% Plus discount | 10% Pro discount | Dedicated account manager |
| **Platinum Status** | 15% Plus discount + 1 free month trial | 15% Pro discount + priority matching | VIP access + early features |

**Anti-Abuse Mechanisms**:

1. **Interaction Verification**:
   - Can only review after confirmed interaction
   - System verifies mentor session occurred before allowing review
   - Ambassador service must be completed (checklist validated)
   - One review per interaction maximum

2. **Identity Verification**:
   - Phone number verification (SMS code)
   - Email verification required
   - Light KYC for Platinum status (optional: ID upload)

3. **Duplicate/Multi-Account Detection**:
   - Device fingerprinting
   - IP address monitoring
   - Email/phone pattern analysis
   - Behavior pattern recognition (rapid point farming)

4. **Review Quality Control**:
   - Flag reviews for admin review if suspicious
   - Detect spam/template reviews (text similarity analysis)
   - Weight reviews by reviewer reputation
   - Downrank or hide reviews from flagged accounts

5. **Point Decay/Expiry**:
   - Points expire after 12 months of inactivity (optional)
   - Encourages ongoing engagement
   - Prevents inactive users from keeping high status

**Review Display & Usage**:

**Mentor Profiles**:
- Average rating (1-5 stars) prominently displayed
- Total number of reviews (credibility indicator)
- Recent reviews highlighted
- Filter by service type, date, rating
- Response capability (mentor can respond to reviews)

**Platform Analytics**:
- Aggregate feedback to identify improvement areas
- Module-specific ratings inform development priorities
- Trend analysis (improving vs declining satisfaction)
- Sentiment analysis on written reviews

**User Benefits Redemption**:
- Automatic discount application at checkout
- Status-based feature unlocking (automatic)
- Early access invitations sent to Platinum users
- Exclusive content/resources available by status
- Priority queue for support tickets (Gold/Platinum)

**Objectives**:
- **Traillers**: Express feedback, earn recognition, unlock benefits, motivate engagement, trust signals for mentors
- **Mentors**: Build reputation, receive constructive feedback, demonstrate value, attract more students
- **Platform**: Collect quality data, improve services, prevent abuse, reward engagement, create retention loop, build trust ecosystem

---

### p. Admin/Operations: Mentor Profile Validation (Review + Interview)

**Description**: Enable the Operations team to validate (or refuse) mentor profile creation requests via structured review and optional interview process.

**Validation Workflow**:

**Step 1: Application Submission** (Mentor side):
- Complete mentor profile with:
  - Personal information and contact
  - Education and credentials
  - Professional experience
  - Areas of expertise (fields, technologies, industries)
  - Languages spoken and timezone
  - Availability and capacity
  - Portfolio or work samples (optional)
  - References (optional)
  - Motivation statement

**Step 2: Automated Checks**:
- Profile completeness validation
- Red flag detection (spam patterns, suspicious info)
- Duplicate account check
- Basic qualification screening (education level, experience years)

**Step 3: Admin File Review**:
Admin reviewers assess:
- **Credentials verification**: Education and certifications validity
- **Experience relevance**: Does experience match claimed expertise?
- **Field expertise**: Sufficient depth in declared specialties?
- **Availability realism**: Can they actually commit claimed capacity?
- **References check**: Contact provided references if any
- **Portfolio review**: Quality of work samples if provided
- **Red flags**: Any concerns about legitimacy or intent?

**Step 4: Interview (if required)**:
Criteria triggering interview:
- High-capacity mentor applications (10+ students/month)
- Premium tier mentors (high commission rates)
- Ambiguous or exceptional profiles
- First-time mentors with limited track record
- Specific high-demand fields (AI, Cyber, etc.)

Interview assessment:
- **Expertise validation**: Technical/field knowledge depth
- **Pedagogy assessment**: Teaching ability, communication style
- **Availability confirmation**: Realistic capacity and commitment
- **Ethics alignment**: Values match platform standards
- **Motivation understanding**: Why they want to mentor
- **Expectations management**: Clear on platform rules and processes

**Step 5: Decision**:
Admin sets status:
- **Approved**: Full mentor access, profile goes live
- **Approved with conditions**: Limited capacity initially, probation period
- **To Correct**: Feedback provided, applicant can resubmit with corrections
- **Rejected**: Not qualified, reason provided

**Communication Templates**:
- Approval email with onboarding next steps
- Conditional approval with probation terms
- Request for corrections with specific feedback
- Rejection email with reason (respectful, constructive)

**Audit Trail**:
- All review decisions logged with:
  - Reviewer name and timestamp
  - Decision rationale (notes)
  - Supporting documents/references
  - Interview notes if conducted
- GDPR-compliant data retention

**SLA (Service Level Agreement)**:
- Initial application review: Within 3 business days
- Interview scheduling: Within 5 business days after review
- Final decision: Within 2 business days after interview
- Total end-to-end: Target 10 business days maximum

**Partial Automation** (future optimization):
- AI pre-screening of applications
- Automatic credential verification (integration with LinkedIn, education platforms)
- Reference check automation (email surveys)
- Interview scheduling automation (calendar integration)

**Quality Metrics Tracked**:
- Approval rate by reviewer
- Time to decision (SLA compliance)
- Mentor performance post-approval (correlation analysis)
- Rejection reasons distribution
- Interview-to-approval conversion rate

**Objectives**:
- Qualify reliable, skilled mentors (protect trailler experience)
- Reduce fraud and inactive profiles (platform quality)
- Accelerate activation for qualified applicants (mentor satisfaction)
- Trace all decisions (audit compliance, GDPR)
- Continuous improvement via metrics (optimize process)

---

### q. Admin/Operations: Forum Creation Control & "On-life" Management

**Description**: Provide Admin/Operations teams comprehensive workflow to validate forum requests and manage live forum activity in real-time.

**Forum Approval Workflow**:

**Step 1: Creation Request** (User/Ambassador side):
- Submit forum creation form:
  - Forum name and purpose
  - Target segment/audience (nationality, school, career, etc.)
  - Proposed rules and guidelines
  - Justification for creation (why needed)
- System checks for similar existing forums
- Duplicate forum flag shown to requester with suggestions to join
- If proceed, request enters approval queue

**Step 2: Admin Review**:
Admin sees:
- Forum request details
- **Duplicate flag indicator** (if similar forums exist)
- Requester reputation and history (previous forums owned, moderation quality)
- Proposed segment size and demand estimate
- Alignment with platform policies

Admin decision:
- **Approve**: Forum created, owner notified, forum goes live
- **Reject**: Request denied, reason provided to requester
- **Request modifications**: Feedback for improvement, resubmit option

**Step 3: Post-Approval Setup**:
- Forum owner configures:
  - Detailed rules and community guidelines
  - Tags for thread organization
  - Auto-moderation settings (keyword filters, spam detection)
  - Member permissions
  - Public vs private access

**Communication**:
- Approval email with setup instructions
- Rejection email with reason and alternatives (join similar forums)
- Modification request with specific feedback

**Real-Time ("On-Life") Forum Management**:

Admin tools for active forum control:

1. **Forum Health Monitoring**:
   - Activity metrics dashboard (posts/day, active members, engagement rate)
   - Report queue (user-flagged content review)
   - Spam detection alerts
   - Sentiment analysis (detecting negativity, harassment)
   - Growth trends (healthy vs stagnant)

2. **Intervention Controls**:

   **Lock/Read-Only Mode**:
   - Freeze posting during incidents (raid, spam attack, heated conflict)
   - Members can read but not post/reply
   - Temporary or permanent
   - Display reason banner to users

   **Slow Mode**:
   - Rate limit posting (e.g., 1 post per user every 5 minutes)
   - Reduces spam and heated arguments
   - Configurable timing threshold

   **Keyword Filters**:
   - Auto-hide posts containing banned words/phrases
   - Configurable filter lists by forum or globally
   - Queue filtered posts for manual review

   **Thread Quarantine**:
   - Move problematic threads to hidden area
   - Visible only to admins and original posters
   - Review before deciding to restore or delete

   **Anti-Spam Limits**:
   - Max posts per user per hour
   - New member restrictions (can't post for 24h, read-only)
   - Link posting limits for new users
   - Auto-detection of spam patterns (repeated messages, external links)

   **Announcements**:
   - Pin admin announcements to top
   - Mandatory read for forum access (rule updates, policy changes)
   - Broadcast to all forum members

3. **Archiving & Cleanup**:
   - Archive inactive forums (no posts in 90+ days)
   - Archived content remains readable but not postable
   - Can unarchive if activity resumes
   - Permanent deletion (GDPR right to erasure compliance)

4. **Moderator Management**:
   - Appoint/remove forum moderators from admin panel
   - Grant temporary elevated permissions (incident response)
   - Monitor moderator actions (audit log)
   - Override moderator decisions if needed

**Audit & Compliance**:
- All admin actions logged:
  - Who (admin user ID)
  - What (action type: lock, delete, ban, etc.)
  - When (timestamp)
  - Why (reason/notes)
  - Target (forum ID, thread ID, user ID)
- Export audit logs for compliance reviews
- GDPR compliance: User data handling, right to erasure

**Quality Metrics**:
- Forum approval rate
- Time to approval (SLA target: 48 hours)
- Post-approval health scores (engagement, reports, spam rate)
- Intervention frequency (indicates problematic forums)
- Moderator effectiveness (owner moderation vs admin intervention needed)

**Escalation Workflow**:
- Forum owner moderates first (Level 1)
- User reports escalate to admin if owner doesn't act (Level 2)
- Admin can override any owner decision (Level 3)
- Severe violations trigger immediate admin intervention (bypass owner)

**Objectives**:
- Prevent forum proliferation (quality over quantity)
- Ensure forums have responsible, capable owners
- Provide real-time incident response tools
- Contain spam, raids, harassment quickly
- Trace all decisions for audit and quality
- Balance community autonomy with platform safety
- GDPR and legal compliance

---

### r. Mentor Dashboard & Profile Management (Mentor Mode Feature)

**Description**: Provide mentors with a comprehensive dashboard to manage their mentees, track performance, schedule sessions, and monitor earnings.

**Access Requirements**:
- User must have activated mentor profile
- Mentor application approved by admin
- Accessible only when in "Mentor Mode" (profile switcher)

**Dashboard Sections**:

**1. Performance Metrics** (top cards, 4 key metrics):
- **Active Mentees**: Current number of active mentoring relationships
  - Example: "12 active mentees" (+3 this month trend)
- **Average Rating**: Star rating from mentee reviews
  - Example: "4.9 ⭐" (87 reviews)
- **Monthly Earnings**: Total earnings for current month
  - Example: "€340" (breakdown: €280 sessions + €60 bonuses)
- **Sessions Completed**: Total mentoring sessions completed
  - Example: "87 sessions" (all-time)

**2. Pending Mentoring Requests**:
- **New requests counter**: Badge showing unread requests
- **Request cards** (horizontal scrollable):
  - Trailler avatar + name + location ("John Doe • Cameroon → France")
  - Request type pill ("Career Guidance", "Interview Prep", "CV Review")
  - Preview of request message (2 lines truncated)
  - **Compatibility score**: AI-generated match percentage ("92% Match" with star)
  - Timestamp: "Requested 2 hours ago"
  - **Actions**:
    - "Accept" (Amber button) - accepts mentoring request
    - "Decline" (Gray outline) - declines with optional reason
    - "View Full Profile" (Blue text link) - see trailler's complete profile
- "View All Requests →" link to full requests page

**3. Active Mentees Management**:
- **Mentee grid** (2-3 columns, card layout):
  - Mentee avatar (48×48px) + name
  - **Progress indicator**: "3 of 5 sessions completed" (visual progress bar)
  - Last interaction: "Last message: 2 days ago"
  - **Status badges**:
    - "On Track" (green) - meeting session schedule
    - "Needs Attention" (amber) - missed session or no contact in 7+ days
    - "Inactive" (gray) - no activity in 30+ days
  - **Goal display**: "Goal: Pass Data Science interviews"
  - **Quick actions** (icon buttons):
    - Message icon - opens chat thread
    - Calendar icon - schedule new session
    - Profile icon - view mentee details
  - "View Details →" link
- **Filter dropdown**: All | In Progress | Need Attention | Inactive

**4. Upcoming Sessions** (sidebar widget):
- **Session cards** (vertical list):
  - Mentee avatar + name
  - Session type pill ("Career Guidance", "Interview Prep", etc.)
  - **Date/Time**: "Tomorrow, 3:00 PM CET" (with calendar icon)
  - Duration: "1 hour"
  - **Meeting link**: "Join Video Call" button
    - Disabled until 10 minutes before start time
    - Opens integrated video call or external link (Zoom, Google Meet)
  - **Session actions**:
    - Reschedule icon - opens rescheduling modal
    - Cancel icon - cancels session with notification to mentee
  - Countdown timer for next session: "Starts in 2h 34m"

**5. Earnings Overview** (widget):
- **Monthly total** (large, prominent): "€340"
- **Earnings breakdown**:
  - Mentoring sessions: "€280" (12 sessions × average rate)
  - Job placement bonuses: "€60" (1 successful placement)
  - Referral bonuses: "€0" (if applicable)
- **Visualization**: Simple line or bar chart showing weekly earnings trend
- **Actions**:
  - "View Detailed Report →" link (opens full earnings page)
  - "Request Payout" button (if threshold met, e.g., €50 minimum)
  - Payment method indicator: "PayPal: jo**@email.com"

**6. Availability Management** (quick access):
- **Calendar widget** (mini calendar view):
  - Shows current week availability
  - Color-coded slots:
    - Green: Available
    - Gray: Unavailable
    - Blue: Booked session
- "Update Availability →" link opens full calendar editor
- **Capacity indicator**: "8 of 12 slots filled this week"

**7. Quick Actions Panel** (floating or sidebar):
- "Set Availability" button (calendar icon)
- "Update Profile" button (edit icon) - updates mentor bio, skills, rate
- "View Resources" button (book icon) - mentoring best practices library
- "Invite Mentees" button (share icon) - referral link with tracking

**8. Tips & Resources** (collapsible widget):
- Section title: "💡 Mentor Tips"
- **Tips carousel** (rotates):
  - "How to give effective feedback"
  - "Best practices for virtual sessions"
  - "Building trust with mentees"
  - "Time management strategies"
- "Browse All Resources →" link to full library

**Navigation (Mentor Mode)**:
```
Dashboard | My Mentees | Availability | Earnings | Resources
```

**Objectives**:
- **Mentors**: Efficiently manage mentoring relationships, track performance, optimize scheduling, monitor income
- **Platform**: Ensure quality mentoring experiences, track engagement metrics, facilitate payments

---

### s. Become a Mentor (Activation Flow)

**Description**: Multi-step application and approval process for users to activate their mentor profile and unlock mentoring capabilities.

**Access**: Available to all authenticated users via "Become a Mentor" button in profile switcher

**Application Flow (5 Steps)**:

**Step 1: Introduction & Benefits Page**

**Hero Section**:
- Title: "Become a TrailLearn Mentor"
- Subtitle: "Share your expertise, help students succeed, and earn income"
- Hero image: Diverse mentor helping student (welcoming, aspirational)
- Primary CTA: "Start Application" (Amber, large button)

**Benefits Cards** (3-4 cards, horizontal):
- 💰 **Earn Income**: "Average mentor earns €450/month" - Flexible, performance-based earnings
- 🌟 **Build Reputation**: Gain recognition, collect reviews, earn badges (Gold, Platinum)
- 🎯 **Flexible Schedule**: Set your own availability, choose your capacity (1-20 mentees)
- 🌍 **Global Impact**: Help students worldwide achieve their academic and career goals

**How It Works** (visual timeline):
1. **Apply** (5-10 minutes) - Fill out comprehensive application
2. **Review** (3-5 business days) - Team reviews credentials and experience
3. **Interview** (Optional, 15 minutes) - Video call for select candidates
4. **Activate** (Immediate) - Start mentoring once approved!

**Requirements Checklist**:
- ✓ 2+ years experience in your field (industry or academic)
- ✓ Fluent in English or French (additional languages a plus)
- ✓ Available 3+ hours per month for mentoring
- ✓ Genuine passion for helping students succeed
- **Note**: "Don't meet all requirements? Apply anyway - we review each application individually!"

**Testimonials** (from existing mentors):
- 2-3 mentor cards with photos, quotes, stats:
  - "I've mentored 23 students and earned €560 last month. It's incredibly rewarding!" - Pierre K., Data Scientist
  - Star rating + total mentees + earnings

**FAQ Section** (accordion, 6-8 questions):
- "How much can I earn as a mentor?"
- "How much time commitment is required?"
- "What if my application isn't approved?"
- "Can I mentor part-time while working full-time?"
- "What support does TrailLearn provide to mentors?"
- "How are mentees matched with mentors?"

**Step 2: Application Form** (multi-step, 6 sections)

**Progress indicator**: "Step X of 6" (progress bar at top of form)

**Section 1: Basic Information**
- Full name (auto-filled from account)
- Professional title: "e.g., Senior Data Scientist at Google"
- Current employer/university
- Years of professional experience (slider: 0-20+ years)
- Location (country + city dropdowns)
- Languages spoken (multi-select with flags: French, English, Spanish, etc.)
- Timezone (auto-detected, editable dropdown)

**Section 2: Expertise & Skills**
- **Primary expertise area** (single select dropdown):
  - Data Science & Analytics
  - Software Engineering
  - AI & Machine Learning
  - Cybersecurity
  - Cloud Computing & DevOps
  - Product Management
  - Business & Entrepreneurship
  - Academic Research
  - Other (specify)
- **Specific skills** (multi-select with search):
  - Technical: Python, Java, React, AWS, Docker, SQL, etc.
  - Soft skills: Communication, Leadership, Project Management
  - "Add Custom Skill" button
- **Industries** (multi-select): Tech, Finance, Healthcare, Education, etc.

**Section 3: Mentoring Preferences**
- **What type of mentoring can you provide?** (checkboxes):
  - ☐ Career guidance & path planning
  - ☐ Interview preparation (technical & behavioral)
  - ☐ CV/Resume review & improvement
  - ☐ Technical skills coaching
  - ☐ Academic guidance (thesis, research)
  - ☐ Job search strategies
  - ☐ Work-life balance & productivity
- **Preferred mentee level** (checkboxes):
  - ☐ Beginner (0-2 years experience)
  - ☐ Intermediate (2-5 years experience)
  - ☐ Advanced (5+ years experience)
  - ☐ Career transitioners (switching fields)
- **Monthly capacity**: "How many mentees can you actively support?" (slider: 1-20)
  - Helper text: "We recommend starting with 3-5 mentees"
- **Availability preview**: "Set your general availability" (drag-and-drop calendar or time picker)
  - Can be refined later in mentor dashboard

**Section 4: Background & Credentials**
- **Education** (repeatable form group):
  - Degree (Bachelor's, Master's, PhD, etc.)
  - Field of study
  - University name
  - Graduation year
  - "Add Another Degree" button
- **Certifications** (optional, repeatable):
  - Certification name (e.g., "AWS Solutions Architect")
  - Issuing organization
  - Year obtained
  - Upload certificate (optional PDF/image, max 5MB)
  - "Add Another Certification" button
- **Work Experience** (repeatable):
  - Job title
  - Company name
  - Years (from-to or "Present")
  - Brief description (optional, 200 chars)
  - "Add Another Position" button
- **Portfolio/Online Presence** (optional):
  - LinkedIn profile URL
  - Personal website URL
  - GitHub profile (for technical mentors)
  - Other relevant links

**Section 5: Motivation & Approach** (essay questions)
- **Question 1** (required, 500 char max):
  "Why do you want to become a TrailLearn mentor?"
  - Textarea with character counter
  - Helper text: "Share your motivation and what drives you to help students"
- **Question 2** (required, 500 char max):
  "Describe your mentoring style and approach"
  - Textarea with character counter
  - Helper text: "How do you typically work with mentees? What makes your approach effective?"
- **Question 3** (optional, 500 char max):
  "Share a success story of helping someone grow professionally or academically"
  - Textarea with character counter

**Section 6: Review & Submit**
- **Summary view**: All entered information displayed in cards (read-only)
  - Each section expandable with "Edit" button (returns to that form section)
- **Agreement checkboxes** (required):
  - ☐ "I agree to TrailLearn's Mentor Code of Conduct"
  - ☐ "I commit to responding to mentee requests within 48 hours"
  - ☐ "I understand my application will be reviewed within 3-5 business days"
  - ☐ "I certify that all information provided is accurate"
- **Actions**:
  - "Submit Application" button (Amber, large, primary) - submits for review
  - "Save as Draft" button (Gray outline) - saves progress, can return later
  - "Go Back" button (text link) - returns to previous section

**Step 3: Application Submitted (Success Page)**

**Elements**:
- **Success animation**: Large checkmark icon with confetti animation
- **Title**: "Application Submitted! 🎉"
- **Message**: "Thank you for applying to become a TrailLearn mentor. Our team will carefully review your application within 3-5 business days."
- **What Happens Next** (timeline card):
  1. **Application Review** (3-5 business days): Team reviews your credentials, experience, and motivation
  2. **Email Notification**: You'll receive an email at [user.email] with the decision
  3. **Optional Interview** (if needed): Some candidates may be invited for a brief 15-minute video interview
  4. **Final Decision**: Approval, request for more info, or rejection with feedback
- **While You Wait** (suggestions card):
  - "Complete your Trailler profile to 100%"
  - "Explore forums and connect with the community"
  - "Attend upcoming webinars and events"
- **Action buttons**:
  - "Return to Dashboard" (Amber) - goes to trailler dashboard
  - "Invite Friends" (Blue outline) - share referral link

**Step 4: Application Under Review (Status Page)**

**Elements**:
- **Status banner**: "Application Under Review" (Amber background)
- **Progress indicator** (visual timeline):
  - ✅ Application submitted (Oct 15, 2024)
  - 🔄 Team reviewing credentials (In Progress)
  - ⏳ Interview scheduling (if needed)
  - ⏳ Final decision
- **Estimated completion**: "Decision expected by: Oct 18, 2024"
- **What's Happening**:
  - "Our team is carefully reviewing your:
    - Professional experience and credentials
    - Expertise and skill alignment with student needs
    - Availability and capacity
    - Motivation and mentoring approach"
- **Tips While Waiting**:
  - "Complete your Trailler profile to 100%" (with progress indicator)
  - "Join relevant forums to build community presence"
  - "Connect with existing mentors to learn best practices"
- **Support**: "Have questions? Contact support@traillearn.com"

**Step 5: Decision (Approval or Rejection)**

**If APPROVED**:
- **Celebration modal** (full-screen overlay with confetti animation)
- **Title**: "Congratulations! You're a TrailLearn Mentor! 🎉"
- **Message**: "Your application has been approved. Welcome to our mentor community! You can now activate your mentor profile and start making an impact."
- **Next Steps** (checklist card):
  1. ✓ Application approved
  2. → "Complete mentor profile setup" (add bio, set rates, upload photo)
  3. → "Set your availability calendar" (define weekly available slots)
  4. → "Review mentoring best practices" (watch onboarding video, read guidelines)
  5. → "Receive your first mentee request" (activate and wait for matches)
- **Primary CTA**: "Activate Mentor Profile" (Amber, large) - switches to mentor mode and completes onboarding
- **Secondary**: "Learn More About Mentoring" (Blue outline)

**If REJECTED**:
- **Empathetic title**: "Application Not Approved"
- **Message** (supportive tone): "Thank you for your interest in becoming a TrailLearn mentor. After careful review, we're unable to approve your application at this time."
- **Reason** (if provided): "We're currently looking for mentors with 3+ years of industry experience in [field]."
- **Encouragement**: "This doesn't mean you can't contribute to the TrailLearn community! Here's what you can do:"
- **Options** (card layout):
  - **Reapply Later**: "Gain more experience and reapply in 6 months" (with reminder signup)
  - **Stay as Trailler**: "Continue using TrailLearn as a student and connect with mentors"
  - **Contribute to Community**: "Build your reputation through forum participation and helpful content"
  - **Become an Ambassador**: "Help new students integrate into your city" (alternative role)
- **Primary CTA**: "Continue as Trailler" (Blue) - returns to trailler dashboard
- **Secondary**: "Contact Us" (outline) - opens support ticket for feedback

**Objectives**:
- **Users**: Clear, encouraging path to become a mentor, understand requirements, feel valued regardless of outcome
- **Platform**: Filter for quality mentors, collect comprehensive information, maintain high mentoring standards
- **Admins**: Efficient review workflow, structured application data, clear approval criteria

---

### t. Admin/Operations: Profile Control & Account Management

**Description**: Enable Admin/Operations teams to manage account quality, security, and compliance through comprehensive profile oversight and graduated enforcement.

**NOTE**: This now includes dual profile management (Trailler + Mentor profiles)

**Profile Verification (Light KYC)**:

**Document Verification**:
- Request identity documents (passport, national ID, student card)
- Verify authenticity (manual review or automated OCR)
- Mark profile as "Verified" or "Unverified"
- Display verification badge on verified profiles
- Higher trust for verified mentors/ambassadors

**Verification Triggers**:
- All mentor applications (required for approval)
- All ambassador applications (required + background check)
- High-value transactions (premium subscriptions, job placement fees)
- Suspicious activity flags
- User request (optional trust building)

**Account Suspension/Activation**:

**Suspension Reasons**:
- Policy violations (spam, harassment, fraud)
- Payment issues (chargebacks, failed payments)
- Security concerns (compromised account, suspicious activity)
- User request (temporary self-suspension)
- Legal/compliance requirements

**Suspension Types**:
- **Temporary**: Fixed duration (7 days, 30 days, 90 days)
- **Permanent**: Account deactivated indefinitely
- **Conditional**: Suspended until specific action taken (payment, document upload)

**Suspension Actions**:
- Login disabled (can't access account)
- Profile hidden from public view
- Active sessions terminated
- Email notification with reason and appeal process
- Data retained (GDPR compliance for appeals)

**Reactivation**:
- Admin reviews reactivation request
- Verify issue resolved (payment made, behavior corrected)
- Conditional reactivation (probation period)
- Audit log entry for decision

**Capacity & Quota Management**:

**Mentor Capacity Reset**:
- Adjust maximum mentee count (increase/decrease)
- Reset current capacity if mentor overbooked
- Temporary capacity reduction (probation, quality issues)
- Seasonal adjustments (mentor availability changes)

**Student/Trailler Quotas**:
- Adjust scholarship favorites limits (Free tier: 5, Plus: 50, Pro: unlimited)
- AI Coach query limits (prevent abuse)
- Forum posting limits (anti-spam)
- Event registration limits (prevent no-shows)
- Resource download limits

**Usage Supervision**:

**Activity Monitoring**:
- Track user engagement patterns
- Identify abuse indicators:
  - Rapid actions (bot-like behavior)
  - Excessive resource consumption
  - Multi-accounting patterns
  - Spam posting patterns
  - Fraudulent review patterns

**Abuse Detection Signals**:
- Login from multiple IPs/devices simultaneously
- Profile data inconsistencies
- Unusual transaction patterns
- High complaint/report rate
- Review manipulation attempts

**Graduated Sanctions**:

**Level 1: Warning**:
- Email warning explaining violation
- No account restrictions yet
- Clear expectations for correction
- Logged in user's compliance history

**Level 2: Limited Access**:
- Temporary feature restrictions (no posting, read-only forums)
- Reduced quotas (fewer favorites, lower mentor capacity)
- Slow mode enforced on all actions
- Email notification with restoration conditions

**Level 3: Temporary Suspension**:
- Account suspended for 7-30 days
- Email with violation details and appeal process
- Data retained, access blocked
- Automatic reactivation after period (if no appeal denied)

**Level 4: Permanent Ban**:
- Account permanently disabled
- Profile and data removed (GDPR right to erasure)
- IP/device flagged to prevent re-registration
- Email with final decision and appeal rights
- Legal escalation if fraud/criminal activity detected

**Audit Trail**:
All admin actions logged:
- Admin user who performed action
- Timestamp of action
- Action type (suspend, verify, adjust quota, etc.)
- Target user ID
- Reason/notes explaining decision
- Supporting evidence (screenshots, reports, data)
- Outcome (user response, appeal decision)

**GDPR Compliance**:
- Data retention policies (how long to keep suspended account data)
- Right to access (user can request all data about them)
- Right to erasure (delete account and data upon request)
- Right to rectification (correct incorrect data)
- Data portability (export user data)
- Consent management (track permissions)

**Admin Dashboard Features**:
- **Profile overview**: User details, verification status, subscription tier, status level
- **Activity timeline**: Recent actions, login history, transaction history
- **Compliance panel**: KYC status, suspension history, warnings issued
- **Quick actions**: Suspend, verify, adjust quota, reset password, send message
- **Bulk operations**: Mass suspension (spam wave), mass verification update, quota adjustments

**Metrics & Reporting**:
- **Verification rate**: % of users verified (by tier: mentor/trailler/ambassador)
- **Suspension stats**: Total active suspensions, suspension reasons distribution
- **Abuse detection**: Flagged accounts per week, false positive rate
- **Response time**: Time from report to admin action (SLA compliance)
- **Appeal outcomes**: % of appeals approved vs denied

**Objectives**:
- Maintain platform integrity (remove bad actors quickly)
- Graduated enforcement (proportional response to violations)
- Complete audit trail (legal protection, transparency)
- GDPR compliance (user rights respected)
- Efficient operations (admin productivity, clear workflows)
- Prevent abuse while minimizing false positives (fair enforcement)

---

## 🔄 Consolidation Summary

**Features Merged** (from original TRAILLEARN.md):

1. **AI Coach Features** (originally k & m) → Now unified as **Feature i**: AI Coach & Smart Goal Management System

2. **AI Orientation Features** (originally g & second i) → Now unified as **Feature g**: AI Orientation & Career Recommendations

3. **Mentoring Features** (originally k & n) → Now unified as **Feature j**: Mentoring System (Two-Sided Matching & Support)

**Numbering Corrected**:
- Fixed duplicate "i" labels
- Renumbered features sequentially (a-r)
- Maintained logical grouping

**Dual Perspectives Added**:
All features involving both traillers and mentors now clearly explain both sides:
- Job Search Support (feature c)
- Forums (feature e)
- Events (feature h)
- Mentoring System (feature j)
- Ambassador Program (feature k)
- Forum Management (feature l)
- MLM Gamification (feature m)

**Benefits of Consolidation**:
- ✅ Eliminates redundancy (from 22 features to 18 core features)
- ✅ Clear dual-perspective explanations (trailler ↔ mentor understanding)
- ✅ Easier reference for development (no confusion about duplicates)
- ✅ Consistent structure across all features
- ✅ Better documentation for team alignment

---

**© 2025 TrailLearn. All rights reserved.**
