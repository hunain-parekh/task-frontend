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

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **TanStack Query** - Data fetching and caching
- **NextAuth.js** - Authentication
- **React Hook Form** - Form management
- **Yup** - Form validation
- **Lucide React** - Icons


## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Laravel backend running on `http://localhost:8000`

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hunain-parekh/task-frontend.git
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
2. Fill in your salary details:
   - Full Name
   - Email (must be unique)
   - Salary in local currency
   - Currency code
3. Submit the form

### For Administrators
1. Visit `http://localhost:3000`
1. Click on Login Button
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
- `GET /api/admin/salary/list` - Get all salary records (admin)
- `PUT /api/admin/salary/{id}` - Update salary record (admin)
- `DELETE /api/admin/salary/{id}` - Delete salary record (admin)

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
NEXT_PUBLIC_API_URL=http://localhost:8000
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

## Author

**Developer**: Hunain Parekh
**Email**: hunainparekh85@gmail.com
**GitHub**: hunain-parekh
