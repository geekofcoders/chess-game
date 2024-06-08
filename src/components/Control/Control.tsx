import React, { ReactNode } from 'react';
import './Control.css';

interface ControlProps {
    children: ReactNode;
}

const Control: React.FC<ControlProps> = ({ children }) => {
    return <div className='control'>
        {children}
    </div>
}

export default Control;