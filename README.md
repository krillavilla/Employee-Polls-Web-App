# Employee Polls (React + Redux)

A complete "Would You Rather" polling application built for the Udacity React Nanodegree. This app uses React Router for navigation, Redux Toolkit for state management, a mock backend API, and comprehensive unit testing with Jest and Testing Library.

## 🌟 Features (Meeting All Rubric Requirements)

- **Authentication**: User impersonation login system with persistent sessions
- **Protected Routes**: All app pages require authentication; redirects back to intended page after login
- **Home Dashboard**: Tabbed view with Unanswered (default) and Answered polls, sorted by newest first
- **Poll Interaction**: Vote on polls and view detailed results with vote counts, percentages, and user choice highlighting
- **Poll Creation**: Create new "Would You Rather" polls at `/add`
- **Leaderboard**: User rankings at `/leaderboard` based on questions answered + questions created
- **Navigation**: Persistent navigation bar with user info and logout functionality
- **Error Handling**: 404 pages for non-existent routes and polls (after authentication)
- **State Management**: Redux as single source of truth for all app state
- **Comprehensive Testing**: 10+ unit tests including async API tests, snapshot tests, and DOM interaction tests

## 🚀 Quick Start

**Requirements**: Node 18+ and npm

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test
```

- **`npm start`**: Launches Vite dev server at http://localhost:5173
- **`npm test`**: Runs Jest test suite with coverage
- **`npm run build`**: Creates production build
- **`npm run preview`**: Preview production build

## 📁 Project Structure

```
src/
├── api/
│   └── _DATA.js          # Mock backend API (users, questions, save operations)
├── app/
│   └── store.js          # Redux store configuration
├── components/
│   ├── App.js            # Main app with routing
│   ├── NavBar.js         # Navigation with user info and logout
│   ├── PrivateRoute.js   # Authentication guard for protected routes
│   ├── PollCard.js       # Individual poll display card
│   ├── Tabs.js           # Answered/Unanswered tab switcher
│   └── UserAvatar.js     # User avatar component
├── features/
│   ├── auth/
│   │   └── authSlice.js  # Authentication state management
│   ├── users/
│   │   └── usersSlice.js # User data and async operations
│   └── questions/
│       └── questionsSlice.js # Poll data and async operations
├── pages/
│   ├── HomePage.js       # Dashboard with poll tabs
│   ├── LeaderboardPage.js # User rankings
│   ├── LoginPage.js      # User impersonation login
│   ├── NewPollPage.js    # Poll creation form
│   ├── NotFoundPage.js   # 404 error page
│   └── PollDetailPage.js # Poll voting and results
├── utils/
│   ├── selectors.js      # Redux state selectors
│   └── storage.js        # LocalStorage utilities
└── __tests__/           # Comprehensive unit test suite
```

## 🏗️ Architecture

### State Management
Redux Toolkit manages all application state with three main slices:

```javascript
{
  auth: { userId: string | null },
  users: { byId: { [id]: User }, status: 'idle' | 'loading' | 'succeeded' | 'failed', error: string | null },
  questions: { byId: { [id]: Question }, status: 'idle' | 'loading' | 'succeeded' | 'failed', error: string | null }
}
```

### Routing Structure
- **`/login`**: User impersonation page (public)
- **`/`**: Home dashboard with poll tabs (protected)
- **`/questions/:id`**: Poll details and voting (protected, shows 404 for invalid IDs)
- **`/add`**: New poll creation (protected)
- **`/leaderboard`**: User rankings (protected)
- **`/*`**: 404 page for unknown routes (protected)

### Data Flow
1. **Initialization**: App loads users and questions from mock API on startup
2. **Authentication**: User selects from existing users; session persisted in localStorage
3. **Navigation**: All routes except `/login` require authentication
4. **Poll Interaction**: Voting updates both questions and users data via Redux thunks
5. **Poll Creation**: New polls update questions data and author's question list

## 🧪 Testing Strategy

The project includes 10+ comprehensive unit tests covering:

- **API Testing**: Async tests for `_saveQuestion` and `_saveQuestionAnswer` (success + error cases)
- **Component Testing**: Snapshot test for PollCard component
- **Authentication Flow**: Login via dropdown with fireEvent interaction
- **Navigation**: Tab switching with fireEvent and UI state verification
- **Route Protection**: Authentication guards and redirects
- **State Management**: Redux reducer updates for poll answers
- **Error Handling**: 404 behavior for non-existent polls
- **Form Validation**: Input validation and button state changes
- **Data Sorting**: Leaderboard ranking by total score

### Running Tests

```bash
npm test              # Run all tests
npm test -- --coverage # Run with coverage report
```

## 👥 Mock Users

The app includes four test users for impersonation:

- **Sarah Edo** (`sarahedo`) - Has answered and created several polls
- **Tyler McGinnis** (`tylermcginnis`) - Active user with poll history
- **Mike Tsamis** (`mtsamis`) - Poll creator and participant
- **Zenobia Oshikanlu** (`zoshikanlu`) - Minimal activity user

## 📝 Development Notes

- **File Extensions**: Uses `.js` for all source files (no `.jsx`) per rubric requirements
- **Component State**: Only used for form inputs; global state lives in Redux
- **Error Boundaries**: Graceful handling of API errors and loading states
- **Responsive Design**: Mobile-friendly layout with CSS media queries
- **Accessibility**: Proper labels, ARIA attributes, and keyboard navigation
- **Performance**: Optimized selectors and memoized calculations

## 🔍 Key Features Deep Dive

### Authentication
- Simple dropdown-based user impersonation
- Persistent sessions via localStorage
- Automatic redirect to originally requested page after login
- Logout clears session and navigates to login

### Poll Management
- **Categorization**: Automatically sorts polls into Answered/Unanswered based on current user
- **Sorting**: All polls ordered by timestamp (newest first)
- **Voting**: Updates both question votes and user answers atomically
- **Creation**: Form validation ensures both options are provided

### Leaderboard
- Calculates total score (questions answered + questions created)
- Sorts users in descending order by total score
- Displays individual counts and total score for each user

## 🚀 Deployment

The app is built with Vite and can be deployed to any static hosting service:

```bash
npm run build        # Creates dist/ folder
npm run preview      # Preview production build locally
```

## 📄 License

MIT License - feel free to use this project as a reference for your own Udacity submissions!

---

**Note**: This project meets all Udacity React Nanodegree rubric requirements including proper Redux architecture, comprehensive testing, and user experience features. The codebase demonstrates best practices for React + Redux applications with modern tooling.

