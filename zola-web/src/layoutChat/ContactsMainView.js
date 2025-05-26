import React, { useState, useEffect, useRef } from 'react';
import '../styles/ContactsMainView.css';
import { FaSearch, FaFilter, FaEllipsisH, FaSortAmountDown, FaAddressBook, FaUsers, FaUserPlus, FaPaperPlane, FaTrashAlt, FaSpinner } from 'react-icons/fa';

function ContactsMainView({ subViewType, currentLoggedInUserId, onNavigateToChat, onFriendDeleted }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('name_asc');
  const [receivedFriendRequests, setReceivedFriendRequests] = useState([]);
  const [isLoadingReceivedRequests, setIsLoadingReceivedRequests] = useState(false);
  const [sentFriendRequests, setSentFriendRequests] = useState([]);
  const [isLoadingSentRequests, setIsLoadingSentRequests] = useState(false);
  const [friendsList, setFriendsList] = useState([]);
  const [isLoadingFriends, setIsLoadingFriends] = useState(false);
  const [friendsError, setFriendsError] = useState('');
  const [groupsList, setGroupsList] = useState([]);
  const [isLoadingGroups, setIsLoadingGroups] = useState(false);
  const [groupsError, setGroupsError] = useState('');
  const [requestActionStatus, setRequestActionStatus] = useState({});
  const [globalSearchResult, setGlobalSearchResult] = useState(null);
  const [isGlobalSearching, setIsGlobalSearching] = useState(false);
  const [globalSearchError, setGlobalSearchError] = useState('');
  const [globalSearchActionStatus, setGlobalSearchActionStatus] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.contact-item-options-btn')) {
        setOpenMenuId(null);
      }
    };
    if (openMenuId) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  const handleMenuToggle = (e, id) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleSendMessageToGroup = (group) => {
    setOpenMenuId(null);
    if (onNavigateToChat && group) {
        const chatObject = {
            _id: group._id,
            id: group._id,
            name: group.conversationName,
            avatar: group.avatar,
            type: 'group',
            members: group.members,
            groupLeader: group.groupLeader,
            deputyLeader: group.deputyLeader,
            updatedAt: group.updatedAt || new Date().toISOString(),
            originalData: group
        };
        onNavigateToChat(chatObject);
    }
  };

  const handleDisbandGroup = async (group) => {
    setOpenMenuId(null);
    if (!currentLoggedInUserId || !group?._id) {
        alert("Lỗi: Thiếu thông tin để giải tán nhóm.");
        return;
    }
    if (String(group.groupLeader) !== String(currentLoggedInUserId)) {
        alert("Chỉ trưởng nhóm mới có quyền giải tán nhóm.");
        return;
    }
    if (window.confirm(`Bạn có chắc chắn muốn giải tán nhóm "${group.conversationName}" không?`)) {
        try {
            const response = await fetch('http://localhost:3001/conversation/disbandGroupWeb', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ conversation_id: group._id, user_id: currentLoggedInUserId })
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message || "Giải tán nhóm thành công!");
                setGroupsList(prev => prev.filter(g => g._id !== group._id));
            } else {
                alert(data.message || "Giải tán nhóm thất bại.");
            }
        } catch (error) {
            alert("Lỗi kết nối khi giải tán nhóm.");
        }
    }
  };

  useEffect(() => {
    setGlobalSearchResult(null);
    setGlobalSearchError('');
    setGlobalSearchActionStatus('');
    setRequestActionStatus({});

    if (currentLoggedInUserId) {
        if (subViewType === 'friend_requests') {
            const fetchAllRequests = async () => {
                setIsLoadingReceivedRequests(true);
                setIsLoadingSentRequests(true);
                try {
                    const receivedRes = await fetch(`http://localhost:3001/user/friend-request/${currentLoggedInUserId}`);
                    if (receivedRes.ok) {
                        const receivedData = await receivedRes.json();
                        setReceivedFriendRequests(receivedData || []);
                    } else {
                        setReceivedFriendRequests([]);
                    }
                } catch (error) {
                    setReceivedFriendRequests([]);
                } finally {
                    setIsLoadingReceivedRequests(false);
                }

                try {
                    const sentRes = await fetch(`http://localhost:3001/user/getSentFriendRequests/${currentLoggedInUserId}`);
                    if (sentRes.ok) {
                        const sentData = await sentRes.json();
                        setSentFriendRequests(sentData || []);
                    } else {
                        setSentFriendRequests([]);
                    }
                    } catch (error) {
                    setSentFriendRequests([]);
                    } finally {
                    setIsLoadingSentRequests(false);
                    }
            };
            fetchAllRequests();
        } else if (subViewType === 'friends') {
            const fetchFriendsList = async () => {
                setIsLoadingFriends(true);
                setFriendsError('');
                setFriendsList([]);
                try {
                    const response = await fetch(`http://localhost:3001/user/getFriends/${currentLoggedInUserId}`);
                    if (response.ok) {
                    const data = await response.json();
                    setFriendsList(data || []);
                    } else {
                    setFriendsError('Không thể tải danh sách bạn bè.');
                    setFriendsList([]);
                    }
                } catch (error) {
                    setFriendsError('Lỗi kết nối máy chủ.');
                    setFriendsList([]);
                } finally {
                    setIsLoadingFriends(false);
                }
            };
            fetchFriendsList();
        } else if (subViewType === 'groups') {
            const fetchGroupsList = async () => {
                setIsLoadingGroups(true);
                setGroupsError('');
                setGroupsList([]);
                try {
                    const response = await fetch(`http://localhost:3001/conversation/getConversationGroupByUserIDWeb`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json',},
                        body: JSON.stringify({ user_id: currentLoggedInUserId }),
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setGroupsList(data.conversationGroup || []);
                    } else {
                        setGroupsError('Không thể tải danh sách nhóm.');
                        setGroupsList([]);
                    }
                } catch (error) {
                    setGroupsError('Lỗi kết nối máy chủ.');
                    setGroupsList([]);
                } finally {
                    setIsLoadingGroups(false);
                }
            };
            fetchGroupsList();
        }
    }
  }, [subViewType, currentLoggedInUserId]);

  const handleInitiateChat = async (friend) => {
    if (!currentLoggedInUserId || !friend?._id) {
      alert("Lỗi: Không đủ thông tin để bắt đầu chat.");
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/conversation/createConversationsWeb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: currentLoggedInUserId,
          friend_id: friend._id
        })
      });
      const data = await response.json();
      if (response.ok && data.conversation) {
        
        const chatToOpen = {
            _id: data.conversation._id,
            id: data.conversation._id,
            name: friend.userName,
            avatar: friend.avatar,
            type: 'user',
            members: data.conversation.members,
            updatedAt: data.conversation.updatedAt || new Date().toISOString(),
            friendId: friend._id
        };
        if (onNavigateToChat) {
          onNavigateToChat(chatToOpen);
        }
      } else {
        alert(data.message || "Không thể tạo hoặc mở cuộc trò chuyện.");
      }
    } catch (error) {
      alert("Lỗi kết nối, không thể bắt đầu cuộc trò chuyện.");
    }
  };

  const handleAcceptFriendRequest = async (senderId) => {
    if (!currentLoggedInUserId) {
        setRequestActionStatus(prev => ({ ...prev, [`received_${senderId}`]: 'Lỗi: Thiếu ID người dùng' }));
        return;
    }
    setRequestActionStatus(prev => ({ ...prev, [`received_${senderId}`]: 'Đang xử lý...' }));
    try {
        const response = await fetch('http://localhost:3001/user/acceptFriendRequestWeb', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: currentLoggedInUserId, friend_id: senderId }),
        });
        const data = await response.json();
        if (response.ok) {
            setRequestActionStatus(prev => ({ ...prev, [`received_${senderId}`]: 'Đã chấp nhận' }));
            const acceptedFriend = receivedFriendRequests.find(req => req._id === senderId);
            setReceivedFriendRequests(prevRequests => prevRequests.filter(req => req._id !== senderId));
            
            if (acceptedFriend) {
                setFriendsList(prevFriends => {
                    const newFriend = { 
                        _id: acceptedFriend._id, 
                        userName: acceptedFriend.userName, 
                        avatar: acceptedFriend.avatar 
                    };
                    if (!prevFriends.some(f => f._id === newFriend._id)) {
                        return [newFriend, ...prevFriends];
                    }
                    return prevFriends;
                });

                try {
                    const convResponse = await fetch('http://localhost:3001/conversation/createConversationsWeb', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            user_id: currentLoggedInUserId,
                            friend_id: acceptedFriend._id
                        })
                    });
                    const convData = await convResponse.json();
                    if (convResponse.ok && convData.conversation) {
                        const chatToOpen = {
                            _id: convData.conversation._id,
                            id: convData.conversation._id,
                            name: acceptedFriend.userName,
                            avatar: acceptedFriend.avatar,
                            type: 'user',
                            members: convData.conversation.members,
                            updatedAt: convData.conversation.updatedAt || new Date().toISOString(),
                        };
                        if (onNavigateToChat) {
                            onNavigateToChat(chatToOpen);
                        }
                    } else {
                        console.error("Không thể lấy/tạo cuộc trò chuyện sau khi chấp nhận:", convData.message);
                        alert(convData.message || "Lỗi khi tạo cuộc trò chuyện sau khi kết bạn.");
                    }
                } catch (error) {
                    console.error("Lỗi gọi API tạo cuộc trò chuyện:", error);
                    alert("Lỗi kết nối khi tạo cuộc trò chuyện.");
                }
            }
        } else {
            setRequestActionStatus(prev => ({ ...prev, [`received_${senderId}`]: data.message || 'Lỗi' }));
        }
    } catch (error) {
        setRequestActionStatus(prev => ({ ...prev, [`received_${senderId}`]: 'Lỗi kết nối' }));
    }
  };

  const handleDeclineFriendRequest = async (senderId) => {
    if (!currentLoggedInUserId) {
        setRequestActionStatus(prev => ({ ...prev, [`received_${senderId}`]: 'Lỗi: Thiếu ID người dùng' }));
        return;
    }
    setRequestActionStatus(prev => ({ ...prev, [`received_${senderId}`]: 'Đang xử lý...' }));
    try {
        const response = await fetch('http://localhost:3001/user/deleteFriendRequestWeb', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: currentLoggedInUserId, friend_id: senderId }),
        });
        const data = await response.json();
        if (response.ok) {
            setRequestActionStatus(prev => ({ ...prev, [`received_${senderId}`]: 'Đã từ chối' }));
            setReceivedFriendRequests(prevRequests => prevRequests.filter(req => req._id !== senderId));
        } else {
            setRequestActionStatus(prev => ({ ...prev, [`received_${senderId}`]: data.message || 'Lỗi' }));
        }
    } catch (error) {
        setRequestActionStatus(prev => ({ ...prev, [`received_${senderId}`]: 'Lỗi kết nối' }));
    }
  };

  const handleCancelSentRequest = async (recipientId) => {
    if (!currentLoggedInUserId) {
      setRequestActionStatus(prev => ({ ...prev, [`sent_${recipientId}`]: 'Lỗi: Thiếu ID người dùng' }));
      return;
    }
    setRequestActionStatus(prev => ({ ...prev, [`sent_${recipientId}`]: 'Đang thu hồi...' }));
    try {
      const response = await fetch('http://localhost:3001/user/cancelFriendRequestWeb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: currentLoggedInUserId, friend_id: recipientId }),
      });
      const data = await response.json();
      if (response.ok) {
        setRequestActionStatus(prev => ({ ...prev, [`sent_${recipientId}`]: 'Đã thu hồi lời mời' }));
        setSentFriendRequests(prevRequests => prevRequests.filter(req => req._id !== recipientId));
      } else {
        setRequestActionStatus(prev => ({ ...prev, [`sent_${recipientId}`]: data.message || 'Lỗi thu hồi' }));
      }
    } catch (error) {
      setRequestActionStatus(prev => ({ ...prev, [`sent_${recipientId}`]: 'Lỗi kết nối' }));
    }
  };

  const handleDeleteFriend = async (friendId, friendName) => {
    setOpenMenuId(null);
    if (!currentLoggedInUserId || !friendId) {
        alert("Lỗi: Không đủ thông tin để xóa bạn.");
        return;
    }

    if (window.confirm(`Bạn có chắc chắn muốn xóa bạn bè với "${friendName}" không?`)) {
        try {
            const response = await fetch('http://localhost:3001/user/deleteFriendWeb', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: currentLoggedInUserId,
                    friend_id: friendId
                })
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message || "Xóa bạn bè thành công!");
                setFriendsList(prevFriends => prevFriends.filter(f => f._id !== friendId));
                if(onFriendDeleted) {
                    onFriendDeleted(friendId);
                }
            } else {
                alert(data.message || "Xóa bạn bè thất bại.");
            }
        } catch (error) {
            alert("Lỗi kết nối, không thể xóa bạn bè.");
        }
    }
  };

  const handleGlobalPhoneSearch = async () => {
    if (!searchTerm.trim() || !/^\d{10,11}$/.test(searchTerm.trim())) {
        setGlobalSearchError('Vui lòng nhập SĐT hợp lệ để tìm kiếm.');
        setGlobalSearchResult(null);
        return;
    }
    setIsGlobalSearching(true);
    setGlobalSearchError('');
    setGlobalSearchResult(null);
    setGlobalSearchActionStatus('');
    try {
        const response = await fetch('http://localhost:3001/user/findUserByPhoneWeb', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber: searchTerm.trim() }),
        });
        const data = await response.json();
        if (response.ok && data.user) {
            const isAlreadyFriend = friendsList.some(f => f._id === data.user._id);
            const hasPendingSent = sentFriendRequests.some(req => req._id === data.user._id);
            const hasPendingReceived = receivedFriendRequests.some(req => req._id === data.user._id);

            setGlobalSearchResult({ 
                ...data.user, 
                isFriend: isAlreadyFriend,
                hasPendingSentRequest: hasPendingSent,
                hasPendingReceivedRequest: hasPendingReceived
            });
        } else {
            setGlobalSearchResult(null);
            setGlobalSearchError(data.message || 'Không tìm thấy người dùng trên hệ thống.');
        }
    } catch (error) {
        setGlobalSearchResult(null);
        setGlobalSearchError('Lỗi kết nối khi tìm kiếm SĐT.');
    } finally {
        setIsGlobalSearching(false);
    }
  };

  const handleSendRequestToGlobalUser = async (recipientId) => {
    if (!currentLoggedInUserId) {
        setGlobalSearchActionStatus('Lỗi: Không xác định người dùng hiện tại.');
        return;
    }
    setGlobalSearchActionStatus('Đang gửi lời mời...');
    try {
        const response = await fetch('http://localhost:3001/user/sendFriendRequestWeb', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: currentLoggedInUserId, friend_id: recipientId }),
        });
        const data = await response.json();
        if (response.ok) {
            setGlobalSearchActionStatus(data.message || 'Đã gửi lời mời!');
            setGlobalSearchResult(prev => prev ? { ...prev, hasPendingSentRequest: true, isFriend: false } : null);
        } else {
            setGlobalSearchActionStatus(data.message || 'Gửi lời mời thất bại.');
        }
    } catch (error) {
        setGlobalSearchActionStatus('Lỗi kết nối khi gửi lời mời.');
    }
  };
 
  const handleCancelRequestForGlobalUser = async (recipientId) => {
    if (!currentLoggedInUserId) {
        setGlobalSearchActionStatus('Lỗi: Không xác định người dùng hiện tại.');
        return;
    }
    setGlobalSearchActionStatus('Đang hủy lời mời...');
    try {
        const response = await fetch('http://localhost:3001/user/cancelFriendRequestWeb', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: currentLoggedInUserId, friend_id: recipientId }),
        });
        const data = await response.json();
        if (response.ok) {
            setGlobalSearchActionStatus(data.message || 'Đã hủy lời mời!');
            setGlobalSearchResult(prev => prev ? { ...prev, hasPendingSentRequest: false } : null);
        } else {
            setGlobalSearchActionStatus(data.message || 'Hủy lời mời thất bại.');
        }
    } catch (error) {
        setGlobalSearchActionStatus('Lỗi kết nối khi hủy lời mời.');
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (subViewType !== 'friend_requests' || !e.target.value.trim().match(/^\d+$/)) {
      setGlobalSearchResult(null);
      setGlobalSearchError('');
      setGlobalSearchActionStatus('');
    }
  };

  const handleSearchInputKeyPress = (e) => {
    if (e.key === 'Enter' && subViewType === 'friend_requests' && searchTerm.trim().match(/^\d{10,11}$/)) {
        handleGlobalPhoneSearch();
    }
  };
 
  const renderFriendItem = (contact) => (
    <div key={contact._id} className="contact-list-item">
      <div className="contact-item-main-info" onClick={() => handleInitiateChat(contact)}>
        <img src={contact.avatar || 'https://via.placeholder.com/40/000000/FFFFFF?Text=??'} alt={contact.userName} className="contact-item-avatar" />
        <div className="contact-item-info">
          <span className="contact-item-name">{contact.userName}</span>
        </div>
      </div>
      <div className="contact-item-options-container" ref={openMenuId === contact._id ? menuRef : null}>
        <button className="contact-item-options-btn" onClick={(e) => handleMenuToggle(e, contact._id)}> 
            <FaEllipsisH /> 
        </button>
        {openMenuId === contact._id && (
            <div className="group-item-menu" onClick={(e) => e.stopPropagation()}>
                <button className="menu-item" onClick={() => { setOpenMenuId(null); handleInitiateChat(contact); }}>
                    <FaPaperPlane className="menu-item-icon" />
                    <span>Nhắn tin</span>
                </button>
                <button className="menu-item menu-item-danger" onClick={() => handleDeleteFriend(contact._id, contact.userName)}>
                    <FaTrashAlt className="menu-item-icon" />
                    <span>Xóa bạn</span>
                </button>
            </div>
        )}
      </div>
    </div>
  );

  const renderGroupItem = (group) => (
    <div key={group._id} className="group-list-item">
        <div className="group-item-main-info" onClick={() => handleSendMessageToGroup(group)}>
            <div className="group-item-avatar">
                {group.avatar ? (
                    <img src={group.avatar} alt={group.conversationName} />
                ) : (
                    <FaUsers />
                )}
            </div>
            <div className="group-item-info">
                <span className="group-item-name">{group.conversationName}</span>
                {group.members && (
                    <span className="group-item-members">{group.members.length} thành viên</span>
                )}
            </div>
        </div>
        <div className="contact-item-options-container" ref={openMenuId === group._id ? menuRef : null}>
            <button className="contact-item-options-btn" onClick={(e) => handleMenuToggle(e, group._id)}>
                <FaEllipsisH />
            </button>
            {openMenuId === group._id && (
                <div className="group-item-menu" onClick={(e) => e.stopPropagation()}>
                    <button className="menu-item" onClick={() => handleSendMessageToGroup(group)}>
                        <FaPaperPlane className="menu-item-icon" />
                        <span>Nhắn tin</span>
                    </button>
                    {String(group.groupLeader) === String(currentLoggedInUserId) && (
                        <button className="menu-item menu-item-danger" onClick={() => handleDisbandGroup(group)}>
                            <FaTrashAlt className="menu-item-icon" />
                            <span>Giải tán nhóm</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    </div>
  );

  const renderReceivedRequestItem = (request) => (
    <div key={request._id} className="friend-request-card received-request-card">
        <img src={request.avatar || 'https://via.placeholder.com/60/7F8C8D/FFFFFF?Text=??'} alt={request.userName} className="request-card-avatar" />
        <div className="request-card-info">
            <span className="request-card-name">{request.userName}</span>
            {requestActionStatus[`received_${request._id}`] && <span className="request-action-feedback">{requestActionStatus[`received_${request._id}`]}</span>}
        </div>
        {(!requestActionStatus[`received_${request._id}`] || requestActionStatus[`received_${request._id}`].includes('Lỗi')) && (
          <div className="request-card-actions">
              <button className="request-action-btn decline-btn" onClick={() => handleDeclineFriendRequest(request._id)}>Từ chối</button>
              <button className="request-action-btn accept-btn" onClick={() => handleAcceptFriendRequest(request._id)}>Chấp nhận</button>
          </div>
        )}
    </div>
  );

  const renderSentRequestItem = (request) => (
    <div key={request._id} className="friend-request-card sent-request-card">
        <img src={request.avatar || 'https://via.placeholder.com/60/8E44AD/FFFFFF?Text=??'} alt={request.userName} className="request-card-avatar" />
        <div className="request-card-info">
            <span className="request-card-name">{request.userName}</span>
            {requestActionStatus[`sent_${request._id}`] ? (
              <span className="request-card-status">{requestActionStatus[`sent_${request._id}`]}</span>
            ) : (
              <span className="request-card-status">Đã gửi lời mời</span>
            )}
        </div>
        {(!requestActionStatus[`sent_${request._id}`] || requestActionStatus[`sent_${request._id}`].includes('Lỗi')) && (
        <div className="request-card-actions">
            <button 
              className="request-action-btn withdraw-btn" 
              onClick={() => handleCancelSentRequest(request._id)}
            >
              Thu hồi lời mời
            </button>
        </div>
        )}
    </div>
  );
 
  const renderGlobalSearchResultItem = () => (
    globalSearchResult && (
      <div className="friend-requests-section global-search-result-section">
        <h3 className="friend-requests-section-title">Kết quả tìm kiếm SĐT</h3>
        <div className="friend-request-grid">
          <div key={globalSearchResult._id} className="friend-request-card suggestion-card">
            <img src={globalSearchResult.avatar || 'https://via.placeholder.com/60/1ABC9C/FFFFFF?Text=??'} alt={globalSearchResult.userName} className="request-card-avatar" />
            <div className="request-card-info">
                <span className="request-card-name">{globalSearchResult.userName}</span>
                {globalSearchActionStatus && <span className="request-action-feedback">{globalSearchActionStatus}</span>}
            </div>
            <div className="request-card-actions">
              {(globalSearchActionStatus !== 'Đang gửi lời mời...' && globalSearchActionStatus !== 'Đang hủy lời mời...') && !globalSearchResult.isFriend ? (
                <button 
                  className={`request-action-btn ${globalSearchResult.hasPendingSentRequest ? 'withdraw-btn' : 'add-friend-btn'}`}
                  onClick={() => globalSearchResult.hasPendingSentRequest 
                                      ? handleCancelRequestForGlobalUser(globalSearchResult._id) 
                                      : handleSendRequestToGlobalUser(globalSearchResult._id)}
                >
                  {globalSearchResult.hasPendingSentRequest ? 'Hủy lời mời' : 'Kết bạn'}
                </button>
              ) : globalSearchResult.isFriend ? (
                <span className="friend-status-indicator">Bạn bè</span>
              ) : (
                <FaSpinner className="spinner-icon" />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );

  let title = '';
  let titleIcon = null;
  let searchPlaceholder = "Tìm kiếm...";
  let content = null;

  if (subViewType === 'friends') {
    title = `Bạn bè (${friendsList.length})`;
    titleIcon = <FaAddressBook className="contacts-title-icon" />;
    searchPlaceholder = "Tìm bạn";
    const filteredFriends = friendsList.filter(item => 
      item.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const groupedFriends = filteredFriends.reduce((acc, contact) => {
      const firstLetter = contact.userName.charAt(0).toUpperCase();
      const groupKey = firstLetter.match(/[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/i) ? firstLetter : '#';
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(contact);
      return acc;
    }, {});

    content = (
        <>
            <div className="contacts-controls">
                <div className="contacts-search-bar">
                <FaSearch className="contacts-search-icon" />
                <input type="text" placeholder={searchPlaceholder} value={searchTerm} onChange={handleSearchInputChange} />
                </div>
                <div className="contacts-filters">
                <button className="filter-btn" onClick={() => setSortOrder(sortOrder === 'name_asc' ? 'name_desc' : 'name_asc')}>
                    <FaSortAmountDown /> Tên ({sortOrder === 'name_asc' ? 'A-Z' : 'Z-A'})
                </button>
                <button className="filter-btn"><FaFilter /> Tất cả</button>
                </div>
            </div>
            <div className="contacts-list-container">
                {isLoadingFriends && <div className="loading-requests"><FaSpinner className="spinner-icon"/> Đang tải danh sách bạn bè...</div>}
                {friendsError && <div className="search-error-message">{friendsError}</div>}
                {!isLoadingFriends && !friendsError && (
                    <>
                        {Object.keys(groupedFriends).sort((a, b) => a === '#' ? 1 : b === '#' ? -1 : a.localeCompare(b, 'vi')).map(letter => (
                        <div key={letter} className="contact-group">
                            <h3 className="contact-group-letter">{letter}</h3>
                            {groupedFriends[letter].map(contact => renderFriendItem(contact))}
                        </div>
                        ))}
                        {friendsList.length === 0 && !searchTerm && <p className="no-contacts-found">Danh sách bạn bè trống.</p>}
                        {filteredFriends.length === 0 && searchTerm && <p className="no-contacts-found">{`Không tìm thấy bạn bè nào cho "${searchTerm}"`}</p>}
                    </>
                )}
            </div>
        </>
    );

  } else if (subViewType === 'groups') {
    title = `Danh sách nhóm (${groupsList.length})`;
    titleIcon = <FaUsers className="contacts-title-icon" />;
    searchPlaceholder = "Tìm nhóm...";
    const filteredGroups = groupsList.filter(item => 
        item.conversationName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    content = (
        <>
            <div className="contacts-controls">
                <div className="contacts-search-bar">
                <FaSearch className="contacts-search-icon" />
                <input type="text" placeholder={searchPlaceholder} value={searchTerm} onChange={handleSearchInputChange} />
                </div>
                <div className="contacts-filters">
                <button className="filter-btn">
                    <FaSortAmountDown /> Hoạt động (mới → cũ)
                </button>
                <button className="filter-btn"><FaFilter /> Tất cả</button>
                </div>
            </div>
            <div className="contacts-list-container groups-list-container">
                {isLoadingGroups && <div className="loading-requests"><FaSpinner className="spinner-icon"/> Đang tải danh sách nhóm...</div>}
                {groupsError && <div className="search-error-message">{groupsError}</div>}
                {!isLoadingGroups && !groupsError && (
                    <>
                        {filteredGroups.map(group => renderGroupItem(group))}
                        {groupsList.length === 0 && !searchTerm && <p className="no-contacts-found">Chưa có nhóm nào.</p>}
                        {filteredGroups.length === 0 && searchTerm && <p className="no-contacts-found">{`Không tìm thấy nhóm nào cho "${searchTerm}"`}</p>}
                    </>
                )}
            </div>
        </>
    );
  } else if (subViewType === 'friend_requests') {
    title = 'Lời mời kết bạn';
    titleIcon = <FaUserPlus className="contacts-title-icon" />;
    searchPlaceholder = "Tìm theo tên hoặc nhập SĐT để tìm (Enter)";
   
    const filteredReceivedRequests = receivedFriendRequests.filter(req => 
        req.userName.toLowerCase().includes(searchTerm.toLowerCase()) && !searchTerm.trim().match(/^\d+$/)
    );
    const filteredSentRequests = sentFriendRequests.filter(req => 
        req.userName.toLowerCase().includes(searchTerm.toLowerCase()) && !searchTerm.trim().match(/^\d+$/)
    );

    content = (
        <>
            <div className="contacts-controls friend-requests-controls">
                <div className="contacts-search-bar">
                    <FaSearch className="contacts-search-icon" />
                    <input 
                        type="text" 
                        placeholder={searchPlaceholder} 
                        value={searchTerm} 
                        onChange={handleSearchInputChange}
                        onKeyPress={handleSearchInputKeyPress}
                    />
                </div>
            </div>
            <div className="contacts-list-container friend-requests-container">
               
                {isGlobalSearching && <div className="loading-requests"><FaSpinner className="spinner-icon"/> Đang tìm kiếm trên hệ thống...</div>}
                {globalSearchError && <div className="search-error-message">{globalSearchError}</div>}
                {renderGlobalSearchResultItem()}

                <div className="friend-requests-section">
                    <h3 className="friend-requests-section-title">Lời mời nhận được ({filteredReceivedRequests.length})</h3>
                    {isLoadingReceivedRequests && <div className="loading-requests"><FaSpinner className="spinner-icon"/> Đang tải...</div>}
                    {!isLoadingReceivedRequests && (
                        <div className="friend-request-grid">
                            {filteredReceivedRequests.length > 0 ? 
                                filteredReceivedRequests.map(request => renderReceivedRequestItem(request))
                                : ((!searchTerm || searchTerm.trim().match(/^\d+$/)) && !globalSearchResult && !isGlobalSearching && <p className="no-requests-message">Bạn không có lời mời kết bạn nào.</p>)
                            }
                            {filteredReceivedRequests.length === 0 && searchTerm && !searchTerm.trim().match(/^\d+$/) && !globalSearchResult && !isGlobalSearching && <p className="no-contacts-found">{`Không tìm thấy lời mời nào khớp với "${searchTerm}" trong danh sách đã nhận.`}</p>}
                        </div>
                    )}
                </div>

                <div className="friend-requests-section">
                    <h3 className="friend-requests-section-title">Lời mời đã gửi ({filteredSentRequests.length})</h3>
                    {isLoadingSentRequests && <div className="loading-requests"><FaSpinner className="spinner-icon"/> Đang tải...</div>}
                    {!isLoadingSentRequests && (
                        <div className="friend-request-grid">
                            {filteredSentRequests.length > 0 ? 
                                filteredSentRequests.map(request => renderSentRequestItem(request))
                                : ((!searchTerm || searchTerm.trim().match(/^\d+$/)) && !globalSearchResult && !isGlobalSearching && <p className="no-requests-message">Bạn chưa gửi lời mời nào.</p>)
                            }
                            {filteredSentRequests.length === 0 && searchTerm && !searchTerm.trim().match(/^\d+$/) && !globalSearchResult && !isGlobalSearching && <p className="no-contacts-found">{`Không tìm thấy lời mời nào khớp với "${searchTerm}" trong danh sách đã gửi.`}</p>}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
  }

  return (
    <div className="contacts-main-view">
      <div className="contacts-header-bar">
        <div className="contacts-title-container">
          {titleIcon}
          <h2 className="contacts-view-title">{title}</h2>
        </div>
      </div>
      {content}
    </div>
  );
}

export default ContactsMainView;