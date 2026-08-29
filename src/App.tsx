import { AnimatePresence, motion } from 'framer-motion'
import { CalculatingScreen } from '@/features/result/CalculatingScreen'
import { ResultScreen } from '@/features/result/ResultScreen'
import { HomeScreen } from '@/features/home/HomeScreen'
import { QuizScreen } from '@/features/quiz/QuizScreen'
import { useAppStore } from '@/store/useAppStore'

const SCREENS = {
  home: HomeScreen,
  quiz: QuizScreen,
  calculating: CalculatingScreen,
  result: ResultScreen,
}

function App() {
  const screen = useAppStore((s) => s.screen)
  const ActiveScreen = SCREENS[screen]

  return (
    <div className="mx-auto min-h-dvh w-full max-w-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <ActiveScreen />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
