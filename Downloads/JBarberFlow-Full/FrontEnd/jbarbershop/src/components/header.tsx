import '../header.scss';
import section1 from '../assets/section1.jpg';
import section2 from '../assets/section2.jpg';

export function Header() {
    return (
        <header id="header">
        <div className="header">
            <h1 className="header-title">Sobre nosotros</h1>

            <p className="header-desc">
                JBarberFlow es una plataforma digital diseñada para optimizar y automatizar la gestión de reservas en barberías. Permite a los clientes agendar, modificar o cancelar citas fácilmente, mientras que los barberos y administradores pueden visualizar y organizar su agenda diaria en tiempo real.
Su objetivo es hacer que el proceso de atención sea fluido, rápido y sin complicaciones, mejorando la experiencia tanto del cliente como del negocio.
            </p>
        </div>

        <section>
            <div className="section-header-box" id="section-business">
            <div className="section-header-content-1-box">
              <h2 className="cta-title">JBarberflow <br/>
                Para el negocio
              </h2>
        
        <p className="cta-text">La plataforma número 1 en gestión de citas que garantiza que tus reservas y tu trabajo fluyan sin interrupciones. Descubre la fórmula secreta de los barberos más exitosos.</p>
        
        <a href="/login" className="cta-button">
            <i className="fas fa-search"></i> Descubre Más
        </a>
        </div>

        <div className="section-header-content-2-box">
            <img src={section1} alt ="section-bg-1" loading='lazy'></img>
        </div>
            </div>
        </section>

        <section>
            <div className="section-header-box-inverse" id="section-client">
                <div className="section-header-content-2-box">
                    <img src={section2} alt="section-bg-2" loading='lazy' className="section2-img"></img>
                </div>

                <div className="section-header-content-1-box">
                    <h2 className="cta-title">JBarberflow <br/>
                        Para el cliente
                    </h2>
            
                    <p className="cta-text">Reserva tu próximo corte de cabello con facilidad. Olvídate de las llamadas y las esperas. Con JBarberflow, tu experiencia de barbería comienza con un simple clic.</p>
            
                    <a href="#" className="cta-button">
                        <i className="fas fa-calendar"></i> Reserva Ahora
                    </a>
                </div>
            </div>
        </section>
        </header>
    )
}