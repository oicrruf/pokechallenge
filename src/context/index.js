import React, {useState, useEffect, useMemo} from 'react';

const UserContext = React.createContext();

const user = {
  user: {name: 'Víctor Reyes', email: 'vm.reyesal@gmail.com'},
};

export const UserProvider = (props) => {
  const value = useMemo(() => {
    return user;
  }, []);

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('Error');
  }
  return context;
};
