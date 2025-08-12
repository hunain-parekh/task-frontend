# Salary Management System

A modern salary management system built with Next.js 14, Laravel backend, and shadcn/ui components.

## Features

- **User Authentication**: Secure login system with NextAuth.js
- **Salary Submission**: Users can submit their salary details with validation
- **Admin Panel**: Comprehensive dashboard for managing employee salaries
- **Real-time Updates**: TanStack Query for efficient data fetching and caching
- **Responsive Design**: Modern UI with Tailwind CSS and shadcn/ui
- **Form Validation**: Yup validation schemas for data integrity
- **Unique Email Handling**: Updates existing records instead of creating duplicates

## Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **TanStack Query** - Data fetching and caching
- **NextAuth.js** - Authentication
- **React Hook Form** - Form management
- **Yup** - Form validation
- **Lucide React** - Icons

### Backend
- **Laravel** - PHP framework
- **MySQL** - Database
- **REST API** - Communication

## Project Structure

```
task-frontend/
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # NextAuth configuration
│   ├── auth/login/page.tsx              # Login page
│   ├── dashboard/page.tsx               # Main dashboard (protected)
│   ├── public/page.tsx                  # Public salary submission
│   ├── layout.tsx                       # Root layout
│   └── page.tsx                         # Home page (redirects)
├── components/
│   ├── ui/                              # shadcn/ui components
│   ├── admin-panel.tsx                  # Admin dashboard
│   ├── edit-salary-dialog.tsx           # Edit salary modal
│   └── salary-form.tsx                  # Salary submission form
├── lib/
│   ├── api.ts                           # API service functions
│   ├── hooks.ts                         # TanStack Query hooks
│   ├── types.ts                         # TypeScript types
│   ├── validation.ts                    # Yup validation schemas
│   └── utils.ts                         # Utility functions
├── middleware.ts                        # Route protection
└── components.json                      # shadcn/ui configuration
```

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Laravel backend running on `http://localhost:8000`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage

### For Users
1. Visit `http://localhost:3000`
2. Click "Continue as Guest (Submit Salary)" or go to `/public`
3. Fill in your salary details:
   - Full Name
   - Email (must be unique)
   - Salary in local currency
   - Currency code
4. Submit the form

### For Administrators
1. Visit `http://localhost:3000`
2. Sign in with demo credentials:
   - **Email**: admin@example.com
   - **Password**: admin123
3. Access the admin panel to:
   - View all salary records
   - Edit salary details (local currency, EUR, commission)
   - Delete records
   - View statistics

## API Endpoints

The frontend expects these Laravel API endpoints:

- `POST /api/salary/submit` - Submit salary data
- `GET /api/salary/all` - Get all salary records (admin)
- `PUT /api/salary/{id}` - Update salary record (admin)
- `DELETE /api/salary/{id}` - Delete salary record (admin)

## Authentication Flow

1. **Unauthenticated users** are redirected to `/auth/login`
2. **Authenticated users** are redirected to `/dashboard`
3. **Dashboard routes** are protected by middleware
4. **Session management** is handled by NextAuth.js

## Key Features

### Salary Submission
- Form validation with Yup
- Unique email constraint
- Currency selection dropdown
- Real-time feedback with toast notifications

### Admin Panel
- Comprehensive salary table
- Statistics dashboard
- Edit salary dialog with preview
- Delete confirmation
- Real-time data updates

### Security
- Protected routes with middleware
- Session-based authentication
- Form validation
- API error handling

## Development

### Adding New Components
```bash
npx shadcn@latest add <component-name>
```

### API Integration
Update `lib/api.ts` to add new API endpoints and `lib/hooks.ts` for TanStack Query hooks.

### Styling
- Use Tailwind CSS classes
- Leverage shadcn/ui components
- Follow the existing design system

## Environment Variables

Create a `.env.local` file:
```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Implement proper error handling
4. Add appropriate loading states
5. Test thoroughly before submitting

## License

This project is licensed under the MIT License.
