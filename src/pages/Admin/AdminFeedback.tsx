import { Trash2 } from "lucide-react"

type Feedback = {
    feedbackData: any,
    handleDelete: Function,
}

export function AdminFeedback({ feedbackData, handleDelete }: Feedback) {

    return (
        <div className="space-y-6">
            {feedbackData?.feedbacks.map((feedback: any) => (
                <div key={feedback.id} className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">{feedback.name}</h3>
                            <p className="text-sm text-gray-500">{feedback.email}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(feedback.id, 'feedback')}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-600">{feedback.message}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {feedback.type}
                        </span>
                        <span className="text-sm text-gray-500">
                            {new Date(feedback.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}