'use client';
import React, { useState } from "react";

// Types
interface ChatUser {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen: string;
}

interface Message {
  id: number;
  content: string;
  name: string;
  avatar: string;
  timeAgo: string;
  isSender: boolean;
}

interface ChatState {
  isMobile: boolean;
  openDropDown: boolean;
  selectedUser: ChatUser | null;
  messages: Message[];
  searchQuery: string;
}

// Initial state
const initialState: ChatState = {
  isMobile: false,
  openDropDown: false,
  selectedUser: null,
  messages: [],
  searchQuery: ''
};

// Mock data for users
const chatUsers: ChatUser[] = [
  {
    id: 1,
    name: "Kaiya George",
    role: "Project Manager",
    avatar: "/images/user/user-18.jpg",
    status: "online",
    lastSeen: "15 mins"
  },
  {
    id: 2, 
    name: "Lindsey Curtis",
    role: "Designer",
    avatar: "/images/user/user-17.jpg",
    status: "online",
    lastSeen: "30 mins"
  }
];

// Mock messages
const mockMessages: Message[] = [
  {
    id: 1,
    content: "I want to make an appointment tomorrow from 2:00 to 5:00pm?",
    name: "Lindsey",
    avatar: "/images/user/user-17.jpg",
    timeAgo: "2 hours ago",
    isSender: false
  }
];

