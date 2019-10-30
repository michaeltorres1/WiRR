import React from 'react'
import { TeamPersonalInfo } from './team_personal_info';

export function Modal({ modal, closeModal }) {
    if (!modal) {
        return null
    }

    let component;
    switch (modal) {
        case 'team personal info':
            component = <TeamPersonalInfo />
            break;
        default:
            return null;
    }

    return (
        <div>
            <div className="modal-background" onClick={closeModal}>
                <div className="modal-child" onClick={e => e.stopPropagation()}>
                    {component}
                </div>
            </div>
        </div>
    )
}
