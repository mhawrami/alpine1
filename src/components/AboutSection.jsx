import { useState } from 'react';
import styles from './AboutSection.module.css'; // Import CSS module

const AboutSection = () => {
  const [showImprint, setShowImprint] = useState(false);

  const handleImpressumClick = () => {
    setShowImprint(!showImprint);
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <a href="#" onClick={handleImpressumClick}>
              {showImprint ? 'Über mich' : 'Impressum'}
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.textContainer}>
        <p className={showImprint ? styles.fadeOut : styles.fadeIn}>
          {showImprint
            ? 'Your company imprint information goes here.'
            : 'Ich bin Moe und dein Partner für alles rund um Webentwicklung, Design und IT-Consulting. Mein Ziel ist es, dich mit modernen und nachhaltigen IT-Lösungen zu unterstützen, damit dein Business auf die nächste Stufe gehoben wird.'}
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
