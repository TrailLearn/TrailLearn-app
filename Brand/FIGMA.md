# TrailLearn - Figma AI Design Brief

## 🎯 Product Overview

**TrailLearn** is an AI-powered platform helping students and young professionals worldwide find scholarships, navigate international integration, connect with mentors, and plan their academic/career paths.

**Tagline**: "Your AI guide to global education and career success"

---

## 👥 Target Audience & Dual Profile System

### User Profile Architecture

**IMPORTANT**: Every user account has TWO profile types (like Udemy's student/instructor model):

1. **Trailler Profile** (Student) - Active by default
   - Automatically created upon registration
   - Access to: Scholarship search, opportunities (entrance exams, deadlines), forums, events, AI coach, finding mentors
   - Can request mentoring, join communities, save scholarships

2. **Mentor Profile** - Must be activated/unlocked
   - Optional, requires application and approval
   - Access to: Mentor dashboard, mentee management, earnings tracking
   - Can provide mentoring, create content, earn reputation/income

**Profile Switching**: Users can toggle between Trailler and Mentor modes via a profile switcher in the top navigation (similar to Udemy's "Switch to instructor" feature).

### Target Audience

**Primary Users** (Trailler Mode):
- International students (18-30 years old)
- Young professionals seeking career transitions
- Global, diverse, tech-savvy, mobile-first

**Secondary Users** (Mentor Mode):
- Experienced professionals offering mentorship
- University ambassadors and career coaches
- Alumni helping newcomers

**Administrative Users**:
- Platform administrators
- Moderators
- Operations team

---

## 🎨 Brand Identity

**Colors** (from Brand/identity.md):
- **Primary**: Deep Blue (#2563EB) - Trust, professionalism
- **Secondary**: Emerald Green (#10B981) - Growth, success
- **Accent**: Amber (#F59E0B) - Energy, action, CTAs
- **Neutrals**: Slate grays (#64748B for text, #F8FAFC for backgrounds)

**Typography**:
- **Font**: Inter (clean, modern, highly readable)
- **Style**: Modern, minimalist, accessible

**Design Principles**:
- Clean and uncluttered
- Mobile-first responsive
- Accessible (WCAG AA compliant)
- Friendly yet professional
- International/inclusive aesthetic

---

## 🖥️ Key Screens to Design

### 1. **Landing Page / Hero Section**
**Purpose**: Convert visitors to sign up

**Elements**:
- Hero headline: "Find Your Path to Global Education"
- Subheadline: "AI-powered scholarships, mentoring, and integration support for students worldwide"
- CTA button (Amber): "Get Started Free"
- Hero image: Diverse students collaborating, bright and optimistic
- Trust signals: "10,000+ scholarships", "500+ mentors", "50+ countries", "1,000+ opportunities tracked"
- Feature highlights (icons + text): Scholarship Search, Opportunities (Exams & Deadlines), AI Coach, Mentoring, Events

**Design Style**: Modern, bright, welcoming with gradient backgrounds (blue to emerald)

---

### 2. **Scholarship Search Page**
**Purpose**: Help students find and filter scholarships

**Elements**:
- **Search bar** (top): Large, prominent with placeholder "Search scholarships by country, field, or school..."
- **Filters sidebar** (left):
  - Country dropdown (flags + names)
  - Education level (Bachelor, Master, PhD)
  - Field of study (checkboxes)
  - Deadline range (date picker)
  - Scholarship amount range (slider)
  - "Apply Filters" button (Amber)
- **Results grid** (main area):
  - **Scholarship cards** (3 columns on desktop, 1 on mobile):
    - University logo or flag
    - Scholarship name (bold, blue)
    - Country + City (gray text with location icon)
    - Deadline (amber badge with calendar icon)
    - Amount (green text, e.g., "€15,000/year")
    - Tags: "Full tuition", "Housing included", "No GRE"
    - Heart icon (save to favorites)
    - "View Details" button (secondary style)
  - Pagination at bottom
- **Quick stats banner** (top): "Showing 247 scholarships • 12 closing this month"

**Design Style**: Card-based layout, clean white cards with subtle shadows, colorful badges for deadlines/tags

---

### 3. **Opportunities Search Page**
**Purpose**: Help students find entrance exams, application deadlines, and academic opportunities

**Elements**:
- **Search bar** (top): Large, prominent with placeholder "Search opportunities, entrance exams, application deadlines..."
- **Filters sidebar** (left):
  - Opportunity type dropdown:
    - Application Deadlines (🎓)
    - Entrance Exams (📝)
    - Language Tests (🗣️)
    - Interviews (💬)
    - Document Deadlines (📄)
    - Orientation (🧭)
  - Country dropdown (flags + names)
  - Program type (Bachelor, Master, PhD, MBA)
  - Field of study (checkboxes)
  - Deadline range (date picker)
  - Institution type (University, Grande École, Business School)
  - "Apply Filters" button (Amber)

- **Calendar View Toggle** (top right):
  - Switch between "Grid View" (default) and "Calendar View"
  - Calendar view shows all deadlines on an interactive calendar

- **Results grid** (main area):
  - **Opportunity cards** (3 columns on desktop, 1 on mobile):
    - Institution logo or flag
    - Opportunity title (bold, blue)
      - Examples: "Concours Mines-Ponts 2025", "HEC Paris MBA Application Round 2", "TOEFL iBT Test Registration"
    - Opportunity type badge (color-coded):
      - Application Deadline (blue badge)
      - Entrance Exam (amber badge)
      - Language Test (green badge)
    - Country + City (gray text with location icon)
    - Key Date (large, prominent):
      - "Application closes: March 15, 2025" (with countdown: "23 days left")
      - "Exam date: June 10, 2025"
    - Important details:
      - Requirements snippet (e.g., "Bachelor's degree required, TOEFL 100+")
      - Fee (if applicable): "€200 registration fee"
    - Tags: "Early deadline", "Scholarship available", "Online exam", "No age limit"
    - Icons row:
      - 🔔 Reminder bell (add to calendar/set reminder)
      - 🔗 Link icon (view official page)
      - ⭐ Star icon (save to favorites)
    - "View Details" button (secondary style)
  - Pagination at bottom

- **Quick stats banner** (top): "Showing 156 opportunities • 8 deadlines this month • 3 exams next month"

- **AI Data Quality Indicator** (subtle badge on cards):
  - For AI-scraped data with high confidence (≥0.85): Green checkmark + "Verified"
  - For pending validation: Amber dot + "Awaiting verification"
  - For manually entered: Blue checkmark + "Admin verified"

**Design Style**: Card-based layout similar to scholarships, but with emphasis on dates/countdown timers. Color-coded badges for different opportunity types. Calendar integration prominent. Trust indicators (AI confidence, admin verification) visible but not intrusive.

---

### 4. **Student Dashboard** (Trailler Mode)
**Purpose**: Central hub showing personalized overview

**Elements**:
- **Top navigation bar**:
  - TrailLearn logo (left)
  - Menu items: Dashboard, Scholarships, Opportunities, Mentors, Events, Forums
  - **Profile Switcher** (before user avatar):
    - Dropdown/toggle button showing current mode
    - Active: "Trailler Mode" with student icon (blue)
    - Hover shows: "Switch to Mentor" option (if mentor profile activated)
    - If mentor not activated: "Become a Mentor" option with lock icon
  - User avatar + name (right) with dropdown
  - Notification bell icon with badge

- **Welcome section**:
  - "Welcome back, Sarah!" (personalized)
  - Progress bar: "Profile 85% complete" (green fill)
  - Quick action cards: "Complete Profile", "Browse Scholarships", "Find a Mentor"

- **Next Best Action** (AI Coach suggestion):
  - Card with lightbulb icon
  - "Your next step: Complete your IKIGAI assessment"
  - "This will unlock personalized career recommendations"
  - CTA: "Start Assessment" (Amber button)

- **Upcoming Deadlines** (calendar widget):
  - Timeline view showing next 5 administrative/scholarship deadlines
  - Color-coded by urgency (amber = soon, green = upcoming)
  - Each item: Icon, title, date, "Mark Done" checkbox

- **Upcoming Opportunities** (calendar widget):
  - Timeline view showing next 5 opportunities (entrance exams, application deadlines)
  - Each opportunity card shows:
    - Opportunity type icon (📝 for exams, 🎓 for applications, 🗣️ for language tests)
    - Title: "Concours Mines-Ponts" or "HEC MBA Round 2"
    - Institution name (gray text)
    - Date with countdown: "March 15, 2025 (23 days left)"
    - Quick action button: "Set Reminder" (small, secondary)
  - "View All Opportunities" link at bottom
  - AI data quality indicator (subtle): Green checkmark for verified, amber dot for pending

- **Saved Scholarships** (horizontal carousel):
  - Small scholarship cards (4 visible)
  - Swipe/scroll for more
  - Each card: Logo, name, deadline countdown

- **Recommended Mentors** (horizontal carousel):
  - Mentor cards with avatar, name, specialty, rating (stars)
  - "Request Intro" button

- **Recent Activity Feed**:
  - Icon-based list: "You saved 3 scholarships", "New event: AI Careers Webinar", "John (mentor) accepted your request"

**Design Style**: Dashboard with white cards on light gray background, visual hierarchy with icons and color-coding

---

### 4. **AI Coach / Goal Management**
**Purpose**: Help students track and achieve goals

**Elements**:
- **Header**: "Your AI Coach" with robot/mentor icon
- **Next Best Action card** (prominent, top):
  - Large card with gradient background (blue to emerald)
  - Icon + "Next Best Action"
  - Recommendation text: "Update your CV with recent internship experience"
  - "Why this matters" explanation (collapsible)
  - CTA: "Upload CV" or "Mark as Done"

- **Goal Categories** (tabs):
  - All Goals | Administrative | Academic | Career

- **Goals List** (kanban-style or list view):
  - **To Do** column:
    - Goal cards: Title, description snippet, deadline, priority tag
    - Progress indicator (0%, 25%, 50%, 75%, 100%)
    - "Start" button
  - **In Progress** column:
    - Same card style
    - "Continue" button, progress bar partially filled
  - **Completed** column:
    - Checkmark icon, green tint
    - Completion date

- **Add Goal button** (floating action button, bottom right, Amber)

- **Filters/Sort**: By deadline, by priority, by category

**Design Style**: Kanban board aesthetic, colorful priority tags (red=urgent, amber=important, green=routine), clean cards with clear visual status

---

### 5. **Mentor Profile Page**
**Purpose**: Help students choose and request mentors

**Elements**:
- **Header section**:
  - Large mentor avatar (left)
  - Name (large, bold)
  - Title/Expertise: "Senior Data Scientist | AI Career Coach"
  - Location + Timezone: "Paris, France (CET)"
  - Languages: Flags (French, English)
  - Rating: ⭐⭐⭐⭐⭐ 4.9 (127 reviews)
  - Verification badge: "Verified Mentor" (green checkmark)
  - Status badge: "Gold Mentor" (badge with icon)

- **About section**:
  - Bio paragraph (3-4 sentences)
  - Expertise tags (pills): "Data Science", "Machine Learning", "Career Transition", "Interview Prep"

- **Mentoring Services** (cards):
  - CV Review (icon + title + description)
  - Interview Prep
  - Career Guidance
  - Application Support
  - Each with "Request Session" button

- **Availability calendar**:
  - Weekly view showing available slots (green = available, gray = booked)
  - "Book a slot" functionality

- **Reviews section**:
  - Review cards:
    - Reviewer avatar + name
    - Star rating
    - Date
    - Review text
    - Service type (tag)
  - "Load More" button

- **Statistics sidebar**:
  - Students mentored: 45
  - Success rate: 92%
  - Average response time: < 2 hours
  - Specialties chart (visual)

- **CTA button** (sticky at bottom on mobile): "Request Introduction" (Amber, prominent)

**Design Style**: Professional profile layout, trust-building elements (badges, stats, reviews), clear service offerings

---

### 6. **Forums Discovery Page**
**Purpose**: Browse and discover community forums

**Elements**:

- **Header section**:
  - Page title: "Community Forums"
  - Subtitle: "Connect with students worldwide • 247 active forums"
  - Search bar: "Search forums by topic, country, or school..."
  - "Create Forum" button (Amber, prominent, right side)

- **Forum Categories Section** (prominent, top):
  - Section title: "Browse by Category"
  - **Category Cards** (horizontal scrollable, 6-8 cards):
    Each card:
    - Category icon (large, 48×48px): 🌍 Country Corridors, 🎓 Schools & Universities, 💼 Career Paths, 🏛️ City Communities, 📚 Academic Fields, 🎯 Scholarships
    - Category name (bold, 16px)
    - Forum count: "45 forums" (gray text)
    - Subtle background gradient (category-specific colors)
    - Hover: Scale + shadow lift
    - Click: Filter to that category

- **Most Viewed Forums** (highlighted section):
  - Section header: "🔥 Trending This Week" with flame icon
  - **Trending Forum Cards** (horizontal carousel, 5 cards):
    Each card (compact version):
    - Forum icon (48×48px)
    - Forum name (bold, blue)
    - View count: "👁 12.5K views this week" (with trending up arrow)
    - Member growth: "+247 new members" (green text)
    - Quick stats: Members | Posts | Activity badge ("Very Active" in green pill)
    - "Join" button (Amber if not joined, green checkmark if joined)
  - "View All Trending →" link (right side)

- **Filter/Category tabs** (below trending):
  - All Forums
  - By Country (Cameroon→France, India→Germany, etc.)
  - By School (UT Troyes, HEC Paris, etc.)
  - By Career (Data Science, Cyber Security, Cloud Engineering)
  - My Forums (joined forums)
  - Active filter indicator: Blue underline + filled background

- **Forum Cards Grid** (2 columns tablet, 3 columns desktop, 1 column mobile):
  Each card contains:
  - **Forum icon/image** (left side, 64×64px circle or rounded square)
  - **Forum name** (bold, blue, 18px): "Cameroon → France Students"
  - **Member count**: Icon + "1,247 members"
  - **Activity indicator**: "32 posts this week" (green text with trend arrow)
  - **Description snippet**: 2 lines max, gray text
  - **Tags** (pills): "Scholarship", "Visa", "Housing"
  - **Join/Joined button**:
    - Not joined: "Join Forum" (blue outline button)
    - Already joined: "Joined" (green checkmark, filled button)
  - **Last activity**: "Active 2 hours ago" (small gray text)

- **Trending Forums sidebar** (desktop only, right):
  - Small list of hot/trending forums
  - Flame icon + member growth indicator
  - Quick join button

- **Empty state** (if no results):
  - Illustration of people discussing
  - "No forums found matching your search"
  - "Create a new forum" CTA button

**Design Style**: Card-based grid layout, colorful forum icons, clear activity indicators, easy-to-scan information hierarchy

---

### 7. **Forum Detail Page (Thread List)**
**Purpose**: View threads within a specific forum

**Elements**:

- **Forum Header** (sticky at top):
  - **Back button** (left): "← Forums"
  - **Forum info section**:
    - Forum icon (80×80px)
    - Forum name (large, bold): "Cameroon → France Students"
    - Description: 2-3 lines explaining forum purpose
    - Member count + Join/Leave button
    - Moderator info: "Moderated by @JohnDoe" (small text with avatar)
  - **Forum stats** (horizontal pills):
    - "1,247 members" | "523 threads" | "8,432 posts"
  - **Tags bar**: Pills showing main topics (Scholarship, Visa, Housing, CPAM, etc.)

- **Action bar**:
  - "New Thread" button (Amber, prominent, right)
  - Sort dropdown: "Latest Activity" | "Most Popular" | "Newest" | "Unanswered"
  - Filter: "All" | "Questions" | "Discussions" | "Announcements"

- **Pinned Threads section** (if any):
  - Badge: "Pinned" (green)
  - Thread cards with pin icon
  - Slightly highlighted background (#F8FAFC)

- **Thread List** (main content):
  Each thread card:
  - **Left sidebar** (user info):
    - Author avatar (48×48px)
    - Author name + badge (if moderator/verified)
    - Post date: "2 hours ago"
  - **Thread content**:
    - Thread title (bold, blue, clickable, 18px): "How to get CAF housing aid in Paris?"
    - Preview snippet: First 2 lines of content (gray text)
    - Tags: "Housing", "CAF", "Paris" (small pills)
  - **Right sidebar** (engagement metrics):
    - Reply count: Chat bubble icon + "23 replies"
    - View count: Eye icon + "456 views"
    - Last activity: "5 min ago" (small text)
    - Upvote/Like count: Heart/arrow icon + number

- **Load More** button at bottom (or infinite scroll)

**Design Style**: Discussion board layout, clear visual hierarchy, easy to scan, engagement metrics prominent

---

### 8. **Thread View Page (Posts & Replies)**
**Purpose**: Read and participate in forum discussions

**Elements**:

- **Thread Header**:
  - Breadcrumb: "Forums > Cameroon → France > Thread Title"
  - Thread title (large, bold, 28px)
  - Thread tags (pills)
  - Action buttons (right):
    - Bookmark icon (save thread)
    - Share icon
    - Report icon (flag)
    - More options (3 dots) - Edit/Delete/Lock (if moderator)

- **Original Post** (OP - prominent, highlighted):
  - **User card** (left sidebar or top on mobile):
    - Avatar (64×64px)
    - Username (bold)
    - User badges: "Verified", "Gold Member", "Moderator" (if applicable)
    - Join date: "Member since Oct 2024"
    - Post count: "142 posts"
  - **Post content**:
    - Rich text content (formatted with paragraphs, bold, lists, links)
    - Attached images (if any, gallery view)
    - Post timestamp: "Posted 3 hours ago"
  - **Engagement bar** (bottom of OP):
    - Upvote/Downvote buttons (arrows) + count
    - "Reply" button (blue)
    - "Share" button
    - "Bookmark" button

- **Reply Count Banner**: "23 Replies" with sort options (Oldest First | Newest First | Most Helpful)

- **Replies List**:
  Each reply card (indented slightly from OP):
  - **User info** (left or top):
    - Smaller avatar (40×40px)
    - Username + badges
    - "Replying to @OriginalPoster" (if direct reply)
  - **Reply content**:
    - Text content (formatted)
    - Timestamp: "2 hours ago"
    - Nested replies indicator: "View 3 replies ▼" (collapsible)
  - **Reply actions**:
    - Upvote/Downvote + count
    - "Reply" button (creates nested thread)
    - Report/Flag icon

- **Reply Editor** (bottom, sticky on mobile):
  - User avatar (small)
  - Rich text editor:
    - Placeholder: "Write your reply..."
    - Formatting toolbar (bold, italic, link, list, image upload)
    - Character count (optional)
  - "Post Reply" button (Amber, right)
  - "Cancel" button (gray text)

- **Sidebar** (desktop only, right):
  - Related threads: "Similar discussions you might like"
  - Forum rules (collapsible)
  - Active members in forum (avatars)

**Design Style**: Traditional forum thread layout, nested replies, rich text formatting, clear user hierarchy

---

### 9. **Create Thread/Forum Modal**
**Purpose**: Create new forum threads or request new forum

**Elements**:

**Create Thread Modal**:
- Modal overlay (centered, 600px width)
- Header: "Create New Thread" with close (X) button
- Form fields:
  1. **Thread Title** (required):
     - Input field: "Enter thread title..."
     - Character limit: "80 characters max"
  2. **Category/Tags** (required):
     - Dropdown: Select existing tags or create new
     - Tag pills show selected tags
  3. **Content** (required):
     - Rich text editor (toolbar: bold, italic, link, list, image)
     - Placeholder: "Describe your question or discussion topic..."
     - Markdown support indicator: "Markdown supported"
  4. **Attach Files** (optional):
     - Drag-and-drop area
     - "Upload images or documents" (max 5MB)
- Footer:
  - "Cancel" button (left, gray)
  - "Preview" button (middle, blue outline)
  - "Post Thread" button (right, Amber, prominent)

**Request New Forum Modal**:
- Header: "Request New Forum"
- Form fields:
  1. **Forum Name** (required): "e.g., Nigeria → Canada Students"
  2. **Forum Category** (required): Dropdown (Country, School, Career, etc.)
  3. **Description** (required): Textarea, 500 characters
  4. **Justification** (required): "Why is this forum needed?" (textarea)
- Similar Forums Suggestion:
  - Auto-suggest section: "These similar forums already exist:"
  - List of 3-5 similar forums with "Join" buttons
  - Text: "Still want to create a new forum? Submit your request below."
- Footer:
  - "Cancel" button
  - "Submit Request" button (Amber)

**Design Style**: Clean modal design, focused form, helpful suggestions, clear required fields

---

### 10. **Country Integration Guide (New Arrival Hub)**
**Purpose**: Help students integrate into a new country with guides, checklists, videos, and mentor support

**Elements**:

- **Hero Section**:
  - Page title: "Welcome to [Country Name]! 🎉"
  - Subtitle: "Your complete guide to settling in [City Name]"
  - **Country selector dropdown**: Change destination (France, Germany, Canada, etc.)
  - **City selector**: Paris, Lyon, Marseille, etc.
  - Hero image: Welcoming photo of the city/landmark
  - Quick stats: "✓ 47 guides • 🎥 23 videos • ✅ 8 checklists • 👥 156 mentors available"

- **Progress Tracker** (sticky sidebar on desktop, top on mobile):
  - "Your Integration Progress: 35%"
  - Progress bar (green fill)
  - **Checklist summary**:
    - ✅ Arrival Preparation (Completed - green)
    - 🔄 First Week Essentials (In Progress - amber)
    - ⏳ Housing Setup (Not Started - gray)
    - ⏳ Administrative Setup (Not Started - gray)
    - ⏳ Banking & Finance (Not Started - gray)
    - ⏳ Health & Insurance (Not Started - gray)
  - "View Full Checklist" button

- **Your Assigned Mentor** (prominent card):
  - Section title: "Your Integration Mentor"
  - Mentor card:
    - Avatar (large, 80×80px)
    - Name + verified badge
    - Location: "Paris, France • Lives here for 5 years"
    - Languages: 🇫🇷 🇬🇧 (flags)
    - Specialties: "Housing", "Administrative", "CPAM" (pills)
    - Availability: "Available today" (green badge)
    - Rating: ⭐⭐⭐⭐⭐ 4.9 (87 reviews)
    - CTA buttons: "Message Mentor" (Amber) | "Schedule Call" (Blue outline)
  - "Request Different Mentor" (small link below)

- **Quick Start Guide** (cards section):
  - Section title: "🚀 Getting Started in [City]"
  - **Timeline Cards** (vertical, 4-6 cards):
    Each card:
    - Timeline indicator: Day 1, Week 1, Month 1, Month 3 (with connecting line)
    - Card title: "First 24 Hours", "First Week", "First Month", "First 3 Months"
    - Key tasks list (3-5 items with checkboxes)
    - "View Detailed Guide →" link
    - Progress indicator (X of Y tasks completed)

- **Video Guides Section**:
  - Section title: "🎥 Video Tutorials"
  - **Video Cards** (grid, 3 columns desktop, 1 mobile):
    Each card:
    - Video thumbnail (16:9 aspect ratio)
    - Play button overlay (center)
    - Duration badge: "5:32" (top right)
    - Title: "How to get your Carte Vitale in Paris"
    - View count: "👁 8.2K views"
    - Helpful count: "👍 247 found this helpful"
    - Category tag: "Health & Insurance" (pill)
  - Common topics: "Getting your residence permit", "Opening a bank account", "Finding housing", "CPAM registration", "CAF application", "Getting a SIM card"
  - "Load More Videos" button

- **Detailed Checklists Section**:
  - Section title: "✅ Step-by-Step Checklists"
  - **Checklist Accordion** (expandable cards):
    Each checklist:
    - Header:
      - Icon + Title: "📋 Residence Permit (Titre de Séjour)"
      - Progress: "3 of 8 steps completed" (visual progress bar)
      - Estimated time: "⏱ 2-4 weeks"
      - Difficulty: "Medium" (amber badge)
      - Expand/collapse arrow
    - Expanded content:
      - **Step list** (numbered):
        Each step:
        - Checkbox (interactive)
        - Step title: "Book appointment at prefecture"
        - Description: 2-3 lines explaining the step
        - Useful links: "🔗 Prefecture Paris website" (blue link)
        - Documents needed: Pills ("Passport", "Proof of address", "Student card")
        - Tips: 💡 Collapsible "Pro Tip" section (green background)
        - Completion date (if checked): "Completed on Oct 15, 2024"
      - "Download PDF Guide" button (outline)
      - "Share with Mentor" button (outline)
  - Categories: Arrival Prep, Housing, Administrative, Banking, Health, Transport, Communication

- **Essential Contacts Directory**:
  - Section title: "📞 Important Contacts"
  - **Contact Cards** (grid, 2 columns):
    Each card:
    - Category icon + name: "🏥 Healthcare", "🏛️ Administration", "🏠 Housing", "🚨 Emergency"
    - Contact list (3-5 contacts):
      - Service name: "Prefecture de Police Paris"
      - Phone: "+33 1 23 45 67 89" (with "Call" button)
      - Address: "123 Rue Example, 75001 Paris" (with "Map" button)
      - Hours: "Mon-Fri 9:00-17:00"
      - Website link: "🔗 Visit website"
    - Verified badge: "✓ Updated Oct 2024"

- **Local Community** (bottom section):
  - Section title: "👥 Connect with Local Community"
  - Forum link: "Join [City] Students Forum" (with member count)
  - WhatsApp group link: "Join WhatsApp Community" (if available - V2)
  - Upcoming events: "📅 Paris New Students Meetup - Oct 25" (card with "RSVP" button)

- **FAQ Section** (collapsible):
  - "❓ Frequently Asked Questions"
  - Accordion-style Q&A (10-15 common questions)
  - Search bar for FAQ

**Design Style**: Organized guide layout, progress tracking, video integration, interactive checklists, trust signals (verified contacts, mentor support), mobile-optimized

---

### 11. **Subscription Plans Page**
**Purpose**: Convert users to paid plans with clear value proposition

**Elements**:

- **Hero Section**:
  - Page title: "Choose Your Plan"
  - Subtitle: "Unlock your full potential with TrailLearn Premium"
  - Toggle switch: "Monthly" | "Yearly" (with "Save 20%" badge on yearly)

- **Pricing Cards** (3 cards, side-by-side):

  **FREE Plan Card**:
  - Badge: "Current Plan" (if active, blue badge at top)
  - Plan name: "Free" (large, bold)
  - Price: "€0" (large) + "/month" (small)
  - Subtitle: "Perfect to get started"
  - Features list (with icons):
    - ✓ 5 saved scholarships
    - ✓ Basic scholarship search
    - ✓ Access to public forums (read-only)
    - ✓ Community events access
    - ✓ Weekly newsletter
    - ✗ AI Career Coach (crossed out, gray)
    - ✗ Mentor matching (crossed out, gray)
    - ✗ Unlimited favorites (crossed out, gray)
  - CTA: "Current Plan" (gray, disabled) OR "Get Started" (blue outline)
  - Footer: "No credit card required"

  **PLUS Plan Card** (recommended):
  - Badge: "Most Popular" (amber badge with star icon at top)
  - Plan name: "Plus" (large, bold)
  - Price: "€9" (large, crossed out "€11" if yearly) + "/month" (small)
  - Yearly savings: "Save €24/year" (green text, if yearly toggle)
  - Subtitle: "For serious students"
  - Card highlight: Subtle amber border glow
  - Features list:
    - ✓ Everything in Free
    - ✓ 50 saved scholarships
    - ✓ AI Career Coach (IKIGAI-based)
    - ✓ Access to all forums (read + post)
    - ✓ 3 mentor requests/month
    - ✓ Priority support
    - ✓ Advanced search filters
    - ✓ Deadline reminders (email + SMS)
    - ✓ Country integration guides
  - CTA: "Upgrade to Plus" (Amber, prominent, large button)
  - Footer: "7-day free trial • Cancel anytime"

  **PRO Plan Card**:
  - Badge: "Best Value" (green badge at top)
  - Plan name: "Pro" (large, bold)
  - Price: "€29" (large, crossed out "€35" if yearly) + "/month" (small)
  - Yearly savings: "Save €72/year" (green text, if yearly)
  - Subtitle: "For ambitious professionals"
  - Features list:
    - ✓ Everything in Plus
    - ✓ Unlimited saved scholarships
    - ✓ Unlimited mentor requests
    - ✓ 1-on-1 monthly mentor session (included)
    - ✓ Job search support queue access
    - ✓ Resume/CV AI review
    - ✓ Interview preparation support
    - ✓ Priority mentor matching
    - ✓ Early access to new features
    - ✓ Dedicated account manager
    - ✓ No job placement commission (free tier pays 10%)
  - CTA: "Upgrade to Pro" (Blue, prominent)
  - Footer: "14-day free trial • Cancel anytime"

- **Comparison Table** (below cards, expandable):
  - "Compare Plans in Detail ▼" (collapsible section)
  - Detailed feature comparison table:
    - Rows: All features (30+ rows)
    - Columns: Free | Plus | Pro
    - Cells: ✓ (green checkmark), ✗ (gray x), or specific limits ("5", "50", "Unlimited")
    - Categories: Search & Discovery, AI Features, Mentoring, Forums, Events, Support, Job Search, Administrative
  - Sticky header on scroll

- **Status Benefits Section**:
  - Section title: "🏆 Earn While You Learn"
  - Subtitle: "All plans include gamification rewards"
  - **Status Cards** (horizontal, 4 cards):
    - Bronze (0-499 pts), Silver (500-1,999 pts), Gold (2,000-4,999 pts), Platinum (5,000+ pts)
    - Each card shows:
      - Badge icon (visual)
      - Status name + point range
      - Benefits (2-3 key perks)
      - Discount percentage (5%, 10%, 15%)
  - "Learn more about earning points →" link

- **Testimonials Section**:
  - Section title: "💬 Loved by Students Worldwide"
  - **Testimonial Cards** (3 cards, horizontal):
    Each card:
    - Quote text (2-3 sentences)
    - Student photo (circle, 64×64px)
    - Name + country: "Sarah M., Cameroon → France"
    - Plan badge: "Plus Member" (pill)
    - Star rating: ⭐⭐⭐⭐⭐

- **FAQ Section**:
  - "Frequently Asked Questions"
  - Accordion (8-10 common questions):
    - "Can I cancel anytime?"
    - "What payment methods do you accept?"
    - "Is there a free trial?"
    - "Can I change plans later?"
    - "Are there student discounts?"
    - "What happens if I downgrade?"

- **Trust Signals** (bottom):
  - Payment icons: Visa, Mastercard, PayPal, Stripe
  - Security badge: "🔒 Secure payment with Stripe"
  - Money-back guarantee: "30-day money-back guarantee"
  - Student stats: "Join 10,000+ students already using TrailLearn"

- **Sticky CTA Bar** (mobile, bottom):
  - Selected plan: "Plus - €9/month"
  - "Start Free Trial" button (Amber, full width)

**Design Style**: Pricing page layout, clear value hierarchy, social proof, conversion-optimized, trust signals, mobile-responsive

---

### 12. **Mentor Dashboard** (Mentor Mode)
**Purpose**: Central hub for mentors to manage mentees, track earnings, and view performance

**Elements**:

- **Top navigation bar** (Mentor Mode):
  - TrailLearn logo (left)
  - Menu items: Dashboard, My Mentees, Availability, Earnings, Resources
  - **Profile Switcher**:
    - Active: "Mentor Mode" with mentor icon (emerald green)
    - Hover shows: "Switch to Trailler" option
  - User avatar + name (right) with dropdown
  - Notification bell icon with badge (mentee requests, messages)

- **Mentor Status Banner** (if applicable):
  - Verification status: "✓ Verified Mentor" (green badge)
  - Reputation badge: "🏆 Gold Mentor" (with icon)
  - Profile completion: "Profile 100% complete" (green checkmark)
  - Warning if issues: "⚠️ Complete your availability calendar" (amber banner)

- **Performance Stats** (top cards, 4 columns):
  Each stat card:
  - Icon (large, 48×48px)
  - Metric value (large, bold): "12" active mentees, "4.9" rating, "€340" earned this month, "87" total sessions
  - Label (gray text): "Active Mentees", "Average Rating", "Monthly Earnings", "Sessions Completed"
  - Trend indicator: "+3 this month" (green with up arrow)

- **Pending Requests** (prominent section):
  - Section title: "New Mentoring Requests (5)"
  - **Request Cards** (horizontal list, 3 visible):
    Each card:
    - Trailler avatar (64×64px)
    - Name + location: "John Doe • Cameroon → France"
    - Request type: "Career Guidance" (pill)
    - Preview: "I'm looking for help with Data Science career transition..." (2 lines)
    - Compatibility score: "92% Match" (green badge with star)
    - Timestamp: "Requested 2 hours ago"
    - Action buttons: "Accept" (Amber) | "Decline" (gray outline) | "View Profile" (blue text link)
  - "View All Requests →" link

- **Your Active Mentees** (main section):
  - Section title: "Active Mentees (12)" with filter dropdown (All | In Progress | Need Attention)
  - **Mentee Cards** (grid, 2-3 columns):
    Each card:
    - Mentee avatar (48×48px) + name
    - Progress indicator: "3 of 5 sessions completed" (progress bar)
    - Last interaction: "Last message: 2 days ago"
    - Status badge: "On Track" (green) | "Needs Attention" (amber) | "Inactive" (gray)
    - Goal: "Goal: Pass Data Science interviews"
    - Quick actions: "Message" icon button | "Schedule Session" icon button | "View Profile" icon button
    - "View Details →" link

- **Upcoming Sessions** (sidebar or widget):
  - Section title: "Upcoming Sessions"
  - **Session Cards** (vertical list, 3-5 cards):
    Each card:
    - Mentee avatar + name
    - Session type: "Career Guidance" (pill)
    - Date/Time: "Tomorrow, 3:00 PM" (with calendar icon)
    - Duration: "1 hour"
    - Meeting link: "Join Video Call" button (blue, disabled until time)
    - Actions: "Reschedule" icon | "Cancel" icon

- **Earnings Overview** (widget):
  - Section title: "This Month's Earnings"
  - Total: "€340" (large, bold)
  - Breakdown:
    - Mentoring sessions: "€280"
    - Job placement bonus: "€60"
  - Chart: Simple line or bar chart showing weekly earnings
  - "View Detailed Report →" link

- **Quick Actions** (floating or sidebar):
  - "Set Availability" button (calendar icon)
  - "Update Profile" button (edit icon)
  - "View Resources" button (book icon)
  - "Invite Mentees" button (share icon)

- **Tips & Resources** (collapsible widget):
  - Section title: "💡 Mentor Tips"
  - Tips carousel: "How to give effective feedback", "Best practices for virtual sessions"
  - "Browse All Resources →" link

**Design Style**: Dashboard layout optimized for mentor workflow, performance metrics prominent, mentee management focused, earnings tracking visible

---

### 13. **Become a Mentor Flow** (Activation Process)
**Purpose**: Guide users through mentor profile activation

**Step 1: Introduction Page**

**Elements**:
- **Hero Section**:
  - Title: "Become a TrailLearn Mentor"
  - Subtitle: "Share your expertise, help students succeed, and earn income"
  - Hero image: Mentor helping student (diverse, welcoming)
  - CTA: "Start Application" (Amber, large, prominent)

- **Benefits Section** (3-4 cards):
  Each card:
  - Icon (large, 64×64px): 💰 Earn Income, 🌟 Build Reputation, 🎯 Flexible Schedule, 🌍 Global Impact
  - Benefit title (bold, 18px)
  - Description (2-3 sentences)
  - Stat example: "Average mentor earns €450/month"

- **How It Works** (timeline):
  - Step 1: "Apply" - "Fill out application (5 min)"
  - Step 2: "Review" - "Team reviews in 3-5 days"
  - Step 3: "Interview" - "Optional 15-min video call"
  - Step 4: "Activate" - "Start mentoring!"
  - Visual timeline with connecting line

- **Requirements** (checklist):
  - ✓ 2+ years experience in your field
  - ✓ Fluent in English or French
  - ✓ Available 3+ hours per month
  - ✓ Genuine passion for helping students
  - "Don't meet all requirements? Apply anyway!"

- **Testimonials** (from existing mentors):
  - 2-3 mentor testimonial cards with photos, quotes, earnings stats

- **FAQ Section** (accordion):
  - "How much can I earn?"
  - "How much time commitment?"
  - "What if I'm not approved?"
  - "Can I mentor part-time?"

**Step 2: Application Form** (multi-step form)

**Form Sections**:

**Section 1: Basic Information**
- Full name (auto-filled from account)
- Professional title: "e.g., Senior Data Scientist"
- Current employer/university
- Years of experience (slider: 0-20+)
- Location (country + city)
- Languages spoken (multi-select with flags)
- Timezone (dropdown)
- Progress: "Step 1 of 5" (progress bar at top)

**Section 2: Expertise & Skills**
- Primary expertise area (dropdown): Data Science, AI/ML, Cyber Security, Cloud, etc.
- Specific skills (multi-select with search): Python, AWS, React, etc.
- Industries: Tech, Finance, Healthcare, etc.
- "Add Custom Skill" option

**Section 3: Mentoring Preferences**
- What type of mentoring? (checkboxes):
  - Career guidance
  - Interview preparation
  - CV/Resume review
  - Technical skills coaching
  - Academic guidance
- Preferred mentee level (checkboxes): Beginner, Intermediate, Advanced
- Monthly capacity: "How many mentees can you support?" (slider: 1-20)
- Availability (drag calendar interface or time picker)

**Section 4: Background & Credentials**
- Education:
  - Degree + field + university + year
  - "Add Another Degree" button
- Certifications (optional):
  - Certification name + issuing organization + year
  - Upload certificate (optional)
- Work Experience:
  - Job title + company + years
  - "Add Another Position" button
- Portfolio/LinkedIn (optional):
  - LinkedIn URL
  - Personal website
  - GitHub (for technical mentors)

**Section 5: Motivation & Approach**
- Text area questions:
  1. "Why do you want to become a TrailLearn mentor?" (500 chars)
  2. "Describe your mentoring style and approach" (500 chars)
  3. "Share a success story of helping someone grow" (optional, 500 chars)
- Character counter below each textarea

**Section 6: Review & Submit**
- Summary of all information entered
- Editable sections (click to go back)
- Agreement checkboxes:
  - ☐ "I agree to TrailLearn's Mentor Code of Conduct"
  - ☐ "I commit to responding to mentee requests within 48 hours"
  - ☐ "I understand applications are reviewed in 3-5 business days"
- Submit button: "Submit Application" (Amber, large)
- "Save as Draft" option (gray outline)

**Step 3: Application Submitted (Success Page)**

**Elements**:
- Success icon (large checkmark, animated)
- Title: "Application Submitted! 🎉"
- Message: "Thank you for applying to become a TrailLearn mentor. Our team will review your application within 3-5 business days."
- What's Next:
  - Timeline card showing review process
  - Email notification: "We'll email you at [email] with updates"
  - Optional interview: "You may be invited for a 15-minute video interview"
- Action buttons:
  - "Return to Dashboard" (Amber)
  - "Invite Friends to TrailLearn" (share referral link)

**Step 4: Application Under Review (Status Page)**

**Elements**:
- Status banner: "Application Under Review" (amber background)
- Progress indicator: "Submitted Oct 15 • Review in Progress • Estimated decision: Oct 18"
- What's happening:
  - ✓ Application received
  - 🔄 Team reviewing credentials (in progress)
  - ⏳ Interview scheduling (if needed)
  - ⏳ Final decision
- Tips while waiting:
  - "Complete your Trailler profile to 100%"
  - "Explore the platform and join forums"
  - "Connect with existing mentors"
- "Have questions? Contact support@traillearn.com"

**Step 5: Approval / Rejection**

**If Approved**:
- Celebration modal (confetti animation)
- Title: "Congratulations! You're a TrailLearn Mentor! 🎉"
- Message: "Your application has been approved. Welcome to our mentor community!"
- Next steps card:
  1. "Complete mentor profile setup" (link)
  2. "Set your availability calendar"
  3. "Review mentoring best practices"
  4. "Receive your first mentee request"
- CTA: "Activate Mentor Profile" (Amber, large)
- Sends to mentor onboarding flow

**If Rejected**:
- Empathetic message: "Application Not Approved"
- Reason (if provided): "We're looking for mentors with 3+ years experience"
- Encouragement: "We appreciate your interest! Here's what you can do:"
- Options:
  - "Gain more experience and reapply in 6 months"
  - "Connect with mentors as a Trailler"
  - "Contribute to forums and build your reputation"
- CTA: "Continue as Trailler" (blue outline)

**Design Style**: Multi-step form with clear progress, validation feedback, encouraging tone, smooth transitions, celebration moments

---

### 14. **Profile Switcher Component** (Persistent across all pages)
**Purpose**: Allow users to toggle between Trailler and Mentor modes

**Location**: Top navigation bar, between main menu and user avatar

**Variants**:

**When Mentor Profile NOT Activated**:
- Button style: Outlined button
- Icon: Lock icon (gray)
- Text: "Become a Mentor"
- Click action: Opens modal with mentor benefits + "Start Application" CTA
- Hover: Slight blue glow

**When Mentor Profile Activated (In Trailler Mode)**:
- Dropdown button style: Filled button with down arrow
- Icon: Student icon (blue)
- Text: "Trailler Mode"
- Current mode indicator: Blue filled background
- Dropdown menu (on click):
  - Header: "Switch Profile"
  - Option 1: "👨‍🎓 Trailler Mode" (current - blue checkmark)
  - Option 2: "👨‍🏫 Mentor Mode" (with arrow icon)
  - Divider
  - "Manage Profiles" link (settings icon)
- Hover: Shows preview "Switch to Mentor"

**When in Mentor Mode**:
- Dropdown button style: Filled button with down arrow
- Icon: Mentor icon (emerald green)
- Text: "Mentor Mode"
- Current mode indicator: Green filled background
- Dropdown menu:
  - Header: "Switch Profile"
  - Option 1: "👨‍🎓 Trailler Mode" (with arrow icon)
  - Option 2: "👨‍🏫 Mentor Mode" (current - green checkmark)
  - Divider
  - "Mentor Dashboard" link (if not already there)
  - "Manage Profiles" link
- Notification badge: Shows pending mentee requests count (e.g., "3")

**Mobile Version**:
- Icon-only toggle (tap to switch modes)
- Shows current mode with colored icon
- Swipe gesture alternative: Swipe right on nav bar to quick switch
- Confirmation toast: "Switched to Mentor Mode" (with undo option, 3 seconds)

**Design Style**: Clear visual distinction between modes, smooth toggle animation (200ms), persistent across all pages, intuitive icon usage

---

### 15. **Mobile App - Bottom Navigation**
**Purpose**: Mobile-first navigation

**Elements**:
- 5 tabs (icons + labels):
  1. **Home** (house icon) - Dashboard
  2. **Search** (magnifying glass) - Scholarships
  3. **Forums** (chat bubbles icon) - Community Forums ⭐ NEW
  4. **Mentors** (people icon) - Mentoring
  5. **Profile** (user icon) - Account settings

- Each icon with label below
- Active state: Filled icon + blue color
- Inactive state: Outline icon + gray color
- Badge on notifications (Home, Forums, Mentors)

**Design Style**: Clean bottom nav bar, white background, minimal, iOS/Material Design inspiration

**Note**: Forums tab includes notification badge for new posts in joined forums

---

## 🎯 Design System Components

**Buttons**:
- **Primary** (Amber #F59E0B): Main CTAs, important actions
- **Secondary** (Blue outline): Less important actions
- **Tertiary** (Text only): Cancel, skip actions
- **Sizes**: Small (32px), Medium (40px), Large (48px)
- **Border radius**: 8px (rounded but not pill-shaped)

**Cards**:
- White background (#FFFFFF)
- Border: 1px solid #E2E8F0 (light gray)
- Border radius: 12px
- Shadow: Subtle (0 1px 3px rgba(0,0,0,0.1))
- Hover: Lift effect (shadow grows)
- Padding: 24px

**Form Inputs**:
- Border: 1px solid #CBD5E1 (gray)
- Focus: 2px solid #2563EB (blue)
- Border radius: 8px
- Padding: 12px
- Placeholder: #94A3B8 (light gray)
- Error state: Red border + red text below

**Icons**:
- Style: Outline (2px stroke)
- Size: 20-24px for UI elements, 32-48px for features
- Color: Inherit from text or use semantic colors
- Library: Heroicons or Lucide Icons

**Badges/Tags**:
- Rounded pill shape (border-radius: 9999px)
- Small text (12-14px)
- Color-coded:
  - Deadline: Amber background, dark text
  - Success: Green background, white text
  - Info: Blue background, white text
  - Warning: Red background, white text

**Typography Scale**:
- Heading 1: 32px (mobile) / 40px (desktop), Bold
- Heading 2: 24px / 32px, Semibold
- Heading 3: 20px / 24px, Semibold
- Body: 16px, Regular
- Small: 14px, Regular
- Tiny: 12px, Regular (captions, labels)

**Forum-Specific Components**:

**Thread Card**:
- Layout: Horizontal card with user info (left), content (center), metrics (right)
- Background: White
- Border: 1px solid #E2E8F0
- Border radius: 8px
- Padding: 16px
- Hover: Border changes to blue (#2563EB), slight shadow lift
- Spacing: 12px gap between cards

**Post/Reply Card**:
- Layout: Vertical card
- User section: Avatar + username + badges (horizontal)
- Content section: Rich text with proper line spacing (1.6)
- Actions bar: Icons with counts (upvote, reply, share, bookmark)
- Nested replies: Indented 24px with left border (2px blue)
- Background: White for original post, #F8FAFC for replies
- Border radius: 8px

**User Badge**:
- Size: Small (16px height)
- Rounded pill (border-radius: 4px)
- Variants:
  - Moderator: Purple background (#8B5CF6), white text
  - Verified: Green background (#10B981), white text with checkmark icon
  - Gold/Silver/Bronze Member: Gradient backgrounds (amber→yellow for Gold)
- Font: 10px, Semibold, uppercase

**Engagement Metrics**:
- Style: Icon + number
- Icon size: 16px
- Number: 14px, gray (#64748B)
- Spacing: 16px between metrics
- Hover: Icon and number turn blue
- Active state (user engaged): Blue color, filled icon

**Rich Text Editor Toolbar**:
- Height: 40px
- Background: #F8FAFC (light gray)
- Border: 1px solid #CBD5E1
- Border radius: 8px (top corners only)
- Buttons: Icon-only, 32×32px, gray icons
- Active tool: Blue background (#DBEAFE), blue icon
- Tools: Bold, Italic, Link, Unordered List, Ordered List, Image Upload, Emoji
- Spacing: 4px between buttons

**Forum Stats Pills**:
- Style: Inline badges with icon + text
- Background: Transparent
- Border: 1px solid #E2E8F0
- Border radius: 9999px (pill)
- Padding: 6px 12px
- Icon: 14px, left of text
- Text: 12px, gray (#64748B)
- Example: "👥 1,247 members" | "💬 523 threads" | "📝 8,432 posts"

---

## 📱 Responsive Behavior

**Breakpoints**:
- Mobile: < 768px (1 column, stacked layout)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (3 columns, sidebars)

**Mobile-first priorities**:
- Large touch targets (44x44px minimum)
- Simplified navigation (hamburger menu or bottom nav)
- Vertical scrolling (no horizontal)
- Collapsible sections (accordions for filters)
- Sticky CTAs at bottom of screen

---

## 🌟 Unique Visual Elements

**Illustrations**:
- Friendly, diverse student characters
- Flat illustration style (not too cartoonish)
- Use brand colors (blue, green, amber accents)
- Empty states: Encouraging illustrations with helpful text

**Imagery**:
- Real photos of diverse students studying, collaborating
- Bright, well-lit, optimistic tone
- Avoid stock photo clichés
- International representation (various ethnicities, cultures)

**Animations** (subtle):
- Button hover: Slight scale + shadow increase
- Card hover: Lift effect
- Loading: Spinner or skeleton screens
- Success: Checkmark animation (green)
- Transitions: 200-300ms ease-in-out

**Accessibility**:
- High contrast text (WCAG AA minimum)
- Keyboard navigation visible focus states (blue outline)
- Alt text for all images
- Form labels always visible (not just placeholders)
- Color not the only indicator (use icons + text)

---

## 💡 Design Inspiration Keywords

For Figma AI generation, use these keywords:
- **Style**: Modern, clean, minimal, accessible, friendly
- **Mood**: Optimistic, professional, trustworthy, international
- **Layout**: Card-based, dashboard, mobile-first, responsive
- **Colors**: Blue (#2563EB), green (#10B981), amber (#F59E0B), clean whites and grays
- **Audience**: Students, global, diverse, young professionals
- **Platform**: Education tech, mentoring marketplace, AI-powered guidance
- **Similar to**: LinkedIn (professional), Duolingo (friendly UX), Notion (clean interface), Coursera (education focus)

---

## 📋 Quick Copy-Paste Prompt for Figma AI

### Main Dashboard Prompt (Trailler Mode)

```
Design a modern web application dashboard for TrailLearn, an AI-powered platform
helping international students find scholarships, mentors, and community forums globally.

IMPORTANT: Dual Profile System (like Udemy student/instructor)
- Every user has TWO profiles: Trailler (student) and Mentor
- Profile Switcher in top nav between menu and user avatar
- Shows current mode: "Trailler Mode" (blue icon) with dropdown to switch

Brand Colors:
- Primary: Deep Blue (#2563EB)
- Secondary: Emerald Green (#10B981)
- Accent: Amber (#F59E0B)
- Background: White and light grays

Style: Clean, modern, mobile-first, accessible, card-based layout

Include:
1. Top navigation: Logo, menu (Dashboard, Scholarships, Forums, Mentors, Events),
   PROFILE SWITCHER ("Trailler Mode" dropdown), user avatar, notification bell
2. Welcome section: "Welcome back, [Name]!" + profile completion progress bar
3. AI Coach "Next Best Action" card with gradient background (blue→green)
4. Dashboard widgets: Upcoming deadlines timeline, saved scholarships carousel,
   recommended mentors, active forum threads
5. Activity feed with icons showing recent actions

Target Audience: International students (18-30), global, diverse
Mood: Optimistic, professional, trustworthy, friendly

Similar to: LinkedIn (professional), Notion (clean UI), Coursera (education),
Reddit (forums), Udemy (dual profiles)
```

---

### Forums Page Prompt ⭐ NEW

```
Design a community forums discovery page for TrailLearn education platform.

Layout:
- Page title: "Community Forums"
- Search bar: "Search forums by topic, country, or school..."
- "Create Forum" button (Amber #F59E0B, top right)
- Filter tabs: All Forums | By Country | By School | By Career | My Forums

Forum Cards Grid (3 columns desktop, 1 mobile):
Each card:
- Forum icon (64x64px circle)
- Forum name (bold, blue): "Cameroon → France Students"
- Member count: "1,247 members"
- Activity: "32 posts this week" (green text)
- Description (2 lines, gray)
- Tags: "Scholarship", "Visa", "Housing" (pills)
- "Join Forum" button or "Joined" checkmark

Colors: Blue (#2563EB), Green (#10B981), Amber (#F59E0B)
Style: Card-based grid, clean, modern, social media inspired
Similar to: Reddit communities, Discord servers, Facebook groups
```

---

### Forum Thread View Prompt ⭐ NEW

```
Design a forum thread discussion page for TrailLearn.

Thread Header:
- Breadcrumb: "Forums > Cameroon → France > Thread Title"
- Thread title (large, bold)
- Tags: "Housing", "CAF", "Paris"
- Actions: Bookmark, Share, Report icons

Original Post (highlighted):
- User info sidebar: Avatar (64px), username, badges (Moderator, Verified),
  join date, post count
- Post content: Rich text with formatting
- Engagement bar: Upvote/downvote arrows, "Reply" button, share, bookmark

Replies List (23 replies):
- User avatar (40px) + username + badges
- Reply text content
- Timestamp: "2 hours ago"
- Nested replies: Indented with blue left border
- Actions: Upvote/downvote, Reply button, Report flag

Reply Editor (bottom, sticky):
- User avatar
- Rich text editor: "Write your reply..."
- Toolbar: Bold, Italic, Link, List, Image upload
- "Post Reply" button (Amber)

Colors: Blue (#2563EB), Green (#10B981), Amber (#F59E0B)
Style: Traditional forum layout, nested threads, clean typography
Similar to: Reddit threads, Stack Overflow, Discourse forums
```

---

### Country Integration Guide Prompt ⭐ NEW

```
Design a country integration guide page for TrailLearn helping students settle in new countries.

Hero Section:
- Title: "Welcome to France! 🎉"
- Subtitle: "Your complete guide to settling in Paris"
- Country/City selectors (dropdowns)
- Quick stats: "47 guides • 23 videos • 8 checklists • 156 mentors"

Progress Tracker (sidebar):
- "Your Integration Progress: 35%"
- Checklist summary with status icons:
  ✅ Arrival Prep (green), 🔄 First Week (amber), ⏳ Housing (gray)

Your Assigned Mentor Card:
- Large avatar (80px) + name + verified badge
- Location: "Paris, France • Lives here 5 years"
- Languages: French/English flags
- Specialties: Housing, Admin, CPAM (pills)
- Rating: 4.9 stars (87 reviews)
- Buttons: "Message Mentor" (amber), "Schedule Call" (blue outline)

Quick Start Timeline:
- Vertical timeline: Day 1, Week 1, Month 1, Month 3
- Each with task list and progress indicator

Video Tutorials Grid (3 columns):
- Video thumbnail (16:9) with play button
- Duration badge: "5:32"
- Title: "How to get your Carte Vitale"
- Views: "8.2K" | Helpful: "247 👍"

Step-by-Step Checklists (accordion):
- "📋 Residence Permit" with progress bar
- Expandable steps with checkboxes, links, documents needed
- Pro tips (green background)
- "Download PDF" and "Share with Mentor" buttons

Essential Contacts Directory:
- Categories: Healthcare, Admin, Housing, Emergency
- Contact cards with phone, address, hours, website
- "Call" and "Map" buttons

Colors: Blue (#2563EB), Green (#10B981), Amber (#F59E0B)
Style: Organized guide layout, progress tracking, video integration
Similar to: Notion guides, Airbnb experiences, government integration portals
```

---

### Subscription Plans Prompt ⭐ NEW

```
Design a subscription pricing page for TrailLearn with 3 tiers.

Hero:
- Title: "Choose Your Plan"
- Subtitle: "Unlock your full potential with TrailLearn Premium"
- Toggle: Monthly | Yearly (with "Save 20%" badge)

Pricing Cards (3 cards side-by-side):

FREE Card:
- "€0/month"
- "Perfect to get started"
- Features:
  ✓ 5 saved scholarships
  ✓ Basic search
  ✓ Public forums (read-only)
  ✗ AI Coach (grayed out)
  ✗ Mentor matching (grayed out)
- Button: "Get Started" (blue outline)

PLUS Card (highlighted with amber border):
- Badge: "Most Popular" (amber with star)
- "€9/month" (crossed out €11 if yearly)
- "Save €24/year" (green text)
- "For serious students"
- Features:
  ✓ Everything in Free
  ✓ 50 saved scholarships
  ✓ AI Career Coach
  ✓ All forums access
  ✓ 3 mentor requests/month
  ✓ Priority support
- Button: "Upgrade to Plus" (Amber, prominent)
- "7-day free trial • Cancel anytime"

PRO Card:
- Badge: "Best Value" (green)
- "€29/month" (crossed out €35)
- "For ambitious professionals"
- Features:
  ✓ Everything in Plus
  ✓ Unlimited scholarships
  ✓ Unlimited mentors
  ✓ 1-on-1 monthly session
  ✓ Job search support
  ✓ CV AI review
  ✓ No commission (10% for free)
- Button: "Upgrade to Pro" (Blue)
- "14-day free trial"

Comparison Table (expandable):
- "Compare Plans in Detail ▼"
- Feature rows vs Free/Plus/Pro columns
- Green checkmarks, gray X's, specific limits

Status Benefits:
- "🏆 Earn While You Learn"
- Bronze/Silver/Gold/Platinum cards with point ranges
- Discount percentages (5%, 10%, 15%)

Testimonials:
- 3 student testimonials with photos, quotes, ratings
- "Sarah M., Cameroon → France" + star rating

FAQ Accordion:
- 8-10 common questions (Can I cancel? Payment methods? etc.)

Trust Signals:
- Payment icons: Visa, Mastercard, PayPal, Stripe
- "🔒 Secure payment"
- "30-day money-back guarantee"

Colors: Blue (#2563EB), Green (#10B981), Amber (#F59E0B)
Style: SaaS pricing page, conversion-optimized, value hierarchy
Similar to: Notion pricing, Duolingo Plus, Coursera subscriptions
```

---

### Complete Multi-Screen Prompt

```
Design a complete education platform UI for TrailLearn with these screens:

1. DASHBOARD:
   - Top nav: Logo, menu (Dashboard, Scholarships, Forums, Mentors, Integration, Pricing),
     user avatar, notifications
   - Welcome + progress bar
   - AI Coach card (gradient blue→green)
   - Widgets: Deadlines, scholarships, mentors, forum activity

2. SCHOLARSHIP SEARCH:
   - Search bar + filters sidebar
   - Results grid: Scholarship cards with logo, name, deadline (amber badge),
     amount (green), tags, heart icon

3. FORUMS DISCOVERY:
   - Browse by Category section (6-8 category cards with icons)
   - Trending forums carousel: "🔥 Trending This Week" with view counts
   - Filter tabs: All, By Country, By School, By Career
   - Forum cards grid: Icon, name, members, activity, tags, join button

4. FORUM THREAD VIEW:
   - Thread header + breadcrumb
   - Original post (highlighted, user badges)
   - Replies list (nested with blue left border)
   - Reply editor with rich text toolbar (sticky bottom)

5. MENTOR PROFILE:
   - Header: Avatar, name, title, rating, badges
   - Services cards
   - Reviews section
   - "Request Introduction" CTA

6. COUNTRY INTEGRATION GUIDE ⭐:
   - Hero: "Welcome to France!" + country/city selectors
   - Progress tracker (35% complete with checklist summary)
   - Assigned mentor card (avatar, rating, specialties, contact buttons)
   - Quick start timeline (Day 1, Week 1, Month 1, Month 3)
   - Video tutorials grid (thumbnails with play button, views, duration)
   - Step-by-step checklists (accordion with progress, documents, tips)
   - Essential contacts directory (Healthcare, Admin, Housing, Emergency)

7. SUBSCRIPTION PLANS ⭐:
   - Hero: "Choose Your Plan" + Monthly/Yearly toggle
   - 3 pricing cards: Free (€0), Plus (€9, Most Popular badge), Pro (€29)
   - Feature lists with checkmarks and X's
   - Comparison table (expandable)
   - Status benefits (Bronze/Silver/Gold/Platinum with discounts)
   - Testimonials (3 student reviews with photos)
   - FAQ accordion
   - Trust signals (payment icons, security badge, guarantee)

BRAND:
- Colors: Blue (#2563EB), Green (#10B981), Amber (#F59E0B)
- Font: Inter
- Style: Clean, modern, card-based, mobile-first, conversion-optimized

AUDIENCE: International students 18-30, global, diverse
MOOD: Optimistic, professional, trustworthy, community-driven, supportive

SIMILAR TO: LinkedIn + Notion + Coursera + Reddit + Airbnb + SaaS pricing pages
```

---

### Mobile App Prompt

```
Design a mobile app interface (iOS style) for TrailLearn student platform.

Bottom Navigation (5 tabs):
- Home | Search | Forums ⭐ | Mentors | Profile
- Active tab: Filled icon + blue, Inactive: Outline + gray
- Notification badges on Home, Forums, Mentors

Main Screens:
1. Dashboard: Welcome message, progress bar, Next Best Action card,
   upcoming deadlines, scholarship carousel
2. Forums: List of joined forums with activity indicators, search bar,
   trending forums section
3. Thread View: Original post + replies (nested), floating reply button

Colors: Blue (#2563EB), Green (#10B981), Amber (#F59E0B)
Style: Clean, iOS-inspired, card-based, gesture-friendly
Bottom nav badge for new forum posts
```

---

**Use these prompts in Figma AI, Adobe Firefly, v0.dev, or Midjourney!**