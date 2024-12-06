"use client";
import { useEffect } from "react";
import { useMessageContext } from "@/context/GlobalMessageCtx";

const UnreadMessageCount = ({ session }) => {
  const { unReadCount, setUnReadCount } = useMessageContext();

  useEffect(() => {
    if (!session) return;

    const fetchUnreadMessages = async () => {
      try {
        const res = await fetch("/api/messages/unread-messages");

        if (res.status === 200) {
          const data = await res.json();
          console.log(data.count);

          setUnReadCount(data.count);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUnreadMessages();
  }, [session]);

  return (
    unReadCount > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {unReadCount}
      </span>
    )
  );
};
export default UnreadMessageCount;
