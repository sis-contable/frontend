import React, { useState } from 'react';
import ListRegister from './ListRegister';
import CreateRegister from '../../../componentes/Books/DiaryBook/CreateRegister';

const DiaryBook = () => {
  const [updateCount, setUpdateCount] = useState(0); // Estado para manejar actualizaciones

  const handleAddRegister = () => {
    setUpdateCount(prev => prev + 1); // Incrementa el contador para forzar la actualización
  };

  return (
    <div>
      <ListRegister updateCount={updateCount} />
      <CreateRegister onAddRegister={handleAddRegister} />
    </div>
  );
};

export default DiaryBook;