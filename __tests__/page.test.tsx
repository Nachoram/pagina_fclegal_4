import '@testing-library/jest-dom'
import { render, screen, waitFor, act } from '@testing-library/react'
import CFLegalPage from '../app/page'

// Mock setTimeout and clearTimeout for controlling timing in tests
jest.useFakeTimers()

describe('CF Legal Landing Page', () => {
  beforeEach(() => {
    // Clear all timers before each test
    jest.clearAllTimers()
  })

  it('renders the loading logo initially', () => {
    render(<CFLegalPage />)

    // Check if the logo is initially visible (during loading animation)
    const logo = screen.getByAltText('CF Legal')
    expect(logo).toBeInTheDocument()
  })

  it('shows main content after loading animation', async () => {
    render(<CFLegalPage />)

    // Initially should show loading logo
    expect(screen.getByAltText('CF Legal')).toBeInTheDocument()

    // Fast-forward through all timers to complete the loading animation
    await act(async () => {
      jest.runAllTimers()
    })

    // Wait for the main content section heading to appear (not the navigation button)
    await waitFor(() => {
      const nosotrosHeading = screen.getByRole('heading', { name: /^nosotros$/i, level: 2 })
      expect(nosotrosHeading).toBeInTheDocument()
    })

    // Now check that main content is visible - look for specific section headings
    const areasHeadings = screen.getAllByRole('heading', { name: /áreas de práctica/i, level: 2 })
    expect(areasHeadings.length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: /nuestro equipo/i, level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /sigamos en contacto/i, level: 2 })).toBeInTheDocument()
  })

  it('displays team member names after loading', async () => {
    render(<CFLegalPage />)

    // Fast-forward through loading animation
    await act(async () => {
      jest.runAllTimers()
    })

    // Wait for content to load
    await waitFor(() => {
      expect(screen.getByText('Sebastián Cuesta')).toBeInTheDocument()
    })

    // Check if team members are displayed
    expect(screen.getByText('Pedro Urrestarazu')).toBeInTheDocument()
    expect(screen.getByText('Felipe Moreno Maturana')).toBeInTheDocument()
  })

  it('shows practice areas after loading', async () => {
    render(<CFLegalPage />)

    // Fast-forward through loading animation
    await act(async () => {
      jest.runAllTimers()
    })

    // Wait for content to load
    await waitFor(() => {
      const el = screen.getAllByText('Derecho Corporativo')
      expect(el.length).toBeGreaterThan(0)
    })

    // Check if practice areas are displayed
    expect(screen.getAllByText('Derecho Inmobiliario y de la Construcción').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Proyectos e Infraestructura').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Juicios y Arbitrajes').length).toBeGreaterThan(0)
  })

  it('displays contact information after loading', async () => {
    render(<CFLegalPage />)

    // Fast-forward through loading animation
    await act(async () => {
      jest.runAllTimers()
    })

    // Wait for content to load
    await waitFor(() => {
      expect(screen.getAllByText('administracion@cflegal.cl').length).toBeGreaterThan(0)
    })

    // Check contact information
    expect(screen.getAllByText('+56 9 1234 5678').length).toBeGreaterThan(0)
  })
})
