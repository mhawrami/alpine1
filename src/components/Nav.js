"use client";

export default function Nav({ toggleContent, isImpressum, data }) {
  return (
    <nav>
      <ul>
        {data.navLinks.map(link => (
          <li key={link.name}>
            <button
              onClick={link.name === 'Impressum' ? toggleContent : undefined}
              className='nav-link'
            >
              {link.name === 'Impressum'
                ? isImpressum
                  ? 'Über mich'
                  : 'Impressum'
                : link.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
