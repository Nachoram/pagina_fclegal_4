"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Mail, Phone, Linkedin, Scale, Home, Briefcase, TrendingUp, Menu, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface TeamMember {
  id: string
  name: string
  title: string
  photo: string
  photoColor: string
  education: string[]
  experience: string[]
  email: string
  linkedin: string
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sebastián Cuesta",
    title: "Socio",
    photo: "/professional-male-lawyer.png",
    photoColor: "/professional-lawyer-portrait-male-color.jpg",
    education: [
      "Licenciado en Derecho, Universidad de Chile",
      "Magíster en Derecho Tributario, Universidad Adolfo Ibáñez",
    ],
    experience: [
      "Socio Fundador, CF Legal (2024 - Presente)",
      "Asociado Senior, Estudio Jurídico Internacional (2018 - 2024)",
      "Asesor Legal, Ministerio de Hacienda (2015 - 2018)",
    ],
    email: "scuesta@cflegal.cl",
    linkedin: "https://linkedin.com/in/sebastiancuesta",
  },
  {
    id: "2",
    name: "Pedro Urrestarazu",
    title: "Socio",
    photo: "/professional-lawyer-portrait-male-senior.jpg",
    photoColor: "/professional-lawyer-portrait-male-senior-color.jpg",
    education: [
      "Licenciado en Derecho, Universidad de Chile",
      "MBA, Universidad Adolfo Ibáñez",
    ],
    experience: [
      "Socio Fundador, CF Legal (2024 - Presente)",
      "Gerente Legal, Corporación Multinacional (2017 - 2024)",
      "Asociado Senior, Estudio Tributario (2012 - 2017)",
    ],
    email: "purrestarazu@cflegal.cl",
    linkedin: "https://linkedin.com/in/pedrourrestarazu",
  },
  {
    id: "3",
    name: "Mauro Inserrato",
    title: "Socio",
    photo: "/professional-male-lawyer.png",
    photoColor: "/professional-lawyer-portrait-male-color.jpg",
    education: [
      "Licenciado en Derecho, Pontificia Universidad Católica",
      "Diplomado en Derecho Corporativo, Universidad de los Andes",
    ],
    experience: [
      "Socio Fundador, CF Legal (2024 - Presente)",
      "Asociado, Estudio Corporativo (2019 - 2024)",
      "Abogado Junior, Firma Internacional (2016 - 2019)",
    ],
    email: "minserrato@cflegal.cl",
    linkedin: "https://linkedin.com/in/mauroinserrato",
  },
]

const practiceAreas = [
  {
    name: "Derecho Tributario",
    icon: Scale,
    description: "Asesoría integral en materia tributaria y fiscal",
    details: "Planificación tributaria, defensa ante el SII, estructuración de inversiones, compliance fiscal y optimización de carga tributaria para personas y empresas."
  },
  {
    name: "Gestión de Patrimonio",
    icon: TrendingUp,
    description: "Planificación y protección patrimonial estratégica",
    details: "Estructuración patrimonial, sucesiones, fideicomisos, planificación hereditaria y estrategias de protección de activos para familias y empresas."
  },
  {
    name: "Derecho Corporativo",
    icon: Briefcase,
    description: "Soluciones legales para empresas y sociedades",
    details: "Constitución de sociedades, fusiones y adquisiciones, reestructuraciones corporativas, gobierno corporativo y asesoría en operaciones comerciales complejas."
  },
  {
    name: "Derecho Inmobiliario",
    icon: Home,
    description: "Asesoría especializada en transacciones inmobiliarias",
    details: "Compraventa de propiedades, due diligence inmobiliario, contratos de arriendo, desarrollo de proyectos y resolución de conflictos en materia inmobiliaria."
  }
]

