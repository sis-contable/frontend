import React, { useState } from 'react';
import SelectGroup from './SelectGroup';
import SelectType from './SelectType';
import SelectRubro from './SelectRubro';
import SelectSubRubro from './SelectSubrubro';
import SelectPaymentMethods from './SelectPaymentMethods';
import SelectAccounts from './SelectAccounts';

const CreateRegisterrr = () => {
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedRubro, setSelectedRubro] = useState('');

    return (
        <div>
            <SelectGroup onGroupChange={setSelectedGroup} />
            <SelectType onTypeChange={setSelectedType} />
            <SelectRubro idGrupo={selectedGroup} idTipo={selectedType} onRubroChange={setSelectedRubro} />
            <SelectSubRubro idRubro={selectedRubro}/>
            <SelectPaymentMethods/>
            <SelectAccounts/>
        </div>
    );
};

export default CreateRegisterrr;