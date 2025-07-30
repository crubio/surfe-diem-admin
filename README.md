# Surfe Diem Admin

A modern admin interface for managing Surfe Diem data, built with React, TypeScript, and Bootstrap 5.

## Features

- 🏄‍♂️ **Location Management** - View and manage buoy locations
- 📊 **Wave Summaries** - Access wave data summaries
- 👥 **User Management** - Manage user accounts
- 🔐 **Secure Authentication** - JWT-based authentication
- 📱 **Responsive Design** - Works on desktop and mobile
- ⚡ **Modern Tech Stack** - React 18, TypeScript, Vite, React Query

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **UI Framework**: Bootstrap 5 with React Bootstrap
- **State Management**: React Query v5
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Bootstrap Icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/crubio/surfe-diem-admin.git
cd surfe-diem-admin
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

Edit `.env.local` and configure your API endpoint:
```env
VITE_API_V1_URL=https://api.surfe-diem.com/api/v1
VITE_APP_NAME=Surfe Diem Admin
VITE_APP_VERSION=1.0.0
```

4. Start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── config/          # Configuration files
├── features/        # Feature-based modules
│   ├── auth/        # Authentication
│   ├── locations/   # Location management
│   ├── summaries/   # Wave summaries
│   └── ui/          # Shared UI components
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries
├── pages/           # Page components
├── providers/       # Context providers
├── routes/          # Routing configuration
└── utils/           # Utility functions
```

## API Integration

This admin interface integrates with the Surfe Diem API (`api.surfe-diem.com`). The API endpoints are configured through environment variables and the application uses JWT tokens for authentication.

### Key API Endpoints

All endpoints are under the v1 API (`/api/v1`):

- `POST /login` - User authentication
- `GET /users/me` - Get current user
- `GET /locations` - List locations
- `POST /locations` - Create location
- `PUT /locations/:id` - Update location
- `GET /locations/summary` - Get wave summaries

## Development

### Code Style

The project uses ESLint for code linting and TypeScript for type checking. Run `yarn lint` to check for code style issues.

### Error Handling

The application includes comprehensive error handling with:
- React Error Boundaries for catching JavaScript errors
- Axios interceptors for API error handling
- User-friendly error messages and loading states

### State Management

React Query is used for server state management, providing:
- Automatic caching and background updates
- Optimistic updates
- Error handling and retry logic
- Loading states

## Deployment

Build the application for production:

```bash
yarn build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is private and proprietary to Surfe Diem.