export default function CFLegalPage() {
  const [showLogo, setShowLogo] = useState(true)
  const [logoVisible, setLogoVisible] = useState(false)
  const [logoFading, setLogoFading] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [hoveredMember, setHoveredMember] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Fade in
    const showTimer = setTimeout(() => {
      setLogoVisible(true)
    }, 100)

    // Fade out
    const fadeTimer = setTimeout(() => {
      setLogoFading(true)
    }, 3000)

    // Hide completely
    const hideTimer = setTimeout(() => {
      setShowLogo(false)
    }, 4500)

    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setMobileMenuOpen(false)
    }
  }

  if (showLogo) {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[#CDD4D8] transition-opacity duration-[1500ms] ease-in-out ${
        logoFading ? 'opacity-0' : logoVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <Image
          src="/cf-legal-logo-horizontal.png"
          alt="CF Legal"
          width={400}
          height={120}
          className={`w-auto h-[200px] sm:h-[300px] md:h-[432px] transition-all duration-[1500ms] ease-in-out ${
            logoFading ? 'opacity-0 scale-90' : logoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          priority
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-4 py-[5px] flex items-center justify-between">
          <div className="flex items-center ml-0">
            <Image
              src="/cf-legal-logo-horizontal.png"
              alt="CF Legal"
              width={216}
              height={60}
              className={`h-[50px] md:h-[77px] w-auto origin-left transition-all duration-500 ${
                scrolled ? "scale-[1.5] md:scale-[1.95] opacity-100" : "scale-0 opacity-0"
              }`}
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 ml-auto mr-[1cm]">
            {["Nosotros", "Áreas de Práctica", "Equipo", "Contacto"].map((item) => (
              <button
                key={item}
                onClick={() =>
                  scrollToSection(
                    item
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, ""),
                  )
                }
                className={`font-raleway font-normal text-sm transition-colors duration-300 uppercase tracking-wide ${
                  scrolled ? "text-[#0F1822] hover:text-cf-burgundy" : "text-white hover:text-cf-burgundy"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${scrolled ? "text-[#0F1822]" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${scrolled ? "text-[#0F1822]" : "text-white"}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg">
            <nav className="flex flex-col py-4">
              {["Nosotros", "Áreas de Práctica", "Equipo", "Contacto"].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(
                      item
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, ""),
                    )
                  }
                  className="font-raleway font-normal text-sm text-[#0F1822] hover:text-cf-burgundy hover:bg-cf-light-gray/30 transition-colors duration-300 uppercase tracking-wide py-3 px-6 text-left"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <section className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/modern-corporate-office-building-professional.jpg"
            alt="CF Legal Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-cf-dark-gray/40" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <Image
            src="/cf-legal-slash-logo.png"
            alt="CF Legal"
            width={240}
            height={360}
            className="w-auto h-[200px] sm:h-[300px] md:h-[430px] mb-4 sm:mb-8 opacity-90"
          />
        </div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="font-raleway font-bold text-3xl sm:text-4xl md:text-5xl text-[#042A3D] text-center mb-8 sm:mb-12 md:mb-16">Nosotros</h2>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
            <div className="space-y-4">
              <p className="font-arial text-base sm:text-lg text-cf-gray leading-relaxed">
                En CF Legal, nos comprometemos a brindar una asesoría de excelencia, eficiente e innovadora. Nuestro
                equipo de profesionales altamente calificados trabaja de manera cercana con cada cliente, entendiendo
                sus necesidades específicas y ofreciendo soluciones jurídicas personalizadas que generan valor real para
                sus negocios y patrimonios.
              </p>
            </div>
            <div className="space-y-4">
              <p className="font-arial text-base sm:text-lg text-cf-gray leading-relaxed">
                Nos destacamos por nuestra experiencia como asesores in-house, lo que nos permite comprender
                profundamente las operaciones empresariales y optimizar procesos legales. Esta perspectiva única nos
                posiciona como socios estratégicos capaces de anticipar desafíos y proponer soluciones prácticas y
                efectivas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Áreas de Práctica Section */}
      <section id="areas-de-practica" className="py-12 sm:py-16 md:py-24 bg-cf-light-gray">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="font-raleway font-bold text-3xl sm:text-4xl md:text-5xl text-[#042A3D] text-center mb-8 sm:mb-12 md:mb-16">
            Áreas de Práctica
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
            {practiceAreas.map((area, index) => {
              const IconComponent = area.icon
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 sm:p-8 flex flex-col items-center justify-center min-h-[240px] sm:min-h-[280px] transform hover:-translate-y-2"
                  style={{ backgroundColor: '#CDD4D8' }}
                >
                  {/* Contenido normal */}
                  <div className="transition-opacity duration-300 group-hover:opacity-0 flex flex-col items-center">
                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-full bg-white/60 transition-all duration-300">
                      <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 text-cf-burgundy transition-colors duration-300" />
                    </div>
                    <h3 className="font-raleway font-bold text-lg sm:text-xl text-[#0F1822] text-center mb-2 sm:mb-3 transition-colors duration-300">
                      {area.name}
                    </h3>
                    <p className="font-arial text-xs sm:text-sm text-cf-gray text-center leading-relaxed opacity-90">
                      {area.description}
                    </p>
                  </div>

                  {/* Contenido hover - solo en desktop */}
                  <div className="hidden md:flex absolute inset-0 p-6 sm:p-8 flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="mb-4 p-3 sm:p-4 rounded-full bg-cf-burgundy">
                      <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <h3 className="font-raleway font-bold text-lg sm:text-xl text-cf-burgundy text-center mb-4">
                      {area.name}
                    </h3>
                    <p className="font-arial text-xs sm:text-sm text-[#0F1822] text-center leading-relaxed">
                      {area.details}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Equipo Section */}
      <section id="equipo" className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="font-raleway font-bold text-3xl sm:text-4xl md:text-5xl text-[#042A3D] text-center mb-8 sm:mb-12 md:mb-16">
            Nuestro Equipo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 max-w-6xl mx-auto">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden">
                  <Image
                    src={member.photo || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className={`object-cover transition-all duration-500 ${
                      hoveredMember === member.id ? "grayscale-0" : "grayscale"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 bg-cf-gray/30 transition-opacity duration-300 ${
                      hoveredMember === member.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
                <div className="text-center">
                  <h3
                    className={`font-raleway font-semibold text-lg sm:text-xl mb-1 sm:mb-2 transition-colors duration-300 ${
                      hoveredMember === member.id ? "text-cf-burgundy" : "text-[#0F1822]"
                    }`}
                  >
                    {member.name}
                  </h3>
                  <p className="font-arial text-sm sm:text-base text-cf-gray">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Member Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedMember && (
            <div className="space-y-4 sm:space-y-6">
              <DialogHeader>
                <DialogTitle className="sr-only">{selectedMember.name}</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-lg overflow-hidden">
                    <Image
                      src={selectedMember.photoColor || "/placeholder.svg"}
                      alt={selectedMember.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-raleway font-bold text-2xl sm:text-3xl text-[#0F1822] mb-1 sm:mb-2">{selectedMember.name}</h3>
                  <p className="font-arial text-base sm:text-lg text-cf-gray mb-4 sm:mb-6">{selectedMember.title}</p>

                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h4 className="font-raleway font-semibold text-lg sm:text-xl text-[#0F1822] mb-2 sm:mb-3">Educación</h4>
                      <ul className="space-y-1 sm:space-y-2">
                        {selectedMember.education.map((edu, index) => (
                          <li key={index} className="font-arial text-sm sm:text-base text-cf-gray leading-relaxed">
                            • {edu}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-raleway font-semibold text-lg sm:text-xl text-[#0F1822] mb-2 sm:mb-3">
                        Experiencia Profesional
                      </h4>
                      <ul className="space-y-1 sm:space-y-2">
                        {selectedMember.experience.map((exp, index) => (
                          <li key={index} className="font-arial text-sm sm:text-base text-cf-gray leading-relaxed">
                            • {exp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-cf-light-gray">
                      <a
                        href={`mailto:${selectedMember.email}`}
                        className="font-arial text-sm sm:text-base text-cf-blue hover:text-cf-burgundy transition-colors duration-200 break-all"
                      >
                        {selectedMember.email}
                      </a>
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cf-blue hover:text-cf-burgundy transition-colors duration-200"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Contacto Section */}
      <section id="contacto" className="py-12 sm:py-16 md:py-24 bg-cf-dark-gray text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="font-raleway font-bold text-3xl sm:text-4xl md:text-5xl text-white text-center mb-8 sm:mb-12 md:mb-16">Sigamos en Contacto</h2>
          <div className="max-w-2xl mx-auto text-center space-y-6 sm:space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
              <a
                href="mailto:administracion@cflegal.cl"
                className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg hover:text-cf-burgundy transition-colors duration-200"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span className="font-arial break-all">administracion@cflegal.cl</span>
              </a>
              <a
                href="tel:+56912345678"
                className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg hover:text-cf-burgundy transition-colors duration-200"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span className="font-arial">+56 9 1234 5678</span>
              </a>
            </div>
            <div className="flex justify-center">
              <a
                href="https://linkedin.com/company/cflegal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 bg-cf-burgundy hover:bg-cf-burgundy/90 rounded-lg transition-colors duration-200"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-raleway font-medium text-sm sm:text-base">Síguenos en LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cf-dark-gray border-t border-cf-gray/20 py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <Image 
              src="/cf-legal-logo-horizontal.png" 
              alt="CF Legal" 
              width={150} 
              height={45} 
              className="w-auto h-8 sm:h-10 brightness-0 invert" 
            />
            <p className="font-arial text-cf-light-gray text-xs sm:text-sm text-center">
              © {new Date().getFullYear()} CF Legal. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
