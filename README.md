# 🧭 QuickDesk - Complete Help Desk Solution

QuickDesk is a modern, fully responsive web-based Help Desk solution built with React. It includes robust role-based access, seamless ticket management, and a clean, professional UI designed for support agents, admins, and end users.

---

## 🚀 Features

### 🔐 Authentication & Roles
- Secure user registration and login
- Role-based dashboards:
  - **End Users**: Submit and view tickets
  - **Support Agents**: Manage, resolve, and respond to tickets
  - **Admins**: Full control over users, categories, and system settings

### 📝 Ticket Management
- Create tickets with file attachments and category selection
- Ticket lifecycle: `Open → In Progress → Resolved → Closed`
- Threaded conversations and comment updates
- Upvote / Downvote support for prioritization
- Advanced search, filter, and sort

### 🧑‍💼 Admin Tools
- Manage users and roles
- Create and maintain ticket categories
- Analytics-ready dashboard integration (future support)

---

## 🎨 Design System

- **Primary Color**: `#3B82F6` (Blue)
- **Secondary**: `#6366F1` (Indigo)
- **Success**: `#10B981`
- **Warning**: `#F59E0B`
- **Error**: `#EF4444`

### UI Highlights
- Fully responsive for mobile, tablet, and desktop
- Smooth transitions and hover states
- Status badges, contextual actions, and modals
- Form validation and feedback indicators

---

## 📁 Project Structure

src/
├── App.tsx
├── types/
│ └── types.ts
├── context/
│ └── AuthContext.tsx
├── data/
│ └── mockData.ts
├── components/
│ ├── Layout/
│ │ ├── Header.tsx
│ │ ├── Sidebar.tsx
│ │ └── Layout.tsx
│ ├── Auth/
│ │ ├── Login.tsx
│ │ └── Register.tsx
│ ├── Tickets/
│ │ ├── TicketCard.tsx
│ │ ├── TicketFilters.tsx
│ │ ├── CreateTicket.tsx
│ │ └── TicketDetail.tsx
│ ├── Dashboard/
│ │ └── Dashboard.tsx
│ ├── Admin/
│ │ ├── UserManagement.tsx
│ │ └── CategoryManagement.tsx
│ ├── Profile/
│ │ └── Profile.tsx
│ └── ProtectedRoute.tsx

yaml
Copy
Edit

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Install Dependencies
```bash
1. npm install
Run Locally
2. npm run dev
