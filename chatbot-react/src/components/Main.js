import React, { useState, useEffect } from 'react';
import Chatbot from "react-chatbot-kit";
import { ConditionallyRender } from "react-util-kit";
import './Main.css'
import { createChatBotMessage } from "react-chatbot-kit";
import MessageParser from "../chatbot/MessageParser";
import ActionProvider from "../chatbot/ActionProvider";
import { ReactComponent as ChatBot } from '../assets/Icons/sichaN.svg';
// import { ReactComponent as Logo } from '../assets/Icons/leaderColor.svg';
import { ReactComponent as Logo } from '../assets/Icons/laline.svg';
import GeneralOptions from "./widgets/GeneralOptions/GeneralOptions";
import OptionLink from "./widgets/Link/OptionLink";

function Main() {
  const saveMessages = (messages) => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  };
  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem("chat_messages"));
    return messages;
  };
  const [showChatbot, toggleChatbot] = useState(false);
  const [company, setCompany] = useState({});
  const [options, setOptions] = useState([])


  //Call to server-company
  async function getCompany(id) {
    const url = `getCompanyById/${id}`;
    let data = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        Accept: 'application/json'
      },
      mode: 'no-cors'
    })
    data = await data.json();
    setCompany(data.myCompany)
  }

  //Call to server-options
  async function getOptions(id) {
    const url = `getAllOptionsOfCompany/${id}`;
    let data = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        Accept: 'application/json'
      },
      mode: 'no-cors'
    })
    data = await data.json();
    setOptions(data.options)
  }

  useEffect(() => {
    const id="6086efe76494a31fb02e8c04"  /*608ad3326567fd033c0efcc2*/
    getCompany(id);
    getOptions(id);
  }, [])

  const getWidgets = () => {
    let allwidgets = [{
      widgetName: "options",
      widgetFunc: (props) => <GeneralOptions {...props} />,
      mapStateToProps: ["optionsData", "company"],
    }]
    options.map(option => {
      allwidgets.push({
        widgetName: option.answerName,
        widgetFunc: (props) => <OptionLink {...props} />,
        props: { link:option.answerDescription , title: option.answerName }
      })
    })
    return allwidgets;
  };

  const config = {
    botName: company.companyName/*+" -    \n"+company.companyDescription*/,
    lang: "no",
    customStyles: {
      botMessageBox: {
        backgroundColor: "#376B7E",//the color message
      },
      chatButton: {
        backgroundColor: "#376B7E",//the button-chatbot color
      },
    },
    initialMessages: [
      createChatBotMessage(
        `Hi I'm ${company.companyName} chatBot`,
      ),
      createChatBotMessage(
        `${company.chatbotOpeningMessage}`,
        {
          withAvatar: false,
          delay: 500,
          widget: "options",
        }
      ),
    ],
    state: {
      company: company,
      optionsData: options,
    },
    customComponents:{ botAvatar: (props) => <Logo {...props} />},//logo of company
    widgets: getWidgets(),
  };

  return (
    < >
      <div className="app-chatbot-container">
        <ConditionallyRender
          ifTrue={showChatbot /*&& company.companyName*/}
          show={
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          }
        /></div>
      <button
        className="app-chatbot-button"
        onClick={() => toggleChatbot((prev) => !prev)} >
        <ChatBot className="app-chatbot-button-icon" />
      </button>
    </>
  );
}


export default Main;