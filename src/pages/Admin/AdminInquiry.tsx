import { CheckCircle, Trash2 } from 'lucide-react';

type Inquiry = {
    inquiryData: any,
    handleDelete: Function,
    handleComplete: Function,
}

export function AdminInquiry({ inquiryData, handleDelete, handleComplete }: Inquiry) {

    return (
        <div className="space-y-6">
            {inquiryData?.inquiries.map((inquiry: any) => (
                <div key={inquiry.id} className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">
                                {inquiry.firstName} {inquiry.lastName}
                            </h3>
                            <p className="text-sm text-gray-500">{inquiry.email}</p>
                            <p className="text-sm text-gray-500">{inquiry.phone}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(inquiry.id, 'inquiry')}
                            className="text-red-500 hover:text-red-700 ml-2"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Program</p>
                            <p className="mt-1 text-sm text-gray-900">{inquiry.program}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Start Date</p>
                            <p className="mt-1 text-sm text-gray-900">{inquiry.startDate}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-600">{inquiry.message}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center space-x-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${inquiry.priority === 'high'
                            ? 'bg-red-100 text-red-800'
                            : inquiry.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                            {inquiry.priority} priority
                        </span>
                        <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${inquiry.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                {inquiry.status === 'completed' ? 'Completed' : 'Pending'}
                            </span>
                            {inquiry.status === 'pending' && (
                                <button
                                    onClick={() => handleComplete(inquiry.id)}
                                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700"
                                >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Complete
                                </button>
                            )}
                        </div>
                        <span className="text-sm text-gray-500">
                            {new Date(inquiry.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}