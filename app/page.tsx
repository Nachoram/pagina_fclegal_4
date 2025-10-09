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

    window.addEventListener("scroll", handleScroll, { passive: true })

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
        <div className="px-6 sm:px-8">
          <Image
            src="/cf-legal-logo-horizontal.png"
            alt="CF Legal"
            width={400}
            height={120}
            className={`w-auto h-[4px] xs:h-[5px] sm:h-[9px] md:h-[15px] lg:h-[21px] max-w-[50vw] transition-all duration-[1500ms] ease-in-out ${
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
        <div className="w-full md:w-[80%] mx-auto px-4 sm:px-6 md:px-4 py-0.5 sm:py-1 md:py-[5px] flex items-center justify-between max-w-[100vw]">
          <div className="flex items-center min-w-0 flex-shrink">
            <Image
              src="/cf-legal-logo-horizontal.png"
              alt="CF Legal"
              width={216}
              height={60}
              className={`h-[1px] sm:h-[2px] md:h-[77px] w-auto origin-left transition-all duration-500 ${
                scrolled ? "scale-100 sm:scale-105 md:scale-[1.95] opacity-100" : "scale-0 opacity-0"
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
                className={`font-medium text-sm transition-colors duration-300 uppercase tracking-wider ${
                  scrolled ? "text-[#0F1822] hover:text-cf-burgundy" : "text-white hover:text-cf-burgundy"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 sm:p-2.5 z-50 rounded-md transition-colors active:scale-95 flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-7 h-7 sm:w-8 sm:h-8 text-[#0F1822]" />
            ) : (
              <Menu className="w-7 h-7 sm:w-8 sm:h-8 text-[#0F1822]" />
            )}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <>
            <div 
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-30 animate-in fade-in duration-300"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="md:hidden fixed top-0 right-0 bottom-0 w-[85vw] max-w-[320px] bg-gradient-to-br from-cf-dark-gray via-cf-blue to-cf-dark-gray shadow-2xl z-40 animate-in slide-in-from-right duration-300">
              <div className="flex flex-col h-full p-6">
                {/* Drawer Header */}
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/10">
                  <Image
                    src="/cf-legal-slash-logo.png"
                    alt="CF Legal"
                    width={80}
                    height={120}
                    className="w-auto h-10 brightness-0 invert"
                  />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
                
                {/* Navigation */}
                <nav className="flex flex-col gap-2 flex-1">
                  {[
                    { name: "Nosotros", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                    { name: "Áreas de Práctica", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
                    { name: "Equipo", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
                    { name: "Contacto", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                  ].map((item, index) => (
                    <button
                      key={item.name}
                      onClick={() =>
                        scrollToSection(
                          item.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, ""),
                        )
                      }
                      className="group flex items-center gap-4 font-medium text-base text-white/90 hover:text-white hover:bg-white/10 active:bg-white/20 transition-all duration-200 py-4 px-4 rounded-xl text-left"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <svg className="w-5 h-5 text-cf-burgundy group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      <span className="tracking-wider">{item.name}</span>
                      <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </nav>
                
                {/* Drawer Footer */}
                <div className="pt-6 mt-auto border-t border-white/10">
                  <p className="text-white/60 text-xs font-normal mb-3">Síguenos</p>
                  <div className="flex gap-3">
                    <a
                      href="https://linkedin.com/company/cflegal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 hover:bg-cf-burgundy rounded-lg transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href="mailto:administracion@cflegal.cl"
                      className="p-3 bg-white/10 hover:bg-cf-burgundy rounded-lg transition-colors"
                    >
                      <Mail className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href="tel:+56912345678"
                      className="p-3 bg-white/10 hover:bg-cf-burgundy rounded-lg transition-colors"
                    >
                      <Phone className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      <section className="relative h-[75vh] min-h-[600px] md:h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/modern-corporate-office-building-professional.jpg"
            alt="CF Legal Hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cf-dark-gray/80 via-cf-blue/70 to-cf-burgundy/40" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 sm:px-8 w-full max-w-4xl mx-auto">
          <div className="mb-8 md:mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Image
              src="/cf-legal-slash-logo.png"
              alt="CF Legal"
              width={240}
              height={360}
              className="w-auto h-[280px] sm:h-[350px] md:h-[480px] lg:h-[560px] xl:h-[640px] max-w-[600px] sm:max-w-[720px] md:max-w-[960px] lg:max-w-[1120px] xl:max-w-[1280px] mx-auto opacity-95"
              priority
            />
          </div>
        </div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="py-10 sm:py-14 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-dark text-center mb-6 sm:mb-10 md:mb-14 lg:mb-16 leading-tight tracking-tight">
            Nosotros
          </h2>
          <div className="grid md:grid-cols-2 gap-5 sm:gap-6 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
            <div className="space-y-4">
              <p className="font-normal text-[15px] sm:text-base md:text-lg text-cf-gray leading-relaxed text-justify sm:text-left">
                En CF Legal, nos comprometemos a brindar una asesoría de excelencia, eficiente e innovadora. Nuestro
                equipo de profesionales altamente calificados trabaja de manera cercana con cada cliente, entendiendo
                sus necesidades específicas y ofreciendo soluciones jurídicas personalizadas que generan valor real para
                sus negocios y patrimonios.
              </p>
            </div>
            <div className="space-y-4">
              <p className="font-normal text-[15px] sm:text-base md:text-lg text-cf-gray leading-relaxed text-justify sm:text-left">
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
      <section id="areas-de-practica" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gray-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-brand-bordeaux/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-bordeaux/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-5 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <p className="font-medium text-sm sm:text-base text-brand-bordeaux mb-3 tracking-wider uppercase">Especialidades</p>
            <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-4 leading-tight tracking-tight">
              Áreas de Práctica
            </h2>
            <div className="w-20 h-1 bg-brand-bordeaux mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            {practiceAreas.map((area, index) => {
              const IconComponent = area.icon
              return (
                <div
                  key={index}
                  className="group relative bg-white border border-brand-gray hover:border-brand-bordeaux transition-all duration-300 rounded-3xl overflow-hidden"
                >
                  <div className="relative p-6 sm:p-8 md:p-10">
                    <div className="flex items-start gap-5 mb-4">
                      <div className="flex-shrink-0">
                        <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-brand-bordeaux" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-xl sm:text-2xl md:text-2xl text-brand-light mb-2 leading-tight tracking-tight group-hover:text-brand-bordeaux transition-colors">
                          {area.name}
                        </h3>
                        <p className="font-normal text-sm sm:text-base text-brand-light/80 leading-relaxed">
                          {area.description}
                        </p>
                      </div>
                    </div>

                    <p className="font-normal text-[13px] sm:text-sm text-brand-light leading-relaxed pl-[76px] opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 overflow-hidden">
                      {area.details}
                    </p>

                    {/* Arrow indicator on mobile */}
                    <div className="md:hidden flex items-center justify-center mt-4 text-brand-bordeaux text-xs font-medium tracking-wider">
                      <span>Toca para más info</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Equipo Section */}
      <section id="equipo" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-cf-dark-gray via-cf-blue to-cf-dark-gray relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
          <div className="absolute bottom-20 right-20 w-60 h-60 border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-white rounded-full" />
        </div>
        
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <p className="font-medium text-sm sm:text-base text-cf-burgundy mb-3 tracking-wider uppercase">Profesionales</p>
            <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight tracking-tight">
              Nuestro Equipo
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cf-burgundy to-white mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-6xl mx-auto">
            {teamMembers.map((member, idx) => (
              <div
                key={member.id}
                className="group cursor-pointer transform transition-all duration-500 active:scale-95"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
                onClick={() => setSelectedMember(member)}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-cf-burgundy/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cf-burgundy/20">
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-cf-burgundy/20 rounded-bl-[60px] rounded-tr-3xl" />
                  
                  <div className="relative">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 group-hover:rotate-2">
                      <Image
                        src={member.photo || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className={`object-cover transition-all duration-500 ${
                          hoveredMember === member.id ? "grayscale-0 scale-110" : "grayscale scale-100"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cf-burgundy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* View icon */}
                      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                        hoveredMember === member.id ? "opacity-100" : "opacity-0"
                      }`}>
                        <div className="bg-white rounded-xl p-3 shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          <svg className="w-6 h-6 text-cf-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <h3 className={`font-bold text-xl sm:text-2xl mb-2 transition-colors duration-300 leading-tight tracking-tight ${
                        hoveredMember === member.id ? "text-cf-burgundy" : "text-white"
                      }`}>
                        {member.name}
                      </h3>
                      <p className="font-normal text-sm sm:text-base text-white/70 mb-4">{member.title}</p>
                      
                      <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <a
                          href={`mailto:${member.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 bg-white/10 hover:bg-cf-burgundy rounded-lg transition-colors"
                        >
                          <Mail className="w-4 h-4 text-white" />
                        </a>
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 bg-white/10 hover:bg-cf-burgundy rounded-lg transition-colors"
                        >
                          <Linkedin className="w-4 h-4 text-white" />
                        </a>
                      </div>
                      
                      <p className="font-medium text-xs text-cf-burgundy/80 mt-4 md:hidden tracking-wider">Toca para ver perfil completo</p>
                    </div>
                  </div>
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
                  <h3 className="font-bold text-xl sm:text-2xl md:text-3xl text-[#0F1822] mb-1 sm:mb-1.5 md:mb-2 leading-tight tracking-tight">
                    {selectedMember.name}
                  </h3>
                  <p className="font-normal text-sm sm:text-base md:text-lg text-cf-gray mb-3 sm:mb-4 md:mb-6">
                    {selectedMember.title}
                  </p>

                  <div className="space-y-3 sm:space-y-4 md:space-y-6">
                    <div>
                      <h4 className="font-medium text-base sm:text-lg md:text-xl text-[#0F1822] mb-2 sm:mb-2.5 md:mb-3 flex items-center gap-2 tracking-tight">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cf-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Educación
                      </h4>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {selectedMember.education.map((edu, index) => (
                          <li key={index} className="font-normal text-[13px] sm:text-sm md:text-base text-cf-gray leading-relaxed pl-2">
                            • {edu}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-base sm:text-lg md:text-xl text-[#0F1822] mb-2 sm:mb-2.5 md:mb-3 flex items-center gap-2 tracking-tight">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cf-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Experiencia Profesional
                      </h4>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {selectedMember.experience.map((exp, index) => (
                          <li key={index} className="font-normal text-[13px] sm:text-sm md:text-base text-cf-gray leading-relaxed pl-2">
                            • {exp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-cf-light-gray">
                      <a
                        href={`mailto:${selectedMember.email}`}
                        className="font-normal text-[13px] sm:text-sm md:text-base text-cf-blue hover:text-cf-burgundy transition-colors duration-200 break-all flex items-center gap-2"
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
      <section id="contacto" className="py-24 sm:py-28 md:py-32 lg:py-36 bg-white relative overflow-hidden">
        {/* Background decoration - More subtle and premium */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#CDD4D8]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#808184]/8 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 sm:px-8 max-w-5xl relative z-10">
          <div className="text-center mb-20 sm:mb-24 md:mb-28">
            {/* Subtítulo con Raleway Medium, tracking amplio y color burdeo */}
            <p className="font-medium text-sm sm:text-base text-[#8E1927] mb-6 tracking-wider uppercase">
              Hablemos
            </p>
            {/* Título principal con Raleway Bold */}
            <h2 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#0F1822] mb-8 leading-tight tracking-tight">
              Contacta con Nosotros
            </h2>
            {/* Línea decorativa sutil */}
            <div className="w-20 h-0.5 bg-[#8E1927] mx-auto rounded-full mb-10" />
            {/* Párrafo con Raleway Regular */}
            <p className="font-raleway font-normal text-base sm:text-lg text-[#808184] max-w-2xl mx-auto leading-relaxed">
              Estamos listos para ayudarte con tus necesidades legales. Contáctanos hoy mismo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto mb-20">
            {/* Email Card - Diseño premium y sutil */}
            <a
              href="mailto:administracion@cflegal.cl"
              className="group relative bg-[#CDD4D8]/20 hover:bg-[#CDD4D8]/25 rounded-2xl p-10 border border-[#CDD4D8]/40 hover:border-[#8E1927]/60 transition-all duration-500 shadow-sm hover:shadow-md backdrop-blur-sm"
            >
              <div className="flex items-start gap-8">
                {/* Icono con fondo sutil y color burdeo */}
                <div className="flex-shrink-0 p-4 bg-transparent border border-[#8E1927]/20 rounded-xl group-hover:bg-[#8E1927]/5 transition-colors duration-500">
                  <Mail className="w-7 h-7 text-[#8E1927]" />
                </div>
                <div className="flex-1 min-w-0">
                  {/* Título de tarjeta con Raleway Medium */}
                  <h3 className="font-medium text-xl text-[#0F1822] mb-3 group-hover:text-[#042A3D] transition-colors duration-500 tracking-tight">
                    Email
                  </h3>
                  {/* Texto con Raleway Regular */}
                  <p className="font-raleway font-normal text-sm text-[#808184] break-all leading-relaxed">
                    administracion@cflegal.cl
                  </p>
                </div>
                {/* Flecha sutil */}
                <svg className="w-5 h-5 text-[#808184] group-hover:text-[#0F1822] group-hover:translate-x-1 transition-all duration-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>

            {/* Phone Card - Diseño premium y sutil */}
            <a
              href="tel:+56912345678"
              className="group relative bg-[#CDD4D8]/20 hover:bg-[#CDD4D8]/25 rounded-2xl p-10 border border-[#CDD4D8]/40 hover:border-[#8E1927]/60 transition-all duration-500 shadow-sm hover:shadow-md backdrop-blur-sm"
            >
              <div className="flex items-start gap-8">
                {/* Icono con fondo sutil y color burdeo */}
                <div className="flex-shrink-0 p-4 bg-transparent border border-[#8E1927]/20 rounded-xl group-hover:bg-[#8E1927]/5 transition-colors duration-500">
                  <Phone className="w-7 h-7 text-[#8E1927]" />
                </div>
                <div className="flex-1 min-w-0">
                  {/* Título de tarjeta con Raleway Medium */}
                  <h3 className="font-medium text-xl text-[#0F1822] mb-3 group-hover:text-[#042A3D] transition-colors duration-500 tracking-tight">
                    Teléfono
                  </h3>
                  {/* Texto con Raleway Regular */}
                  <p className="font-raleway font-normal text-sm text-[#808184] leading-relaxed">
                    +56 9 1234 5678
                  </p>
                </div>
                {/* Flecha sutil */}
                <svg className="w-5 h-5 text-[#808184] group-hover:text-[#0F1822] group-hover:translate-x-1 transition-all duration-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>

          {/* LinkedIn CTA - Opción A: Botón sólido premium */}
          <div className="text-center">
            <a
              href="https://linkedin.com/company/cflegal"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-5 px-12 py-5 bg-[#042A3D] hover:bg-[#0F1822] rounded-xl transition-all duration-500 font-medium text-base text-white shadow-sm hover:shadow-lg hover:scale-[1.02] w-full sm:w-auto max-w-sm tracking-tight"
            >
              <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform duration-500" />
              <span>Síguenos en LinkedIn</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-cf-dark-gray via-cf-blue to-cf-dark-gray border-t border-white/10 py-8 sm:py-10 md:py-12">
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Logo and tagline */}
            <div className="text-center md:text-left">
              <Image 
                src="/cf-legal-logo-horizontal.png" 
                alt="CF Legal" 
                width={150} 
                height={45} 
                className="w-auto h-8 sm:h-9 brightness-0 invert mx-auto md:mx-0 mb-3" 
              />
              <p className="font-normal text-white/60 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                Asesoría legal de excelencia para tu empresa y patrimonio
              </p>
            </div>
            
            {/* Quick links */}
            <div className="text-center">
              <h4 className="font-medium text-white text-sm sm:text-base mb-4 tracking-tight">Enlaces Rápidos</h4>
              <div className="flex flex-col gap-2">
                {["Nosotros", "Áreas de Práctica", "Equipo", "Contacto"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(
                      item.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    )}
                    className="font-normal text-white/70 hover:text-cf-burgundy text-xs sm:text-sm transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Social */}
            <div className="text-center md:text-right">
              <h4 className="font-medium text-white text-sm sm:text-base mb-4 tracking-tight">Síguenos</h4>
              <div className="flex gap-3 justify-center md:justify-end">
                <a
                  href="https://linkedin.com/company/cflegal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-cf-burgundy rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
                <a
                  href="mailto:administracion@cflegal.cl"
                  className="p-3 bg-white/10 hover:bg-cf-burgundy rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <Mail className="w-5 h-5 text-white" />
                </a>
                <a
                  href="tel:+56912345678"
                  className="p-3 bg-white/10 hover:bg-cf-burgundy rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <Phone className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-6 text-center">
            <p className="font-normal text-white/50 text-xs sm:text-sm">
              © {new Date().getFullYear()} CF Legal. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
