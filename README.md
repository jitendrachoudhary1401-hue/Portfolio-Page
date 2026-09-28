# Jitendra Choudhary — Personal Developer Portfolio

> **Minimal Tech — Professional + Developer**  
> A modern personal developer portfolio built for an engineering student and aspiring software / AI-ML developer.  
> Connected to **Firebase** for dynamic certificate and credential management via **Cloud Firestore** and **Firebase Storage**.

---

## 🚀 Key Features

1. **Restrained Developer Aesthetic**:
   - Deep dark technical background (`#0B0D12` / `#121722`) with subtle surface borders (`#263041`) and controlled cyan/blue-to-purple accents (`#4F8CFF` &rarr; `#8B5CF6`).
   - Interactive developer terminal panel displaying identity, exploration areas, and active learning focus.
   - Clean monospace accents paired with modern sans-serif typography (`Inter` and `JetBrains Mono`).

2. **Truthful & Authentic Content**:
   - Strictly built using verified facts from the UI/UX plan.
   - Zero mock data, zero fake statistics, zero arbitrary percentage bars, and zero placeholder certificates.

3. **Complete Section Flow**:
   - **Navbar**: Sticky navigation with blur effect, active section indicator, responsive mobile drawer, and admin launcher.
   - **Hero**: Developer intro with action CTAs and technical terminal panel.
   - **Quick Identity Strip**: 4 engineering pillars (CSE/AIML, Developer, AI/ML, Community).
   - **About Me**: Two-column layout with engineering background and 3 core focus pillars.
   - **Skills & Tech Stack**: Categorized cards separating core competencies from active learning/exploration.
   - **Featured Projects**: Real project concepts (*CampusCare*, *Rescue Paw*, *Aero Vision*) with problem breakdown modal.
   - **Experience & Social Impact**: Technical Vidya contributor role and NSS volunteer work.
   - **Learning Journey**: Numbered roadmap from computing foundations to cross-platform mobile apps.
   - **Certificates**: Cloud Firestore real-time gallery with category filters, search, and document viewer modal.
   - **Honors & Achievements**: Verified institutional and community recognitions.
   - **Education**: B.Tech in CSE (AI/ML) with core coursework.
   - **Currently Building**: Live development highlight on Flutter + Dart and active systems.
   - **Contact**: Direct communication channels and a functional message transmission form connected to Firestore.
   - **Footer**: Developer summary, navigation links, and admin portal access.

4. **Dynamic Certificate Management (Firebase Backend)**:
   - **Admin Portal**: Integrated authentication and certificate manager.
   - **Document Upload**: Direct upload of Certificate images (PNG/JPG) or PDFs to **Firebase Storage** with real-time progress indicators.
   - **Metadata Persistence**: Real-time storage of title, issuer, issue date, category, verification link, and skills in **Cloud Firestore**.
   - **CRUD Operations**: Add, edit, preview, and delete certificates dynamically without rebuilding frontend code.
   - **Fallback Architecture**: Gracefully handles missing environment variables with a built-in diagnostic guide.

---

## 🛠️ Architecture & Tech Stack

- **Frontend Framework**: React 19 + Vite 8
- **Styling**: Vanilla CSS with custom tokens (`theme.css`, `components.css`, `admin.css`)
- **Backend & Cloud**: Firebase 12 (Authentication, Cloud Firestore, Firebase Storage)
- **Icons**: Lucide React + Custom SVG Brand Icons

---

## 📂 Project Structure

