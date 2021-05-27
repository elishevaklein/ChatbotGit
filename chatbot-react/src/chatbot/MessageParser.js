class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state
    }

    parse = (message) => {
        const lowerCase = message.toLowerCase();
        let coption;
        this.state.optionsData.map(option => {
            if (lowerCase.includes(option.answerName)) {
                coption = option;
                return this.actionProvider.handleMessageLink(option.answerName);
            }           
        })
        if (coption != null)
                return;
        return this.actionProvider.handleDefault();
    };
}

export default MessageParser;
