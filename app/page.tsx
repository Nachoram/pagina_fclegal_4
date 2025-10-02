"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Mail, Phone, Linkedin } from "lucide-react"
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
    name: "María Fernández",
    title: "Asociada Senior",
    photo: "/professional-lawyer-portrait-female.jpg",
    photoColor: "/professional-lawyer-portrait-female-color.jpg",
    education: [
      "Licenciada en Derecho, Pontificia Universidad Católica",
      "Diplomado en Derecho Corporativo, Universidad de los Andes",
    ],
    experience: [
      "Asociada Senior, CF Legal (2024 - Presente)",
      "Asociada, Estudio Corporativo (2019 - 2024)",
      "Abogada Junior, Firma Internacional (2016 - 2019)",
    ],
    email: "mfernandez@cflegal.cl",
    linkedin: "https://linkedin.com/in/mariafernandez",
  },
  {
    id: "3",
    name: "Pedro Ramírez",
    title: "Socio",
    photo: "/professional-lawyer-portrait-male-senior.jpg",
    photoColor: "/professional-lawyer-portrait-male-senior-color.jpg",
    education: ["Licenciado en Derecho, Universidad de Chile", "MBA, Universidad Adolfo Ibáñez"],
    experience: [
      "Socio Fundador, CF Legal (2024 - Presente)",
      "Gerente Legal, Corporación Multinacional (2017 - 2024)",
      "Asociado Senior, Estudio Tributario (2012 - 2017)",
    ],
    email: "pramirez@cflegal.cl",
    linkedin: "https://linkedin.com/in/pedroramirez",
  },
  {
    id: "4",
    name: "Carolina Torres",
    title: "Asociada",
    photo: "/professional-lawyer-portrait-female-young.jpg",
    photoColor: "/professional-lawyer-portrait-female-young-color.jpg",
    education: [
      "Licenciada en Derecho, Universidad de los Andes",
      "Diplomado en Derecho Inmobiliario, Universidad Católica",
    ],
    experience: ["Asociada, CF Legal (2023 - Presente)", "Abogada Junior, Estudio Inmobiliario (2020 - 2023)"],
    email: "ctorres@cflegal.cl",
    linkedin: "https://linkedin.com/in/carolinatorres",
  },
]

const practiceAreas = ["Derecho Tributario", "Gestión de Patrimonio", "Derecho Corporativo", "Derecho Inmobiliario"]

