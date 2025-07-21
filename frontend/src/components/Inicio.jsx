import React from 'react';
import { Building2, Users, Target, Award, MapPin, Phone, Mail } from 'lucide-react';
import "../styles/Inicio.css";
const Inicio = () => {
  return (
    <div className="inicio-container">
      {/* Sección Hero */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <Building2 className="hero-logo" />
            <h2 className="hero-title">Bienvenidos a MiNegocio.pe</h2>
            <p className="hero-subtitle">
              Tu plataforma de confianza para encontrar los mejores productos y servicios. 
              Conectamos negocios locales con clientes que buscan calidad y excelencia.
            </p>
            <button className="hero-button">
              Explorar Productos
            </button>
          </div>
        </div>
      </section>

      {/* Sección Descripción de la Empresa */}
      <section className="empresa-section">
        <div className="section-container">
          <div className="section-header">
            <h3 className="section-title">Nuestra Empresa</h3>
            <div className="section-divider"></div>
          </div>
          
          <div className="empresa-grid">
            <div className="empresa-content">
              <h4>Descripción de la Empresa</h4>
              <p>
                MiNegocio.pe es una plataforma digital innovadora que nació con el objetivo de 
                fortalecer el ecosistema empresarial peruano. Facilitamos la conexión entre 
                empresas locales y consumidores, promoviendo el crecimiento económico y la 
                competitividad en el mercado nacional.
              </p>
              <p>
                Nos especializamos en brindar soluciones tecnológicas que permiten a las 
                empresas mostrar sus productos y servicios de manera efectiva, mientras 
                ofrecemos a los consumidores una experiencia de compra segura y confiable.
              </p>
              <p>
                Con presencia en todo el territorio peruano, trabajamos día a día para 
                ser el puente que conecte la oferta y demanda, generando oportunidades 
                de negocio y contribuyendo al desarrollo económico del país.
              </p>
            </div>
            
            <div className="logo-display">
              <div className="logo-circle">
                <Building2 className="logo-circle-icon" />
              </div>
              <h5 className="logo-title">Logo Empresarial</h5>
              <p className="logo-subtitle">Símbolo de confianza y calidad</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Quiénes Somos */}
      <section className="nosotros-section">
        <div className="section-container">
          <div className="section-header">
            <h3 className="section-title">¿Quiénes Somos?</h3>
            <div className="section-divider"></div>
          </div>

          <div className="cards-grid">
            <div className="info-card">
              <Target className="card-icon" />
              <h4 className="card-title">Nuestra Misión</h4>
              <p className="card-text">
                Conectar empresas peruanas con sus clientes ideales a través de una 
                plataforma digital innovadora, segura y fácil de usar, promoviendo el 
                crecimiento del comercio local.
              </p>
            </div>
            
            <div className="info-card">
              <Award className="card-icon" />
              <h4 className="card-title">Nuestra Visión</h4>
              <p className="card-text">
                Ser la plataforma líder en Perú para el comercio electrónico B2B y B2C, 
                reconocida por nuestra contribución al desarrollo económico nacional y 
                la digitalización empresarial.
              </p>
            </div>
            
            <div className="info-card">
              <Users className="card-icon" />
              <h4 className="card-title">Nuestros Valores</h4>
              <p className="card-text">
                Confianza, innovación, transparencia y compromiso con el desarrollo 
                sostenible. Priorizamos la calidad en el servicio y la satisfacción 
                de nuestros usuarios.
              </p>
            </div>
          </div>

          <div className="equipo-card">
            <h4 className="equipo-title">Nuestro Equipo</h4>
            <div className="equipo-grid">
              <div className="equipo-item">
                <h5>Experiencia y Profesionalismo</h5>
                <p>
                  Contamos con un equipo multidisciplinario de profesionales especializados 
                  en tecnología, marketing digital, atención al cliente y desarrollo de negocios.
                </p>
                <p>
                  Nuestro equipo tiene más de 10 años de experiencia combinada en el sector 
                  del comercio electrónico y la transformación digital de empresas.
                </p>
              </div>
              <div className="equipo-item">
                <h5>Compromiso con el Cliente</h5>
                <p>
                  Trabajamos 24/7 para garantizar que tanto empresas como consumidores 
                  tengan la mejor experiencia posible en nuestra plataforma.
                </p>
                <p>
                  Nuestro soporte técnico y comercial está disponible para resolver 
                  cualquier consulta y brindar asesoramiento personalizado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Estadísticas */}
      <section className="estadisticas-section">
        <div className="section-container">
          <div className="section-header">
            <h3 className="section-title">Nuestros Números</h3>
            <div className="section-divider"></div>
          </div>
          
          <div className="estadisticas-grid">
            <div className="estadistica-item">
              <div className="estadistica-numero">500+</div>
              <p className="estadistica-texto">Empresas Registradas</p>
            </div>
            <div className="estadistica-item">
              <div className="estadistica-numero">10,000+</div>
              <p className="estadistica-texto">Productos Disponibles</p>
            </div>
            <div className="estadistica-item">
              <div className="estadistica-numero">25,000+</div>
              <p className="estadistica-texto">Usuarios Activos</p>
            </div>
            <div className="estadistica-item">
              <div className="estadistica-numero">24/7</div>
              <p className="estadistica-texto">Soporte Técnico</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Contacto */}
      <section className="contacto-section">
        <div className="section-container">
          <div className="section-header">
            <h3 className="section-title">Contáctanos</h3>
            <div className="section-divider"></div>
          </div>
          
          <div className="contacto-grid">
            <div className="contacto-item">
              <MapPin className="contacto-icon" />
              <h4 className="contacto-title">Dirección</h4>
              <p className="contacto-text">
                Av. Javier Prado Este 123<br />
                San Isidro, Lima - Perú
              </p>
            </div>
            
            <div className="contacto-item">
              <Phone className="contacto-icon" />
              <h4 className="contacto-title">Teléfono</h4>
              <p className="contacto-text">
                +51 1 234-5678<br />
                +51 987 654 321
              </p>
            </div>
            
            <div className="contacto-item">
              <Mail className="contacto-icon" />
              <h4 className="contacto-title">Email</h4>
              <p className="contacto-text">
                info@minegocio.pe<br />
                soporte@minegocio.pe
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="section-container">
          <div className="footer-content">
            <div className="footer-logo">
              <Building2 className="footer-logo-icon" />
              <span className="footer-logo-text">MiNegocio.pe</span>
            </div>
            <p className="footer-text">
              © 2024 MiNegocio.pe. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;