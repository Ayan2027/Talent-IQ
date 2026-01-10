import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useEndSession,
  useJoinSession,
  useSessionById,
} from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/piston";
import Navbar from "../components/Navbar";

import {
  Panel,
  ResizeHandle,
  ResizablePanelGroup,
} from "react-resizable-panels";

import { getDifficultyBadgeClass } from "../lib/utils";
import { Loader2Icon, LogOutIcon, PhoneOffIcon } from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const {
    data: sessionData,
    isLoading: loadingSession,
    refetch,
  } = useSessionById(id);

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } =
    useStreamClient(session, loadingSession, isHost, isParticipant);

  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    problemData?.starterCode?.[selectedLanguage] || ""
  );

  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant) return;
    joinSessionMutation.mutate(id, { onSuccess: refetch });
  }, [session, user, loadingSession, isHost, isParticipant, id]);

  useEffect(() => {
    if (!session || loadingSession) return;
    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(problemData?.starterCode?.[newLang] || "");
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (
      confirm(
        "Are you sure you want to end this session? All participants will be notified."
      )
    ) {
      endSessionMutation.mutate(id, {
        onSuccess: () => navigate("/dashboard"),
      });
    }
  };

  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar />

      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal">
          {/* LEFT */}
          <Panel defaultSize={50} minSize={30}>
            <ResizablePanelGroup direction="vertical">
              <Panel defaultSize={50} minSize={20}>
                <div className="h-full overflow-y-auto bg-base-200 p-6">
                  <h1 className="text-3xl font-bold">
                    {session?.problem || "Loading..."}
                  </h1>
                  <span
                    className={`badge ${getDifficultyBadgeClass(
                      session?.difficulty
                    )}`}
                  >
                    {session?.difficulty || "easy"}
                  </span>
                </div>
              </Panel>

              <ResizeHandle className="h-2 bg-base-300 cursor-row-resize" />

              <Panel defaultSize={50} minSize={20}>
                <ResizablePanelGroup direction="vertical">
                  <Panel defaultSize={70}>
                    <CodeEditorPanel
                      selectedLanguage={selectedLanguage}
                      code={code}
                      isRunning={isRunning}
                      onLanguageChange={handleLanguageChange}
                      onCodeChange={setCode}
                      onRunCode={handleRunCode}
                    />
                  </Panel>

                  <ResizeHandle className="h-2 bg-base-300 cursor-row-resize" />

                  <Panel defaultSize={30}>
                    <OutputPanel output={output} />
                  </Panel>
                </ResizablePanelGroup>
              </Panel>
            </ResizablePanelGroup>
          </Panel>

          <ResizeHandle className="w-2 bg-base-300 cursor-col-resize" />

          {/* RIGHT */}
          <Panel defaultSize={50} minSize={30}>
            {isInitializingCall ? (
              <div className="h-full flex items-center justify-center">
                <Loader2Icon className="w-10 h-10 animate-spin" />
              </div>
            ) : !call || !streamClient ? (
              <div className="h-full flex items-center justify-center">
                <PhoneOffIcon className="w-12 h-12 text-error" />
              </div>
            ) : (
              <StreamVideo client={streamClient}>
                <StreamCall call={call}>
                  <VideoCallUI chatClient={chatClient} channel={channel} />
                </StreamCall>
              </StreamVideo>
            )}
          </Panel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default SessionPage;