export default function ChatPage() {
  const [state, setState] = useState<ChatState>({
    ...initialState,
    messages: mockMessages,
    // Optionally select a default user to display messages for
    // selectedUser: chatUsers[0] 
  });

  // Handler functions
  const toggleMobile = () => {
    setState(prev => ({ ...prev, isMobile: !prev.isMobile }));
  };

  const toggleDropDown = () => {
    setState(prev => ({ ...prev, openDropDown: !prev.openDropDown }));
  };

  const handleUserSelect = (user: ChatUser) => {
    setState(prev => ({ ...prev, selectedUser: user }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, searchQuery: e.target.value }));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Add message sending logic here
  };

  // Filter users based on search
  const filteredUsers = chatUsers.filter(user => 
    user.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  return (
    <>
      {/* <PageBreadcrumb pageTitle="Chat" /> */}
      <div className="h-[calc(100vh-100px)] overflow-hidden sm:h-[calc(100vh-150px)] w-full">
        <div className="flex h-full flex-col gap-6 xl:flex-row xl:gap-5">
          {/* Chat Sidebar */}
          <div
            className={`flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:flex xl:w-1/4 ${
              state.isMobile ? 'fixed inset-0 z-50 xl:static' : 'hidden xl:flex' // Adjusted for better mobile view
            }`}
          >
            {/* Sidebar Header */}
            <div className="sticky top-0 bg-white dark:bg-white/[0.03] px-4 pb-4 pt-4 sm:px-5 sm:pt-5 xl:pb-0">
              <div className="flex items-start justify-between">
                <h3 className="text-theme-xl font-semibold text-gray-800 dark:text-white/90 sm:text-2xl">
                  Chats
                </h3>
                <button
                  onClick={toggleDropDown} // Make sure toggleDropDown is implemented or remove if not used yet
                  className="relative text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                >
                  {/* SVG for dropdown icon */}
                  <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24"><path d="M12 16c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1zm0-5c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1zm0-5c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1z"/></svg>
                </button>
              </div>

              {/* Search Input */}
              <div className="mt-4 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  {/* Search Icon SVG */}
                  <svg className="fill-gray-500 dark:fill-gray-400" width="20" height="20" viewBox="0 0 20 20"><path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/></svg>
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  value={state.searchQuery}
                  onChange={handleSearch}
                  className="w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-10 pr-3.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>

            {/* Users List */}
            <div className="no-scrollbar flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-1">
              {filteredUsers.map(user => (
                <div
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-white/[0.03] ${state.selectedUser?.id === user.id ? "bg-gray-100 dark:bg-white/[0.03]" : ""}`}
                >
                  <div className="relative h-12 w-full max-w-[48px] rounded-full">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full overflow-hidden rounded-full object-cover object-center"
                    />
                    {user.status === 'online' && (
                      <span
                        className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-[1.5px] border-white bg-green-500 dark:border-gray-900"
                      ></span>
                    )}
                  </div>
                  <div className="w-full">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5
                          className="text-sm font-medium text-gray-800 dark:text-white/90"
                        >
                          {user.name}
                        </h5>
                        <p
                          className="mt-0.5 text-xs text-gray-500 dark:text-gray-400"
                        >
                          {user.role}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400"> {user.lastSeen} </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
             {/* Mobile view close button - only show if isMobile is true */}
            {state.isMobile && (
              <div className="p-4 xl:hidden">
                <button
                  onClick={toggleMobile}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 flex flex-col rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            {state.selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] px-5 py-4 xl:px-6">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleMobile}
                      className="xl:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                    >
                      {/* Back arrow or hamburger icon for mobile */}
                      <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24"><path d="M4 11h12v2H4zM4 6h16v2H4zM4 16h16v2H4z"/></svg>
                    </button>
                    <div className="relative h-12 w-full max-w-[48px] rounded-full">
                      <img
                        src={state.selectedUser.avatar}
                        alt={state.selectedUser.name}
                        className="h-full w-full overflow-hidden rounded-full object-cover object-center"
                      />
                       {state.selectedUser.status === 'online' && (
                        <span
                          className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-[1.5px] border-white bg-green-500 dark:border-gray-900"
                        ></span>
                      )}
                    </div>
                    <h5 className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {state.selectedUser.name}
                    </h5>
                  </div>
                  {/* Action buttons (call, video call, more options) - can be added here */}
                </div>

                {/* Messages */}
                <div className="custom-scrollbar max-h-full flex-1 space-y-6 overflow-auto p-5 xl:space-y-8 xl:p-6">
                  {state.messages.filter(msg => msg.name === state.selectedUser?.name || msg.isSender).map((message, index) => ( // Basic filter for demo
                    <div key={index} className={`flex ${message.isSender ? 'justify-end' : 'justify-start'} mb-4`}>
                      <div className={`max-w-[350px] flex items-start gap-3 ${message.isSender ? 'flex-row-reverse' : ''}`}>
                        {!message.isSender && (
                           <div className="h-10 w-full max-w-10 rounded-full">
                            <img
                              src={message.avatar} // Assuming sender's avatar
                              alt={message.name}
                              className="h-full w-full overflow-hidden rounded-full object-cover object-center"
                            />
                          </div>
                        )}
                        <div>
                          <div
                            className={`rounded-lg px-3 py-2 ${message.isSender ? 'rounded-tr-sm bg-brand-500 text-white dark:bg-brand-500' : 'rounded-tl-sm bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-white/90'}`}
                          >
                            <p className="text-sm">
                              {message.content}
                            </p>
                          </div>
                          <p className={`mt-2 text-xs text-gray-500 dark:text-gray-400 ${message.isSender ? 'text-right' : ''}`}>
                            {message.name}, {message.timeAgo}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="sticky bottom-0 border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-3">
                  <div className="relative flex items-center">
                    {/* Emoji Button */}
                    <button type="button" className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                      {/* Emoji SVG */}
                      <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9c.83 0 1.5-.67 1.5-1.5S10.83 8 10 8s-1.5.67-1.5 1.5S9.17 11 10 11zm4 0c.83 0 1.5-.67 1.5-1.5S14.83 8 14 8s-1.5.67-1.5 1.5S13.17 11 14 11zm-4 4c-1.29 0-2.42-.63-3.12-1.59a.5.5 0 01.71-.71c.52.72 1.34 1.18 2.41 1.18s1.89-.46 2.41-1.18a.5.5 0 01.71.71C14.42 14.37 13.29 15 12 15z" /></svg>
                    </button>
                    <input
                      type="text"
                      placeholder="Type a message"
                      // value={newMessage} onChange={(e) => setNewMessage(e.target.value)} // State needed for input
                      className="flex-1 h-9 border-none bg-transparent px-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-0 focus:ring-0 dark:text-white/90"
                    />
                    {/* Attachment and Mic Buttons */}
                    <button type="button" className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                      {/* Attachment SVG */}
                      <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 015 0v10.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V6H10v9.5a2.5 2.5 0 005 0V5c0-2.21-1.79-4-4-4S7 2.79 7 5v11.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg>
                    </button>
                    <button type="submit" className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white hover:bg-brand-600">
                       {/* Send Icon SVG */}
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.98481 2.44399C3.11333 1.57147 1.15325 3.46979 1.96543 5.36824L3.82086 9.70527C3.90146 9.89367 3.90146 10.1069 3.82086 10.2953L1.96543 14.6323C1.15326 16.5307 3.11332 18.4291 4.98481 17.5565L16.8184 12.0395C18.5508 11.2319 18.5508 8.76865 16.8184 7.961L4.98481 2.44399ZM3.34453 4.77824C3.0738 4.14543 3.72716 3.51266 4.35099 3.80349L16.1846 9.32051C16.762 9.58973 16.762 10.4108 16.1846 10.68L4.35098 16.197C3.72716 16.4879 3.0738 15.8551 3.34453 15.2223L5.19996 10.8853C5.21944 10.8397 5.23735 10.7937 5.2537 10.7473L9.11784 10.7473C9.53206 10.7473 9.86784 10.4115 9.86784 9.99726C9.86784 9.58304 9.53206 9.24726 9.11784 9.24726L5.25157 9.24726C5.2358 9.20287 5.2186 9.15885 5.19996 9.11528L3.34453 4.77824Z" fill="white"></path></svg>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center">
                <div>
                   <button
                      onClick={toggleMobile}
                      className="xl:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white mb-4"
                    >
                      {/* Back arrow or hamburger icon for mobile */}
                      <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24"><path d="M4 11h12v2H4zM4 6h16v2H4zM4 16h16v2H4z"/></svg> Show User List
                    </button>
                  <p className="text-gray-500">Select a chat to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
