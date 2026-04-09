"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Mail, Linkedin, Home, Briefcase, Menu, X, Building2, Gavel } from "lucide-react"
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
    photo: "/default-avatar.svg",
    photoColor: "/default-avatar.svg",
    education: [
      "Abogado, Universidad Diego Portales (2007 - 2013)",
      "MBA, Pontificia Universidad Católica de Chile (2020 - 2022)",
      "Intercambio Académico, Tilburg University (2011 - 2012)",
    ],
    experience: [
      "Socio, CF Legal (2025 - Presente)",
      "Socio, ARH Abogados - Aldunate Ramírez Horwitz (2020 - 2025)",
      "Abogado, ARH Abogados - Aldunate Ramírez Horwitz (2018 - 2025)",
      "Abogado Asociado, Aldunate & Cía. (2013 - 2018)",
    ],
    email: "scuesta@cflegal.cl",
    linkedin: "https://www.linkedin.com/in/sebastian-cuesta/",
  },
  {
    id: "2",
    name: "Pedro Urrestarazu",
    title: "Abogado",
    photo: "/default-avatar.svg",
    photoColor: "/default-avatar.svg",
    education: [
      "Licenciado en Ciencias Sociales, Pontificia Universidad Católica de Chile (2012 - 2016)",
      "Licenciado en Derecho, Pontificia Universidad Católica de Chile",
    ],
    experience: [
      "Abogado, CF Legal (2025 - Presente)",
      "Abogado, ARH Abogados - Aldunate Ramírez Horwitz (2022 - 2025)",
      "Abogado, ICUADRA (2020 - 2022)",
    ],
    email: "purrestarazu@cflegal.cl",
    linkedin: "https://linkedin.com/in/pedro-urrestarazu-gonzález-77043b158",
  },
  {
    id: "3",
    name: "Felipe Moreno",
    title: "Abogado",
    photo: "/default-avatar.svg",
    photoColor: "/default-avatar.svg",
    education: [
      "Licenciado en Ciencias Jurídicas y Sociales, Universidad del Desarrollo (2014)",
      "Curso Regulación de la Industria Acuícola y Medioambiente, Universidad del Desarrollo (2024)",
      "Curso Contabilidad para Abogados, Universidad del Desarrollo (2018)",
    ],
    experience: [
      "Abogado, CF Legal (2025 - Presente)",
      "Abogado, SACYR (2018 - 2024)",
    ],
    email: "fmoreno@cflegal.cl",
    linkedin: "https://linkedin.com/in/felipe-moreno-maturana",
  },
]

const practiceAreas = [
  {
    name: "Derecho Corporativo",
    icon: Briefcase,
    description: "Asesoría propia de la operación de empresas.",
    details: "Gobierno Corporativo, diseño y estandarización de procesos de contratación, gestión integral de contratos: negociación, preparación y cierre."
  },
  {
    name: "Proyectos e Infraestructura",
    icon: Building2,
    description: "Asesoría durante toda la vida de los proyectos.",
    details: "Etapas de diseño y estudio, su adjudicación, ejecución y cierre."
  },
  {
    name: "Derecho Inmobiliario",
    icon: Home,
    description: "Desarrollo de proyectos inmobiliarios.",
    details: "Asesoría en la negociación, due diligence, escrituración y cierre de proyectos inmobiliarios."
  },
  {
    name: "Juicios y Arbitrajes",
    icon: Gavel,
    description: "Resolución de controversias.",
    details: "Representación en litigios civiles y comerciales en sede ordinaria y arbitral."
  }
]
const currentYear = new Date().getFullYear();

