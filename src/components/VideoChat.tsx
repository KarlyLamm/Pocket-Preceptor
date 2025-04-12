import React, { useState, useEffect } from 'react';
import { Video, X, Mic, MicOff, VideoOff, Loader, FileText, GraduationCap } from 'lucide-react';
import preceptorVideo from '../assets/preceptor.mp4';
import nurseVideo from '../assets/nurse.mp4';

interface VideoChatProps {
  onClose: () => void;
}

interface Transcript {
  id: number;
  speaker: 'nurse' | 'user';
  text: string;
  timestamp: Date;
}

// Example videos for the demo
const DEMO_VIDEOS = {
  nurse: [
    "https://cdn.coverr.co/videos/coverr-a-female-doctor-talking-to-the-camera-5244/1080p.mp4",
    "https://cdn.coverr.co/videos/coverr-doctor-talking-to-the-camera-5243/1080p.mp4",
    "https://cdn.coverr.co/videos/coverr-female-doctor-talking-to-the-camera-5242/1080p.mp4",
    "https://cdn.coverr.co/videos/coverr-female-doctor-talking-to-the-camera-2-5241/1080p.mp4"
  ],
  user: [
    "https://cdn.coverr.co/videos/coverr-young-woman-talking-during-video-call-1584/1080p.mp4",
    "https://cdn.coverr.co/videos/coverr-person-using-laptop-4584/1080p.mp4",
    "https://cdn.coverr.co/videos/coverr-woman-having-a-video-call-3634/1080p.mp4"
  ]
};

export const VideoChat: React.FC<VideoChatProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [currentNurseVideo, setCurrentNurseVideo] = useState(0);
  const [currentUserVideo, setCurrentUserVideo] = useState(0);

  // Rotate through videos periodically
  useEffect(() => {
    if (!isLoading && !showSummary) {
      const nurseInterval = setInterval(() => {
        setCurrentNurseVideo(prev => (prev + 1) % DEMO_VIDEOS.nurse.length);
      }, 8000);

      const userInterval = setInterval(() => {
        setCurrentUserVideo(prev => (prev + 1) % DEMO_VIDEOS.user.length);
      }, 10000);

      return () => {
        clearInterval(nurseInterval);
        clearInterval(userInterval);
      };
    }
  }, [isLoading, showSummary]);

  // Simulate live transcription
  useEffect(() => {
    if (!isLoading && !showSummary) {
      const sampleConversation = [
        { speaker: 'nurse' as const, text: "Hello! I understand you have a question about IV medication compatibility?" },
        { speaker: 'user' as const, text: "Yes, I wanted to confirm if Vancomycin and Zosyn can be run in the same line?" },
        { speaker: 'nurse' as const, text: "That's a great question. No, Vancomycin and Zosyn should never be run in the same line due to the risk of precipitation." },
        { speaker: 'user' as const, text: "What would you recommend for administration then?" },
        { speaker: 'nurse' as const, text: "You'll need to use separate IV lines, or if using the same line, ensure thorough flushing between medications. Always follow your facility's protocol for line flushing." },
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
    // This would typically open your LMS system
    window.alert('Opening Learning Management System...');
  };

  if (showSummary) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FileText className="text-blue-600" />
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
                    <span className="font-medium text-gray-900 min-w-[60px]">
                      {transcript.speaker === 'nurse' ? 'Nurse:' : 'You:'}
                    </span>
                    <p className="text-gray-700">{transcript.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Recommendations</h3>
              <ul className="list-disc list-inside space-y-2 text-blue-800">
                <li>Use separate IV lines for Vancomycin and Zosyn</li>
                <li>Follow proper line flushing protocols between medications</li>
                <li>Consult facility guidelines for specific procedures</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={handleOpenLMS}
              className="w-full bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <GraduationCap size={20} />
              <span>Access Learning Management Tool</span>
            </button>
            <button
              onClick={handleClose}
              className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
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
            <Video className="text-blue-600" />
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
                <Loader size={48} className="text-blue-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">{loadingProgress}%</span>
                </div>
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-lg font-medium text-gray-900">Establishing Secure Connection</h3>
                <div className="flex flex-col items-center space-y-1">
                  <div className="h-2 w-64 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-500 ease-out"
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
                        transcript.speaker === 'nurse' ? 'text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <span className="font-medium min-w-[60px]">
                        {transcript.speaker === 'nurse' ? 'Nurse:' : 'You:'}
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
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
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