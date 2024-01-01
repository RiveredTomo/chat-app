'use client'

import { useState, useEffect } from 'react';

const useUsername = (input: string) => {
    const [username, setUsername] = useState('');
    useEffect(() => {
        setUsername(input);
    });

    return username;
};

export default useUsername;