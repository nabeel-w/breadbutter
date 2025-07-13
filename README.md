# Creative Talent Matchmaking Engine

BreadButter is a smart matchmaking engine built to connect clients with the most relevant creative talents from a pool of 10,000+ professionals. Clients submit briefs (e.g., _“I need a travel photographer in Goa for 3 days in November. Budget ₹75k. Style: Pastel tones, candid portraits.”_), and the system returns a ranked, explainable list of ideal candidates.

----------

## 🌟 Features

-   🎯 **Brief-to-Talent Matching**: Accepts creative briefs and returns ranked talent matches.
    
-   🧠 **Hybrid Recommendation System**: Combines rule-based filtering (skills, budget, category) with vector search via embeddings for nuanced style-based matching.
    
-   🚀 **Asynchronous Allocation**: BullMQ handles job queues for gig creation and talent indexing.
    
-   ⚛️ **Instant UI Updates**: Next.js App Router with Server Actions and Redux for responsive UX.
    
-   📣 **Future-Proof Notifications**: Planned real-time updates to inform users when talent has been matched.
    
-   🔍 **Explainable Results**: Each recommendation includes scores and rationale for transparency.
    
-   📦 **Fully Deployed Demo**:
    
    -   Frontend on [Vercel](https://vercel.com/)
        
    -   Backend + queues on [Render](https://render.com/)
        
    -   Database on [Neon](https://neon.tech/)
        
    -   Redis via [Upstash](https://upstash.com/)
        

----------

## 🧱 Tech Stack

|Area|Technology  |
|--|--|
|Frontend|Next.js (App Router)|
|State Mgmt|Redux
Backend|	Node.js + TypeScript
Async Queue|	BullMQ
Vector DB	|PostgreSQL + Embeddings
Cache/Queue|	Upstash Redis
ORM	|Prisma
Database	|Neon PostgreSQL
Hosting	|Vercel (frontend), Render (backend)


----------

## Flow Chart 

![Architecture Diagram](https://n7kqygiqp6.ufs.sh/f/mFmI2gxKCNA0Npe0VgMS60jyZ7vHsFW3a1ChDkluqdxMEG4V)

---

## 📊 Data Model (Prisma Schema)

```prisma
model Customer {
  id          String       @id @default(uuid())
  ...
  gigs        Gig[]
}

model Gig {
  id               String    @id @default(uuid())
  ...
  customerId       String
  customer         Customer @relation(fields: [customerId], references: [id])
  Recommendations  Recommendation[]
}

model Talent {
  id               String    @id @default(uuid())
  ...
  recommendations  Recommendation[]
}

model Embedding {
  id       String                @id @default(uuid())
  type     EmbeddingType
  entityId String
  vector   Unsupported("vector")
  @@index([type, entityId])
}

model Recommendation {
  id        String   @id @default(uuid())
  ...
  @@unique([gigId, talentId])
}

```

----------

## 📚 Schema Design Rationale

### 1. **Customer ↔ Gigs**

-   **Why?** A customer (startup/individual/creator) may post multiple gigs.
    
-   **Field design:** `Customer.gigs` relation provides easy lookup and dashboard integration.
    

### 2. **Gig**

-   Includes `stylePreferences`, `skills`, and `category` to enable both:
    
    -   Exact matches (rule-based filter)
        
    -   Similarity searches (vector-based using embeddings)
        
-   Status enum (`GigStatus`) models the lifecycle of a project.
    

### 3. **Talent**

-   Fields like `categories`, `skills`, `portfolioLinks`, and budget range help filter and score candidates.
    
-   `experienceYears` acts as a simple seniority metric.
    

### 4. **Embedding**

-   Decouples semantic vector data from main models.
    
-   Indexed on `type + entityId` to allow fast retrieval (e.g., embedding for a specific gig or talent).
    
-   Abstract enough to support additional types later (e.g., Projects, Conversations).
    

### 5. **Recommendation**

-   Bridges `Gig` and `Talent` via many-to-many matching.
    
-   Stores `ranking` and optional `details` to support explainable UX.
    
-   Enforced uniqueness on `[gigId, talentId]` to avoid duplicate matches.
    

----------

## 🧠 Recommendation Engine

### ✴️ Hybrid Matching Approach:

1.  **Rules-based filtering** for:
    
    -   Budget match
        
    -   Skill intersection
        
    -   Location (future support)
        
2.  **Vector similarity** for:
    
    -   Style preferences
        
    -   Descriptions via embeddings
        

### ⚙️ Queues

-   **gig-queue**: Handles gig creation, triggers matching process.
    
-   **talent-queue**: On new talent registration, embedding is created and indexed.
    

----------

## 🧪 Local Development

```bash
# Start Next.js frontend (on Vercel locally)
cd frontend
npm install
npm run dev

# Run backend (BullMQ)
cd services
npm install
npm run dev

# Prisma commands
npx prisma generate

```

----------

## 🔮 Planned Features

-   In-app notifications when a gig has recommended talents.
    
-   Talent availability calendar.
    
-   Personalized talent dashboards.
    
-   Feedback loop for improving recommendations.
- Geo-Location rules for ranking
    

----------

## 📩 Demo Access

-   **Live Preview**: [Live Link](https://breadbutter.vercel.app/)
    
-   **Admin UI (coming soon)**
   
