# Resumify - Professional ATS Resume Builder Web Application
> **రెస్యూమ్ బిల్డర్ వెబ్ అప్లికేషన్ (Modern ATS-Friendly Company Resume Builder)**

A feature-rich, company-grade Resume Builder web application built with **React 19, Vite, and Tailwind CSS**.

---

## ✨ Features / ముఖ్య ఫీచర్లు

1. **Company-Standard Templates (వివిధ డిజైన్లు)**:
   - 🏢 **Corporate Executive**: FAANG & Fortune 500 ATS-Compliant standard single-column layout.
   - 💻 **Modern Tech / Developer**: Engineering-focused design with tech badges, repo links & live demos.
   - 🎨 **Creative 2-Column**: Stylish sidebar with profile photo, skills tags, and contact links.
   - 🖋️ **Minimalist Elite**: Sophisticated typography with generous whitespace.
   - 📄 **Compact 1-Pager**: High-density format designed to fit extensive experience onto 1 page.

2. **Dedicated Social & Profile Links (Live & Clickable in PDF)**:
   - 🔗 **LinkedIn**: Clickable profile link (opens LinkedIn profile directly in new tab).
   - 🐙 **GitHub**: Clickable repositories link (opens GitHub profile directly in new tab).
   - 📷 **Instagram**: Clickable social link (opens Instagram profile in new tab).
   - 🌐 **Portfolio / Website**: Clickable portfolio link.

3. **Profile Picture Upload (ఫోటో అప్‌లోడ్)**:
   - Upload any photo with instant preview.
   - Toggle visibility on/off anytime.
   - Sample avatar presets available.

4. **All Modern Resume Sections**:
   - **Personal Information**: Full Name, Job Title, Email, Phone, Location, Website, Social Links.
   - **Professional Summary**: Bio with 1-click AI / Industry sample role suggestions.
   - **Work Experience**: Company, Role, Location, Date range, Currently Working checkbox, Bullet points with sample action verbs.
   - **Education**: Degree, Field of study, School, Graduation year, CGPA/Grade.
   - **Skills**: Categorized skill groups with tag chips and 1-click popular skill adders.
   - **Featured Projects**: Tech stack, live demo URL, GitHub repo URL, and highlights.
   - **Certifications & Licences**: Credential verification links.
   - **Languages**: Multi-language proficiency ratings.
   - **Custom Sections**: Achievements, Honors, Awards, Volunteer work.

5. **Theme Customization**:
   - 8 Curated Color Palettes (Navy, Indigo, Emerald, Slate, Ruby, Purple, Teal, Jet Black) + Custom Hex Color Picker.
   - Font Switcher: Inter (Modern Sans), Poppins (Bold Tech), Merriweather (Executive Serif), JetBrains Mono (Tech).
   - Font Size scaling.

6. **Download PDF & Backup**:
   - 📄 **Download PDF**: Standard A4 print engine preserving 100% active vector links and colors!
   - 💾 **JSON Backup**: Export and Import resume data anytime.
   - 🔄 **Auto-save**: Automatic saving to browser `localStorage`.

---

## 🚀 How to Run the Project (ఎలా రన్ చేయాలి)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📄 PDF Download Tip
When clicking **Download PDF**:
1. In the browser print dialog, set **Destination** to `Save as PDF`.
2. Under **More settings**, ensure **Background graphics** is checked.
3. Click **Save**. All LinkedIn, GitHub, Instagram, and project links will remain completely clickable in your downloaded PDF!
