import React, { useState, useEffect } from 'react';
import { Video, X, Mic, MicOff, VideoOff, Loader, FileText, GraduationCap, Users } from 'lucide-react';
import preceptorVideo from '../assets/preceptor.mp4';
import nurseVideo from '../assets/nurse.mp4';
import { LearningManagement } from './LearningManagement';

interface VideoChatProps {
  onClose: () => void;
}

interface Transcript {
  id: number;
  speaker: 'preceptor' | 'nurse';
  text: string;
  timestamp: Date;
}

export const VideoChat: React.FC<VideoChatProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showLearningManagement, setShowLearningManagement] = useState(false);

  // Simulate live transcription
  useEffect(() => {
    if (!isLoading && !showSummary) {
      const sampleConversation = [
        { speaker: 'preceptor' as const, text: "Hello! I'm Preceptor Sarah. How can I help you today?" },
        { speaker: 'nurse' as const, text: "Hi Sarah, I have a question about IV medication compatibility." },
        { speaker: 'preceptor' as const, text: "Of course! What medications are you wondering about?" },
        { speaker: 'nurse' as const, text: "Can Vancomycin and Zosyn be run in the same line?" },
        { speaker: 'preceptor' as const, text: "That's a great question. No, Vancomycin and Zosyn should never be run in the same line due to the risk of precipitation." },
        { speaker: 'nurse' as const, text: "What would you recommend for administration then?" },
        { speaker: 'preceptor' as const, text: "You'll need to use separate IV lines, or if using the same line, ensure thorough flushing between medications. Always follow your facility's protocol for line flushing." },
      ];

      let index = 0;
      const interval = setInterval(() => {
        if (index < sampleConversation.length) {
          setTranscripts(prev => [...prev, {
            id: Date.now(),
            ...sampleConversation[index],
            timestamp: new Date()
          }]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isLoading, showSummary]);

  useEffect(() => {
    // Simulate connection progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 500);

    // Simulate connection completion
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleEndCall = () => {
    setShowSummary(true);
  };

  const handleClose = () => {
    setShowSummary(false);
    onClose();
  };

  const handleOpenLMS = () => {
    setShowLearningManagement(true);
  };

  if (showLearningManagement) {
    return <LearningManagement onClose={() => setShowLearningManagement(false)} />;
  }

  if (showSummary) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FileText className="text-[#102f4d]" />
              Call Summary
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Key Points Discussed</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>IV medication compatibility between Vancomycin and Zosyn</li>
                <li>Proper administration protocol for incompatible medications</li>
                <li>Facility-specific line flushing procedures</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Conversation Transcript</h3>
              <div className="max-h-64 overflow-y-auto space-y-3">
                {transcripts.map(transcript => (
                  <div key={transcript.id} className="flex gap-2">
                    <span className="font-medium text-gray-900 min-w-[80px] flex-shrink-0">
                      {transcript.speaker === 'nurse' ? 'Nurse:' : 'Preceptor:'}
                    </span>
                    <p className="text-gray-700 flex-1">{transcript.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#102f4d] bg-opacity-10 rounded-lg p-4">
              <h3 className="font-medium text-[#102f4d] mb-2">Recommendations</h3>
              <ul className="list-disc list-inside space-y-2 text-[#102f4d]">
                <li>Use separate IV lines for Vancomycin and Zosyn</li>
                <li>Follow proper line flushing protocols between medications</li>
                <li>Consult facility guidelines for specific procedures</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={handleOpenLMS}
              className="w-full bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
            >
              <GraduationCap size={20} />
              <span>Access Learning Management Tool</span>
            </button>
            <a
              href="https://nursecommunity.pocketpreceptor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
            >
              <Users size={20} />
              <span>Join Our Forum Community</span>
            </a>
            <button
              onClick={handleClose}
              className="w-full bg-[#102f4d] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Close Summary
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Video className="text-[#102f4d]" />
            {isLoading ? 'Connecting to Preceptor' : 'Connected with Preceptor Sarah'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
          {isLoading ? (
            <div className="aspect-video bg-gray-50 rounded-lg flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                <Loader size={48} className="text-[#102f4d] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-medium text-[#102f4d]">{loadingProgress}%</span>
                </div>
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-lg font-medium text-gray-900">Establishing Secure Connection</h3>
                <div className="flex flex-col items-center space-y-1">
                  <div className="h-2 w-64 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#102f4d] transition-all duration-500 ease-out"
                      style={{ width: `${loadingProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    {loadingProgress < 50 
                      ? 'Initializing video stream...'
                      : loadingProgress < 75
                      ? 'Connecting to available preceptor...'
                      : 'Almost ready...'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Remote Video (Nurse) */}
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                  <video
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                    src={preceptorVideo}
                  />
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    Preceptor Sarah
                  </div>
                </div>
                
                {/* Local Video (User) */}
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                  {isVideoOn ? (
                    <video
                      autoPlay
                      loop
                      muted
                      className="w-full h-full scale-x-[-1]"
                      src={nurseVideo}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <div className="text-white text-center">
                        <VideoOff size={48} className="mx-auto mb-2" />
                        <p>Camera Off</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    You
                  </div>
                </div>
              </div>

              {/* Live Transcription */}
              <div className="mt-4 bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Live Transcription</h3>
                <div className="space-y-2">
                  {transcripts.map(transcript => (
                    <div
                      key={transcript.id}
                      className={`flex gap-2 items-start animate-fade-in ${
                        transcript.speaker === 'nurse' ? 'text-[#102f4d]' : 'text-gray-700'
                      }`}
                    >
                      <span className="font-medium min-w-[60px]">
                        {transcript.speaker === 'nurse' ? 'Nurse:' : 'Preceptor:'}
                      </span>
                      <p className="flex-1">{transcript.text}</p>
                      <span className="text-xs text-gray-500">
                        {transcript.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="p-4 border-t">
          {!isLoading ? (
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full transition-colors ${
                  isMuted ? 'bg-red-500' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {isMuted ? <MicOff className="text-white" /> : <Mic className="text-gray-700" />}
              </button>
              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3 rounded-full transition-colors ${
                  !isVideoOn ? 'bg-red-500' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {!isVideoOn ? <VideoOff className="text-white" /> : <Video className="text-gray-700" />}
              </button>
              <button
                onClick={handleEndCall}
                className="bg-[#102f4d] text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors"
              >
                End Call
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p className="text-sm">Your privacy and security are our top priority</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};