export default function CFLegalPage() {
  const [showLogo, setShowLogo] = useState(true)
  const [logoVisible, setLogoVisible] = useState(false)
  const [logoFading, setLogoFading] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [hoveredMember, setHoveredMember] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedBoxes, setExpandedBoxes] = useState<Set<number>>(new Set())

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
      // Close mobile menu on scroll if open
      setMobileMenuOpen(prev => prev ? false : prev)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      clearTimeout(showTimer)
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, []) // Empty dependency array prevents restart on mobilemenu toggle

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const scrollToSection = useCallback((id: string) => {
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
  }, [])

  const toggleBoxExpansion = useCallback((boxIndex: number) => {
    setExpandedBoxes(prev => {
      const newExpandedBoxes = new Set(prev)
      if (newExpandedBoxes.has(boxIndex)) {
        newExpandedBoxes.delete(boxIndex)
      } else {
        newExpandedBoxes.add(boxIndex)
      }
      return newExpandedBoxes
    })
  }, [])

  if (showLogo) {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[#CDD4D8] transition-opacity duration-1000 ease-in-out ${logoFading ? 'opacity-0' : logoVisible ? 'opacity-100' : 'opacity-0'
        }`}>
        <div className="px-6 sm:px-8">
          <Image
            src="/cf-legal-logo-horizontal.png"
            alt="CF Legal"
            width={400}
            height={120}
            className={`w-auto h-[240px] xs:h-[300px] sm:h-[360px] md:h-[440px] lg:h-[560px] max-w-[95vw] ${logoFading ? 'opacity-0 scale-90' : logoVisible ? 'animate-logo-entrance' : 'opacity-0 scale-95'
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"
          }`}
      >
        <div className="w-full md:w-[95%] mx-auto px-4 sm:px-6 md:px-4 flex items-start justify-between max-w-[100vw] h-[64px] sm:h-[80px] md:h-[96px]">
          <div className="flex items-center min-w-0 flex-shrink">
            <Image
              src="/cf-legal-logo-horizontal.png"
              alt="CF Legal"
              width={518}
              height={144}
              className={`h-[96px] sm:h-[120px] md:h-[144px] w-auto block origin-left transition-all duration-500 -mt-2 sm:-mt-4 md:-mt-6 ${scrolled ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 ml-auto mr-[1cm] self-center">
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
                className={`font-medium text-base transition-colors duration-300 uppercase tracking-wider ${scrolled ? "text-[#0F1822] hover:text-cf-burgundy" : "text-white hover:text-cf-burgundy"
                  }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 sm:p-2.5 z-50 rounded-md transition-colors active:scale-95 flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center self-center"
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
            src="/hola (5).svg"
            alt="CF Legal Hero"
            fill
            sizes="100vw"
            className="object-cover object-center scale-[1.48] md:scale-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cf-dark-gray/80 via-cf-blue/70" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 sm:px-8 w-full max-w-4xl mx-auto">
          <div className="mb-8 md:mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Image
              src="/cf-legal-slash-logo.png"
              alt="CF Legal"
              width={800}
              height={1200}
              sizes="(max-width: 640px) 600px, (max-width: 768px) 720px, (max-width: 1024px) 960px, (max-width: 1280px) 1120px, 1280px"
              className="w-auto h-[280px] sm:h-[350px] md:h-[480px] lg:h-[560px] xl:h-[640px] max-w-[600px] sm:max-w-[720px] md:max-w-[960px] lg:max-w-[1120px] xl:max-w-[1280px] mx-auto logo-quality-enhance"
              style={{
                filter: 'drop-shadow(0 4px 18px rgba(0, 0, 0, 0.4)) contrast(1.05) brightness(1.02)',
                transform: 'translateZ(0)',
              }}
              quality={95}
              priority
              unoptimized={false}
            />
          </div>
        </div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-brand-bordeaux/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-bordeaux/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-5 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#0F1822] mb-6 leading-tight tracking-[0.2em] uppercase">
              <span className="font-bold">NOSOTROS</span>
            </h2>

            <p className="font-light text-xl sm:text-2xl md:text-3xl text-[#808184] max-w-5xl mx-auto leading-relaxed">
              Somos un equipo altamente <span className="font-bold text-[#0F1822] text-[1.1em] sm:text-[1.2em]">comprometido</span> con la comprensión del negocio, la <span className="font-bold text-[#0F1822] text-[1.1em] sm:text-[1.2em]">cultura organizacional</span> y las <span className="font-bold text-[#0F1822] text-[1.1em] sm:text-[1.2em]">necesidades particulares</span> de nuestros clientes.
            </p>
          </div>
        </div>
      </section>




      {/* Áreas de Práctica Section */}
      <section id="areas-de-practica" className="py-20 sm:py-24 md:py-32 lg:py-40 bg-white relative overflow-hidden">


        <div className="container mx-auto px-5 sm:px-6 max-w-5xl relative z-10">
          {/* Title */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#0F1822] mb-6 leading-tight tracking-[0.2em] uppercase">
              ÁREAS DE <span className="font-bold">PRÁCTICA</span>
            </h2>

          </div>

          {/* Practice areas list */}
          <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10">
            {practiceAreas.map((area, index) => (
              <div
                key={index}
                className="group text-center w-full max-w-2xl"
              >
                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <area.icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#8E1927] opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" strokeWidth={1.5} />
                </div>

                {/* Area name with bold keyword */}
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#042A3D] tracking-[0.15em] uppercase transition-colors duration-300 group-hover:text-[#8E1927]">
                  {area.name.split(' ').map((word, i) => {
                    const boldWords = ['CORPORATIVO', 'PROYECTOS', 'E', 'INFRAESTRUCTURA', 'INMOBILIARIO', 'ARBITRAJES']
                    const isBold = boldWords.includes(word.toUpperCase().replace(/[^A-ZÁÉÍÓÚÑ]/g, ''))
                    return (
                      <span key={i} className={isBold ? 'font-bold' : 'font-light'}>
                        {word}{i < area.name.split(' ').length - 1 ? ' ' : ''}
                      </span>
                    )
                  })}
                </h3>

                {/* Expansion button */}
                <button
                  onClick={() => toggleBoxExpansion(index)}
                  className="mt-6 text-[#8E1927] hover:text-[#0F1822] text-xs font-semibold uppercase tracking-widest transition-all flex items-center gap-2 mx-auto"
                >
                  {expandedBoxes.has(index) ? "Cerrar" : "Ver más"}
                  <svg 
                    className={`w-3.5 h-3.5 transition-transform duration-500 ${expandedBoxes.has(index) ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Details (Expansion) */}
                <div className={`overflow-hidden transition-all duration-700 ease-in-out ${expandedBoxes.has(index) ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                  <div className="space-y-4 px-4">
                    <p className="font-semibold text-sm sm:text-base text-[#0F1822] leading-relaxed">
                      {area.description}
                    </p>
                    <p className="font-light text-sm sm:text-base text-[#0F1822]/80 max-w-lg mx-auto leading-relaxed border-t border-[#CDD4D8] pt-4">
                      {area.details}
                    </p>
                  </div>
                </div>

                {/* Subtle divider between items */}
                {index < practiceAreas.length - 1 && (
                  <div className={`w-12 h-px bg-[#CDD4D8] mx-auto transition-all duration-500 ${expandedBoxes.has(index) ? 'mt-8 sm:mt-10' : 'mt-6 sm:mt-8'}`} />
                )}
              </div>
            ))}
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

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight tracking-[0.2em] uppercase">
              NUESTRO <span className="font-bold">EQUIPO</span>
            </h2>

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
                <div className="relative rounded-lg p-6 sm:p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-cf-burgundy/20">

                  <div className="relative">

                    <div className="text-center">
                      <h3 className={`font-bold text-xl sm:text-2xl mb-2 transition-colors duration-300 leading-tight tracking-tight ${hoveredMember === member.id ? "text-cf-burgundy" : "text-white"
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
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center animate-in fade-in duration-1000 slide-in-from-bottom-4">
            <p className="font-light text-xs sm:text-sm text-white/40 tracking-[0.3em] uppercase">
              Toca para ver perfil completo
            </p>
          </div>
        </div>
      </section>

      {/* Team Member Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-[96vw] sm:max-w-[90vw] md:max-w-2xl lg:max-w-3xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-white border-0 shadow-lg">
          {selectedMember && (
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <DialogHeader>
                <DialogTitle className="sr-only">{selectedMember.name}</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-8">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-xl sm:text-2xl md:text-3xl text-gray-900 mb-1 sm:mb-1.5 md:mb-2 leading-tight tracking-tight">
                    {selectedMember.name}
                  </h3>
                  <p className="font-normal text-sm sm:text-base md:text-lg text-gray-700 mb-3 sm:mb-4 md:mb-6">
                    {selectedMember.title}
                  </p>

                  <div className="space-y-3 sm:space-y-4 md:space-y-6">
                    <div>
                      <h4 className="font-medium text-base sm:text-lg md:text-xl text-gray-900 mb-2 sm:mb-2.5 md:mb-3 flex items-center gap-2 tracking-tight">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cf-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Educación
                      </h4>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {selectedMember.education.map((edu, index) => (
                          <li key={index} className="font-normal text-[13px] sm:text-sm md:text-base text-gray-700 leading-relaxed pl-2">
                            • {edu}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-base sm:text-lg md:text-xl text-gray-900 mb-2 sm:mb-2.5 md:mb-3 flex items-center gap-2 tracking-tight">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cf-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Experiencia Profesional
                      </h4>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {selectedMember.experience.map((exp, index) => (
                          <li key={index} className="font-normal text-[13px] sm:text-sm md:text-base text-gray-700 leading-relaxed pl-2">
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
          <div className="text-center mb-12 sm:mb-16 md:mb-20">

            {/* Título principal al estilo de las otras secciones */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#0F1822] mb-6 leading-tight tracking-[0.2em] uppercase">
              SIGAMOS EN <span className="font-bold">CONTACTO</span>
            </h2>

          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-24 lg:gap-32 max-w-5xl mx-auto">
            {/* Email */}
            <a
              href="mailto:administracion@cflegal.cl"
              className="group flex flex-col items-center text-center transition-all duration-500"
            >
              <div className="mb-5 flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-1">
                <Mail className="w-10 h-10 text-[#8E1927]" strokeWidth={1} />
              </div>
              <h3 className="font-medium text-xl text-[#0F1822] mb-2 group-hover:text-[#8E1927] transition-colors duration-500 tracking-widest uppercase">
                Email
              </h3>
              <p className="font-raleway font-light text-base text-[#808184] group-hover:text-[#0F1822] transition-colors duration-500">
                administracion@cflegal.cl
              </p>
            </a>


            {/* LinkedIn */}
            <a
              href="https://linkedin.com/company/cflegal"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center transition-all duration-500"
            >
              <div className="mb-5 flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-1">
                <Linkedin className="w-10 h-10 text-[#8E1927]" strokeWidth={1} />
              </div>
              <h3 className="font-medium text-xl text-[#0F1822] mb-2 group-hover:text-[#8E1927] transition-colors duration-500 tracking-widest uppercase">
                LinkedIn
              </h3>
              <p className="font-raleway font-light text-base text-[#808184] group-hover:text-[#0F1822] transition-colors duration-500 flex items-center gap-1.5">
                Síguenos <span className="transform group-hover:translate-x-1 transition-transform inline-block">→</span>
              </p>
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
                width={500}
                height={140}
                className="w-auto h-24 sm:h-28 md:h-32 brightness-0 invert mx-auto md:mx-0 mb-6"
              />
            </div>

            {/* Quick links */}
            <div className="text-center">
              <h4 className="font-medium text-white text-base sm:text-lg mb-4 tracking-tight">Enlaces Rápidos</h4>
              <div className="flex flex-col gap-2">
                {["Nosotros", "Áreas de Práctica", "Equipo", "Contacto"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(
                      item.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    )}
                    className="font-normal text-white/70 hover:text-cf-burgundy text-sm sm:text-base transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="text-center md:text-right">
              <h4 className="font-medium text-white text-base sm:text-lg mb-4 tracking-tight">Síguenos</h4>
              <div className="flex gap-3 justify-center md:justify-end">
                <a
                  href="https://linkedin.com/company/cflegal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-cf-burgundy rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-6 h-6 text-white" />
                </a>
                <a
                  href="mailto:administracion@cflegal.cl"
                  className="p-3 bg-white/10 hover:bg-cf-burgundy rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <Mail className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center">
            <p className="font-normal text-white/50 text-xs sm:text-sm">
              © {currentYear} CF Legal. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
