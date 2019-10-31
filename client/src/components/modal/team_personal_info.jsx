import React from 'react'

export function TeamPersonalInfo() {
    return (
        <div className="team-personal-info-modal-container">
            <ul style={{ width: '30vw'}}>
                <li
                    className="team-personal-info-row"
                    key={'team-personal-info-row-1'}>
                    <div>
                        Michael Torres
                    </div>
                    <div>
                        <div className="personal-account-links">
                            <a
                                href="https://github.com/Hakeemmidan"
                                target="_blank">
                                <img
                                    className="personal-account-img-link github"
                                    src="https://image.flaticon.com/icons/svg/733/733609.svg"
                                    alt="Github logo" />
                            </a>
                            &nbsp;
                            <a
                                href="https://www.linkedin.com/in/abdulhakeem-almidan/"
                                target="_blank">
                                <img
                                    className="personal-account-img-link linkedin"
                                    src="https://image.flaticon.com/icons/svg/25/25320.svg"
                                    alt="LinkedIn logo" />
                            </a>
                        </div>
                    </div>
                </li>
                <li>

                </li>
            </ul>
        </div>
    )
}