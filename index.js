'use strict';

const Alexa = require('ask-sdk');
// use 'ask-sdk' if standard SDK module is installed

const aws =  require('aws-sdk');

aws.config.update({
    region: 'us-east-1'
});

// Code for the handlers here

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    async handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const attributes = await attributesManager.getPersistentAttributes() || {};
        if (Object.keys(attributes).length === 0) {
          attributes.prevIntent = '';
          attributes.prevSlotName = '';
          attributes.prevSlotValue = '';
        }

        attributesManager.setSessionAttributes(attributes);

        const speechText = 'Welcome to news feed.';

        return responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const StartIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'StartIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;
        const sessionAttributes = attributesManager.getSessionAttributes();

        sessionAttributes.prevIntent = 'StartIntent';

        const speechText = 'In the news today we have: Trump, Russian Secret Spilling Site and California Wildfires. What would you like to know more about?';

        return responseBuilder
            .speak(speechText)
            .reprompt("What would you like to know more about")
            .withSimpleCard('News', speechText)
            .getResponse();
    }
};

const SelectIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'SelectIntent';
    },
    handle(handlerInput) {
        const newsTitle = handlerInput.requestEnvelope.request.intent.slots.newsTitle;
        const newsTitleValue = newsTitle.value;
        // newsTitleValue are news titles
        const speechText = 'Ok here is news about ' + newsTitleValue;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt("What would you like to know more about")
            .withSimpleCard('News', speechText)
            .getResponse();
    }
};

const PreviousIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'PreviousIntent';
    },
    handle(handlerInput) {
        const speechText = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const NextIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'NextIntent';
    },
    handle(handlerInput) {
        const speechText = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder
            .speak("Goodbye Wayne, Tom and Sushma")
            .withSimpleCard('Bye', "Goodbye Wayne, Tom and Sushma")
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

exports.handler = Alexa.SkillBuilders.standard()
    .addRequestHandlers(LaunchRequestHandler,
        StartIntentHandler,
        SelectIntentHandler,
        PreviousIntentHandler,
        NextIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .withTableName('interact2')
    .withAutoCreateTable(true)
    .withDynamoDbClient(
        new aws.DynamoDB({ apiVersion: "latest", region: "us-east-1" })
    )
    .lambda();
