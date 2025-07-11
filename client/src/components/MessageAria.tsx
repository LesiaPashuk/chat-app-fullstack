import { v1 } from "uuid";
import { Message, propsMessage } from "./Messegse.tsx";
import { useEffect, useRef } from "react";
export type MessageAria = {
  message: { username: string; content: string; belong: boolean; date: Date }[];
};
export const MessageAria = (props: MessageAria) => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const endMessegeAutoScroll = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    endMessegeAutoScroll();
  }, [props.message]);
  return (
    <div className="w-3/4  h-[60vh] flex flex-col space-y-3 justify-between bg-[#d4e1e300] mb-4 rounded-lg p-4 overflow-y-auto">
      <div className="w-full space-y-3">
        {props.message.map((oneMessage) => (
          <div
            key={v1()}
            className={`flex ${
              oneMessage.belong === true ? "justify-end" : "justify-start"
            }`}
          >
            <Message
              content={oneMessage.content}
              date={oneMessage.date}
              belong={oneMessage.belong}
              username={oneMessage.username}
            />
          </div>
        ))} 
         <div ref={messageEndRef}></div>
      </div>
    
    </div>
  );
};
