import React from 'react'

export function Modal({ modal, closeModal }) {
    if (!modal) {
        return null
    }

    let component;
    switch (modal) {
        case 'team personal info':
            component = null
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
