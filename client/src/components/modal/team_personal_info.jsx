import React from 'react'
import { LinkedInIcon } from '../SVGs/linkedIn_icon';
import { GithubIcon } from '../SVGs/github_icon';

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
                                <GithubIcon />
                            </a>
                            &nbsp;
                            <a
                                href="https://www.linkedin.com/in/abdulhakeem-almidan/"
                                target="_blank">
                                <LinkedInIcon />
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