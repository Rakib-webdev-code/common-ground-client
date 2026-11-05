# Common Ground

**Small actions. Stronger communities.**

Common Ground is a community event platform that helps people discover local events, participate in meaningful activities, and organize initiatives that bring communities together.

🌐 **Live Website:** https://common-ground-client.vercel.app

🖥️ **Backend API:** https://common-ground-server.vercel.app

## ✨ Features

### Community & Events
- **Discover Events:** Explore upcoming community events with search, filtering, and sorting options.
- **Create Events:** Authenticated users can organize and publish community events.
- **Event Details:** View event descriptions, locations, dates, categories, and organizer information.
- **Join Events:** Registered users can join upcoming events while preventing duplicate registrations.
- **Manage Events:** Organizers can edit and delete their own events.
- **Joined Events:** View and track events you have registered to attend.

### User Experience
- **User Authentication:** Register and sign in using email/password or Google authentication.
- **User Profile:** View and update profile information, including name and profile picture.
- **Community Impact Dashboard:** Explore community statistics, events, participants, and personal contributions.
- **Responsive Design:** Optimized for mobile, tablet, and desktop devices.
- **Dark & Light Themes:** Switch between dark and light modes.
- **Loading Skeletons:** Improved loading experiences across important pages.
- **Image Fallbacks:** Better handling of unavailable or failed images.
- **SEO Optimization:** Improved metadata and social sharing information.
- **Newsletter UI:** A subscription form design for community updates. Email submission and backend subscription functionality are not currently configured.
- **Community Updates:** Discover upcoming events through the homepage.

## 🛠️ Technologies Used

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Better Auth
- React Hot Toast
- Lucide React

### Backend & Database
- Node.js
- Express.js
- MongoDB
- Better Auth JWT
- JOSE

### Tools & Deployment
- Git & GitHub
- Vercel

## 🚀 Getting Started

Follow these steps to run the frontend locally.

### Prerequisites

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Rakib-webdev-code/common-ground-client.git
   ```

2. Navigate to the project directory:

   ```bash
   cd common-ground-client
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the project root and configure the required environment variables:

   ```env
   NEXT_PUBLIC_API_URL=https://common-ground-server.vercel.app
   BETTER_AUTH_URL=http://localhost:3000
   ```

   Configure the remaining Better Auth secret, database connection, and Google OAuth credentials according to your local development environment.

   Never commit secret values or credentials to GitHub.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open http://localhost:3000 in your browser.

**Note:** The backend API must also be configured and running for event and dashboard data operations.

## 📁 Project Structure

```text
common-ground-client/
├── public/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── events/
│   │   ├── profile/
│   │   ├── login/
│   │   ├── register/
│   │   └── ...
│   ├── components/
│   │   ├── home/
│   │   ├── layout/
│   │   └── ...
│   └── lib/
├── package.json
└── README.md
```

## 🔐 Authentication & Security

- Better Auth handles user authentication.
- Protected operations require a valid authentication token.
- The backend verifies JWTs using Better Auth's JWKS endpoint.
- Event management operations enforce event ownership.
- Duplicate event registrations are prevented by the backend.
- Sensitive credentials are stored in environment variables.

## 🌍 Deployment

The frontend is deployed on Vercel.

- **Frontend:** https://common-ground-client.vercel.app
- **Backend:** https://common-ground-server.vercel.app

## 👨‍💻 Developer

**Md. Rakib**

- GitHub: [Rakib-webdev-code](https://github.com/Rakib-webdev-code)
- Portfolio: [About Me](https://rakib-webdev-code.github.io/About-Me/)

---

Built with ❤️ to encourage community participation and meaningful connections.
