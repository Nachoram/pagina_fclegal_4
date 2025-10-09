import { render, screen, waitFor } from '@testing-library/react'
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
    jest.runAllTimers()

    // Wait for the main content section heading to appear (not the navigation button)
    await waitFor(() => {
      const nosotrosHeading = screen.getByRole('heading', { name: /^nosotros$/i, level: 2 })
      expect(nosotrosHeading).toBeInTheDocument()
    })

    // Now check that main content is visible - look for specific section headings
    expect(screen.getByRole('heading', { name: /áreas de práctica/i, level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /nuestro equipo/i, level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /contacta con nosotros/i, level: 2 })).toBeInTheDocument()
  })

  it('displays team member names after loading', async () => {
    render(<CFLegalPage />)

    // Fast-forward through loading animation
    jest.runAllTimers()

    // Wait for content to load
    await waitFor(() => {
      expect(screen.getByText('Sebastián Cuesta')).toBeInTheDocument()
    })

    // Check if team members are displayed
    expect(screen.getByText('Pedro Urrestarazu')).toBeInTheDocument()
    expect(screen.getByText('Mauro Inserrato')).toBeInTheDocument()
  })

  it('shows practice areas after loading', async () => {
    render(<CFLegalPage />)

    // Fast-forward through loading animation
    jest.runAllTimers()

    // Wait for content to load
    await waitFor(() => {
      expect(screen.getByText('Derecho Tributario')).toBeInTheDocument()
    })

    // Check if practice areas are displayed
    expect(screen.getByText('Gestión de Patrimonio')).toBeInTheDocument()
    expect(screen.getByText('Derecho Corporativo')).toBeInTheDocument()
    expect(screen.getByText('Derecho Inmobiliario')).toBeInTheDocument()
  })

  it('displays contact information after loading', async () => {
    render(<CFLegalPage />)

    // Fast-forward through loading animation
    jest.runAllTimers()

    // Wait for content to load
    await waitFor(() => {
      expect(screen.getByText('administracion@cflegal.cl')).toBeInTheDocument()
    })

    // Check contact information
    expect(screen.getByText('+56 9 1234 5678')).toBeInTheDocument()
  })
})
