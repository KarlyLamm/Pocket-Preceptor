import React from 'react';
import { X, Book, FileText, AlertTriangle, GraduationCap } from 'lucide-react';

interface LearningManagementProps {
  onClose: () => void;
}

interface LearningResource {
  id: number;
  title: string;
  description: string;
  type: 'article' | 'guideline' | 'warning';
  icon: React.ReactNode;
}

export const LearningManagement: React.FC<LearningManagementProps> = ({ onClose }) => {
  const resources: LearningResource[] = [
    {
      id: 1,
      title: "Understanding IV Medication Compatibility",
      description: "A comprehensive guide to IV medication compatibility, focusing on common drug interactions and best practices for administration.",
      type: 'article',
      icon: <Book style={{ color: '#102F4D' }} />
    },
    {
      id: 2,
      title: "Vancomycin Administration Guidelines",
      description: "Detailed protocols for Vancomycin administration, including dosing, monitoring, and compatibility considerations.",
      type: 'guideline',
      icon: <FileText style={{ color: '#0D9488' }} />
    },
    {
      id: 3,
      title: "Zosyn (Piperacillin/Tazobactam) Best Practices",
      description: "Essential information about Zosyn administration, including compatibility, dosing, and monitoring requirements.",
      type: 'guideline',
      icon: <FileText style={{ color: '#0D9488' }} />
    },
    {
      id: 4,
      title: "Critical IV Compatibility Warnings",
      description: "Important warnings about incompatible IV medications, with special focus on Vancomycin and Zosyn precipitation risks.",
      type: 'warning',
      icon: <AlertTriangle className="text-red-500" />
    },
    {
      id: 5,
      title: "IV Line Management and Flushing Protocols",
      description: "Best practices for IV line management, including proper flushing techniques and timing between incompatible medications.",
      type: 'guideline',
      icon: <FileText style={{ color: '#0D9488' }} />
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(16, 47, 77, 0.1)' }}>
              <GraduationCap style={{ color: '#102F4D' }} size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold" style={{ color: '#102F4D' }}>Learning Resources</h2>
              <p className="text-gray-600">Based on your recent chat history</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="space-y-6">
            {resources.map(resource => (
              <div
                key={resource.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#102F4D] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(16, 47, 77, 0.05)' }}>
                    {resource.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600">
                      {resource.description}
                    </p>
                    <div className="mt-4">
                      <button className="font-medium flex items-center gap-2" style={{ color: '#102F4D' }}>
                        <span>Read More</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="w-full text-white px-6 py-3 rounded-xl hover:opacity-90 transition-colors font-medium"
            style={{ backgroundColor: '#102F4D' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}; 