```
├── .env.example              # Firebase environment configuration template
├── firestore.rules           # Production-ready Cloud Firestore security rules
├── storage.rules             # Production-ready Firebase Storage security rules
├── index.html                # Base HTML with SEO tags & Google Fonts
├── package.json              # Project dependencies and run scripts
├── public/
│   └── terminal-icon.svg     # Developer terminal favicon
└── src/
    ├── App.jsx               # Main application container
    ├── index.css             # Entry stylesheet importing design system
    ├── main.jsx              # React DOM root mounting
    ├── components/
    │   ├── Navbar.jsx            # Sticky navigation bar & mobile drawer
    │   ├── Hero.jsx              # Hero section with interactive terminal
    │   ├── IdentityStrip.jsx     # Four core identity pillars
    │   ├── About.jsx             # About me narrative and focus points
    │   ├── Skills.jsx            # Categorized skills with honest level badges
    │   ├── Projects.jsx          # Project showcase cards
    │   ├── ProjectModal.jsx      # Project breakdown modal
    │   ├── Experience.jsx        # Technical Vidya & NSS contributions
    │   ├── LearningJourney.jsx   # 4-stage chronological learning journey
    │   ├── Certificates.jsx      # Firebase Firestore certificate gallery
    │   ├── CertificateModal.jsx  # Certificate viewer with PDF/image support
    │   ├── Achievements.jsx      # Honors & recognized achievements
    │   ├── Education.jsx         # B.Tech in CSE (AI/ML) degree & coursework
    │   ├── CurrentlyBuilding.jsx # Active engineering focus
    │   ├── Contact.jsx           # Communication channels & message form
    │   ├── Footer.jsx            # Minimalist developer footer
    │   ├── AdminModal.jsx        # Admin login & Certificate CRUD portal
    │   └── Icons.jsx             # Custom GitHub & LinkedIn SVG icons
    ├── context/
    │   └── AuthContext.jsx       # Firebase Authentication state manager
    ├── data/
    │   └── initialData.js        # Verified portfolio facts (No mock data)
    ├── services/
    │   ├── firebase.js           # Firebase SDK initialization & status helper
    │   └── certificateService.js # Firestore real-time sync & Storage operations
    └── styles/
        ├── theme.css             # Design tokens, variables & dark foundation
        ├── components.css        # Responsive layouts, grids, cards & modals
        └── admin.css             # Admin dashboard & file upload styles
```

---

## ⚙️ How to Connect Firebase

1. **Create a Firebase Project**:
   - Visit [Firebase Console](https://console.firebase.google.com/) and create a new project.

2. **Enable Firebase Authentication**:
   - Go to **Authentication** &rarr; **Sign-in method**.
   - Enable the **Email/Password** provider.
   - Go to **Users** &rarr; **Add User** (Create your admin email and secure password).

3. **Enable Cloud Firestore**:
   - Go to **Firestore Database** &rarr; **Create database**.
   - Select production or test mode.
   - Go to the **Rules** tab and paste the contents of [`firestore.rules`](./firestore.rules).

4. **Enable Firebase Storage**:
   - Go to **Storage** &rarr; **Get started**.
   - Select a bucket location.
   - Go to the **Rules** tab and paste the contents of [`storage.rules`](./storage.rules).

5. **Configure Environment Variables**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - In Firebase Console, go to **Project Settings** &rarr; **General** &rarr; **Your apps** &rarr; Register a Web App.
   - Copy the configuration values into `.env`:
     ```env
     VITE_FIREBASE_API_KEY=AIzaSy...
     VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-app.firebasestorage.app
     VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
     VITE_FIREBASE_APP_ID=1:123456789:web:...
     ```

---

## 🔒 Security Rules

### Firestore Security Rules (`firestore.rules`)
- **Public Read**: Anyone can read certificates, projects, and educational info.
- **Admin Write**: Only authenticated admin users can add, edit, or delete certificates.
- **Contact Submissions**: Public users can create validated message entries in `contacts`.

### Storage Security Rules (`storage.rules`)
- **Public Read**: Anyone can view certificate images and PDFs.
- **Admin Write**: Only authenticated admins can upload files up to 15MB.

---

## 💻 Running Locally

### Development Server
```bash
npm run dev
```
The website will be available at `http://localhost:5173/`.

### Production Build
```bash
npm run build
```
Generates the optimized static build in the `dist/` directory.

### Preview Build
```bash
npm run preview
```
