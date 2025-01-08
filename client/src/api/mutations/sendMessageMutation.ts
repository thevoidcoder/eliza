import type { TextResponse } from "../types";
import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "../routes";
import { SetStateAction } from "react";

type SendMessageMutationProps = {
    text: string;
    agentId: string;
    selectedFile: File | null;
};

type Props = Required<{
    setMessages: (value: SetStateAction<TextResponse[]>) => void;
    setSelectedFile: (value: SetStateAction<File | null>) => void;
}>;

// Helper to split response into direct and backroom messages
const processResponse = (text: string): TextResponse[] => {
    console.log('Processing text:', text);  // Debug log

    // Check if the response uses the new marker format
    if (text.includes('[DIRECT]') || text.includes('[BACKROOM]')) {
        const messages: TextResponse[] = [];
        
        // Extract direct channel content
        const directMatch = text.match(/\[DIRECT\]([\s\S]*?)\[\/DIRECT\]/);
        if (directMatch) {
            messages.push({
                text: directMatch[1].trim(),
                user: 'Bogdanoff-Twins',
                channel: 'direct'
            });
        }

        // Extract backroom channel content
        const backroomMatch = text.match(/\[BACKROOM\]([\s\S]*?)\[\/BACKROOM\]/);
        if (backroomMatch) {
            messages.push({
                text: backroomMatch[1].trim(),
                user: 'Bogdanoff-Twins',
                channel: 'backroom'
            });
        }

        return messages;
    } else {
        // Fallback to parsing based on content indicators
        const lines = text.split('\n');
        const backroomLines: string[] = [];
        const directLines: string[] = [];
        
        lines.forEach(line => {
            if (line.trim()) {  // Skip empty lines
                if (line.includes('*') || line.includes('phone')) {
                    backroomLines.push(line.trim());
                } else {
                    directLines.push(line.trim());
                }
            }
        });

        const messages: TextResponse[] = [];
        
        if (directLines.length > 0) {
            messages.push({
                text: directLines.join('\n'),
                user: 'Bogdanoff-Twins',
                channel: 'direct'
            });
        }
        
        if (backroomLines.length > 0) {
            messages.push({
                text: backroomLines.join('\n'),
                user: 'Bogdanoff-Twins',
                channel: 'backroom'
            });
        }

        return messages;
    }
};

export const useSendMessageMutation = ({
    setMessages,
    setSelectedFile,
}: Props): CustomMutationResult<TextResponse[], SendMessageMutationProps> => {
    const mutation = useMutation({
        mutationFn: async ({
            text,
            agentId,
            selectedFile,
        }: SendMessageMutationProps) => {
            const formData = new FormData();
            formData.append("text", text);
            formData.append("userId", "user");
            formData.append("roomId", `default-room-${agentId}`);

            if (selectedFile) {
                formData.append("file", selectedFile);
            }

            const res = await fetch(ROUTES.sendMessage(agentId), {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            console.log('Raw response data:', data);  // Debug log

            // Process each response message
            const processedMessages = data.map((msg: TextResponse) => {
                console.log('Processing message:', msg);  // Debug log
                return processResponse(msg.text);
            }).flat();

            console.log('Processed messages:', processedMessages);  // Debug log
            return processedMessages;
        },
        onSuccess: (data) => {
            setMessages((prev) => [...prev, ...data]);
            setSelectedFile(null);
        },
        onError: (error) => {
            console.error("[useSendMessageMutation]:", error);
        },
    });

    return mutation;
};
