import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function NavigationOverlay({ isOpen, onClose, navigationItems }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#141414] p-8 rounded-2xl border border-white/10"
            onClick={e => e.stopPropagation()}
          >
            <nav className="space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-white text-xl hover:text-[#e74600] transition-colors"
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 