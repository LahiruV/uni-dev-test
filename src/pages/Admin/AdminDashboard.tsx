import React, { useEffect, useState } from 'react'
import { Inbox, MessageSquare, Trash2, RefreshCw, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import {
  useFeedbacks,
  useInquiries,
  useDeleteFeedback,
  useDeleteInquiry,
  useCompleteInquiry
} from '../../services/queries'
import { AdminFeedback } from './AdminFeedback'
import { AdminInquiry } from './AdminInquiry'

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'feedback' | 'inquiries'>('feedback')
  const queryClient = useQueryClient()

  const { data: feedbackData, isLoading: isFeedbackLoading, error: feedbackError } = useFeedbacks()
  const { data: inquiryData, isLoading: isInquiryLoading, error: inquiryError } = useInquiries()
  const deleteFeedbackMutation = useDeleteFeedback()
  const deleteInquiryMutation = useDeleteInquiry()
  const completeInquiryMutation = useCompleteInquiry()

  const handleDelete = async (id: string, type: 'feedback' | 'inquiry') => {
    if (type === 'feedback') {
      try {
        await deleteFeedbackMutation.mutateAsync(id)
        toast.success('Feedback deleted successfully!')
      }
      catch (error) {
        console.error('Error deleting feedback:', error)
        toast.error('Failed to delete feedback')
      }
    } else {
      try {
        await deleteInquiryMutation.mutateAsync(id)
        toast.success('Inquiry deleted successfully!')
      }
      catch (error) {
        console.error('Error deleting inquiry:', error)
        toast.error('Failed to delete inquiry')
      }
    }
  }

  const handleComplete = async (id: string) => {
    try {
      await completeInquiryMutation.mutateAsync(id)
      toast.success('Inquiry marked as complete!')
    } catch (error) {
      console.error('Error completing inquiry:', error)
      toast.error('Failed to complete inquiry')
    }
  }

  const isLoading = isFeedbackLoading || isInquiryLoading
  const error = feedbackError || inquiryError

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['feedbacks'] })
    queryClient.invalidateQueries({ queryKey: ['inquiries'] })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleRefresh}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error.message || String(error)}</p>
            </div>
          )}

          <div className="mt-4 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('feedback')}
                className={`${activeTab === 'feedback'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Feedback ({feedbackData?.feedbacks.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`${activeTab === 'inquiries'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Inbox className="h-5 w-5 mr-2" />
                Inquiries ({inquiryData?.inquiries.length || 0})
              </button>
            </nav>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'feedback' ? (
            <AdminFeedback
              feedbackData={feedbackData}
              handleDelete={handleDelete}
            />
          ) : (
            <AdminInquiry
              inquiryData={inquiryData}
              handleDelete={handleDelete}
              handleComplete={handleComplete}
            />
          )}
        </div>
      </div>
    </div >
  )
}