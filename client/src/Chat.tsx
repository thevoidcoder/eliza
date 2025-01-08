import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TextResponse } from "@/api";
import { useSendMessageMutation } from "@/api";
import { ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

// Message type extended to support backroom channel
interface Message extends TextResponse {
  channel: 'direct' | 'backroom';
}

const ChatInterface = () => {
  const { agentId } = useParams();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const directChatRef = useRef<HTMLDivElement>(null);
  const backroomRef = useRef<HTMLDivElement>(null);

  const { mutate: sendMessage, isPending } = useSendMessageMutation({
    setMessages,
    setSelectedFile,
  });

  // Auto-scroll both panels
  useEffect(() => {
    directChatRef.current?.scrollIntoView({ behavior: "smooth" });
    backroomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !selectedFile) || !agentId) return;

    // Add user message to direct channel
    const userMessage: Message = {
      text: input,
      user: "user",
      channel: 'direct',
      attachments: selectedFile ? [{
        url: URL.createObjectURL(selectedFile),
        contentType: selectedFile.type,
        title: selectedFile.name
      }] : undefined,
    };

    console.log('Adding user message:', userMessage);
    
    setMessages((prev) => {
      console.log('Previous messages:', prev);
      const newMessages = [...prev, userMessage];
      console.log('Updated messages:', newMessages);
      return newMessages;
    });

    // Log the message being sent to the API
    console.log('Sending to API:', { 
      text: input, 
      agentId, 
      selectedFile 
    });

    sendMessage({ 
      text: input, 
      agentId, 
      selectedFile 
    });
    
    setInput("");
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    }
  };

  // Separate messages by channel
  const directMessages = messages.filter(m => m.channel === 'direct' || m.user === 'user');
  const backroomMessages = messages.filter(m => m.channel === 'backroom');

  return (
    <div className="flex h-screen max-h-screen w-full">
      {/* Direct Chat Panel */}
      <div className="flex-1 flex flex-col min-h-0 border-r">
        <div className="bg-muted/50 p-2 text-sm font-medium border-b">
          Direct Communication
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {directMessages.map((message, index) => (
              <div
                key={index}
                className={`text-left flex ${
                  message.user === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.user === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.text.split('\n').map((line, i) => {
                    // Format actions (text within asterisks)
                    const formattedLine = line.replace(
                      /\*(.*?)\*/g,
                      '<em class="text-orange-500 opacity-75">*$1*</em>'
                    );
                    // Add spacing after speaker names
                    const processedLine = formattedLine.replace(
                      /(Igor|Grichka):/, 
                      '<strong class="text-blue-500">$1:</strong> '
                    );
                    
                    return (
                      <div 
                        key={i} 
                        className="mb-1 last:mb-0"
                        dangerouslySetInnerHTML={{ __html: processedLine }}
                      />
                    );
                  })}
                  {message.attachments?.map((attachment, i) => (
                    attachment.contentType.startsWith('image/') && (
                      <img
                        key={i}
                        src={message.user === "user" 
                          ? attachment.url 
                          : attachment.url.startsWith('http')
                            ? attachment.url
                            : `http://localhost:3000/media/generated/${attachment.url.split('/').pop()}`
                        }
                        alt={attachment.title || "Attached image"}
                        className="mt-2 max-w-full rounded-lg"
                      />
                    )
                  ))}
                </div>
              </div>
            ))}
            <div ref={directChatRef} />
          </div>
        </div>

        <div className="border-t p-4 bg-background">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
                disabled={isPending}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleFileSelect}
                disabled={isPending}
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "..." : "Send"}
              </Button>
            </form>
            {selectedFile && (
              <div className="mt-2 text-sm text-muted-foreground">
                Selected file: {selectedFile.name}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Backroom Panel */}
      <div className="w-1/2 flex flex-col min-h-0 bg-black/95">
        <div className="bg-red-500/20 p-2 text-sm font-medium text-red-500 border-b border-red-500/20">
          QUANTUM SURVEILLANCE FEED
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {backroomMessages.map((message, index) => (
              <div key={index} className="text-left">
                <div className="font-mono text-green-500 text-sm whitespace-pre-wrap rounded p-2 border border-green-500/20 bg-black/50">
                  {message.text.split('\n').map((line, i) => {
                    // Format actions (text within asterisks)
                    const formattedLine = line.replace(
                      /\*(.*?)\*/g,
                      '<em class="text-orange-500 opacity-75">*$1*</em>'
                    );
                    // Add spacing after speaker names
                    const processedLine = formattedLine.replace(
                      /(Igor|Grichka):/, 
                      '<strong class="text-green-400">$1:</strong> '
                    );
                    
                    return (
                      <div 
                        key={i} 
                        className="mb-1 last:mb-0"
                        dangerouslySetInnerHTML={{ __html: processedLine }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
            <div ref={backroomRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;