export default function CFLegalPage() {
  const [showLogo, setShowLogo] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [hoveredMember, setHoveredMember] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false)
    }, 3000)

    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearTimeout(timer)
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
    }
  }

  if (showLogo) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#4A5568]">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20-VgZn2an7wzNpqvKuR31shACLygdT1E.png"
          alt="CF Legal"
          width={400}
          height={120}
          className="w-auto h-24"
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
        <div className="container mx-auto px-8 py-5 flex items-center justify-between">
          <div
            className={`flex items-center transition-all duration-500 ${
              scrolled ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8 pointer-events-none"
            }`}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20-VgZn2an7wzNpqvKuR31shACLygdT1E.png"
              alt="CF Legal"
              width={200}
              height={60}
              className="h-14 w-auto"
            />
          </div>
          <nav
            className={`hidden md:flex items-center gap-10 transition-all duration-500 ${
              scrolled ? "ml-auto" : "mx-auto"
            }`}
          >
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
                className={`font-raleway font-normal text-base transition-colors duration-300 uppercase tracking-wide ${
                  scrolled ? "text-cf-dark-gray hover:text-cf-burgundy" : "text-white hover:text-cf-burgundy"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center">
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
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-raleway font-bold text-4xl md:text-5xl text-cf-dark-gray text-center mb-16">Nosotros</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-4">
              <p className="font-arial text-lg text-cf-gray leading-relaxed">
                En CF Legal, nos comprometemos a brindar una asesoría de excelencia, eficiente e innovadora. Nuestro
                equipo de profesionales altamente calificados trabaja de manera cercana con cada cliente, entendiendo
                sus necesidades específicas y ofreciendo soluciones jurídicas personalizadas que generan valor real para
                sus negocios y patrimonios.
              </p>
            </div>
            <div className="space-y-4">
              <p className="font-arial text-lg text-cf-gray leading-relaxed">
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
      <section id="areas-de-practica" className="py-24 bg-cf-light-gray">
        <div className="container mx-auto px-6">
          <h2 className="font-raleway font-bold text-4xl md:text-5xl text-cf-dark-gray text-center mb-16">
            Áreas de Práctica
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {practiceAreas.map((area, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 p-8 flex items-center justify-center min-h-[200px] border-t-4 border-cf-burgundy"
              >
                <h3 className="font-raleway font-semibold text-xl text-cf-dark-gray text-center group-hover:text-cf-burgundy transition-colors duration-300">
                  {area}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo Section */}
      <section id="equipo" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-raleway font-bold text-4xl md:text-5xl text-cf-dark-gray text-center mb-16">
            Nuestro Equipo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
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
                    className={`font-raleway font-semibold text-xl mb-2 transition-colors duration-300 ${
                      hoveredMember === member.id ? "text-cf-burgundy" : "text-cf-dark-gray"
                    }`}
                  >
                    {member.name}
                  </h3>
                  <p className="font-arial text-cf-gray">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Member Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedMember && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="sr-only">{selectedMember.name}</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="relative w-48 h-48 rounded-lg overflow-hidden">
                    <Image
                      src={selectedMember.photoColor || "/placeholder.svg"}
                      alt={selectedMember.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-raleway font-bold text-3xl text-cf-dark-gray mb-2">{selectedMember.name}</h3>
                  <p className="font-arial text-lg text-cf-gray mb-6">{selectedMember.title}</p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-raleway font-semibold text-xl text-cf-dark-gray mb-3">Educación</h4>
                      <ul className="space-y-2">
                        {selectedMember.education.map((edu, index) => (
                          <li key={index} className="font-arial text-cf-gray leading-relaxed">
                            • {edu}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-raleway font-semibold text-xl text-cf-dark-gray mb-3">
                        Experiencia Profesional
                      </h4>
                      <ul className="space-y-2">
                        {selectedMember.experience.map((exp, index) => (
                          <li key={index} className="font-arial text-cf-gray leading-relaxed">
                            • {exp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-cf-light-gray">
                      <a
                        href={`mailto:${selectedMember.email}`}
                        className="font-arial text-cf-blue hover:text-cf-burgundy transition-colors duration-200"
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
      <section id="contacto" className="py-24 bg-cf-dark-gray text-white">
        <div className="container mx-auto px-6">
          <h2 className="font-raleway font-bold text-4xl md:text-5xl text-center mb-16">Sigamos en Contacto</h2>
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <a
                href="mailto:administracion@cflegal.cl"
                className="flex items-center gap-3 text-lg hover:text-cf-burgundy transition-colors duration-200"
              >
                <Mail className="w-6 h-6" />
                <span className="font-arial">administracion@cflegal.cl</span>
              </a>
              <a
                href="tel:+56912345678"
                className="flex items-center gap-3 text-lg hover:text-cf-burgundy transition-colors duration-200"
              >
                <Phone className="w-6 h-6" />
                <span className="font-arial">+56 9 1234 5678</span>
              </a>
            </div>
            <div className="flex justify-center">
              <a
                href="https://linkedin.com/company/cflegal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-cf-burgundy hover:bg-cf-burgundy/90 rounded-lg transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5" />
                <span className="font-raleway font-medium">Síguenos en LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cf-dark-gray border-t border-cf-gray/20 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20-VgZn2an7wzNpqvKuR31shACLygdT1E.png"
              alt="CF Legal"
              width={150}
              height={45}
              className="w-auto h-10"
            />
            <p className="font-arial text-cf-light-gray text-sm">
              © {new Date().getFullYear()} CF Legal. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
