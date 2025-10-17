const KEY = 'authedUser';

export const loadAuthedUser = () => {
  try { 
    return localStorage.getItem(KEY) || null; 
  } catch { 
    return null; 
  }
};

export const saveAuthedUser = (id) => {
  try { 
    localStorage.setItem(KEY, id); 
  } catch {}
};

export const clearAuthedUser = () => {
  try { 
    localStorage.removeItem(KEY); 
  } catch {}
};