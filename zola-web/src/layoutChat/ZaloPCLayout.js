import React, { useState, useEffect } from 'react';
import '../styles/ZaloPCLayout.css';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import ContactsMainView from './ContactsMainView';
import AccountInfoModal from '../modals/AccountInfoModal';
import SettingsModal from '../modals/SettingsModal';
import UpdateInfoModal from '../modals/UpdateInfoModal';
import AddFriendModal from '../modals/AddFriendModal';
import CreateGroupModal from '../modals/CreateGroupModal';

function ZaloPCLayout({onLogout}) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isAccountInfoModalOpen, setIsAccountInfoModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isUpdateInfoModalOpen, setIsUpdateInfoModalOpen] = useState(false);
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [activeView, setActiveView] = useState('chats');
  const [activeContactsNavItem, setActiveContactsNavItem] = useState('friends');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [allConversations, setAllConversations] = useState([]);
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [conversationsError, setConversationsError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setLoggedInUser(parsedUser);
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  useEffect(() => {
    const fetchAllUserConversations = async () => {
      if (!loggedInUser?._id) {
        setAllConversations([]);
        return;
      }
      setIsLoadingConversations(true);
      setConversationsError('');
      try {
        const response = await fetch('http://localhost:3001/conversation/getConversationGroupByUserIDWeb', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: loggedInUser._id }),
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.conversationGroup && Array.isArray(data.conversationGroup)) {
            const formattedConversations = data.conversationGroup.map(conv => {
              let chatName = conv.name || conv.conversationName || 'Cuộc trò chuyện';
              let chatAvatar = conv.avatar;
              
              if (conv.type === 'user' && conv.members && conv.members.length > 1) {
                const otherUser = conv.members.find(member => member._id !== loggedInUser._id);
                if (otherUser) {
                  chatName = otherUser.userName;
                  chatAvatar = otherUser.avatar;
                } else {
                  chatName = 'Người dùng Zalo'; // Fallback
                }
              }
              
              return {
                ...conv,
                id: conv._id,
                name: chatName,
                avatar: chatAvatar,
                type: conv.type || 'unknown', 
              };
            });
            formattedConversations.sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());
            setAllConversations(formattedConversations);
          } else {
            setAllConversations([]);
          }
        } else {
          setConversationsError('Không thể tải danh sách cuộc trò chuyện.');
          setAllConversations([]);
        }
      } catch (error) {
        setConversationsError('Lỗi kết nối, không thể tải danh sách cuộc trò chuyện.');
        setAllConversations([]);
      } finally {
        setIsLoadingConversations(false);
      }
    };

    if (loggedInUser?._id) {
      fetchAllUserConversations();
    }
  }, [loggedInUser]);

  const handleSelectChat = (chat) => {
    const chatObjectToSelect = {
        ...chat,
        id: chat._id || chat.id, 
    };
    
    setAllConversations(prevConversations => {
        const existingIndex = prevConversations.findIndex(conv => (conv._id || conv.id) === (chatObjectToSelect.id));
        let updatedConversations;

        if (existingIndex !== -1) {
            updatedConversations = [...prevConversations];
            updatedConversations[existingIndex] = { 
                ...updatedConversations[existingIndex], 
                ...chatObjectToSelect, 
                updatedAt: new Date().toISOString() 
            };
        } else {
            updatedConversations = [{ ...chatObjectToSelect, updatedAt: new Date().toISOString() }, ...prevConversations];
        }
        return updatedConversations.sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());
    });

    setSelectedChat(chatObjectToSelect);
    setActiveView('chats');
  };

  const handleNewMessageSent = (conversationId, newMessage) => {
    setAllConversations(prevConversations => {
        const convIndex = prevConversations.findIndex(c => (c._id || c.id) === conversationId);
        if (convIndex > -1) {
            const updatedConv = {
                ...prevConversations[convIndex],
                lastMessage: newMessage.contentType === 'text' ? newMessage.content : (newMessage.contentType === 'image' || newMessage.contentType === 'image_gallery' ? '[Hình ảnh]' : `[${newMessage.contentType}]`),
                lastMessageTimestamp: newMessage.createdAt || new Date().toISOString(),
                updatedAt: newMessage.createdAt || new Date().toISOString() 
            };
            const newConversations = [...prevConversations];
            newConversations.splice(convIndex, 1); 
            return [updatedConv, ...newConversations].sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());
        }
        return prevConversations;
    });
  };

  const closeAllModals = () => {
    setIsAccountInfoModalOpen(false);
    setIsSettingsModalOpen(false);
    setIsUpdateInfoModalOpen(false);
    setIsAddFriendModalOpen(false);
    setIsCreateGroupModalOpen(false);
  };

  const openAccountInfoModal = () => { closeAllModals(); setIsAccountInfoModalOpen(true); };
  const closeAccountInfoModal = () => setIsAccountInfoModalOpen(false);
  const openSettingsModal = () => { closeAllModals(); setIsSettingsModalOpen(true); };
  const closeSettingsModal = () => setIsSettingsModalOpen(false);
  const openUpdateInfoModal = () => { closeAllModals(); setIsUpdateInfoModalOpen(true); };
  const handleCloseUpdateModalAndReturnToAccountInfo = () => { closeAllModals(); setIsAccountInfoModalOpen(true); };
  const justCloseUpdateInfoModal = () => setIsUpdateInfoModalOpen(false);
  const openAddFriendModal = () => { closeAllModals(); setIsAddFriendModalOpen(true); };
  const closeAddFriendModal = () => setIsAddFriendModalOpen(false);
  const openCreateGroupModal = () => { closeAllModals(); setIsCreateGroupModalOpen(true); };
  const closeCreateGroupModal = () => setIsCreateGroupModalOpen(false);

  const handleProfileUpdate = (updatedData) => {
    setLoggedInUser(prevData => ({
      ...prevData,
      userName: updatedData.name,
      gender: updatedData.gender,
      dateOfBirth: updatedData.dob,
      avatar: updatedData.avatar || prevData.avatar
    }));
    justCloseUpdateInfoModal();
  };

  const handleGroupCreated = (newGroupDataFromAPI) => {
    const groupToAdd = { ...newGroupDataFromAPI, type: 'group', id: newGroupDataFromAPI._id, updatedAt: new Date().toISOString() };
    setAllConversations(prevConversations => {
      const existingIndex = prevConversations.findIndex(conv => (conv._id || conv.id) === (groupToAdd._id || groupToAdd.id));
      let updatedConversations;
      if (existingIndex !== -1) {
        updatedConversations = [...prevConversations];
        updatedConversations[existingIndex] = groupToAdd;
      } else {
        updatedConversations = [groupToAdd, ...prevConversations];
      }
      return updatedConversations.sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());
    });
    setSelectedChat(groupToAdd);
    setActiveView('chats');
    closeCreateGroupModal();
  };

  const handleConversationDeleted = (deletedConversationId) => {
    setAllConversations(prevConversations => 
      prevConversations.filter(conv => (conv._id || conv.id) !== deletedConversationId)
    );
    if (selectedChat && (selectedChat._id || selectedChat.id) === deletedConversationId) {
      setSelectedChat(null);
    }
  };
 
  return (
    <div className="zalo-pc-layout">
      <Sidebar
        conversations={allConversations}
        isLoadingConversations={isLoadingConversations}
        conversationsError={conversationsError}
        onSelectChat={handleSelectChat}
        currentSelectedChatId={selectedChat ? (selectedChat._id || selectedChat.id) : null}
        onOpenAccountInfoModal={openAccountInfoModal}
        onOpenSettingsModal={openSettingsModal}
        onOpenAddFriendModal={openAddFriendModal}
        onOpenCreateGroupModal={openCreateGroupModal}
        activeView={activeView}
        setActiveView={setActiveView}
        activeContactsNavItem={activeContactsNavItem}
        setActiveContactsNavItem={setActiveContactsNavItem}
        onLogoutFromLayout={onLogout}
        currentLoggedInUserId={loggedInUser?._id}
      />
      {activeView === 'chats' && 
        <MainContent 
          selectedChat={selectedChat} 
          currentLoggedInUserId={loggedInUser?._id} 
          onConversationDeleted={handleConversationDeleted}
          onNewMessageSent={handleNewMessageSent}
        />
      }
      {activeView === 'contacts' && 
        <ContactsMainView 
          subViewType={activeContactsNavItem} 
          currentLoggedInUserId={loggedInUser?._id} 
          onNavigateToChat={handleSelectChat}
          onFriendDeleted={handleConversationDeleted}
        />
      }
      <AccountInfoModal 
        isOpen={isAccountInfoModalOpen} 
        onClose={closeAccountInfoModal} 
        onOpenUpdateModal={openUpdateInfoModal} 
        userData={loggedInUser}
      />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={closeSettingsModal} />
      <UpdateInfoModal 
        isOpen={isUpdateInfoModalOpen} 
        onClose={justCloseUpdateInfoModal}
        onReturnToAccountInfo={handleCloseUpdateModalAndReturnToAccountInfo}
        userData={loggedInUser}
        onUpdate={handleProfileUpdate} 
      />
      <AddFriendModal 
        isOpen={isAddFriendModalOpen} 
        onClose={closeAddFriendModal} 
        currentLoggedInUserId={loggedInUser?._id}
      />
      <CreateGroupModal 
        isOpen={isCreateGroupModalOpen} 
        onClose={closeCreateGroupModal} 
        currentLoggedInUserId={loggedInUser?._id}
        onGroupCreated={handleGroupCreated}
      />
    </div>
  );
}

export default ZaloPCLayout;