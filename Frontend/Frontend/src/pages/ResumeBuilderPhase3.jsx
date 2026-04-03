import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Mic,
  MicOff,
  Loader2,
  Sparkles,
  Target,
  Brain,
  Award,
  Clock,
  Edit,
  Send,
  RefreshCw,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  User,
  Bot,
  Camera,
  CameraOff,
  Shield,
  Video,
  VideoOff,
} from "lucide-react";

import api from "../configs/api";
import PhaseHeader from "../components/PhaseHeader";
import toast from "react-hot-toast";

const ResumeBuilderPhase3 = () => {
  const { resumeId } = useParams();
  // Guard against undefined auth slice during early render
  const token = useSelector((state) => state.auth?.token);

  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [listening, setListening] = useState(false);
  const [loadingQ, setLoadingQ] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [feedback, setFeedback] = useState(null);
  
  // Security feature states
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [screenshots, setScreenshots] = useState([]);
  const [showSecurityWarning, setShowSecurityWarning] = useState(false);
  const [securityViolations, setSecurityViolations] = useState(0);
  const [lastCaptureTime, setLastCaptureTime] = useState(null);
  const [cameraInitialized, setCameraInitialized] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [videoReady, setVideoReady] = useState(false);

  const recognitionRef = useRef(null);
  const textareaRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const screenshotIntervalRef = useRef(null);
  const fileInputRef = useRef(null);

  // ==============================
  // CAMERA SECURITY FEATURE
  // ==============================
  const startCamera = useCallback(async () => {
    try {
      console.log("Starting camera...");
      setCameraError(null);
      setVideoReady(false);
      // Check if there are any video input devices first
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some(d => d.kind === 'videoinput');
      if (!hasCamera) {
        throw new Error('No camera device found');
      }

      const constraints = { 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Camera stream obtained:', stream);

      if (!videoRef.current) {
        console.error('Video ref is null');
        // stop tracks to avoid leaked camera access
        stream.getTracks().forEach(t => t.stop());
        throw new Error('Video element not mounted');
      }

      // Attach stream and attempt to play immediately. Some browsers
      // may fire loadedmetadata before handler registration, so call play()
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setCameraPermission(true);
      setCameraActive(true);
      setCameraEnabled(true);
      setCameraInitialized(true);

      // Ensure we know when the video actually starts playing
      videoRef.current.onplaying = () => {
        console.log('Video onplaying fired');
        setVideoReady(true);
        startScreenshotCapture();
        toast.success('Security camera activated');
      };

      // Try to play the video immediately (handles cases where onloadedmetadata already fired)
      try {
        await videoRef.current.play();
        console.log('Camera playing successfully');
        console.log('Video dimensions:', videoRef.current.videoWidth, 'x', videoRef.current.videoHeight);
        setVideoReady(true);
        startScreenshotCapture();
        toast.success('Security camera activated');
      } catch (playErr) {
        // If autoplay prevented or other playback issue, still set up handlers
        console.warn('Immediate play failed, waiting for metadata:', playErr);
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().then(() => {
            // onplaying will handle setting videoReady and starting capture
            console.log('Played after metadata');
            // If onplaying didn't fire for some reason, set states here too
            if (!videoReady) {
              setVideoReady(true);
              startScreenshotCapture();
              toast.success('Security camera activated');
            }
          }).catch(err => {
            console.error('Error playing video after metadata:', err);
            setCameraError(err.message || 'Video playback error');
          });
        };

        videoRef.current.onerror = (err) => {
          console.error('Video element error:', err);
          setCameraError('Video playback error');
        };
      }
    } catch (err) {
      console.error('Camera access error:', err);
      // Provide clearer messages for common issues
      if (err && err.name === 'NotAllowedError') {
        setCameraError('Camera permission denied. Please allow camera access in your browser.');
      } else if (err && err.message && err.message.toLowerCase().includes('no camera')) {
        setCameraError('No camera device found on this machine');
      } else {
        setCameraError(err.message || 'Failed to access camera');
      }
      setShowSecurityWarning(true);
      toast.error('Camera access failed. You can continue without camera.');
      setCameraEnabled(false);
      setCameraInitialized(true);
    }
  }, []);

  const stopCamera = useCallback(() => {
    console.log("Stopping camera...");
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
        console.log("Track stopped:", track.kind);
      });
      streamRef.current = null;
    }
    
    if (screenshotIntervalRef.current) {
      clearInterval(screenshotIntervalRef.current);
      screenshotIntervalRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setCameraActive(false);
    setCameraPermission(false);
    setCameraEnabled(false);
    setVideoReady(false);
    toast.success("Camera turned off");
  }, []);

  const toggleCamera = () => {
    console.log("Toggle camera. Current state:", cameraActive);
    if (cameraActive) {
      stopCamera();
    } else {
      // Ensure video element mounts before starting camera
      setCameraActive(true);
      requestAnimationFrame(() => startCamera());
    }
  };

  const captureScreenshot = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !cameraActive) {
      console.log("Cannot capture screenshot: camera not ready", {
        videoRef: !!videoRef.current,
        canvasRef: !!canvasRef.current,
        cameraActive,
        videoReady
      });
      return;
    }

    // If videoReady is false, check if the video element actually has frames
    const video = videoRef.current;
    if (!videoReady) {
      const hasFrame = (video.videoWidth && video.videoHeight) || video.readyState >= 2;
      if (!hasFrame) {
        console.log('Video not yet providing frames; will skip capture this tick');
        return;
      }
      console.log('Video has frames despite videoReady=false; proceeding with capture');
      // allow capture flow to proceed
    }

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to base64 (40% quality to reduce payload size)
      const screenshot = canvas.toDataURL('image/jpeg', 0.4); // 40% quality

      // Add timestamp and store
      const timestamp = new Date().toISOString();
      setScreenshots(prev => {
        const updated = [...prev, { 
          image: screenshot, 
          timestamp,
          id: Date.now() + Math.random()
        }];
        
        // Keep only last 2 screenshots to manage memory
        if (updated.length > 2) {
          return updated.slice(-2);
        }
        return updated;
      });

      setLastCaptureTime(timestamp);
      console.log("Screenshot captured at:", timestamp);

      // Send screenshot to backend if camera is active
      if (cameraActive) {
        sendScreenshotToServer(screenshot, timestamp);
      }
    } catch (err) {
      console.error("Error capturing screenshot:", err);
    }
  }, [cameraActive, videoReady]);

  const sendScreenshotToServer = async (screenshot, timestamp) => {
    try {
      const response = await api.post(
        "/api/mock-interview/security/capture",
        { 
          resumeId,
          screenshot,
          timestamp,
          sessionId: resumeId // Using resumeId as session identifier
        }
        // Note: Authorization header is automatically added by API interceptor
      );
      console.log("Screenshot sent to server successfully:", response.data);
    } catch (err) {
      console.error("Failed to send screenshot to server:");
      console.error("Error message:", err.message);
      console.error("Response status:", err.response?.status);
      console.error("Response data:", err.response?.data);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result;
      const timestamp = new Date().toISOString();

      // store locally
      setScreenshots(prev => {
        const updated = [...prev, { image: dataUrl, timestamp, id: Date.now() + Math.random() }];
        if (updated.length > 5) return updated.slice(-5);
        return updated;
      });
      setLastCaptureTime(timestamp);

      // send to server
      try {
        await sendScreenshotToServer(dataUrl, timestamp);
        toast.success('Uploaded fallback photo');
      } catch (err) {
        console.error('Upload fallback photo failed:', err);
        toast.error('Failed to upload photo');
      }
    };
    reader.readAsDataURL(file);
    // reset value so same file can be chosen again later
    e.target.value = null;
  };

  const retryCamera = () => {
    setCameraError(null);
    setShowSecurityWarning(false);
    // attempt to start camera again
    if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      startCamera();
    } else {
      toast.error('Media devices API not available in this browser');
    }
  };

  const startScreenshotCapture = useCallback(() => {
    if (screenshotIntervalRef.current) {
      clearInterval(screenshotIntervalRef.current);
    }

    console.log("Starting screenshot capture interval");
    
    // Capture screenshot every 2 seconds
    screenshotIntervalRef.current = setInterval(() => {
      captureScreenshot();
    }, 2000);
  }, [captureScreenshot]);

  // Monitor for suspicious behavior (only if camera is active)
  const detectSuspiciousActivity = useCallback(() => {
    const checkInterval = setInterval(() => {
      if (cameraActive) {
        // Check if video is still playing
        if (videoRef.current && videoRef.current.paused) {
          console.log("Video paused, attempting to play...");
          videoRef.current.play().catch(err => {
            console.error("Error resuming video:", err);
          });
        }
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(checkInterval);
  }, [cameraActive]);

  // Auto-start camera when component mounts
  useEffect(() => {
    console.log("Component mounted, attempting to auto-start camera...");
    // Only attempt to start camera if navigator.mediaDevices is available
    if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Ensure the video element is rendered so videoRef is available
      setCameraActive(true);
      // Give React a tick to render the video element before starting camera
      requestAnimationFrame(() => startCamera());
    } else {
      console.warn('Media devices API not available; skipping camera auto-start');
    }

    return () => {
      console.log("Component unmounting, stopping camera...");
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  // Start monitoring after camera is active
  useEffect(() => {
    if (cameraActive) {
      console.log("Camera active, starting monitoring...");
      const cleanup = detectSuspiciousActivity();
      return cleanup;
    }
  }, [cameraActive, detectSuspiciousActivity]);

  // ==============================
  // SPEECH RECOGNITION
  // ==============================
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setAnswer(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event);
        setListening(false);
      };
      recognitionRef.current.onend = () => setListening(false);
    } else {
      console.warn("Speech recognition not supported");
    }
  }, []);

  // ==============================
  // FETCH QUESTION FROM BACKEND
  // ==============================
  const fetchQuestion = async () => {
    setLoadingQ(true);
    setFeedback(null);
    setAnswer("");

    try {
      const res = await api.post(
        "/api/mock-interview/question",
        { resumeId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setQuestion(res.data.question);
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Failed to generate interview question");
    } finally {
      setLoadingQ(false);
    }
  };

  useEffect(() => {
    if (resumeId) fetchQuestion();
  }, [resumeId]);

  // ==============================
  // MIC CONTROL
  // ==============================
  const toggleMic = () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition not supported");
      return;
    }

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setListening(true);
      } catch (err) {
        console.error("Error starting speech recognition:", err);
      }
    }
  };

  // ==============================
  // SUBMIT ANSWER → AI EVALUATION
  // ==============================
  const submitAnswer = async () => {
    if (!answer.trim()) return toast.error("Write your answer first");

    // Show warning if camera is off but don't block submission
    if (!cameraActive) {
      toast((t) => (
        <div className="flex flex-col gap-2">
          <span>Camera is off. Submit without security monitoring?</span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                proceedWithSubmission();
              }}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
            >
              Yes, Submit
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                toggleCamera();
              }}
              className="px-3 py-1 bg-gray-600 text-white rounded text-sm"
            >
              Turn On Camera
            </button>
          </div>
        </div>
      ), { duration: 8000 });
      return;
    }

    proceedWithSubmission();
  };

  const proceedWithSubmission = async () => {
    setEvaluating(true);

    try {
      // Capture final screenshot before submission if camera is active
      if (cameraActive) {
        captureScreenshot();
      }

      const res = await api.post(
        "/api/mock-interview/evaluate",
        {
          question: question?.question,
          answer,
          questionType: question?.type,
          securityData: cameraActive ? {
            screenshots: screenshots.slice(-1), // Send last 1 screenshot (reduced for payload size)
            sessionId: resumeId,
            cameraEnabled: true
          } : {
            cameraEnabled: false,
            sessionId: resumeId
          }
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFeedback(res.data.evaluation);
      toast.success("Evaluation completed");
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Evaluation failed");
    } finally {
      setEvaluating(false);
    }
  };

  // ==============================
  // UI
  // ==============================
  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <div className="sticky top-0 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto p-4 flex justify-center">
          <PhaseHeader />
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">

        {/* CAMERA CONTROL BAR */}
        <div className="bg-white p-4 rounded-xl shadow flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Shield className="text-blue-600" size={20} />
              <h2 className="font-semibold">Security Options</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleCamera}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  cameraActive 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cameraActive ? <Video size={16} /> : <VideoOff size={16} />}
                {cameraActive ? 'Camera On' : 'Camera Off'}
              </button>
              
              {cameraActive && lastCaptureTime && (
                <span className="text-sm text-gray-600">
                  Last capture: {new Date(lastCaptureTime).toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {cameraActive ? (
              <span className="text-green-600 flex items-center gap-1">
                <Camera size={16} /> Monitoring Active
              </span>
            ) : (
              <span className="text-amber-600 flex items-center gap-1 text-sm">
                <CameraOff size={16} /> Camera Off (Optional)
              </span>
            )}
            {securityViolations > 0 && cameraActive && (
              <span className="text-amber-600 text-sm">
                Warnings: {securityViolations}/3
              </span>
            )}
          </div>
        </div>

        {/* SECURITY CAMERA VIEW - Always show this container */}
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Camera className="text-blue-600" size={20} />
              <h2 className="font-semibold">Camera Preview</h2>
            </div>
            {cameraActive && (
              <button
                onClick={stopCamera}
                className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
              >
                <VideoOff size={16} /> Turn Off
              </button>
            )}
          </div>

          <div className="relative flex justify-center">
            {cameraActive ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full max-w-md rounded-lg bg-gray-900 border-2 border-green-500"
                  style={{ transform: 'scaleX(-1)' }} // Mirror effect
                />
                
                {/* Hidden canvas for screenshot capture */}
                <canvas ref={canvasRef} style={{ display: 'none' }} />
                
                {/* Debug overlay - remove in production */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs p-1 rounded">
                  Status: {videoReady ? 'Playing' : 'Loading...'}
                  {cameraError && ` Error: ${cameraError}`}
                </div>
              </>
            ) : (
              <div className="w-full max-w-md h-64 bg-gray-100 rounded-lg flex flex-col items-center justify-center gap-3">
                <CameraOff size={48} className="text-gray-400" />
                <p className="text-gray-500">Camera is off</p>
                <button
                  onClick={() => {
                    setCameraActive(true);
                    requestAnimationFrame(() => startCamera());
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Video size={16} className="inline mr-2" />
                  Turn On Camera
                </button>
              </div>
            )}
          </div>

          {/* Screenshot indicator */}
          {cameraActive && lastCaptureTime && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              Last capture: {new Date(lastCaptureTime).toLocaleTimeString()}
            </p>
          )}

          {/* Security warning */}
          {showSecurityWarning && cameraActive && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800 text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                Security warning: Please keep your face visible during the interview.
              </p>
            </div>
          )}

          {/* Error message */}
          {cameraError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                Camera error: {cameraError}
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={retryCamera}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  Retry Camera
                </button>

                <button
                  onClick={triggerFileSelect}
                  className="px-3 py-1 bg-gray-600 text-white rounded text-sm"
                >
                  Upload Photo Instead
                </button>
              </div>
              {/* Hidden file input for fallback upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelected}
                style={{ display: 'none' }}
              />
            </div>
          )}
        </div>

        {/* Camera Off Message - Optional additional message */}
        {!cameraActive && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl shadow">
            <p className="text-amber-800 flex items-center gap-2">
              <CameraOff size={20} />
              Camera is currently off. You can still participate in the interview, but security monitoring is disabled.
            </p>
          </div>
        )}

        {/* QUESTION CARD */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Interview Question</h2>

            <button
              onClick={fetchQuestion}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex gap-2"
            >
              <RefreshCw size={16} /> New Question
            </button>
          </div>

          {loadingQ ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
          ) : (
            <p className="text-lg">{question?.question || 'Click "New Question" to start'}</p>
          )}
        </div>

        {/* ANSWER BOX */}
        <div className="bg-white p-6 rounded-xl shadow">
          <textarea
            ref={textareaRef}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full h-40 border p-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type your answer here..."
          />

          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={toggleMic}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                listening 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {listening ? <MicOff size={16} /> : <Mic size={16} />}
              {listening ? 'Stop Recording' : 'Start Recording'}
            </button>

            <button
              onClick={submitAnswer}
              disabled={evaluating || !answer.trim()}
              className={`px-6 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                evaluating || !answer.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {evaluating ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Evaluating...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Submit Answer
                </>
              )}
            </button>
          </div>
        </div>

        {/* FEEDBACK SECTION */}
        {feedback && (
          <div className="bg-white p-6 rounded-xl shadow space-y-6">
            <h2 className="text-xl font-bold">AI Evaluation</h2>

            {/* SCORE */}
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Award className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Overall Score</p>
                <p className="text-3xl font-bold text-blue-600">{feedback.score}/10</p>
              </div>
            </div>

            {/* CONFIDENCE */}
            <div>
              <h3 className="font-semibold text-purple-700 flex items-center gap-2">
                <Brain size={18} /> Confidence Level
              </h3>
              <p className="mt-1">{feedback.confidence_level}</p>
            </div>

            {/* STRENGTHS */}
            <div>
              <h3 className="font-semibold text-green-700 flex items-center gap-2">
                <TrendingUp size={18} /> Strengths
              </h3>
              <ul className="mt-1 list-disc list-inside">
                {feedback.strengths?.map((s, i) => (
                  <li key={i} className="text-gray-700">{s}</li>
                ))}
              </ul>
            </div>

            {/* WEAKNESSES */}
            <div>
              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <AlertCircle size={18} /> Areas for Improvement
              </h3>
              <ul className="mt-1 list-disc list-inside">
                {feedback.weaknesses?.map((w, i) => (
                  <li key={i} className="text-gray-700">{w}</li>
                ))}
              </ul>
            </div>

            {/* GRAMMAR */}
            {feedback.grammar_mistakes?.length > 0 && (
              <div>
                <h3 className="font-semibold text-red-600 flex items-center gap-2">
                  <MessageSquare size={18} /> Grammar Mistakes
                </h3>
                <ul className="mt-1 list-disc list-inside">
                  {feedback.grammar_mistakes.map((g, i) => (
                    <li key={i} className="text-gray-700">{g}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* IMPROVEMENTS */}
            {feedback.improvements?.length > 0 && (
              <div>
                <h3 className="font-semibold text-blue-700 flex items-center gap-2">
                  <Target size={18} /> How To Improve
                </h3>
                <ul className="mt-1 list-disc list-inside">
                  {feedback.improvements.map((t, i) => (
                    <li key={i} className="text-gray-700">{t}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* HR FEEDBACK */}
            <div className="border-t pt-4">
              <h3 className="font-semibold flex items-center gap-2">
                <User size={18} /> HR Feedback
              </h3>
              <p className="mt-2 p-4 bg-gray-50 rounded-lg italic">"{feedback.hr_feedback}"</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilderPhase3;