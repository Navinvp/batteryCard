import { ThemeProvider } from './store/theme-context'

import ToggleTheme from './components/toggle-theme/toggle-theme'
import BatteryCard from './components/battery-card/battery-card'

import './App.css'

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen justify-center items-center gap-y-12">
        <ToggleTheme />
        <BatteryCard/>
      </div>
    </ThemeProvider>
  )
}

export default App
