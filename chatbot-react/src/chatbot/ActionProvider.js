class ActionProvider {
    // The action provider receives createChatBotMessage which you can use to define the bots response, and 
    // the setState function that allows for manipulating the bots internal state.
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage
    }

    handleClient = (nameOfOption) => {
        const message = this.createClientMessage(
            nameOfOption, {
            withAvatar: true,
        });
        this.addMessageToBotState(message)
    };

    handleMessageLink = (name, message = "Here you can find details of your choice") => {
        const messages = this.createChatBotMessage(
            message,
            { widget: name, withAvatar: true, }
        );

        this.addMessageToBotState(messages);
    };
    
    handleDefault = () => {
        const message = this.createChatBotMessage(
            "How can I help?", {
            widget: "options",
            withAvatar: true,
        });

        this.addMessageToBotState(message)
    };

   
    addMessageToBotState = (messages) => {
        if (Array.isArray(messages)) {
            this.setState((state) => ({
                ...state,
                messages: [...state.messages, ...messages],
            }));
        } else {
            this.setState((state) => ({
                ...state,
                messages: [...state.messages, messages],
            }));
        }
    };
}

export default ActionProvider;