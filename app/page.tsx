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
      // Close mobile menu on scroll
      if (mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Prevent body scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      clearTimeout(showTimer)
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
      window.removeEventListener("scroll", handleScroll)
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

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
        <div className="px-4">
          <Image
            src="/cf-legal-logo-horizontal.png"
            alt="CF Legal"
            width={400}
            height={120}
            className={`w-auto h-[180px] xs:h-[220px] sm:h-[280px] md:h-[380px] lg:h-[432px] max-w-[90vw] transition-all duration-[1500ms] ease-in-out ${
              logoFading ? 'opacity-0 scale-90' : logoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            priority
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="w-full md:w-[80%] mx-auto px-3 sm:px-4 md:px-4 py-2 md:py-[5px] flex items-center justify-between">
          <div className="flex items-center ml-0">
            <Image
              src="/cf-legal-logo-horizontal.png"
              alt="CF Legal"
              width={216}
              height={60}
              className={`h-[40px] sm:h-[50px] md:h-[77px] w-auto origin-left transition-all duration-500 ${
                scrolled ? "scale-[1.3] sm:scale-[1.5] md:scale-[1.95] opacity-100" : "scale-0 opacity-0"
              }`}
              priority
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
            className="md:hidden p-2 z-50 rounded-md hover:bg-white/10 transition-colors active:scale-95"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className={`w-7 h-7 ${scrolled || mobileMenuOpen ? "text-[#0F1822]" : "text-white"}`} />
            ) : (
              <Menu className={`w-7 h-7 ${scrolled ? "text-[#0F1822]" : "text-white"}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <>
            <div 
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="md:hidden fixed top-[60px] left-0 right-0 bg-white shadow-2xl z-40 animate-in slide-in-from-top duration-300">
              <nav className="flex flex-col py-2">
                {["Nosotros", "Áreas de Práctica", "Equipo", "Contacto"].map((item, index) => (
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
                    className="font-raleway font-normal text-base text-[#0F1822] hover:text-cf-burgundy hover:bg-cf-light-gray/40 active:bg-cf-light-gray/60 transition-all duration-200 uppercase tracking-wide py-4 px-6 text-left border-b border-cf-light-gray/30 last:border-b-0"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>
          </>
        )}
      </header>

      <section className="relative h-[45vh] min-h-[350px] sm:h-[55vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/modern-corporate-office-building-professional.jpg"
            alt="CF Legal Hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cf-dark-gray/30 via-cf-dark-gray/40 to-cf-dark-gray/50" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 w-full">
          <Image
            src="/cf-legal-slash-logo.png"
            alt="CF Legal"
            width={240}
            height={360}
            className="w-auto h-[180px] xs:h-[220px] sm:h-[280px] md:h-[380px] lg:h-[430px] max-w-[85vw] mb-0 opacity-95"
            priority
          />
        </div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="py-10 sm:py-14 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
          <h2 className="font-raleway font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#042A3D] text-center mb-6 sm:mb-10 md:mb-14 lg:mb-16 leading-tight">
            Nosotros
          </h2>
          <div className="grid md:grid-cols-2 gap-5 sm:gap-6 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
            <div className="space-y-4">
              <p className="font-arial text-[15px] sm:text-base md:text-lg text-cf-gray leading-relaxed text-justify sm:text-left">
                En CF Legal, nos comprometemos a brindar una asesoría de excelencia, eficiente e innovadora. Nuestro
                equipo de profesionales altamente calificados trabaja de manera cercana con cada cliente, entendiendo
                sus necesidades específicas y ofreciendo soluciones jurídicas personalizadas que generan valor real para
                sus negocios y patrimonios.
              </p>
            </div>
            <div className="space-y-4">
              <p className="font-arial text-[15px] sm:text-base md:text-lg text-cf-gray leading-relaxed text-justify sm:text-left">
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
      <section id="areas-de-practica" className="py-10 sm:py-14 md:py-20 lg:py-24 bg-cf-light-gray">
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
          <h2 className="font-raleway font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#042A3D] text-center mb-6 sm:mb-10 md:mb-14 lg:mb-16 leading-tight">
            Áreas de Práctica
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {practiceAreas.map((area, index) => {
              const IconComponent = area.icon
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 p-5 sm:p-6 md:p-8 flex flex-col items-center justify-center min-h-[220px] sm:min-h-[260px] md:min-h-[280px] transform md:hover:-translate-y-2 active:scale-[0.98] md:active:scale-100"
                  style={{ backgroundColor: '#CDD4D8' }}
                >
                  {/* Contenido normal */}
                  <div className="transition-opacity duration-300 md:group-hover:opacity-0 flex flex-col items-center w-full">
                    <div className="mb-3 sm:mb-4 md:mb-6 p-3 sm:p-3.5 md:p-4 rounded-full bg-white/70 transition-all duration-300 shadow-sm">
                      <IconComponent className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 text-cf-burgundy transition-colors duration-300" />
                    </div>
                    <h3 className="font-raleway font-bold text-base sm:text-lg md:text-xl text-[#0F1822] text-center mb-2 sm:mb-2.5 md:mb-3 transition-colors duration-300 leading-snug">
                      {area.name}
                    </h3>
                    <p className="font-arial text-[13px] sm:text-sm text-cf-gray text-center leading-relaxed opacity-90 px-1">
                      {area.description}
                    </p>
                  </div>

                  {/* Contenido hover - solo en desktop */}
                  <div className="hidden md:flex absolute inset-0 p-6 lg:p-8 flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="mb-4 p-3 lg:p-4 rounded-full bg-cf-burgundy shadow-lg">
                      <IconComponent className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                    </div>
                    <h3 className="font-raleway font-bold text-lg lg:text-xl text-cf-burgundy text-center mb-4 leading-snug">
                      {area.name}
                    </h3>
                    <p className="font-arial text-xs lg:text-sm text-[#0F1822] text-center leading-relaxed">
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
      <section id="equipo" className="py-10 sm:py-14 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
          <h2 className="font-raleway font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#042A3D] text-center mb-8 sm:mb-10 md:mb-14 lg:mb-16 leading-tight">
            Nuestro Equipo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 max-w-6xl mx-auto">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group cursor-pointer transform transition-all duration-300 active:scale-95"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 mx-auto mb-4 sm:mb-5 md:mb-6 rounded-full overflow-hidden shadow-lg transition-shadow duration-300 group-hover:shadow-xl border-4 border-white">
                  <Image
                    src={member.photo || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className={`object-cover transition-all duration-500 ${
                      hoveredMember === member.id ? "grayscale-0 scale-110" : "grayscale scale-100"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-cf-burgundy/40 to-transparent transition-opacity duration-300 ${
                      hoveredMember === member.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredMember === member.id ? "opacity-100" : "opacity-0"
                  }`}>
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-cf-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="text-center px-2">
                  <h3
                    className={`font-raleway font-semibold text-base sm:text-lg md:text-xl mb-1 sm:mb-1.5 md:mb-2 transition-colors duration-300 leading-tight ${
                      hoveredMember === member.id ? "text-cf-burgundy" : "text-[#0F1822]"
                    }`}
                  >
                    {member.name}
                  </h3>
                  <p className="font-arial text-sm sm:text-base text-cf-gray">{member.title}</p>
                  <p className="font-arial text-xs sm:text-sm text-cf-burgundy/70 mt-1 md:hidden">Toca para ver más</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Member Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-[96vw] sm:max-w-[90vw] md:max-w-2xl lg:max-w-3xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
          {selectedMember && (
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <DialogHeader>
                <DialogTitle className="sr-only">{selectedMember.name}</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-8">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-xl overflow-hidden shadow-lg border-2 border-cf-light-gray">
                    <Image
                      src={selectedMember.photoColor || "/placeholder.svg"}
                      alt={selectedMember.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-raleway font-bold text-xl sm:text-2xl md:text-3xl text-[#0F1822] mb-1 sm:mb-1.5 md:mb-2 leading-tight">
                    {selectedMember.name}
                  </h3>
                  <p className="font-arial text-sm sm:text-base md:text-lg text-cf-gray mb-3 sm:mb-4 md:mb-6">
                    {selectedMember.title}
                  </p>

                  <div className="space-y-3 sm:space-y-4 md:space-y-6">
                    <div>
                      <h4 className="font-raleway font-semibold text-base sm:text-lg md:text-xl text-[#0F1822] mb-2 sm:mb-2.5 md:mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cf-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Educación
                      </h4>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {selectedMember.education.map((edu, index) => (
                          <li key={index} className="font-arial text-[13px] sm:text-sm md:text-base text-cf-gray leading-relaxed pl-2">
                            • {edu}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-raleway font-semibold text-base sm:text-lg md:text-xl text-[#0F1822] mb-2 sm:mb-2.5 md:mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cf-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Experiencia Profesional
                      </h4>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {selectedMember.experience.map((exp, index) => (
                          <li key={index} className="font-arial text-[13px] sm:text-sm md:text-base text-cf-gray leading-relaxed pl-2">
                            • {exp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-cf-light-gray">
                      <a
                        href={`mailto:${selectedMember.email}`}
                        className="font-arial text-[13px] sm:text-sm md:text-base text-cf-blue hover:text-cf-burgundy transition-colors duration-200 break-all flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        {selectedMember.email}
                      </a>
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cf-blue hover:text-cf-burgundy transition-colors duration-200 flex items-center gap-2 text-[13px] sm:text-sm"
                      >
                        <Linkedin className="w-4 h-4 flex-shrink-0" />
                        LinkedIn
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
      <section id="contacto" className="py-10 sm:py-14 md:py-20 lg:py-24 bg-cf-dark-gray text-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-4xl">
          <h2 className="font-raleway font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center mb-6 sm:mb-10 md:mb-14 lg:mb-16 leading-tight">
            Sigamos en Contacto
          </h2>
          <div className="max-w-2xl mx-auto text-center space-y-5 sm:space-y-6 md:space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-5 md:gap-8">
              <a
                href="mailto:administracion@cflegal.cl"
                className="flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 text-sm sm:text-base md:text-lg hover:text-cf-burgundy transition-all duration-200 bg-white/5 hover:bg-white/10 backdrop-blur-sm px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl w-full md:w-auto group active:scale-95"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-arial break-all">administracion@cflegal.cl</span>
              </a>
              <a
                href="tel:+56912345678"
                className="flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 text-sm sm:text-base md:text-lg hover:text-cf-burgundy transition-all duration-200 bg-white/5 hover:bg-white/10 backdrop-blur-sm px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl w-full md:w-auto group active:scale-95"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-arial">+56 9 1234 5678</span>
              </a>
            </div>
            <div className="flex justify-center pt-2">
              <a
                href="https://linkedin.com/company/cflegal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-cf-burgundy hover:bg-cf-burgundy/90 active:bg-cf-burgundy/80 rounded-xl transition-all duration-200 font-raleway font-medium text-sm sm:text-base shadow-lg hover:shadow-xl active:scale-95 w-full sm:w-auto max-w-xs"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Síguenos en LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cf-dark-gray border-t border-cf-gray/20 py-5 sm:py-6 md:py-8">
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <Image 
              src="/cf-legal-logo-horizontal.png" 
              alt="CF Legal" 
              width={150} 
              height={45} 
              className="w-auto h-7 sm:h-8 md:h-10 brightness-0 invert" 
            />
            <p className="font-arial text-cf-light-gray text-[11px] sm:text-xs md:text-sm text-center leading-relaxed">
              © {new Date().getFullYear()} CF Legal. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
