import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    const links = [
        { name: 'О нас', url: '/about' },
        { name: 'Контакты', url: '/contact' },
        { name: 'Политика конфиденциальности', url: '/privacy' }
    ];

    const socials = [
        { name: 'Facebook', url: 'https://facebook.com', icon: <FaFacebook /> },
        { name: 'Instagram', url: 'https://instagram.com', icon: <FaInstagram /> },
        { name: 'Twitter', url: 'https://twitter.com', icon: <FaTwitter /> }
    ];

    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto px-4">
                <ul className="flex mb-4">
                    {links.map((link, index) => (
                        <li key={index} className="mr-4 hover:underline">
                            <a href={link.url} className="hover:text-gray-400" target="_self">{link.name}</a>
                        </li>
                    ))}
                </ul>
                <ul className="flex">
                    {socials.map((social, index) => (
                        <li key={index} className="mr-4">
                            <a
                                href={social.url}
                                className="flex items-center hover:text-gray-400"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                            >
                                {social.icon}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}