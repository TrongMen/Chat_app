import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";

const user_id = window.localStorage.getItem("user_id");
const initialState = {
  direct_chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
  },
  group_chat: {},
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchDirectConversations(state, action) {
      const conversations = Array.isArray(action.payload.conversations)
        ? action.payload.conversations
        : [];
    
      const list = conversations.map((el) => {
        const this_user = el.participants.find(
          (elm) => elm._id.toString() !== user_id
        );
        if (!this_user) {
          console.warn("User not found in participants", el);
          return null; // Bỏ qua cuộc trò chuyện nếu không tìm thấy user
        }
    
        return {
          id: el._id,
          user_id: this_user._id,
          name: `${this_user.firstName || ""} ${this_user.lastName || ""}`,
          online: this_user.status === "Online",
          img: faker.image.avatar(),
          msg: faker.music.songName(),
          time: "9:30",
          unread: 0,
          pinned: false,
        };
      }).filter(Boolean); // Loại bỏ các giá trị `null`
    
      state.direct_chat.conversations = list;
    },
    //----------------------------------------------------------------
    // fetchDirectConversations(state, action) {
    //   const list = action.payload.conversations.map((el) => {
    //     const this_user = el.participants.find(
    //       (elm) => elm._id.toString() !== user_id
    //     );
    //     return {
    //       id: el._id,
    //       user_id: this_user?._id,
    //       name: `${this_user?.firstName} ${this_user?.lastName}`,
    //       online: this_user?.status === "Online",
    //       img: faker.image.avatar(),
    //       msg: el.messages.slice(-1)[0].text,
    //       time: "9:30",
    //       unread: 0,
    //       pinned: false,
    //       about: this_user?.about,
    //     };
    //   });
    //   state.direct_chat.conversations = list;
    // },
    updateDirectConversations(state, action) {
      const this_conversation = action.payload.conversation;
      state.direct_chat.conversations = state.direct_chat.conversations.map(
        (el) => {
          if (el.id !== this_conversation._id) {
            return el;
          } else {
            const user = this_conversation.participants.find(
              (elm) => elm._id.toString() !== user_id
            );
            return {
              id: this_conversation._id,
              user_id: user?._id,
              name: `${user?.firstName} ${user?.lastName}`,
              online: user?.status === "Online",
              img: faker.image.avatar(),
              msg: faker.music.songName(),
              time: "9:30",
              unread: 0,
              pinned: false,
            };
          }
        }
      );
    },
    addDirectConversations(state, action) {
      // const this_conversation = action.payload.conversation;
      // const user = this_conversation.participants.find(
      //   (elm) => elm._id.toString() !== user_id
      // );
      // state.direct_chat.conversations = state.direct_chat.conversations.filter(
      //   (el) => el?.id !== this_conversation._id
      // );
      // state.direct_chat.conversations.push({
      //   id: this_conversation._id,
      //   user_id: user._id,
      //   name: `${user.firstName} ${user.lastName}`,
      //   online: user.status === "Online",
      //   img: faker.image.avatar(),
      //   msg: faker.music.songName(),
      //   time: "9:30",
      //   unread: 0,
      //   pinned: false,
      // });
      const this_conversation = action.payload.conversation;

  // Kiểm tra nếu `this_conversation` hoặc `participants` không tồn tại
  if (!this_conversation || !Array.isArray(this_conversation.participants)) {
    console.error("Conversation or participants is undefined:", this_conversation);
    return; // Dừng xử lý nếu dữ liệu không hợp lệ
  }

  const user = this_conversation.participants.find(
    (elm) => elm._id.toString() !== user_id
  );

  if (!user) {
    console.warn("User not found in participants:", this_conversation.participants);
    return; // Dừng xử lý nếu không tìm thấy user
  }

  // Kiểm tra nếu cuộc trò chuyện đã tồn tại
  const existingIndex = state.direct_chat.conversations.findIndex(
    (el) => el.id === this_conversation._id
  );

  const newConversation = {
    id: this_conversation._id,
    user_id: user._id,
    name: `${user.firstName} ${user.lastName}`,
    online: user.status === "Online",
    img: faker.image.avatar(),
    msg: faker.music.songName(),
    time: "9:30",
    unread: 0,
    pinned: false,
  };

  if (existingIndex >= 0) {
    // Nếu đã tồn tại, cập nhật
    state.direct_chat.conversations[existingIndex] = newConversation;
  } else {
    // Nếu chưa tồn tại, thêm mới
    state.direct_chat.conversations.push(newConversation);
  }
    },
    setCurrentConversation(state, action) {
      state.direct_chat.current_conversation = action.payload;
    },
    fetchCurrentMessages(state, action) {
      const messages = action.payload.messages;
      const formatted_messages = messages.map((el) => ({
        id: el._id,
        type: "msg",
        subtype: el.type,
        message: el.text,
        incoming: el.to === user_id,
        outgoing: el.from === user_id,
      }));
      state.direct_chat.current_messages = formatted_messages;
    },
    addDirectMessage(state, action) {
      state.direct_chat.current_messages.push(action.payload.message);
    }
  },
});

export default slice.reducer;

export const FetchDirectConversations = ({ conversations }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchDirectConversations(conversations));
  };
};

export const UpdateDirectConversation= ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateDirectConversations(conversation));
  };
};
export const AddDirectConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addDirectConversations(conversation));
  };
};

export const SetCurrentConversation = (current_conversation) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.setCurrentConversation(current_conversation));
  };
};


export const FetchCurrentMessages = ({messages}) => {
  return async(dispatch, getState) => {
    dispatch(slice.actions.fetchCurrentMessages({messages}));
  }
}

export const AddDirectMessage = (message) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addDirectMessage({message}));
  }
}
