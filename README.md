# Connect - A Modern Social Platform

Connect is a modern social media platform built with React, TypeScript, and Tailwind CSS. It provides users with a familiar social networking experience while maintaining a clean and intuitive interface.

## Features

- **Authentication**
  - User registration and login with email/password
  - Profile management with customizable avatar
  - Secure authentication flow
  - Password recovery (coming soon)

- **Social Interaction**
  - Create, read, and delete posts
  - Like and comment on posts
  - Real-time notifications
  - Friend connections
  - Search for users and content

- **Messaging**
  - Direct messaging system
  - Real-time chat interface
  - Message notifications
  - Online status indicators
  - Read receipts

- **Events**
  - Browse local events
  - Event details and ticketing
  - Location-based event discovery
  - Save favorite events
  - Share events with friends

- **Profile Management**
  - Edit profile information
  - Update profile picture with preview
  - Manage privacy settings
  - Account deletion with confirmation
  - Custom bio and location

## Mobile Support

The application is fully responsive and optimized for mobile devices:
- Touch-friendly interface
- Mobile-optimized navigation
- Safe area insets for modern devices
- Smooth scrolling and animations
- Optimized image loading

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- React Router v6
- React Hook Form
- Zod (Form validation)
- Lucide React (Icons)
- Date-fns (Date formatting)

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/connect.git
   cd connect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_SEATGEEK_CLIENT_ID=your_seatgeek_client_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

## Project Structure

```
connect/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/       # React context providers
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── services/      # API and service functions
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── public/           # Static assets
└── dist/            # Production build output
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests and linting: `npm run lint`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature`
7. Submit a pull request

### Code Style Guidelines

- Follow the existing code style
- Use TypeScript for all new files
- Write meaningful commit messages
- Add appropriate documentation
- Include tests for new features

## Live Demo

A live demo is available at: [https://dapper-tarsier-0a4253.netlify.app](https://dapper-tarsier-0a4253.netlify.app)

## Login Credentials

For testing purposes, use these credentials:
- Email: demo@example.com
- Password: password

## Mobile Testing

The application has been tested and optimized for:
- iOS (Safari)
- Android (Chrome)
- Modern mobile browsers
- Various screen sizes and orientations

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Lucide Icons](https://lucide.dev/) for the icon set
- [Unsplash](https://unsplash.com/) for the stock images