import '../footer.scss';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>JBarberFlow</h3>
                    <p>Tu plataforma de confianza para gestionar citas de barbería de manera eficiente y profesional.</p>
                </div>

                <div className="footer-section">
                    <h4>Enlaces Rápidos</h4>
                    <ul>
                        <li><a href="#header">Inicio</a></li>
                        <li><a href="#section-business">Para Negocios</a></li>
                        <li><a href="#section-client">Para Clientes</a></li>
                        <li><Link to="/login">Iniciar Sesión</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contacto</h4>
                    <ul>
                        <li>Email: info@jbarberflow.com</li>
                        <li>Tel: (123) 456-7890</li>
                        <li>
                            <Link to="/login" className="footer-cta">
                                Reserva Ahora
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 JBarberFlow. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}