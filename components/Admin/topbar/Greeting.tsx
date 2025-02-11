'use client';

import React, { useEffect, useState } from 'react';

export default function Greeting() {
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const storedName = localStorage.getItem('user_name') || 'Elio';
    setUserName(storedName);
  }, []);

  return (
    <h1 className="text-lg font-semibold">
      Hello {userName} <span className="wave">👋</span>,
    </h1>
  );
}
