import React from 'react';
const fileContext = React.createContext({
    name: '',
    myPet: {},
    setName: () => {},
});

export default fileContext