<div align="center">
  <h1 align="center">Batch '26 — A Journey We'll Always Carry</h1>
  <p align="center">A cinematic digital time capsule for the graduating class of 2026.</p>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite" />
</div>

<br />

## 📖 About The Project

**Batch '26** is more than just a website; it's an interactive archive of memories. Built to capture the essence of four years of university life, it features a cinematic scroll-based timeline, a digital yearbook that students can "sign," and a shared media vault for photos and videos.

The application currently runs on a **Mock Service Architecture**, simulating a full-stack environment with authentication, data persistence (per session), and file uploads, making it completely standardized and ready for a seamless backend integration (Firebase/Supabase).

## ✨ Features

- **🎓 Interactive Yearbook**: Browse student profiles and leave "signatures" (messages) on their cards.
- **⏳ Cinematic Timeline**: A scroll-based journey through the major milestones of the batch.
- **🧱 The Message Wall**: A digital graffiti wall for anonymous or signed confessions, memories, and goodbyes.
- **📸 Media Vault**: A grid of shared memories. Upload photos and videos to the batch archive.
- **👤 User Accounts**:
  - **Sign Up/Login**: Full authentication flow (Mock).
  - **Dashboard Modal**: Edit your profile, major, quote, and social links via a sleek popup interface.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS
- **State Management**: React Context API
- **Architecture**: Service Repository Pattern (Mock/Real implementations)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DevShrivastava1803/Classof2022-26.git
   cd Classof2022-26
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view the app.

## 🏗️ Architecture

This project uses a **Service Pattern** to decouple the UI from the data source.

- `services/types.ts`: Defines the core data contracts (User, Student, Message, etc.).
- `services/DataRegistry.ts`: Exports the active service implementation. Currently set to `mockDataService`.
- `services/mock/`: Contains the in-memory implementation of the data layer, simulating network delays and storage.

To connect a real backend, simply implement the `AuthService` and `DataService` interfaces and update `DataRegistry.ts`.

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

<!-- LICENSE -->
## 📝 License

Distributed under the MIT License.
