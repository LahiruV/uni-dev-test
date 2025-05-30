import { Hero } from '../../components/Hero'
import { MessageSquare, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useFeedbacks } from '../../services/queries'

interface FeedbackItem {
  id: string
  name: string
  message: string
  type: string
  createdAt: Date
}

export function Home() {
  const { data: feedbackResponse, isLoading, error } = useFeedbacks()

  return (
    <>
      <Hero />
      {/* Feedback Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <MessageSquare className="h-8 w-8 text-yellow-500" />
              <h2 className="text-3xl font-bold text-gray-900">Student Feedback</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear what our students have to say about their experience at Deakin University.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="col-span-3 text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-yellow-500" />
                <p className="mt-2 text-gray-600">Loading feedback...</p>
              </div>
            ) : error ? (
              <div className="col-span-3 text-center py-8">
                <p className="text-red-600">Error loading feedback</p>
              </div>
            ) : feedbackResponse?.feedbacks.map((feedback) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-gray-600 mb-4 italic">"{feedback.message}"</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{feedback.name}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}