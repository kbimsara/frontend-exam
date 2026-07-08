# E-Commerce Frontend Application

A production-grade, premium E-Commerce frontend application built with React and Tailwind CSS. This project serves as a showcase of modern web design principles, focusing on pixel-perfect UI/UX, clean typography, subtle micro-interactions, and a sophisticated monochromatic aesthetic inspired by platforms like Stripe, Vercel, and Linear.

## ✨ Key Features

- **Premium UI/UX:** A deeply refined visual hierarchy using a `slate-900` foundation, generous whitespace, and strict typographic alignment (`tabular-nums`).
- **Responsive Layouts:** Flawless experience across mobile, tablet, and desktop viewports.
- **Modern Components:** Built with reusable UI components (`SectionCard`, `StatusBadge`, `ToggleSwitch`, `EmptyState`) that enforce design system consistency.
- **Interactive Feedback:** Integrated with `react-hot-toast` for elegant, non-intrusive notifications and custom confirmation dialogs.
- **State Management:** Utilizes React Context API (`AuthContext`, `CartContext`) for seamless global state management.

## 🛠️ Technology Stack

- **Framework:** React 18
- **Routing:** React Router v6
- **Styling:** Tailwind CSS (Utility-first framework)
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Navigate to the project directory:
   ```bash
   cd frontend-exam
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and visit `http://localhost:3000` to view the application.

## 📁 Project Structure

```text
src/
├── components/
│   ├── ui/               # Reusable, atomic UI components (Buttons, Badges, Layouts)
│   ├── Navbar.js         # Main navigation header
│   ├── FilterSidebar.js  # Sidebar for product filtering
│   ├── ProductCard.js    # Display component for individual products
│   └── ProtectedRoute.js # Route wrapper for authenticated views
├── context/
│   ├── AuthContext.js    # Global authentication state
│   └── CartContext.js    # Global shopping cart state
├── data/
│   └── products.js       # Mock data for the application
├── pages/
│   ├── Login.js          # Authentication portal
│   ├── Home.js           # Main product catalog and search
│   ├── Cart.js           # Shopping cart and checkout summary
│   ├── Dashboard.js      # Sales analytics and recent orders
│   ├── Profile.js        # User profile and order history
│   └── Settings.js       # User preferences and security settings
├── App.js                # Application entry point and router setup
└── index.css             # Global stylesheet and custom Tailwind utilities
```

## 🎨 Design System Philosophy

- **Simplicity over decoration:** Avoiding heavy drop shadows and chaotic gradients in favor of sharp, 1px solid borders and clean background fills.
- **Consistency over variety:** Centralizing core visual elements into shared utility classes (`btn-primary`, `input-base`) to guarantee uniformity.
- **Meaningful micro-animations:** Utilizing subtle `scale-[1.03]` transitions instead of overly bouncy effects.
