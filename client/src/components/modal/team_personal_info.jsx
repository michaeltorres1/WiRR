import React from 'react'
import { LinkedInIcon } from '../SVGs/linkedIn_icon';
import { GithubIcon } from '../SVGs/github_icon';

export function TeamPersonalInfo() {
    return (
        <div className="team-personal-info-modal-container">
            <div className="modal-created-by-div">
                Created by:
            </div>
            <ul style={{ width: '30vw'}}>
                <li
                    className="team-personal-info-row"
                    key={'team-personal-info-row-1'}>
                    <div className="personal-account-name">
                        Michael Torres
                    </div>
                    <div>
                        <div className="personal-account-links">
                            <a
                                href="https://github.com/michaeltorres1"
                                target="_blank">
                                <GithubIcon />
                            </a>
                            &nbsp;
                            <a
                                href="https://www.linkedin.com/in/michael-torres-8649aa178/"
                                target="_blank">
                                <LinkedInIcon />
                            </a>
                        </div>
                    </div>
                </li>
                <li
                    className="team-personal-info-row"
                    key={'team-personal-info-row-2'}>
                    <div className="personal-account-name">
                        Lwin Ye
                    </div>
                    <div>
                        <div className="personal-account-links">
                            <a
                                href="https://github.com/tokyoanime"
                                target="_blank">
                                <GithubIcon />
                            </a>
                            &nbsp;
                            <a
                                href="https://www.linkedin.com/in/lwin-ye-797a2558/"
                                target="_blank">
                                <LinkedInIcon />
                            </a>
                        </div>
                    </div>
                </li>
                <li
                    className="team-personal-info-row"
                    key={'team-personal-info-row-3'}>
                    <div className="personal-account-name">
                        Kevin Kaminski
                    </div>
                    <div>
                        <div className="personal-account-links">
                            <a
                                href="https://github.com/KaminKevCrew"
                                target="_blank">
                                <GithubIcon />
                            </a>
                            &nbsp;
                            <a
                                href="https://www.linkedin.com/in/kevin-kaminski-850991b7/"
                                target="_blank">
                                <LinkedInIcon />
                            </a>
                        </div>
                    </div>
                </li>
                <li
                    className="team-personal-info-row"
                    key={'team-personal-info-row-4'}>
                    <div className="personal-account-name">
                        Hakeem Almidan
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
            </ul>
        </div>
    )
}