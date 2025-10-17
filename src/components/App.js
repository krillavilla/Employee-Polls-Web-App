import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../features/users/usersSlice';
import { fetchQuestions } from '../features/questions/questionsSlice';
import NavBar from './NavBar';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import PollDetailPage from '../pages/PollDetailPage';
import NewPollPage from '../pages/NewPollPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/questions/:id" element={<PollDetailPage />} />
          <Route path="/add" element={<NewPollPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}
