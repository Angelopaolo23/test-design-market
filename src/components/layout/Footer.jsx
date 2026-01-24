import { FiInstagram, FiTwitter, FiGithub, FiMail } from 'react-icons/fi';
import { Container } from './Container';

const footer_links = {
  marketplace: [
    { label: 'Explorar Obras', href: '#' },
    { label: 'Artistas', href: '#' },
    { label: 'Categorías', href: '#' },
    { label: 'Nuevos Lanzamientos', href: '#' },
  ],
  artistas: [
    { label: 'Empezar a Vender', href: '#' },
    { label: 'Guía del Artista', href: '#' },
    { label: 'Comisiones', href: '#' },
    { label: 'Recursos', href: '#' },
  ],
  empresa: [
    { label: 'Sobre Nosotros', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contacto', href: '#' },
    { label: 'Trabaja con Nosotros', href: '#' },
  ],
  legal: [
    { label: 'Términos de Uso', href: '#' },
    { label: 'Privacidad', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
};

const social_links = [
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiGithub, href: '#', label: 'GitHub' },
  { icon: FiMail, href: '#', label: 'Email' },
];

/**
 * Footer - Pie de página minimal RAIOS
 */
export function Footer() {
  const current_year = new Date().getFullYear();

  return (
    <footer className="border-t border-raios-text-support/10 mt-8">
      <Container>
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="inline-block mb-4">
              <span className="font-mono text-xl font-bold text-raios-text-high">
                RAIOS
              </span>
              <span className="font-mono text-xs text-raios-primary tracking-widest ml-1">
                ART
              </span>
            </a>
            <p className="font-sans text-sm text-raios-text-support mb-6 max-w-xs">
              Conectando artistas emergentes con coleccionistas apasionados desde 2024.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {social_links.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 text-raios-text-support hover:text-raios-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-mono text-sm font-bold text-raios-text-high mb-4 uppercase tracking-wider">
              Marketplace
            </h4>
            <ul className="space-y-3">
              {footer_links.marketplace.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-raios-text-support hover:text-raios-text-high transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm font-bold text-raios-text-high mb-4 uppercase tracking-wider">
              Artistas
            </h4>
            <ul className="space-y-3">
              {footer_links.artistas.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-raios-text-support hover:text-raios-text-high transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm font-bold text-raios-text-high mb-4 uppercase tracking-wider">
              Empresa
            </h4>
            <ul className="space-y-3">
              {footer_links.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-raios-text-support hover:text-raios-text-high transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm font-bold text-raios-text-high mb-4 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              {footer_links.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-raios-text-support hover:text-raios-text-high transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-raios-text-support/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-sm text-raios-text-support">
            © {current_year} RAIOS Art. Todos los derechos reservados.
          </p>

          <p className="font-mono text-xs text-raios-text-support/60">
            Hecho con energía creativa
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
