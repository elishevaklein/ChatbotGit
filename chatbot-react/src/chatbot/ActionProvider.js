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

    handleMessageLink = ( name, message = "Here you can find details of your choice") => {
        const messages = this.createChatBotMessage(
            message,
            { widget: name, withAvatar: true, }
        );

        this.addMessageToBotState(messages);
        const obj = {
            logDate: Date.now(),
            userName: "laline",
            appName: "ChatBot",
            action: "botMessege",
            details: "success",
            contentObject: message
        }
        this.createLog(obj)
    };

    handleDefault = () => {
        const message = this.createChatBotMessage(
            "How can I help?", {
            widget: "options",
            withAvatar: true,
        });

        this.addMessageToBotState(message)
        const obj = {
            logDate: Date.now(),
            userName: "laline",
            appName: "ChatBot",
            action: "DefaultbotMessege",
            details: "success",
            contentObject: message
        }
        this.createLog(obj)
    };

    createLog = async (object) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = {
            logDate: object.logDate,
            userName: object.userName,
            appName: object.appName,
            action: object.action,
            details: object.details,
            contentObject: object.contentObject
        }
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(raw),
            redirect: 'follow',
            mode: 'cors'
        };
        let data = await fetch("https://activity-log.leader.codes/createNewLog", requestOptions)
    }

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