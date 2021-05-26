import { htmlToVdom } from 'hyperstatic/src/htmlToVdom'
import markdown from './project.md'
import { Link } from 'hyperstatic'
// export default () => htmlToVdom(markdown)

export default () => (
    <div class="project_section">
        {/* {htmlToVdom(markdown)} */}
        <div>
            <header class="hero">
                <div class="hero-wrap">
                    <p class="intro" id="intro">MobileGods.GG</p>
                    <h1 id="headline">Tournament</h1>
                    <p class="year"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg> 2021 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg></p>
                    <p>MobileGods Pro</p>
                </div>
            </header>

            <section id="bracket">
                <div class="container">
                    <div class="split split-one">
                        <div class="round round-one current">
                            <div class="round-details">Round 1<br /><span class="date">May 21</span></div>
                            <ul class="matchup">
                                <li class="team team-top">Shenanigans<span class="score">22</span></li>
                                <li class="team team-bottom">HYDRA PREDATOR<span class="score">6</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Force Esports<span class="score">0</span></li>
                                <li class="team team-bottom">STALWARTS<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Anubis Eternal<span class="score">0</span></li>
                                <li class="team team-bottom">PAG TALO TULOG<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">BEMBEM BM SQUAD<span class="score">0</span></li>
                                <li class="team team-bottom">BETTERPLAY PH<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">ZULTRA<span class="score">0</span></li>
                                <li class="team team-bottom">Devil Outlaws<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">NAPADAAN LANG<span class="score">0</span></li>
                                <li class="team team-bottom">Reverie PH<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">CNCR IMPERIUM<span class="score">0</span></li>
                                <li class="team team-bottom">Frixon Zero<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Owshii Squad<span class="score">0</span></li>
                                <li class="team team-bottom">Neon Aces<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Basta_Squad_To<span class="score">0</span></li>
                                <li class="team team-bottom">AFK Prodigies<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">LIGION CYBERS<span class="score">0</span></li>
                                <li class="team team-bottom">PROPHECY MAIN<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Guardians™<span class="score">0</span></li>
                                <li class="team team-bottom">DUMZVILLE<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Squad Fafap<span class="score">0</span></li>
                                <li class="team team-bottom">SadBoi Esports<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">iCON ESPORTS<span class="score">0</span></li>
                                <li class="team team-bottom">EXILE<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Prodigy Esports<span class="score">0</span></li>
                                <li class="team team-bottom">Invictus Esports<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Trouble Makers™<span class="score">0</span></li>
                                <li class="team team-bottom">FE Frenzy Epro<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Xpected Gaming<span class="score">0</span></li>
                                <li class="team team-bottom">OMEGA 2.0<span class="score">0</span></li>
                            </ul>
                        </div>

                        <div class="round round-two">
                            <div class="round-details">Round 2<br /><span class="date">May 18</span></div>
                            <ul class="matchup">
                                <li class="team team-top">Shenanigans<span class="score">0</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                        </div>

                        <div class="round round-three">
                            <div class="round-details">Round 3<br /><span class="date">May 22</span></div>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>

                        </div>
                    </div>

                    <div class="champion">
                        <div class="semis-l">
                            <div class="round-details">west semifinals <br /><span class="date">March 26-28</span></div>
                            <ul class="matchup championship">
                                <li class="team team-top">&nbsp;<span class="vote-count">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="vote-count">&nbsp;</span></li>
                            </ul>
                        </div>
                        <div class="final">
                            <i class="fa fa-trophy"></i>
                            <div class="round-details">championship <br /><span class="date">May 22 - May 23</span></div>
                            <ul class="matchup championship">
                                <li class="team team-top">&nbsp;<span class="vote-count">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="vote-count">&nbsp;</span></li>
                            </ul>
                        </div>
                        <div class="semis-r">
                            <div class="round-details">east semifinals <br /><span class="date">March 26-28</span></div>
                            <ul class="matchup championship">
                                <li class="team team-top">&nbsp;<span class="vote-count">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="vote-count">&nbsp;</span></li>
                            </ul>
                        </div>
                    </div>

                    <div class="split split-two">


                        <div class="round round-three">
                            <div class="round-details">Round 3<br /><span class="date">March 22</span></div>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                        </div>

                        <div class="round round-two">
                            <div class="round-details">Round 2<br /><span class="date">March 18</span></div>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                        </div>
                        <div class="round round-one current">
                            <div class="round-details">Round 1<br /><span class="date">March 16</span></div>
                            <ul class="matchup">
                                <li class="team team-top">Area 69<span class="score">0</span></li>
                                <li class="team team-bottom">Pig Benis<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Kamras sa iring<span class="score">0</span></li>
                                <li class="team team-bottom">ASTRAEUS FORCE<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">AYNARETRI<span class="score">0</span></li>
                                <li class="team team-bottom">Myoshu Athena<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">BREN Cells<span class="score">0</span></li>
                                <li class="team team-bottom">Æther Predators<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">GreeVilsGreed<span class="score">0</span></li>
                                <li class="team team-bottom">Cassiopeia Angels<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Myoshu Esports<span class="score">0</span></li>
                                <li class="team team-bottom">MIRACULOUS HYDRA<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">FANTASMA<span class="score">0</span></li>
                                <li class="team team-bottom">ANUBIS EMPIRE PH (AEPH)<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Nubplay Esports<span class="score">0</span></li>
                                <li class="team team-bottom">Iconic Esports<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">TURTLE ESPORTS<span class="score">0</span></li>
                                <li class="team team-bottom">WPP Warriors<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Zealous Fatalis<span class="score">0</span></li>
                                <li class="team team-bottom">Deadnauts Esports<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Van Wilder<span class="score">0</span></li>
                                <li class="team team-bottom">Kamote Gaming<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">AFTERLIFE<span class="score">0</span></li>
                                <li class="team team-bottom">Fatalis Plague<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Excalibur<span class="score">0</span></li>
                                <li class="team team-bottom">AFK Einsteinium<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">5o1<span class="score">0</span></li>
                                <li class="team team-bottom">Phoenix Esports PH<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">HYDRA GLADIATOR<span class="score">0</span></li>
                                <li class="team team-bottom">ALA EH ESPORTS<span class="score">0</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">EMPTY<span class="score">0</span></li>
                                <li class="team team-bottom">EMPTY<span class="score">0</span></li>
                            </ul>
                        </div>
                    </div>


                </div>
            </section>
            <section class="share">
                <div class="share-wrap">
                    <a class="share-icon" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                    </svg></a>
                    <a class="share-icon" href="https://www.facebook.com/mobilegodsgg"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    </svg></a>
                    <a class="share-icon" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                    </svg></a>
                </div>
            </section>

        </div>
    </div>
)
